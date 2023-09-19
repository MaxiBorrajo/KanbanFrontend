<template>
  <!-- Button component -->
  <v-btn
    v-ripple
    :variant="buttonVariant"
    :type="buttonType"
    :color="buttonColor ? buttonColor : 'attention'"
    :href="buttonHref"
    :to="buttonRoute"
    :icon="buttonIcon"
    :append-icon="buttonAppendIcon"
    :prepend-icon="buttonPrependIcon"
    :width="button_width"
    :height="button_height"
    :disabled="button_disabled"
    class="d-flex justify-center align-center"
    >{{ buttonLabel }}</v-btn
  >
</template>

<script setup>
//Variables
const props = defineProps({
  buttonLabel: String,
  buttonColor: String,
  buttonType: String,
  buttonRoute: Object,
  buttonHref: String,
  buttonIcon: String,
  buttonAppendIcon: String,
  buttonPrependIcon: String,
  buttonVariant: String,
  button_width: Number,
  button_height: Number,
  button_disabled: Boolean,
  buttonRounded: Number
});
</script>

<style scoped lang="scss">
/*Button's style */
.v-btn {
  /*Font style */
  font-family: $secondary-font;
}
</style>
