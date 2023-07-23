import Vue from "vue";
import Vuex from "vuex";
import { auth, db, googleProvider } from "../firebase-config";
import router from "../router/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    authLoading: false,
    error: null,
  },

  mutations: {
    beforeAuth(state) {
      state.authLoading = true;
    },

    afterSuccessfulAuth(state, { uid, name, email, photoURL, admin }) {
      state.authLoading = false;
      state.user = { uid, name, email, photoURL, admin };
      state.error = null;
    },

    afterError(state, message) {
      state.authLoading = false;
      state.error = message;
    },

    afterLogout(state) {
      state.user = null;
    },
  },

  actions: {
    async registerWithEmailAndPasswordAction({ commit }, payload) {
      try {
        commit("beforeAuth");

        const userRes = await auth.createUserWithEmailAndPassword(payload.email, payload.password);
        console.log(userRes);

        const dbRes = await db.collection("users").doc(userRes.user.uid).set({
          admin: false
        });
        console.log(dbRes);

        router.push("/profiles");

      } catch (error) {
        commit("afterError", error.message);
      }
    },

    async signInWithEmailAndPasswordAction({ commit }, payload) {
      try {
        commit("beforeAuth");

        await auth.signInWithEmailAndPassword(payload.email, payload.password);

        router.push("/profiles");
      } catch (error) {
        commit("afterError", error.message);
      }
    },

    async signInWithGoogleAction({ commit }) {
      try {
        commit("beforeAuth");

        googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");
        const signInRes = await auth.signInWithRedirect(googleProvider);
        console.log("Signing in: ", signInRes);

        const userRes = await db.collection("users").doc(signInRes.user.uid).get();
        if (userRes.data()) {
          console.log("User found: ", userRes);
        } else {
          const newUserRes = await db.collection("users").doc(signInRes.user.uid).set({
            admin: false
          });
          console.log("User updated : ", newUserRes);
        }

        router.push("/profiles");
      } catch (error) {
        commit("afterError", error.message);
      }
    },

    autoSignIn({ commit }, payload) {
      commit("afterSuccessfulAuth", {
        uid: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoURL: payload.photoURL,
        admin: payload.admin
      });
    },

    async signOutAction({ commit }) {
      try {
        await auth.signOut();
        commit("afterLogout");

        router.push("/");
      } catch (error) {
        commit("afterError", error.message);
      }
    },
  },

  getters: {
    user: (state) => state.user,
    isAuthenticated: (state) => !!state.user,
  },
});
