<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="flex-col justify-start items-center page">
    <img
      class="image"
      src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=718ae128a717cec59591e5d019254232.png"
    />
  </div>
</template>

<style scoped lang="scss">
  .page {
    padding: 0.63rem 0;
    background-color: #ca496a;
    border-radius: 1.25rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .image {
      width: 2.81rem;
      height: 2.5rem;
    }
  }
</style>