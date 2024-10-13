<template>
  <div class="container">
    <div class="feedback-container text-center">
      <h2>Rate your website experience (0-10)</h2>
      <div class="input-group mb-3 justify-content-center">
        <input
          type="number"
          v-model="userRating"
          min="0"
          max="10"
          class="form-control rating-input"
          placeholder="Enter your rating"
        />
        <button @click="submitRating" class="btn btn-primary submit-btn">Submit</button>
      </div>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRatingsStore } from './ratingsStore'

const userRating = ref(null)
const errorMessage = ref('')
const ratingsStore = useRatingsStore()

const submitRating = () => {
  if (userRating.value !== null && userRating.value >= 0 && userRating.value <= 10) {
    ratingsStore.addRating(userRating.value)
    userRating.value = null
    errorMessage.value = ''
    alert('Thank you for your feedback!')
  } else {
    errorMessage.value = 'Please enter a valid rating between 0 and 10.'
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.feedback-container {
  background-color: #e7f5f2;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
}

h2 {
  color: #2c5282;
  margin-bottom: 1.5rem;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.rating-input {
  max-width: 150px;
  margin-right: 10px;
}

.submit-btn {
  background-color: #2c5282;
  color: white;
}

.error {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}

@media (max-width: 576px) {
  .feedback-container {
    padding: 1.5rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  .submit-btn {
    font-size: 0.9rem;
  }

  .rating-input {
    max-width: 120px;
  }
}

@media (max-width: 768px) {
  .feedback-container {
    padding: 1.8rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  .submit-btn {
    font-size: 1rem;
  }

  .rating-input {
    max-width: 130px;
  }
}

@media (max-width: 992px) {
  h2 {
    font-size: 1.8rem;
  }

  .rating-input {
    max-width: 140px;
  }
}

@media (max-width: 1200px) {
  .feedback-container {
    padding: 2rem;
  }

  h2 {
    font-size: 1.9rem;
  }

  .rating-input {
    max-width: 150px;
  }
}

@media (min-width: 1400px) {
  .feedback-container {
    padding: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  .rating-input {
    max-width: 160px;
  }
}
</style>
