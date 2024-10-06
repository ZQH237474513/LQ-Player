const zyPlayerPlugin = (parentParams: any) => {
	const { request, parseXml } = parentParams;
	const parseXmlToData = (xml: string) => {
		const parseVideoList = (str: string) => {
			str = str.endsWith("#") ? str.slice(0, str.length - 1) : str;
			const arr = str.split("#");

			return arr
				.map((itemStr) => {
					const tempArr = itemStr.split("$");

					return {
						name: tempArr[0],
						src: tempArr[1],
					};
				})
				.filter((item: any) => {
					const reg = /.m3u8$/gi;
					return reg.test(item.src);
				});
		};
		const basicConfig: any = {
			ground: [],
			video: [],
			page: 0,
			pagecount: 0,
			pagesize: 0,
			recordcount: 0,
		};
		let parseRes = parseXml(xml);

		parseRes = parseRes?.rss || parseRes;

		// groud
		if (parseRes?.class && parseRes?.class?.ty) {
			basicConfig.ground = [{ id: 0, name: "最新" }].concat(
				parseRes?.class?.ty.map((item: any) => {
					return { id: item._id, name: item._t };
				})
			);
		}
		const list = parseRes?.list;

		if (list) {
			for (const key in list) {
				if (Object.prototype.hasOwnProperty.call(list, key)) {
					// video
					if (key === "video") {
						let video = list[key];

						if (!Array.isArray(video)) {
							video = [video];
						}
						video = (video || [])
							.map((item: any) => {
								const dd = item?.dl?.dd;
								const videoList = dd ? parseVideoList(dd?._t || "") : [];
								delete item.dl;
								return { ...item, videoList };
							})
							.filter((item: any) => {
								return item.videoList.length;
							})
							.sort((a: any, b: any) => {
								return a.name - b.name;
							});

						basicConfig[key] = video;
					} // pageInfo
					else {
						basicConfig[key.slice(1)] = list[key];
					}
				}
			}
		}

		return basicConfig;
	};
	return {
		getClassifyList: async (params: any) => {
			const { url } = params;
			const res: any = await request({ url });
			if (!res) {
				return [];
			}
			const { ground } = parseXmlToData(res);
			return ground;
		},
		getVideoList: async (params: any) => {
			const { id = 0, page = 1, url } = params;
			const res = await request({ url: `${url}?ac=videolist&t=${id}&pg=${page}` });
			if (!res) {
				return [];
			}
			const { video } = parseXmlToData(res);
			return video;
		},
		getAllClassifyVideo: async (params: any) => {
			const { classifyList, page = 1, url } = params;

			if (!classifyList || !classifyList.length) {
				return [];
			}

			let allP = [];
			allP = classifyList.map(async (item: any) => {
				const { id, name } = item;
				try {
					const res = await request({ url: `${url}?ac=videolist&t=${id}&pg=${page}` });
					if (!res) {
						return { name, video: [], id };
					}
					const { video } = parseXmlToData(res);
					return { name, video, id };
				} catch (e) {
					console.log(e);
					return { name, video: [], id };
				}
			});

			const res = await Promise.all(allP);
			// const res = (await Promise.all(allP)).filter((item: any) => {
			// 	return item.video.length;
			// });
			return res;
		},
	};
};

export default zyPlayerPlugin;
