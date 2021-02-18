<template>
  <div id="app" class="container mx-auto px-12 flex">
    <Player class="max-w-4xl mx-auto" />
  </div>
</template>

<script>
import Player from "./Player.vue";
import CodePenScene from "./components/CodePenScene";
import DemoScene from "./components/DemoScene";
import EndpointScene from "./components/EndpointScene";

export default {
  name: "App",
  components: { Player, CodePenScene, DemoScene, EndpointScene },
};
</script>

<style>
#app {
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: left;
}
</style>
