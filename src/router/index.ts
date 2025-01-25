import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signIn',
      name: 'signIn',
      component: () => import('@/views/SignInView.vue')
    },
    {
      path: '/instances',
      name: 'instances',
      component: () => import('@/views/InstancesView.vue')
    }
  ],
})

export const events = new EventTarget()

router.beforeEach(() => {
  events.dispatchEvent(new Event('beginLoading'))
})

router.afterEach(() => {
  events.dispatchEvent(new Event('endLoading'))
})
