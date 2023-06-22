<template>
  <div class="task-list-view container">
    <task-form class="form" @update:tasks="createTask"/>

    <div v-for="task in tasksStore.getTasks">
      <task-item
        :key="task.id"
        :task="task"
        @update:task="item => tasksStore.updateTask(item)"
        @update:tasks="task => togglePopup(task)"/>
    </div>
  </div>

  <confirm-popup
    v-if="tasksStore.getPopupState"
    text="Вы точно хотите удалить эту задачу?"
    @update:popupState="state => tasksStore.setPopupState(state)"
    @confirm="confirmRemove"
  />
</template>

<script setup>
import TaskForm from "@/components/TaskForm.vue";
import TaskItem from "@/components/TaskItem.vue";
import ConfirmPopup from "@/components/ConfirmPopup.vue";
import { useTasks } from "@/store/useTasks.js";
import { ref } from "vue";

const tasksStore = useTasks()
const removableId = ref(null)

const togglePopup = (task) => {
  tasksStore.setPopupState(true)
  removableId.value = task.id
}

const confirmRemove = () => {
  if (removableId.value !== null) {
    tasksStore.removeTask(removableId.value)
    removableId.value = null
  }
}

const createTask = (name) => {
  const tasks = tasksStore.getTasks
  const maxId = tasks?.length !== 0 ? Math.max(...tasks.map(item => item.id)) : 0

  tasksStore.updateTasks({id: +maxId + 1, checked: false, subtasks: [], name})
}
</script>

<style scoped lang="scss">
.task-list-view {
  .form {
    margin-bottom: 30px;
  }
}
</style>