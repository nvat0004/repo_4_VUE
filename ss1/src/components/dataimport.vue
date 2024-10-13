<template>
  <div class="container-fluid">
    <h2 class="text-center mb-4">Shoes Table</h2>

    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-primary btn-sm me-2" @click="exportCSV">Export CSV</button>
      <button class="btn btn-secondary btn-sm custom-pdf-button" @click="exportPDF">
        Export PDF
      </button>
    </div>

    <!-- Interactive Data Table -->
    <DataTable
      :value="products"
      :paginator="true"
      :rows="10"
      dataKey="id"
      :filters="filters"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['name', 'category', 'quantity', 'price']"
      class="table table-striped table-hover"
      responsiveLayout="scroll"
      v-model:filters="filters"
      v-model:selection="selectedProducts"
      showGridlines
    >
      <template #header>
        <div class="d-flex justify-content-end mb-3">
          <div class="input-group input-group-sm w-auto">
            <span class="input-group-text"><i class="bi bi-search"></i></span>
            <input
              type="text"
              class="form-control"
              v-model="filters['global'].value"
              placeholder="Global Keyword Search"
            />
          </div>
        </div>
      </template>

      <!-- Individual Column Keyword Search -->
      <Column field="name" header="Name" :sortable="true">
        <template #filter="{ filterModel }">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="filters['name'].value"
            placeholder="Search by Name"
          />
        </template>
      </Column>

      <Column field="category" header="Category" :sortable="true">
        <template #filter="{ filterModel }">
          <input
            type="text"
            class="form-control form-control-sm"
            v-model="filters['category'].value"
            placeholder="Search by Category"
          />
        </template>
      </Column>

      <Column field="quantity" header="Quantity" :sortable="true">
        <template #filter="{ filterModel }">
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="filters['quantity'].value"
            placeholder="Search by Quantity"
          />
        </template>
      </Column>

      <Column field="price" header="Price" :sortable="true">
        <template #filter="{ filterModel }">
          <input
            type="number"
            class="form-control form-control-sm"
            v-model="filters['price'].value"
            placeholder="Search by Price"
          />
        </template>
      </Column>
    </DataTable>

    <!-- Chart code -->
    <div class="chart-container mt-5">
      <h3 class="text-center mb-4">Product Quantity Chart</h3>
      <BarChart :chart-data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Bar } from 'vue-chartjs'
import BarChart from './BarChart.vue' // Import your BarChart component

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const products = ref([
  { id: 1, name: 'Adidas', category: 'Sports Shoes', quantity: 10, price: 2500.0 },
  { id: 2, name: 'Reebok', category: 'Running Shoes', quantity: 5, price: 1500.0 },
  { id: 3, name: 'Nike', category: 'Basketball Shoes', quantity: 20, price: 3500.0 },
  { id: 4, name: 'Puma', category: 'Football Shoes', quantity: 3, price: 450.0 },
  { id: 5, name: 'Asics', category: 'Cricket Shoes', quantity: 15, price: 2220.0 },
  { id: 6, name: 'Sketcher', category: 'Running', quantity: 8, price: 12.3 },
  { id: 7, name: 'New Balance', category: 'Sports Shoes', quantity: 30, price: 9898.9 },
  { id: 8, name: 'Burberry', category: 'Formal', quantity: 12, price: 5000.0 },
  { id: 9, name: 'Converse', category: 'Sports', quantity: 25, price: 1800.4 },
  { id: 10, name: 'Mochi', category: 'Casual', quantity: 10, price: 28000.7 },
  { id: 11, name: 'Action', category: 'Semi Formal', quantity: 17, price: 4000.0 },
  { id: 12, name: 'Liberty', category: 'Formals', quantity: 22, price: 1200.9 },
  { id: 13, name: 'Bata', category: 'Formal', quantity: 14, price: 200.6 },
  { id: 14, name: 'Woodland', category: 'Hiking', quantity: 9, price: 535.0 },
  { id: 15, name: 'Jordan', category: 'Basketball', quantity: 6, price: 13000.8 }
])

const selectedProducts = ref([])
const filters = ref({
  global: { value: null, matchMode: 'contains' },
  name: { value: null, matchMode: 'startsWith' },
  category: { value: null, matchMode: 'startsWith' },
  quantity: { value: null, matchMode: 'equals' },
  price: { value: null, matchMode: 'equals' }
})
const loading = ref(false)

// Prepare chart data
const chartData = ref({
  labels: products.value.map((product) => product.name),
  datasets: [
    {
      label: 'Quantity',
      data: products.value.map((product) => product.quantity),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }
  ]
})

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}

// Watch for changes in products and update chart data
watch(products, (newProducts) => {
  chartData.value.labels = newProducts.map((product) => product.name)
  chartData.value.datasets[0].data = newProducts.map((product) => product.quantity)
})

// CSV Export
function exportCSV() {
  const csvContent = [
    ['Name', 'Category', 'Quantity', 'Price'],
    ...products.value.map((product) => [
      product.name,
      product.category,
      product.quantity,
      product.price
    ])
  ]
    .map((e) => e.join(','))
    .join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', 'services_data.csv')
  link.click()
}

// PDF Export
function exportPDF() {
  const doc = new jsPDF()
  const tableColumn = ['Name', 'Category', 'Quantity', 'Price']
  const tableRows = []

  products.value.forEach((product) => {
    const productData = [product.name, product.category, product.quantity, product.price]
    tableRows.push(productData)
  })

  doc.autoTable({
    head: [tableColumn],
    body: tableRows
  })

  doc.save('services_data.pdf')
}
</script>

<style scoped>
.container-fluid {
  max-width: 1200px;
  margin: 0 auto;
}

.chart-container {
  height: 400px;
}

.table {
  margin-bottom: 0;
}

@media (max-width: 576px) {
  .btn-sm {
    width: 100%;
    margin-bottom: 10px;
  }

  .chart-container {
    height: 300px;
  }
}

@media (min-width: 576px) and (max-width: 768px) {
  .chart-container {
    height: 350px;
  }
}

@media (min-width: 992px) and (max-width: 1200px) {
  .chart-container {
    height: 400px;
  }
}
</style>
