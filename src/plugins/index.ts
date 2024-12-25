import request from "@utils/request";
import { parseXml } from "@utils/index";
import zyPlayerPlugin from "./zy-player";

const commonParams = {
	request,
};

const videoParsePlugin: any = {
	"zy-player": zyPlayerPlugin({ parseXml, request }),
	// "zy-player": (() => {
	// 	const zyPlayerPlugin: any = new ZyPlayerPlugin({ ...commonParams, parseXml });
	// 	const proto = Object.getPrototypeOf(zyPlayerPlugin);
	// 	const keys = Reflect.ownKeys(proto).filter((item: any) => {
	// 		return item !== "constructor";
	// 	});

	// 	const allMethod: any = {};

	// 	for (const key of keys) {
	// 		allMethod[key] = zyPlayerPlugin[key];
	// 	}

	// 	return allMethod;
	// })(),
};

export default videoParsePlugin;
