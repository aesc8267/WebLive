<template>
  <div class="app">
    <LiveHead
      :isClose="is_close"
      :changeDialog="changeDialog"
      @wheel="handleWheel"
    ></LiveHead>
    <RouterView @wheel="handleWheel($event, true)"></RouterView>
    <LiveFooter @wheel="handleWheel"></LiveFooter>
    <LiveAbout @wheel="handleWheel"></LiveAbout>
    <el-dialog
      v-model="dialog"
      :title="logInTitle"
      width="400"
    >
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model.trim="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model.trim="password"></el-input>
        </el-form-item>
        <el-form-item label="请确认密码" :class="{ disappear: !showSignUp }">
          <el-input type="password" v-model.trim="confirm_password"></el-input>
        </el-form-item>
        <el-form-item label="请上传头像" :class="{ disappear: !showSignUp }">
          <input type="file" @change="changeAvatar" accept="image/*" />
        </el-form-item>
        <el-form-item>
          <el-button
            :class="{ disappear: showSignUp }"
            type="primary"
            @click="signIn"
            >登录</el-button
          >
          <el-button
            :class="{ disappear: !showSignUp }"
            type="primary"
            @click="showSignUp = false"
            >返回登录</el-button
          >
          <el-button type="primary" @click="signUp">注册</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="dialog1"
      title="修改信息"
      width="400"
    >
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model.trim="username"></el-input>
        </el-form-item>
        <el-form-item label="更改头像">
          <input type="file" @change="changeAvatar" accept="image/*" />
        </el-form-item>
        <el-form-item>
          <el-button
            :class="{ disappear: showSignUp }"
            type="primary"
            @click="signIn"
            >确定</el-button
          >
          <el-button
            :class="{ disappear: !showSignUp }"
            type="primary"
            @click="showSignUp = false"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import LiveHead from "./components/LiveHead.vue";
// import LiveRoom from './components/LiveRoom.vue';
import LiveFooter from "./components/LiveFooter.vue";
import LiveAbout from "./components/LiveAbout.vue";
import { RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import { debounce } from "lodash";
import axios from "axios";

const logInTitle = ref<string>("登录");
const avatar = ref();
// const currentTime = new Date();
const dialog = ref<boolean>(false);
  const dialog1 = ref<boolean>(false);
const username = ref<string>("");
const password = ref<string>("");
const isLogIn = localStorage.getItem("isLogin") === "true";
const showSignUp = ref<boolean>(false);
const confirm_password = ref<string>("");
const signIn = () => {
  console.log(username.value, password.value);
  axios
    .post(
      "/api/users/login",
      {},
      {
        params: {
          username: username.value,
          password: password.value,
        },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.data.state == 200) {
        ElMessage.success("登录成功");
        dialog.value = false;
        const avatarUrl: string = res.data.data.avatar;
        localStorage.setItem("avatar", avatarUrl);
        localStorage.setItem("username", username.value);
        // localStorage.setItem("password", password.value);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("uid", res.data.data.uid);
        window.location.reload();
        return;
      } else {
        ElMessage.error(res.data.message);
      }
    });
  return;
};
const signUp = () => {
  console.log(avatar.value);
  logInTitle.value = "注册";
  if (!showSignUp.value) showSignUp.value = true;
  else {
    if (password.value != confirm_password.value) {
      ElMessage.error("两次密码不一致");
      return;
    }
    console.log(username.value);
    // console.log(avatar.value);
    axios
      .post(
        "/api/users/reg",
        {},
        {
          params: {
            // createdUser: username.value,
            // createdTime: currentTime,
            // modifiedUser: username.value,
            // modifiedTime: currentTime,
            // uid: 0,
            username: username.value,
            password: password.value,
            // salt: "string",
            // phone: "string",
            // email: "string",
            // gender: 0,
            avatar: avatar.value,
            // isDelete: 0,
          },
        }
      )
      .then((res) => {
        if (res.data.state == 200) {
          ElMessage.success("注册成功");
          dialog.value = false;
          showSignUp.value = false;
          signIn();
          return;
        } else {
          ElMessage.error(res.data.message);
        }
      });

    return;
  }
};

const changeAvatar = (e: Event) => {
  const inputFiles = e.target as HTMLInputElement;
  console.log(inputFiles.files![0]);
  avatar.value = inputFiles.files![0].name;
  return;
};
// import { RouterView } from 'vue-router';
onMounted(() => {
  console.log(isLogIn);
  if (isLogIn === null || isLogIn == false) {
    dialog.value = true;
  } else {
  }
});
function changeDialog() {
  if(isLogIn)dialog1.value = true;
  else dialog1.value = true;
}
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
    console.log(event.deltaY);
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
