import { createRouter, createWebHistory } from 'vue-router';
import Zhuye from '../views/zhuye/zhuye.vue';
import Ion_gift from '../views/ion_gift/ion_gift.vue';
import Share_reviews from '../views/share_reviews/share_reviews.vue';
import More_vert from '../views/more_vert/more_vert.vue';
import Jihuoxiaoguotu from '../views/jihuoxiaoguotu/jihuoxiaoguotu.vue';
import Daohanglananniuxuantingxiaoguo from '../views/daohanglananniuxuantingxiaoguo/daohanglananniuxuantingxiaoguo.vue';
import Frame_11 from '../views/Frame_11/Frame_11.vue';
import Shurukuangshurushiwenziyanse from '../views/shurukuangshurushiwenziyanse/shurukuangshurushiwenziyanse.vue';
import Daohanglanxiaoxizhuangtai from '../views/daohanglanxiaoxizhuangtai/daohanglanxiaoxizhuangtai.vue';
import Beijinghuabu from '../views/beijinghuabu/beijinghuabu.vue';
import Ceshimianban from '../views/ceshimianban/ceshimianban.vue';
import Frame_95 from '../views/Frame_95/Frame_95.vue';
import Frame_96 from '../views/Frame_96/Frame_96.vue';
import Frame_97 from '../views/Frame_97/Frame_97.vue';
import Frame_98 from '../views/Frame_98/Frame_98.vue';
import Zhuye_1 from '../views/zhuye_1/zhuye_1.vue';
import Plugin_file_cover_1 from '../views/Plugin_file_cover_1/Plugin_file_cover_1.vue';

const routes = [
  {
    path: '/',
    name: 'zhuye',
    component: Zhuye,
  },
  {
    path: '/ion_gift',
    name: 'ion_gift',
    component: Ion_gift,
  },
  {
    path: '/share_reviews',
    name: 'share_reviews',
    component: Share_reviews,
  },
  {
    path: '/more_vert',
    name: 'more_vert',
    component: More_vert,
  },
  {
    path: '/jihuoxiaoguotu',
    name: 'jihuoxiaoguotu',
    component: Jihuoxiaoguotu,
  },
  {
    path: '/daohanglananniuxuantingxiaoguo',
    name: 'daohanglananniuxuantingxiaoguo',
    component: Daohanglananniuxuantingxiaoguo,
  },
  {
    path: '/Frame_11',
    name: 'Frame_11',
    component: Frame_11,
  },
  {
    path: '/shurukuangshurushiwenziyanse',
    name: 'shurukuangshurushiwenziyanse',
    component: Shurukuangshurushiwenziyanse,
  },
  {
    path: '/daohanglanxiaoxizhuangtai',
    name: 'daohanglanxiaoxizhuangtai',
    component: Daohanglanxiaoxizhuangtai,
  },
  {
    path: '/beijinghuabu',
    name: 'beijinghuabu',
    component: Beijinghuabu,
  },
  {
    path: '/ceshimianban',
    name: 'ceshimianban',
    component: Ceshimianban,
  },
  {
    path: '/Frame_95',
    name: 'Frame_95',
    component: Frame_95,
  },
  {
    path: '/Frame_96',
    name: 'Frame_96',
    component: Frame_96,
  },
  {
    path: '/Frame_97',
    name: 'Frame_97',
    component: Frame_97,
  },
  {
    path: '/Frame_98',
    name: 'Frame_98',
    component: Frame_98,
  },
  {
    path: '/zhuye_1',
    name: 'zhuye_1',
    component: Zhuye_1,
  },
  {
    path: '/Plugin_file_cover_1',
    name: 'Plugin_file_cover_1',
    component: Plugin_file_cover_1,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
