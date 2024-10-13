import { createApp } from 'vue'
import App from './App.vue'
import router from './route.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Create Vue application instance
const app = createApp(App)

app.use(PrimeVue)

app.use(router)

// Mount Vue app to the DOM
app.mount('#app')
