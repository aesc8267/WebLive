<script lang="ts" setup>
/* eslint-disable */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/*@ts-expect-error*/
import SrsRtcPlayerAsync from "@/utils/srs.sdk.js";
import EmojiPicker, { type EmojiExt } from "vue3-emoji-picker";
import "vue3-emoji-picker/css";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Peer, DataConnection, MediaConnection } from "peerjs";
import { apiRoomsInsert, apiSetSatus } from "@/api/room-controller";
import { useRoute } from "vue-router";
import { getRid } from "@/api/user-controller";
import { useDialogStore } from "@/stores/dialog";
const dialog=useDialogStore()
let liveSettingDrawer = ref(false);
let roomInfoDrawer = ref(false);
let streamSourceDrawer = ref(false);
const route = useRoute();
const peer = new Peer({ debug: 2 });
let conn: DataConnection;
let mediaOpen: MediaConnection | null = null;
let openLiveTimes = 0;
let parent: DataConnection | null = null;
let ifAutoScroll = ref<boolean>(true);
let localStream: MediaStream | null;
let remoteStream: MediaStream | null = null;
let audiences = new Array();
let audienceIds = new Array();
let conns = new Array();
let connIds = new Array();
let nodesMap = new Array(); // init later
let childNodes = new Array();
let roomIds = new Array();
let deliverId: null = null;
let root: DataConnection | null = null;
const WebVideo = ref<HTMLVideoElement>();
let params = new URLSearchParams(document.location.search.substring(1));
let liveCoverBase64: null = null;
let msgImgBase64: null = null;
let guest: DataConnection | null = null;
let guests = new Array();
let ifConnectedAim: boolean = false;
let bridge: DataConnection | null = null;
let fullWebVideoTimes = 0;
let myIcon = "";
let temporaryChosedNodes = new Array();
const MyName = ref<string>("hello world");
const streamSource = ref<HTMLDivElement>();
const chatBox = ref<HTMLElement>();
const sendMessageBox = ref<string>("");
const liveSetting = ref<HTMLDivElement>();
const openRoomInfoDiv = ref<HTMLElement>();
const peerId = ref<HTMLInputElement>();
const sumOfRoom = ref<number>(1);
const onlyPC = ref<HTMLDivElement>();
const streamUrlSRS = ref<string>("");
const lendAimId = ref<HTMLInputElement>();
const roomTitle = ref<string>();
const roomSummary = ref<string>();
const roomCover = ref<string>();
const streamSourceMenuClose = ref<HTMLButtonElement>();
const ifNotDisplayLocalStream = ref<HTMLInputElement>();
const ifUseCamera = ref<boolean>(false);
const ifUseMicrophone = ref<boolean>(false);
const connectRoot = ref<HTMLDivElement>();
const msgImgInput = ref<HTMLInputElement>();
const ifAutoClean = ref<HTMLInputElement>();
const LiveCoverURL = ref<string>(route.query.coverURL as string);
let coverURL = "";
const roomName = ref<string>(route.query.roomTitle as string);
const roomAbout = ref<string>(route.query.roomSummary as string);
const avatar = ref(localStorage.getItem("avatar")!);
const isLogIn = localStorage.getItem("isLogin") === "true";
let rid = ref();
onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
  window.addEventListener("unload", handleUnload);

  // Listen for the event when a Peer connection is successfully opened
  // *Explanation: The provided code snippet is using the Peer.js library to establish a Peer connection. The peer.on('open', ...) code block is listening for the 'open' event, which is triggered when the Peer connection is successfully opened.
  if (!isLogIn) {
    ElMessage.error("Please login first");
    window.location.href = "/";
  }
  // 这里有问题，这段代码写的太垃圾了，通过livetitle 的值是否位null 判断是否是refash还是url 新建，ex！
  peer.on("open", (id) => {
    nodesMap = [
      1,
      1,
      [id],
      0,
      roomName.value,
      roomAbout.value,
      LiveCoverURL.value,
      id,
      getMyName(),
      childNodes,
      avatar.value,
    ];
    //childNodes=[0.dataType, 1.sourceMark, 2.NumberOfchildNodes, 3.unused for you ]
    childNodes = [1, 1, 0, [], id, getMyName(), []];
    //nodesMap=[0.dataType, 1.sourceMark, 2.idsOfMembersInRoom, 3.roomType]
    console.log(id);
    ElMessage.success("Your ID:" + id);
    ElMessage.warning("Status: Connecting to Root Node...");
    let roomParams = {
      // category_id:number;
      identifier: id,
      title: roomName.value,
      // sell_point: string;
      // price: number;
      // num: number;
      image: LiveCoverURL.value,
    };
    console.log("roomParams", roomParams);
    apiRoomsInsert(roomParams).then((res) => {
      rid.value = res!.data.data;
      apiSetSatus(2).then((res) => {
        console.log("status", res);
      });
    });
  });

  // When a new connection request is received, this code creates a data channel and sends the local or remote stream (if available) and text messages.
  peer.on("connection", (openPort) => {
    console.log("host connection 事件触发");
    connIds.push(openPort.peer);
    conns.push(openPort);
    conn = openPort;

    conn.on("open", () => {
      // for guest in index
      if (rid.value) {
        let sendMessage = [5, rid.value];
        conn.send(sendMessage);
      } else {
        getRid().then((res) => {
          rid.value = res!.data.data;
          let sendMessage = [5, rid.value];
          conn.send(sendMessage);
        });
      }
      let sendNodesMap = nodesMap;
      sendNodesMap[2] = -1;
      conn.send(sendNodesMap);
    });

    // Receive the text: Host <-- Guest
    conn.on("data", (data: any) => {
      // data[0]:
      //  0: msg
      //  1: nodeInfo or indexRoomInfo
      //  2: roomInfoModfied
      //  3: for reconnect: Remind the child node to replace the parent node
      //  4: for refresh: apply to the new media Stream for daliver to child
      console.log("host data 事件触发");
      switch (data[0]) {
        case 0:
          console.log("Received data:", data);
          deliverId = data[1];
          data[1] = peer.id; // make sure msg[2] keep last id of deliver

          // if ( liveSend(data) > 0 ) {
          //     console.log("Msg delivered successfully: " + data);
          // }else{console.log('Msg delivered failed');}

          liveSend(data);

          appearMsg(data);
          break;
        case 1:
          if (!audienceIds.includes(data[4])) {
            let aimPosition = connIds.indexOf(data[4]);
            audienceIds.push(connIds[aimPosition]);
            audiences.push(conns[aimPosition]);

            console.log("Msg Connected to: " + data[4]);

            if (localStream) {
              peer.call(data[4], localStream);
              console.log("Media sent successfully: " + data[4]);
              // If you want to receive the reply of the stream
              // usage: let temp peer.call(conn.peer, localStream);
              // temp.on('stream', (stream) = displayStream);
              // PS:
              // It can only receive the previous one, so you need to deliver a new stream.
            }
          }
          recorder(data);
          break;
        case 2:
          if (
            data[1] &&
            confirm(data[2] + "(" + data[1] + ") ask for your media stream")
          ) {
            if (localStream) {
              peer.call(data[1], localStream);
            } else if (remoteStream) {
              peer.call(data[1], remoteStream);
            } else {
              streamSourceMenuClose.value!.innerHTML = "Submit";
              streamSourceMenu();
              streamSourceMenuClose.value!.addEventListener("click", () => {
                peer.call(data[1], localStream!);
                streamSourceMenuClose.value!.innerHTML = "Close";
              });
            }
          }
          break;
        case 4:
          if (localStream) {
            peer.call(data[1], localStream);
            console.log("Media sent successfully: " + data[1]);
          } else {
            if (connIds.includes(data[1])) {
              conns[connIds.indexOf(data[1])].send([4]);
            }
          }
          break;
        default:
          console.log("unknown data: " + data);
      }
    });

    conn.on("close", () => {
      console.log("Connection closed");
      for (let i = 0; i < conns.length; i++) {
        if (conns[i]) {
          if (conns[i].open) {
            continue;
          } else {
            let disconnectedGuest = connIds.indexOf(conns[i].peer); // locate old data
            if (disconnectedGuest !== -1) {
              let disconnectedAudience = audienceIds.indexOf(conns[i].peer);
              if (disconnectedAudience !== -1) {
                console.log(
                  "Disconnected and deleted: " +
                    audienceIds[disconnectedAudience]
                ); //DEBUG
                audiences.splice(disconnectedAudience, 1);
                audienceIds.splice(disconnectedAudience, 1);

                let sameId = childNodes.indexOf(conns[i].peer);
                if (sameId !== -1) {
                  childNodes.splice(sameId, 3); // remove disconnected audiences
                  nodesMap[3] = getRoomIds();
                  childNodes[3] = audienceIds.length;
                }
                // child nodes of host closed the connection
                console.log("nodesMap update after somebody closed"); // DEBUG
                liveSend(nodesMap);
                if (root) {
                  if (root.open) {
                    root.send(nodesMap);
                  }
                }
              }
              // console.log("Disconnected and deleted: " + conns[i].peer);     //DEBUG
              conns.splice(disconnectedGuest, 1);
              connIds.splice(disconnectedGuest, 1);
            }
          }
        } else {
          break;
        }
      }
    });
  });
  // destroy connection when someone closed the web
  window.addEventListener("beforeunload", (event) => {
    if (audiences[0]) {
      for (let i = 0; i < audiences.length; i++) {
        audiences[i].send([5]);
        audiences[i].close();
      }
    }
    root!.close();
    // event.preventDefault();
  });
  if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
    onlyPC.value!.remove();
  }
});
const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  const message="当前正在直播中，确定要离开吗？"
  event.preventDefault();
  return message
  };
  const handleUnload = () => {
  // 使用 sendBeacon 发送数据
  const url = 'api/rooms/set_status?status=1';  // 设置状态的服务器接口
  navigator.sendBeacon(url);  // 异步发送数据，不会阻止页面关闭

  // 清理 peer 产生的资源
  peer.destroy(); // 清理所有 peer 产生的资源
};

