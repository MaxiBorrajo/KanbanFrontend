<template>
  <v-text-field
  class="default-input"
    :clearable="inputClearable"
    :label="inputLabel"
    :color="inputColor ? inputColor : 'text'"
    :required="inputRequired"
    :prepend-icon="inputPrependIcon"
    :prepend-inner-icon="inputPrependInnerIcon"
    :append-icon="inputAppendIcon"
    :append-inner-icon="inputAppendInnerIcon"
    :hide-details="inputHideDetails"
    :density="inputDensity"
    :placeholder="inputPlaceholder"
    :rules="inputRules"
    :type="inputType"
    :variant="inputVariant"
    :autofocus="inputAutofocus"
    :readonly="inputReadonly"
  ></v-text-field>
</template>

<script setup>
const props = defineProps({
  inputLabel: String,
  inputPlaceholder: String,
  inputColor: String,
  inputType: String,
  inputRequired: Boolean,
  inputPrependIcon: String,
  inputPrependInnerIcon: String,
  inputAppendIcon: String,
  inputAppendInnerIcon: String,
  inputHideDetails: Boolean,
  inputDensity: String,
  inputClearable: Boolean,
  inputRules: Array,
  inputVariant: String,
  inputAutofocus: Boolean,
  inputReadonly: Boolean,
});
</script>

<style scoped lang="scss">

.default-input {
  font-family: $secondary-font;
}
</style>
