<template>
  <div class="home-task d-flex justify-center flex-column">
    <div class="status d-flex align-center">
      <span class="status-circle" :class="objectStatus"></span
      >{{ objectStatus }}
    </div>
    <p class="title">
      {{ title }}
    </p>
</div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  title: String,
  status: Number,
});

const objectStatus = computed(() => {
  switch (props.status) {
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
  border-radius: 10px;
  background-color: #191919;
  color: #ffffff;
  padding: 10px 15px 15px 15px;
  gap:5px;
  border: 1px solid #ffffff;
  .status {
    width: 100%;
    gap: 5px;
    font-size: 8px;
    font-family: $secondary-font;
    font-weight: 200;
    .status-circle {
      border-radius: 50%;
      width: 10px;
      height: 10px;
    }
  }
  .title {
    width: 100%;
    font-size: 12px;
    font-family: $secondary-font;
    font-weight: 300;
    margin-left: 10px;
    line-height: 1;
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
