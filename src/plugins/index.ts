import request from "@utils/request";
import { parseXml } from "@utils/index";
import zyPlayerPlugin from "./zy-player";

const commonParams = {
	request,
};

const videoParsePlugin: any = {
	"zy-player": zyPlayerPlugin({ ...commonParams, parseXml }),
};

export default videoParsePlugin;
