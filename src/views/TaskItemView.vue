<template>
  <div class="task-item-view container" v-if="task !== null">
    <div class="task-item" :class="{ 'borderless': task.subtasks.length === 0 }">
      <div class="task-item__head">
        <input class="unclickable" type="checkbox" v-model="task.checked">
        <span :class="{ 'completed-task': task.checked }"><input type="text" placeholder="Название" v-model="task.name"/></span>
        <div><span v-if="task.subtasks.length > 0">{{ completedSubtasks.length }}/{{ task.subtasks.length }}</span></div>
        <div class="task-item__panel">
          <a href="#" class="panel-btn unclickable" @click="removeTask">&#10060;</a>
          <a href="#" class="panel-btn unclickable plus" @click="task.subtasks.push({id: task.subtasks.length, name: '', checked: false})">&#10133;</a>
        </div>
      </div>
      <div class="task-item__subtask-list">
        <div class="subtask-item"  v-for="(subtask, idx) in task.subtasks" :key="subtask.id">
          <input type="checkbox" v-model="task.subtasks[idx].checked">
          <span :class="{ 'completed-task': subtask.checked }"><input type="text" placeholder="Название" v-model="task.subtasks[idx].name"/></span>
          <div class="subtask-item__panel">
            <a href="#" class="panel-btn unclickable" @click="task.subtasks = task.subtasks.filter(item => item.id !== subtask.id)">&#10060;</a>
          </div>
        </div>
      </div>
    </div>

    <div class="task-item-view__btns">
      <button @click="cancel">Отменить</button>
      <button @click="updateTask" :disabled="!canSave">Сохранмть</button>
    </div>

    <confirm-popup
      v-if="tasksStore.getPopupState"
      :text="popupText.text || ''"
      @update:popupState="state => tasksStore.setPopupState(state)"
      @confirm="confirm"
    />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { useTasks } from "@/store/useTasks.js";
import { computed, onMounted, ref } from "vue";
import { getObjectId } from "@/helpers/ArraySearch.js";
import ConfirmPopup from "@/components/ConfirmPopup.vue";

const route = useRoute()
const router = useRouter()
const tasksStore = useTasks()

const popupTexts = [
  {
    id: 0,
    text: 'Вы точно хотите удалить эту задачу?'
  },
  {
    id: 1,
    text: 'Вы точно хотите отменить изменения?'
  }
]

const tasks = JSON.parse(JSON.stringify(tasksStore.getTasks))
const task = ref(tasks[getObjectId(+route.params.id, tasksStore.getTasks)] || null)
const popupText = ref('')
const completedSubtasks = computed(() => task.value?.subtasks.filter(item => item.checked))
const canSave = computed(() => task && task.value.name.length > 0 && task.value.subtasks.every(item => item.name.length > 0))

const removeTask = () => {
  popupText.value = popupTexts[0]
  tasksStore.setPopupState(true)
}

const cancel = () => {
  popupText.value = popupTexts[1]
  tasksStore.setPopupState(true)
}

const confirm = () => {
  if (popupText.value.id === 0) {
    tasksStore.removeTask(task.value.id)
  }

  router.push({ path: '/'})
}

const updateTask = () => {
  tasksStore.updateTask(task.value)
  router.push({ path: '/'})
}

onMounted(() => {
  if (tasksStore.getTasks.length === 0 || getObjectId(+route.params.id, tasksStore.getTasks) === -1) router.push({ path: '/'})
})
</script>

<style scoped lang="scss">
.task-item-view {

  .task-item {
    &__head {
      cursor: default;
    }
  }

  .subtask-item {
    grid-template-columns: 5% 79% 16%;
  }

  &__btns {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}
</style>