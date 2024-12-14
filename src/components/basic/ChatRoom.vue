<template>
  <div class="chat-room">
    <div class="chat-room-head">
      <p>聊天室</p>
    </div>
    <!-- <div class="chat-room-body">
      <el-scrollbar class="chat-room-content" ref="scrollbar">
        <p v-for="(item, index) in messages" :key="index">
          {{ item.message }}
        </p>
      </el-scrollbar>
      <div class="chat-room-input">
        <div class="chat-room-input-func"></div>
        <ElInput class="input" v-model="message" @keyup.enter="sendMessage">
          <template #suffix>
            <button class="chat-room-button" @click="sendMessage">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="60" height="60" rx="20" fill="#795832" />
                <mask
                  id="mask0_282_1419"
                  style="mask-type: alpha"
                  maskUnits="userSpaceOnUse"
                  x="10"
                  y="10"
                  width="40"
                  height="40"
                >
                  <rect x="10" y="10" width="40" height="40" fill="white" />
                </mask>
                <g mask="url(#mask0_282_1419)">
                  <path
                    d="M27.75 29.65V35.25C27.75 35.7458 27.9177 36.1615 28.2531 36.4969C28.5885 36.8323 29.0042 37 29.5 37C29.9958 37 30.4115 36.8323 30.7469 36.4969C31.0823 36.1615 31.25 35.7458 31.25 35.25V29.65L32.825 31.225C33.1458 31.5458 33.5542 31.7063 34.05 31.7063C34.5458 31.7063 34.9542 31.5458 35.275 31.225C35.5958 30.9042 35.7563 30.4958 35.7563 30C35.7563 29.5042 35.5958 29.0958 35.275 28.775L30.725 24.225C30.375 23.875 29.9667 23.7 29.5 23.7C29.0333 23.7 28.625 23.875 28.275 24.225L23.725 28.775C23.4042 29.0958 23.2438 29.5042 23.2438 30C23.2438 30.4958 23.4042 30.9042 23.725 31.225C24.0458 31.5458 24.4542 31.7063 24.95 31.7063C25.4458 31.7063 25.8542 31.5458 26.175 31.225L27.75 29.65ZM29.5 47.5C27.0792 47.5 24.8042 47.0406 22.675 46.1219C20.5458 45.2031 18.6937 43.9563 17.1188 42.3813C15.5437 40.8063 14.2969 38.9542 13.3781 36.825C12.4594 34.6958 12 32.4208 12 30C12 27.5792 12.4594 25.3042 13.3781 23.175C14.2969 21.0458 15.5437 19.1937 17.1188 17.6188C18.6937 16.0437 20.5458 14.7969 22.675 13.8781C24.8042 12.9594 27.0792 12.5 29.5 12.5C31.9208 12.5 34.1958 12.9594 36.325 13.8781C38.4542 14.7969 40.3063 16.0437 41.8813 17.6188C43.4563 19.1937 44.7031 21.0458 45.6219 23.175C46.5406 25.3042 47 27.5792 47 30C47 32.4208 46.5406 34.6958 45.6219 36.825C44.7031 38.9542 43.4563 40.8063 41.8813 42.3813C40.3063 43.9563 38.4542 45.2031 36.325 46.1219C34.1958 47.0406 31.9208 47.5 29.5 47.5ZM29.5 44C33.4083 44 36.7188 42.6438 39.4312 39.9312C42.1438 37.2188 43.5 33.9083 43.5 30C43.5 26.0917 42.1438 22.7813 39.4312 20.0688C36.7188 17.3563 33.4083 16 29.5 16C25.5917 16 22.2813 17.3563 19.5688 20.0688C16.8563 22.7813 15.5 26.0917 15.5 30C15.5 33.9083 16.8563 37.2188 19.5688 39.9312C22.2813 42.6438 25.5917 44 29.5 44Z"
                    fill="white"
                  />
                </g>
              </svg>
            </button>
          </template>
        </ElInput>
      </div>
    </div> -->
    <div class="chat-room-footer"></div>
  </div>
</template>

<script setup lang="ts">
// import type { ElScrollbar } from "element-plus";
// import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";
// const messages = ref<Message[]>([]);
// const message = ref("");
// const scrollbar = ref<InstanceType<typeof ElScrollbar > |null>(null);
// let socket: WebSocket | null = null;
// onMounted(() => {
//   socket = new WebSocket("wss://echo.websocket.org");
//   socket!.onopen = () => {
//     console.log("WebSocket 连接建立");
//   };
//   socket!.onmessage = (event: MessageEvent) => {
//     const newMessage: Message = JSON.parse(event.data);
//     messages.value!.push(newMessage);
//     nextTick(() => {
//       scrollbar.value!.scrollTo({top:scrollbar.value!.wrapRef!.scrollHeight})
//     })
//   };
//   socket!.onclose = () => {
//     console.log("WebSocket 连接断开");
//   };
// });

// const sendMessage = () => {
//   if (message.value.trim()) {
//     const newMessage: Message = {
//       message: message.value.trim(),
//     };
//     socket!.send(JSON.stringify(newMessage));
//     message.value = "";
//   }
// };
// onBeforeUnmount(() => {
//   if (socket) {
//     socket.close();
//   }
// });
</script>

<style lang="scss" scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  border-radius: 2.5rem;
  border: solid 0.063rem #d3c2ca;
  overflow: hidden;
  flex: 1;
  margin: 0 1rem;
  &-content {
    padding: 1rem;
    height: 30rem;
  }
  &-input {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem;
    border-radius: 1rem;

    .input {
      width: 70%;
      height: 2rem;
      & >*{
        padding-right: 0px;
        padding-top: 0px;
        padding-bottom: 0px;
      }
      :deep(.el-input__inner) {
      height: 100%;
      width: auto;
      border: none;
    }
    }
    button {
      height: 100%;
      background: none;
      border: none;
      padding: 0px;
      margin: 0;
      transform: translate(1rem,0);
      cursor: pointer;
      svg {
        height: 100%;
        position: relative;
      }
    }
  }
}
.chat-room-head {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  border: solid 0.063rem #d3c2ca;
  height: 5rem;
}
</style>
