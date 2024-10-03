const SYSTEM_INFO = uni.getSystemInfoSync();

/** 手机状态栏高度 */
export const getSatusBarHeight: () => number = () => SYSTEM_INFO.statusBarHeight || 15;

/** 标题栏高度 */
export const getTitleBarHeight: () => number = () => {
	if (uni.getMenuButtonBoundingClientRect) {
		const { height = 0, top = 0 } = uni.getMenuButtonBoundingClientRect();
		return height + (top - getSatusBarHeight()) * 2;
	}

	return 40;
};

/** 导航栏高度 */
export const getNavBarHeight: () => number = () => getSatusBarHeight() + getTitleBarHeight();
