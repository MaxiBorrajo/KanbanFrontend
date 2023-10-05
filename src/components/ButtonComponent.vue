<template>
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
    :width="buttonWidth"
    :height="buttonHeight"
    :disabled="buttonDisabled"
    class="d-flex justify-center align-center default-button"
    >{{ buttonLabel }}</v-btn
  >
</template>

<script setup>

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
  buttonWidth: Number,
  buttonHeight: Number,
  buttonDisabled: Boolean,
  buttonRounded: Number
});
</script>

<style scoped lang="scss">
.default-button {
  font-family: $secondary-font;
}
</style>
