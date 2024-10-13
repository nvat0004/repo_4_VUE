<template>
  <div class="chat-container">
    <h2>Chat with a Clinical</h2>
    <textarea v-model="userPrompt" placeholder="Enter your question here"></textarea>
    <button @click="submitPrompt">Ask AI</button>

    <div v-if="aiResponse" class="response-container">
      <h3>AI Response:</h3>
      <p>{{ aiResponse }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const userPrompt = ref('')
const aiResponse = ref('')

const submitPrompt = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:5001/signupdoctor/us-central1/widgets/generate/',
      {
        prompt: userPrompt.value
      }
    )
    aiResponse.value = response.data.data
  } catch (error) {
    console.error('Error fetching AI response:', error)
    aiResponse.value = 'There was an error processing your request. Please try again.'
  }
}
</script>

<style scoped>
.chat-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Modern font */
}

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: none;
}

button {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  cursor: pointer;
  background-color: #007bff; /* Primary button color */
  color: white; /* Button text color */
  border: none; /* Remove default border */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Font size for button */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
}

button:hover {
  background-color: #0056b3; /* Darker shade on hover */
}

.response-container {
  margin-top: 20px; /* Space between button and response */
  padding: 10px;
  border: 1px solid #ddd; /* Border around response */
  border-radius: 5px; /* Rounded corners for response */
  background-color: #fff; /* White background for response */
}

/* Responsive styles */
@media (max-width: 576px) {
  .chat-container {
    padding: 10px; /* Less padding on very small screens */
  }
  textarea {
    padding: 5px; /* Adjusted padding for smaller screens */
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .chat-container {
    max-width: 100%;
  }
}
</style>
