<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col justify-start items-end page"><span class="text">默认收藏夹</span></div>
</template>

<style scoped lang="scss">
  .page {
    padding: 1.5rem 0;
    background-color: #ffffff;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .text {
      margin-right: 3.75rem;
      color: #000000;
      font-size: 0.63rem;
      font-family: Alibaba PuHuiTi;
      line-height: 0.58rem;
    }
  }
</style>