// 1. MẢNG MÓN ĂN MẶC ĐỊNH TRÊN HỆ THỐNG
const defaultProducts = [
    {
        id: "01",
        name: "Gà Rán Truyền Thống",
        price: 36000,
        image: "../assets/images/garan.jpg",
        description: "Gà rán giòn tan với lớp vỏ vàng óng, hương vị truyền thống được nhiều khách hàng yêu thích."
    },
    {
        id: "02",
        name: "Gà Sốt Đậu (Soy Garlic)",
        price: 41000,
        image: "../assets/images/gasotSoy.jfif",
        description: "Gà rán phủ sốt đậu nành tỏi thơm ngon, đậm đà theo phong cách Hàn Quốc."
    },
    {
        id: "03",
        name: "Gà Sốt Hot&Sweet",
        price: 41000,
        image: "../assets/images/gasotHS.jfif",
        description: "Sự kết hợp hoàn hảo giữa vị cay nhẹ và vị ngọt hấp dẫn, mang đến trải nghiệm vị giác khó quên."
    },
    {
        id: "04",
        name: "Burger Teriyaki",
        price: 45000,
        image: "../assets/images/teriyaki.jfif",
        description: "Burger gà sốt Teriyaki đậm đà, rau tươi giòn và bánh mềm thơm ngon."
    },
    {
        id: "05",
        name: "Burger Gà",
        price: 52000,
        image: "../assets/images/L-Chicken.jfif",
        description: "Burger gà giòn rụm kết hợp rau tươi và sốt đặc biệt tạo nên hương vị hấp dẫn."
    },
    {
        id: "06",
        name: "Khoai Tây Chiên",
        price: 28000,
        image: "../assets/images/khoaitaychien.jfif",
        description: "Khoai tây chiên vàng giòn bên ngoài, mềm bùi bên trong, ăn kèm tương cà hoặc tương ớt."
    },
    {
        id: "07",
        name: "Mực Rán",
        price: 28000,
        image: "../assets/images/mucran.jfif",
        description: "Mực tươi được tẩm bột và chiên giòn, giữ nguyên độ ngọt tự nhiên của hải sản."
    },
    {
        id: "08",
        name: "Cơm Gà Sốt Phô Mai",
        price: 48000,
        image: "../assets/images/cheeserice.jfif",
        description: "Cơm nóng hổi ăn kèm gà rán và sốt phô mai béo ngậy theo phong cách Hàn Quốc."
    },
    {
        id: "09",
        name: "Phô Mai Que",
        price: 36000,
        image: "../assets/images/cheesestick.jpg",
        description: "Phô mai que kéo sợi hấp dẫn với lớp vỏ chiên giòn vàng ruộm."
    },
    {
        id: "10",
        name: "Kem",
        price: 22000,
        image: "../assets/images/kem.jfif",
        description: "Kem mát lạnh với hương vị thơm ngon, là món tráng miệng hoàn hảo sau bữa ăn."
    }
];
// Khởi tạo thực đơn từ LocalStorage
let productList = JSON.parse(localStorage.getItem("products"));
if (!productList || productList.length === 0) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
    productList = defaultProducts;
}

