import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import dashboard from "./components/dashboard.vue";
import login from "./components/login.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "dashboard",
    component: dashboard,
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  // let token = localStorage.getItem("token");
  if (authRequired) {
    return next({
      path: "/login",
      query: {
        returnUrl: to.path,
      },
    });
  } else {
    next();
  }
});

export default router;
