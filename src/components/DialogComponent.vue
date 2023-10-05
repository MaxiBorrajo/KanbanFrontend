<template>
  <v-dialog width="auto" scroll-strategy="none">
    <v-card color="card" class="dialog-card">
      <v-card-title>{{ dialogTitle }}</v-card-title>
      <v-card-text>{{ dialogText }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <ButtonComponent
          button-type="button"
          button-label="Yes"
          @click="dialogYesButtonAction"
          button-variant="tonal"
        />
        <ButtonComponent
          button-type="button"
          button-label="No"
          @click="dialogNoButtonAction"
          button-variant="tonal"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import ButtonComponent from "@/components/ButtonComponent.vue";

const props = defineProps({
  dialogYesButtonAction: Function,
  dialogNoButtonAction: Function,
  dialogTitle: String,
  dialogText: String,
});
</script>

<style scoped lang="scss">
.dialog-card {
  color: rgb(var(--v-theme-text));

  font-family: $secondary-font;
}
</style>
