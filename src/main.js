import { createApp } from 'vue'
import "./styles/index.css"
import './styles/style.scss'
import App from './App.vue'
import router from './router/index'

const app = createApp(App)
app.use(router)
app.mount('#app')
