<template>
  <v-list-item
    :key="taskKey"
    :value="taskValue"
    class="task"
    :style="`--backgroundColor:${taskColor}`"
  >
    <p class="task-title">
      {{ taskTitle }}
    </p>
  </v-list-item>
</template>

<script setup>
const props = defineProps({
  taskTitle: String,
  taskKey: String,
  taskValue: String,
  taskColor: String,
});
</script>

<style scoped lang="scss">
.task {
  width: 100%;
  max-height: 60px;
  height: auto;

  border-radius: 10px;

  background-color: rgb(var(--v-theme-backgroundColor));
  color: rgb(var(--v-theme-text));

  cursor: pointer;

  position: relative;
  &-title {
    font-size: 15px;
    font-family: $secondary-font;
    font-weight: 300;
  }
}

.task::before {
  content: "";

  position: absolute;
  inset: 0;

  background-color: var(--backgroundColor);
  opacity: 10%;

  border-radius: 10px;
}
</style>
