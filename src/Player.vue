<template>
  <div>
    <figure id="player-container" class="bg-black" @click="togglePlay">
      <video
        v-if="sceneType === 'video'"
        ref="video"
        class=""
        @play="handlePlay"
        @pause="handlePause"
        @ended="handleEnded"
      >
        <source :src="scene.src" />
      </video>
      <component v-else-if="sceneType === 'component'" :is="currentComponent" />
      <p v-else>Unsupported scene type</p>
    </figure>

    <nav id="controls" class="bg-gray-900 h-7 flex align-middle px-4">
      <PlayPauseButton :playing="playing" @click="togglePlay" />
    </nav>

    <hr class="my-8" />
    <h2>debug</h2>
    <p>{{ sceneNo }}</p>
    <p>{{ scene.src }}</p>
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
      sceneNo: 0,
      playing: false,
    };
  },
  computed: {
    scene() {
      return SCENES[this.sceneNo];
    },
    sceneType() {
      return SCENES[this.sceneNo].type;
    },
    currentComponent() {
      return SCENES[this.sceneNo].component || null;
    },
  },
  methods: {
    togglePlay() {
      if (this.playing) {
        this.$refs.video.pause();
        return;
      }
      this.$refs.video.play();
    },
    handlePlay(e) {
      this.playing = true;
    },
    handlePause(e) {
      this.playing = false;
    },
    handleEnded(e) {
      if (this.sceneNo + 1 == SCENES.length) {
        this.playing = false;
        return;
      }

      this.sceneNo = this.sceneNo + 1;
      const scene = SCENES[this.sceneNo];

      if (scene.type === "video") {
        this.$nextTick(() => {
          this.$refs.video.load();
          this.$refs.video.play();
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
    this.$refs.video.play();
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
