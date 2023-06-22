<template>
  <div class="task-item" :class="{ 'collapsed': collapsedSubtasks }">
    <div class="task-item__head" @click="toggleCollapse">
      <input class="unclickable" type="checkbox" v-model="checked">
      <span :class="{ 'completed-task': checked }">{{ props.task.name }}</span>
      <div><span v-if="subtasks.length > 0">{{ completedSubtasks.length }}/{{ props.task.subtasks.length }}</span></div>
      <div class="task-item__panel">
        <router-link class="unclickable" :to="`/${props.task.id}/edit`">
          &#128393;
        </router-link>
        <a href="#" class="panel-btn unclickable" @click="$emit('update:tasks', props.task)">&#10060;</a>
      </div>
    </div>
    <div class="task-item__subtask-list">
      <subtask-item v-for="subtask in subtasks" :key="subtask.id" :subtask="subtask" @update:subtasks="updateSubtasks"/>
    </div>
  </div>
</template>

<script setup>
import SubtaskItem from "@/components/SubtaskItem.vue";
import { computed, ref, toRef, watch } from "vue";
import { getObjectId } from "@/helpers/ArraySearch.js";

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:task', 'update:tasks'])

const checked = ref(props.task.checked)
const collapsedSubtasks = ref(true)
const subtasks = toRef(props.task, 'subtasks')
const hasSubtasks = computed(() => subtasks.value?.length > 0)
const completedSubtasks = computed(() => subtasks.value.filter(item => item.checked))

const toggleCollapse = (e) => {
  const target = e.target

  if (target.classList.contains('unclickable') || !hasSubtasks.value) {
    return
  }
  collapsedSubtasks.value = !collapsedSubtasks.value
}

const updateSubtasks = (subtask) => {
  subtasks.value[getObjectId(subtask.id, subtasks.value)] = subtask

  emit('update:task', {...props.task, subtasks: subtasks.value})
}

watch(checked, newVal => emit('update:task', {...props.task, checked: newVal}))
</script>

<style lang="scss">
.task-item {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  margin-bottom: 7px;
  border: 1px solid #b4b1b1;

  &.collapsed {
    border-bottom: none;
    overflow: hidden;

    .task-item__subtask-list {
      height: 0;
    }
  }

  &__head {
    display: grid;
    grid-template-columns: 10% 50% 20% 20%;
    justify-content: center;
    align-items: center;
    height: auto;
    cursor: pointer;
    border-bottom: 1px solid #b4b1b1;
  }

  &__panel {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  .panel-btn {
    font-size: 18px;
  }

  &__subtask-list {
    padding: 0 20px;
  }
}
</style>