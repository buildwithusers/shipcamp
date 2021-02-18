<template>
  <div class="w-full">
    <figure
      id="player-container"
      class="bg-black w-full rounded-b-lg relative overflow-hidden"
    >
      <video
        class="w-full"
        @click="togglePlayPause"
        v-if="sceneType === 'video'"
        ref="video"
        @play="handlePlay"
        @timeupdate="handleTimeUpdate"
        @ended="handleSceneEnded"
      >
        <source :src="scene.src" />
      </video>
      <div
        v-else-if="sceneType === 'component'"
        id="component-container"
        class="w-full"
        @click="pauseComponentScene"
      >
        <component :is="scene.component" />
      </div>
      <p v-else>Unsupported scene type</p>

      <nav
        id="controls"
        class="absolute bottom-0 w-full h-20 pt-4 flex items-center justify-between px-4 select-none"
      >
        <time class="text-sm flex-1 text-left text-gray-200">
          <span id="currentTime" class="font-bold">{{
            currentTimePretty
          }}</span>
          <span class="">&thinsp;/&thinsp;</span>
          <span id="totalTime" class="">{{ totalLengthPretty }}</span>
        </time>
        <PlayPauseButton :playing="playing" @click="togglePlayPause" />
        <span id="spacer" class="flex-1" />
      </nav>
    </figure>

    <header id="titlebar" class="my-4 text-left">
      <h1 class="">Build an Unsplash-powered weather app</h1>
      <p class="text-gray-400 text-sm font-medium">
        Created by Gino Mangnoesing • 21 views
      </p>
    </header>

    <nav id="scenes" class="flex flex-wrap -mx-2">
      <li
        class="px-2 my-2 w-1/6 list-none"
        v-for="sceneNo in totalScenes"
        :key="sceneNo"
      >
        <a class="block" @click="loadScene(sceneNo - 1, false)"
          ><img
            class="border border-gray-300 rounded hover:shadow-lg transition-all"
            :active="sceneNo - 1 === sceneIndex"
            :src="SCENES[sceneNo - 1].thumb"
        /></a>
      </li>
    </nav>
  </div>
</template>

<script>
import Vue from "vue";
import DemoScene from "./components/DemoScene";
import EndpointScene from "./components/EndpointScene";
import PlayPauseButton from "./components/PlayPauseButton.vue";

const SCENES = [
  {
    type: "video",
    src: "scenes/sample-scene-girl-book.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-01-intro-show-result.jpg",
    lengthSeconds: 8,
  },
  {
    type: "component",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-02-play-with-demo.jpg",
    component: DemoScene,
    lengthSeconds: 5,
  },
  {
    type: "video",
    src: "scenes/sample-scene-forrest.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-03-unsplash-api.jpg",
    lengthSeconds: 10,
  },
  {
    type: "component",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-04-unsplash-api-handson.jpg",
    component: EndpointScene,
    lengthSeconds: 5,
  },
  {
    type: "video",
    src: "scenes/sample-scene-street.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-05-show-result-thank.jpg",
    lengthSeconds: 15,
  },
  {
    type: "video",
    src: "scenes/sample-scene-mountain-valley.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-06-email-b.jpg",
    lengthSeconds: 27,
  },
];

const totalLengthSeconds = SCENES.filter((s) => s.type === "video")
  .map((s) => s.lengthSeconds)
  .reduce((a, b) => a + b, 0);

function prettySeconds(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${("0" + secs).slice(-2)}`;
}

export default Vue.extend({
  components: {
    PlayPauseButton,
  },
  data() {
    return {
      sceneIndex: 0,
      totalScenes: SCENES.length,
      playing: false,
      sceneTimer: null,
      totalLengthSeconds,
      totalLengthPretty: prettySeconds(totalLengthSeconds),
      currentTimeSeconds: 0,
      SCENES,
    };
  },
  computed: {
    scene() {
      return SCENES[this.sceneIndex];
    },
    sceneType() {
      return SCENES[this.sceneIndex].type;
    },
    currentTimePretty() {
      return prettySeconds(this.currentTimeSeconds);
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
    handleTimeUpdate(e) {
      const seconds = Math.round(e.target.currentTime);
      // This is needed because sometimes timeupdate event fires after scene switch
      if (this.scene.type !== "video") return;
      this.updateCurrentTime(seconds);
    },
    updateCurrentTime(currentSceneTimeElapsed = 0) {
      const elapsedTimePreviousScenes = SCENES.slice(0, this.sceneIndex)
        .filter((s) => s.type === "video")
        .map((s) => s.lengthSeconds)
        .reduce((a, b) => a + b, 0);
      this.currentTimeSeconds =
        elapsedTimePreviousScenes + currentSceneTimeElapsed;
    },
    handleSceneEnded(e) {
      if (this.sceneIndex + 1 == SCENES.length) {
        this.playing = false;
        return;
      }

      this.loadScene(this.sceneIndex + 1);
    },
    loadScene(index, withTimer = true) {
      if (index >= SCENES.length) throw "Scene does not exist";

      this.sceneIndex = index;
      clearTimeout(this.sceneTimer);

      if (this.sceneType === "video") {
        this.$nextTick(() => {
          this.$refs.video.load();
          this.$refs.video.play();
        });
        return;
      }

      if (this.sceneType === "component" && withTimer) {
        this.sceneTimer = setTimeout(() => {
          this.handleSceneEnded();
        }, this.scene.lengthSeconds * 1000);
      }

      this.playing = false;
      this.updateCurrentTime();
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

#player-container > video,
#player-container > #component-container {
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

nav#controls {
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.2),
    rgba(0, 0, 0, 0.55),
    rgba(0, 0, 0, 0.75)
  );
}

nav#scenes img[active] {
  @apply border-blue-500 border-4 shadow-lg;
  padding: 2px;
}
</style>
