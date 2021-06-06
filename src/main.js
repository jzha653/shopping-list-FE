import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ProgressSpinner from 'primevue/progressspinner'

const app = createApp(App)
app.use(PrimeVue)

app.component('Dialog', Dialog)
app.component('Button', Button)
app.component('ProgressSpinner', ProgressSpinner)

app.mount('#app')
