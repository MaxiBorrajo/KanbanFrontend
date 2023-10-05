<template>
  <section class="forgot-password-section d-flex justify-center">
    <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
    <v-form
      ref="form"
      @submit.prevent="resetPassword(resetPasswordForm)"
      class="forgot-password-section-form d-flex flex-column justify-center"
    >
      <p class="forgot-password-section-form-title">Reset password</p>

      <v-divider color="attention" :thickness="3"></v-divider>
      <p class="forgot-password-section-form-subtitle">
        Please, enter a new password. If you have not requested this password
        change, please ignore this page.
      </p>
      <InputComponent
        input-label="Password"
        :input-rules="[rules.required, rules.password]"
        v-model="resetPasswordForm.password"
        :input-append-inner-icon="
          showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
        "
        @click:append-inner="showPassword = !showPassword"
        :input-type="showPassword ? 'text' : 'password'"
        input-variant="solo"
        class="forgot-password-section-form-input"
      />
      <InputComponent
        input-type="password"
        input-label="Confirm password"
        :input-rules="[
          rules.required,
          rules.confirmPassword(resetPasswordForm.password),
        ]"
        input-variant="solo"
        class="forgot-password-section-form-input"
      />
      <ButtonComponent
        button-label="change password"
        button-type="submit"
        class="forgot-password-section-form-submit-button"
      />
    </v-form>
    <SnackbarComponent
      v-model="showSnackbar"
      :snackbar-timeout="3000"
      :snackbar-multiline="true"
      snackbar-text="Password changed"
      :snackbar-has-action="true"
      snackbar-btn-label="Go to login"
      snackbar-btn-type="button"
      :snackbar-btn-action="
        () => {
          router.push({ name: 'Login' });
        }
      "
    />
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRoute } from "vue-router";
import rules from "../utils/rules";
import router from "../router";
import ErrorComponent from "@/components/ErrorComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";
import InputComponent from "@/components/InputComponent.vue";

const userStore = useUserStore();

const route = useRoute();

const showSnackbar = ref(false);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const resetPasswordForm = ref({
  password: "",
});

const form = ref(null);

const showPassword = ref(false);

async function resetPassword(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      showSnackbar.value = false;

      const result = await userStore.resetPassword(
        route.query.token,
        dataForm
      );

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
      margin-bottom: 20px;
    }
    &-input {
      margin: 0px 0 5px 0;
      flex: none;
    }
    &-submit-button {
      width: fit-content;
    }
  }
}
</style>
