// contact.js : Auto-ajustement de la hauteur du textarea

document.addEventListener("DOMContentLoaded", function () {
    const textareas = document.querySelectorAll("textarea");
  
    textareas.forEach((textarea) => {
      textarea.setAttribute("style", "height:" + textarea.scrollHeight + "px;overflow-y:hidden;");
      textarea.addEventListener("input", () => {
        textarea.style.height = "auto";
        textarea.style.height = textarea.scrollHeight + "px";
      });
    });
  });
  