// Khởi tạo giỏ hàng từ LocalStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================================
// 2. HÀM HIỂN THỊ DANH SÁCH MÓN ĂN (CLIENT CARD)
// ==========================================
function renderProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;
    
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted my-5"><h5>Không tìm thấy món ăn nào phù hợp với từ khóa của bạn.</h5></div>`;
        return;
    }

    products.forEach(item => {
        const productCard = document.createElement("div");
        productCard.className = "col-lg-3 col-md-4 col-sm-6 mb-4"; 

        productCard.innerHTML = `
            <div class="card h-100 shadow-sm border-0 transition-hover">
                <div class="p-2" style="height: 180px;">
                    <img src="${item.image}" alt="${item.name}" class="w-100 h-100 rounded object-fit-cover" onerror="this.src='../assets/logo.jpg'">
                </div>
                <div class="card-body d-flex flex-column text-center pt-0">
                    <h6 class="fw-bold text-dark text-truncate mb-1">${item.name}</h6>
                    <small class="text-muted d-block mb-2">Mã: ${item.id}</small>
                    <p class="text-danger fw-bold fs-5 mb-3 mt-auto">
                        ${item.price.toLocaleString('vi-VN')} đ
                    </p>
                    <div class="d-grid gap-2"> 
                        <a href="chi-tiet.html?id=${item.id}" class="btn btn-primary btn-sm fw-bold">
                         👁 Xem chi tiết
                         </a>         
                        <button class="btn btn-danger btn-sm fw-bold" onclick="buyNow('${item.id}')">
                            🔥 Mua ngay
                        </button>
                        <button class="btn btn-outline-success btn-sm fw-bold" onclick="addToCart('${item.id}')">
                            🛒 Thêm vào giỏ
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Tìm kiếm món ăn
function searchProduct() {
    let keyword = document.getElementById("search").value.toLowerCase().trim();
    let result = productList.filter(p =>
        p.name.toLowerCase().includes(keyword) || p.id.toLowerCase().includes(keyword)
    );
    renderProducts(result);
}

// ==========================================
// 3. LOGIC HỆ THỐNG GIỎ HÀNG
// ==========================================

function executeAdding(id) {
    let product = productList.find(p => p.id === id);
    if (!product) return null;

    let cartItem = cart.find(item => item.id === id);
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    return product;
}

// THÊM VÀO GIỎ HÀNG
function addToCart(id) {
    let product = executeAdding(id);
    if (product) {
        alert(`🛒 Đã thêm thành công "${product.name}" vào giỏ hàng.`);
    }
}

// Hành động: MUA NGAY (Mua nhanh và cuộn xuống thanh toán)
function buyNow(id) {
    let product = executeAdding(id);
    if (product) {
        // Cuộn màn hình mượt mà xuống khu vực giỏ hàng để khách nhấn nút thanh toán luôn
        document.getElementById("cart-section").scrollIntoView({ behavior: 'smooth' });
    }
}

// Hiển thị bảng giỏ hàng
function renderCart() {
    const cartBody = document.getElementById("cart-list");
    const totalPriceContainer = document.getElementById("cart-total-price");
    if (!cartBody) return;

    cartBody.innerHTML = "";

    if (cart.length === 0) {
        cartBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-5 fw-bold">Giỏ hàng của bạn đang trống trơn! Hãy lựa chọn món ngon ở phía trên nhé.</td></tr>`;
        if (totalPriceContainer) totalPriceContainer.innerText = "0 đ";
        return;
    }

    let totalAll = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        totalAll += itemTotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td class="text-center fw-bold text-muted">${index + 1}</td>
            <td class="text-center">
                <img src="${item.image}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded border" onerror="this.src='../assets/logo.jpg'">
            </td>
            <td class="fw-bold text-dark">${item.name}</td>
            <td class="text-end text-secondary">${item.price.toLocaleString('vi-VN')} đ</td>
            <td class="text-center">
                <input type="number" class="form-control form-control-sm d-inline-block text-center" value="${item.quantity}" min="1" style="width: 60px;" onchange="updateQuantity('${item.id}', this.value)">
            </td>
            <td class="text-end fw-bold text-danger">${itemTotal.toLocaleString('vi-VN')} đ</td>
            <td class="text-center">
                <button class="btn btn-outline-danger btn-sm" onclick="removeFromCart('${item.id}')">Xóa</button>
            </td>
        `;
        cartBody.appendChild(tr);
    });

    if (totalPriceContainer) {
        totalPriceContainer.innerText = totalAll.toLocaleString('vi-VN') + " đ";
    }
}


function updateQuantity(id, quantity) {
    let item = cart.find(i => i.id === id);
    if (item) {
        item.quantity = parseInt(quantity) || 1;
        if (item.quantity < 1) item.quantity = 1;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Xóa 1 món cụ thể khỏi giỏ hàng
function removeFromCart(id) {
    if (confirm("Hệ thống: Bạn có chắc chắn muốn bỏ món ăn này khỏi giỏ hàng không?")) {
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// Xóa sạch giỏ hàng
function clearCart() {
    if (confirm("Hệ thống: Bạn muốn hủy toàn bộ các món ăn đã chọn trong giỏ?")) {
        cart = [];
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

// NÚT THANH TOÁN NGAY TRONG GIỎ HÀNG
function checkoutCart() {
    if (cart.length === 0) {
        alert("⚠️ Giỏ hàng đang trống! Vui lòng chọn ít nhất 1 món ăn trước khi đặt lịch thanh toán.");
        return;
    }
    
    alert("🎉 Đặt hàng thành công! Đơn hàng của bạn đã được tiếp nhận trên hệ thống cửa hàng.");
    
    // Xóa giỏ hàng sau khi thanh toán thành công
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

// ==========================================
// 4. HÀM HIỂN THỊ SẢN PHẨM NỔI BẬT (DÀNH RIÊNG CHO TRANG CHỦ)
// ==========================================
function renderFeaturedProducts() {
    const featuredContainer = document.getElementById("featured-products");
    if (!featuredContainer) return; // Nếu không ở trang chủ (không có id này) thì dừng lại

    featuredContainer.innerHTML = "";
    
    // Lấy ra 4 sản phẩm đầu tiên trong mảng để làm sản phẩm nổi bật
    const featuredList = productList.slice(0, 4);

    featuredList.forEach(item => {
        const div = document.createElement("div");
        div.className = "col-lg-3 col-md-4 col-sm-6 mb-4"; 

        // XỬ LÝ ĐƯỜNG DẪN ẢNH CHO TRANG CHỦ:
        // Vì ảnh trong mảng mặc định đang để là "../assets/images/..."
        // Chúng ta cắt bỏ dấu "../" đi để trang chủ index.html đọc đúng đường dẫn "assets/images/..."
        let correctImage = item.image;
        if (correctImage.startsWith("../")) {
            correctImage = correctImage.replace("../", "");
        }

        div.innerHTML = `
            <div class="card h-100 shadow-sm border-0 text-center transition-hover">
                <div class="p-2" style="height: 180px;">
                    <img src="${correctImage}" alt="${item.name}" class="w-100 h-100 rounded object-fit-cover" onerror="this.src='assets/logo.jpg'">
                </div>
                <div class="card-body d-flex flex-column pt-0">
                    <h6 class="fw-bold text-dark text-truncate mb-1">${item.name}</h6>
                    <p class="text-danger fw-bold fs-5 mb-3 mt-auto">
                        ${item.price.toLocaleString('vi-VN')} đ
                    </p>
                    <div class="d-grid gap-2">
                        <a href="html/san-pham.html" class="btn btn-warning btn-sm fw-bold text-dark">
                            🍗 Xem thực đơn ngay
                        </a>
                    </div>
                </div>
            </div>
        `;
        featuredContainer.appendChild(div);
    });
}

// ==========================================
// 5. CẬP NHẬT SỰ KIỆN TỰ ĐỘNG CHẠY KHI TẢI TRANG
// ==========================================
window.onload = function() {
    // Nếu có khung chứa danh sách sản phẩm (Trang san-pham.html) thì mới chạy
    if (document.getElementById("product-list")) {
        renderProducts(productList);
    }
    
    // Nếu có khung chứa giỏ hàng (Trang san-pham.html) thì mới chạy
    if (document.getElementById("cart-list")) {
        renderCart();
    }
    
    // Nếu có khung chứa sản phẩm nổi bật (Trang index.html) thì mới chạy
    if (document.getElementById("featured-products")) {
        renderFeaturedProducts();
    }
};