// /api/upload.js
import formidable from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, // Désactive le body parser de Next.js pour traiter le fichier manuellement
  },
};

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1', // Région de ton bucket (ex: Stockholm)
});

export default function handler(req, res) {
  // Vérifie que la méthode HTTP est bien POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée' }); // Retourne erreur 405 si ce n'est pas un POST
  }

  const form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors du traitement du formulaire' });
    }

    const file = files.document;
    const stream = fs.createReadStream(file.filepath);

    const params = {
      Bucket: 'mon-projet-iuto-bucket',
      Key: file.originalFilename,
      Body: stream,
      ContentType: file.mimetype,
    };

    s3.upload(params, (s3Err, data) => {
      if (s3Err) {
        return res.status(500).json({ error: 'Erreur lors de l\'upload sur S3' });
      }
      res.status(200).json({ message: 'Fichier uploadé avec succès', url: data.Location });
    });
  });
}
