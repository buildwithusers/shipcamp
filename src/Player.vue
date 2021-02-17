<template>
  <figure>
    <video ref="vid" :src="currentSrc" @ended="handleEnded"></video>

    {{ currentScene }}
    {{ currentSrc }}
  </figure>
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
    };
  },
  computed: {
    currentSrc() {
      return SCENES[this.currentScene].src;
    },
  },
  methods: {
    handleEnded(e) {
      if (this.currentScene + 1 < SCENES.length) {
        this.currentScene = this.currentScene + 1;
        this.$nextTick(() => {
          this.$refs.vid.play();
        });
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
</style>
