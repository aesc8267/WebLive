/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ref } from "vue";
/*@ts-expect-error*/
import SrsRtcPlayerAsync from "@/utils/srs.sdk.js";
  const localStream = ref<MediaStream|null>(null);
  function useDisplayMedia() {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        // After successfully obtaining the local stream, display it on the page.
        localStream.value = stream;
        // displayStream(localStream.value)
        console.log("Local stream shared");
      })
      .catch((error) => {
        console.error("Error getting local stream:", error);
      });
  }

  function askNavigatorMediaDevices(ifUseCamera:boolean,ifUseMicrophone:boolean) {
    const constraints = {
      audio: ifUseCamera,
      video:ifUseMicrophone
    };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(function (stream) {
        localStream.value = stream;
        // displayStream(localStream.value)
        console.log("Local stream shared");
      })
      .catch(function (err) {
        console.error("Error getting local stream:", err);
      });
  }

  function shareSRSMediaStream(url: string) {
    url = "webrtc://" + url;
    const rtcPlayer = new SrsRtcPlayerAsync();
    rtcPlayer.play(url);
    localStream.value = rtcPlayer.stream;
    // displayStream(localStream.value)
  }
  export {localStream,useDisplayMedia,askNavigatorMediaDevices,shareSRSMediaStream}
