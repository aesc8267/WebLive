<template>
  <div class="live-footer">
    <LiveAboutItem v-for="(room, index) in rooms" :key="index" @click="join(room.identifier)">
      <template #cover>
        <img :src="room.image" />
      </template>
      <template #title>
        <p v-if="room.title.length > 14">{{ room.title.slice(0, 14) }}...</p>
        <p v-else>{{ room.title }}</p>
      </template>
    </LiveAboutItem>
  </div>
</template>

<script setup lang="ts">
interface roomType {
  categoryId: string;
  createdTime: string;
  createdUser: string;
  identifier: string;
  image: string;
  modifiedTime: string;
  modifiedUser: string;
  num: string;
  price: string;
  priority: string;
  rid: string;
  sellPoint: string;
  status: string;
  title: string;
  uid: string;
}
import { apiRoomsHotList } from "@/api/room-controller";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const rooms = ref<Array<roomType>>();
const router = useRouter();
onMounted(() => {
  apiRoomsHotList().then((res) => {
    console.log("hot_list", res);
    rooms.value = res!.data.data as Array<roomType>;
    console.log(rooms.value[0].rid);
  });
});
function join(peerId:string) {
    router.push({
      path: "/audience",
      query: { id: peerId, name: localStorage.getItem("username") },
    });
    window.location.reload();
}
</script>

<style lang="scss" scoped>
.live-footer {
  padding: 0 0 0 2.5rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
