<template>
  <div class="self">
    <slot></slot>
  </div>
</template>
<script>
import Vue from 'vue';

export default Vue.component('Scene', {});
</script>
<style scoped>
  .self {
    width: 896px;
    height: 560px;
    overflow: hidden;
    background-color: #2E3541;
    color: white;
    user-select: none;
  }
</style>