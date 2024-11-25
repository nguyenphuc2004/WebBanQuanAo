<template>
  <div>
    <div class="background-Ao">
      <img src="@/assets/quanJean/backgroundQuanJean.png" alt="" />
    </div>
    <div class="jus"></div>
    <div class="product-grid">
      <div v-for="cata in filterProduct" :key="cata.id" class="image-container">
        <router-link
          :to="{ name: 'ProductDetailQuanJean', params: { id: cata.id } }"
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
    <div class="introduction-AoThun">
      <p style="text-align: center">
        Tham khảo các mẫu quần jean chất liệu cao cấp, được thiết kế thời trang
        với đa dạng kiểu dáng, màu sắc như: quần Jean trắng, quần Jean xanh đậm,
        quần Jean đen.
      </p>
      <hr />
      <h1 style="text-align: center">
        <strong>50+ Mẫu Quần jean Nam Cao Cấp, Chính Hãng - HAPPYSTORE</strong>
      </h1>
      <p style="text-align: justify">
        Quần Jean là một món đồ thời trang cơ bản và không bao giờ lỗi mốt trong
        tủ đồ của phái nam. Hiện nay, kiểu dáng quần jean đã được biến tấu, cách
        điệu để không bị đơn điệu, nhàm chán. Cùng HAPPYSTORE khám phá các thiết
        kế quần jean cực phong cách để chọn cho mình mẫu quần chuẩn gu nhất!
      </p>
      <h2 style="text-align: justify">
        <strong>Một số loại quần jean nam thông dụng</strong>
      </h2>
      <p style="text-align: justify">
        Bởi vì tính phổ biến của quần jean nên trên thị trường có vô vàn các thể
        loại quần jean khác nhau. Tuy nhiên, để nói đến những kiểu quần jean cho
        nam thông dụng nhất, được ưa chuộng nhiều nhất. Thì phải kể đến những
        loại quần jean nam được đề cập bên dưới đây:
      </p>
      <h2 style="text-align: justify">
        <strong>Bảng size quần Jean nam chính xác nhất</strong>
      </h2>
      <p style="text-align: justify">
        Để đảm bảo quần jean vừa vặn và tôn dáng hoàn hảo, việc chọn đúng size
        là rất quan trọng. Dưới đây là bảng size quần jean nam chuẩn nhất của
        HAPPYSTORE:
      </p>
      <p>
        <img src="@/assets/quanJean/bangSizeQuanJean1.png" alt="" />
      </p>
      <p>
        <img src="@/assets/quanJean/bangSizeQuanJean2.png" alt="" />
      </p>
      <p>
        <img src="@/assets/quanJean/bangSizeQuanJean3.png" alt="" />
      </p>
    </div>
  </div>
</template>

<script>
import item from "../data/itemsQuanJean";
export default {
  name: "ProductJean",
  data() {
    return {
      products: item,
      currentPage: 1,
      limit: 8,
    };
  },
  computed: {
    totalPage() {
      return Math.ceil(this.products.length / this.limit);
    },
    filterProduct() {
      const start = (this.currentPage - 1) * this.limit;
      const end = start + this.limit;
      return this.products.slice(start, end);
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
};
</script>

<style>
</style>
