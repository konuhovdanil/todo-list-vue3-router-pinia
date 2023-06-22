<template>
  <div class="subtask-item">
    <input type="checkbox" v-model="checked">
    <span :class="{ 'completed-task': checked }">{{ props.subtask.name }}</span>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  subtask: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(['update:subtasks'])

const checked = ref(props.subtask.checked)

watch(checked, newVal => emit('update:subtasks', { ...props.subtask, checked: newVal }))
</script>

<style lang="scss">
.subtask-item {
  height: 30px;
  display: grid;
  grid-template-columns: 5% 95%;
  justify-content: center;
  align-items: center;
}
</style>