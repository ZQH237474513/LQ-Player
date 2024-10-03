import request from "@utils/request";

export const getSoureData = (url: string) => {
	return new Promise(async (resolve) => {
		try {
			const res: any = await request({
				url,
			});

			if (!res) {
				return;
			}

			resolve(res);
		} catch {}
	});
};
