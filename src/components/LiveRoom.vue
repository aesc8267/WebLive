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
let nodesMap: any[] = [];
let rooms = ref<any[]>([]);
let liveHostIds: string[] = [];
let conns: DataConnection[] = [];
let connIds: string[] = [];
let MyName: string | null = null;
let defaultId: string = "P2P-Live-Web-default-Id";
let peer: Peer = new Peer();
let guests = [];
let guest: any = null;
let root: any = null;
let peerId = ref<string>();
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
