<template>
  <div class="checkout-container">
    <h2>Thông Tin Đặt Hàng</h2>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="name">Tên người đặt hàng:</label>
        <input type="text" v-model="formData.name" id="name" required />
      </div>

      <div class="form-group">
        <label for="address">Địa chỉ:</label>
        <input type="text" v-model="formData.address" id="address" required />
      </div>

      <div class="form-group">
        <label for="phone">Số điện thoại:</label>
        <input type="tel" v-model="formData.phone" id="phone" required />
      </div>

      <div class="form-group">
        <label for="payment">Phương thức thanh toán:</label>
        <select v-model="formData.paymentMethod" id="payment">
          <option value="cash">Thanh toán khi nhận hàng</option>
          <option value="credit">Thẻ tín dụng</option>
          <option value="momo">Momo</option>
        </select>
      </div>
      <h5>*Lưu ý: Đơn hàng sẽ có từ 3 - 4 ngày.</h5>
      <h3 class="totalMoney">Tổng tiền: {{ tongtien }},000 VNĐ</h3>

      <button @click="buyNow" type="submit" class="payment-button">
        Thanh Toán
      </button>
    </form>
  </div>
</template>


<script>
import cart from "../data/cart";
import purchasedProduct from "../data/purchasedProducts";
export default {
  data() {
    return {
      formData: {
        name: "",
        address: "",
        phone: "",
        paymentMethod: "cash", // Giá trị mặc định
      },
      cart: cart,
      purchasedProduct: purchasedProduct,
    };
  },
  computed: {
    tongtien() {
      return this.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
  },
  methods: {
    submitOrder() {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        alert("Vui lòng đăng nhập để tiếp tục thanh toán!");
        this.$router.push("/comLogin");
        return;
      }

      // Lấy danh sách đơn hàng từ localStorage
      const productHistory =
        JSON.parse(localStorage.getItem("orderHistory")) || {};
      const userOrderHistory = productHistory[currentUser.username] || [];

      // Tạo đơn hàng mới
      // Tạo đơn hàng mới
      const newOrder = {
        dateTime: new Date().toLocaleString("vi-VN"), // Thời gian hiện tại
        customerName: this.formData.name,
        customerAddress: this.formData.address,
        customerPhone: this.formData.phone,
        items: this.cart.map((item) => ({
          id: item.id,
          image: item.image,
          name: item.name,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        })),
      };

      // Lưu đơn hàng mới vào lịch sử
      userOrderHistory.push(newOrder);
      productHistory[currentUser.username] = userOrderHistory;

      // Cập nhật vào localStorage
      localStorage.setItem("orderHistory", JSON.stringify(productHistory));

      // Xóa giỏ hàng sau khi thanh toán
      this.cart.length = 0;

      alert("Thanh toán thành công!");
      this.$router.push("/orderHistory");
    },
  },
};
</script>

<style>
.checkout-container {
  width: 600px;
  height: 450px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  margin-top: 7%;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  width: 450px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

label {
  width: 150px;
  /* Đặt chiều rộng cố định cho label */
  margin-right: 10px;
  font-weight: bold;
  color: #555;
  text-align: right;
}

input[type="text"],
input[type="tel"],
select {
  width: calc(100% - 170px);
  /* Trừ đi chiều rộng của label và margin-right */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 16px;
}

button.payment-button {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: white;
  background-color: #28a745;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.payment-button:hover {
  background-color: #218838;
}
.totalMoney {
  float: right;
}
</style>