// *This function is expected to retrieve the local stream, which could be a stream from the camera or microphone.
function streamSourceMenu() {
  streamSourceDrawer.value = false;
}


function showLive() {
  // if usr want to live
  if (!liveSettingDrawer.value) {
    openLiveTimes++;
    roomName.value = nodesMap[4];
    roomAbout.value = nodesMap[5];
    LiveCoverURL.value = coverURL;
    liveSettingDrawer.value = true;
  } else {
    liveSettingDrawer.value = false;
  }
}

function modify() {
  nodesMap[4] = roomName.value; // nodesMap update
  nodesMap[5] = roomAbout.value;
  if (liveCoverBase64) {
    nodesMap[6] = liveCoverBase64;
  } else {
    coverURL = LiveCoverURL.value;
    nodesMap[6] = LiveCoverURL.value;
  }
  liveSend(nodesMap);
  if (root) {
    if (root.open) {
      root.send(nodesMap);
    }
  }
  showLive();
}

function openRoomInfo() {
  roomInfoDrawer.value = false;
}

function recorder(data: any) {
  let sameId = childNodes.indexOf(data[4]); // locate old data
  console.log("Info of nodes updated:", data);
  console.log(sameId);
  // let idTemp = Object.assign({}, audienceIds);     // make audiencesPeers value stable
  if (sameId === -1) {
    childNodes.push(data[4]);
    childNodes.push(data[5]);
    childNodes.push(data);
  } else {
    childNodes[sameId + 1] = data[5];
    childNodes[sameId + 2] = data; // replace old data
  }
  // [0] => format, [1] => if from Root of room, [2] => numbers of child nodes from parent node
  childNodes[2] = audienceIds.length;
  nodesMap = [
    1,
    1,
    nodesMap[2],
    0,
    nodesMap[4],
    nodesMap[5],
    nodesMap[6],
    peer.id,
    getMyName(),
    childNodes,
    avatar.value,
  ];
  nodesMap[2] = getRoomIds();
  //record this node's info
  if (root) {
    if (root.open) {
      root.send(nodesMap);
    }
  }
  liveSend(nodesMap);
  console.log(sumOfRoom.value);
  sumOfRoom.value = nodesMap[2].length;
}

