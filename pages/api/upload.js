// /api/upload.js

const AWS = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');

// Configurer AWS SDK avec les variables d'environnement
AWS.config.update({
  region: process.env.AWS_REGION, // Utilisation de la variable d'environnement AWS_REGION
  credentials: new AWS.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Utilisation de la variable d'environnement AWS_ACCESS_KEY_ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY // Utilisation de la variable d'environnement AWS_SECRET_ACCESS_KEY
  })
});

const s3 = new AWS.S3();

module.exports = async (req, res) => {
  // Si la méthode HTTP est POST
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Erreur lors du traitement du fichier' });
      }

      // Accéder au fichier téléchargé
      const file = files.document[0];
      const fileStream = fs.createReadStream(file.filepath);

      const params = {
        Bucket: process.env.AWS_S3_BUCKET, // Utilisation de la variable d'environnement AWS_S3_BUCKET
        Key: `iuto/${file.originalFilename}`, // Le chemin dans ton bucket
        Body: fileStream,
        ContentType: file.mimetype,
        ACL: 'public-read' // Rendre le fichier public si nécessaire
      };

      // Télécharger le fichier sur S3
      s3.upload(params, (err, data) => {
        if (err) {
          return res.status(500).json({ message: 'Erreur lors de l\'upload sur S3', error: err });
        }
        return res.status(200).json({ message: 'Fichier téléchargé avec succès !', url: data.Location });
      });
    });
  } else {
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }
};
