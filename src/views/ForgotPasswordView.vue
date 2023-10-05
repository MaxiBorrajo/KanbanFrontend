<template>
  <section class="forgot-password-section d-flex justify-center">
    <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
    <v-form
      ref="form"
      @submit.prevent="forgotPassword(forgotPasswordForm)"
      class="forgot-password-section-form d-flex flex-column justify-center"
    >
      <p class="forgot-password-section-form-title">Forgot your password?</p>
      
      <v-divider color="attention" :thickness="3"></v-divider>
      <p class="forgot-password-section-form-subtitle">Please provide the email address associated with your account so we can
        send you a password reset email.</p>
      <InputComponent
        input-label="Email"
        v-model="forgotPasswordForm.email"
        input-variant="solo"
        :input-rules="[rules.required, rules.email]"
        class="forgot-password-section-form-input"
      />
      <ButtonComponent
        button-label="Send"
        button-type="submit"
        class="forgot-password-section-form-submit-button"
        button-prepend-icon="fa-solid fa-paper-plane"
      />
    </v-form>
    <SnackbarComponent
      v-model="showSnackbar"
      :snackbar-timeout="3000"
      :snackbar-multiline="true"
      snackbar-text="Email sent"
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import rules from "../utils/rules";
import ErrorComponent from "@/components/ErrorComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";
import InputComponent from "@/components/InputComponent.vue";

const userStore = useUserStore();

const showSnackbar = ref(false);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const forgotPasswordForm = ref({
  email: "",
});

const form = ref(null);

async function forgotPassword(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      showSnackbar.value = false;

      const result = await userStore.forgotPassword(dataForm);

      if (result) {
        showSnackbar.value = true;
      }
    } catch (err) {
      error.value.hasError = true;

      error.value.errorMessage = err.response.data.resource.message;
    }
  }
}
</script>

<style scoped lang="scss">
.forgot-password-section {
  width: 100%;
  min-height: 100vh;
  background-color: rgb(var(--v-theme-backgroundColor));
  color: rgb(var(--v-theme-text));
  font-family: $secondary-font;

  padding: 50px;
  &-form {
    width: 100%;
    border: 3px solid rgb(var(--v-theme-softAttention));
    padding: 50px;
    border-radius: 20px;
    gap: 5px;
    &-title {
      font-family: $primary-font;
      font-size: 50px;
    }
    &-subtitle {
        margin-top: 10px;
      font-family: $secondary-font;
      font-size: 15px;
    }
    &-input {
        margin: 20px 0 5px 0;
      flex: none;
    }
    &-submit-button {
      width: fit-content;
      
    }
  }
}
</style>
