<script setup>
  import { useRouter } from 'vue-router';
  import { reactive, onMounted } from 'vue';

  const props = defineProps({});

  const data = reactive({});

  const router = useRouter();
</script>

<template>
  <div class="page"></div>
</template>

<style scoped lang="scss">
  .page {
    background-color: #ffffff;
    width: 120rem;
    height: 59rem;
  }
</style>