<template>
  <section class="login-section">
    <div class="login-section__form d-flex justify-center flex-column">
      <p class="subtitle">Login</p>
      <ErrorComponent
        v-if="error.has_error"
        :error_component_message="error.error_message"
        class="error"
      />
      <v-form
        ref="form"
        @submit.prevent="login(loginForm)"
        class="d-flex justify-center flex-column"
      >
        <InputComponent
          input_label="Email/Username"
          :input_rules="[rules.required]"
          v-model="loginForm.username"
          input_color="#ffffff"
        />
        <InputComponent
          input_label="Password"
          :input_rules="[rules.required, rules.password]"
          v-model="loginForm.password"
          :input_append_inner_icon="
            showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
          "
          @click:append-inner="showPassword = !showPassword"
          :input_type="showPassword ? 'text' : 'password'"
          input_color="#ffffff"
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
          button-color="background"
          class="submit-button"
        />
      </v-form>
      <span class="divider d-flex align-center justify-center"
        ><v-divider></v-divider>or<v-divider></v-divider
      ></span>
      <a :href="linkGoogle" class="d-flex align-center justify-center"
        ><div class="google-button d-flex align-center justify-center">
          <v-icon icon="fa-brands fa-google"></v-icon>
        </div>
      </a>
    </div>
    <div class="login-section__content d-flex align-center flex-column">
      <p class="login-section__content__logo">KANBAN</p>
      <p class="login-section__content__title text-center">
        Welcome <br />
        back!
      </p>
      <p class="login-section__content__subtitle text-center">
        We are glad to see you again
      </p>
      <HomeTaskComponent
        title="Don't have account yet &#128546;? CLICK!"
        :status="2"
        @click="router.push({ name: 'Register' })"
        style="cursor: pointer"
      />
      <!-- Snackbar component -->
      <SnackbarComponent
        v-model="openSnackbar"
        :snackbar_timeout="3000"
        :snackbar_multiline="true"
        snackbar_text="Login required"
      />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import router from "../router/index";
import { useUserStore } from "../stores/userStore";
import rules from "../utils/rules";
import InputComponent from "@/components/InputComponent.vue";
import VueCookies from "vue-cookies";
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
  has_error: false,
  error_message: "",
});

const openSnackbar = ref(false);

async function login(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const result = await userStore.login(dataForm);

      localStorage.setItem("userInfo", JSON.stringify(result));

      VueCookies.set("loggedIn", true);

      router.push({ name: "Dashboard" });
    } catch (err) {
      error.value.has_error = true;

      error.value.error_message = err.response.data.resource.message;
    }
  }
}

//Lifehooks

/*Lifehook in charge of managing a not logged user error */
onMounted(() => {
  openSnackbar.value = userStore.loginError;

  userStore.loginError = false;
});
</script>

<style scoped lang="scss">
.login-section {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 100%;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  font-family: $secondary-font;
  color: #ffffff;
  .subtitle {
    font-size: 25px;
    font-weight: 200;
    margin-bottom: 30px;
  }

  &__content,
  &__form {
    width: 100%;
    height: 100%;
    min-height: 100vh;
  }

  &__content {
    padding-top: 50px;
    background-color: #191919;
    gap: 30px;
    &__logo {
      text-align: center;
      font-size: 30px;
      font-family: $primary-font;
      margin-bottom: 30px;
    }
    &__title {
      width: 100%;
      font-size: 45px;
    }
    &__subtitle {
      width: 100%;
      font-weight: 200;
      font-size: 20px;
      margin-bottom: 10px;
    }
  }

  &__form {
    background-color: #662d91;
    padding: 50px 100px 100px 100px;
    gap: 20px;

    .v-form {
      gap: 15px;

      .submit-button {
        margin-top: 10px;
      }
    }

    .divider {
      gap: 15px;
    }
  }

  a {
    color: #191919 !important;
  }
  .google-button {
    background-color: #ffffff;
    width: 80px;
    height: 50px;
    border-radius: 5px;
    align-self: center;
    cursor: pointer;
  }
}
</style>
