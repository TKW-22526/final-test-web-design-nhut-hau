const defaultProducts = [
    {
        id: "01", 
        name: "Gà Rán Truyền Thống", 
        price: 36000, 
        image: "../assets/images/garan.jpg", 
        productLink: "chi-tiet.html",
        description: "Gà rán truyền thống với lớp vỏ ngoài chiên giòn rụm vàng ươm, thịt gà bên trong mềm mọng nước, giữ nguyên vị ngọt tự nhiên. Được tẩm ướp theo công thức đặc trưng, dùng kèm tương cà hoặc tương ớt."
    },
    {
        id: "02", 
        name: "Gà Sốt Đậu (Soy Garlic)", 
        price: 41000, 
        image: "../assets/images/gasotSoy.jfif", 
        productLink: "chi-tiet.html",
        description: "Món gà rán giòn rụm được phủ một lớp sốt đậu nước tương tỏi độc quyền từ Hàn Quốc. Sự kết hợp hoàn hảo giữa vị mặn nhẹ của nước tương và hương thơm nồng của tỏi băm tạo nên hương vị đậm đà khó cưỡng."
    },
    {
        id: "03", 
        name: "Gà Sốt Hot&Sweet", 
        price: 41000, 
        image: "../assets/images/gasotHS.jfif", 
        productLink: "chi-tiet.html",
        description: "Dành cho các tín độ mê ăn cay! Những miếng gà chiên giòn được đắm mình trong làn sốt chua cay ngọt ngọt mang phong cách ẩm thực đường phố Seoul, kích thích vị giác ngay từ miếng cắn đầu tiên."
    },
    {
        id: "04", 
        name: "Burger Teriyaki", 
        price: 45000, 
        image: "../assets/images/teriyaki.jfif", 
        productLink: "chi-tiet.html",
        description: "Bánh mì Burger kẹp lớp nhân thịt nướng thơm phức, hòa quyện cùng nước sốt Teriyaki Nhật Bản đậm đà, kết hợp với rau xà lách tươi mát và sốt mayonnaise béo ngậy."
    },
    {
        id: "05", 
        name: "Burger Gà", 
        price: 52000, 
        image: "../assets/images/L-Chicken.jfif", 
        productLink: "chi-tiet.html",
        description: "Sự kết hợp tuyệt vời giữa vỏ bánh Burger mềm mịn và miếng ức gà phi-lê chiên xù siêu to khổng lồ. Lớp rau kèm sốt đặc chế giúp món ăn vừa đậm vị vừa không bị ngấy."
    },
    {
        id: "06", 
        name: "Khoai Tây Chiên", 
        price: 28000, 
        image: "../assets/images/khoaitaychien.jfif", 
        productLink: "chi-tiet.html",
        description: "Khoai tây cắt thanh dài chiên vàng đều, bên ngoài giòn tan, bên trong bùi bùi. Món ăn nhẹ không thể thiếu khi đi kèm với các combo gà rán và burger."
    },
    {
        id: "07", 
        name: "Mực Rán", 
        price: 28000, 
        image: "../assets/images/mucran.jfif", 
        productLink: "chi-tiet.html",
        description: "Những vòng mực tươi ngon được lăn qua lớp bột chiên xù mỏng, rán chín tới để giữ được độ ngọt, độ dai giòn sần sật tự nhiên của hải sản."
    },
    {
        id: "08", 
        name: "Cơm Gà Sốt Phô Mai", 
        price: 48000, 
        image: "../assets/images/cheeserice.jfif", 
        productLink: "chi-tiet.html",
        description: "Phần cơm nóng hổi ăn kèm với thịt gà rút xương chiên giòn rưới đẫm sốt phô mai tan chảy béo ngậy, thơm lừng. Món ăn cung cấp đầy đủ năng lượng cho một bữa ăn chính."
    },
    {
        id: "09", 
        name: "Phô mai que", 
        price: 36000, 
        image: "../assets/images/cheesestick.jfif", 
        productLink: "chi-tiet.html",
        description: "Món ăn vặt quốc dân với lớp vỏ chiên xù giòn rụm bọc lấy nhân phô mai Mozzarella hảo hạng bên trong. Khi ăn nóng có thể kéo sợi dài cực kỳ vui mắt và ngon miệng."
    },
    {
        id: "10", 
        name: "Kem", 
        price: 22000, 
        image: "../assets/images/kem.jfif", 
        productLink: "chi-tiet.html",
        description: "Món tráng miệng mát lạnh, ngọt ngào với chất kem mịn màng, hương vani sữa thơm nhẹ giúp làm dịu vị giác hoàn hảo sau khi thưởng thức các món chiên rán."
    }
];

