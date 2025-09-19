function include(id, file) {
  fetch(file)
    .then(r => r.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;

      if (file.includes("header")) {
        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");

        if (menuToggle && navLinks) {
          menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }

        if (typeof updateCartCount === "function") {
          updateCartCount();
        }
      }
    });
}

document.addEventListener("DOMContentLoaded", () => {
  include("header", "header.html");
  include("footer", "footer.html");
});