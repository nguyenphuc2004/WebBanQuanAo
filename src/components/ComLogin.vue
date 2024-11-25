<template>
  <body>
    <div class="container-Login">
      <div class="toggle-buttons-Login">
        <button :class="{ active: isLoginForm }" @click="showLoginForm">
          Đăng nhập
        </button>
        <button :class="{ active: !isLoginForm }" @click="showRegisterForm">
          Đăng ký
        </button>
      </div>

      <div v-if="isLoginForm" class="wrapper-Login">
        <!-- Form Đăng nhập -->
        <form @submit.prevent="submitLogin">
          <h1>Đăng nhập</h1>
          <div class="input-box-Login">
            <input
              v-model="usernamelogin"
              type="text"
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div class="input-box-Login-PassWord">
            <input
              v-model="passwordlogin"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Mật khẩu"
              required
            />
            <span class="toggle-password-Login" @click="togglePassword"> </span>
          </div>

          <button type="submit" class="btn-Login btn-icon-Login">
            Đăng nhập
            <ion-icon
              name="arrow-forward-circle-outline"
              id="icon-arrow-Login"
            ></ion-icon>
          </button>
          <div class="social-login-Login">
            <div class="or-Login">Hoặc</div>
            <button class="social-btn-Login google-btn-Login">
              <ion-icon name="logo-google"></ion-icon> Đăng nhập với Google
            </button>
            <button class="social-btn-Login facebook-btn-Login">
              <ion-icon name="logo-facebook"></ion-icon> Đăng nhập với Facebook
            </button>
          </div>
        </form>
      </div>
      <!-- ///////////////////////////////////////////////////////////////////// -->
      <div v-else class="wrapper-Login">
        <!-- Form Đăng ký -->
        <form @submit.prevent="submitRegister">
          <h1>Đăng ký</h1>
          <div class="input-box-Login">
            <input
              v-model="username"
              type="text"
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div class="input-box-Login-PassWord">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              placeholder="Mật khẩu"
              required
            />
            <span class="toggle-password-Login" @click="togglePassword"></span>
          </div>
          <div class="input-box-Login-PassWord">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              required
            />
          </div>
          <p v-if="error" class="error" style="color: red">{{ error }}</p>
          <button type="submit" class="btn-Login btn-icon-Login">
            Đăng ký
            <ion-icon
              name="arrow-forward-circle-outline"
              id="icon-arrow-Login"
            ></ion-icon>
          </button>

          <div class="social-register-Login">
            <div class="or-Login">Hoặc</div>
            <button class="social-btn-Login google-btn-Login">
              <ion-icon name="logo-google"></ion-icon> Đăng ký với Google
            </button>
            <button class="social-btn-Login facebook-btn-Login">
              <ion-icon name="logo-facebook"></ion-icon> Đăng ký với Facebook
            </button>
          </div>
        </form>
      </div>
    </div>
  </body>
</template>

<script>
import users from "@/data/users";
import eventBus from "@/eventBus";
export default {
  data() {
    return {
      isLoginForm: true,
      showPassword: false,
      usernamelogin: "",
      passwordlogin: "",
      error: "",
      username: "",
      password: "",
      confirmPassword: "",
      users: users,
    };
  },
  methods: {
    showLoginForm() {
      this.isLoginForm = true;
    },
    showRegisterForm() {
      this.isLoginForm = false;
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    submitRegister() {
      if (this.password !== this.confirmPassword) {
        this.error = "Mật khẩu không khớp!";
        return;
      }

      // Kiểm tra nếu tên đăng nhập đã tồn tại trong danh sách users
      const existingUser = this.users.find((user) => user.username === this.username);
      if (existingUser) {
        this.error = "Tên đăng nhập đã tồn tại!";
        return;
      }

      // Tạo người dùng mới và thêm vào danh sách users
      const newUser = {
        id: this.users.length + 1,
        username: this.username,
        password: this.password,
      };
      this.users.push(newUser);

      // Lấy danh sách users từ localStorage hoặc sử dụng mảng trống nếu không có
      // const users1 = JSON.parse(localStorage.getItem("users")) || [];
      // Lưu danh sách users cập nhật vào lại localStorage
      localStorage.setItem("users", JSON.stringify(newUser));

      alert("Đăng ký thành công!");

      // Xóa dữ liệu form và chuyển lại sang form đăng nhập
      this.username = "";
      this.password = "";
      this.confirmPassword = "";
      this.isLoginForm = true;
    },
    submitLogin() {
      // Kiểm tra tài khoản và mật khẩu
      const user = this.users.find((x) =>x.username === this.usernamelogin && x.password === this.passwordlogin);

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
        eventBus.emit("loginSuccess", user);
        this.$router.push("/"); // Điều hướng về trang chủ sau khi đăng nhập thành công
        alert("Đăng nhập thành công!");
      } else {
        alert("Tài khoản hoặc mật khẩu sai!");
      }
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #ffffff;
  border: 5px solid rgba(255, 255, 255, 1);
  border-radius: 12px;
}

.container-Login {
  background-color: #fff;
  border: 3px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
}

.toggle-buttons-Login {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.toggle-buttons-Login button {
  padding: 10px 20px;
  border: none;
  background-color: #ddd;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
}

.toggle-buttons-Login .active {
  background-color: #6db8f9;
  color: white;
}

.wrapper-Login {
  width: 100%;
  max-width: 420px;
  color: #333;
  padding: 30px 20px;
}

.wrapper-Login h1 {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
  color: #6db8f9;
}

.input-box-Login input {
  width: 100%;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  padding: 15px;
  margin: 5px 0;
}
.input-box-Login-PassWord input {
  width: 92%;
  background: transparent;
  border: 2px solid rgba(0, 0, 0, 0.1);
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  color: #333;
  padding: 15px;
  margin: 5px 0;
}

.input-box-Login input::placeholder {
  color: #888;
}

.toggle-password-Login {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  color: #333;
  cursor: pointer;
  font-size: 18px;
}

.btn-Login {
  width: 100%;
  height: 45px;
  background: #6db8f9;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  color: white;
  font-weight: 600;
  margin-top: 20px;
}

.social-login-Login,
.social-register-Login {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

.toggle-buttons-Login button:hover,
.social-btn-Login:hover,
.btn-Login:hover {
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.or-Login {
  text-align: center;
  margin: 10px 0;
  color: #777;
}

.social-btn-Login {
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  padding: 0 10px;
  font-weight: 600;
  gap: 10px;
}

.btn-icon-Login {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.google-btn-Login {
  background-color: #db4437;
}

.facebook-btn-Login {
  background-color: #3b5998;
}

.social-btn-Login ion-icon {
  font-size: 23px;
}

#icon-arrow-Login {
  font-size: 23px;
}
</style>