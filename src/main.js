//Imports
import { createApp } from "vue";

import { createPinia } from "pinia";

import App from "./App.vue";

import router from "./router";

import "vuetify/styles";

import { createVuetify } from "vuetify";

import * as components from "vuetify/components";

import * as directives from "vuetify/directives";

import { aliases, fa } from "vuetify/iconsets/fa";

import { mdi } from "vuetify/iconsets/mdi";

//Variables
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: "fa",
    aliases,
    sets: {
      fa,
      mdi,
    },
  },
  theme: {
    themes: {
      light: {
        dark: false,
        colors: {
          background_color: "#ffffff",
          card: "#e1e2e3",
          text: "#1a1919",
          attention: "#1a1919",
          soft_attention: "#b5b5b5",
        },
      },
      dark: {
        dark: false,
        colors: {
          background_color: "#1a1919",
          card: "#212121",
          text: "#ffffff",
          attention: "#ffffff",
          soft_attention: "#757575",
        },
      },
    },
  },
});

const app = createApp(App);

//Dependencies
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
