// โหลด cart จาก localStorage หรือจำลองไว้ถ้าไม่มี
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// แสดงสินค้าในตะกร้า
function showCart() {
  const cartList = document.getElementById("cartList");
  const summaryList = document.getElementById("summaryList");

  cartList.innerHTML = "";
  summaryList.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    cartList.innerHTML = `<p class="empty">ไม่มีสินค้าในตะกร้า</p>`;
  } else {
    cart.forEach((item, index) => {
      let total = item.price * item.qty;
      subtotal += total;

      // รายการใน cart หลัก
      cartList.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="item-info">
            <h3>${item.name}</h3>
            <p>${item.price}฿</p>
            <div class="quantity">
              <button onclick="updateQty(${index}, -1)">-</button>
              <input type="text" value="${item.qty}" readonly>
              <button onclick="updateQty(${index}, 1)">+</button>
            </div>
          </div>
          <div class="item-total">${total}฿</div>
        </div>
      `;

      // รายการในสรุป
      summaryList.innerHTML += `
        <div class="summary-item">
          <img src="${item.image}" alt="${item.name}">
          <p>${item.name} x${item.qty}</p>
          <span>${total}฿</span>
        </div>
      `;
    });
  }

  let shipping = subtotal > 0 ? 50 : 0;
  let grandTotal = subtotal + shipping;

  document.getElementById("subtotal").innerText = `รวมสินค้า: ${subtotal}฿`;
  document.getElementById("shipping").innerText = `ค่าจัดส่ง: ${shipping}฿`;
  document.getElementById("grandTotal").innerHTML = `<strong>ยอดรวม: ${grandTotal}฿</strong>`;

  // เซฟกลับ localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
}

// อัปเดตจำนวนสินค้า
function updateQty(index, change) {
  if (cart[index].qty + change <= 0) {
    cart.splice(index, 1); // ลบออกถ้าเหลือ 0 หรือติดลบ
  } else {
    cart[index].qty += change;
  }
  showCart();
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let count = cart.reduce((sum, item) => sum + item.qty, 0);

  const cartCount = document.getElementById("cartCount");
  if (cartCount) {
    cartCount.innerText = count;

    // เล่น animation
    cartCount.classList.add("bump");
    setTimeout(() => cartCount.classList.remove("bump"), 400);
  }
}

// โหลด cart ตอนเปิดหน้า
document.addEventListener("DOMContentLoaded", () => {
  showCart();
  updateCartCount();
});