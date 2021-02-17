<template>
  <div>
    <figure id="player-container" class="bg-black" @click="togglePlay">
      <video
        ref="vid"
        class=""
        @play="handlePlay"
        @pause="handlePause"
        @ended="handleEnded"
      >
        <source :src="currentSrc" />
      </video>
    </figure>
    <div id="controls" class="bg-gray-900 h-7 flex align-middle px-4">
      <button id="play-pause" @click="togglePlay">
        <svg
          v-if="!playing"
          class="text-gray-100 w-5 h-5 hover:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
            clip-rule="evenodd"
          />
        </svg>

        <svg
          v-else
          class="text-gray-100 w-5 h-5 hover:text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <hr />
    <h2>debug</h2>
    <p>{{ currentScene }}</p>
    <p>{{ currentSrc }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

const SCENES = [
  {
    type: "video",
    src: "scenes/sample-scene-girl-book.mp4",
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
  data() {
    return {
      $video: null,
      currentScene: 0,
      playing: false,
    };
  },
  computed: {
    currentSrc() {
      return SCENES[this.currentScene].src;
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
      if (this.currentScene + 1 < SCENES.length) {
        this.currentScene = this.currentScene + 1;
        this.$nextTick(() => {
          this.$refs.vid.load();
          this.$refs.vid.play();
        });
        return;
      }

      this.playing = false;
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

#player-container video {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
}
</style>
