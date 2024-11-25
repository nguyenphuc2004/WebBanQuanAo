<template>
  <div class="main-CTSP">
    <div class="container-CTSP">
      <img :src="product.image" alt="Hình ảnh sản phẩm" />
      <div class="info-CTSP">
        <h1>{{ product.name }}</h1>
        <p class="description-CTSP">{{ product.description }}</p>
        <div class="info-details">
          <p class="price-CTSP">{{ product.price }},000 VND</p>
          <p v-if="product.quality == 0" class="status-CTSP">Hết hàng</p>
          <p v-else class="status-CTSP">{{ product.status }}</p>
        </div>
        <div class="size-selection">
          <span>Kích thước:</span>
          <label v-for="size in product.size" :key="size">
            <input
              type="radio"
              id="{{ 'size-' + size }}"
              name="size"
              :value="size"
              v-model="selectedSize"
            />
            {{ size }}
          </label>
        </div>
        <div v-if="product.quality == 0">Hết hàng</div>
        <div v-else>
          <button @click="addToCart(product)" class="add-to-cart">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cart from "@/data/cart";
import ProductAoThun from "@/data/itemsAoThun";

export default {
  data() {
    return {
      product: {},
      cart: cart,
      selectedSize: "S",
    };
  },
  mounted() {
    // Lấy id từ url về
    let id = this.$route.params.id;
    // Từ id tìm trong database thông tin của id đó
    this.product = ProductAoThun.find((x) => x.id == id);
  },
  methods: {
    addToCart(product) {
      // Kiểm tra nếu sản phẩm với cùng kích thước đã có trong giỏ hàng
      const infoProduct = this.cart.find((item) => item.id == product.id && item.size == this.selectedSize && item.category == "AoThun");
      if (infoProduct) {
        if (infoProduct.quantity < product.quality) {
          infoProduct.quantity += 1;
        }
      } else {
        if (product.quality > 0) {
          //Tạo đối tượng
          const newProduct = { ...product, quantity: 1, size: this.selectedSize };
          this.cart.push(newProduct);
        }
      }
      product.quality--;
        
    },
  },
};
</script>

<style>
</style>