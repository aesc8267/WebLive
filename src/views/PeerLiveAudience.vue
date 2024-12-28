<template>
  <div class="audience">
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
            <!-- Receiver -->
            <!-- <div style="font-weight: bold">Host</div> -->
            <el-button id="refreshel-button" @click="refreshMap(0)"
              >Refresh</el-button
            >
            <el-button @click="peer.reconnect"
              >Reconnect to Peer Server</el-button
            >
            <div id="connectRoot" ref="connectRoot" style="visibility: hidden">
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
        <video id="webVideo" ref="WebVideo" controls autoplay></video>
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
            @keypress="enter"
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
          <el-button id="sendel-button" ref="sendel-button" @click="sendMsg()">
            Send</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/* eslint-disable */
import { onBeforeUnmount, onMounted, onUnmounted, ref, toRef } from "vue";
import { Peer, DataConnection, MediaConnection } from "peerjs";
import { toRefs } from "vue";
import { useRoute, type LocationQueryValue } from "vue-router";
// @ts-ignore
import SrsRtcPlayerAsync from "@/utils/srs.sdk.js";
import { roomHistoryInsert } from "@/api/history-controller";
import EmojiPicker, { type EmojiExt } from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

let hostRid=ref()
const peer = new Peer({ debug: 2 });
const route = useRoute();
const roomName = ref("瓶子君152");
const roomAbout = ref("周二读书会");
let conn: DataConnection;
let mediaOpen: MediaConnection | null = null;
let openInfoTimes = 0;
let openLiveTimes = 0;
const avatar = ref(localStorage.getItem("avatar")!);
let parent: DataConnection;
let ifAutoScroll = ref<boolean>(true);
let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;
let ifHitAim = null;
let lastAimId: string | null;
let layers = [0];
let lastLayerNumber: null = null;
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
let urlInfo = [
  params.get("rootId"),
  params.get("title"),
  params.get("summary"),
  params.get("coverURL"),
];
let liveCoverBase64: null = null;
let msgImgBase64: null = null;
let guest: DataConnection | null = null;
let guests = new Array();
let ifConnectedAim: boolean = false;
let bridge: DataConnection | null = null;
let middleX = 0;
let fullWebVideoTimes = 0;
let myIcon = "";
let temporaryChosedNodes = new Array();
let awaitedNodeId: string | null = null;
let urlId: LocationQueryValue = route.query.id as LocationQueryValue;
let urlName: LocationQueryValue = route.query.name as LocationQueryValue;
const LiveTitle = ref<HTMLDivElement>();
const LiveSummary = ref<string>();
const LiveCoverURL = ref<string>("public/images/eden.png");
let MyName = ref<string>("hello world");
// const myid = ref<HTMLDivElement>()
// const status = ref<HTMLDivElement>()
const streamSource = ref<HTMLDivElement>();
const chatBox = ref<HTMLElement>();
const sendMessageBox = ref<string>("");
const sendButton = ref<HTMLButtonElement>();
const liveSetting = ref<HTMLDivElement>();
const openRoomInfoDiv = ref<HTMLElement>();
const connectButton = ref<HTMLElement>();
const peerId = ref<HTMLInputElement>();
const sumOfRoom = ref<number>();
const onlyPC = ref<HTMLDivElement>();
const streamUrlSRS = ref<HTMLInputElement>();
const lendAimId = ref<HTMLInputElement>();
const block0 = ref<HTMLDivElement>();
const block1 = ref<HTMLDivElement>();
const roomTitle = ref<string>();
const roomSummary = ref<string>();
const roomCover = ref<string>();
const streamSourceMenuClose = ref<HTMLButtonElement>();
const ifNotDisplayLocalStream = ref<HTMLInputElement>();
const ifUseCamera = ref<HTMLInputElement>();
const ifUseMicrophone = ref<HTMLInputElement>();
const connectRoot = ref<HTMLDivElement>();
const container = ref<HTMLDivElement>();
const fullScreen = ref<HTMLButtonElement>();
const msgImgInput = ref<HTMLInputElement>();
const ifAutoClean = ref<HTMLInputElement>();
const submitMediaStream = ref<HTMLButtonElement>();
const ifAutoReconnect = ref<HTMLInputElement>();

let coverURL = "";
let hereNode = new Array();

