import Vue from 'vue'
import App from './App.vue'
import RawScenes from './RawScenes.vue'
import './main.css'

Vue.config.productionTip = false

const hash = window.location.hash;
const Page = (hash === '#scenes') ? RawScenes : App;

new Vue({
  render: h => h(Page),
}).$mount('#app')
