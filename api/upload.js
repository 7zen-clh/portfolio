// /api/upload.js
import formidable from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Configuration AWS S3
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Méthode non autorisée' });
    }

    // parser le multipart/form-data
    const form = new formidable.IncomingForm({ keepExtensions: true });
    const { files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    // formulaire sans fichier ?    
    if (!files || !files.document) {
      return res.status(400).json({ error: 'Aucun fichier reçu' });
    }

    // formidable peut retourner un seul fichier ou un tableau
    const file = Array.isArray(files.document)
      ? files.document[0]
      : files.document;

    // lit le fichier temporaire
    const fileStream = fs.createReadStream(file.filepath);

    const params = {
      Bucket: 'mon-projet-iuto-bucket',
      Key: file.originalFilename,
      Body: fileStream,
      ContentType: file.mimetype || 'application/octet-stream',
    };

    // upload vers S3
    const data = await s3.upload(params).promise();
    return res.status(200).json({ message: 'Fichier uploadé !', url: data.Location });

  } catch (err) {
    // log complet pour debug dans Vercel
    console.error('API /api/upload ERROR:', err);
    return res.status(500).json({ error: 'Erreur interne du serveur', details: err.message });
  }
}