const onVue3EmojiPicker = (emoji: EmojiExt) => {
  console.log(emoji.i);
  sendMessageBox.value += emoji.i;
};
onMounted(() => {
  // Listen for the event when a Peer connection is successfully opened
  // *Explanation: The provided code snippet is using the Peer.js library to establish a Peer connection. The peer.on('open', ...) code block is listening for the 'open' event, which is triggered when the Peer connection is successfully opened.

  // console.log(route.query)
  peer.on("open", (id) => {
    MyName.value = urlName!;
    hereNode = [1, 0, 0, [], id, getMyName(), []];
    console.log("Your ID:" + id);
    ElMessage.warning("Status: Connecting to Live Room...");
    tryConnect(0, urlId!, false, false); // try to connect to the room
  });
  // When a new connection request is received, this code creates a data channel and sends the local or remote stream (if available) and text messages.
  peer.on("connection", (connPort) => {
    connIds.push(connPort.peer);
    conns.push(connPort);
    conn = connPort;
    conn.on("open", () => {
      // for guest in index
      let sendMessage=[0,hostRid.value]// 将直播间的rid 广播
      conn.send(sendMessage)
      let sendNodesMap = nodesMap;
      sendNodesMap[2] = -1;
      conn.send(sendNodesMap);
    });

    // Receive the text: Host <-- Parent
    conn.on("data", (data: any) => {
      // data[0]:
      //  0: msg
      //  1: nodeInfo or indexRoomInfo
      //  2: roomInfoModfied
      //  3: for reconnect: Remind the child node to replace the parent node
      //  4: for refresh: apply to the new media Stream for daliver to child
      console.log("audience data 事件触发");
      switch (data[0]) {
        case 0:
          console.log("Received data:", data);
          deliverId = data[1];
          data[1] = peer.id; // make sure msg[2] keep last id of deliver

          if (liveSend(data) > 0) {
            console.log("Msg delivered successfully: " + data);
          } else {
            console.log("Msg delivered failed");
          }

          appearMsg(data);
          break;
        case 1:
          if (!audienceIds.includes(data[4])) {
            let aimPosition = connIds.indexOf(data[4]);
            audienceIds.push(connIds[aimPosition]);
            audiences.push(conns[aimPosition]);

            console.log("Msg Connected to: " + data[4]);

            if (remoteStream) {
              // speed debug todo
              peer.call(
                data[4],
                remoteStream /*document.getElementById('RemoteVideo').srcObject*/
              );
              console.log("Media delivered successfully: " + data[4]);
            } else if (localStream) {
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
              streamSourceMenu();
              submitMediaStream.value!.addEventListener("click", () => {
                peer.call(data[1], localStream!);
              });
            }
          }
          break;
        case 4:
          if (remoteStream) {
            peer.call(
              awaitedNodeId!,
              remoteStream /*document.getElementById('RemoteVideo').srcObject*/
            );
            console.log("Media delivered successfully: " + awaitedNodeId);
            awaitedNodeId = null;
          } else if (localStream) {
            peer.call(awaitedNodeId!, localStream);
            console.log("Media sent successfully: " + awaitedNodeId);
            awaitedNodeId = null;
          } else if (parent) {
            awaitedNodeId = data[1];
            if (parent.open) {
              parent.send([4, peer.id]);
            }
          }
          break;
        default:
          console.log("unknown data: " + data);
      }
    });

    conn.on("close", () => {
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

                let sameId = hereNode.indexOf(conns[i].peer);
                if (sameId !== -1) {
                  hereNode.splice(sameId, 3); // remove disconnected audiences
                  hereNode[2] = audienceIds.length;

                  // one of child nodes closed the connection
                  console.log("nodesMap update after somebody closed"); // DEBUG
                  if (parent) {
                    if (parent.open) {
                      parent.send(hereNode);
                    }
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

  peer.on("call", (mediaOpenPort) => {
    mediaOpen = mediaOpenPort;
    // Receive the stream
    mediaOpen.on("stream", (stream) => {
      remoteStream = stream;
      if (awaitedNodeId) {
        peer.call(
          awaitedNodeId,
          remoteStream /*document.getElementById('RemoteVideo').srcObject*/
        );
        console.log("Media delivered successfully: " + awaitedNodeId);
        awaitedNodeId = null;
      } else {
        displayStream(remoteStream);
      }
      console.log("Received stream:", stream); // DEBUG
    });
    mediaOpen.answer();
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
onBeforeUnmount(() => {
  console.log("audience unmounted");
  peer.destroy();
});
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
    case 0:
      // Close old connection
      if (parent) {
        parent.close();
        // [ mark of sorting, myId, number of who be effected, if keep parent firmly here ]
        liveSend([3, peer.id, 0, false]); // remind child node change parentNode
      }
      parent = peer.connect(id);

      parent.on("open", () => {
        // changingParentConnection = false;
        parent!.send(hereNode);
        ElMessage.success("Status: Connected to Live Room Successfully!");
        appearMsg([0, null, "System", "Connected successfully"]);
      });

      // parent.on('error', (err) => {
      //     document.getElementById("status").innerHTML="Status: Connecting Failed!" + err;
      // });

      // Receive the reply of text: Host --> Guset
      parent.on("data", (data: any) => {
        // data[0]:
        //  0: msg
        //  1: nodeInfo or indexRoomInfo
        //  2: streaming request
        //  3: for reconnect: Remind the child node to replace the parent node
        //  4: for refresh: apply to the new media Stream for daliver to child
        // console.log("parent.on data")
        switch (data[0]) {
          case 0:
            console.log('host rid:',data[1])
            hostRid.value=data[1];
            roomHistoryInsert(hostRid.value).then(
              ()=>{
                console.log('history insert success')
              }
            );
            break;
          case 1:
            if (data[1] == -1) {
              break;
            } // refused to receive msg for guest
            recorder(data);
            break;
          case 3:
            console.log("parent.on case data[0]:3 is happened");
            break;
          case 4:
            // if deliver without meida stream
            if (awaitedNodeId) {
              if (connIds.includes(awaitedNodeId)) {
                conns[connIds.indexOf(awaitedNodeId)].send([4]);
                awaitedNodeId = null;
              }
            } else {
              alert("host is not on live");
            }
          default:
            console.log("unknown data: " + data);
        }
      });

      parent.on("close", () => {
        ElMessage.warning(
          "Status: Room Connection Closed. Please Refresh the Connection!"
        );

        if (ifAutoReconnect.value!.checked) {
          ElMessage.warning("Status: Reconnecting to room...");

          autoJoin(3);
        }
      });
      break;

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
        ElMessage.warning("Status: Root Connection Closed!");
        connectRoot.value!.style.visibility = "visible";
      });
      break;
    default:
      console.log("tryConnect Error");
      break;
  }
}
// *This function is expected to retrieve the local stream, which could be a stream from the camera or microphone.
function streamSourceMenu() {
  if (streamSource.value!.style.height != "25%") {
    streamSource.value!.style.height = "25%";
  } else {
    streamSource.value!.style.height = "0px";
  }
}

function enter(e: any) {
  let event = e && window.event;
  if (event.which && event.keyCode == "13") {
    sendButton.value!.click();
  }
}

function recorder(data: any) {
  // todo :debug
  switch (data[1]) {
    case 0: // 0 means unfinished
      let sameId = hereNode.indexOf(data[4]); // locate old data
      console.log("Info of nodes updated:", data);
      // let idTemp = Object.assign({}, connPeers);     // make connIds value stable
      if (sameId === -1) {
        hereNode.push(data[4]);
        hereNode.push(data[5]);
        hereNode.push(data);
      } else {
        hereNode[sameId + 1] = data[5];
        hereNode[sameId + 2] = data; // replace old data
      }
      // let idTemp = Object.assign({}, connIds);     // make connIds value stable
      // idTemp[sameId] = data;      // replace old data
      // hereMap = [1, peer.id, idTemp, null, 0];  //record this node's info
      hereNode[2] = audienceIds.length;
      if (parent) {
        if (parent.open) {
          // collect information about the connection map and send to parent node
          if (audienceIds.includes(parent.peer)) {
            // fix connect mutually
            for (let i = 0; i < audiences.length; i++) {
              // send nodesMap to all of child nodes
              if (audiences[i] || audienceIds[i] == parent.peer) {
                continue;
              }
              if (audiences[i].open) {
                audiences[i].send([
                  1,
                  1,
                  audienceIds.length,
                  0,
                  null,
                  null,
                  null,
                  peer.id,
                  getMyName(),
                  hereNode,
                  null,
                ]);
              }
            }
          } else {
            parent.send(hereNode); // if not root node
          }
        }
      }
      break;
    case 1: // once collection of data is completed
      for (let i = 0; i < audiences.length; i++) {
        // send nodesMap to everyone
        if (audiences[i]) {
          if (audiences[i].open) {
            audiences[i].send(data);
          }
        }
      }
      nodesMap = data;
      sumOfRoom.value = nodesMap[2].length;
      break;
    default:
      console.log("unknown data" + data);
      break;
  }
}

// 添加
function echoNodesMap(arr: any, layerNumber: any, aimId: any, fnOfEcho: any) {
  if (arr == nodesMap[9]) {
    // refresh Map for "refresh" & hostNode button
    layers = [0];
    if (aimId === undefined) {
      // hostNode button provide the channel connecting to host
      lastAimId = null;
    }
    lastLayerNumber = null;
    block0.value!.innerHTML = "";
    block1.value!.innerHTML = "";
  }
  if (lastAimId === aimId) {
    // if second click on same button
    switch (fnOfEcho) {
      case 0: // button for getting id
        if (aimId) {
          alert(aimId);
        }
        break;
      case 1: // button for joining a node
        if (aimId == peer!.id) {
          alert(aimId);
          break;
        }
        document.location.href =
          "./P2PLiveAudience.html?id=" + aimId + "&name=" + getMyName();
        break;
      case 2: // button for joining a node
        if (aimId == peer!.id) {
          alert(aimId);
          break;
        }
        document.location.href =
          "./P2PGameFiveOnLinePlayer.html?id=" + aimId + "&name=" + getMyName();
        break;
    }
  } else {
    document.getElementById("block" + (layerNumber % 2))!.innerHTML = "";
    if (lastLayerNumber === layerNumber) {
      layers.splice(lastLayerNumber! + 1); // remove all of old layers
    }
    if (arr) {
      for (let i = 7; i < arr.length; i = i + 3) {
        if (arr[i + 2] instanceof Array) {
          // create buttons linking to child nodes of object which was delivered by clicked button
          document.getElementById("block" + (layerNumber % 2))!.innerHTML =
            document.getElementById("block" + (layerNumber % 2))!.innerHTML +
            '<button class="childNodes" onclick="echoNodesMap(layers[' +
            (layerNumber + 1) +
            "][" +
            (i + 2) +
            "], " +
            (layerNumber + 1) +
            ", layers[" +
            (layerNumber + 1) +
            "][" +
            i +
            "], " +
            fnOfEcho +
            ' )">' +
            arr[i + 1] +
            "</button><br />";
        }
      }
    }
    layers.push(arr);
    lastLayerNumber = layerNumber;
    lastAimId = aimId; // original id of this layer
  }
}

function refreshMap(fnOfEcho: any) {
  roomTitle.value = nodesMap[4];
  roomSummary.value = nodesMap[5];
  roomCover.value = nodesMap[6];
  echoNodesMap(nodesMap[9], 0, undefined, fnOfEcho); // refresh the menu
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
      msgImgInput.value!.files = null;
    } else {
      console.log("Connection is closed");
    }
  } else {
    //*This line of code sets the placeholder attribute of the element with the ID "sendMessageBox" to display a message indicating that the content should not be empty.
  }
}
function getMyName() {
  if (MyName.value) {
    console.log("My name is " + MyName.value);
    return MyName.value;
  } else {
    return peer!.id;
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
  // original msg appear mode(only one line but low effective)
  // document.getElementById("chatBox").innerHTML =  document.getElementById("chatBox").innerHTML + "<div class=\"msgs\"><span class=\"time\">[" + now.getHours() +":"+ now.getMinutes() +":"+ now.getSeconds() + "]</span>" + "<span class=\"usr\">"+ msg[2] + ": </span>" + msg[3] + img +"</div>";

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
  roomIds = new Array();
  recursiveSearch(nodesMap[9], 999); // DEBUG 999 -> + infinite
  roomIds.push(nodesMap[7]); // host id
  return roomIds;
}
function displayStream(stream: any) {
  if (WebVideo.value!.srcObject) {
    WebVideo.value!.srcObject = null;
  }
  WebVideo.value!.srcObject = stream;
}
function recursiveSearch(arr: Array<any>, t: number) {
  if (!Array.isArray(arr)) {
    console.log("子节点为空");
    return;
  }
  for (let i = 7; i < arr.length; i = i + 3) {
    if (arr[i] && arr[i + 2] instanceof Array) {
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
function autoJoin(t: number) {
  if (nodesMap[1] !== 1 || ifConnectedAim) {
    console.log(
      "Error: try autoJoin() by the nodesMap which wasn't from Root of Room" +
        nodesMap
    );
    return;
  }
  if (nodesMap[9][3] < t) {
    // host node has low child nodes
    tryConnect(1, nodesMap[7], true, false);
  } else {
    recursiveSearch(nodesMap[9], t); // search for the node with low child nodes
  }
}
</script>
<style scoped lang="scss">
.audience {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  padding: 2.5rem 2.5rem 0 2.5rem;
  margin-top: 3rem;
}
.live-control-box {
  display: flex;
  flex-direction: row;
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
    video {
      width: 100%;
      object-fit: cover;
    }
  }
  .video-player-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 2rem;
    border: solid 0.063rem #d3c2ca;
    height: 15%;
    &-avator {
      height: 110%;
      margin-right: 1rem;
      padding: 1rem 0;
      img {
        height: 100%;
        aspect-ratio: 1;
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
