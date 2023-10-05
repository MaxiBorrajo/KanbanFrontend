<template>
  <div class="home-task d-flex justify-center flex-column">
    <div class="home-task-status d-flex align-center">
      <span class="home-task-status-circle" :class="objectStatus"></span
      >{{ objectStatus }}
    </div>
    <p class="home-task-title">
      {{ homeTaskTitle }}
    </p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  homeTaskTitle: String,
  homeTaskStatus: Number,
});

const objectStatus = computed(() => {
  switch (props.homeTaskStatus) {
    case 1:
      return "ToDo";

    case 2:
      return "Doing";

    default:
      return "Done";
  }
});
</script>

<style scoped lang="scss">
.home-task {
  width: 350px;
  max-height: 60px;
  height: auto;
  padding: 10px 15px 15px 15px;

  border-radius: 10px;
  border: 1px solid #ffffff;

  background-color: #1a1919;
  color: #ffffff;

  gap: 5px;

  &-status {
    width: 100%;

    gap: 5px;

    font-size: 8px;
    font-family: $secondary-font;
    font-weight: 200;

    &-circle {
      border-radius: 50%;

      width: 10px;
      height: 10px;
    }
  }

  &-title {
    width: 100%;

    font-size: 12px;
    font-family: $secondary-font;
    font-weight: 300;
    line-height: 1;

    margin-left: 10px;
  }
}

.ToDo {
  background-color: #6443d9;
}

.Doing {
  background-color: #ff1c1c;
}

.Done {
  background-color: #54ff59;
}
</style>
