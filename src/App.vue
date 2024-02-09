<template>
  <img alt="Quiz Master logo" src="./assets/qm-logo.png" height="150px">
  <button @click="signIn">Sign in with Google</button>
  <!-- <button @click="signInWithGoogle">Sign in with Google</button> -->

  <QuizMaster msg="Welcome to Quiz Master!"/>
  <!-- <CongratsAnimation/> -->

</template>

<script>
// import { GoogleAuth } from 'google-auth-library';
import googleAuth from '@/services/googleAuth';
import QuizMaster from './components/QuizMaster.vue';
// import CongratsAnimation from './components/CongratsAnimation.vue'


export default {
  name: 'App',
  components: {
    QuizMaster,
    // CongratsAnimation
  },
  methods: {
    async signIn() {
      await googleAuth.signIn();
    },
    // async signInWithGoogle() {
    //   const auth = new GoogleAuth();
    //   const client = await auth.getClient({
    //     scopes: ['email', 'profile'], // Define the scopes for accessing user information
    //   });
      
    //   // Use the client to sign in the user
    //   const ticket = await client.verifyIdToken({
    //     idToken: 'YOUR_ID_TOKEN_FROM_GOOGLE', // Replace with the actual ID token received from the frontend
    //     audience: 'YOUR_CLIENT_ID.apps.googleusercontent.com', // Replace with your OAuth client ID
    //   });
      
    //   const payload = ticket.getPayload();
    //   console.log(payload); // Log the user's profile information
    // },
  },
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
