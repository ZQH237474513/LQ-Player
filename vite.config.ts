import { defineConfig, loadEnv } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import { resolve } from "path";
import { createHtmlPlugin } from "vite-plugin-html";
import { injectEnv, injectProxyConfig } from "./utils/config";

export default defineConfig(({ mode }) => {
	return {
		define: { ...injectEnv(mode) },
		resolve: {
			alias: {
				"@src": resolve(__dirname, "src"),
				"@pages": resolve(__dirname, "src/pages"),
				"@assets": resolve(__dirname, "src/assets"),
				"@components": resolve(__dirname, "src/components"),
				"@apis": resolve(__dirname, "src/apis"),
				"@utils": resolve(__dirname, "src/utils"),
				"@plugins": resolve(__dirname, "src/plugins"),
			},
			extensions: ["...", ".mjs", ".js", ".ts", ".tsx", ".json"],
		},
		plugins: [
			uni(),
			createHtmlPlugin({
				inject: {
					data: { title: "LQ Player" },
				},
			}),
		],
		server: {
			proxy: {
				...injectProxyConfig(),
				"/https://gitee.com": {
					target: "https://gitee.com", //目标url
					changeOrigin: true, //支持跨域
					rewrite: (path) => path.replace(new RegExp(`^/https://gitee.com`), ""), //重写路径,替换/api
				},
			},
		},
	};
});
