import { IncomingForm } from 'formidable';
import fs from 'fs';

// Assurez-vous que votre fonction est compatible avec l'environnement serverless (par exemple, Vercel)
export const config = {
  api: {
    bodyParser: false,  // Désactive le parsing par défaut de Vercel pour gérer les fichiers
  },
};

export default function handler(req, res) {
  // Vérifie que la méthode est POST (pour un envoi de formulaire)
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.uploadDir = './public/uploads'; // Spécifiez le répertoire d'upload
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
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Erreur de parsing:', err);
        return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
      }

      // Traitez les fichiers ici
      console.log('Fichiers reçus:', files);

      // Répondre avec succès
      res.status(200).json({ message: 'Fichier téléchargé avec succès', files });
    });
  } else {
    // Méthode non autorisée
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
