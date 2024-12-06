<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col justify-start items-center page"><span class="text">登录</span></div>
</template>

<style scoped lang="scss">
  .page {
    padding: 1.75rem 0;
    background-color: #ffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .text {
      color: #000000;
      font-size: 1.25rem;
      font-family: Alibaba PuHuiTi;
      line-height: 1.11rem;
    }
  }
</style>