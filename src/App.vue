<template>
  <img alt="Quiz Master logo" src="./assets/qm-logo.png" height="150px">
  <QuizMaster msg="Welcome to Quiz Master!"/>
  <!-- <CongratsAnimation/> -->

</template>

<script>
import QuizMaster from './components/QuizMaster.vue';
// import CongratsAnimation from './components/CongratsAnimation.vue'

export default {
  name: 'App',
  components: {
    QuizMaster,
    // CongratsAnimation
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
