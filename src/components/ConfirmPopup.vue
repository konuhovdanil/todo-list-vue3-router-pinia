<template>
  <div class="confirm-popup" @click="tasksStore.setPopupState(false)">
    <div class="confirm-popup__window">
      <div class="confirm-popup__head">
        {{ props.text }}
      </div>
      <div class="confirm-popup__btns">
        <button @click="$emit('confirm')">Да</button>
        <button @click="tasksStore.setPopupState(false)">Нет</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTasks } from "@/store/useTasks.js";

const props = defineProps({
  text: {
    type: String,
    required: true
  }
})

const tasksStore = useTasks()
</script>

<style scoped lang="scss">
.confirm-popup {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__window {
    width: 300px;
    height: 180px;
    background-color: white;
  }

  &__head,
  &__btns {
    height: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__head {
    padding: 20px;
  }

  &__btns {
    gap: 10px;
  }
}
</style>