function refreshMap(fnOfEcho: any) {
  roomTitle.value = nodesMap[4];
  roomSummary.value = nodesMap[5];
  roomCover.value = nodesMap[6];
}
function disconnectStream() {
  if (localStream) {
    localStream?.getTracks().forEach(function (track) {
      track.stop();
    });
    WebVideo.value!.srcObject = null;
    console.log("stream disconnected");
  }
}
function tryConnect(
  object: number,
  id: string,
  ifJump: boolean,
  ifAskForMediaStream: boolean
) {
  // object:
  // 0: parent
  // 1: guest
  // 2: bridge
  // 3: hostRoot
  // 4: indexRoot
  switch (object) {
    case 1:
      if (guest) {
        if (guest.open) {
          guest.close();
        }
      }
      guest = peer.connect(id);

      if (ifJump) {
        guest.on("open", () => {
          for (let i = 0; i < guests.length; i++) {
            guest = guests[i];
            guests = new Array(); // break all of conn
            ifConnectedAim = true; // break search node
            switch (
              nodesMap[3] // room type
            ) {
              case 0:
                document.location.href =
                  "./P2PLiveAudience.html?id=" +
                  guest!.peer +
                  "&name=" +
                  getMyName();
                break;
              case 1:
                document.location.href =
                  "./P2PGameFiveOnLinePlayer.html?id=" +
                  guest!.peer +
                  "&name=" +
                  getMyName();
                break;
              default:
                console.log("unknown type of room: " + nodesMap[3]);
                break;
            }
            // console.log("aim id of node: "+ guest.peer)  // DEBUG
            break;
          }
        });
        if (!ifConnectedAim) {
          guests.push(guest);
        }
      } else {
        if (ifAskForMediaStream) {
          guest.on("open", () => {
            guest!.send([2, peer.id, getMyName()]);
          });

          peer.on("call", (mediaOpenPort) => {
            mediaOpen = mediaOpenPort;
            // Receive the stream
            mediaOpen.on("stream", (stream) => {
              localStream = stream;
              if (!ifNotDisplayLocalStream.value!.checked) {
                displayStream(stream);
              }
            });
            mediaOpen.answer();
          });
        } else {
          guest.on("data", (data: any) => {
            for (let i = 0; i < guests.length; i++) {
              if (guests[i].open) {
                // maybe useless
                guest = guests[i];
                guests = new Array(); // break all of conn
                nodesMap = data;
                ifConnectedAim = true;
                guest!.on("data", () => {
                  ifConnectedAim = false;
                });
                break;
              }
            }
          });
          if (!ifConnectedAim) {
            guests.push(guest);
          }
        }
      }
      break;
    case 2:
      if (bridge) {
        bridge.close();
      }
      bridge = peer.connect(id);

      alert("try to connect someone in rooms");
    case 3:
      // Close old connection
      if (root) {
        root.close();
      }

      ElMessage.warning("Status: Connecting...");

      root = peer.connect(id);

      root.on("open", () => {
        root!.send(nodesMap);
        ElMessage.success("Status: Connected to Root Node Successfully!");
      });

      root.on("close", () => {
        ElMessage.error("Status: Root Connection Closed!");
        connectRoot.value!.style.visibility = "visible";
      });
      break;
    default:
      console.log("tryConnect Error");
      break;
  }
}

