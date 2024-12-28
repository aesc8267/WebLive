<template>
  <Teleport to="body">
    <div v-loading.fullscreen.lock="loading">
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
            <el-input
              type="password"
              v-model.trim="confirm_password"
            ></el-input>
          </el-form-item>
          <el-form-item label="请上传头像" :class="{ disappear: !showSignUp }">
            <el-upload
              :class="{ disappear: !showSignUp }"
              ref="upload"
              :http-request="uploadAvatar"
              class="avatar-uploader"
              :auto-upload="false"
              :limit="1"
              :on-exceed="handleExceed"
              :before-upload="beforeUpload"
            >
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip text-red">最多上传一个文件！</div>
              </template>
            </el-upload>
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
              style="margin-left: 0"
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
          <el-form-item label="性别">
            <el-select v-model="gender" placeholder="请选择">
              <el-option label="男" value="male"></el-option>
              <el-option label="女" value="female"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="更改头像">
            <!-- <input type="file" @change="changeAvatar" accept="image/*" /> -->
            <el-upload
              ref="changeAvatar"
              :http-request="uploadNewAvatar"
              class="avatar-uploader"
              :auto-upload="false"
              :limit="1"
              :on-exceed="changeHandleExceed"
              :before-upload="beforeUpload"
            >
              <template #trigger>
                <el-button type="primary">选择文件</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip text-red">最多上传一个文件！</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button
              :class="{ disappear: showSignUp }"
              type="primary"
              @click="
                () => {
                  changeAvatar?.submit();
                }
              "
              >确定</el-button
            >
            <el-button
              :class="{ disappear: showSignUp }"
              type="primary"
              @click="dialogStore.changeUserInfoDialog"
              >取消</el-button
            >
          </el-form-item>
        </el-form>
      </el-dialog>
      <!-- 房间信息 -->
      <ElDialog v-model="roomInfoDialog" title="房间信息" width="600">
        <div class="room-info">
          <div class="room-cover">
            <el-upload
              ref="coverUpload"
              :http-request="uploadCover"
              class="cover-uploader"
              :auto-upload="false"
              :limit="1"
              :on-exceed="handleCoverExceed"
              :before-upload="beforeUpload"
            >
              <el-icon class="cover-uploader-icon"><Plus /></el-icon>
              <template #tip>
                <div class="el-upload__tip text-red" style="overflow:hidden">
                  limit 1 file, new file will cover the old file
                </div>
              </template>
            </el-upload>
          </div>
          <div class="room-info-form">
            <el-input
              v-model.trim="roomTitle"
              placeholder="房间标题"
            ></el-input>
            <el-input
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 4 }"
              v-model.trim="roomSummary"
              placeholder="房间简介"
            ></el-input>
          </div>
        </div>
        <el-divider border-style="dashed" style="margin: 1rem 0"></el-divider>
        <div class="form-button">
          <el-button type="primary" @click="coverUpload?.submit"
            >确认</el-button
          >
          <el-button type="primary" @click="dialogStore.changeRoomInfoDialog"
            >取消</el-button
          >
        </div> </ElDialog
      >>
    </div>
  </Teleport>
</template>
<script lang="ts" setup name="LiveDialog">
import { useDialogStore } from "@/stores/dialog";
import { useUserStore } from "@/stores/user";
import { apiChangeAvatar, apiReg, changePassword } from "@/api/user-controller";
import axios from "axios";
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
// 上传文件
import { ElMessage } from "element-plus";
import { genFileId } from "element-plus";
// import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadInstance, UploadRawFile } from "element-plus";
import { apiUpload } from "@/api/HelloPicture";
import { useRouter } from "vue-router";
const roomTitle = ref<string>("");
const roomSummary = ref<string>("");
const upload = ref<UploadInstance>();
const loading = ref<boolean>(false);
const dialogStore = useDialogStore();
const changeLoginDialog = dialogStore.changeLoginDialog;
const coverUpload = ref<UploadInstance>();
const { loginDialog, userInfoDialog, updatePasswordDialog, roomInfoDialog } =
  storeToRefs(dialogStore);

