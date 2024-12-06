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
      src="https://ide.code.fun/api/image?token=675297ca4ae84d00121f1e5e&name=33b3967ffa2e8bbf35e64d943aa84378.png"
    />
  </div>
</template>

<style scoped lang="scss">
  .page {
    padding: 0.31rem 0 0.5rem;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    .image {
      width: 2.94rem;
      height: 2.69rem;
    }
  }
</style>