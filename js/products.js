var products = [
  // Coffee
  {
    id: 1,
    name: "เอสเปรสโซ่",
    category: "กาแฟ",
    price: 60,
    description: "กาแฟเข้มข้นหอมกรุ่น เหมาะกับคนชอบรสชาติหนักแน่น",
    image: "../img/products/coffee1.jpg",
  },
  {
    id: 2,
    name: "ลาเต้",
    category: "กาแฟ",
    price: 70,
    description: "กาแฟนุ่มละมุนด้วยนมสด หวานมันกำลังดี",
    image: "../img/products/coffee2.jpg",
  },
  {
    id: 3,
    name: "คาปูชิโน่",
    category: "กาแฟ",
    price: 70,
    description: "ฟองนมนุ่ม หอมกาแฟละมุน",
    image: "../img/products/coffee3.jpg",
  },
  {
    id: 4,
    name: "อเมริกาโน่",
    category: "กาแฟ",
    price: 55,
    description: "กาแฟดำเข้มข้น ดื่มง่ายไม่เลี่ยน",
    image: "../img/products/coffee4.jpg",
  },

  // Dessert
  {
    id: 5,
    name: "เค้กช็อกโกแลต",
    category: "ขนมหวาน",
    price: 120,
    description: "เค้กนุ่มละมุน ราดด้วยช็อกโกแลตเข้มข้น",
    image: "../img/products/dessert1.jpg",
  },
  {
    id: 6,
    name: "ชีสเค้ก",
    category: "ขนมหวาน",
    price: 150,
    description: "ชีสเค้กนุ่มๆ หอมมันอร่อย",
    image: "../img/products/dessert2.jpg",
  },
  {
    id: 7,
    name: "ครัวซองต์",
    category: "ขนมหวาน",
    price: 65,
    description: "แป้งอบกรอบนอกนุ่มใน กลิ่นหอมเนยสด",
    image: "../img/products/dessert3.jpg",
  },
  {
    id: 8,
    name: "โดนัท",
    category: "ขนมหวาน",
    price: 50,
    description: "โดนัทนุ่ม โรยน้ำตาลหวานกรอบ",
    image: "../img/products/dessert4.jpg",
  },

  // Toys
  {
    id: 9,
    name: "ตุ๊กตาหมี",
    category: "ตุ๊กตา",
    price: 350,
    description: "ตุ๊กตาหมีน่ารัก ขนนุ่มกอดอุ่นใจ",
    image: "../img/products/toy1.jpg",
  },
  {
    id: 10,
    name: "ตุ๊กตากระต่าย",
    category: "ตุ๊กตา",
    price: 320,
    description: "ตุ๊กตากระต่ายหูยาวสุดคิ้วท์",
    image: "../img/products/toy2.jpg",
  },
  {
    id: 11,
    name: "ตุ๊กตาแพนด้า",
    category: "ตุ๊กตา",
    price: 400,
    description: "ตุ๊กตาแพนด้านุ่มนิ่ม น่ารักสุดๆ",
    image: "../img/products/toy3.jpg",
  },
  {
    id: 12,
    name: "ตุ๊กตาแมว",
    category: "ตุ๊กตา",
    price: 300,
    description: "ตุ๊กตาแมวน้อยน่ารัก เหมาะเป็นของขวัญ",
    image: "../img/products/toy4.jpg",
  },
];

function renderProducts() {
  const productList = document.getElementById("productList");

  productList.innerHTML = products.map(p => `
    <div class="product-card" data-category="${p.category}">
      <img src="${p.image}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p class="category">หมวดหมู่: ${p.category}</p>
      <p><strong>${p.price}฿</strong></p>
      <button onclick="addToCart(${p.id})">🛒 หยิบใส่ตะกร้า</button>
    </div>
  `).join("");
}

// ฟังก์ชันเพิ่มลงตะกร้า
function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let product = products.find(p => p.id === id);
  let item = cart.find(c => c.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
 // แจ้งเตือนแบบสวย ๆ
  Swal.fire({
    title: "เพิ่มลงตะกร้าแล้ว!",
    text: `${product.name} ถูกเพิ่มลงตะกร้าเรียบร้อย`,
    icon: "success",
    confirmButtonText: "ตกลง",
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end"
  });

  updateCartCount();
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  updateCartCount();
});