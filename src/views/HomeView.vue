<template>
  <section class="home-section">
    <div class="home-section-navbar d-flex align-center justify-space-between">
      <p class="home-section-navbar-logo">KANBAN</p>
      <p
        class="home-section-navbar-login"
        @click="router.push({ name: 'Login' })"
      >
        LOGIN
      </p>
    </div>
    <div
      class="home-section-main-content d-flex align-center justify-center flex-column"
    >
      <p class="home-section-main-content-text">
        Time to organize your <br />
        life with <span>KANBAN</span>
      </p>
      <ButtonComponent
        button-label="get started"
        class="home-section-main-content-button"
        :button-route="{ name: 'Register' }"
        button-color="attention"
      />
    </div>
    <HomeTaskComponent
      home-task-title="Create a Digital Marketing Plan for a Local Clothing Store"
      :home-task-status="1"
      class="task1"
    />
    <HomeTaskComponent
      home-task-title="Work is underway on the selection of products and the definition of prices."
      :home-task-status="2"
      class="task2"
    />
    <HomeTaskComponent
      home-task-title="The navigation structure and website requirements are defined."
      :home-task-status="3"
      class="task3"
    />
    <HomeTaskComponent
      home-task-title="Hosting and domain setup is in progress."
      :home-task-status="2"
      class="task4"
    />
  </section>
</template>

<script setup>
import { onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/userStore";
import ButtonComponent from "@/components/ButtonComponent.vue";
import HomeTaskComponent from "@/components/HomeTaskComponent.vue";
import router from "../router";

const route = useRoute();

async function handleLoginFromGoogle() {
  const user = await getActualUser();

  localStorage.setItem("userInfo", JSON.stringify(user));

  localStorage.setItem("loggedIn", true);

  router.push({ name: "Dashboard" });
}

async function getActualUser() {
  const userStore = useUserStore();

  return await userStore.getActualUser();
}

function loginWithGoogle(){
  return route.query.googleRedirect
}

onBeforeMount(async () => {
  if (loginWithGoogle()) {
    await handleLoginFromGoogle();
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
  &-navbar {
    width: 100%;
    height: 50px;
    padding: 0 20px;
    &-logo {
      font-family: $primary-font;
    }
    &-login {
      cursor: pointer;
    }
  }
  &-main-content {
    margin-top: 15px;
    width: 100%;
    height: calc(100vh - 50px);

    gap: 20px;
    &-text {
      text-align: center;
      font-size: 45px;
      span {
        font-family: $primary-font;
      }
    }
    &-button {
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
