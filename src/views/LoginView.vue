<template>
  <section class="login-section">
    <div class="login-section-form d-flex justify-center flex-column">
      <p class="login-section-form-subtitle">Login</p>
      <ErrorComponent v-model="error.hasError" :error-sent="error.errorMessage" />
      <v-form
        ref="form"
        @submit.prevent="login(loginForm)"
        class="d-flex justify-center flex-column"
      >
        <InputComponent
          input-label="Email/Username"
          :input-rules="[rules.required]"
          v-model="loginForm.username"
          input-variant="solo"
        />
        <InputComponent
          input-label="Password"
          :input-rules="[rules.required, rules.password]"
          v-model="loginForm.password"
          :input-append-inner-icon="
            showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
          "
          @click:append-inner="showPassword = !showPassword"
          :input-type="showPassword ? 'text' : 'password'"
          input-variant="solo"
        />
        <p
          @click="router.push({ name: 'ForgotPassword' })"
          style="cursor: pointer"
        >
          Forgot password?
        </p>
        <ButtonComponent
          button-label="Sign in"
          button-type="submit"
          class="login-section-form-submit-button"
        />
      </v-form>
      <span
        class="login-section-form-divider d-flex align-center justify-center"
        ><v-divider></v-divider>or<v-divider></v-divider
      ></span>
      <div
        class="login-section-form-google-button d-flex align-center justify-center"
      >
        <a :href="linkGoogle" class="d-flex align-center justify-center">
          <v-icon icon="fa-brands fa-google"></v-icon>
        </a>
      </div>
    </div>
    <div class="login-section-content d-flex align-center flex-column">
      <p class="login-section-content-logo">KANBAN</p>
      <p class="login-section-content-title text-center">
        Welcome <br />
        back!
      </p>
      <p class="login-section-content-subtitle text-center">
        We are glad to see you again
      </p>
      <HomeTaskComponent
        home-task-title="Don't have account yet &#128546;? CLICK!"
        :home-task-status="2"
        @click="router.push({ name: 'Register' })"
        style="cursor: pointer"
      />
      <SnackbarComponent
        v-model="openSnackbar"
        :snackbar-timeout="3000"
        :snackbar-multiline="true"
        snackbar-text="Login required"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import router from "../router/index";
import rules from "../utils/rules";
import InputComponent from "@/components/InputComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import HomeTaskComponent from "@/components/HomeTaskComponent.vue";
import ErrorComponent from "@/components/ErrorComponent.vue";
import SnackbarComponent from "@/components/SnackbarComponent.vue";

const form = ref(null);

const loginForm = ref({
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

const openSnackbar = ref(false);

async function login(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const result = await userStore.login(dataForm);

      localStorage.setItem("userInfo", JSON.stringify(result));

      router.push({ name: "Dashboard" });
    } catch (err) {
      error.value.hasError = true;

      error.value.errorMessage = err.response.data.resource.message;
    }
  }
}

onMounted(() => {
  openSnackbar.value = userStore.loginError;

  userStore.loginError = false;
});
</script>

<style scoped lang="scss">
.login-section {
  display: grid;
  grid-template-columns: 45% 55%;
  grid-template-rows: 100%;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  font-family: $secondary-font;

  color: rgb(var(--v-theme-text));

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
    &-subtitle {
      width: 100%;
      font-weight: 200;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }

  &-form {
    background-color: rgb(var(--v-theme-backgroundColor));
    padding: 50px 120px 100px 120px;
    gap: 20px;
    
    .v-form {
      gap: 15px;
    }

    &-submit-button {
      margin-top: 10px;
    }

    &-divider {
      gap: 15px;
    }

    &-subtitle {
      font-size: 25px;
      font-weight: 200;

      margin-bottom: 30px;
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
