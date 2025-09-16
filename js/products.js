// สินค้าตั้งต้น
let products = [
  { 
    id: 1, 
    name: "เสื้อยืด", 
    price: 250, 
    image: "https://picsum.photos/200?random=1" 
  },
  { 
    id: 2, 
    name: "กางเกง", 
    price: 500, 
    image: "https://picsum.photos/200?random=2" 
  },
  { 
    id: 3, 
    name: "หมวก", 
    price: 150, 
    image: "https://picsum.photos/200?random=3" 
  },
  { 
    id: 4, 
    name: "รองเท้า", 
    price: 1200, 
    image: "https://picsum.photos/200?random=4" 
  }
];

// ฟังก์ชันแสดงสินค้า
function showProducts() {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  products.forEach((p) => {
    let div = document.createElement("div");
    div.className = "card bg-base-100 shadow-md"; // ✅ ใช้ card ของ DaisyUI
    div.innerHTML = `
      <figure>
        <img src="${p.image}" alt="${p.name}" class="h-48 w-full object-cover"/>
      </figure>
      <div class="card-body">
        <h2 class="card-title">${p.name}</h2>
        <p class="text-blue-600 font-bold">${p.price}฿</p>
        <div class="card-actions justify-end">
          <button onclick="addToCart(${p.id})" class="btn btn-primary btn-sm">
            เพิ่มลงตะกร้า
          </button>
        </div>
      </div>
    `;
    productList.appendChild(div);
  });
}
