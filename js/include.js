function include(id, file) {
  fetch(file).then(r => r.text()).then(html => {
    document.getElementById(id).innerHTML = html;

     // ✅ ถ้าเป็น header.html ให้ update counter หลังโหลดเสร็จ
    if (file.includes("header")) {
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