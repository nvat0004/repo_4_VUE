<template>
  <div class="chart-container">
    <h1 class="text-center">Quantity vs Brand Chart</h1>
    <Bar :data="chartData" :options="options" />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import { Bar } from 'vue-chartjs'

// Define props for chart data and options
const props = defineProps({
  chartData: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    })
  }
})
</script>

<style scoped>
.chart-container {
  width: 100%;
  max-width: 800px;
  height: 400px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .chart-container {
    height: 300px;
  }
}

@media (max-width: 576px) {
  .chart-container {
    height: 250px;
  }
}
</style>
