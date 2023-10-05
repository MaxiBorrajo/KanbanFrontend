<template>
  <v-textarea
    class="default-textarea"
    :clearable="inputClearable"
    :label="inputLabel"
    :color="inputColor ? inputColor : 'text'"
    :bg-color="inputBgColor ? inputBgColor : 'backgroundcolor'"
    :prepend-icon="inputPrependIcon"
    :prepend-inner-icon="inputPrependInnerIcon"
    :append-icon="inputAppendIcon"
    :append-inner-icon="inputAppendInnerIcon"
    :hide-details="inputHideDetails"
    :density="inputDensity"
    :placeholder="inputPlaceholder"
    :rules="inputRules"
    :auto-grow="inputAutogrow"
    :autofocus="inputAutofocus"
    :variant="inputVariant"
  ></v-textarea>
</template>

<script setup>
const props = defineProps({
  inputLabel: String,
  inputPlaceholder: String,
  inputColor: String,
  inputBgColor: String,
  inputPrependIcon: String,
  inputPrependInnerIcon: String,
  inputAppendIcon: String,
  inputAppendInnerIcon: String,
  inputHideDetails: Boolean,
  inputDensity: String,
  inputClearable: Boolean,
  inputRules: Array,
  inputAutogrow: Boolean,
  inputAutofocus: Boolean,
  inputVariant: String,
});
</script>

<style scoped lang="scss">
.default-textarea {
  font-family: $secondary-font;
}
</style>
