<template>
  <v-dialog width="auto" scroll-strategy="none">
    <v-alert type="error" title="Something went wrong" class="error-component">
      {{ errorMessage }}
    </v-alert>
  </v-dialog>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  errorSent: String,
});

const errorMessage = computed(() => {
  return props.errorSent.replace("Something went wrong. Error: ", "");
});
</script>

<style scoped lang="scss">
.error-component {
  font-family: $secondary-font;
  width: 100%;
  padding: 25px;
}

@media only screen and (min-width: 480px) {
  .error-component {
    max-width: 480px;
  }
}
</style>
