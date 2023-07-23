import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import { auth } from "../firebase-config";
import ProfileList from "@/components/ProfileList";
import ShowProfile from "@/components/ShowProfile";
import AddProfile from "@/components/AddProfile";
import EditProfile from "@/components/EditProfile";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Login",
      component: Login,
    },
    {
      path: "/register",
      name: "Register",
      component: () =>
        import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    },
    {
      path: "/profiles",
      name: "ProfileList",
      component: ProfileList,
      meta: {
        authRequired: true,
      },
    },
    {
      path: "/show-profile/:id",
      name: "ShowProfile",
      component: ShowProfile,
      meta: {
        authRequired: true,
      },
    },
    {
      path: "/add-profile",
      name: "AddProfile",
      component: AddProfile,
      meta: {
        authRequired: true,
      },
    },
    {
      path: "/edit-profile/:id",
      name: "EditProfile",
      component: EditProfile,
      meta: {
        authRequired: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.authRequired);
  
  if (requiresAuth && !auth.currentUser) {
    //alert("You must be logged in to see this page");
    next({ path: "/" });
  } else {
    if (auth.currentUser && to.path === "/") {
      router.push({ path: "/profiles" });
    }
    next();
  }
});

export default router;
