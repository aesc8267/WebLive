<template>
  <div class="app">
    <LiveHead
      :isClose="is_close"
      @wheel="handleWheel"
    ></LiveHead>
    <RouterView
      @wheel="handleWheel($event, true)"
      class="router-view"
    ></RouterView>
    <el-divider>
      <template #default>
        <b>推荐直播</b>
      </template>
    </el-divider>
    <LiveFooter @wheel="handleWheel"></LiveFooter>
    <LiveDialog></LiveDialog>
  </div>
</template>
<script setup lang="ts">
import LiveHead from "./components/LiveHead.vue";
// import LiveRoom from './components/LiveRoom.vue';
import LiveFooter from "./components/LiveFooter.vue";
// import LiveAbout from "./components/LiveAbout.vue";
import { RouterView } from "vue-router";
import { debounce } from "lodash";
import { ref } from "vue";
const is_close = ref<boolean>(false);
const handleWheel = debounce(handleWheelOri, 100);
function handleWheelOri(event: WheelEvent, is_live?: boolean) {
  const d = document.documentElement.scrollTop;
  if (event.deltaY > 0) {
    if (d <= 64) {
      // event.preventDefault();
      is_close.value = true;
    } else if (is_close.value) return;
    else is_close.value = true;
    return;
  } else if (event.deltaY < 0) {
    // console.log(event.deltaY);
    if (event.deltaY + d <= 64) is_close.value = false;
    else if (is_live) {
      console.log("直播中不可以！");
      return;
    } else if (is_close.value) is_close.value = false;
    return;
  }
}
</script>
<style lang="scss" scoped>
.app {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  padding-bottom: 33.25rem;
  background-color: #fff8f9;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}
.disappear {
  display: none;
}
.input-file {
  :deep(.el-input__wrapper) {
    display: flex;
    justify-content: start;
    padding: 0;
  }
}
</style>
