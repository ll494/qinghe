import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Detection from '../components/Detection.vue'
import RealTimeDetection from '../components/RealTimeDetection.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/detect', component: Detection },
  { path: '/realtime', component: RealTimeDetection }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router