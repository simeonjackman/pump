import { createWebHistory, createRouter } from 'vue-router'
import WorkoutSelector from './components/WorkoutSelector.vue'
import WorkoutDisplay from './components/WorkoutDisplay.vue'

const routes = [
  { path: '/', component: WorkoutSelector },
  { path: '/show-workout', component: WorkoutDisplay },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})




export default router