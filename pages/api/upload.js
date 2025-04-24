// pages/api/upload.js
import formidable from 'formidable';
import { S3 } from 'aws-sdk';

const s3 = new S3({
  region: 'eu-north-1', // Ta région AWS
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

export const config = {
  api: {
    bodyParser: false, // Désactiver le body parser pour utiliser formidable
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur de parsing' });
      }

      const file = files.document[0]; // Assurez-vous que 'document' est bien le champ du formulaire

      // Préparer les paramètres S3
      const params = {
        Bucket: 'mon-projet-iuto-bucket',
        Key: `uploads/${file.originalFilename}`,
        Body: file.filepath,
        ContentType: file.mimetype,
        ACL: 'public-read',
      };

      try {
        const uploadResponse = await s3.upload(params).promise();
        res.status(200).json({ message: 'Fichier téléchargé avec succès', data: uploadResponse });
      } catch (err) {
        res.status(500).json({ error: 'Erreur lors du téléchargement', details: err });
      }
    });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
