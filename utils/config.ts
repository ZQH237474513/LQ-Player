import axios from "axios";
import { loadEnv } from "vite";

/** 获取域名 */
const getDomain = (api: string) => {
	const domainArr = String(api).match(/(https|http):\/\/(.+com|.+php|.+cc|.+me)/gi);
	return domainArr && Array.isArray(domainArr) ? domainArr[0] : "";
};

export const injectEnv = (mode: string) => {
	const env = loadEnv(mode, process.cwd());
	const define = {};

	for (const key in env) {
		if (Object.prototype.hasOwnProperty.call(env, key)) {
			define[`import.meta.env.${key}`] = JSON.stringify(env[key]);
		}
	}

	return define;
};

export const injectProxyConfig = () => {
	const soureList = [
		{
			name: "百度云资源",
			src: "https://api.apibdzy.com/api.php/provide/vod/at/xml",
			isActive: true,
			key: "apibdzy",
			pluginName: "zy-player",
		},
		{
			name: "卧龙资源站综合资源",
			src: "https://collect.wolongzyw.com/api.php/provide/vod/at/xml",
			isActive: true,
			key: "wolongzyw",
			pluginName: "zy-player",
		},
		{
			name: "量子资源",
			src: "https://cj.lziapi.com/api.php/provide/vod/from/liangzi/at/xml",
			isActive: true,
			key: "lziapi",
			pluginName: "zy-player",
		},
		{
			name: "闪电资源网",
			src: "https://sdzyapi.com/api.php/provide/vod/at/xml",
			isActive: true,
			key: "sdzyapi",
			pluginName: "zy-player",
		},
		{
			name: "步步高资源",
			src: "https://api.yparse.com/api/xml",
			isActive: true,
			key: "yparse",
			pluginName: "zy-player",
		},
		{
			name: "CK资源",
			src: "https://ckzy.me/api.php/provide/vod/at/xml",
			isActive: true,
			key: "ckzy",
			pluginName: "zy-player",
		},
		{
			name: "八戒采集",
			src: "http://cj.bajiecaiji.com/inc/bjm3u8.php",
			isActive: true,
			key: "bajiecaiji",
			pluginName: "zy-player",
		},
	];
	const proxyConfig = {};

	for (const videoConfigItem of soureList) {
		const domain = getDomain(videoConfigItem.src || "");
		proxyConfig[`/${domain}`] = {
			target: domain, //目标url
			changeOrigin: true, //支持跨域
			rewrite: (path: string) => path.replace(new RegExp(`^/${domain}`), ""), //重写路径,替换/api
		};
	}

	return proxyConfig;
};
