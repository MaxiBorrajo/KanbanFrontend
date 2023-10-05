<template>
  <section class="register-section">
    <div class="register-section-content d-flex align-center flex-column">
      <p class="register-section-content-logo">KANBAN</p>
      <p class="register-section-content-title text-center">
        Everything <br />
        starts here...
      </p>
      <p class="register-section-content-subtitle text-center">
        And your first task is...
      </p>
      <HomeTaskComponent
        home-task-title="Create your account and start listing tasks &#128170;"
        :home-task-status="1"
      />
    </div>
    <div class="register-section-form d-flex justify-center flex-column">
      <p class="register-section-form-subtitle">Register</p>
      <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
      <v-form
        ref="form"
        @submit.prevent="register(registerForm)"
        class="d-flex justify-center flex-column"
      >
        <InputComponent
          input-label="Username"
          :input-rules="[rules.required]"
          v-model="registerForm.username"
          input-variant="solo"
        />
        <InputComponent
          input-label="Email"
          :input-rules="[rules.required, rules.email]"
          v-model="registerForm.email"
          input-variant="solo"
        />
        <InputComponent
          input-label="Password"
          :input-rules="[rules.required, rules.password]"
          v-model="registerForm.password"
          :input-append-inner-icon="
            showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
          "
          @click:append-inner="showPassword = !showPassword"
          :input-type="showPassword ? 'text' : 'password'"
          input-variant="solo"
        />
        <InputComponent
          input-type="password"
          input-label="Confirm password"
          :input-rules="[
            rules.required,
            rules.confirmPassword(registerForm.password),
          ]"
          input-variant="solo"
        />
        <p @click="router.push({ name: 'Login' })" style="cursor: pointer">
          Have account?
        </p>
        <ButtonComponent
          button-label="Sign up"
          button-type="submit"
          class="register-section-form-submit-button"
        />
      </v-form>
      <span
        class="register-section-form-divider d-flex align-center justify-center"
        ><v-divider></v-divider>or<v-divider></v-divider
      ></span>

      <div
        class="register-section-form-google-button d-flex align-center justify-center"
      >
        <a :href="linkGoogle" class="d-flex align-center justify-center"> <v-icon icon="fa-brands fa-google"></v-icon></a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/index";
import rules from "../utils/rules";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import HomeTaskComponent from "@/components/HomeTaskComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";

const form = ref(null);

const registerForm = ref({
  username: null,
  email: null,
  password: null,
});

const userStore = useUserStore();

const showPassword = ref(false);

const linkGoogle = import.meta.env.VITE_URL_GOOGLE;

const error = ref({
  hasError: false,
  errorMessage: "",
});

async function register(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const result = await userStore.register(dataForm);

      localStorage.setItem("userInfo", JSON.stringify(result));

      delete dataForm.email;

      await userStore.login(dataForm);

      localStorage.setItem("loggedIn", true);

      router.push({ name: "Dashboard" });
    } catch (err) {
      error.value.hasError = true;

      error.value.errorMessage = err.response.data.resource.message;
    }
  }
}
</script>

<style scoped lang="scss">
.register-section {
  display: grid;
  grid-template-columns: 55% 45%;
  grid-template-rows: 100%;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  font-family: $secondary-font;

  color: rgb(var(--v-theme-text));

  &-subtitle {
    font-size: 25px;
    font-weight: 200;

    margin-bottom: 30px;
  }

  &-content,
  &-form {
    width: 100%;
    height: 100%;
    min-height: 100vh;
  }

  &-content {
    padding-top: 50px;
    background-color: rgb(var(--v-theme-attention));
    color: #ffffff;
    gap: 30px;
    &-logo {
      text-align: center;
      font-size: 30px;
      font-family: $primary-font;

      margin-bottom: 30px;
    }
    &-title {
      width: 100%;
      font-size: 45px;
    }
  }

  &-form {
    background-color: rgb(var(--v-theme-backgroundColor));

    padding: 50px 120px 100px 120px;

    gap: 20px;

    .v-form {
      gap: 10px;
    }

    &-submit-button {
      margin-top: 10px;
    }

    &-divider {
      gap: 15px;
    }

    &-subtitle {
      width: 100%;
      margin-bottom: 10px;

      font-weight: 200;
      font-size: 20px;
    }

    &-google-button {
      width: 100%;

      a {
        border-radius: 5px;
        width: 80px;
        height: 50px;
        background-color: #4185f4;
        color: #ffffff !important;
      }
    }
  }
}
</style>
