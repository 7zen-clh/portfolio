// api/upload.js
const AWS = require('aws-sdk');
const formidable = require('formidable');
const fs = require('fs');

// Configurer AWS avec tes informations d'identification
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'eu-north-1', // Ta région AWS
});

const s3 = new AWS.S3();

module.exports = (req, res) => {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur lors de l\'upload' });
    }

    // Récupérer le fichier téléchargé
    const file = files.document[0];
    
    // Préparer les paramètres pour l'upload S3
    const params = {
      Bucket: 'mon-projet-iuto-bucket',  // Nom du bucket S3
      Key: `uploads/${file.originalFilename}`,  // Dossier + nom du fichier
      Body: fs.createReadStream(file.filepath),  // Lire le fichier téléchargé
      ContentType: file.mimetype,  // Type MIME du fichier
      ACL: 'public-read',  // Les fichiers seront publics
    };

    // Télécharger le fichier vers S3
    s3.upload(params, (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors du téléchargement vers S3' });
      }
      return res.status(200).json({ message: 'Fichier téléchargé avec succès', data });
    });
  });
};
