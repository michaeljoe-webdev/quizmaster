import { createApp } from 'vue'
import App from './App.vue'
// import CongratsAnimation from './components/CongratsAnimation.vue'
import Particles from "vue3-particles"


// createApp(CongratsAnimation).use(Particles).mount('#animation');
createApp(App).use(Particles).mount('#app');
