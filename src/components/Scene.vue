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
    background-color: #2E3541;
    color: white;
    display: flex;
    align-items: center;
    justify-self: center;
  }
</style>