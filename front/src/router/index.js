import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Marathon from '@/views/Marathon.vue'
import Sprint from '@/views/Sprint.vue'
import Calendar from '@/views/Calendar.vue'
import Mypage from '@/views/Mypage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/marathon',
    name: 'Marathon',
    component: Marathon
  },
  {
    path: '/sprint',
    name: 'Sprint',
    component: Sprint
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendar
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: Mypage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
