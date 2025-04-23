// Sélectionner le bouton de changement de thème et le body
const themeToggle = document.getElementById("themeToggle");
const body = document.body;

// Vérifier si un thème sombre est déjà sélectionné
if (localStorage.getItem('darkMode') === 'true') {
  body.classList.add('dark');
}

// Ajouter un événement au bouton pour basculer le thème
themeToggle.addEventListener('click', () => {
  // Bascule de la classe "dark" sur le body
  body.classList.toggle('dark');
  
  // Enregistrer l'état du thème dans le localStorage pour une persistance entre les sessions
  if (body.classList.contains('dark')) {
    localStorage.setItem('darkMode', 'true');
  } else {
    localStorage.setItem('darkMode', 'false');
  }
});
