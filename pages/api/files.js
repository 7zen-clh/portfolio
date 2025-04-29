// Sélectionner le formulaire et l'élément de fichier dans le DOM
const fileInput = document.querySelector('#fileInput');
const form = document.querySelector('#uploadForm');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Vérifier qu'un fichier est sélectionné
  const file = fileInput.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', file.name); // Le nom du fichier à stocker dans S3

    try {
      // Envoi de la requête POST vers l'API (la fonction serverless upload.js)
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData, // Le fichier est envoyé ici
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Fichier téléchargé avec succès !', result.url);
        // Afficher ou utiliser l'URL du fichier téléchargé
        alert(`Le fichier a été téléchargé avec succès ! URL: ${result.url}`);
      } else {
        console.error('Erreur lors du téléchargement:', result.error);
      }
    } catch (error) {
      console.error('Erreur de requête :', error);
    }
  }
});
