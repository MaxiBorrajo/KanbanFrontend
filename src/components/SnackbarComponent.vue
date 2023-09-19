<template>
  <!-- Snackbar component -->
  <v-snackbar
    :timeout="snackbar_timeout"
    :multi-line="snackbar_multiline"
    transition="fade-transition"
    color="card"
  >
    {{ snackbar_text }}
    <!-- Snackbar action -->
    <template v-slot:actions v-if="snackbar_has_action">
      <ButtonComponent
        :button-label="snackbar_btn_label"
        :button-type="snackbar_btn_type"
        @click="snackbar_btn_action"
      />
    </template>
  </v-snackbar>
</template>

<script setup>
//Imports
import ButtonComponent from "@/components/ButtonComponent.vue";

//Variables
const props = defineProps({
  snackbar_timeout: Number,
  snackbar_multiline: Boolean,
  snackbar_text: String,
  snackbar_has_action: Boolean,
  snackbar_btn_label: String,
  snackbar_btn_type: String,
  snackbar_btn_action: Function,
});
</script>

<style scoped lang="scss">
//Snackbar style
.v-snackbar {
  //Font style
  font-family: $secondary-font;
}
</style>
