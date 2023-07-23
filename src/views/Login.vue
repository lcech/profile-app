<template>
  <div>
    <h2>Login</h2>
    <b-form @submit.prevent="login">
      <b-form-group id="email-group" label="Email address:" label-for="email">
        <b-form-input
          id="email"
          type="email"
          placeholder="Email address..."
          v-model="email"
        />
      </b-form-group>
      <b-form-group id="password-group" label="Password:" label-for="password">
        <b-form-input
          id="password"
          type="password"
          placeholder="password..."
          v-model="password"
        />
      </b-form-group>
      <b-button type="submit" variant="primary">Login</b-button>
      or
      <b-button type="button" variant="primary" @click="loginWithGoogle"
        >Login with Google</b-button
      >
    </b-form>
    <hr />
    <p>
      Don't have account yet?
      <a href="/register">Register</a>
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login() {
      this.$store.dispatch("signInWithEmailAndPasswordAction", {
        email: this.email,
        password: this.password,
      });
    },
    loginWithGoogle() {
      this.$store.dispatch("signInWithGoogleAction");
    },
  },
};
</script>
