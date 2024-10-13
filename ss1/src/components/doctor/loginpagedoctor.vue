<template>
  <div class="container my-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-8 col-md-6 col-lg-5">
        <h1 class="text-center mb-4">Doctor Login</h1>

        <!-- Email Input -->
        <div class="form-group mb-3">
          <input type="email" class="form-control" placeholder="Email" v-model="email" />
        </div>

        <!-- Password Input -->
        <div class="form-group mb-3">
          <input type="password" class="form-control" placeholder="Password" v-model="password" />
        </div>

        <!-- Sign-in Button -->
        <div class="text-center">
          <button class="btn btn-primary w-100" @click="signin">Sign-in via Firebase</button>
        </div>

        <!-- Error Modal for Incorrect Login -->
        <div v-if="isError" class="modal d-flex align-items-center">
          <div class="modal-content mx-auto text-center p-4">
            <h2 class="text-danger mb-3">Login Error</h2>
            <p>{{ errorMessage }}</p>
            <button class="btn btn-danger mt-3" @click="closeErrorModal">Close</button>
          </div>
        </div>
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
      router.push({ name: 'loginResultDoctor', query: { email: email.value } })
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
/* Modal Styling */
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
  border-radius: 10px;
  max-width: 400px;
  text-align: center;
}

button {
  cursor: pointer;
}

/* Responsive Design */
@media (max-width: 576px) {
  .modal-content {
    width: 90%;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .modal-content {
    width: 80%;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .modal-content {
    width: 60%;
  }
}

@media (min-width: 1400px) {
  .modal-content {
    width: 40%;
  }
}
</style>
