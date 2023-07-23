<template>
  <div id="app">
    <NavBar />
    <div id="app" class="container mt-4">
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar';

export default {
  name: "app",
  components: {
    NavBar
  }
};
</script>

<style>
@import "./assets/css/styles.css";
</style>
