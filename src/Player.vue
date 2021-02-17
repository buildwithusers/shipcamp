<template>
  <div>
    <figure id="player-container" class="bg-black" @click="handleClick">
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
    handleClick(e) {
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
