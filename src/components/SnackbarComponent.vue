<template>
  <v-snackbar
    :timeout="snackbarTimeout"
    :multi-line="snackbarMultiline"
    transition="fade-transition"
    color="card"
    class="snackbar-default"
  >
    {{ snackbarText }}
    <template v-slot:actions v-if="snackbarHasAction">
      <ButtonComponent
        :button-label="snackbarBtnLabel"
        :button-type="snackbarBtnType"
        @click="snackbarBtnAction"
      />
    </template>
  </v-snackbar>
</template>

<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
  snackbarTimeout: Number,
  snackbarMultiline: Boolean,
  snackbarText: String,
  snackbarHasAction: Boolean,
  snackbarBtnLabel: String,
  snackbarBtnType: String,
  snackbarBtnAction: Function,
});
</script>

<style scoped lang="scss">
.default-snackbar {
  font-family: $secondary-font;
}
</style>
