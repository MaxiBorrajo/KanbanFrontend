<template>
  <footer class="footer">
    <div class="footer-top">
      <router-link title="home" class="footer-top-link" :to="{ name: 'Home' }">
        <h3 class="footer-top-title">
          KANBAN
        </h3>
      </router-link>
    </div>
    <div class="social">
      <h2>
        <a href="https://www.linkedin.com/in/maximiliano-borrajo"
          ><i class="fa-brands fa-linkedin social-icon" id="linkedin-icon"></i
        ></a>
      </h2>
      <h2>
        <a href="https://github.com/MaxiBorrajo"
          ><i class="fa-brands fa-github social-icon" id="github-icon"></i
        ></a>
      </h2>
    </div>
    <div class="footer-bottom">
      <p>
        Copyright &copy;{{ new Date().getFullYear() }}. Designed by Maximiliano
        Borrajo
      </p>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
.footer {
  font-family: $secondary-font;

  width: 100%;
  padding: 20px;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;

  background-color: rgb(var(--v-theme-card));
  color: rgb(var(--v-theme-text));

  .footer-top-link {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;

    cursor: pointer;

    color: rgb(var(--v-theme-text));
  }
  .footer-top-title {
    font-weight: 500;
    font-family: $primary-font;
    font-size: 25px;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  .social {
    width: 100%;

    text-decoration: none;

    display: flex;
    justify-content: center;
    column-gap: 150px;
  }

  .social-icon {
    transition: 0.5s;
  }
  .social-icon:hover {
    transform: rotate(360deg);
  }

  .footer-bottom {
    text-align: center;
  }
}

#linkedin-icon {
  color: #0a66c2;
}

#github-icon {
  color: rgb(var(--v-theme-text));
}
</style>
