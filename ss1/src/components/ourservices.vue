<template>
  <div class="services-container">
    <!-- Service 1: Mindfulness and Meditation Training -->
    <div class="service-item row align-items-center mb-4">
      <div class="col-md-4">
        <img
          src="@/assets/Images/image 9.png"
          alt="Mindfulness and Meditation"
          class="img-fluid rounded shadow"
        />
      </div>
      <div class="col-md-8">
        <h3>Mindfulness and Meditation Training</h3>
        <p>
          Immerse yourself in guided meditation sessions aimed at promoting peace, focus, and
          presence. From beginners to advanced practitioners, our varied sessions can help you find
          your center, reduce anxiety, and enhance your daily wellness.
        </p>
      </div>
    </div>

    <!-- Service 2: Personalized Therapy -->
    <div class="service-item row align-items-center mb-4">
      <div class="col-md-4">
        <img
          src="@/assets/Images/image 10.png"
          alt="Personalized Therapy"
          class="img-fluid rounded shadow"
        />
      </div>
      <div class="col-md-8">
        <h3>Personalized Therapy</h3>
        <p>
          Connect with our licensed therapists who specialize in diverse areas of mental health. Our
          platform offers secure and confidential one-on-one counseling, available through both
          video and text-based sessions, to accommodate your lifestyle.
        </p>
      </div>
    </div>

    <!-- Service 3: Stress Management Programs -->
    <div class="service-item row align-items-center mb-4">
      <div class="col-md-4">
        <img
          src="@/assets/Images/image.png"
          alt="Stress Management"
          class="img-fluid rounded shadow"
        />
      </div>
      <div class="col-md-8">
        <h3>Stress Management Programs</h3>
        <p>
          Explore expert-designed programs that provide effective strategies for managing stress.
          Learn to identify stressors, understand their impact, and employ practical tools to
          navigate stress and improve your overall well-being.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.services-container {
  padding: 2rem;
}

.service-item {
  display: flex;
  flex-wrap: wrap;
  background-color: #e7f5f2;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.service-item h3 {
  color: #2c5282;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.service-item p {
  color: #4a5568;
  line-height: 1.6;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  margin-bottom: 1rem;
}

@media (max-width: 576px) {
  .service-item {
    padding: 1rem;
  }

  .service-item h3 {
    font-size: 1.6rem;
  }

  .service-item p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
}

@media (max-width: 768px) {
  .service-item {
    flex-direction: column;
    padding: 1.2rem;
  }

  .service-item h3 {
    font-size: 1.7rem;
  }

  .service-item p {
    font-size: 1rem;
    line-height: 1.5;
  }
}

@media (max-width: 992px) {
  .service-item h3 {
    font-size: 1.8rem;
  }

  .service-item p {
    font-size: 1rem;
    line-height: 1.5;
  }
}

@media (max-width: 1200px) {
  .service-item h3 {
    font-size: 1.9rem;
  }

  .service-item p {
    font-size: 1.1rem;
    line-height: 1.6;
  }
}

@media (min-width: 1400px) {
  .services-container {
    padding: 3rem;
  }

  .service-item {
    padding: 2rem;
  }

  .service-item h3 {
    font-size: 2rem;
  }

  .service-item p {
    font-size: 1.2rem;
  }
}
</style>
