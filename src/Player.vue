<template>
  <div>
    <figure id="player-container" class="bg-black" @click="togglePlay">
      <video
        v-if="currentType === 'video'"
        ref="vid"
        class=""
        @play="handlePlay"
        @pause="handlePause"
        @ended="handleEnded"
      >
        <source :src="currentSrc" />
      </video>
      <component v-else :is="currentComponent" />
    </figure>

    <nav id="controls" class="bg-gray-900 h-7 flex align-middle px-4">
      <PlayPauseButton :playing="playing" @click="togglePlay" />
    </nav>

    <hr />
    <h2>debug</h2>
    <p>{{ currentScene }}</p>
    <p>{{ currentSrc }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import DemoScene from "./components/DemoScene";
import PlayPauseButton from "./components/PlayPauseButton.vue";

const SCENES = [
  {
    type: "video",
    src: "scenes/sample-scene-girl-book.mp4",
  },
  {
    type: "component",
    component: DemoScene,
  },
  {
    type: "video",
    src: "scenes/sample-scene-street.mp4",
  },
  {
    type: "video",
    src: "scenes/sample-scene-forrest.mp4",
  },
  {
    type: "video",
    src: "scenes/sample-scene-mountain-valley.mp4",
  },
];

export default Vue.extend({
  components: {
    PlayPauseButton,
  },
  data() {
    return {
      $video: null,
      currentScene: 0,
      playing: false,
    };
  },
  computed: {
    currentSrc() {
      return SCENES[this.currentScene].src || null;
    },
    currentType() {
      return SCENES[this.currentScene].type;
    },
    currentComponent() {
      return SCENES[this.currentScene].component || null;
    },
  },
  methods: {
    togglePlay() {
      if (this.playing) {
        this.$refs.vid.pause();
        return;
      }
      this.$refs.vid.play();
    },
    handlePlay(e) {
      this.playing = true;
    },
    handlePause(e) {
      this.playing = false;
    },
    handleEnded(e) {
      if (this.currentScene + 1 == SCENES.length) {
        this.playing = false;
        return;
      }

      this.currentScene = this.currentScene + 1;
      const scene = SCENES[this.currentScene];

      if (scene.type === "video") {
        this.$nextTick(() => {
          this.$refs.vid.load();
          this.$refs.vid.play();
        });
        return;
      }

      if (scene.type === "component") {
        setTimeout(() => {
          this.handleEnded();
        }, 4000);
      }
    },
  },
  mounted() {
    this.$refs.vid.play();
  },
});
</script>

<style>
::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls {
  display: none !important;
}
video::-webkit-media-controls-enclosure {
  display: none !important;
}

video:focus {
  outline: none;
}

#player-container {
  width: 100%;
  padding-top: 62.5%;
  position: relative;
}

#player-container > * {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
}
</style>
