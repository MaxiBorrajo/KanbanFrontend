<template>
  <section class="register-section">
    <div class="register-section__content d-flex align-center flex-column">
      <p class="register-section__content__logo">KANBAN</p>
      <p class="register-section__content__title text-center">
        Everything <br />
        starts here...
      </p>
      <p class="register-section__content__subtitle text-center">
        And your first task is...
      </p>
      <HomeTaskComponent
        title="Create your account and start listing tasks &#128170;"
        :status="1"
      />
      <!-- <p class="register-section__content__title">
        Everything <br />starts here
      </p>
      <p class="register-section__content__subtitle">
        Create your account and start <br />
        listing your tasks
      </p> -->
    </div>
    <div class="register-section__form d-flex justify-center flex-column">
      <p class="subtitle">Register</p>
      <ErrorComponent
        v-if="error.has_error"
        :error_component_message="error.error_message"
        class="error"
      />
      <v-form
        ref="form"
        @submit.prevent="register(registerForm)"
        class="d-flex justify-center flex-column"
      >
        <InputComponent
          input_label="Username"
          :input_rules="[rules.required]"
          v-model="registerForm.username"
          input_color="#ffffff"
        />
        <InputComponent
          input_label="Email"
          :input_rules="[rules.required, rules.email]"
          v-model="registerForm.email"
          input_color="#ffffff"
        />
        <InputComponent
          input_label="Password"
          :input_rules="[rules.required, rules.password]"
          v-model="registerForm.password"
          :input_append_inner_icon="
            showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'
          "
          @click:append-inner="showPassword = !showPassword"
          :input_type="showPassword ? 'text' : 'password'"
          input_color="#ffffff"
        />
        <InputComponent
          input_type="password"
          input_label="Confirm password"
          :input_rules="[
            rules.required,
            rules.confirm_password(registerForm.password),
          ]"
          input_color="#ffffff"
        />
        <p @click="router.push({ name: 'Login' })" style="cursor: pointer">
          Have account?
        </p>
        <ButtonComponent
          button-label="Sign up"
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
          <v-icon icon="fa-brands fa-google"></v-icon></div
      ></a>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import router from "../router/index";
import { useUserStore } from "../stores/userStore";
import rules from "../utils/rules";
import InputComponent from "@/components/InputComponent.vue";
import VueCookies from "vue-cookies";
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
  has_error: false,
  error_message: "",
});

async function register(dataForm) {
  const { valid } = await form.value.validate();

  if (valid) {
    try {
      const result = await userStore.register(dataForm);

      localStorage.setItem("userInfo", JSON.stringify(result));

      VueCookies.set("loggedIn", true);

      delete dataForm.email;

      await userStore.login(dataForm);

      router.push({ name: "Dashboard" });
    } catch (err) {
      error.value.has_error = true;

      error.value.error_message = err.response.data.resource.message;
    }
  }
}
</script>

<style scoped lang="scss">
.register-section {
  display: grid;
  grid-template-columns: 60% 40%;
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
    background-color: #662d91;
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
    background-color: #191919;
    padding: 50px 100px 100px 100px;
    gap: 20px;

    .v-form {
      gap: 10px;

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
    color: #191919 !important;
  }
}
</style>
