<template>
  <NavBar />
  <!-- 用于使用完整路径判重，并强制刷新 -->
  <router-view :key="$route.fullPath" />
</template>

<script>
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";
import NavBar from "./components/NavBar";

export default {
  name: "App",
  components: {
    NavBar: NavBar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #3b86e8;
}
</style>
