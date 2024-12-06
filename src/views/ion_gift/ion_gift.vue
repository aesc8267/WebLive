<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col justify-start items-center relative page">
    <div class="section"></div>
    <img
      class="image pos"
      src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=78eb0cea6f5d7935e7dbd317b07b67ff.png"
    />
  </div>
</template>

<style scoped lang="scss">
  .page {
    padding: 0.44rem 0 2.5rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .section {
      background-color: #00000000;
      width: 1.31rem;
      height: 0.56rem;
    }
    .image {
      width: 2.88rem;
      height: 3.06rem;
    }
    .pos {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>