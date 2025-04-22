// Sélection de l'élément du menu burger et des liens de la navbar
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Fonction pour basculer l'affichage du menu
function toggleMenu() {
  navLinks.classList.toggle('active');
}

// Ajouter un événement de clic sur le burger
burger.addEventListener('click', toggleMenu);
