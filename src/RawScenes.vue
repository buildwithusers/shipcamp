<template>
  <div id="app" class="container mx-auto my-8">
    <h1>Scenes</h1>

    <section>
      <CodePenScene />
      <DemoScene />
      <EndpointScene />
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
