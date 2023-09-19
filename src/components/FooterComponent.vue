<template>
  <!-- Footer -->
  <footer class="footer">
    <!-- Footer top -->
    <div class="footer-top">
      <router-link title="home" class="footer-top__a" :to="{ name: 'Home' }">
        <h3 class="footer-top__h3">
          KANBAN
        </h3>
      </router-link>
    </div>
    <!-- Social networks -->
    <div class="social">
      <!-- Linkedin -->
      <h2>
        <a href="https://www.linkedin.com/in/maximiliano-borrajo"
          ><i class="fa-brands fa-linkedin social__i" id="linkedin_icon"></i
        ></a>
      </h2>
      <!-- Github -->
      <h2>
        <a href="https://github.com/MaxiBorrajo"
          ><i class="fa-brands fa-github social__i" id="github_icon"></i
        ></a>
      </h2>
    </div>
    <!-- Footer bottom -->
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
//Footer's style
.footer {
  //Font style
  font-family: $secondary-font;

  //Size and spacing
  width: 100%;
  padding: 20px;
  height: 100%;

  //Display
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;

  //Color
  background-color: rgb(var(--v-theme-card));
  color: rgb(var(--v-theme-text));

  //Footer top link style
  .footer-top__a {
    //Display
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: 5px;

    //Cursor
    cursor: pointer;

    //Color
    color: rgb(var(--v-theme-text));
    img {
      width: 15px;
    }
  }

  //Footer top h3 style
  .footer-top__h3 {
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: $primary-font;
    font-size: 25px;
  }

  //Section with social networks
  .social {
    //Size
    width: 100%;

    //Text style
    text-decoration: none;

    //Display
    display: flex;
    justify-content: center;
    column-gap: 150px;
  }

  //Section with social networks icons style
  .social__i {
    transition: 0.5s;
  }
  .social__i:hover {
    transform: rotate(360deg);
  }

  //Footer bottom style
  .footer-bottom {
    //Text style
    text-align: center;
  }
}

//Linkedin icon
#linkedin_icon {
  //Color
  color: #0a66c2;
}

//Github icon
#github_icon {
  //Color
  color: rgb(var(--v-theme-text));
}
</style>
