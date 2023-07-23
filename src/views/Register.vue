<template>
  <div>
    <h2>Register</h2>
    <b-form @submit.prevent="register">
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
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
</template>
<script>
export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register() {
      this.$store.dispatch("registerWithEmailAndPasswordAction", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>
