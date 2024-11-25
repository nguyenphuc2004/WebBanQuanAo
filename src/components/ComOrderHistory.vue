<template>
  <div v-if="!product || product.length === 0">
    <p class="gioHangTrong">Chưa có lịch sử</p>
  </div>
  <div v-else class="table-container">
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Ngày Giờ Đặt Hàng</th>
          <th>Hình</th>
          <th>Tên Sản Phẩm</th>
          <th>Đơn Giá</th>
          <th>Size</th>
          <th>Số Lượng</th>
          <th>Tổng Tiền</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(order, orderIndex) in product" :key="orderIndex">
          <!-- Hàng tiêu đề đơn hàng -->
          <tr class="order-header">
            <td colspan="8">Đơn Hàng Thứ {{ orderIndex + 1 }}</td>
          </tr>

          <!-- Sản phẩm trong đơn hàng -->
          <tr v-for="(item, itemIndex) in order.items" :key="item.id">
            <td>{{ itemIndex + 1 }}</td>
            <td>{{ order.dateTime }}</td>
            <td>
              <img :src="item.image" alt="Product Image" class="product-img" />
            </td>
            <td>{{ item.name }}</td>
            <td>{{ item.price.toLocaleString() }},000 VNĐ</td>
            <td>{{ item.size }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.totalPrice.toLocaleString() }},000 VNĐ</td>
          </tr>

          <!-- Thông tin người đặt hàng -->
          <tr class="order-user-info">
            <td colspan="8">
              <strong>Người đặt hàng:</strong> {{ order.customerName }}<br />
              <strong>Địa chỉ:</strong> {{ order.customerAddress }}<br />
              <strong>Số điện thoại:</strong> {{ order.customerPhone }}
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // product: JSON.parse(localStorage.getItem("productCreate")) || null,
      // orderHistory: [],
      product: null,
    };
  },
  created() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      const productHistory = JSON.parse(localStorage.getItem("orderHistory")) || {};
      this.product = productHistory[currentUser.username] || [];
    }
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 7%;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

table th {
  background-color: #f2f2f2;
}

.table-container {
  counter-reset: rowNumber;
}

.rowNumber::before {
  counter-increment: rowNumber;
  content: counter(rowNumber);
}

.product-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>