<template>
    <section class="error-section d-flex align-center justify-center flex-column">
        It seems that you are lost &#x1F914;. This route does not exist.
        <ButtonComponent
          button-label="go to home"
          button-type="button"
          button-prepend-icon="fa-solid fa-house"
          :button-route="{name:'Home'}"
        />
    </section>
</template>

<script setup>
import { ref } from "vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
</script>

<style scoped lang="scss">
.error-section{
    width: 100%;
    height: 100%;
    min-height: 100vh;
    font-size: 30px;
    gap: 50px;
}
</style>
