import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,  // Désactive le parsing par défaut pour gérer les fichiers
  },
};

export default function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();
    const uploadDir = path.join(process.cwd(), 'assets/pdf');  // Répertoire où les fichiers seront téléchargés

    form.uploadDir = uploadDir;
    form.keepExtensions = true; // Garder l'extension du fichier
    form.parse(req, (err, fields, files) => {
      if (err) {
        console.error('Erreur lors du parsing:', err);
        return res.status(500).json({ error: 'Erreur lors de l\'upload du fichier' });
      }

      // Afficher les détails du fichier téléchargé
      console.log('Fichiers reçus:', files);

      // Répondre avec succès et donner le chemin du fichier téléchargé
      res.status(200).json({ message: 'Fichier téléchargé avec succès', files });
    });
  } else {
    // Méthode non autorisée
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
