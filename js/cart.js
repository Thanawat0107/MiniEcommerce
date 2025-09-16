let cart = [];

// ✅ เพิ่มสินค้าในตะกร้า
function addToCart(id) {
  let product = products.find((p) => p.id === id);
  let item = cart.find((c) => c.id === id);

  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  showCart();
  updateMiniCart();
}

// ✅ ลดจำนวนสินค้า (-1)
function decreaseQty(id) {
  let item = cart.find((c) => c.id === id);
  if (item) {
    item.qty--;
    if (item.qty <= 0) {
      cart = cart.filter((c) => c.id !== id);
    }
  }
  showCart();
  updateMiniCart();
}

// ✅ ลบสินค้าออกจากตะกร้า
function removeFromCart(id) {
  cart = cart.filter((c) => c.id !== id);
  showCart();
  updateMiniCart();
}

// ✅ คำนวณค่าขนส่ง
function calcShipping(type) {
  switch (type) {
    case "normal": return 50;
    case "express": return 100;
    case "free": return 0;
    default: return 0;
  }
}

// ✅ แสดงตะกร้า (หน้า cart.html)
function showCart() {
  const cartList = document.getElementById("cartList");
  const totalDiv = document.getElementById("total");
  const summaryDiv = document.getElementById("summary");
  const shippingSelect = document.getElementById("shippingSelect");

  if (!cartList) return; // กัน error เวลาไม่ได้อยู่หน้า cart.html

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    let sub = item.price * item.qty;
    total += sub;

    let div = document.createElement("div");
    div.className = "cart-item flex justify-between items-center mb-2";
    div.innerHTML = `
      <span>${item.name}</span>
      <div>
        <button onclick="decreaseQty(${item.id})" class="btn btn-xs">-</button>
        <span class="mx-2">${item.qty}</span>
        <button onclick="addToCart(${item.id})" class="btn btn-xs">+</button>
        <span class="ml-4">${sub}฿</span>
        <button onclick="removeFromCart(${item.id})" class="btn btn-xs btn-error ml-2">ลบ</button>
      </div>
    `;
    cartList.appendChild(div);
  });

  // ส่วนลด >= 1000 ลด 10%
  let discount = total >= 1000 ? total * 0.1 : 0;
  let shippingCost = calcShipping(shippingSelect?.value || "normal");
  let finalTotal = total - discount + shippingCost;

  if (totalDiv) {
    totalDiv.innerHTML = `
      รวม: ${total}฿ <br>
      ส่วนลด: ${discount}฿ <br>
      ค่าขนส่ง: ${shippingCost}฿
    `;
  }

  if (summaryDiv) {
    summaryDiv.innerHTML = `<p><b>ยอดสุทธิ: ${finalTotal}฿</b></p>`;
  }
}

// ✅ อัปเดต Mini Cart (ที่อยู่บน header)
function updateMiniCart() {
  const miniCartCount = document.getElementById("miniCartCount");
  const miniCartCountText = document.getElementById("miniCartCountText");
  const miniCartList = document.getElementById("miniCartList");
  const miniCartTotal = document.getElementById("miniCartTotal");

  if (!miniCartCount) return; // กัน error เวลา header ยังไม่โหลด

  miniCartList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.qty;
    let div = document.createElement("div");
    div.className = "flex justify-between text-sm";
    div.innerHTML = `
      <span>${item.name} x ${item.qty}</span>
      <span>${item.price * item.qty}฿</span>
    `;
    miniCartList.appendChild(div);
  });

  miniCartCount.innerText = cart.length;
  miniCartCountText.innerText = cart.length;
  miniCartTotal.innerText = `รวม: ${total}฿`;
}
