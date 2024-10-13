<template>
  <div class="container">
    <h1>Add Details for Doctor</h1>
    <form @submit.prevent="register">
      <div class="input-group">
        <input type="text" placeholder="Email" v-model="email" required />
      </div>
      <div class="input-group">
        <input type="password" placeholder="Password" v-model="password" required />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Doctor Full Name" v-model="doctorName" required />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Doctor ID" v-model="doctorID" required />
      </div>
      <div class="input-group">
        <input type="text" placeholder="Mobile Number" v-model="mobile" required />
      </div>
      <p>
        <button class="btn-signup" @click="register">Sign Up</button>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, setDoc } from 'firebase/firestore'
import { firebaseApp } from '@/db'

// Firebase auth instance creation
const auth = getAuth(firebaseApp)

// Reference for data properties
const email = ref('')
const password = ref('')
const doctorName = ref('')
const doctorID = ref('')
const mobile = ref('')

// Router instance for navigation
const router = useRouter()

const register = async () => {
  try {
    // Creating user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    console.log('Firebase Auth User: ', user)

    // Save additional user details in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      doctorName: doctorName.value,
      doctorID: doctorID.value,
      mobile: mobile.value,
      email: email.value // Optionally, store the email in Firestore as well
    })

    alert('Details successfully stored in the Database!')
    console.log('User details saved to Firestore successfully!')
    router.push('/some-success-route') // Specify your success route here
  } catch (error) {
    console.error('Error in user registration: ', error)
    alert(error.message) // Basic error alert
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh; /* Full viewport height */
  background-color: #f0f8ff; /* Light background for a calming effect */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
  padding: 20px; /* Padding for better spacing */
}

h1 {
  margin-bottom: 20px; /* Spacing below the heading */
  color: #333; /* Darker text color for better contrast */
}

form {
  width: 100%; /* Full width for form */
  max-width: 400px; /* Maximum width of the form */
  background-color: #ffffff; /* White background for form */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Softer shadow for a clean look */
  padding: 20px; /* Padding inside the form */
}

.input-group {
  margin-bottom: 15px; /* Spacing between input fields */
}

input {
  width: 100%; /* Full width for inputs */
  padding: 10px; /* Padding for inputs */
  border: 1px solid #ccc; /* Light border */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size for inputs */
}

input:focus {
  border-color: #007bff; /* Highlight border on focus */
  outline: none; /* Remove default outline */
}

.btn-signup {
  width: 100%; /* Full width for button */
  padding: 12px; /* Padding for button */
  font-size: 16px; /* Font size for button */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  background-color: #007bff; /* Button color */
  color: white; /* Text color */
  cursor: pointer; /* Pointer cursor */
  transition: background-color 0.3s ease; /* Smooth transition */
}

.btn-signup:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

/* Media queries for responsiveness */
@media screen and (max-width: 1400px) {
  .container {
    padding: 40px; /* More padding for larger screens */
  }
}

@media screen and (max-width: 992px) {
  form {
    max-width: 90%; /* Adjust maximum width on medium screens */
  }
}

@media screen and (max-width: 768px) {
  input {
    font-size: 14px; /* Slightly smaller font size on smaller screens */
  }
}

@media screen and (max-width: 576px) {
  input {
    padding: 8px; /* Less padding for very small screens */
  }

  .btn-signup {
    font-size: 14px; /* Smaller button font size for small screens */
  }
}
</style>
