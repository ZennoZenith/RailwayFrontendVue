import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NotFoundView from '@/views/404View.vue'
import TrainsBetweenStationsView from '@/views/TrainsBtwStationsView.vue'

export const routes = {
  home: '/',
  trainsBtwStations: '/trainsBtwStations',
  train: '/train',
} as const

export type Route = (typeof routes)[keyof typeof routes]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      alias: ['/home'],
    },
    {
      path: '/trainsBtwStations',
      name: 'Trains Between Stations',
      component: TrainsBetweenStationsView,
    },

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/:catchall(.*)*',
      name: 'Not Found',
      component: NotFoundView,
    },
  ],
})

export default router
