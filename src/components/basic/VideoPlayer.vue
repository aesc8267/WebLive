<template>
  <div class="video-player">
    <div class="video-player-head">
      <div class="video-player-head-avator">
        <img src="/src/assets/images/live/152avator.avif" alt="头像" />
      </div>
      <div class="video-player-head-title">
        <h2>{{ roomName }}</h2>
        <h3>{{ roomAbout }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const roomName = ref("瓶子君152");
const roomAbout = ref("周二读书会");
</script>

<style lang="scss" scoped>
.video-player {
  background-color: #fff8f9;
  border-radius: 2.5rem;
  height: 42.19rem;
  border: solid 0.063rem #d3c2ca;
  flex: 2;
  overflow: hidden;
}
.video-player-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  border: solid 0.063rem #d3c2ca;
  height: 6rem;
  &-avator {
    height: 100%;
    margin-right: 1rem;
    padding: 1rem 0;
    img {
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &-title {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1rem;
    h3 {
      margin-top: 0;
      font-size: medium;
      color: rgb(255, 212, 35);
    }
  }
}
</style>
