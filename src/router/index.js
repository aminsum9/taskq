import { createRouter, createWebHashHistory } from 'vue-router'
import TabView from '../views/TabView.vue'

const routes = [
  {
    path: '/',
    name: 'tab-view',
    component: TabView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
