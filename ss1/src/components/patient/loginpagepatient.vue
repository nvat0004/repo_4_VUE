<template>
  <div class="container">
    <h1>Validate Details for User</h1>

    <div class="input-group">
      <input type="text" placeholder="Email" v-model="email" />
    </div>
    <div class="input-group">
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div class="button-group">
      <button @click="signin">SIGN IN</button>
    </div>

    <!-- Error modal for incorrect login -->
    <div v-if="isError" class="modal">
      <div class="modal-content">
        <h2>LOGIN ERROR</h2>
        <p>{{ errorMessage }}</p>
        <button @click="closeErrorModal">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const isError = ref(false) // Tracks if there's an error
const errorMessage = ref('') // Holds the error message
const router = useRouter()
const auth = getAuth()

// Function to close the error modal
const closeErrorModal = () => {
  isError.value = false
}

const signin = () => {
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Firebase Sign-in Successful!', userCredential)
      // Redirect to loginResultDoctor if sign-in succeeds
      router.push({ name: 'loginResultPatient', query: { email: email.value } })
    })
    .catch((error) => {
      // Show the error modal if sign-in fails
      console.log(error.code)
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage.value = 'Incorrect email or password. Unable to login.'
      } else {
        errorMessage.value = 'An error occurred. Please try again.'
      }
      isError.value = true
    })
}
</script>

<style scoped>
/* Container styles */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Full viewport height */
  background-color: #effaec; /* Light background for a calming effect */
  padding: 20px; /* Padding for better spacing */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

/* Input group styles */
.input-group {
  margin-bottom: 20px; /* Space between input fields */
  width: 100%; /* Full width for better responsiveness */
  max-width: 400px; /* Max width for inputs */
}

input {
  width: 100%; /* Full width input */
  padding: 12px;
  border: 1px solid #ccc; /* Light border for input fields */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size for input */
}

/* Button group styles */
.button-group {
  width: 100%; /* Full width for button group */
  max-width: 400px; /* Max width for buttons */
}

button {
  padding: 12px 20px; /* Padding for buttons */
  border: none; /* Remove border */
  border-radius: 5px; /* Rounded corners */
  background-color: #007bff; /* Primary button color */
  color: white; /* Text color */
  font-size: 16px; /* Font size */
  cursor: pointer; /* Pointer on hover */
  transition: background-color 0.3s ease; /* Smooth transition for hover effect */
  width: 100%; /* Full width button */
}

button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

/* Modal styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 90%; /* Full width for modal on small screens */
  max-width: 400px; /* Max width for modal */
  text-align: center;
}

/* Media queries for responsiveness */
@media screen and (max-width: 576px) {
  .container {
    padding: 10px; /* Less padding on very small screens */
  }
}

@media screen and (min-width: 576px) and (max-width: 768px) {
  .input-group,
  .button-group {
    width: 100%; /* Full width on medium screens */
    max-width: 100%; /* No max width restriction */
  }
}

@media screen and (min-width: 992px) {
  .modal-content {
    width: 400px; /* Fixed width for larger screens */
  }
}
</style>
