import { createApp, watch } from 'vue'
import './style.css'
import App from './App.vue'
import router from "@/router/index.js";
import { createPinia } from 'pinia'
import { useTasks } from "@/store/useTasks.js";

const app = createApp(App)
const store = createPinia()

app.use(router).use(store)

const tasksStore = useTasks()

watch(tasksStore.tasks, newVal => {
  localStorage.setItem('tasks', JSON.stringify(newVal))
}, { deep: true })

app.mount('#app')
