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
  highlightBox.innerHTML = randomProducts.map(p => `
    <div class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.price}฿</p>
      <small>${p.category}</small>
    </div>
  `).join("");
}

document.addEventListener("DOMContentLoaded", () => {
  renderHighlightProducts();
  updateCartCount();
});