<template>
  <div class="container">
    <h1>Add Your Details for Patients</h1>
    <div class="input-group">
      <input type="text" placeholder="Email" v-model="email" />
    </div>
    <div class="input-group">
      <input type="password" placeholder="Password" v-model="password" />
    </div>
    <div class="input-group">
      <input type="text" placeholder="First Name" v-model="firstName" />
    </div>
    <div class="input-group">
      <input type="text" placeholder="Last Name" v-model="lastName" />
    </div>
    <div class="input-group">
      <input type="text" placeholder="Mobile Number" v-model="mobile" />
    </div>
    <div class="button-group">
      <button @click="register">Signup</button>
    </div>
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
const firstName = ref('') // Added First Name
const lastName = ref('') // Added Last Name
const mobile = ref('')

// Router instance for navigation
const router = useRouter()

const register = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const user = userCredential.user
    console.log('Firebase Auth User: ', user)

    // Save additional user details to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      firstName: firstName.value,
      lastName: lastName.value,
      mobile: mobile.value,
      email: email.value
    })

    alert('Details successfully stored in the Database!')
    router.push('/some-success-route')
  } catch (error) {
    console.error('Error in Firestore: ', error)
    alert('Firestore Error: ' + error.message)
  }
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
  background-color: #f0f8ff; /* Light background for a calming effect */
  padding: 20px; /* Padding for better spacing */
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

/* Input group styles */
.input-group {
  margin-bottom: 15px; /* Space between input fields */
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
  .input-group,
  .button-group {
    max-width: 400px; /* Fixed width for larger screens */
  }
}
</style>
