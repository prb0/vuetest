import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const store = new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem("users")) || [],
  },
  mutations: {
    setUser(state, newUser) {
  		localStorage.setItem("users", JSON.stringify(newUser));
      state.users = newUser;
  	},
  }
});

new Vue({
  el: '#app',
  store,
  render: (h) => h(App)
});


