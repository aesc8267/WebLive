<template>
  <div id="streamSource" ref="streamSource">
  <div class="box" id="onlyPC" ref="onlyPC" style="margin-top: 10px">
    <div style="font-weight: bold">
      Share PC Desktop:<br />
      <el-button id="browserDisplayMedia" @click="useDisplayMedia()">
        Use Display Stream
      </el-button>
    </div>
  </div>
  <div class="box" style="margin-top: 10px">
    <div style="font-weight: bold">
      Share Local Devices:
      <el-button
        id="browserNavigatorMediaDevices"
        @click="askNavigatorMediaDevices()"
      >
        Upload Local Device</el-button
      ><br />
      <input type="checkbox" ref="ifUseCamera" />Camera
      <input type="checkbox" ref="ifUseMicrophone" />Microphone
    </div>
  </div>
  <div class="box" style="margin-top: 10px">
    <div style="font-weight: bold">
      Input SRS Media Stream url like "url/key"(rtmp -> srs -> webrtc)<br />
      <input
        id="streamUrlSRS"
        ref="streamUrlSRS"
        type="text"
        placeholder="input the url of srs media Stream here..."
      />
      <el-button
        id="uploadStreamSRS"
        @click="shareSRSMediaStream(streamUrlSRS!.value)"
      >
        share SRS Media Stream
      </el-button>
    </div>
    <div style="font-weight: bold">
      Lend Media Stream From Others
      <input
        id="lendAimId"
        ref="lendAimId"
        type="text"
        placeholder="input ID OF AIM here..."
      />
      <el-button
        id="lendStream"
        @click="tryConnect(1, lendAimId!.value, false, true)"
      >
        lend aim stream( need be accepted )
      </el-button>
    </div>
  </div>
  <div class="box" style="margin-top: 10px">
    <div style="font-weight: bold">
      <input
        type="checkbox"
        id="ifNotDisplayLocalStream"
        ref="ifNotDisplayLocalStream"
      />If not Display the localStream
      <br />
      —— enable for saving performance of devices
    </div>
  </div>

  <el-button
    ref="streamSourceMenuClose"
    class="actionel-button"
    @click="streamSourceMenu"
  >
    Close
  </el-button>
</div>

</template>
