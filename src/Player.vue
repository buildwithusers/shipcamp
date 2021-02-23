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
        <component :is="scene.component" @interact="pauseComponentScene" />
        <div
          v-if="sceneTimer && !scene.hideTimer"
          class="scene-timer-bar w-full bg-white absolute top-0 border-t border-b border-white"
          :style="{ '--scenetimer-duration': scene.lengthSeconds }"
        >
          <div class="scene-timer-bar-inner" />
        </div>
      </div>
      <p v-else>Unsupported scene type</p>

      <nav
        id="controls"
        class="absolute bottom-0 w-full h-20 pt-4 flex items-center justify-between px-4 rounded-b-lg select-none"
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

        <div
          ref="scrubbar"
          id="scrub-bar"
          class="absolute bottom-0 left-0 right-0 overflow-hidden h-2 transform hover:scale-y-150 text-xs flex bg-gray-100 bg-opacity-20 transition-all cursor-pointer"
          @mousedown="handleScrubBarClick"
        >
          <div
            :style="{ width: elapsedTimePercentage + '%' }"
            class="w-0 bg-blue-500 bg-opacity-50"
          ></div>
        </div>
      </nav>
    </figure>

    <header id="titlebar" class="my-4 text-left">
      <h1 class="">Build an Unsplash-powered weather app</h1>
      <p class="text-gray-400 text-sm font-medium">
        Created by Gino Mangnoesing • 21 views
      </p>
    </header>

    <nav ref="scenes" id="scenes" class="flex -mx-2 overflow-x-auto relative">
      <li
        class="px-2 my-2 list-none w-1/5 overflow-hidden flex-none"
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
      <div
        id="scenes-overflow-indicator"
        class="flex-none w-10 sticky right-0 top-0 bottom-0 pointer-events-none"
      />
    </nav>
  </div>
</template>

<script>
import Vue from "vue";
import DemoScene from "./components/DemoScene";
import EndpointScene from "./components/EndpointScene";
import SignupScene from "./components/SignupScene";
import PlayPauseButton from "./components/PlayPauseButton.vue";

const SCENES = [
  {
    type: "video",
    src: "https://stackedtv-assets.s3.amazonaws.com/scenes/1-demo-scene.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-01-intro-show-result.jpg",
    lengthSeconds: 22,
  },
  {
    type: "component",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-02-play-with-demo.jpg",
    component: DemoScene,
    lengthSeconds: 9,
  },
  {
    type: "video",
    src:
      "https://stackedtv-assets.s3.amazonaws.com/scenes/2-openweathermap-scene.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-03-unsplash-api.jpg",
    lengthSeconds: 136,
  },
  {
    type: "video",
    src:
      "https://stackedtv-assets.s3.amazonaws.com/scenes/3-unsplash-intro-scene.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-04-unsplash-api-handson.jpg",
    lengthSeconds: 105,
  },
  {
    type: "component",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-04-unsplash-api-handson.jpg",
    component: EndpointScene,
    lengthSeconds: 15,
  },
  {
    type: "video",
    src: "https://stackedtv-assets.s3.amazonaws.com/scenes/4-wrap-up-scene.mp4",
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-05-show-result-thank.jpg",
    lengthSeconds: 96,
  },
  {
    type: "component",
    component: SignupScene,
    thumb:
      "https://stackedtv-assets.s3.amazonaws.com/thumbs/thumb-slide-06-email-b.jpg",
    lengthSeconds: Infinity,
    hideTimer: true,
  },
];

const totalLengthSeconds = SCENES.filter((s) => s.lengthSeconds !== Infinity)
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
    elapsedTimePercentage() {
      return (this.currentTimeSeconds / this.totalLengthSeconds) * 100;
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
      clearInterval(this.sceneTimer);
      this.sceneTimer = null;
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
        .filter((s) => s.lengthSeconds !== Infinity)
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
    handleScrubBarClick(e) {
      const progressPercentage = e.layerX / this.$refs.scrubbar.offsetWidth;
      const elapsedTimeSeconds = Math.round(
        progressPercentage * this.totalLengthSeconds
      );
      const {
        sceneIndex,
        elapsedSceneTime,
      } = this.getSceneWithElapsedSceneTime(elapsedTimeSeconds);
      this.loadScene(sceneIndex, false, elapsedSceneTime);
    },
    getSceneWithElapsedSceneTime(elapsedTimeSeconds) {
      let elapsedSceneTime = elapsedTimeSeconds;

      for (let i = 0; i < SCENES.length; i++) {
        if (elapsedSceneTime < SCENES[i].lengthSeconds) {
          return { sceneIndex: i, elapsedSceneTime: elapsedSceneTime };
        }

        elapsedSceneTime -= SCENES[i].lengthSeconds;
      }

      throw "Scene does not exist";
    },
    loadScene(index, withTimer = true, elapsedSceneTime = 0) {
      if (index >= SCENES.length) throw "Scene does not exist";

      if (this.sceneIndex === index && this.sceneType === "video") {
        this.$refs.video.currentTime = elapsedSceneTime;
        this.updateCurrentTime(elapsedSceneTime);
        return;
      }

      this.sceneIndex = index;
      clearInterval(this.sceneTimer);
      this.sceneTimer = null;
      this.$refs.scenes.children[index].scrollIntoView({ behavior: "smooth" });

      if (this.sceneType === "video") {
        this.$nextTick(() => {
          this.$refs.video.load();
          this.$refs.video.currentTime = elapsedSceneTime;
          this.$refs.video.play();
        });
        return;
      }

      if (
        this.sceneType === "component" &&
        withTimer &&
        this.scene.lengthSeconds !== Infinity
      ) {
        let ticks = 0;

        this.sceneTimer = setInterval(() => {
          this.updateCurrentTime(++ticks);

          if (ticks === this.scene.lengthSeconds) {
            this.handleSceneEnded();
          }
        }, 1000);
      }

      this.playing = withTimer;
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

@keyframes scenetimer {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

#component-container > .scene-timer-bar {
  height: 5px;
}

.scene-timer-bar-inner {
  height: 3px;
  width: 0%;
  background-color: #74a3ff;
  animation: scenetimer calc(var(--scenetimer-duration) * 1s) linear;
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

#scenes-overflow-indicator {
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(249, 250, 251, 1)
  );
}

#scrub-bar {
  transition: background 230ms ease, transform 150ms ease-in-out;
}

#scrub-bar > * {
  transition: width 180ms ease-out, background 220ms ease;
}

#scrub-bar:hover > * {
  --tw-bg-opacity: 1;
}
</style>
