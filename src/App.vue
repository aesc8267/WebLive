
<template>
  <div class="app">
    <LiveHead></LiveHead>
    <LiveRoom></LiveRoom>
    <LiveFooter></LiveFooter>
    <LiveAbout></LiveAbout>
  </div>
</template>
<script setup lang="ts">
import LiveHead from './components/LiveHead.vue';
import LiveRoom from './components/LiveRoom.vue';
import LiveFooter from './components/LiveFooter.vue';
import LiveAbout from './components/LiveAbout.vue';
  // import { RouterView } from 'vue-router';
</script>
<style lang="scss" scoped>
.app{
  display: flex;
  justify-content:space-around;
  flex-direction: column;
  padding-bottom: 33.25rem;
  background-color: #fff8f9;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
}
</style>
