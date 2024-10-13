<template>
  <div class="container my-5">
    <div class="row justify-content-center text-center">
      <div class="col-12 col-md-4 mb-3">
        <button class="btn btn-login w-100" @click="viewFeedback">View Feedback</button>
      </div>

      <div class="col-12 col-md-4 mb-3">
        <button class="btn btn-signup w-100" @click="openBulkEmailModal">Bulk Email</button>
      </div>
    </div>

    <!-- Feedback Results -->
    <div v-if="feedbackVisible" class="feedback-results">
      <h3>Feedback Results</h3>
      <p>Average Rating: {{ averageRating }}</p>
      <p>Total Ratings: {{ totalRatings }}</p>
    </div>

    <!-- Import Data Button -->
    <div class="row justify-content-center text-center mt-4">
      <div class="col-12 col-md-4 mb-3">
        <button class="btn btn-signup w-100" @click="goToImportData">Import Data</button>
      </div>
    </div>

    <div class="col-12 col-md-4 mb-3">
      <button class="btn btn-danger w-100" @click="logout">Logout</button>
    </div>

    <!-- Bulk Email Modal -->
    <div v-if="isBulkEmailModalOpen" class="modal">
      <div class="modal-content p-4">
        <h2 class="mb-3">Send Bulk Email</h2>
        <div class="form-group">
          <label for="recipients">Recipient Emails (comma-separated):</label>
          <input
            v-model="bulkEmailData.recipients"
            type="text"
            id="recipients"
            class="form-control"
            placeholder="Enter emails separated by commas"
            required
          />
        </div>
        <div class="form-group">
          <label for="subject">Subject:</label>
          <input
            v-model="bulkEmailData.subject"
            type="text"
            id="subject"
            class="form-control"
            placeholder="Enter email subject"
            required
          />
        </div>
        <div class="form-group">
          <label for="body">Body:</label>
          <textarea
            v-model="bulkEmailData.body"
            id="body"
            class="form-control"
            placeholder="Enter email body"
            required
          ></textarea>
        </div>
        <div class="d-flex justify-content-between">
          <button class="btn btn-primary" @click="sendBulkEmail">Send</button>
          <button class="btn btn-secondary" @click="closeBulkEmailModal">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRatingsStore } from './ratingsStore.js'

import { useRouter } from 'vue-router'
const router = useRouter()

function goToImportData() {
  router.push({ name: 'ImportData' })
}

// State for feedback and email modals
const feedbackVisible = ref(false)
const isBulkEmailModalOpen = ref(false)

// Rating store data
const ratingsStore = useRatingsStore()
const averageRating = ref(0)
const totalRatings = ref(0)

// Bulk email data
const bulkEmailData = ref({
  recipients: '', // Comma-separated list of emails
  subject: '',
  body: ''
})

// Function to view feedback
const viewFeedback = () => {
  feedbackVisible.value = !feedbackVisible.value
  averageRating.value = ratingsStore.getAverageRating()
  totalRatings.value = ratingsStore.getTotalRatings()
}

// Function to open/close bulk email modal
const openBulkEmailModal = () => {
  isBulkEmailModalOpen.value = true
}

const closeBulkEmailModal = () => {
  isBulkEmailModalOpen.value = false
}

// Function to send bulk email
const sendBulkEmail = async () => {
  try {
    const emailPayload = {
      from: 'vatsneeru61@gmail.com',
      to: bulkEmailData.value.recipients.split(',').map((email) => email.trim()), // Converts the string to an array
      subject: bulkEmailData.value.subject,
      text: bulkEmailData.value.body,
      html: `<strong>${bulkEmailData.value.body}</strong>`
    }

    await axios.post(
      'http://127.0.0.1:5001/signupdoctor/us-central1/widgets/sendMail',
      emailPayload
    )
    console.log('Bulk Email sent successfully')
    closeBulkEmailModal()
  } catch (error) {
    console.log('Error sending bulk email:', error)
  }
}

// Function to log out and navigate to the login page
function logout() {
  router.push({ path: '/loginforadmin' }) // Navigate to loginforadmin.vue page
}
</script>

<style scoped>
/* Page Layout */
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #effaec;
  border-radius: 10px;
  padding: 20px;
}

.button-container {
  display: flex;
}

/* Button Styling */
.btn {
  padding: 12px 25px;
  font-size: 16px;
  border-radius: 5px;
  border: solid 2px transparent;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    border-color 0.3s ease;
  text-transform: uppercase;
  font-weight: bold;
}

.btn-login {
  background-color: #007bff;
  color: white;
}

.btn-login:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-signup {
  background-color: #28a745;
  color: white;
}

.btn-signup:hover {
  background-color: #218838;
  border-color: #218838;
}

/* Feedback Section */
.feedback-results {
  margin-top: 20px;
  text-align: center;
  font-size: 18px;
  color: #333;
}

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
  padding: 30px;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
}

/* Input Fields */
input,
textarea {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

textarea {
  resize: none;
}

/* Responsive Styling */
@media (max-width: 576px) {
  .btn {
    font-size: 14px;
    padding: 10px 20px;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .btn {
    font-size: 15px;
    padding: 12px 24px;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .btn {
    font-size: 17px;
  }
}

@media (min-width: 1400px) {
  .btn {
    font-size: 18px;
    padding: 14px 28px;
  }
}
</style>
