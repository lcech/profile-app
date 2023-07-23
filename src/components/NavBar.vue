<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="/">Profile App</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/profiles" v-show="isAuthenticated">
          Profiles
        </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav v-if="!isAuthenticated" class="ml-auto">
        <b-nav-item href="/">Login</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-else class="ml-auto">
        <b-nav-text>{{ name }}</b-nav-text>
        <b-nav-item @click="logout">Logout</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    name() {
      return this.$store.getters.user.name || this.$store.getters.user.email;
    },
  },

  methods: {
    async logout() {
      await this.$store.dispatch("signOutAction");
    },
  },
};
</script>
