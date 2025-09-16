// ฟังก์ชันโหลด fragment html เข้าไปใน div ตาม id
async function loadFragment(id, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`โหลดไฟล์ ${file} ไม่สำเร็จ`);
    const html = await res.text();
    document.getElementById(id).innerHTML = html;

    // กรณี header โหลดเสร็จ → เน้น active menu ตามหน้า
    if (id === "header") {
      highlightActiveMenu();
    }

    // ถ้าโหลด cart.html เสร็จ → render cart + bind event select
    if (id === "cart") {
      const shippingSelect = document.getElementById("shippingSelect");
      if (shippingSelect) {
        shippingSelect.addEventListener("change", showCart);
      }
      showCart();
    }

    // ถ้าโหลด product.html เสร็จ → render product
    if (id === "product") {
      showProducts();
    }

  } catch (err) {
    console.error(err);
  }
}

// ทำให้เมนูใน header active ตามไฟล์ที่เปิดอยู่
function highlightActiveMenu() {
  const currentPage = window.location.pathname.split("/").pop(); // เช่น product.html
  const links = document.querySelectorAll(".navbar a");

  links.forEach(link => {
    let href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

// ฟังก์ชันเริ่มต้นเมื่อโหลดหน้าเสร็จ
window.onload = () => {
  loadFragment("header", "header.html");
  loadFragment("footer", "footer.html");

  const currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "" || currentPage === "index.html") {
    // ✅ หน้าแรก: แสดงสินค้าแนะนำ (ไม่ใช่ทั้งหมด)
    showHighlightProducts();
  }

  if (currentPage === "product.html") {
    showProducts();
  }

  if (currentPage === "cart.html") {
    loadFragment("cart", "cart.html");
  }
};

// ✅ แสดงสินค้าแนะนำ (เลือกแค่ 3–4 ชิ้น)
function showHighlightProducts() {
  const highlightDiv = document.getElementById("highlightProducts");
  if (!highlightDiv) return;

  let highlight = products.slice(0, 4); // ✅ เลือกแค่ 4 ชิ้นแรก
  highlightDiv.innerHTML = "";
  highlight.forEach((p) => {
    let div = document.createElement("div");
    div.className = "bg-white p-4 rounded-lg shadow hover:shadow-lg transition";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" class="w-full h-40 object-cover rounded-md mb-3">
      <h3 class="font-semibold text-lg">${p.name}</h3>
      <p class="text-blue-600 font-bold mb-2">${p.price}฿</p>
      <button onclick="addToCart(${p.id})" class="btn btn-sm bg-blue-500 text-white hover:bg-blue-600">
        เพิ่มลงตะกร้า
      </button>
    `;
    highlightDiv.appendChild(div);
  });
}

