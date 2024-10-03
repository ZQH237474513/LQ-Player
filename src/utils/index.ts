// @ts-ignore
import fastXmlParser from "fast-xml-parser";
import Db from "./db";

/** 数据库 */
export const db = new Db();

const xmlConfig = {
	// XML 转 JSON 配置
	trimValues: true,
	textNodeName: "_t",
	ignoreAttributes: false,
	attributeNamePrefix: "_",
	parseAttributeValue: true,
};

/** 解析xml文件 */
export const parseXml = (xml: string, config = xmlConfig) => {
	// @ts-ignore
	const parseRes = fastXmlParser.parse(xml, config);
	return parseRes;
};