const gender = ref("male");
const router = useRouter();
const logInTitle = ref<string>("登录");
const avatar = ref();
const username = ref<string>("");
const rid = ref<string>("");
const password = ref<string>("");
const isLogIn = localStorage.getItem("isLogin") === "true";
const showSignUp = ref<boolean>(false);
const confirm_password = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");
const oldPassword = ref<string>("");
const changeAvatar = ref<UploadInstance>();
const signIn = () => {
  // console.log(username.value, password.value);
  loading.value = true;
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
        loading.value = false;
        ElMessage.success("登录成功");
        console.log("login", res);
        changeLoginDialog();
        avatar.value = res.data.data.avatar;
        localStorage.setItem("avatar", avatar.value);
        localStorage.setItem("username", username.value);
        localStorage.setItem("password", password.value);
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("uid", res.data.data.uid);
        window.location.reload();
      } else {
        loading.value = false;
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
    if (!username.value || !password.value || !confirm_password.value) return;
    if (password.value != confirm_password.value) {
      ElMessage.error("两次密码不一致");
      return;
    }
    upload.value!.submit();
    return;
  }
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
          rid.value = localStorage.getItem("rid")!;
        } else {
          useUserStore().signout();
        }
      });
  }
});

// 修改信息
const changeHandleExceed: UploadProps["onExceed"] = (files) => {
  changeAvatar.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  changeAvatar.value!.handleStart(file);
};
// 账号注册
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const uploadNewAvatar: UploadProps["httpRequest"] = ({ file }) => {
  console.log(1);
  loading.value = true;
  return apiUpload(file)
    .then((res) => {
      console.log("图片", res);
      console.log(res);
      avatar.value = res!.data.data.links.url;
      console.log(avatar.value);
      apiChangeAvatar(avatar.value).then(() => {
        localStorage.setItem("avatar", avatar.value);
        signIn();
      });
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
      ElMessage.error("上传失败");
    });
};
const uploadAvatar: UploadProps["httpRequest"] = ({ file }) => {
  console.log(1);
  loading.value = true;
  return apiUpload(file) //上传图片
    .then((res) => {
      console.log("图片", res);
      avatar.value = res!.data.data.links.url;
      localStorage.setItem("avatar", avatar.value);
      apiReg(username.value, password.value, avatar.value).then((res) => {
        //进行注册
        if (res.data.state == 200) {
          ElMessage.success("注册成功");
          changeLoginDialog();
          showSignUp.value = false;
          signIn();
          return;
        } else {
          loading.value = false;
          ElMessage.error(res.data.message);
        }
      });
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
      ElMessage.error("上传失败");
    });
};
// 封面上传

const uploadCover: UploadProps["httpRequest"] = ({ file }) => {
  console.log(1);
  loading.value = true;
  return apiUpload(file)
    .then((res) => {
      console.log("图片", res);
      const imageUrl = res!.data.data.links.url;
      console.log("liveCover", imageUrl);
      dialogStore.changeRoomInfoDialog();
      loading.value = false;
      router.push({
        path: "/host",
        query: {
          roomTitle: roomTitle.value,
          roomSummary: roomSummary.value,
          coverURL: imageUrl,
        },
      });
    })
    .catch((err) => {
      loading.value = false;
      console.log(err);
      ElMessage.error("上传失败");
    });
};
const handleCoverExceed: UploadProps["onExceed"] = (files) => {
  coverUpload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  coverUpload.value!.handleStart(file);
};
//公共回调

const beforeUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg" && rawFile.type !== "image/png") {
    ElMessage.error("Avatar picture must be JPG or PNG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
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

.room-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .room-cover {
    flex: 2;
    .cover-uploader {
      width: 100%;
      height: 100%;
      .el-upload {
        width: 100%;
        aspect-ratio: 2;
        border: 1px dashed var(--el-border-color);
        border-radius: 6px;
      }
    }
  }
  &-form {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    flex: 3;
    padding-left: 1rem;
    .form-button {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
