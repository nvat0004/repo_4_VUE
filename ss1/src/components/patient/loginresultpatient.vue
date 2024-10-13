<template>
  <div class="container">
    <h1>Welcome User</h1>

    <!-- User input and buttons for actions -->
    <div class="button-group">
      <input v-model="promptInput" placeholder="Ask your question here..." />
      <button class="action-button" @click="chatWithClinical">Chat with a Clinical Online</button>
      <button class="action-button" @click="openAppointmentModal">
        Make an Offline Appointment
      </button>
      <button class="action-button" @click="openEmailModal">Mail a Clinical</button>
    </div>

    <!-- AI response display (optional) -->
    <div v-if="aiResponse" class="ai-response">
      <h3>Response from Clinical AI:</h3>
      <p>{{ aiResponse }}</p>
    </div>

    <!-- Appointment Modal -->
    <div v-if="isAppointmentModalOpen" class="modal">
      <div class="modal-content">
        <h2>Book an Offline Appointment</h2>
        <label>Select Clinic Location:</label>
        <select v-model="appointmentData.location" class="modal-select">
          <option value="1/33 Renver Road, Clayton, Melbourne">
            1/33 Renver Road, Clayton, Melbourne
          </option>
          <option value="3/25 Noble Park, Melbourne">3/25 Noble Park, Melbourne</option>
          <option value="21 Harlington Street, Clayton">21 Harlington Street, Clayton</option>
          <option value="Monash Hospital, Clayton">Monash Hospital, Clayton</option>
        </select>

        <label for="name">Your Name:</label>
        <input v-model="appointmentData.name" type="text" id="name" required />

        <label for="email">Your Email:</label>
        <input v-model="appointmentData.email" type="email" id="email" required />

        <label for="date">Preferred Appointment Date:</label>
        <input v-model="appointmentData.date" type="date" id="date" required />

        <div class="modal-buttons">
          <button @click="confirmAppointment">Confirm Appointment</button>
          <button @click="closeAppointmentModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Email Modal -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Send Email to a Clinical</h2>
        <label for="to">Recipient Email:</label>
        <input
          v-model="emailData.to"
          type="email"
          id="to"
          placeholder="Enter clinical's email"
          required
        />

        <label for="subject">Subject:</label>
        <input
          v-model="emailData.subject"
          type="text"
          id="subject"
          placeholder="Enter email subject"
          required
        />

        <label for="body">Body:</label>
        <textarea
          v-model="emailData.body"
          id="body"
          placeholder="Enter email body"
          required
        ></textarea>

        <div class="modal-buttons">
          <button @click="sendMailToClinical">Send</button>
          <button @click="closeEmailModal">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Logout button -->
    <div class="logout-container">
      <button class="logout-button" @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { db } from '../../db.js' // Import Firestore
import { collection, addDoc } from 'firebase/firestore' // Firestore methods

const promptInput = ref('') // To store user input
const aiResponse = ref('') // To store AI response

const router = useRouter()

const chatWithClinical = () => {
  router.push({ name: 'chatPage' }) // Ensure this is the correct route for your chat page
}

// Modal states for appointments and emails
const isAppointmentModalOpen = ref(false) // Modal for selecting clinic location
const isModalOpen = ref(false) // Modal for sending an email

// Data structures for appointments and emails
const appointmentData = ref({
  location: '',
  name: '',
  email: '',
  date: ''
})

const emailData = ref({
  to: '',
  subject: '',
  body: ''
})

// Open modals
const openAppointmentModal = () => {
  isAppointmentModalOpen.value = true
}

const closeAppointmentModal = () => {
  isAppointmentModalOpen.value = false
}

const openEmailModal = () => {
  isModalOpen.value = true
}

const closeEmailModal = () => {
  isModalOpen.value = false
}

// Handle confirming the appointment
const confirmAppointment = async () => {
  // Validate appointment details
  if (
    !appointmentData.value.location ||
    !appointmentData.value.name ||
    !appointmentData.value.email ||
    !appointmentData.value.date
  ) {
    alert('Please fill in all fields before confirming your appointment.')
    return
  }

  try {
    // Save the appointment data to Firestore
    await addDoc(collection(db, 'appointments'), {
      location: appointmentData.value.location,
      name: appointmentData.value.name,
      email: appointmentData.value.email,
      date: appointmentData.value.date,
      timestamp: new Date() // To keep track of when the appointment was made
    })

    console.log('Appointment confirmed and saved to Firestore:', appointmentData.value)
    alert(
      `Appointment confirmed at ${appointmentData.value.location} on ${appointmentData.value.date}`
    )
    isAppointmentModalOpen.value = false
  } catch (error) {
    console.error('Error saving appointment:', error)
    alert('Failed to confirm appointment. Please try again later.')
  }
}

// Handle sending an email to the clinical
const sendMailToClinical = async () => {
  // Validate email details
  if (!emailData.value.to || !emailData.value.subject || !emailData.value.body) {
    alert('Please fill in all fields before sending the email.')
    return
  }

  try {
    const emailPayload = {
      from: 'vatsneeru61@gmail.com', // Replace with the sender's email address
      to: emailData.value.to, // Recipient email from input
      subject: emailData.value.subject,
      text: emailData.value.body,
      html: `<strong>${emailData.value.body}</strong>` // Email body in HTML
    }

    await axios.post(
      'http://127.0.0.1:5001/signupdoctor/us-central1/widgets/sendMail/',
      emailPayload
    )

    console.log('Email sent successfully to clinical.')
    closeEmailModal()
    alert('Email sent successfully!')
  } catch (error) {
    console.error('Error sending email:', error)
    alert('Failed to send email. Please try again later.')
  }
}

// Logout function
const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      router.push({ name: 'loginPagePatient' }) // Ensure this is the correct route for login page
    })
    .catch((error) => {
      console.error('Logout error:', error.message)
    })
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: Georgia, 'Times New Roman', Times, serif;
  background-color: #333;
  color: white;
  padding: 15px;
  text-align: center;
  border-radius: 5px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.action-button {
  background-color: #080100;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #333;
}

.ai-response {
  margin-top: 20px;
}

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
  width: 90%;
  max-width: 400px;
}

.modal-select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.logout-button {
  background-color: #ff4d4d;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 100%;
}

.logout-button:hover {
  background-color: #c70000;
}

@media (max-width: 768px) {
  .button-group {
    flex-direction: column;
  }

  .modal-content {
    width: 90%;
  }
}

@media (max-width: 576px) {
  .action-button,
  .logout-button {
    width: 100%;
  }
}
</style>
