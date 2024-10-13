<template>
  <div class="container">
    <div class="row full-height">
      <div class="col donate-now full-height">
        <button class="btndonatenow full-width-btn" @click="navigateTodonatenow">Donate Now</button>
      </div>

      <div class="col admin-login full-height">
        <button class="btnadminlogin full-width-btn" @click="navigateToadminlogin">
          Admin Login
        </button>
      </div>
    </div>

    <div class="row">
      <div class="col videoContainer">
        <video autoplay loop muted playsinline class="logoVideo">
          <source src="@/assets/videos/mental-health-logo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div class="col contentContainer">
        <div class="row full-height">
          <div class="col-6 full-height">
            <div class="About full-height">
              <button class="btnaboutus full-width-btn" @click="navigateToaboutus">About Us</button>
            </div>
          </div>
          <div class="col-6 full-height">
            <div class="ourservices full-height">
              <button class="btnourservices full-width-btn" @click="navigateToourservices">
                Our Services
              </button>
            </div>
          </div>
        </div>

        <div class="row full-height">
          <div class="col-6 full-height">
            <div class="Login full-height">
              <button class="btnLogin full-width-btn" @click="navigateToSignupLogin">
                Professional LOGIN / SIGN-UP
              </button>
            </div>
          </div>
          <div class="col-6 full-height">
            <div class="Signup full-height">
              <button class="btnSignup full-width-btn" @click="navigateToSignupLogins">
                User SIGNUP / LOGIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image rotation row -->
    <div class="image-slider">
      <div class="slider-wrapper">
        <div
          class="slide"
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: currentIndex === index }"
        >
          <img :src="image" alt="Image" />
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col d-flex justify-content-between">
        <div class="Contact flex-fill">
          <button class="btnacontactus full-width-btn" @click="navigateTocontactus">
            Contact Us
          </button>
        </div>

        <div class="feedback flex-fill">
          <button class="btnafeedback full-width-btn" @click="navigateTofeedback">Feedback</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Global styles */
body,
html {
  margin: 0;
  padding: 0;
  width: 100%;
  font-family: 'Arial', sans-serif;
  overflow-x: hidden;
  background-color: #f0f9f9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;
}

.col {
  flex: 1;
  margin: 4px;
  padding: 4px;
  box-sizing: border-box;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #b0e0e6;
  transition: box-shadow 0.3s ease;
}

.col:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

button {
  background-color: #3b82f6;
  border: none;
  color: white;
  padding: 12px 20px;
  margin: 10px 0;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    transform 0.3s ease;
  font-size: 1.2rem;
}

button:hover {
  background-color: #2563eb;
  transform: scale(1.05);
}

.videoContainer {
  flex: 1;
  max-width: 300px;
  border: 1px solid #b0e0e6;
  border-radius: 8px;
  background-color: cornsilk;
  overflow: hidden;
}

.logoVideo {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.contentContainer {
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}

/* Image rotation styles */
.image-slider {
  width: 100%;
  max-width: 1200px;
  overflow: hidden;
  margin: 20px auto;
  border: 1px solid #b0e0e6;
  border-radius: 8px;
  position: relative;
}

.slider-wrapper {
  display: flex;
  width: 100%;
  position: relative;
  height: 300px;
}

.slide {
  min-width: 100%;
  transition: opacity 1s ease-in-out;
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.slide.active {
  opacity: 1;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-6,
  .videoContainer,
  .contentContainer {
    width: 100%;
  }

  .half-height {
    height: auto;
    margin-bottom: 10px;
  }
}

.full-width-btn {
  width: 100%;
}

.full-height {
  height: 100%;
}

.row.full-height {
  height: 50%;
}
</style>

<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'

const images = ref([
  new URL('../assets/Images/image5.jpg', import.meta.url).href,
  new URL('../assets/Images/image6.jpg', import.meta.url).href
])

const currentIndex = ref(0)

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length // Correct logic for rotation
}

onMounted(() => {
  setInterval(nextSlide, 5000) // Change image every 5 seconds
})

const router = useRouter()

const navigateToadminlogin = () => {
  router.push({ name: 'loginForAdminPage' }) // Navigate to loginforadmin.vue
}

const navigateTodonatenow = () => {
  router.push({ name: 'donatenowPage' })
}

const navigateToaboutus = () => {
  router.push({ name: 'aboutUs' })
}

const navigateToourservices = () => {
  router.push({ name: 'ourServices' })
}

const navigateTocontactus = () => {
  router.push({ name: 'contactUs' })
}

const navigateTofeedback = () => {
  router.push({ name: 'feedBack' })
}

const navigateToSignupLogin = () => {
  router.push({ name: 'loginSignupDoctor' })
}

const navigateToSignupLogins = () => {
  router.push({ name: 'loginSignupPatient' })
}
</script>
