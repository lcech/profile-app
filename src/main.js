import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { auth, db } from "./firebase-config";

import BootstrapVue from "bootstrap-vue";
import { BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap-vue/dist/bootstrap-vue-icons.min.css";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

let app;
auth.onAuthStateChanged(async (user) => {
  if (user) {
    const ref = db.collection("users").doc(user.uid);
    const snapshot = await ref.get();

    if (snapshot.exists) {
      console.log("Document data:", snapshot.data());
      user.admin = snapshot.data().admin;
    } else {
      console.log("User not found!");
    }

    store.dispatch("autoSignIn", user);
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
