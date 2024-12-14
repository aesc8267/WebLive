<template>
  <div class="video-player">
    <div class="live-mask">
      <slot name="join"></slot>
  </div>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.video-player {
  background-color: #fff8f9;
  border-radius: 2.5rem;
  border: solid 0.063rem #d3c2ca;
  flex: 2;
  overflow: hidden;
  // mask-image: url('/public/images/AtriYES.png');
}
.live-mask{
  height: 100%;
  width: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
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
.img{
  height: 10%;
  z-index: 99;
  background-image: url('/public/images/AtriYES.png');
}
</style>
