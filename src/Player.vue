<template>
  <figure>
    <video src="scenes/sample-scene-forrest.mp4"></video>
  </figure>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      txt: "Here comes the player",
      $video: null,
    };
  },
  mounted() {
    this.$video = this.$el.getElementsByTagName("video")[0];
    this.$video.play();
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
