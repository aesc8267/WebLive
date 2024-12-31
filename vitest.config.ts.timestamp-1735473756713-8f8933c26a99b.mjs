// vitest.config.ts
import { fileURLToPath as fileURLToPath2 } from "node:url";
import { mergeConfig, defineConfig as defineConfig2, configDefaults } from "file:///D:/Desktop/WEB/WebLive/node_modules/vitest/dist/config.js";

// vite.config.ts
import { fileURLToPath, URL as URL2 } from "node:url";
import { defineConfig } from "file:///D:/Desktop/WEB/WebLive/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/Desktop/WEB/WebLive/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueDevTools from "file:///D:/Desktop/WEB/WebLive/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
import legacy from "file:///D:/Desktop/WEB/WebLive/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import path from "path";
import AutoImport from "file:///D:/Desktop/WEB/WebLive/node_modules/unplugin-auto-import/dist/vite.js";
import IconsResolver from "file:///D:/Desktop/WEB/WebLive/node_modules/unplugin-icons/dist/resolver.js";
import Icons from "file:///D:/Desktop/WEB/WebLive/node_modules/unplugin-icons/dist/vite.js";
import { ElementPlusResolver } from "file:///D:/Desktop/WEB/WebLive/node_modules/unplugin-vue-components/dist/resolvers.js";
import Components from "file:///D:/Desktop/WEB/WebLive/node_modules/unplugin-vue-components/dist/vite.js";
var __vite_injected_original_dirname = "D:\\Desktop\\WEB\\WebLive";
var __vite_injected_original_import_meta_url = "file:///D:/Desktop/WEB/WebLive/vite.config.ts";
var pathSrc = path.resolve(__vite_injected_original_dirname, "src");
var vite_config_default = defineConfig({
  base: "./",
  plugins: [
    vue(),
    vueDevTools(),
    Icons({
      compiler: "vue3",
      // 指定编译器
      autoInstall: true
      // 自动安装
    }),
    legacy({
      targets: ["ie>=11"],
      additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
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
          prefix: "Icon"
        })
      ],
      dts: path.resolve(pathSrc, "auto-imports.d.ts")
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ["ep"]
        }),
        // Auto register Element Plus components
        // 自动导入 Element Plus 组件
        ElementPlusResolver()
      ],
      dts: path.resolve(pathSrc, "components.d.ts")
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL2("./src", __vite_injected_original_import_meta_url))
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        rewrite: (path2) => path2.replace(/^\/api/, "")
      }
    }
  }
});

