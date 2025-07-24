import type { RouteRecordRaw } from 'vue-router'
import BookmarkConverter from '@/tools/bookmark-converter/index.vue'

const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/',
    name: 'Bookmark',
    component: BookmarkConverter
  },
  // 404 页面
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/404.vue')
  // }
]

export default routes