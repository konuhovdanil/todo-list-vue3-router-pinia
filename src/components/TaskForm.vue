<template>
  <div class="task-form container">
    <input type="text" placeholder="Название" class="task-form__field" v-model="taskName">
    <button class="task-form__btn" :disabled="taskName.length === 0" @click="createTask">Создать</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(['update:tasks'])

const taskName = ref('')

const createTask = () => {
  emit('update:tasks', taskName.value)
  taskName.value = ''
}
</script>

<style scoped lang="scss">

.task-form {
  flex-direction: row;
  justify-content: center;
  
  @media (max-width: 800px) {
    flex-direction: column;
  }

  &__field,
  &__btn {
    height: 35px;

    @media (max-width: 800px) {
      width: 100%;
    }
  }

  &__field {
    margin-right: 15px;
    padding: 10px;
    border: 1px solid #000;
    border-radius: 8px;

    @media (max-width: 800px) {
      margin-bottom: 10px;
    }
  }

  &__btn {
    padding: 0 20px;
  }
}
</style>