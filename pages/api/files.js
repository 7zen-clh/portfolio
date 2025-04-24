import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const pdfDir = path.join(process.cwd(), 'assets/pdf');
    
    // Lire le répertoire et lister les fichiers
    fs.readdir(pdfDir, (err, files) => {
      if (err) {
        console.error('Erreur de lecture du répertoire:', err);
        return res.status(500).json({ error: 'Erreur interne du serveur' });
      }

      // Répondre avec la liste des fichiers
      const fileUrls = files.map((file) => ({
        name: file,
        url: `/assets/pdf/${file}`,  // URL des fichiers
      }));

      res.status(200).json({ files: fileUrls });
    });
  } else {
    res.status(405).json({ error: 'Méthode non autorisée' });
  }
}
