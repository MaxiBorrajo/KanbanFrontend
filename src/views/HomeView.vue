<template>
  <section class="home-section">
    <div class="navbar d-flex align-center justify-space-between">
      <p class="logo">KANBAN</p>
      <p class="login" @click="router.push({ name: 'Login' })">LOGIN</p>
    </div>
    <div
      class="home-section__main-content d-flex align-center justify-center flex-column"
    >
      <p class="home-section__main-content__text">
        Time to organize your <br />
        life with <span>KANBAN</span>
      </p>
      <ButtonComponent
        button-label="get started"
        class="home-section__main-content__button"
        :button-route="{ name: 'Register' }"
        button-color="background"
      />
    </div>
    <HomeTaskComponent
      title="Create a Digital Marketing Plan for a Local Clothing Store"
      :status="1"
      class="task1"
    />
    <HomeTaskComponent
      title="Work is underway on the selection of products and the definition of prices."
      :status="2"
      class="task2"
    />
    <HomeTaskComponent
      title="The navigation structure and website requirements are defined."
      :status="3"
      class="task3"
    />
    <HomeTaskComponent
      title="Hosting and domain setup is in progress."
      :status="2"
      class="task4"
    />
  </section>
</template>

<script setup>
import { onBeforeMount } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import HomeTaskComponent from "@/components/HomeTaskComponent.vue";
import router from "../router";
import { useRoute } from "vue-router";
import VueCookies from "vue-cookies";
import { useUserStore } from "../stores/userStore";

const route = useRoute();

//Lifehook that set the current theme before view render
onBeforeMount(async () => {
  if (route.query.googleRedirect) {
    const userStore = useUserStore();

    const result = await userStore.getActualUser();

    localStorage.setItem("userInfo", JSON.stringify(result));

    VueCookies.set("loggedIn", true);

    router.push({ name: "Dashboard" });
  }
});
</script>

<style lang="scss">
.home-section {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-image: url("hero-section-kanban-background.svg");
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-clip: border-box;
  background-origin: border-box;
  background-size: cover;
  font-family: $secondary-font;
  color: #ffffff;
  .navbar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    .logo {
      font-family: $primary-font;
    }
    .login {
      cursor: pointer;
    }
  }
  &__main-content {
    margin-top: 15px;
    width: 100%;
    height: calc(100vh - 50px);
    gap: 20px;
    &__text {
      text-align: center;
      font-size: 45px;
      span {
        font-family: $primary-font;
      }
    }
    &__button {
      letter-spacing: 0.5px !important;
      padding-right: 10px !important;
      padding-left: 10px !important;
    }
  }
}

.task1 {
  position: absolute;
  top: 125px;
  left: 80px;
}

.task2 {
  position: absolute;
  top: 50px;
  right: 120px;
}
.task3 {
  position: absolute;
  bottom: 120px;
  right: 58px;
}
.task4 {
  position: absolute;
  bottom: 50px;
  left: 65px;
}
</style>
