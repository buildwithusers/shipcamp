<template>
  <div>
    <figure id="player-container" class="bg-black">
      <video
        @click="togglePlayPause"
        v-if="sceneType === 'video'"
        ref="video"
        class=""
        @play="handlePlay"
        @ended="handleSceneEnded"
      >
        <source :src="scene.src" />
      </video>
      <div
        v-else-if="sceneType === 'component'"
        id="component-container"
        @click="pauseComponentScene"
      >
        <component :is="scene.component" />
      </div>
      <p v-else>Unsupported scene type</p>
    </figure>

    <nav id="controls" class="bg-gray-900 h-7 flex align-middle px-4">
      <PlayPauseButton :playing="playing" @click="togglePlayPause" />
    </nav>

    <hr class="my-8" />
    <h2>debug</h2>
    <p>{{ sceneNo }}</p>
    <p>{{ scene.src }}</p>
  </div>
</template>

<script>
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
    timeout: 4000,
  },
  {
    type: "video",
    src: "scenes/sample-scene-forrest.mp4",
  },
  {
    type: "video",
    src: "scenes/sample-scene-street.mp4",
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
      sceneTimer: null,
    };
  },
  computed: {
    scene() {
      return SCENES[this.sceneNo];
    },
    sceneType() {
      return SCENES[this.sceneNo].type;
    },
  },
  methods: {
    togglePlayPause(e) {
      if (!this.playing && this.sceneType === "video") {
        this.$refs.video.play();
      }

      if (this.playing && this.sceneType === "video") {
        this.$refs.video.pause();
        this.playing = false;
      }

      if (!this.playing && this.sceneType === "component") {
        this.handleSceneEnded();
      }

      if (this.playing && this.sceneType === "component") {
        this.pauseComponentScene(e);
      }
    },
    pauseComponentScene(e) {
      clearTimeout(this.sceneTimer);
      this.playing = false;
    },
    handlePlay(e) {
      this.playing = true;
    },
    handleSceneEnded(e) {
      if (this.sceneNo + 1 == SCENES.length) {
        this.playing = false;
        return;
      }

      this.loadScene(this.sceneNo + 1);
    },
    loadScene(no) {
      if (no >= SCENES.length) throw "Scene does not exist";

      this.sceneNo = no;
      clearTimeout(this.sceneTimer);

      if (this.sceneType === "video") {
        this.$nextTick(() => {
          this.$refs.video.load();
          this.$refs.video.play();
        });
        return;
      }

      if (this.sceneType === "component") {
        this.sceneTimer = setTimeout(() => {
          this.handleSceneEnded();
        }, this.scene.timeout);

        this.playing = false;
      }
    },
  },
  mounted() {
    if (this.sceneType === "video") {
      // Doesn't work in some browsers as they block autoplay before user interaction
      this.$refs.video.play();
    }
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
  display: flex;
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

#component-container {
  display: flex;
}

#component-container > * {
  width: 100%;
  height: 100%;
}
</style>
