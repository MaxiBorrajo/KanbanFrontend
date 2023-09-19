<template>
  <!-- Text input component -->
  <v-text-field
    :clearable="input_clearable"
    :label="input_label"
    :color="input_color ? input_color : 'text'"
    :required="input_is_required"
    :prepend-icon="input_prepend_icon"
    :prepend-inner-icon="input_prepend_inner_icon"
    :append-icon="input_append_icon"
    :append-inner-icon="input_append_inner_icon"
    :hide-details="input_hide_details"
    :density="input_density"
    :placeholder="input_placeholder"
    :rules="input_rules"
    :type="input_type"
    :variant="input_variant"
    :autofocus="input_auto_focus"
    :readonly="input_readonly"
  ></v-text-field>
</template>

<script setup>
//Variables
const props = defineProps({
  input_label: String,
  input_placeholder: String,
  input_color: String,
  input_type: String,
  input_is_required: Boolean,
  input_prepend_icon: String,
  input_prepend_inner_icon: String,
  input_append_icon: String,
  input_append_inner_icon: String,
  input_hide_details: Boolean,
  input_density: String,
  input_clearable: Boolean,
  input_rules: Array,
  input_variant: String,
  input_auto_focus: Boolean,
  input_readonly: Boolean,
});
</script>

<style scoped lang="scss">
//Input's style
.v-text-field {
  //Font
  font-family: $secondary-font;
}
</style>
