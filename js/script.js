// ฟังก์ชันสุ่ม Array
function getRandomItems(arr, num) {
  // copy array + สับลำดับแบบสุ่ม
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num); // ดึง num ตัวแรก
}

function renderHighlightProducts() {
  const highlightBox = document.getElementById("highlightProducts");

  // เลือกสินค้าสุ่ม 4 ชิ้นจาก products
  const randomProducts = getRandomItems(products, 4);

  // แสดงผล
  highlightBox.innerHTML = randomProducts
    .map(
      (p) => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
       <p class="category">หมวดหมู่: ${p.category}</p>
        <p><strong>${p.price}฿</strong></p>
        <button onclick="addToCart(${p.id})">🛒 หยิบใส่ตะกร้า</button>
    </div>
  `
    )
    .join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderHighlightProducts();
  
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
});

