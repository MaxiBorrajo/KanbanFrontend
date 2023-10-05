<template>
  <main>
    <RouterView />
  </main>
  <FooterComponent />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useTheme } from "vuetify";
import { onBeforeMount } from "vue";
import FooterComponent from "@/components/FooterComponent.vue";
const theme = useTheme();

onBeforeMount(()=>{
  theme.global.name.value = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).theme : 'light'
})
</script>

<style lang="scss">
main{
  width: 100%;
  height: auto;
  min-height: 100vh;
}

#app {
  font-family: $secondary-font;
  -webkit-font-smoothing: antialiased;
  -moz-asx-font-smoothing: grayscale;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

h1 {
  font-size: 32px;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 18px;
}

h4 {
  font-size: 16px;
}

h5 {
  font-size: 14px;
}

h6 {
  font-size: 12px;
}

p {
  font-size: 12px;
}

a {
  text-decoration: none;
}
</style>
