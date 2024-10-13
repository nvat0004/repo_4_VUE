<template>
  <div class="container">
    <div class="row">
      <div class="button-container">
        <button class="btn btn-login" @click="navigateToLogin">Log In</button>
      </div>
      <div class="button-container">
        <button class="btn btn-signup" @click="navigateToSignup">Sign Up</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToSignup = () => {
  router.push({ name: 'signupDoctor' }) // Updated to match the route name in routes.js
}

const navigateToLogin = () => {
  router.push({ name: 'loginPageDoctor' }) // Updated to match the route name in routes.js
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures the container spans the full viewport height */
  background-color: #effaec; /* Light background for a calming effect */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

.row {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow for a clean look */
  max-width: 90%; /* Responsive max width */
  flex-wrap: wrap; /* Ensure wrapping for very small devices */
}

.button-container {
  display: flex; /* Ensures alignment of buttons */
}

.btn {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  border: none; /* Remove default border styling */
  cursor: pointer;
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  text-transform: uppercase; /* Styling preference for buttons */
  font-weight: bold;
  width: 150px; /* Set a fixed width for buttons for uniformity */
}

/* Button styles */
.btn-login {
  background-color: #007bff; /* Blue color for login button */
  color: white;
}

.btn-login:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.btn-signup {
  background-color: #28a745; /* Green color for signup button */
  color: white;
}

.btn-signup:hover {
  background-color: #218838; /* Darker shade on hover */
}

/* Media queries for responsiveness */
@media screen and (max-width: 1400px) {
  .row {
    flex-direction: row; /* Keep buttons side by side on larger screens */
  }
}

@media screen and (max-width: 992px) {
  .row {
    flex-direction: row; /* Adjust layout for medium screens */
  }
}

@media screen and (max-width: 768px) {
  .row {
    flex-direction: column; /* Stack buttons on smaller screens */
    align-items: center; /* Center buttons in column layout */
  }

  .btn {
    width: 100%; /* Full width for smaller buttons */
  }
}

@media screen and (max-width: 576px) {
  .btn {
    font-size: 14px; /* Slightly smaller font size for very small screens */
    padding: 10px 20px; /* Adjust padding for smaller devices */
  }
}
</style>