function cleanMsg() {
  // DEBUG
  let msgs = document.getElementsByClassName("msgs");
  while (msgs.length) {
    msgs[0].remove();
  }
}
function sendMsg() {
  //*This line of code adds an event listener to the element with the ID "sendButton". It listens for a click event on the button and triggers the provided function when the event occurs.
  let msg = [
    0,
    peer.id,
    MyName.value,
    sendMessageBox.value,
    msgImgBase64,
    myIcon,
  ]; //*This line of code creates an array called "msg" and assigns it two values. The first value is the value of the element with the ID "name", and the second value is the value of the element with the ID "sendMessageBox". These values are used to construct the message that will be sent.
  if (msg[3] || msg[4]) {
    // DEBUG *This condition checks if the second element of the "msg" array (i.e., the message content) exists and is not empty.
    if (liveSend(msg) > 0) {
      // *This condition checks if the "liveSend" function returns a value greater than 0 when called with the "msg" array and 0 as arguments. If it does, it means the message was sent successfully.
      appearMsg(msg); // This function is responsible for displaying the own sent message
      sendMessageBox.value = "";
      // console.log("Sent successfully: " + msg);    // DEBUG
      msgImgBase64 = null;
    } else {
      console.log("Connection is closed");
    }
  } else {
    // pass
    //*This line of code sets the placeholder attribute of the element with the ID "sendMessageBox" to display a message indicating that the content should not be empty.
  }
}
function getMyName() {
  if (MyName) {
    if (MyName) {
      return MyName.value;
    } else {
      return peer!.id;
    }
  }
}

