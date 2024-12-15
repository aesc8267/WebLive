import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import legacy from "@vitejs/plugin-legacy"
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from "unplugin-icons/vite"
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
// https://vite.dev/config/
const pathSrc = path.resolve(__dirname, 'src')
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueDevTools(),
    Icons({
      compiler: 'vue3',// 指定编译器
      autoInstall: true,// 自动安装
  }),
  legacy({
    targets: ["ie>=11"],
    additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
  }),
  AutoImport({
    // Auto import functions from Vue, e.g. ref, reactive, toRef...
    // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
    // imports: ['vue'],

    // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
    // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
    resolvers: [
      ElementPlusResolver(),

      // Auto import icon components
      // 自动导入图标组件
      IconsResolver({
        prefix: 'Icon',
      }),
    ],

    dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
  }),

  Components({
    resolvers: [
      // Auto register icon components
      // 自动注册图标组件
      IconsResolver({
        enabledCollections: ['ep'],
      }),
      // Auto register Element Plus components
      // 自动导入 Element Plus 组件
      ElementPlusResolver(),
    ],

    dts: path.resolve(pathSrc, 'components.d.ts'),
  }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server:{
    proxy:{
      '/api':{
        target:'http://localhost:8081',
        changeOrigin:true,
        rewrite:path=>path.replace(/^\/api/,'')
      }
    }
  },
})
