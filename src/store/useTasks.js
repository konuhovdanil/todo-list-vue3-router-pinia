import { defineStore } from 'pinia'
import { getObjectId } from "@/helpers/ArraySearch.js";

export const useTasks = defineStore('tasks-store', {
  state: () => ({
    tasks: JSON.parse(localStorage.getItem('tasks')) || [],
    popupState: false,
  }),
  getters: {
    getTasks(state) {
      return state.tasks
    },
    getPopupState(state) {
      return state.popupState
    }
  },
  actions: {
    updateTasks(tasks) {
      this.tasks.push(tasks)
    },
    updateTask(task) {
      this.tasks[getObjectId(task.id, this.tasks)] = task
    },
    removeTask(id) {
      this.tasks = this.tasks.filter(item => item.id !== id)
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },
    setPopupState(state) {
      this.popupState = state
    }
  }
})