function liveSend(msg: unknown) {
  let aims = 0; // count successful times
  let source = NaN;
  if (msg instanceof Array) {
    if (msg[0] && msg[0] instanceof Number && !(msg[1] instanceof Number)) {
      source = msg[1];
    }
  }
  if (parent) {
    if (![String(source), deliverId].includes(parent.peer)) {
      // Promise a stable sending
      if (parent.open) {
        // check the data channel
        parent.send(msg);
        aims++; // count successful times
      }
    }
  }
  if (audiences) {
    for (let i = 0; i < audiences.length; i++) {
      if (audiences[i]) {
        if (![source, deliverId /*, parent.id */].includes(audiences[i].peer)) {
          if (audiences[i].open) {
            audiences[i].send(msg);
            aims++;
          }
        }
      }
    }
  }
  deliverId = null; // avoid losing text when sending
  return aims; //if == zero => send failed
}
function appearMsg(msg: any) {
  let now = new Date();

  let newMsg = document.createElement("div");
  newMsg.classList.add("msgs");
  let newMsgContent = document.createElement("div");

  if (msg[5]) {
    let newMsgIcon = document.createElement("img");
    newMsgIcon.setAttribute("src", msg[5]);
    newMsgIcon.classList.add("icon");
    newMsgContent.appendChild(newMsgIcon);
  }

  let newMsgTime = document.createElement("span");
  newMsgTime.appendChild(
    document.createTextNode(
      "[" +
        now.getHours() +
        ":" +
        now.getMinutes() +
        ":" +
        now.getSeconds() +
        "]"
    )
  );
  newMsgTime.classList.add("time");
  newMsgContent.appendChild(newMsgTime);

  let newMsgUser = document.createElement("span");
  newMsgUser.appendChild(document.createTextNode(msg[2] + ":"));
  newMsgUser.classList.add("usr");
  newMsgContent.appendChild(newMsgUser);

  newMsg.appendChild(newMsgContent);

  let newMsgTextContent = document.createElement("span");
  newMsgTextContent.appendChild(document.createTextNode(msg[3]));
  newMsgTextContent.classList.add("chatText");
  newMsg.appendChild(newMsgTextContent);

  if (msg[4]) {
    let newMsgImgContent = document.createElement("img");
    newMsgImgContent.setAttribute("src", msg[4]);
    newMsgImgContent.classList.add("chatImg");
    newMsg.appendChild(newMsgImgContent);
  }

  chatBox.value!.appendChild(newMsg);
  if (ifAutoScroll) {
    chatBox.value!.scrollTop = chatBox.value!.scrollHeight;
  }
  if (ifAutoClean.value!.checked) {
    let msgs = document.getElementsByClassName("msgs");
    let numberOfMsgs = msgs.length;
    if (numberOfMsgs > 100) {
      let deltaNumber = numberOfMsgs - 100;
      for (let i = 0; i <= deltaNumber; i++) {
        msgs[i].remove();
        numberOfMsgs--;
      }
    }
  }
  if (fullWebVideoTimes === 1) {
    chatBox.value!.style.visibility = "true";
    setTimeout(function () {
      chatBox.value!.style.visibility = "false";
    }, 5000);
  }
}
function getRoomIds() {
  console.log(nodesMap);
  roomIds = new Array();
  recursiveSearch(nodesMap[9], 999); // DEBUG 999 -> + infinite
  roomIds.push(nodesMap[7]); // host id
  return roomIds;
}
function displayStream(stream: any) {
  console.log("displayStream",WebVideo.value?.srcObject);
  if (WebVideo.value!.srcObject) {
    WebVideo.value!.srcObject = null;
  }
  WebVideo.value!.srcObject = stream;
  console.log("displayStream",WebVideo.value?.srcObject);
}
function recursiveSearch(arr: Array<any>, t: number) {
  console.log(arr);
  for (let i = 7; i < arr.length; i = i + 3) {
    if (arr[i] && arr[i + 2]) {
      if (arr[i + 2][2] < t) {
        roomIds.push(arr[i]);
      }
    }
  }
  for (let m = 9; m < arr.length; m = m + 3) {
    // After checked out suited nodes in thid layer, search their suited child nodes
    if (arr[m] && arr[m] instanceof Array) {
      recursiveSearch(arr[m], t);
    }
  }
}

