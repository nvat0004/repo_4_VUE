<template>
  <div class="container">
    <div class="row">
      <div class="button-container">
        <button class="btn btn-login" @click="navigateToLogin">LOG IN</button>
      </div>
      <div class="button-container">
        <button class="btn btn-signup" @click="navigateToSignup">SIGN UP</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToSignup = () => {
  router.push({ name: 'signupPatient' }) // Updated to match the route name in routes.js
}

const navigateToLogin = () => {
  router.push({ name: 'loginPagePatient' }) // Updated to match the route name in routes.js
}
</script>

<style scoped>
/* Container styles */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensures the container spans the full viewport height */
  background-color: #effaec; /* Light background for a calming effect */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

/* Row styles */
.row {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(241, 235, 235, 0.2);
  max-width: 90%; /* Responsive max width */
  flex-wrap: wrap; /* Ensure wrapping for very small devices */
}

/* Button container */
.button-container {
  display: flex; /* Align buttons */
  flex: 1; /* Make containers equal size */
  justify-content: center; /* Center align buttons */
}

/* Button styles */
.btn {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  border: none; /* Remove border to match modern design */
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.2s ease; /* Smooth transition for hover effect */
  text-transform: uppercase; /* Uppercase text for buttons */
  font-weight: bold;
}

/* Login button styles */
.btn-login {
  background-color: #007bff; /* Primary color for login */
  color: white;
}

/* Hover effect for login button */
.btn-login:hover {
  background-color: #0056b3; /* Darker shade on hover */
  transform: translateY(-2px); /* Lift effect on hover */
}

/* Signup button styles */
.btn-signup {
  background-color: #28a745; /* Success color for signup */
  color: white;
}

/* Hover effect for signup button */
.btn-signup:hover {
  background-color: #218838; /* Darker shade on hover */
  transform: translateY(-2px); /* Lift effect on hover */
}

/* Media queries for responsive design */
@media screen and (max-width: 992px) {
  .row {
    flex-direction: column; /* Stack buttons on smaller screens */
  }

  .btn {
    width: 100%; /* Full width for buttons */
    margin-bottom: 10px; /* Space between buttons */
  }
}

@media screen and (min-width: 992px) {
  .row {
    flex-direction: row; /* Row layout for larger screens */
  }
}
</style>
