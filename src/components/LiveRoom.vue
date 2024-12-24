<template>
  <div class="live-room">
    <VideoPlayer>
      <template #join>
        <el-input
          class="join-input"
          v-model="directConnectId"
          placeholder="请输入房间号"
          @keyup.enter="join"
        >
          <template #suffix>
            <img
              src="/src/assets/images/AtriYES.png"
              alt="atri"
              class="atri"
              @click="join"
            />
          </template>
        </el-input>
      </template>
    </VideoPlayer>
    <ChatRoom></ChatRoom>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { useRouter } from "vue-router";
import { RouterLink } from "vue-router";
const searchInfo = ref("");
import { onMounted, ref } from "vue";
import { Peer, DataConnection } from "peerjs";
const router = useRouter();
let directConnectId = ref<string>("");
let lastTemporaryChosedNodes = [];
let temporaryChosedNodes = [];
let openInfoTimes: number = 0;
let openLiveTimes: number = 0;
let myid: string | null = null;
let ifIndex: boolean = true;
let ifConnectedAim: boolean = false;
let lastAimId: string | null = null;
let nodesMap: any[] = [];
let rooms = ref<any[]>([]);
let liveHostIds: string[] = [];
let conns: DataConnection[] = [];
let connIds: string[] = [];
let layers: number[] = [0];
let roomPosition: number | null = null;
let lastLayerNumber: number | null = null;
let MyName: string | null = null;
let rootId = "";
let switchDeg: number = 180;
let connectHistroy: string[] = [];
let defaultId: string = "P2P-Live-Web-default-Id";
let peer: Peer = new Peer();
let guests = [];
let guest: any = null;
let root: any = null;
let peerId = ref<string>();

//建立peerjs 连接
// onMounted(() => {
//   peer = new Peer(defaultId, { debug: 2 })
//   // Listen for the event when a Peer connection is successfully opened
//   peer.on('open', (id: string) => {
//     console.log('Your ID:'+id+'hello world')
//     ElMessage.success('Status: Root Node Created')
//   })
//   peer.on('error', (err: any) => {
//     if (err.type === 'unavailable-id') {
//       // document.getElementById('connectRoot')!.style.visibility = 'visible'
//       peer = new Peer({ debug: 2 })
//       peer.on('open', (id: string) => {
//         console.log('Your ID:'+id)
//         ElMessage.warning('Status: Need to connect to the Root Node')
//         defaultConnect()
//       })
//     } else {
//       ElMessage.error('initial work ERROR(check in console)')
//     }
//   })

//   if (peer.id === defaultId) {
//     peer.on('connection', (connPort: DataConnection) => {
//       const conn: DataConnection = connPort

//       conn.on('open', () => {
//         connIds.push(conn.peer)
//         conns.push(conn)
//         console.log('Be connected to: ' + conn.peer)
//         conn.send(rooms)
//       })

//       conn.on('close', () => {
//         for (let i = 0; i < conns.length; i++) {
//           if (conns[i]) {
//             if (conns[i].open) {
//               continue
//             } else {
//               const disconnectedHost = connIds.indexOf(conns[i].peer)
//               const disconnectedLiveHost = liveHostIds.indexOf(conns[i].peer)
//               if (disconnectedHost !== -1) {
//                 console.log('Disconnected and deleted: ' + conns[i].peer) // DEBUG
//                 conns.splice(disconnectedHost, 1)
//                 connIds.splice(disconnectedHost, 1)
//               }
//               if (disconnectedLiveHost !== -1) {
//                 liveHostIds.splice(disconnectedLiveHost, 1)
//                 rooms.value!.splice(disconnectedLiveHost, 1)
//                 rootSend(rooms.value!)
//               }
//             }
//           } else {
//             break
//           }
//         }
//       })

//       conn.on('data', (data: any) => {
//         switch (data[0]) {
//           case 0:
//             break
//           case 1:
//             if (liveHostIds.includes(data[7])) {
//               rooms.value![liveHostIds.indexOf(data[7])] = data
//             } else {
//               liveHostIds.push(data[7])
//               rooms.value!.push(data) // record child nodesMap
//             }
//             console.log('Live rooms update') // DEBUG
//             rootSend(rooms.value!)
//             break
//           default:
//             console.log('unknown data: ' + data)
//         }
//       })
//     })
//   }
// })
function defaultConnect() {
  if (peer!.id === defaultId) {
    ElMessage.error("Root node can't connect others");
    return;
  }
  if (root) {
    root.close();
  }
  tryConnect(defaultId, false);
}
function tryConnect(id: string, ifJump: boolean) {
  if (root) {
    root.close();
  }

  root = peer!.connect(id);

  root.on("open", () => {
    peerId.value! = id;
    ElMessage.success("Status: Connected to Root Node Successfully!");
  });

  // Receive the reply of text: Host --> Guset
  root.on("data", (data: any) => {
    // Info of rooms from root received
    console.log(data);
    rooms.value = data;
    // appearRooms()
    console.log("Room list received");
  });

  root.on("close", () => {
    // root = null;
    ElMessage.warning("Status: Root Connection Closed!");

    // if(document.getElementById("ifAutoReconnect").checked){
    //     document.getElementById("status").innerHTML="Status: Reconnecting to last Root Node...";

    //     tryConnect(4, connectHistroy.slice(-1)[0], false);
    //     // document.getElementById("status").innerHTML="Status: Root Reconnection Failed!";
    // }
  });
}
function rootSend(rooms: any[]) {
  console.log("deliver rooms update"); // DEBUG
  for (let i = 0; i < conns.length; i++) {
    if (liveHostIds.includes(connIds[i])) {
      continue;
    }
    if (conns[i].open) {
      conns[i].send(rooms);
    }
  }
}
function getMyName() {
  if (MyName) {
    if (MyName) {
      return MyName;
    } else {
      return peer!.id;
    }
  }
}

function join() {
  if (guest) {
    if (guest.open) {
      guest.close();
    }
  }
  guest = peer!.connect(directConnectId.value);
  guest.on("open", () => {
    console.log("successfully connected: " + guest.peer); // DEBUG
  });
  guest.on("data", (data: any) => {
    nodesMap = data;
    router.push({
      path: "/audience",
      query: { id: guest.peer, name: getMyName() },
    });
  });
}
</script>

<style lang="scss" scoped>
.live-room {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 40.31rem;
  padding: 2.5rem;
  margin-top: 3rem;
  overflow: hidden;
}

.join-input {
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 5.4%;
  width: 35%;
  :deep(.el-input__wrapper) {
    width: 100%;
    display: flex;
    justify-content: start;
    align-items: flex-end;
  }
  .atri {
    padding-left: 0.4rem;
    height: 120%;
    cursor: pointer;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>
