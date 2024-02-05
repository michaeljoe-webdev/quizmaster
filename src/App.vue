<template>
  <img alt="Quiz Master logo" src="./assets/qm-logo.png" height="150px">
  <WelcomePage msg="Welcome to Quiz Master!"/>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

</template>

<script>
import WelcomePage from './components/WelcomePage.vue';
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    WelcomePage,
    // HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
