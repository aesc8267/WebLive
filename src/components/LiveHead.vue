<template>
  <!-- <el-affix position="top" :offset="0" > -->
  <!-- <div class="live-nav-div" :class="{'is-close':modelValue}" > -->
  <div
    v-loading="Loading"
    class="live-nav"
    :class="['is-open', { 'is-close': isClose }]"
  >
    <div class="begin-live" @click="dialogStore.changeRoomInfoDialog">
      <img
        class="live-nav-logo"
        src="/src/assets/images/BBSkip.png"
        alt="开启直播！"
      />
      <p>我要开播！</p>
    </div>
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
          <LiveItem
            v-for="(item, index) in historyList?.slice(0, 4)"
            :key="index"
            @click="join(item.rid, item.createdUser)"
          >
            <template #cover>
              <img :src="item.image" alt="eden" />
            </template>
            <template #title>
              <b>{{ item.title }} </b>
            </template>
            <template #time>
              <p>{{ item.createdTime }}</p>
            </template>
            <template #host>
              <p style="font-style: italic">{{ item.createdUser }}</p>
            </template>
          </LiveItem>
        </template>
      </el-dropdown>
<!-- 订阅 -->
      <el-dropdown :class="['drop-menu', { 'not-show': !isShow }]">
        <IconSubscribe />
        <template #dropdown>
          <LiveItem
            v-for="(item, index) in collectionList?.slice(0, 4)"
            :key="index"
            @click="join(item.rid, item.createdUser)"
          >
            <template #cover>
              <img :src="item.image" alt="eden" />
            </template>
            <template #title>
              <b>{{ item.title }} </b>
            </template>
            <template #time>
              <p>{{ item.createdTime }}</p>
            </template>
            <template #host>
              <p style="font-style: italic">{{ item.createdUser }}</p>
            </template>
          </LiveItem>
        </template>
      </el-dropdown>
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
import { getHistoryList } from "@/api/history-controller";
import { apiRoomDetail } from "@/api/room-controller";
import { apiGetCollectionList } from "@/api/collection-controller";
interface historyItem {
  createdUser: string;
  createdTime: string;
  modifiedUser: string;
  modifiedTime: string;
  id: string;
  uid: string;
  rid: string;
  image: string;
  categoryId: string;
  identifier: string;
  title: string;
  sellPoint: string;
  price: string;
  num: string;
  status: string;
  priority: string;
}
interface collectionType {
  cid: string;
  uid: string;
  rid: string;
  cname: string;
  title: string;
  image: string;
  createdUser: string;
  createdTime: string;
  modifiedUser: string;
  modifiedTime: string;
}
const historyList = ref<Array<historyItem>>();
  const collectionList=ref<Array<collectionType>>()
const dialogStore = useDialogStore();
const router = useRouter();
let Loading = ref<boolean>(false);
let avatar = ref<string>();
let isShow = ref<boolean>(false);
const props = defineProps<{
  isClose: boolean;
}>();
let { isClose } = toRefs(props);

const engine = "https://www.bing.com/?q=";
onMounted(() => {
  getHistoryList().then((res) => {
    if(res!.data){
      console.log("history_list", res);
      historyList.value = res!.data.data;
    }
  });
  apiGetCollectionList().then((res)=>{
    if(res!.data){
      console.log("collection_list",res);
    collectionList.value=res!.data.data;
    }
  })
  let isLogin = localStorage.getItem("isLogin");
  if (isLogin) {
    isShow.value = true;
  }
  let temp = localStorage.getItem("avatar");
  if (temp !== null) {
    avatar.value = temp;
    console.log(temp);
  } else {
    avatar.value = "/src/assets/images/avatar.svg";
  }
});
const search = () => {
  window.open(engine + searchInfo.value, "_blank");
};
const join = (rid: string, name: string) => {
  Loading.value = true;
  apiRoomDetail(rid)
    .then((res) => {
      console.log("join", res);
      let peerid = res!.data.data.identifier;
      const status = res!.data.data.status;
      if (status === 2) {
        router
          .push({
            path: "/audience",
            query: {
              id: peerid,
              name: name,
            },
          })
          .then(() => {
            window.location.reload();
          });
      } else {
        ElMessage.error("主包没有开播！");
      }
    })
    .catch((error) => {
      console.log(error);
    });
  Loading.value = false;
};
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
    > * {
      transition: transform 0.3s ease;
      &:hover {
        transform: scale(1.2);
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
  // border: #81737a solid 0.063rem;
  margin: 0 0.1rem 0.3rem 0;
  img {
    height: 110%;
    border-radius: 50%;
    aspect-ratio: 1;
    object-fit: cover;
  }
}
.not-show {
  display: none;
}
.begin-live {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  position: relative;
  margin-left: 3rem;
  bottom: 0.4rem;
  cursor: pointer;
  p {
    font-family: fantasy;
    font-size: xx-small;
    margin: 0;
  }
  .live-nav-logo {
    height: 100%;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
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
  &:hover {
    transform: scale(1.2);
  }
}
</style>
