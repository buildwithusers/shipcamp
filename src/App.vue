<template>
  <div id="app" class="container mx-auto my-8">
    <h1>Build a weather app using Tailwind &amp; Vue.js</h1>
    <header class="flex space-x-2">
      <figure
        class="preview border-2 border-gray-100 rounded-md w-2/3 flex items-center justify-center h-48"
      >
        Preview comes here
      </figure>
      <aside
        class="border-2 border-gray-100 rounded-md w-1/3 px-4 py-4 flex items-center"
      >
        <img
          src="https://pbs.twimg.com/profile_images/1309864829931450378/-hM7wXiI_400x400.jpg"
          alt=""
          class="rounded-full w-12 mr-2"
        />
        <h3 class="font-bold">Dude die het maakt</h3>
      </aside>
    </header>

    <header class="summary my-4 gap-2 grid grid-cols-3 text-left">
      <div class="card bg-blue-100 rounded-md p-4">
        <h3 class="font-bold mb-1">Summary</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur,
          corporis enim asperiores laudantium explicabo dolore veritatis debitis
          ipsum odio saepe!
        </p>
      </div>
      <div class="card bg-blue-100 rounded-md p-4">
        <h3 class="font-bold mb-1">What you'll learn</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione,
          aliquam!
        </p>
      </div>
      <div class="card bg-blue-100 rounded-md p-4">
        <h3 class="font-bold mb-1">What we use</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
          consequuntur recusandae atque.
        </p>
      </div>
    </header>

    <hr class="my-8" />

    <CodePen />
  </div>
</template>

<script>
import CodePen from "./components/CodePenExample.vue";

export default {
  name: "App",
  components: {
    CodePen,
  },
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
