<template>
  <div class="self">
    <slot></slot>
  </div>
</template>
<script>
import Vue from "vue";

export default Vue.component("Scene", {});
</script>
<style scoped>
.self {
  width: 896px;
  height: 560px;
  display: flex;
  overflow: hidden;
  background-color: #2e3541;
  user-select: none;
}
</style>
