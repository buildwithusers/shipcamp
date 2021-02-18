<template>
  <div id="app" class="container mx-auto my-8">
    <h1>Build an Unsplash-powered weather app</h1>

    <section class="flex space-x-4">
      <Player class="preview border-2 border-gray-100 w-full rounded-md" />
    </section>
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
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
