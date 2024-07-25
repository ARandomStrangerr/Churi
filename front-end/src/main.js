import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'

axios.defaults.withCredentials = true;

const app = createApp(App)

app.provide("expressAddress", "http://localhost:5172")
app.provide("notification", []);

app.use(createPinia())
app.use(router)

app.mount('#app')
