import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import CarsPage from './views/CarsPage.vue'
import CarPage from './views/CarPage.vue'
import EmployeesPage from './views/EmployeesPage.vue'
import HomePage from './views/HomePage.vue'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

//time the toast notification will show
const toastOptions = {
  timeout: 2000
}

const routes = [
  { path: '/', component: HomePage },
  { path: '/cars', component: CarsPage },
  { path: '/cars/:id', component: CarPage },
  { path: '/employees', component: EmployeesPage },
  //redirect to homepage when page not found
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(Toast, toastOptions).use(router).mount('#app')
