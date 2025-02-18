import { defineConfig, loadEnv } from "vite"
import { viteMockServe } from "vite-plugin-mock"
import react from "@vitejs/plugin-react"
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")

  const { VITE_SOURCE_MAP, VITE_USE_MOCK } = env

  return {
    define: {
      "process.env.VITE_USE_MOCK": JSON.stringify(process.env.VITE_USE_MOCK),
    },
    build: {
      sourcemap: VITE_SOURCE_MAP === "true",
    },
    server: {
      host: "0.0.0.0",
      port: 8889,
    },
    plugins: [
      react(),
      viteMockServe({
        mockPath: "mock",
        enable: VITE_USE_MOCK === "true",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        components: path.resolve(__dirname, "src/components"),
        api: path.resolve(__dirname, "src/api"),
        utils: path.resolve(__dirname, "src/utils"),
        router: path.resolve(__dirname, "src/router"),
        store: path.resolve(__dirname, "src/store"),
        assets: path.resolve(__dirname, "src/assets"),
        context: path.resolve(__dirname, "src/context"),
        views: path.resolve(__dirname, "src/views"),
      },
    },
  }
})
