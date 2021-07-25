import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateCard from '../views/CreateCard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-card',
    name: 'CreateCard',
    component: CreateCard
  }
]

let mode = 'history'
if(process.env.NODE_ENV === 'production') {
  mode = 'hash'
}

const router = new VueRouter({
  mode: mode,
  base: process.env.BASE_URL,
  routes
})

export default router
