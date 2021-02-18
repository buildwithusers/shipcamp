<template>
  <Scene class="scene">
    <div class="progress-bar-outer">
      <div class="progress-bar-inner" style="width: 30%"></div>
    </div>
    <header>
      <b>Unsplash API endpoint:</b>
      <span>https://api.unsplash.com/search/photos?</span>
      <span class="blue">query=</span>
      <input class="blue editable" type="text" placeholder="sunny" v-model="keyword" @blur="query" @keyup.enter="query">
      <span class="blue">&orientation=</span>
      <span class="editable">
        <select name="orientationPicker" @change="query" v-model="orientation">
          <option v-for="option in orientationOptions" :value="option" :key="option">{{option}}</option>
        </select>
      </span>
    </header>
    <main>
      <p v-if="loading" style="color: white;">loading...</p>
      <img v-else style="max-height: 400px;" :src="imageSrc">
    </main>
  </Scene>
</template>

<script>
import Scene from './Scene';
import { ChevronDownIcon } from 'vue-feather-icons';
import axios from 'axios';

export default {
  components: { Scene, ChevronDownIcon },
  data() {
    return {
      selected: '',
      keyword: 'smile',
      orientation: 'landscape',
      orientationOptions: ['landscape','portrait','squarish'],
      imageSrc: 'https://images.unsplash.com/photo-1555170629-9240c8e7df1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDU4MTh8MHwxfHNlYXJjaHw3fHxzbWlsZXxlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=1080',
      loading: false,
    };
  },
  methods: {
    async query() {
      if (!this.loading) {
        this.loading = true;
        const URI_BASE = 'https://untitled-ihuuousf3gce.runkit.sh/';
        const QUERY = `?query=${this.keyword}&orientation=${this.orientation}`;
        const URI = URI_BASE + QUERY;
        const res = await axios.get(URI);
        const randomIndex = Math.floor(Math.random() * 10);
        this.imageSrc = res.data.results[randomIndex].urls.regular;
        this.loading = false;
      }
    }
  },
};
</script>
<style scoped>
  .scene { 
    display: flex;
    flex-direction: column;
  }
  .progress-bar-outer {
    background-color: white;
  }
  .progress-bar-inner {
    height: 2px;
    background-color: #74A3FF;
  }
  header {
    width: 100%;
    background: white;
    padding: 1em 0.5em;
    text-align: left;
  }
  header > b {
    color: #140C1C;
    margin-right: 1em;
  }
  header > span, header > input {
    font-size: 12pt;
    color: #7E7E7E;
    max-width: 3.1em;
  }
  header > span.blue, header > input {
    color: #2D6AE1;
  }
  .editable {
    margin: 0 1px;
    background-color: #F8F8FF;
    padding: 0.1em 0.2em;
    border-radius: 3px;
    border: 1px solid #2D6AE1;
    user-select: none;
  }
  .editable > select {
    border:0px;
    outline:0px;
    background-color: transparent;
    color: #2D6AE1;
  }
  main {
    height: auto;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1em;
  }
</style>
