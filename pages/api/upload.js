const AWS = require('aws-sdk');

// Initialisation de S3 avec tes variables d'environnement
const s3 = new AWS.S3({
  region: 'eu-north-1', // Remplace par ta région
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { file, filename } = req.body; // Assure-toi que tu envoies bien ces données

      const params = {
        Bucket: 'mon-projet-iuto-bucket',
        Key: `assets/pdf/iuto/${filename}`,
        Body: file,
        ContentType: 'application/pdf',
        ACL: 'public-read', // Ou une autre option d'ACL selon ton besoin
      };

      // Upload du fichier vers S3
      const data = await s3.upload(params).promise();

      // Réponse avec l'URL du fichier
      return res.status(200).json({ message: 'Fichier téléchargé avec succès', url: data.Location });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
    }
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
};
