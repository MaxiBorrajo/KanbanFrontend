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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: HomeView,
      beforeEnter: (to, from, next) => {
        goToPathOrDefault({ name: "Dashboard" }, null, isLoggedIn(), next);
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
      path: "/resetPassword",
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

function goToPathOrDefault(path, defaultPath, condition, next) {
  if (condition) {
    next(path);
  } else {
    next(defaultPath);
  }
}

function isLoggedIn() {
  return JSON.parse(localStorage.getItem("loggedIn"));
}

function setLoginError(condition) {
  const userStore = useUserStore();
  if (condition) {
    userStore.loginError = true;
  }
}

function canGoToRoute(requireAuth) {
  return !requireAuth || (requireAuth && isLoggedIn());
}

router.beforeEach(async (to, from, next) => {
  const requireAuth = to.meta.requireAuth;

  setLoginError(!canGoToRoute(requireAuth));

  goToPathOrDefault(null, { name: "Login" }, canGoToRoute(requireAuth), next);
});

export default router;
