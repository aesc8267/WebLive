<template>
  <div
  class="img-upload">
  <el-upload
    ref="upload"
    :http-request="uploadFile"
    class="avatar-uploader"
    :auto-upload="false"
    :limit="1"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon> -->
    <template #trigger>
      <el-button type="primary">select file</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip text-red">
        limit 1 file, new file will cover the old file
      </div>
    </template>

  </el-upload>
  <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
    </el-button>
</div>

</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { genFileId } from "element-plus";
// import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadInstance, UploadRawFile } from "element-plus";
import { apiUpload } from "@/api/HelloPicture";
const upload = ref<UploadInstance>();
const imageUrl = ref("");
const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
const submitUpload=()=>{
  upload.value!.submit();
}
const uploadFile:UploadProps['httpRequest']=({file,onSuccess,onError})=>{
  return apiUpload(file).then(
    (res)=>{
      console.log('图片',res);
      onSuccess(res!.data)
    }
  ).catch((err)=>{
    onError(err);
  })
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.img-upload{
  width: 100vw;
  height: 50vh;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
}
</style>
