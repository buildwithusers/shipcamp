<template>
  <div id="app" class="container mx-auto my-8">
    <h1>Build a Unsplash-powered weather app</h1>
    <header class="flex space-x-2">
      <Player
        class="preview border-2 border-gray-100 w-full h-screen rounded-md"
      />
    </header>
    <br>
    <Scene><p>Interactive things.</p></Scene>
  </div>
</template>

<script>
import Player from "./Player.vue";
import Scene from './components/Scene';

export default {
  name: "App",
  components: { Player, Scene},
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
