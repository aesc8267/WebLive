<template>
  <!-- <el-affix position="top" :offset="0" > -->
  <!-- <div class="live-nav-div" :class="{'is-close':modelValue}" > -->
  <div class="live-nav" :class="['is-open', { 'is-close': isClose }]">
    <RouterLink
      :to="{
        path: '/host',
        query: {},
      }"
    >
      <img
        class="live-nav-logo"
        src="/src/assets/images/BBSkip.png"
        alt="开启直播！"
      />
    </RouterLink>
    <el-input
      class="live-nav-input"
      v-model="searchInfo"
      placeholder="Bing搜索"
      @keyup.enter="search"
    >
      <template #suffix>
        <IconSearch @click="search" />
      </template>
    </el-input>
    <div class="live-nav-right">
      <IconLike />
      <IconFriends />

      <IconMessage />

      <el-dropdown :class="['drop-menu', { 'not-show': !isShow }]">
        <IconHistory />
        <template #dropdown>
          <HistoryItem v-for="(item, index) in historyList" :key="index" @click="join(item.peerid,item.host,item.isOpen)">
            <template #cover>
              <img :src="item.cover" alt="eden" />
            </template>
            <template #title>
              <b>{{ item.title }} </b>
            </template>
            <template #time>
              <p>{{ item.time }}</p>
            </template>
            <template #host>
              <p>{{ item.host }}</p>
            </template>
          </HistoryItem>
        </template>
      </el-dropdown>
      <IconSubscribe />
    </div>
    <div
      :class="['live-nav-avator', { 'not-show': isShow }]"
      @click="dialogStore.changeLoginDialog"
    >
      <img src="/src/assets/images/avatar.svg" alt="头像" />
    </div>
    <el-dropdown :class="['drop-menu', { 'not-show': !isShow }]">
      <div class="live-nav-avator">
        <img :src="avatar" alt="头像" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="dialogStore.changeUserInfoDialog"
            >修改信息</el-dropdown-item
          >
          <el-dropdown-item @click="dialogStore.changeUpdatePasswordDialog"
            >修改密码</el-dropdown-item
          >
          <el-dropdown-item @click="useUserStore().signout()"
            >退出登录</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";
const searchInfo = ref("");
import { onMounted, ref, computed, toRefs } from "vue";
import { useDialogStore } from "@/stores/dialog";
import { useRouter } from "vue-router";
interface historyItem {
  peerid: string;
  cover: string;
  title: string;
  time: string;
  host: string;
  isOpen: boolean;
}
const historyList: Array<historyItem> = [
  {
    peerid: "123456",
    cover: "public/images/eden.png",
    title: "周二情感电台",
    time: "2024/12/24",
    host: "瓶子君152",
    isOpen: true,
  },
  {
    peerid: "123456",
    cover: "public/images/blue.png",
    title: "周三欢乐五排",
    time: "2024/12/25",
    host: "瓶子君152",
    isOpen: false,
  },
];
const dialogStore = useDialogStore();
const router=useRouter()

let avatar = ref<string>();
let isShow = ref<boolean>(false);
const props = defineProps<{
  isClose: boolean;
}>();
let { isClose } = toRefs(props);

const engine = "https://www.bing.com/?q=";
onMounted(() => {
  let isLogin = localStorage.getItem("isLogin");
  if (isLogin) {
    isShow.value = true;
  }
  let temp = localStorage.getItem("avatar");
  if (temp !== null) {
    avatar.value = "/public/avatar/" + temp;
    console.log(temp);
  } else {
    avatar.value = "/src/assets/images/avatar.svg";
  }
});
const search = () => {
  window.open(engine + searchInfo.value, "_blank");
};
const join =(peerid:string,name:string,isOpen:boolean)=>{
  if(isOpen){
    router.push({
      path: "/audience",
      query: {
        id: peerid,
        name:name,
      },
    });
  }
  else {
    ElMessage.error("主包没有开播！");
  }
}
</script>
<style lang="scss" scoped>
.live-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0.6rem;
  background-color: #f8eaf0;
  overflow: hidden;
  border: solid 0.063rem #d3c2ca;
  svg {
    height: 100%;
    cursor: pointer;
  }
  &-right {
    display: flex;
    justify-content: center;
    // margin-left: 3rem;
    padding: 0 0;
    background-color: #f2e5ea;
    // border-radius: 1.25rem;
    // border: solid 0.063rem #d3c2ca;
    >*{
      transition:  transform 0.3s ease;
    &:hover{
      transform:scale(1.2)
    }
    }
  }
  &-input {
    // margin-left: 4rem;
    padding: 0 0;
    background-color: #ffffff;
    overflow: hidden;
    border: solid 0.063rem #81737a;
    border-radius: 1.25rem;
    flex: 0.7;
    :deep(.el-input__inner) {
      height: 100%;
      width: auto;
      border: none;
    }
    svg {
      transform: translate(0.6rem, 0);
    }
  }
  button {
    // height: 100%;
    //background: none;
    border: none;
    padding: 0px;
    margin: 0;
    transform: translate(1rem, 0);
    cursor: pointer;
    svg {
      height: 100%;
      position: relative;
    }
  }
}

.live-nav-input > * {
  padding-right: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
  box-shadow: none; // 消除蓝框边框
}
.is-open {
  z-index: 100;
  clear: all;
  position: fixed;
  top: 0%;
  width: 100%;
  height: 4rem;
  box-shadow: 0 0 5px 1px rgba(158, 179, 193, 0.5);
  transition-property: transform;
  transition: all cubic-bezier(0.22, 0.58, 0.12, 0.98) 0.4s;
}
.is-close {
  transform: translate(0, -100%);
}
.live-nav-avator {
  position: relative;
  right: 1.5rem;
  bottom: 0.1rem;
  height: 3rem;
  width: 3rem;
  border-radius: 50%;
  overflow: hidden;
  // border: #81737a solid 0.063rem;
  margin: 0 0.1rem 0.3rem 0;
  img {
    height: 110%;
    object-fit: cover;
  }
}
.not-show {
  display: none;
}
.live-nav-logo {
  height: 110%;
  position: relative;
  margin-left: 3rem;
      transition:  transform 0.3s ease;
    &:hover{
      transform:scale(1.2)
    }
}
.button-group {
  display: flex;
  justify-content: start;
  padding-left: 2.3rem;
  button {
    width: 12%;
    margin: 0.1rem;
  }
}
.drop-menu {
  transition: transform 0.3s ease;
  * {
    outline: none;
  }
  &:hover{
    transform: scale(1.2);
  }
}
</style>
