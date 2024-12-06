<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-row items-center page">
    <img
      class="shrink-0 image_7"
      src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=96adbec993bc2012e01500a84a3c8d63.png"
    />
    <div class="flex-col justify-start items-start flex-1 text-wrapper">
      <span class="font text">输入搜索内容</span>
    </div>
    <img
      class="shrink-0 image_2"
      src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=8b4f0f54a047fd0523d79950bda151a0.png"
    />
    <div class="flex-row shrink-0 section">
      <div class="flex-col items-center section_2">
        <img
          class="image_3"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=d67275cf281817712a3ea766e72bc031.png"
        />
        <span class="mt-10 font text_2">喜欢</span>
      </div>
      <div class="flex-col items-center section_2">
        <img
          class="image_4"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=86c805cf09037e650cb80dceb6f37612.png"
        />
        <span class="mt-10 font text_3">收藏</span>
      </div>
      <div class="flex-col items-center section_2">
        <img
          class="image_5"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=7cad0b68e3c1c7145975900c34acd6cf.png"
        />
        <span class="mt-8 font text_4">历史</span>
      </div>
      <div class="flex-col items-center section_2">
        <img
          class="image_8"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=799102e6e7bfc8c4595e6f85c4b46c5f.png"
        />
        <span class="mt-10 font text_5">好友</span>
      </div>
      <div class="flex-col items-center section_2">
        <img
          class="image_6"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=74f893dbe0e7a7eef3e8d3e0c0cd6085.png"
        />
        <span class="font text_6 mt-7">消息</span>
      </div>
      <div class="flex-col items-center section_2">
        <img
          class="image_5"
          src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=abb1f6c18c61eafa8e32388c663b02d0.png"
        />
        <span class="mt-8 font text_7">创建</span>
      </div>
    </div>
    <img
      class="shrink-0 image"
      src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=317f697eec0a5bce9c590f62a45e971e.png"
    />
  </div>
</template>

<style scoped lang="scss">
  .mt-7 {
    margin-top: 0.44rem;
  }
  .page {
    padding: 1.19rem 2.38rem 0.69rem 3.38rem;
    background-color: #fbeaeb;
    border-left: solid 0.063rem #d6c2c4;
    border-right: solid 0.063rem #d6c2c4;
    border-top: solid 0.063rem #d6c2c4;
    border-bottom: solid 0.063rem #d6c2c4;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .image_7 {
      width: 3.19rem;
      height: 3rem;
    }
    .text-wrapper {
      margin-left: 4rem;
      padding: 1.38rem 0 1.13rem;
      background-color: #ffffff;
      border-radius: 1.25rem;
      overflow: hidden;
      height: 3.75rem;
      border-left: solid 0.063rem #847375;
      border-right: solid 0.063rem #847375;
      border-top: solid 0.063rem #847375;
      border-bottom: solid 0.063rem #847375;
      .text {
        margin-left: 1.25rem;
        color: #75565b;
      }
    }
    .image_2 {
      margin-left: 0.63rem;
      border-radius: 1.25rem;
      width: 3.75rem;
      height: 3.75rem;
    }
    .section {
      margin-left: 3rem;
      background-color: #f5e4e5;
      border-radius: 1.25rem;
      height: 5.13rem;
      border-left: solid 0.063rem #d6c2c4;
      border-right: solid 0.063rem #d6c2c4;
      border-top: solid 0.063rem #d6c2c4;
      border-bottom: solid 0.063rem #d6c2c4;
      .section_2 {
        padding: 0.75rem 0;
        background-color: #ffd9de;
        border-radius: 1.25rem;
        width: 5rem;
        height: 5rem;
        .image_3 {
          width: 1.94rem;
          height: 1.63rem;
        }
        .text_2 {
          line-height: 1.14rem;
        }
        .image_4 {
          width: 1.38rem;
          height: 1.63rem;
        }
        .text_3 {
          line-height: 1.16rem;
        }
        .image_5 {
          width: 1.94rem;
          height: 1.81rem;
        }
        .text_4 {
          line-height: 1.13rem;
        }
        .image_8 {
          width: 2.13rem;
          height: 1.5rem;
        }
        .text_5 {
          line-height: 1.14rem;
        }
        .image_6 {
          width: 1.88rem;
          height: 1.88rem;
        }
        .text_6 {
          line-height: 1.12rem;
        }
        .text_7 {
          line-height: 1.15rem;
        }
      }
    }
    .font {
      font-size: 1.25rem;
      font-family: Alibaba PuHuiTi;
      line-height: 1.14rem;
      color: #524345;
    }
    .image {
      margin-left: 2.44rem;
      width: 5rem;
      height: 5rem;
    }
  }
</style>