// Configuration d'AWS SDK avec tes informations d'identification
AWS.config.update({
  region: 'eu-north-1', // Remplace avec ta région S3
  accessKeyId: 'AKIATGXTDEY3RRRZ2N2E', // Remplace avec ta clé d'accès AWS
  secretAccessKey: 'xsOwhttA016Qgdp+rb6h2jobgywTMXs2RUUFzoiM' // Remplace avec ta clé secrète AWS
});

// Initialisation de l'objet S3
const s3 = new AWS.S3();

// Fonction d'upload du fichier
function uploadFile(event) {
  event.preventDefault(); // Empêche l'envoi immédiat du formulaire

  // Récupère le fichier sélectionné
  const file = document.getElementById('document').files[0];
  if (!file) {
    alert('Veuillez choisir un fichier.');
    return;
  }

  // Paramètres d'upload
  const params = {
    Bucket: 'mon-projet-iuto-bucket', // Remplace avec le nom de ton bucket S3
    Key: `iuto/${file.name}`, // Le chemin du fichier dans ton bucket
    Body: file, // Le fichier lui-même
    ACL: 'public-read' // Permission publique pour que le fichier soit accessible
  };

  // Upload du fichier
  s3.upload(params, function(err, data) {
    if (err) {
      console.error('Erreur lors de l\'upload :', err);
      alert('Erreur lors de l\'upload.');
    } else {
      console.log('Fichier téléchargé avec succès :', data.Location);
      alert('Fichier téléchargé avec succès !');
    }
  });
}

// Attacher la fonction d'upload à l'événement de soumission du formulaire
document.querySelector('form').addEventListener('submit', uploadFile);
