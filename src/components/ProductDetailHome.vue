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
import ProductHome from "@/data/itemsProductHome";

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
    this.product = ProductHome.find((x) => x.id == id);
  },
  methods: {
    addToCart(product) {
      // Kiểm tra nếu sản phẩm với cùng kích thước đã có trong giỏ hàng
      const infoProduct = this.cart.find((item) =>
          item.id == product.id &&
          item.size == this.selectedSize &&
          item.category == "home"
      );
      if (infoProduct) {
        if (infoProduct.quantity < product.quality) {
          infoProduct.quantity += 1;
        }
      } else {
        if (product.quality > 0) {
          //Tạo đối tượng
          const newProduct = {
            ...product,
            quantity: 1,
            size: this.selectedSize,
          };
          this.cart.push(newProduct);
        }
      }
      product.quality--;
    },
  },
};
</script>

<style>
.main-CTSP {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  background-color: #f5f5f5;
}

.container-CTSP {
  display: flex;
  width: 900px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.container-CTSP img {
  width: 50%;
  object-fit: cover;
}

.info-CTSP {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-CTSP h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 10px;
}

.info p.description-CTSP {
  font-size: 16px;
  color: #666;
}

.info-CTSP p.price-CTSP {
  font-size: 20px;
  color: #333;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-CTSP p.status-CTSP {
  margin-left: 10%;
  font-size: 20px;
  color: green;
}

.info p.status-CTSP.out-of-stock {
  color: red;
}

.add-to-cart {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #3aa9f9;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart:hover {
  background-color: #258af5;
}

.info-details {
  display: flex;
  flex-wrap: wrap; /* Allow text to wrap if necessary */
  margin-bottom: 5px;
}
.size-selection {
  margin-right: 41%;
  margin-bottom: 10px;
}

.size-selection span {
  margin-right: 10px;
  font-weight: bold;
}

.size-selection label {
  margin-right: 15px;
  cursor: pointer;
}

.size-selection input[type="radio"] {
  margin-right: 5px;
}
</style>