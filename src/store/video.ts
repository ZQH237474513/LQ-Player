import { defineStore } from "pinia";
import { ref } from "vue";
export const useVideoStore = defineStore("videoStore", () => {
	const homeVideo = ref([]);
	return { homeVideo };
});

// class VideoBasic {
// 	videoConfig = new Map();
// }

// class VideoClassifyList extends VideoBasic {}

// export class VideoSoure extends VideoBasic {
// 	videoSoureList = new Map();
// 	setVideoSoure(key: any, data: any) {
// 		this.videoSoureList.set(key, data);
// 	}
// 	bathSetVideoSoure(data: any[]) {
// 		for (let i = 0; i < data.length; i++) {
// 			const key = data[i].key;
// 			this.setVideoSoure(key, data[i]);
// 		}
// 	}
// }
