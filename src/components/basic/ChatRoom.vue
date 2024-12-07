<template>
  <div class="chat-room">
    <div class="chat-room-head">
      <div class="chat-room-head-avator">
        <img src="/src/assets/images/live/152avator.avif" alt="头像">
      </div>
      <div class="chat-room-head-title">
        <h2>{{ roomName }}</h2>
        <h3>{{ roomAbout }}</h3>
      </div>
    </div>
    <div class="chat-room-body">
    <div class="chat-room-content" >
      <div v-for="(item,index) in messages" :key="index">{{item.message}}</div>
    </div>
    <div class="chat-room-input">
      <ElInput class="input" v-model="message" @keyup.enter="sendMessage"></ElInput>
      <button class="chat-room-button" @click="sendMessage">发送</button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import {  onBeforeUnmount, onMounted, ref } from 'vue'
const roomName=ref('瓶子君152')
const roomAbout=ref('周二读书会')
const messages=ref<Message[]>([])
const message=ref('')
let socket:WebSocket|null=null
onMounted(()=>{
  socket=new WebSocket('wss://echo.websocket.org')
  socket!.onopen=()=>{
    console.log('WebSocket 连接建立')
}
  socket!.onmessage=(event: MessageEvent)=>{
  const newMessage:Message=JSON.parse(event.data)
  messages.value!.push(newMessage)
}
socket!.onclose=()=>{
  console.log('WebSocket 连接断开')
}
})

const sendMessage=()=> {
  if (message.value.trim()){
    const newMessage:Message={
      message:message.value.trim()
    }
    socket!.send(JSON.stringify(newMessage))
    message.value=''
  }

}
onBeforeUnmount(()=>{
  if(socket){
    socket.close()
  }
})
</script>

<style lang="scss" scoped>
.chat-room {
  display: flex;
  flex-direction: column;
  border-radius: 2.5rem;
  width: 38.88rem;
  height: 42.31rem;
  border: solid 0.063rem #d3c2ca;
  overflow: hidden;
  flex: 1;
  margin: 0 1rem;
  &-content{
    height: 30rem;
  }
  &-input{
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    .input{
      width: 70%;
      *{
        padding: 0;
      }
    }
    button{
      width: 10%;
    }
  }
}
.chat-room-head{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
  border: solid 0.063rem #d3c2ca;
  height: 6rem;
  &-avator{
    height: 100%;
    margin-right: 1rem;
    padding: 1rem 0;
    img{
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
    }
  }
  &-title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 1rem;
    h3{
      margin-top: 0;
      font-size: medium;
      color:rgb(255, 212, 35);
    }
  }
}
</style>
