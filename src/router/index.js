import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: '/',
    component: () => import('@/views/TaskListView.vue')
  },

  {
    path: '/:id/edit',
    component: () => import('@/views/TaskItemView.vue')
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})