// 2. ÉP BUỘC ĐỒNG BỘ: Nếu phát hiện dữ liệu cũ bị thiếu món, ghi đè lại ngay mảng 10 món chuẩn
let localData = JSON.parse(localStorage.getItem("products"));
if (!localData || localData.length < 10) {
    localStorage.setItem("products", JSON.stringify(defaultProducts));
    localData = defaultProducts;
}

let productList = localData;

// ================== 3. HÀM HIỂN THỊ DANH SÁCH SẢN PHẨM (TRANG TRONG THƯ MỤC HTML) ==================
function renderProducts(products) {
    const container = document.getElementById("product-list");
    if (!container) return;
    
    container.innerHTML = "";

    if (products.length === 0) {
        container.innerHTML = `<div class="col-12 text-center text-muted my-3"><p>Không tìm thấy sản phẩm nào phù hợp.</p></div>`;
        return;
    }

    products.forEach(item => {
        const productItem = document.createElement("div");
        productItem.className = "col-md-3 col-sm-6 mb-4"; 

        productItem.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="product-image ratio ratio-1x1 overflow-hidden p-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid object-fit-cover h-100 rounded" onerror="this.src='../assets/logo.jpg'">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h6 class="fw-bold">${item.name}</h6>
                    <p class="text-danger fw-bold mb-3">
                        ${item.price.toLocaleString('vi-VN')} đ
                    </p>
                    <small class="text-muted d-block mb-3">Mã: ${item.id}</small>
                    <div class="d-grid gap-2 mt-auto">
                        <a href="chi-tiet.html?id=${item.id}" class="btn btn-success">
                            Xem chi tiết
                        </a>
                        <div class="d-flex gap-2">
                            <button class="btn btn-warning btn-sm flex-fill" onclick="editProduct('${item.id}')">Sửa</button>
                            <button class="btn btn-danger btn-sm flex-fill" onclick="deleteProduct('${item.id}')">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(productItem);
    });
}

// ================== THÊM MỚI: HÀM HIỂN THỊ 3 SẢN PHẨM NỔI BẬT TẠI TRANG CHỦ INDEX ==================
function renderFeaturedProducts() {
    const featuredContainer = document.getElementById("featured-products");
    if (!featuredContainer) return; 

    featuredContainer.innerHTML = "";
    
    // Lấy ra 3 món đầu tiên trong mảng dữ liệu để làm sản phẩm nổi bật
    const featuredList = productList.slice(0, 3);

    featuredList.forEach(item => {
        const productItem = document.createElement("div");
        productItem.className = "col-md-4 col-sm-6 mb-4"; 

        // Xử lý loại bỏ dấu "../" ra khỏi đường dẫn ảnh vì index.html đang ở ngoài gốc
        let fixedImage = item.image;
        if (fixedImage.startsWith("../")) {
            fixedImage = fixedImage.replace("../", "");
        }

        productItem.innerHTML = `
            <div class="card h-100 shadow-sm">
                <div class="product-image ratio ratio-1x1 overflow-hidden p-2">
                    <img src="${fixedImage}" alt="${item.name}" class="img-fluid object-fit-cover h-100 rounded" onerror="this.src='assets/logo.jpg'">
                </div>
                <div class="card-body d-flex flex-column text-center">
                    <h5 class="fw-bold">${item.name}</h5>
                    <p class="text-danger fw-bold mb-3">
                        ${item.price.toLocaleString('vi-VN')} đ
                    </p>
                    <div class="d-grid gap-2 mt-auto">
                        <a href="html/chi-tiet.html?id=${item.id}" class="btn btn-success">
                            Xem chi tiết
                        </a>
                    </div>
                </div>
            </div>
        `;
        featuredContainer.appendChild(productItem);
    });
}

