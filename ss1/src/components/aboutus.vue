<template>
  <div class="container py-4 about-us-container">
    <!-- Who are we section -->
    <section class="mb-4 py-4 px-3 bg-white shadow-sm rounded who-we-are">
      <h2 class="text-center mb-3 text-primary">Who Are We</h2>
      <p class="text-muted">
        Welcome to HealthCare, a sanctuary dedicated to nurturing your mental well-being. Founded on
        the pillars of empathy, understanding, and professional expertise, we strive to provide a
        range of services including therapy sessions, insightful resources, and community support.
        Our mission is to offer hope, healing, and a safe space for everyone navigating mental
        health challenges.
      </p>
    </section>

    <!-- Our Impact Section -->
    <section class="mb-4 py-4 px-3 bg-white shadow-sm rounded our-impact">
      <h2 class="text-center mb-3 text-primary">Our Impact on Society</h2>
      <p class="text-muted">
        We have positively impacted the lives of countless individuals by providing compassionate
        care and fostering a sense of community. From personalized therapy to community-driven
        support groups, our platform helps people manage their mental health with dignity and
        respect. Together, we’re building a society that embraces mental wellness as an essential
        part of overall health.
      </p>
    </section>

    <!-- Media / Social Media Section -->
    <section class="mb-4 py-4 px-3 bg-white shadow-sm rounded media">
      <h2 class="text-center mb-3 text-primary">Connect with Us</h2>
      <div class="d-flex justify-content-center">
        <a href="https://facebook.com" target="_blank" class="btn btn-success mx-2">
          <i class="fab fa-facebook-f"></i> Facebook
        </a>
        <a href="https://twitter.com" target="_blank" class="btn btn-info mx-2">
          <i class="fab fa-twitter"></i> Twitter
        </a>
        <a href="https://instagram.com" target="_blank" class="btn btn-warning mx-2">
          <i class="fab fa-instagram"></i> Instagram
        </a>
      </div>
    </section>

    <!-- Our Partners Section -->
    <section class="mb-4 py-4 px-3 bg-white shadow-sm rounded our-partners">
      <h2 class="text-center mb-3 text-primary">Our Partners</h2>
      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="card h-100">
            <img src="@/assets/Images/image 7.png" class="card-img-top" alt="Partner 1" />
            <div class="card-body text-center">
              <p class="card-text text-muted">AIIMS</p>
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div class="card h-100">
            <img src="@/assets/Images/image 8.png" class="card-img-top" alt="Partner 2" />
            <div class="card-body text-center">
              <p class="card-text text-muted">Monash Hospital</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-us-container {
  background-color: #e7f5f2;
}

.text-primary {
  color: #2c5282;
}

.text-muted {
  color: #4a5568;
}

.card {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
  background-color: #f7fafc;
}

.btn-success {
  background-color: #48bb78;
}

.btn-info {
  background-color: #4299e1;
}

.btn-warning {
  background-color: #ed8936;
}

/* Mobile Responsiveness */
@media (max-width: 576px) {
  .btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
