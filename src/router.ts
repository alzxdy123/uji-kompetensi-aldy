import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import dashboard from "./components/dashboard.vue";
import login from "./components/login.vue";
import home from "./components/home.vue";
import holidayParameter from "./components/holidayParameter.vue";
import authorization from "./components/authorization.vue";
import authorizationDetail from "./components/authorizationDetail.vue";
import Loading from "./components/common/Loading.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        component: dashboard,
      },
      {
        path: "/holiday-parameter",
        name: "holidayParameter",
        component: holidayParameter,
      },
      {
        path: "/authorization",
        name: "authorization",
        component: authorization,
      },
      {
        path: "/authorization/detail",
        name: "authorizationDetail",
        component: authorizationDetail,
      },
      {
        path: "/loading",
        component: Loading,
      },
    ],
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
  let token = localStorage.getItem("token");
  if (authRequired && token == null) {
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
