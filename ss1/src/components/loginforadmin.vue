<template>
  <div class="container">
    <div class="login-container">
      <h1 class="text-center">Welcome to Admin Login</h1>
      <h2 class="text-center">Admin Login</h2>

      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required placeholder="Enter admin email" />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            id="password"
            v-model="password"
            required
            placeholder="Enter admin password"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ error }}
        </div>

        <button type="submit" class="btn btn-primary w-100">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleLogin() {
      const adminEmail = 'admin@gmail.com'
      const adminPassword = 'Sunday@123'

      if (this.email === adminEmail && this.password === adminPassword) {
        this.error = ''
        this.$router.push({ name: 'adminLoginPage' })
      } else {
        this.error = 'Invalid email or password. Please try again.'
      }
    }
  }
}
</script>

<style scoped>
/* Container styles */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #effaec;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Login container styles */
.login-container {
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  background-color: #f7fdf4;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

/* Form group styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  border-color: #28a745;
}

/* Error message styles */
.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 15px;
  text-align: center;
}

/* Button styles */
.btn {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  width: 100%;
  text-transform: uppercase;
}

.btn-primary:hover {
  background-color: #0056b3;
}

/* Responsive Design */
@media (max-width: 576px) {
  .login-container {
    padding: 20px;
  }

  .btn {
    font-size: 14px;
    padding: 10px 20px;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .login-container {
    padding: 25px;
  }

  .btn {
    font-size: 15px;
  }
}

@media (min-width: 992px) {
  .login-container {
    padding: 35px;
  }

  .btn {
    font-size: 16px;
  }
}

@media (min-width: 1400px) {
  .login-container {
    padding: 40px;
  }
}
</style>
