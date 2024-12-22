<template>
  <div class="live-footer">
    <!-- <div id="rooms" ref="roomsDiv" v-if="rooms.length">
    <div v-for="(room, index) in filteredRooms" :key="index"
      :style="{ backgroundImage: 'url($room[6])', backgroundSize: 'contain' }" @click="displayRoomInfo(index)"
      ref="roomFor">
      <span>{{ room[4] }}</span>
      <span class="members-count" style="position: absolute; bottom: 0"></span>
      Members: {{ room[2].length }}
    </div>
  </div> -->

  <div class="test">

  </div>
  </div>
</template>

<script setup lang="ts">
import { apiRoomsHotList } from '@/api/room-controller';
apiRoomsHotList().then(res => {
  console.log(res);
})
</script>

<style lang="scss" scoped>
</style>
