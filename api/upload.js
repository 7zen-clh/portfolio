import { IncomingForm } from 'formidable';
import AWS from 'aws-sdk';
import fs from 'fs';

// Assurez-vous que votre fonction est compatible avec l'environnement serverless (par exemple, Vercel)
export const config = {
  api: {
    bodyParser: false,  // Désactive le parsing par défaut de Vercel pour gérer les fichiers
  },
};

// Initialisation de S3
const s3 = new AWS.S3({
  region: 'eu-north-1', // Remplacez par votre région S3
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Clé d'accès AWS
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Clé secrète AWS
});

export default function handler(req, res) {
  // Vérifie que la méthode est POST (pour un envoi de formulaire)
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.uploadDir = './public/uploads'; // Spécifiez le répertoire d'upload temporaire
    form.keepExtensions = true; // Garder les extensions de fichier

    // Gérer les erreurs de parsing
    form.on('error', (err) => {
      console.error('Erreur lors du parsing du formulaire', err);
      res.status(500).json({ error: 'Erreur interne du serveur' });
    });

    // Lorsque le formulaire est complètement parsé
    form.on('end', () => {
      console.log('Upload terminé');
    });

    // Parse les données du formulaire
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Erreur de parsing:', err);
        return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
      }

      // Traitez les fichiers ici
      const file = files.document[0]; // Exemple de traitement pour un seul fichier

      // Upload vers S3
      try {
        const fileContent = fs.createReadStream(file.filepath);
        const uploadParams = {
          Bucket: 'mon-projet-iuto-bucket', // Nom de votre bucket S3
          Key: `uploads/${file.newFilename}`, // Nom du fichier sur S3
          Body: fileContent,
          ContentType: file.mimetype,
        };

        // Effectuer l'upload
        const s3Upload = await s3.upload(uploadParams).promise();
        console.log('Fichier téléchargé vers S3:', s3Upload.Location);

        // Répondre avec succès
        res.status(200).json({
          message: 'Fichier téléchargé avec succès',
          file: s3Upload,
        });
      } catch (uploadError) {
        console.error('Erreur lors de l\'upload vers S3:', uploadError);
        res.status(500).json({ error: 'Erreur lors de l\'upload vers S3' });
      }
    });
  } else {
    // Méthode non autorisée
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
