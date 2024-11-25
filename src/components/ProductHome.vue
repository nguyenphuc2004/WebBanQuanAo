<template>
  <div>
    <div class="background-Ao">
      <img src="@/assets/home/backgroundHome.png" alt="" />
    </div>
    <h2 class="">Sản Phẩm Bán Chạy Nhất</h2>
    <div class="container">
      <div class="slideshow-background">
        <div
          class="slide"
          style="background-image: url('/Images/masterAoThun.jpg')"
        ></div>
        <div
          class="slide"
          style="background-image: url('/Images/masterSoMiDai.jpg')"
        ></div>
        <div
          class="slide"
          style="background-image: url('/Images/quanShort.PNG')"
        ></div>
        <div
          class="slide"
          style="background-image: url('/Images/masterSoMi.jpg')"
        ></div>
        <div
          class="slide"
          style="background-image: url('/Images/masterPolo.jpg')"
        ></div>
      </div>
    </div>
    <div class="imageHome">
      <h2 class="heading-bar__title">Combo Mix &amp; Match Đúng Chuẩn</h2>
      <img src="@/assets/home/combo1_2_master.webp" alt="" />

      <img src="@/assets/home/combo2_1_master.jpg" alt="" />

      <img src="@/assets/home/combo3_master.jpg" alt="" />

      <img src="@/assets/home/combo4_master.webp" alt="" />
      <h2 class="">Sản Phẩm Mới Nhất HAPPYSTORE</h2>
    </div>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Tìm kiếm sản phẩm..."
      class="search-input"
    />
    <div class="product-grid">
      <div
        v-for="cata in filteredProducts"
        :key="cata.id"
        class="image-container"
      >
        <router-link
          :to="{ name: 'ProductDetailHome', params: { id: cata.id } }"
          class="no-underline"
        >
          <img :src="cata.image" alt="Tên hình ảnh" />
          <h3>{{ cata.name }}</h3>
          <p>{{ cata.price }},000 VNĐ</p>
          <div class="status">
            <p v-if="cata.quality == 0">Hết hàng</p>
            <p v-else>{{ cata.status }}</p>
          </div>
        </router-link>
      </div>
    </div>
    <!-- Phần phân trang -->
    <div class="pagination-buttons">
      <button
        v-for="page in totalPage"
        :key="page"
        :class="{ active: page === currentPage }"
        @click="changePage(page)"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import item from "../data/itemsProductHome";
export default {
  name: "ProductHome",
  data() {
    return {
      products: item,
      currentPage: 1,
      limit: 8,
      searchQuery: "", // Từ khóa tìm kiếm
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.products.length / this.limit);
    },
    filteredProducts() {
      // Lọc sản phẩm dựa trên từ khóa tìm kiếm
      const filtered = this.products.filter((product) =>
        product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      // Áp dụng phân trang
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return filtered.slice(start, end);
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPage) {
        this.currentPage = page;
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Tạo hiệu ứng cuộn mượt mà
        });
      }
    },
  },
  mounted() {
    let slides = document.querySelectorAll(".slide");
    let currentIndex = 0;

    // Hiển thị slide đầu tiên ngay khi trang được tải
    slides[currentIndex].classList.add("active");

    function showNextSlide() {
      slides[currentIndex].classList.remove("active");
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].classList.add("active");
    }

    // Thiết lập thời gian chuyển ảnh (3000ms = 3 giây)
    setInterval(showNextSlide, 2000);
  },
};
</script>

<style>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.slideshow-background {
  position: relative;
  width: 100%;
  max-width: 1024px; /* Giới hạn chiều rộng */
  height: 600px;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}

/* Định dạng cho từng ảnh */
.slide {
  position: absolute;
  width: 70%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-in-out;
  margin-left: 15%;
}

/* Hiệu ứng hiện ảnh */
.slide.active {
  opacity: 1;
}
.sanPhamBanChay {
  color: rgb(19, 19, 18);
  font-size: 25px;
  margin-right: 58%;
  margin-bottom: 10px;
  margin-top: 10px;
}
.imageHome img {
  width: 20%;
  margin: 3px;
  border-radius: 10px;
}
/* Tạo lưới chứa sản phẩm */
.product-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 10px;
}

/* Tạo vùng chứa hình ảnh */
.image-container {
  text-align: center;
  width: 200px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Định dạng hình ảnh */
.image-container img {
  width: 100%;
  border-radius: 8px;
}

/* Tên của hình ảnh */
.image-container h3 {
  margin: 15px 0 5px;
  color: #333;
}
.no-underline {
  text-decoration: none;
}

/* Mô tả của hình ảnh */
.image-container p {
  color: #13125e;
  font-size: 20px;
  float: left;
}
.status p {
  margin-left: 5%;
  margin-top: 11%;
  font-size: 15px;
  color: green;
}

/* Tạo vùng chứa hình ảnh */
/* Hiệu ứng nổi lên khi hover */
.image-container:hover {
  transform: translateY(-5px); /* Di chuyển container lên một chút */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Tăng cường độ bóng */
  cursor: pointer;
}
.jus {
  margin-top: 10px;
}
.bangSizeAoSoMi img {
  width: 95%;
}
.pagination-buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination-buttons button {
  padding: 10px 15px;
  margin: 0 5px;
  background-color: #9cb7d4;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.pagination-buttons button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination-buttons button:hover:not(:disabled) {
  background-color: #0056b3;
}

.pagination-buttons span {
  font-size: 16px;
  margin: 0 10px;
}
.search-input {
  display: block;
  margin: 20px auto;
  padding: 10px;
  width: 80%;
  max-width: 400px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
