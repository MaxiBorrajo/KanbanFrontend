import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "../stores/userStore";
import HomeView from "../views/HomeView.vue";
import DashboardView from "../views/DashboardView.vue";
import ErrorView from "../views/ErrorView.vue";
import ProfileView from "../views/ProfileView.vue";
import ForgotPasswordView from "../views/ForgotPasswordView.vue";
import ResetPasswordView from "../views/ResetPasswordView.vue";
import FeedbackView from "../views/FeedbackView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import VueCookies from "vue-cookies";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        if (
          VueCookies.isKey("loggedIn") &&
          VueCookies.get("loggedIn")
        ) {
          next({ name: "Dashboard" });
        } else {
          next();
        }
      },
    },
    {
      path: "/login",
      name: "Login",
      component: LoginView,
    },
    {
      path: "/register",
      name: "Register",
      component: RegisterView,
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: DashboardView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: ProfileView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/forgotPassword",
      name: "ForgotPassword",
      component: ForgotPasswordView,
    },
    {
      path: "/resetPassword/:token",
      name: "ResetPassword",
      component: ResetPasswordView,
    },
    {
      path: "/feedback",
      name: "Feedback",
      component: FeedbackView,
      meta: {
        requireAuth: true,
      },
    },
    {
      path: "/:catchAll(.*)",
      name: "Error",
      component: ErrorView,
      pathMatch: "prefix",
    },
  ],
});

//Guards
router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.requireAuth;

  const userStore = useUserStore();

  if (
    (requireAuth && !VueCookies.isKey("loggedIn")) ||
    (requireAuth &&
      VueCookies.isKey("loggedIn") &&
      !VueCookies.get("loggedIn"))
  ) {
    next({ name: "Login" });

    userStore.loginError = true;
  } else {
    next();
  }
});

export default router;
