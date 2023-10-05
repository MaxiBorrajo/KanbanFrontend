<template>
  <section class="feedback-section d-flex justify-center">
    <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />

    <v-form
      ref="form"
      @submit.prevent="sendFeedback(feedbackForm)"
      class="feedback-section-form d-flex flex-column justify-center"
    >
      <p class="feedback-section-form-title">Feedback</p>
      <v-divider color="attention" :thickness="3"></v-divider>
      <TextareaComponent
        input-label="Comment"
        v-model="feedbackForm.comment"
        input-variant="solo"
        :input-rules="[rules.required]"
        class="feedback-section-form-textarea"
      />
      <ButtonComponent
        button-label="Send"
        button-type="submit"
        class="feedback-section-form-submit-button"
        button-prepend-icon="fa-solid fa-paper-plane"
      />
    </v-form>
    <SnackbarComponent
      v-model="showSnackbar"
      :snackbar-timeout="3000"
      :snackbar-multiline="true"
      snackbar-text="Feedback sent"
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
import TextareaComponent from "@/components/TextareaComponent.vue";

const userStore = useUserStore();

const showSnackbar = ref(false);

const error = ref({
  hasError: false,
  errorMessage: "",
});

const feedbackForm = ref({
  comment: "",
});

const form = ref(null);

async function sendFeedback(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      showSnackbar.value = false;

      const result = await userStore.sendFeedback(dataForm);

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
.feedback-section {
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
    &-title {
      font-family: $primary-font;
      font-size: 50px;
    }
    &-textarea {
      margin-top: 20px;
      padding-bottom: 10px;
    }
    &-submit-button {
      width: fit-content;
      margin-bottom: 50px;
    }
  }
}
</style>
