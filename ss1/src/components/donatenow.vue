<template>
  <div class="form-container container">
    <form @submit.prevent="validateForm">
      <div class="mb-3">
        <label class="form-label"><strong>Enter Amount:</strong></label>
        <input type="text" class="form-control" v-model="Amount" />
        <div v-if="!isAmountValid" class="error">Please enter a valid amount, cannot be zero.</div>
      </div>

      <div class="mb-3">
        <label class="form-label"><strong>Enter Name:</strong></label>
        <input type="text" class="form-control" v-model="name" />
        <div v-if="!isNameValid" class="error">Name cannot be blank.</div>
      </div>

      <div class="mb-3">
        <label class="form-label"><strong>Enter Phone:</strong></label>
        <input type="text" class="form-control" v-model="phone" />
        <div v-if="!isPhoneValid" class="error">
          Phone must be at least 10 digits and contain only numbers.
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label"><strong>Enter Email Address:</strong></label>
        <input type="email" class="form-control" v-model="email" />
        <div v-if="!isEmailValid" class="error">Please enter a valid email address.</div>
      </div>

      <div class="mb-3">
        <label class="form-label"><strong>Additional Comments:</strong></label>
        <textarea class="form-control" rows="3" v-model="comments"></textarea>
        <div v-if="!isCommentsValid" class="error">Comments must be between 5 to 40 words.</div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { db } from '@/db'
import { addDoc, collection } from 'firebase/firestore'

const Amount = ref('')
const name = ref('')
const phone = ref('')
const email = ref('')
const comments = ref('')

const isAmountValid = computed(() => parseFloat(Amount.value) > 0)
const isNameValid = computed(() => name.value.trim() !== '')
const isPhoneValid = computed(() => /^\d{10,}$/.test(phone.value))
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value))
const isCommentsValid = computed(() => {
  const wordCount = comments.value.trim().split(/\s+/).length
  return wordCount >= 5 && wordCount <= 40
})

async function submitFormToFirestore() {
  try {
    await addDoc(collection(db, 'donations'), {
      amount: Amount.value,
      name: name.value,
      phone: phone.value,
      email: email.value,
      comments: comments.value,
      timestamp: new Date()
    })
    alert('Form submitted successfully and saved to Firestore!')
    Amount.value = ''
    name.value = ''
    phone.value = ''
    email.value = ''
    comments.value = ''
  } catch (error) {
    console.error('Error submitting form: ', error)
    alert('There was an error submitting the form.')
  }
}

function validateForm() {
  if (
    isAmountValid.value &&
    isNameValid.value &&
    isPhoneValid.value &&
    isEmailValid.value &&
    isCommentsValid.value
  ) {
    submitFormToFirestore()
  } else {
    alert('Please correct the errors in the form.')
  }
}
</script>

<style scoped>
.form-container {
  background-color: #f7fafc;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 30px auto;
}

.form-label {
  font-weight: bold;
  color: #2d3748;
}

.error {
  color: red;
  margin-top: 5px;
}

textarea {
  resize: none;
}

/* Responsive styles */
@media (max-width: 575.98px) {
  .form-container {
    padding: 15px;
    max-width: 100%;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .form-container {
    max-width: 80%;
  }
}

@media (min-width: 768px) and (max-width: 992px) {
  .form-container {
    max-width: 70%;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .form-container {
    max-width: 60%;
  }
}

@media (min-width: 1200px) {
  .form-container {
    max-width: 50%;
  }
}
</style>