// vitest.config.ts
var __vite_injected_original_import_meta_url2 = "file:///D:/Desktop/WEB/WebLive/vitest.config.ts";
var vitest_config_default = mergeConfig(
  vite_config_default,
  defineConfig2({
    test: {
      environment: "jsdom",
      exclude: [...configDefaults.exclude, "e2e/**"],
      root: fileURLToPath2(new URL("./", __vite_injected_original_import_meta_url2))
    }
  })
);
export {
  vitest_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyIsICJ2aXRlLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXERlc2t0b3BcXFxcV0VCXFxcXFdlYkxpdmVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXERlc2t0b3BcXFxcV0VCXFxcXFdlYkxpdmVcXFxcdml0ZXN0LmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovRGVza3RvcC9XRUIvV2ViTGl2ZS92aXRlc3QuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ25vZGU6dXJsJ1xuaW1wb3J0IHsgbWVyZ2VDb25maWcsIGRlZmluZUNvbmZpZywgY29uZmlnRGVmYXVsdHMgfSBmcm9tICd2aXRlc3QvY29uZmlnJ1xuaW1wb3J0IHZpdGVDb25maWcgZnJvbSAnLi92aXRlLmNvbmZpZydcblxuZXhwb3J0IGRlZmF1bHQgbWVyZ2VDb25maWcoXG4gIHZpdGVDb25maWcsXG4gIGRlZmluZUNvbmZpZyh7XG4gICAgdGVzdDoge1xuICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbScsXG4gICAgICBleGNsdWRlOiBbLi4uY29uZmlnRGVmYXVsdHMuZXhjbHVkZSwgJ2UyZS8qKiddLFxuICAgICAgcm9vdDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuLycsIGltcG9ydC5tZXRhLnVybCkpLFxuICAgIH0sXG4gIH0pLFxuKVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxEZXNrdG9wXFxcXFdFQlxcXFxXZWJMaXZlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxEZXNrdG9wXFxcXFdFQlxcXFxXZWJMaXZlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9EZXNrdG9wL1dFQi9XZWJMaXZlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB2dWVEZXZUb29scyBmcm9tICd2aXRlLXBsdWdpbi12dWUtZGV2dG9vbHMnXG5cbmltcG9ydCBsZWdhY3kgZnJvbSBcIkB2aXRlanMvcGx1Z2luLWxlZ2FjeVwiXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xuaW1wb3J0IEljb25zIGZyb20gXCJ1bnBsdWdpbi1pY29ucy92aXRlXCJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5jb25zdCBwYXRoU3JjID0gcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiAnLi8nLFxuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgdnVlRGV2VG9vbHMoKSxcbiAgICBJY29ucyh7XG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLC8vIFx1NjMwN1x1NUI5QVx1N0YxNlx1OEJEMVx1NTY2OFxuICAgICAgYXV0b0luc3RhbGw6IHRydWUsLy8gXHU4MUVBXHU1MkE4XHU1Qjg5XHU4OEM1XG4gIH0pLFxuICBsZWdhY3koe1xuICAgIHRhcmdldHM6IFtcImllPj0xMVwiXSxcbiAgICBhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbXCJyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWVcIl0sXG4gIH0pLFxuICBBdXRvSW1wb3J0KHtcbiAgICAvLyBBdXRvIGltcG9ydCBmdW5jdGlvbnMgZnJvbSBWdWUsIGUuZy4gcmVmLCByZWFjdGl2ZSwgdG9SZWYuLi5cbiAgICAvLyBcdTgxRUFcdTUyQThcdTVCRkNcdTUxNjUgVnVlIFx1NzZGOFx1NTE3M1x1NTFGRFx1NjU3MFx1RkYwQ1x1NTk4Mlx1RkYxQXJlZiwgcmVhY3RpdmUsIHRvUmVmIFx1N0I0OVxuICAgIC8vIGltcG9ydHM6IFsndnVlJ10sXG5cbiAgICAvLyBBdXRvIGltcG9ydCBmdW5jdGlvbnMgZnJvbSBFbGVtZW50IFBsdXMsIGUuZy4gRWxNZXNzYWdlLCBFbE1lc3NhZ2VCb3guLi4gKHdpdGggc3R5bGUpXG4gICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTc2RjhcdTUxNzNcdTUxRkRcdTY1NzBcdUZGMENcdTU5ODJcdUZGMUFFbE1lc3NhZ2UsIEVsTWVzc2FnZUJveC4uLiAoXHU1RTI2XHU2ODM3XHU1RjBGKVxuICAgIHJlc29sdmVyczogW1xuICAgICAgRWxlbWVudFBsdXNSZXNvbHZlcigpLFxuXG4gICAgICAvLyBBdXRvIGltcG9ydCBpY29uIGNvbXBvbmVudHNcbiAgICAgIC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuICAgICAgSWNvbnNSZXNvbHZlcih7XG4gICAgICAgIHByZWZpeDogJ0ljb24nLFxuICAgICAgfSksXG4gICAgXSxcblxuICAgIGR0czogcGF0aC5yZXNvbHZlKHBhdGhTcmMsICdhdXRvLWltcG9ydHMuZC50cycpLFxuICB9KSxcblxuICBDb21wb25lbnRzKHtcbiAgICByZXNvbHZlcnM6IFtcbiAgICAgIC8vIEF1dG8gcmVnaXN0ZXIgaWNvbiBjb21wb25lbnRzXG4gICAgICAvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcbiAgICAgIEljb25zUmVzb2x2ZXIoe1xuICAgICAgICBlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSxcbiAgICAgIH0pLFxuICAgICAgLy8gQXV0byByZWdpc3RlciBFbGVtZW50IFBsdXMgY29tcG9uZW50c1xuICAgICAgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcbiAgICAgIEVsZW1lbnRQbHVzUmVzb2x2ZXIoKSxcbiAgICBdLFxuXG4gICAgZHRzOiBwYXRoLnJlc29sdmUocGF0aFNyYywgJ2NvbXBvbmVudHMuZC50cycpLFxuICB9KSxcbiAgXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH0sXG4gIH0sXG4gIHNlcnZlcjp7XG4gICAgcHJveHk6e1xuICAgICAgJy9hcGknOntcbiAgICAgICAgdGFyZ2V0OidodHRwOi8vbG9jYWxob3N0OjgwODEnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46dHJ1ZSxcbiAgICAgICAgcmV3cml0ZTpwYXRoPT5wYXRoLnJlcGxhY2UoL15cXC9hcGkvLCcnKVxuICAgICAgfVxuICAgIH1cbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWdRLFNBQVMsaUJBQUFBLHNCQUFxQjtBQUM5UixTQUFTLGFBQWEsZ0JBQUFDLGVBQWMsc0JBQXNCOzs7QUNEa00sU0FBUyxlQUFlLE9BQUFDLFlBQVc7QUFFL1IsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBRXhCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFVBQVU7QUFDakIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxtQkFBbUI7QUFDMUIsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsMkJBQTJCO0FBQ3BDLE9BQU8sZ0JBQWdCO0FBWnZCLElBQU0sbUNBQW1DO0FBQWtILElBQU0sMkNBQTJDO0FBYzVNLElBQU0sVUFBVSxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUM3QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxJQUFJO0FBQUEsSUFDSixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsTUFDSixVQUFVO0FBQUE7QUFBQSxNQUNWLGFBQWE7QUFBQTtBQUFBLElBQ2pCLENBQUM7QUFBQSxJQUNELE9BQU87QUFBQSxNQUNMLFNBQVMsQ0FBQyxRQUFRO0FBQUEsTUFDbEIsMkJBQTJCLENBQUMsNkJBQTZCO0FBQUEsSUFDM0QsQ0FBQztBQUFBLElBQ0QsV0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQU9ULFdBQVc7QUFBQSxRQUNULG9CQUFvQjtBQUFBO0FBQUE7QUFBQSxRQUlwQixjQUFjO0FBQUEsVUFDWixRQUFRO0FBQUEsUUFDVixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BRUEsS0FBSyxLQUFLLFFBQVEsU0FBUyxtQkFBbUI7QUFBQSxJQUNoRCxDQUFDO0FBQUEsSUFFRCxXQUFXO0FBQUEsTUFDVCxXQUFXO0FBQUE7QUFBQTtBQUFBLFFBR1QsY0FBYztBQUFBLFVBQ1osb0JBQW9CLENBQUMsSUFBSTtBQUFBLFFBQzNCLENBQUM7QUFBQTtBQUFBO0FBQUEsUUFHRCxvQkFBb0I7QUFBQSxNQUN0QjtBQUFBLE1BRUEsS0FBSyxLQUFLLFFBQVEsU0FBUyxpQkFBaUI7QUFBQSxJQUM5QyxDQUFDO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUlDLEtBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxRQUFPO0FBQUEsSUFDTCxPQUFNO0FBQUEsTUFDSixRQUFPO0FBQUEsUUFDTCxRQUFPO0FBQUEsUUFDUCxjQUFhO0FBQUEsUUFDYixTQUFRLENBQUFDLFVBQU1BLE1BQUssUUFBUSxVQUFTLEVBQUU7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzs7O0FEN0U0SixJQUFNQyw0Q0FBMkM7QUFJOU0sSUFBTyx3QkFBUTtBQUFBLEVBQ2I7QUFBQSxFQUNBQyxjQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsTUFDSixhQUFhO0FBQUEsTUFDYixTQUFTLENBQUMsR0FBRyxlQUFlLFNBQVMsUUFBUTtBQUFBLE1BQzdDLE1BQU1DLGVBQWMsSUFBSSxJQUFJLE1BQU1GLHlDQUFlLENBQUM7QUFBQSxJQUNwRDtBQUFBLEVBQ0YsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogWyJmaWxlVVJMVG9QYXRoIiwgImRlZmluZUNvbmZpZyIsICJVUkwiLCAiVVJMIiwgInBhdGgiLCAiX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCIsICJkZWZpbmVDb25maWciLCAiZmlsZVVSTFRvUGF0aCJdCn0K
