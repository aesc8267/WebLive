<template>
  <div id="openRoomInfo" ref="openRoomInfoDiv">
  <img id="roomCover" :src="roomCover" />
  <div id="roomText">
    <div id="roomTitle">{{ roomTitle }}</div>
    <textarea
      id="roomSummary"
      rows="5"
      cols="33"
      readonly
      v-model="roomSummary"
    ></textarea>
    <div id="nodeInfo">
      <div id="stable">
        <el-button
          id="hostBlock"
          @click="echoNodesMap(nodesMap[9], 0, nodesMap[7], 0)"
        >
          me
        </el-button>
        <el-button id="refreshMap" @click="refreshMap(0)"
          >Refresh</el-button
        >
      </div>
      <div id="block0" ref="block0"></div>
      <div id="block1" ref="block1"></div>
    </div>
  </div>
  <el-button id="closeInfo" class="actionel-button" @click="openRoomInfo">
    Close
  </el-button>
</div>

</template>
