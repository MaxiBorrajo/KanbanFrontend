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
          backgroundColor: "#ffffff",
          card: "#e1e2e3",
          text: "#1a1919",
          attention: "#662d91",
          softAttention: "#9100ff",
        },
      },
      dark: {
        dark: false,
        colors: {
          backgroundColor: "#1a1919",
          card: "#212121",
          text: "#ffffff",
          attention: "#8b3fc4",
          softAttention: "#662d91",
        },
      },
    },
  },
});

const app = createApp(App);

app.directive

//Dependencies
app.use(createPinia());
app.use(router);
app.use(vuetify);
app.mount("#app");
