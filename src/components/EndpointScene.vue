<template>
  <Scene class="scene">
    <header>
      <b>Unsplash API endpoint:</b>
      <span>https://api.unsplash.com/search/photos?</span>
      <span class="blue">query=</span>
      <input
        class="blue editable"
        type="text"
        placeholder="sunny"
        v-model="keyword"
        @blur="query"
        @keyup.enter="query"
      />
      <span class="blue">&orientation=</span>
      <span class="editable">
        <select name="orientationPicker" @change="query" v-model="orientation">
          <option
            v-for="option in orientationOptions"
            :value="option"
            :key="option"
          >
            {{ option }}
          </option>
        </select>
      </span>
    </header>
    <main>
      <div v-if="showTooltip" class="tooltip">
        <div class="pointer"></div>
        <p>Use this 👆 bar to play around with the API endpoint yourself.</p>
        <a @click="showTooltip = false">Got it!</a>
      </div>
      <p v-if="loading" style="color: white">loading...</p>
      <img v-else style="max-height: 400px" :src="imageSrc" />
    </main>
  </Scene>
</template>

<script>
import Scene from "./Scene";
import { ChevronDownIcon } from "vue-feather-icons";
import axios from "axios";

export default {
  components: { Scene, ChevronDownIcon },
  data() {
    return {
      selected: "",
      keyword: "smile",
      orientation: "landscape",
      orientationOptions: ["landscape", "portrait", "squarish"],
      imageSrc:
        "https://images.unsplash.com/photo-1555170629-9240c8e7df1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwyMDU4MTh8MHwxfHNlYXJjaHw3fHxzbWlsZXxlbnwwfDB8fA&ixlib=rb-1.2.1&q=80&w=1080",
      loading: false,
      showTooltip: false,
    };
  },
  methods: {
    async query() {
      if (!this.loading) {
        this.loading = true;
        const URI_BASE = "https://untitled-ihuuousf3gce.runkit.sh/";
        const QUERY = `?query=${this.keyword}&orientation=${this.orientation}`;
        const URI = URI_BASE + QUERY;
        const { data } = await axios.get(URI);
        const { results } = data;
        const randomIndex = Math.floor(Math.random() * results.length);
        this.imageSrc = results[randomIndex].urls.regular;
        this.loading = false;
      }
    },
  },
  mounted() {
    setTimeout(() => { this.showTooltip = true; }, 500);
    setTimeout(() => { this.showTooltip = false; }, 4000);
  }
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
    height: 4px;
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
.scene {
  display: flex;
  flex-direction: column;
}
header {
  width: 100%;
  background: white;
  padding: 1em 0.5em;
  text-align: left;
}
header > b {
  color: #140c1c;
  margin-right: 1em;
}
header > span,
header > input {
  font-size: 12pt;
  color: #7e7e7e;
  max-width: 3.1em;
}
header > span.blue,
header > input {
  color: #2d6ae1;
}
.editable {
  margin: 0 1px;
  background-color: #f8f8ff;
  padding: 0.1em 0.2em;
  border-radius: 3px;
  border: 1px solid #2d6ae1;
  user-select: none;
}
.editable > select {
  border: 0px;
  outline: 0px;
  background-color: transparent;
  color: #2d6ae1;
}
main {
  height: auto;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  position: relative;
}
.tooltip {
  position: absolute;
  left: 36%;
  top: 5px;
  border-radius: 3px;
  color: black;
  background: white;
  padding: 0.5em 1em 1em 1em;
  width: 255px;
  text-align: center;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(0, 20, 93, 0.07);
  font-size: 12pt;
}
.tooltip > a {
  color: #2d6ae1;
  margin-top: 1em;
  font-weight: 500;
}
.pointer {
  width: 10px;
  height: 10px;
  background: white;
  transform: rotate(45deg);
  position: relative;
  margin: 0 auto;
  top: -13px;
}
</style>
