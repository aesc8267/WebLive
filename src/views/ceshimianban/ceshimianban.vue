<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col page">
    <div class="flex-row justify-end items-center">
      <img
        class="image_2"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=32e4e1ef4f2198bc7aae41828d7c8ced.png"
      />
      <img
        class="image ml-47"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=dca4bd98a4049e6ac3004e7e110c2518.png"
      />
    </div>
    <div class="flex-row mt-116">
      <div class="flex-row items-center self-start section_4">
        <div class="flex-row">
          <div class="section_3"></div>
          <div class="flex-col items-start ml-11">
            <span class="font">昵称</span>
            <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
          </div>
        </div>
        <div class="flex-col items-end">
          <span class="font_2">11:45</span>
          <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
        </div>
      </div>
      <div class="flex-col section">
        <div class="flex-col group">
          <div class="flex-row items-center section_2">
            <div class="flex-row shrink-0">
              <div class="section_3"></div>
              <div class="flex-col items-start ml-11">
                <span class="font">昵称</span>
                <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
              </div>
            </div>
            <div class="flex-col items-end flex-1">
              <span class="font_2">11:45</span>
              <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
            </div>
          </div>
          <div class="mt-4 flex-row items-center section_2">
            <div class="flex-row shrink-0">
              <div class="section_3"></div>
              <div class="flex-col items-start ml-11">
                <span class="font">昵称</span>
                <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
              </div>
            </div>
            <div class="flex-col items-end flex-1">
              <span class="font_2">11:45</span>
              <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
            </div>
          </div>
          <div class="mt-4 flex-row items-center section_2">
            <div class="flex-row shrink-0">
              <div class="section_3"></div>
              <div class="flex-col items-start ml-11">
                <span class="font">昵称</span>
                <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
              </div>
            </div>
            <div class="flex-col items-end flex-1">
              <span class="font_2">11:45</span>
              <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
            </div>
          </div>
          <div class="mt-4 flex-row items-center section_2">
            <div class="flex-row shrink-0">
              <div class="section_3"></div>
              <div class="flex-col items-start ml-11">
                <span class="font">昵称</span>
                <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
              </div>
            </div>
            <div class="flex-col items-end flex-1">
              <span class="font_2">11:45</span>
              <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
            </div>
          </div>
          <div class="mt-4 flex-row items-center section_2">
            <div class="flex-row shrink-0">
              <div class="section_3"></div>
              <div class="flex-col items-start ml-11">
                <span class="font">昵称</span>
                <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
              </div>
            </div>
            <div class="flex-col items-end flex-1">
              <span class="font_2">11:45</span>
              <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
            </div>
          </div>
          <div class="mt-4 flex-row items-center section_2">
            <div class="flex-row shrink-0">
              <div class="section_3"></div>
              <div class="flex-col items-start ml-11">
                <span class="font">昵称</span>
                <span class="font_3 mt-7">对话内容1111111111111111111111111111111111111111111111111111</span>
              </div>
            </div>
            <div class="flex-col items-end flex-1">
              <span class="font_2">11:45</span>
              <div class="flex-col justify-start items-center text-wrapper mt-7"><span class="font_4">1</span></div>
            </div>
          </div>
        </div>
        <div class="shrink-0 section_5"></div>
      </div>
      <img
        class="self-start image_2 image_3"
        src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=32e4e1ef4f2198bc7aae41828d7c8ced.png"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .ml-47 {
    margin-left: 2.94rem;
  }
  .mt-116 {
    margin-top: 7.25rem;
  }
  .ml-11 {
    margin-left: 0.69rem;
  }
  .mt-7 {
    margin-top: 0.44rem;
  }
  .page {
    padding: 1.38rem 3.56rem 13rem;
    background-color: #ffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .image_2 {
      width: 0.56rem;
      height: 0.31rem;
    }
    .image {
      margin-right: 32.31rem;
      width: 0.31rem;
      height: 0.56rem;
    }
    .section_4 {
      margin-top: 6.31rem;
      padding: 0.63rem 0.38rem 0.31rem 0.63rem;
      background-color: #ffffff;
      border-radius: 1.25rem;
      overflow: hidden;
      width: 17.5rem;
      height: 3.56rem;
      border-left: solid 0.063rem #d6c2c4;
      border-right: solid 0.063rem #d6c2c4;
      border-top: solid 0.063rem #d6c2c4;
      border-bottom: solid 0.063rem #d6c2c4;
    }
    .section {
      margin-left: 10.13rem;
      padding: 0 0.63rem;
      background-color: #fff8f7;
      border-radius: 1.88rem;
      box-shadow: 0rem 0rem 1.25rem #00000026;
      overflow: hidden;
      width: 18.75rem;
      height: 25rem;
      .group {
        padding: 1.25rem 0 0.25rem;
        .section_2 {
          padding: 0.63rem 0.38rem 0.25rem 0.63rem;
          background-color: #ffffff;
          border-radius: 1.25rem;
          overflow: hidden;
          border-left: solid 0.063rem #d6c2c4;
          border-right: solid 0.063rem #d6c2c4;
          border-top: solid 0.063rem #d6c2c4;
          border-bottom: solid 0.063rem #d6c2c4;
        }
      }
      .section_5 {
        margin-bottom: -3.06rem;
        background-color: #ffffff;
        border-radius: 1.25rem;
        overflow: hidden;
        height: 3.56rem;
        border-left: solid 0.063rem #d6c2c4;
        border-right: solid 0.063rem #d6c2c4;
        border-top: solid 0.063rem #d6c2c4;
        border-bottom: solid 0.063rem #d6c2c4;
      }
    }
    .section_3 {
      background-color: #d9d9d9;
      border-radius: 50%;
      width: 2.25rem;
      height: 2.25rem;
    }
    .font {
      font-size: 1rem;
      font-family: Alibaba PuHuiTi;
      line-height: 0.9rem;
      color: #22191b;
    }
    .font_3 {
      font-size: 0.88rem;
      font-family: Alibaba PuHuiTi;
      line-height: 0.8rem;
      color: #524345;
    }
    .font_2 {
      font-size: 0.88rem;
      font-family: Alibaba PuHuiTi;
      line-height: 0.62rem;
      color: #524345;
    }
    .text-wrapper {
      padding: 0.25rem 0;
      background-color: #ba1a1a;
      border-radius: 1.88rem;
      width: 1.13rem;
      border-left: solid 0.063rem #d6c2c4;
      border-right: solid 0.063rem #d6c2c4;
      border-top: solid 0.063rem #d6c2c4;
      border-bottom: solid 0.063rem #d6c2c4;
      .font_4 {
        font-size: 0.63rem;
        font-family: Alibaba PuHuiTi;
        line-height: 0.43rem;
        color: #ffffff;
      }
    }
    .image_3 {
      margin-left: 9.5rem;
      margin-top: 1.81rem;
    }
  }
</style>