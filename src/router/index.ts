import { createRouter, createWebHistory } from 'vue-router';
import PeerLiveAudience from '@/views/PeerLiveAudience.vue';
import PeerLiveHost from '@/views/PeerLiveHost.vue';
import PeerLiveIndex from '@/views/PeerLiveIndex.vue';
import LiveRoom from '@/components/LiveRoom.vue';

const routes = [
  {
    path: '/index',
    name: 'index',
    component: PeerLiveIndex,
  },
  {
    path: '/host',
    name: 'host',
    component: PeerLiveHost,
  },
  {
    path: '/audience',
    name: 'audience',
    component: PeerLiveAudience,
  },
  {
    path: '/',
    component: LiveRoom,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
