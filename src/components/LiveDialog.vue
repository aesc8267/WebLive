<template>
  <Teleport to="body">
    <!-- 修改密码 -->
    <el-dialog v-model="updatePasswordDialog" title="修改密码" width="400">
      <el-form label-width="100px">
        <el-form-item label="旧密码">
          <el-input type="password" v-model.trim="oldPassword"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model.trim="newPassword"></el-input>
        </el-form-item>
        <el-form-item label="重复输入">
          <el-input
            type="password"
            v-model.trim="confirmPassword"
            @keyup.enter="
              changePassword(oldPassword, newPassword, confirmPassword)
            "
          ></el-input>
        </el-form-item>
        <el-form-item class="button-group">
          <el-button
            type="primary"
            @click="changePassword(oldPassword, newPassword, confirmPassword)"
            >修改</el-button
          >
          <el-button
            type="primary"
            @click="dialogStore.changeUpdatePasswordDialog"
            >取消</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
    <!-- 登录 -->
    <el-dialog v-model="loginDialog" :title="logInTitle" width="400">
      <el-form label-width="100px">
        <el-form-item label="用户名">
          <el-input v-model.trim="username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            type="password"
            v-model.trim="password"
            @keyup.enter="signIn"
          ></el-input>
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
    <!-- 修改信息 -->
    <el-dialog v-model="userInfoDialog" title="修改信息" width="400">
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
    <!-- 房间信息 -->
  </Teleport>
</template>
<script lang="ts" setup name="LiveDialog">
import { useDialogStore } from "@/stores/dialog";
import { useUserStore } from "@/stores/user";
import { changePassword } from "@/api/user-controller";
import axios from "axios";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
const dialogStore = useDialogStore();
// const loginDialog = dialogStore.loginDialog
// const userInfoDialog = dialogStore.userInfoDialog
// const updatePasswordDialog = dialogStore.updatePasswordDialog
const changeLoginDialog = dialogStore.changeLoginDialog;

const { loginDialog, userInfoDialog, updatePasswordDialog } =
  storeToRefs(dialogStore);

const logInTitle = ref<string>("登录");
const avatar = ref();
// const currentTime = new Date();
const username = ref<string>("");
const password = ref<string>("");
const isLogIn = localStorage.getItem("isLogin") === "true";
const showSignUp = ref<boolean>(false);
const confirm_password = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");
const oldPassword = ref<string>("");
const signIn = () => {
  // console.log(username.value, password.value);
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
      // console.log(res);
      if (res.data.state == 200) {
        ElMessage.success("登录成功");
        changeLoginDialog();
        avatar.value = res.data.data.avatar;
        localStorage.setItem("avatar", avatar.value);
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);
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
  // console.log(avatar.value);
  logInTitle.value = "注册";
  if (!showSignUp.value) showSignUp.value = true;
  else {
    if (password.value != confirm_password.value) {
      ElMessage.error("两次密码不一致");
      return;
    }
    // console.log(username.value);
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
          changeLoginDialog();
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
  // console.log(inputFiles.files![0]);
  avatar.value = inputFiles.files![0].name;
  return;
};
// import { RouterView } from 'vue-router';
onMounted(() => {
  if (isLogIn === null || isLogIn == false) {
    changeLoginDialog();
  } else {
    useUserStore()
      .signIn()
      .then((res) => {
        if (res) {
          username.value = localStorage.getItem("username")!;
          password.value = localStorage.getItem("password")!;
          avatar.value = localStorage.getItem("avatar")!;
        } else {
          useUserStore().signout();
        }
      });
  }
});
</script>
<style lang="scss">
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
