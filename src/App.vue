<template>
  <img alt="Quiz Master logo" src="./assets/qm-logo.png" height="150px">
  <QuizMaster msg="Welcome to Quiz Master!"/>
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->

</template>

<script>
import QuizMaster from './components/QuizMaster.vue';
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    QuizMaster,
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
}
</style>
