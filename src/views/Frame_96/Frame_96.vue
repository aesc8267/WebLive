<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col items-center page">
    <div class="section"></div>
    <span class="font text">昵称</span>
    <span class="font text_2">个人简介</span>
  </div>
</template>

<style scoped lang="scss">
  .page {
    padding: 0.81rem 0 2.13rem;
    background-color: #ffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .section {
      background-color: #d9d9d9;
      border-radius: 50%;
      width: 5rem;
      height: 5rem;
      border-left: solid 0.063rem #847375;
      border-right: solid 0.063rem #847375;
      border-top: solid 0.063rem #847375;
      border-bottom: solid 0.063rem #847375;
    }
    .font {
      font-size: 1.25rem;
      font-family: Alibaba PuHuiTi;
      line-height: 1.13rem;
      color: #000000;
    }
    .text {
      margin-top: 1rem;
    }
    .text_2 {
      margin-top: 2.88rem;
      line-height: 1.17rem;
    }
  }
</style>