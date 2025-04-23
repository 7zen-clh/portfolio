const destination = sessionStorage.getItem("redirectTo");

if (destination === "index") {
  document.getElementById("loading-text").textContent = "Retour au portfolio...";
  setTimeout(() => {
    window.location.href = "/index.html"; // <- bien racine ici si index.html est à la racine
  }, 1200);
} else if (destination === "veille") {
  document.getElementById("loading-text").textContent = "Chargement de la veille...";
  setTimeout(() => {
    window.location.href = "/pages/veille.html";
  }, 1200);
}
