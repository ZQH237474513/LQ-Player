import localforage from "localforage";

interface LocalforageConfig {
	driver?: [];
	name?: string;
	version?: number;
	storeName?: string;
}

export default class Db {
	#mydbInstance: any | null = null;
	constructor(config: LocalforageConfig = {}) {
		if (this.#mydbInstance) {
			return this.#mydbInstance;
		}
		this.#init(config);
	}
	#init(config: LocalforageConfig) {
		localforage.config({
			driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE], // 指定使用的存储引擎，例如 localStorage
			name: "myApp", // 存储数据库的名称
			version: 1.0, // 数据库版本号
			storeName: "keyvaluepairs", // 存储对象的仓库名称
			...config,
		});

		this.#mydbInstance = localforage;
	}

	getItem(key: string) {
		// #ifdef H5
		return localforage.getItem(key);
		// #endif

		// #ifdef APP
		return uni.getStorageSync(key);
		// #endif
	}
	setItem(key: string, data: any) {
		// #ifdef H5
		localforage.setItem(key, JSON.parse(JSON.stringify(data)));
		// #endif

		// #ifdef APP
		uni.setStorageSync(key, JSON.parse(JSON.stringify(data)));
		// #endif
	}
	removeItem(key: string) {
		// #ifdef H5
		localforage.removeItem(key);
		// #endif

		// #ifdef APP
		uni.removeStorageSync(key);
		// #endif
	}

	clearStorage() {
		// #ifdef H5
		localforage.clear();
		// #endif

		// #ifdef APP
		uni.clearStorageSync();
		// #endif
	}
}