// ================== 4. CÁC TÍNH NĂNG QUẢN LÝ (THÊM, XÓA, SỬA) ==================
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(productList));
}

function addProduct() {
    let id = document.getElementById("id").value.trim();
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();
    let image = document.getElementById("image").value.trim();

    if (id === "" || name === "" || price === "") {
        alert("Vui lòng nhập đầy đủ Mã, Tên và Giá sản phẩm!");
        return;
    }

    if (productList.some(p => p.id === id)) {
        alert("Mã sản phẩm này đã tồn tại!");
        return;
    }

    if (image === "") image = "../assets/logo.jpg";

    productList.push({
        id: id,
        name: name,
        price: Number(price),
        image: image,
        productLink: "chi-tiet.html",
        description: "Món ăn mới bổ sung vào thực đơn."
    });

    saveProducts();
    renderProducts(productList);
    clearForm();
}

function deleteProduct(id) {
    if (confirm("Bạn có chắc chắn muốn xóa món ăn này không?")) {
        productList = productList.filter(p => p.id !== id);
        saveProducts();
        renderProducts(productList);
    }
}

function editProduct(id) {
    let product = productList.find(p => p.id === id);
    if (product) {
        document.getElementById("id").value = product.id;
        document.getElementById("id").disabled = true; 
        document.getElementById("name").value = product.name;
        document.getElementById("price").value = product.price;
        document.getElementById("image").value = product.image === "../assets/logo.jpg" ? "" : product.image;
    }
}

function updateProduct() {
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value.trim();
    let price = document.getElementById("price").value.trim();
    let image = document.getElementById("image").value.trim();

    let index = productList.findIndex(p => p.id === id);
    if (index === -1) {
        alert("Hãy bấm nút 'Sửa' ở một sản phẩm phía dưới trước!");
        return;
    }

    if (name === "" || price === "") {
        alert("Không được bỏ trống Tên và Giá!");
        return;
    }

    if (image === "") image = "../assets/logo.jpg";
    let oldDesc = productList[index].description || "Món ăn ngon miệng.";

    productList[index] = {
        id: id,
        name: name,
        price: Number(price),
        image: image,
        productLink: "chi-tiet.html",
        description: oldDesc
    };

    saveProducts();
    renderProducts(productList);
    clearForm();
}

function searchProduct() {
    let keyword = document.getElementById("search").value.toLowerCase().trim();
    let result = productList.filter(p =>
        p.name.toLowerCase().includes(keyword) || 
        p.id.toLowerCase().includes(keyword)
    );
    renderProducts(result);
}

function clearForm() {
    document.getElementById("id").value = "";
    document.getElementById("id").disabled = false; 
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("image").value = "";
}

// ================== 5. ĐỒNG BỘ WINDOW ONLOAD CHO CẢ HAI TRANG ==================
window.onload = function() {
    // Nếu trang hiện tại có khu vực hiển thị danh sách quản lý (trang san-pham.html)
    if (document.getElementById("product-list")) {
        renderProducts(productList);
    }
    
    // Nếu trang hiện tại có khu vực hiển thị sản phẩm nổi bật (trang index.html)
    if (document.getElementById("featured-products")) {
        renderFeaturedProducts();
    }
};