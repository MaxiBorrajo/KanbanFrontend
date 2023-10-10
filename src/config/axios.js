import axios from "axios";
import VueCookies from "vue-cookies";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_URL_SERVICE}`,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    const token = VueCookies.get("Authorization");

    if (VueCookies.isKey("Authorization") && token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (!VueCookies.isKey("Authorization") && response.headers["authorizationtoken"]) {
      VueCookies.set(
        "Authorization",
        response.headers["authorizationtoken"],
        "7d"
      );
    }

    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
