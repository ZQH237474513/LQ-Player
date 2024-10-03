interface requersConfig {
	url: string;
	method?: "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT" | undefined;
	data?: any;
	header?: Object;
	responseType?: string;
}

/** 网络请求 */
const request = (config: requersConfig) => {
	const { url, method = "GET", data, header = {} } = config;
	return new Promise((resolve, reject) => {
		uni.request({
			...config,
			url,
			data,
			header,
			method,
			success: (res: any) => {
				if (res.statusCode === 200) {
					resolve(res.data);
				}
			},
			fail: (err: any) => {
				reject(err);
			},
		});
	});
};

export default request;
