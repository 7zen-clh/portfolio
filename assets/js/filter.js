document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const projectCards = document.querySelectorAll(".project-card");
  
    searchInput.addEventListener("input", () => {
      const filter = searchInput.value.toLowerCase();
      let foundProjects = [];
  
      projectCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const description = card.querySelector("p").textContent.toLowerCase();
  
        if (title.includes(filter) || description.includes(filter)) {
          card.style.display = "block";
          foundProjects.push(card);
        } else {
          card.style.display = "none";
        }
      });
  
      // Centrer les résultats trouvés
      const container = document.querySelector(".projects-grid");
      if (filter && foundProjects.length > 0) {
        container.classList.add("projects-grid-centered");
      } else {
        container.classList.remove("projects-grid-centered");
      }
    });
  });
  