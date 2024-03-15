import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "jam-icons/css/jam.min.css";
import VeeValidate from "vee-validate";
// import { Validator } from "vee-validate";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VeeValidate, {
  // fieldsBagName: 'vvFields',
  inject: true,
  fieldsBagName: "veeFields",
  // errorBagName: 'veeErrors'
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
