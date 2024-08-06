// vite.config.ts
import { defineConfig } from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/vite/dist/node/index.js";
import react from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgrPlugin from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/vite-plugin-svgr/dist/index.js";
import tsconfigPaths from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/vite-tsconfig-paths/dist/index.mjs";
import checker from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/vite-plugin-checker/dist/esm/main.js";
import { resolve } from "path";
import external from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/rollup-plugin-peer-deps-external/dist/rollup-plugin-peer-deps-external.js";
import dts from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/vite-plugin-dts/dist/index.mjs";
import cssInjectedByJsPlugin from "file:///D:/clinchinfosystems/mnai/poc/reagraph/node_modules/vite-plugin-css-injected-by-js/dist/esm/index.js";
var vite_config_default = defineConfig(
  ({ mode }) => mode === "library" ? {
    plugins: [
      svgrPlugin(),
      tsconfigPaths(),
      cssInjectedByJsPlugin(),
      react(),
      dts({
        insertTypesEntry: true,
        include: ["src"]
      }),
      checker({
        typescript: true
      })
    ],
    test: {
      globals: true,
      environment: "jsdom"
    },
    build: {
      minify: false,
      sourcemap: true,
      copyPublicDir: false,
      lib: {
        entry: resolve("src", "index.ts"),
        name: "reagraph",
        fileName: "index"
      },
      rollupOptions: {
        plugins: [
          external({
            includeDependencies: true
          })
        ]
      }
    }
  } : {
    plugins: [
      svgrPlugin(),
      tsconfigPaths(),
      react(),
      checker({
        typescript: true
      })
    ],
    test: {
      globals: true,
      environment: "jsdom"
    }
  }
);
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxjbGluY2hpbmZvc3lzdGVtc1xcXFxtbmFpXFxcXHBvY1xcXFxyZWFncmFwaFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcY2xpbmNoaW5mb3N5c3RlbXNcXFxcbW5haVxcXFxwb2NcXFxccmVhZ3JhcGhcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L2NsaW5jaGluZm9zeXN0ZW1zL21uYWkvcG9jL3JlYWdyYXBoL3ZpdGUuY29uZmlnLnRzXCI7Ly8vIDxyZWZlcmVuY2UgdHlwZXM9XCJ2aXRlc3RcIiAvPlxyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XHJcbmltcG9ydCBzdmdyUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcclxuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IGV4dGVybmFsIGZyb20gJ3JvbGx1cC1wbHVnaW4tcGVlci1kZXBzLWV4dGVybmFsJztcclxuaW1wb3J0IGR0cyBmcm9tICd2aXRlLXBsdWdpbi1kdHMnO1xyXG5pbXBvcnQgY3NzSW5qZWN0ZWRCeUpzUGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWNzcy1pbmplY3RlZC1ieS1qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PlxyXG4gIG1vZGUgPT09ICdsaWJyYXJ5J1xyXG4gICAgPyB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBzdmdyUGx1Z2luKCksXHJcbiAgICAgICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgICAgIGNzc0luamVjdGVkQnlKc1BsdWdpbigpLFxyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgZHRzKHtcclxuICAgICAgICAgIGluc2VydFR5cGVzRW50cnk6IHRydWUsXHJcbiAgICAgICAgICBpbmNsdWRlOiBbJ3NyYyddXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgY2hlY2tlcih7XHJcbiAgICAgICAgICB0eXBlc2NyaXB0OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgXSxcclxuICAgICAgdGVzdDoge1xyXG4gICAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbSdcclxuICAgICAgfSxcclxuICAgICAgYnVpbGQ6IHtcclxuICAgICAgICBtaW5pZnk6IGZhbHNlLFxyXG4gICAgICAgIHNvdXJjZW1hcDogdHJ1ZSxcclxuICAgICAgICBjb3B5UHVibGljRGlyOiBmYWxzZSxcclxuICAgICAgICBsaWI6IHtcclxuICAgICAgICAgIGVudHJ5OiByZXNvbHZlKCdzcmMnLCAnaW5kZXgudHMnKSxcclxuICAgICAgICAgIG5hbWU6ICdyZWFncmFwaCcsXHJcbiAgICAgICAgICBmaWxlTmFtZTogJ2luZGV4J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgICAgICBleHRlcm5hbCh7XHJcbiAgICAgICAgICAgICAgaW5jbHVkZURlcGVuZGVuY2llczogdHJ1ZVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBzdmdyUGx1Z2luKCksXHJcbiAgICAgICAgdHNjb25maWdQYXRocygpLFxyXG4gICAgICAgIHJlYWN0KCksXHJcbiAgICAgICAgY2hlY2tlcih7XHJcbiAgICAgICAgICB0eXBlc2NyaXB0OiB0cnVlXHJcbiAgICAgICAgfSlcclxuICAgICAgXSxcclxuICAgICAgdGVzdDoge1xyXG4gICAgICAgIGdsb2JhbHM6IHRydWUsXHJcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdqc2RvbSdcclxuICAgICAgfVxyXG4gICAgfVxyXG4pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sYUFBYTtBQUNwQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxjQUFjO0FBQ3JCLE9BQU8sU0FBUztBQUNoQixPQUFPLDJCQUEyQjtBQUVsQyxJQUFPLHNCQUFRO0FBQUEsRUFBYSxDQUFDLEVBQUUsS0FBSyxNQUNsQyxTQUFTLFlBQ0w7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLHNCQUFzQjtBQUFBLE1BQ3RCLE1BQU07QUFBQSxNQUNOLElBQUk7QUFBQSxRQUNGLGtCQUFrQjtBQUFBLFFBQ2xCLFNBQVMsQ0FBQyxLQUFLO0FBQUEsTUFDakIsQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLFFBQ04sWUFBWTtBQUFBLE1BQ2QsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLE1BQU07QUFBQSxNQUNKLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxJQUNmO0FBQUEsSUFDQSxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxlQUFlO0FBQUEsTUFDZixLQUFLO0FBQUEsUUFDSCxPQUFPLFFBQVEsT0FBTyxVQUFVO0FBQUEsUUFDaEMsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLE1BQ1o7QUFBQSxNQUNBLGVBQWU7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQLFNBQVM7QUFBQSxZQUNQLHFCQUFxQjtBQUFBLFVBQ3ZCLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGLElBQ0U7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLFdBQVc7QUFBQSxNQUNYLGNBQWM7QUFBQSxNQUNkLE1BQU07QUFBQSxNQUNOLFFBQVE7QUFBQSxRQUNOLFlBQVk7QUFBQSxNQUNkLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxNQUFNO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsSUFDZjtBQUFBLEVBQ0Y7QUFDSjsiLAogICJuYW1lcyI6IFtdCn0K
