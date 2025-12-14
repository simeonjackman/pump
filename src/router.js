import { createMemoryHistory, createRouter } from 'vue-router'
import WorkoutSelector from './components/WorkoutSelector.vue'
import WorkoutDisplay from './components/WorkoutDisplay.vue'

const routes = [
  { path: '/', component: WorkoutSelector },
  { path: '/show-workout', component: WorkoutDisplay },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})




export default router