<template>
  <!-- Error component -->
  <v-alert type="error" title="Something went wrong">
    {{ error_message }}
  </v-alert>
</template>

<script setup>
//Imports
import { computed } from "vue";

//Variables
const props = defineProps({
  error_component_message: String,
});

const error_message = computed(() => {
  return props.error_component_message.replace(
    "Something went wrong. Error: ",
    ""
  );
});
</script>

<style scoped lang="scss">
.v-alert {
  //Size
  width: 100%;
}

//Media queries
@media only screen and (min-width: 480px) {
  //Error component style
  .v-alert {
    //Size
    max-width: 480px;
  }
}
</style>
