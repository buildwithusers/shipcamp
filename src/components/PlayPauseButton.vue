<template>
  <button id="play-pause" @click="$emit('click', $event)">
    <PlayCircleIcon
      v-if="!playing"
      class="text-gray-200 w-7 h-7 hover:text-white"
    />

    <PauseCircleIcon v-else class="text-gray-200 w-7 h-7 hover:text-white" />
  </button>
</template>

<script>
import { PlayCircleIcon } from "vue-feather-icons";
import { PauseCircleIcon } from "vue-feather-icons";
export default {
  components: { PlayCircleIcon, PauseCircleIcon },
  props: {
    playing: {
      type: Boolean,
    },
  },
};
</script>

<style>
</style>
