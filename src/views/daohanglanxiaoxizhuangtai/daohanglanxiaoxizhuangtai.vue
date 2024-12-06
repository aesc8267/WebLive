<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-row component">
    <div class="flex-col items-center group equal-division-item">
      <img
        class="image"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=024997f43b55659182f4db5c67ecb386.png"
      />
      <span class="font mt-3">喜欢</span>
    </div>
    <div class="flex-col items-center group equal-division-item">
      <img
        class="image"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=59f230087046ccd54bdecf27f86f40f6.png"
      />
      <span class="font text_2 mt-3">收藏</span>
    </div>
    <div class="flex-col items-center group equal-division-item">
      <img
        class="image"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=69cab087b0873213b67a13dc88cb35af.png"
      />
      <span class="font text_3 mt-3">历史</span>
    </div>
    <div class="flex-col group equal-division-item_2">
      <div class="flex-col justify-start items-center relative">
        <img
          class="image"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=edb9bb77386fbefd486a489d8b5ffa01.png"
        />
        <div class="section pos"></div>
      </div>
      <span class="font text_4 text_5 mt-3">好友</span>
    </div>
    <div class="flex-col group equal-division-item_2">
      <div class="flex-col justify-start items-center relative">
        <img
          class="image"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=3df557f161be0facb8163057020c600d.png"
        />
        <div class="flex-col justify-start text-wrapper pos_2"><span class="text">99+</span></div>
      </div>
      <span class="font text_4 text_6 mt-3">消息</span>
    </div>
    <div class="flex-col items-center group equal-division-item">
      <img
        class="image"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=dd8e63e29f66b317b432cd9dd0c6361f.png"
      />
      <span class="font text_7 mt-3">创建</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .mt-3 {
    margin-top: 0.19rem;
  }
  .component {
    background-color: #f5e4e5;
    border-radius: 1.25rem;
    border-left: solid 0.063rem #d6c2c4;
    border-right: solid 0.063rem #d6c2c4;
    border-top: solid 0.063rem #d6c2c4;
    border-bottom: solid 0.063rem #d6c2c4;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .group {
      flex: 1 1 5rem;
      .image {
        width: 2.25rem;
        height: 2.25rem;
      }
      .font {
        font-size: 1.25rem;
        font-family: Alibaba PuHuiTi;
        line-height: 1.14rem;
        color: #524345;
      }
      .text_2 {
        line-height: 1.16rem;
      }
      .text_3 {
        line-height: 1.13rem;
      }
      .section {
        background-color: #ba1a1a;
        border-radius: 1.88rem;
        width: 1.25rem;
        height: 1.25rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
      }
      .pos {
        position: absolute;
        right: 0;
        top: 0;
      }
      .text_4 {
        margin-left: 0.25rem;
      }
      .text_5 {
        line-height: 1.14rem;
      }
      .text-wrapper {
        padding: 0.38rem 0;
        background-color: #ba1a1a;
        border-radius: 1.88rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
        .text {
          color: #ffffff;
          font-size: 0.63rem;
          font-family: Alibaba PuHuiTi;
          line-height: 0.45rem;
        }
      }
      .pos_2 {
        position: absolute;
        right: 0;
        top: 0;
      }
      .text_6 {
        line-height: 1.12rem;
      }
      .text_7 {
        line-height: 1.15rem;
      }
    }
    .equal-division-item {
      padding: 0.75rem 0;
      border-radius: 1.25rem;
      height: 5rem;
    }
    .equal-division-item_2 {
      padding: 0.75rem 1rem;
      border-radius: 1.25rem;
      height: 5rem;
    }
  }
</style>