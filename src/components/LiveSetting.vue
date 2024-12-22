<template>
  <div id="liveSetting" ref="liveSetting">
  <img id="LiveCover" />
  <div style="height: 100%; width: 30%; margin-top: 2%">
    <input
      type="text"
      id="LiveTitle"
      class="liveInput"
      placeholder="Input your Room Title there..."
    /><br />
    <textarea
      v-model="LiveSummary"
      rows="5"
      cols="33"
      placeholder="Input your Summary there..."
    ></textarea
    ><br />
  </div>
  <div style="height: 100%; width: 30%; margin-top: 2%">
    <input
      type="text"
      id="LiveCoverURL"
      class="liveInput"
      v-model="LiveCoverURL"
      placeholder="URL of img served as Cover"
    /><br />
    <input
      id="LiveCoverInput"
      type="file"
      onchange="liveCoverInput()"
    />Upload Local Image<br /><br />
    <el-button @click="peer.disconnect()">
      Lock the room<br />(disconnect to PeerServer)
    </el-button>
    <el-button @click="peer.reconnect()"
      >reconnect with original Id</el-button
    >
  </div>
  <div>
    <el-button
      id="closeLiveMenu"
      class="actionel-button"
      @click="showLive()"
    >
      Close
    </el-button>
    <el-button id="modify" class="actionel-button" @click="modify()">
      modify
    </el-button>
  </div>
</div>

</template>