function shallowSearch(arr: Array<any>, t: number) {
  for (let i = 7; i < arr.length; i = i + 3) {
    if (arr[i] && arr[i + 2] instanceof Array) {
      if (arr[i + 2][2] < t) {
        if (ifConnectedAim) {
          break;
        }
        // console.log("tried connect to: "+ arr[i]);  // DEBUG
        tryConnect(1, arr[i], true, false);
      } else {
        temporaryChosedNodes.push(arr[i + 2]); // record inapporpriate nodes for deep search
      }
    }
  } // else { console.log("give up connecting to "+ arr[i]); }
}
function useDisplayMedia() {
  navigator.mediaDevices
    .getDisplayMedia({ video: true, audio: true })
    .then((stream) => {
      // After successfully obtaining the local stream, display it on the page.
      localStream = stream;
      displayStream(localStream);
      console.log("Local stream shared");
    })
    .catch((error) => {
      console.error("Error getting local stream:", error);
    });
}

function askNavigatorMediaDevices(
  ifUseCamera: boolean,
  ifUseMicrophone: boolean
) {
  const constraints = {
    audio: ifUseCamera,
    video: ifUseMicrophone,
  };
  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      localStream = stream;
      displayStream(localStream);
      console.log("Local stream shared");
    })
    .catch(function (err) {
      console.error("Error getting local stream:", err);
    });
}

