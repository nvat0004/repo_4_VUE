<template>
  <div class="container">
    <h1 class="title">Welcome, Doctor</h1>

    <!-- Button section -->
    <div class="button-container">
      <button class="action-button" @click="fetchAppointments">Offline Appointment List</button>
      <button class="action-button" @click="openEmailModal">Mail to Patients</button>
    </div>

    <div class="button-container">
      <button class="logout-button" @click="logout">Logout</button>
    </div>

    <!-- Appointment list display -->
    <div v-if="appointments.length" class="appointments-section">
      <h3 class="section-title">Offline Appointments</h3>
      <ul class="appointment-list">
        <li v-for="(appointment, index) in appointments" :key="index" class="appointment-item">
          <strong>Name:</strong> {{ appointment.name }} <br />
          <strong>Email:</strong> {{ appointment.email }} <br />
          <strong>Location:</strong> {{ appointment.location }} <br />
          <strong>Date:</strong> {{ appointment.date }} <br />
        </li>
      </ul>
    </div>

    <!-- Modal for Email -->
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <h2>Send Email</h2>
        <label for="to">Recipient Email:</label>
        <input
          v-model="emailData.to"
          type="email"
          id="to"
          placeholder="Enter patient's email"
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
          <button class="action-button" @click="sendMailToPatients">Send</button>
          <button class="cancel-button" @click="closeEmailModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../db.js'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

// Axios instance for sending emails
let axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5001/signupdoctor/us-central1/widgets/sendMail/',
  timeout: 12000,
  headers: {}
})

// State for appointments, modal, and email data
const appointments = ref([]) // For fetched appointments
const isModalOpen = ref(false) // For email modal
const emailData = ref({
  to: '',
  subject: '',
  body: ''
})

const router = useRouter()

// Fetch appointments from Firestore
const fetchAppointments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'appointments'))
    appointments.value = querySnapshot.docs.map((doc) => doc.data())
    console.log('Appointments fetched:', appointments.value)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    alert('Failed to fetch appointments. Please try again later.')
  }
}

// Function to open the email modal
const openEmailModal = () => {
  isModalOpen.value = true
}

// Function to close the email modal
const closeEmailModal = () => {
  isModalOpen.value = false
}

// Function to send email to patients
const sendMailToPatients = async () => {
  try {
    const emailPayload = {
      from: 'vatsneeru61@gmail.com', // This can be your default sender email
      to: emailData.value.to, // Take recipient email from modal input
      subject: emailData.value.subject,
      text: emailData.value.body,
      html: `<strong>${emailData.value.body}</strong>`
    }

    await axiosInstance.post('/', emailPayload)
    console.log('Email sent successfully')
    closeEmailModal()
  } catch (error) {
    console.log('Error sending email:', error)
  }
}

// Function for logging out
const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      router.push({ name: 'loginPageDoctor' })
    })
    .catch((error) => {
      console.log(error.message)
    })
}
</script>

<style scoped>
/* General container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: #f3f4f6; /* Calming background color */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Title styling */
.title {
  font-family: 'Arial', sans-serif;
  color: #333;
  margin-bottom: 20px;
  font-size: 2rem;
}

/* Button section styling */
.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
}

.action-button,
.logout-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button {
  background-color: #dc3545;
}

.action-button:hover {
  background-color: #0056b3;
}

.logout-button:hover {
  background-color: #c82333;
}

/* Appointment list styling */
.appointments-section {
  margin-top: 30px;
  text-align: left;
}

.section-title {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

.appointment-list {
  list-style: none;
  padding: 0;
}

.appointment-item {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

/* Modal styling */
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
  width: 100%;
  max-width: 500px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.cancel-button {
  background-color: #6c757d;
}

.cancel-button:hover {
  background-color: #5a6268;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}

button {
  cursor: pointer;
}

/* Media queries for responsiveness */
@media (max-width: 576px) {
  .action-button,
  .logout-button {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .button-container {
    flex-direction: column;
  }
}

@media (min-width: 992px) {
  .container {
    padding: 40px;
  }
}

@media (min-width: 1400px) {
  .title {
    font-size: 2.5rem;
  }
}
</style>