function shareSRSMediaStream(url: string) {
  url = "webrtc://" + url;
  const rtcPlayer = new SrsRtcPlayerAsync();
  console.log('rtcplayer',rtcPlayer)
  rtcPlayer.play(url);
  localStream = rtcPlayer.stream;
  displayStream(rtcPlayer.stream);
}
const onVue3EmojiPicker = (emoji: EmojiExt) => {
  console.log(emoji.i);
  sendMessageBox.value += emoji.i;
};
</script>
<template>
  <div class="host">
    <el-drawer v-model="streamSourceDrawer">
      <div id="streamSource" ref="streamSource">
        <div class="box" id="onlyPC" ref="onlyPC" style="margin-top: 10px">
          <div style="font-weight: bold">
            Share PC Desktop:<br />
            <el-button  id="browserDisplayMedia" @click="useDisplayMedia()">
              Use Display Stream
            </el-button>
          </div>
        </div>
        <div class="box" style="margin-top: 10px">
          <div style="font-weight: bold">
            Share Local Devices:
            <el-button
              id="browserNavigatorMediaDevices"
              @click="askNavigatorMediaDevices(ifUseCamera, ifUseMicrophone)"
            >
              Upload Local Device</el-button
            ><br />
            <input type="checkbox" v-model="ifUseCamera" />Camera
            <input type="checkbox" v-model="ifUseMicrophone" />Microphone
          </div>
        </div>
        <div class="box" style="margin-top: 10px">
          <div style="font-weight: bold">
            Input SRS Media Stream url like "url/key"(rtmp -> srs -> webrtc)<br />
            <input
              id="streamUrlSRS"
              v-model="streamUrlSRS"
              type="text"
              placeholder="input the url of srs media Stream here..."
            />
            <el-button
              id="uploadStreamSRS"
              @click="shareSRSMediaStream(streamUrlSRS)"
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
        <el-button class="disconnect-stream" @click="disconnectStream"
          >disconnect</el-button
        >
      </div>
    </el-drawer>
    <!-- ID interaction -->

    <!-- Live interaction-->
    <div class="videoBox">
      <div class="video-player">
        <div class="video-player-head">
          <div class="video-player-head-avator">
            <img :src="avatar" alt="头像" />
          </div>
          <div class="video-player-head-title">
            <h2>{{ roomName }}</h2>
            <h3>{{ roomAbout }}</h3>
          </div>
          <div class="live-control-box">
            <el-button
              id="chooseStreamSource"
              @click="streamSourceDrawer = true"
            >
              Stream Source
            </el-button>
            <el-button id="roomSetting" @click="dialog.changeRoomInfoDialog()">
              Room Setting
            </el-button>
            <div
              id="connectRoot"
              ref="connectRoot"
              style="display: none; visibility: hidden"
            >
              Join a root node:<input
                type="text"
                id="peerId"
                ref="peerId"
                placeholder="Input Id of Root node..."
              />
              <el-button
                id="connectel-button"
                ref="connectel-button"
                @click="() => {
          tryConnect(3, peerId!.value, false, false);
        }"
              >
                Connect
              </el-button>
            </div>
            <!-- <input type="checkbox" id="ifAutoReconnect" checked="checked">Automatic Reconnection<br> -->
          </div>
        </div>
        <!--PS: if no video(maybe leaded by autoplay), try to click it to play(or F12 check the stream)-->
        <div class="video">
          <video id="webVideo" ref="WebVideo" controls autoplay></video>
        </div>
      </div>
      <!-- Message box -->
      <div id="chatContainer">
        <div class="chat-room-head">
          <span id="sumOfRoom">Members: {{ sumOfRoom }}</span
          ><br />
          <div class="auto-clean-check">
            <input
              type="checkbox"
              id="ifAutoClean"
              ref="ifAutoClean"
            />Auto-clean Msgs[max->100]
          </div>
        </div>
        <div
          id="chatBox"
          ref="chatBox"
          @mouseover="
            () => {
              ifAutoScroll = false;
            }
          "
          @mouseout="
            () => {
              ifAutoScroll = true;
            }
          "
        ></div>
        <div class="sendInput">
          <!-- Send box -->
          <el-input
            type="text"
            v-model="sendMessageBox"
           @keyup.enter="sendMsg"
            placeholder="Input message here..."
          >
            <template #prepend>
              <el-dropdown
                placement="top-end"
                :teleported="false"
                trigger="click"
              >
                <el-icon>
                  <IconFace style="transform: scale(1.7)" />
                </el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <EmojiPicker
                      :native="true"
                      class="emoji-picker"
                      @select="onVue3EmojiPicker"
                    />
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-input>
          <el-button id="sendel-button" ref="sendel-button" @click="sendMsg">
            Send</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@use "../assets/drawer.scss";
.host {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 2.5rem 2.5rem 0 2.5rem;
  margin-top: 3rem;
}

.live-control-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  // border: solid 0.063rem black ;
  flex: 1.2;
  > * {
    border-radius: 0;
    border-right: none;
    width: 100%;
    flex: 1;
    padding: 0;
    margin: 0;
  }
}
.videoBox {
  width: 100%;
  height: 42.31rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  .video-player {
    background-color: #fff8f9;
    border-radius: 2.5rem;
    border: solid 0.063rem #d3c2ca;
    flex: 2;
    overflow: hidden;
    .video{
      height: 75%;
      width: 100%;
    }
    video {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .video-player-head {
    display: flex;
    flex-direction: row;

    align-items: center;
    padding: 0 0 0 2rem;
    border: solid 0.063rem #d3c2ca;
    height: 15%;
    &-avator {
      height: 110%;

      margin-right: 1rem;
      padding: 1rem 0;
      flex: 1;
      img {
        height: 100%;
        aspect-ratio: 1;
        border-radius: 50%;
        object-fit: cover;
      }
    }
    &-title {
      display: flex;
      flex: 8;
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
  #chatContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2.5rem;
    width: 38.88rem;
    border: solid 0.063rem #d3c2ca;
    overflow: hidden;
    margin: 0 1rem;
    flex: 1;
    #chatBox {
      width: 100%;
      height: 80%;
    }
    .sendInput {
      width: 50%;
      display: flex;
      justify-content: center;
    }
    .chat-room-head {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: start;
      padding: 0 2rem;
      border: solid 0.063rem #d3c2ca;
      height: 5rem;
    }
  }
}
.emoji-picker {
  * {
    flex-shrink: 1;
  }
}
</style>
