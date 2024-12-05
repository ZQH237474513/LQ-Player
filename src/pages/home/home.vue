<template>
    <view>
        <up-picker ref="uPickerRef" :defaultIndex="defaultIndex" :show="showSoureModal" keyName="name"
            :columns="videoSoureData" closeOnClickOverlay @cancel="openOrCloseoureModal" @close="openOrCloseoureModal"
            @confirm="comfirmSelectedVideoSoure"></up-picker>
        <view class="layoutWrapper">
            <view :style="{ height: `${getSatusBarHeight()}px` }" />
            <view class="searchBar">
                <up-avatar :src="log"></up-avatar>
                <up-search disabled class="search" :showAction="false"></up-search>
                <up-icon @click="() => openOrCloseoureModal(true)" name="list" color="#2979ff" size="28"></up-icon>
            </view>
            <view class="mainContent">
                <video-classify-card v-for="item, i in allClassifyVideo" :data="item" />
            </view>
        </view>
        <view class=" loadingLayout">
            <up-loading-page :loading="loadingFlag" loading-text="正在加载......" loading-mode="spinner"></up-loading-page>
        </view>
    </view>
</template>

<script setup lang="ts">
import { onMounted, ref, onBeforeMount, getCurrentInstance } from 'vue';
import { onShow, onReachBottom, onUnload } from '@dcloudio/uni-app';
import { getSatusBarHeight } from '@utils/system';
import icons from '@src/utils/icons';
import { db } from '@src/utils/index';
import videoParsePlugin from '@plugins/index';
import videoClassifyCard from '@components/video-classify-card/video-classify-card.vue'

const { log } = icons;

const videoSoureData = ref([[]]);
const showSoureModal = ref(false);
const uPickerRef: any = ref(null);
const allClassifyVideo: any = ref([]);
const classifyList: any = ref([]);
const requestInfo: any = ref(null);
const loadingFlag: any = ref(false);

const defaultIndex = ref([0]);



let classifyPageInfo = {
    basicSize: 10,
}




const classifyPageInfoInit = () => {
    classifyPageInfo = {
        basicSize: 10,
    }

}

onShow(() => {
    (async () => {
        try {
            loadingFlag.value = true;

            const videoSoureRes = await db.getItem('videoSoureList');
            const allClassifyVideoRes = await db.getItem('allClassifyVideoList');
            const curClassifyListRes = await db.getItem('curClassifyList');

            const curSelectedVideoSoure = await db.getItem('curSelectedVideoSoure');
            if (curSelectedVideoSoure) {
                requestInfo.value = { ...videoParsePlugin[curSelectedVideoSoure.pluginName], ...curSelectedVideoSoure } as any;
            }

            videoSoureData.value = [videoSoureRes?.filter((item: any) => {
                return item.isActive;
            })];
            allClassifyVideo.value = allClassifyVideoRes;
            classifyList.value = curClassifyListRes;

            loadingFlag.value = false
        } finally {
            setTimeout(() => loadingFlag.value = false, 3e3)
        }
    })()
})


onReachBottom(async () => {

    const videoSoureRes = await db.getItem('curClassifyList');
    const allClassifyVideoRes = await db.getItem('allClassifyVideoList');

    if (allClassifyVideoRes.length >= videoSoureRes.length) {
        return;
    }


    const start = allClassifyVideoRes.length;
    const end = allClassifyVideoRes.length + classifyPageInfo.basicSize;

    getClassifyVideoRes({ classifyList: videoSoureRes.slice(start, end) });

})

const openOrCloseoureModal = async (flag = false) => {
    if (flag && !videoSoureData.value[0]?.length) {
        uni.showToast({
            title: '当前无任何片源,请导入片源后再重新点击!',
            icon: 'none',
            mask: false
        })
        return;
    }



    // 获取当前值的下标 ,设置picker默认值;

    const curSelectedVideoSoure = await db.getItem('curSelectedVideoSoure');

    if (!curSelectedVideoSoure) {
        defaultIndex.value = [0];

    } else {
        const videoSoureRes = await db.getItem('videoSoureList');
        const curSoureIndex = videoSoureRes.findIndex((item: any) => {
            return item.name === curSelectedVideoSoure.name
        });
        if (curSoureIndex !== -1) {
            defaultIndex.value = [curSoureIndex];

        }

    }

    // 弹出picker model
    showSoureModal.value = flag;
}


const getClassifyVideoRes = async (params: { classifyList: any[] }) => {
    const { classifyList } = params;
    if (!requestInfo.value || !classifyList || !classifyList.length) {
        return false;
    }

    const { src, getAllClassifyVideo } = requestInfo.value as any;

    let url = `/${src}`

    // #ifdef APP
    url = src;
    // #endif

    try {
        loadingFlag.value = true;
        const allClassifyVideoRes: any = await getAllClassifyVideo({ ...params, classifyList, url });
        if (!allClassifyVideoRes) {
            return false;
        }
        // allClassifyVideo.value = [...JSON.parse(JSON.stringify(allClassifyVideo?.value || [])), ...allClassifyVideoRes];
        allClassifyVideo.value = allClassifyVideoRes;
        db.setItem('allClassifyVideoList', allClassifyVideoRes);
        loadingFlag.value = false
    } finally {
        setTimeout(() => loadingFlag.value = false, 3e3)

    }
}

const getClassifyData = async (params: any = {}) => {



    if (!requestInfo.value) {
        return;
    }

    const { src, getClassifyList } = requestInfo.value as any;
    let url = `/${src}`

    console.log(getClassifyList);

    // #ifdef APP
    url = src;
    // #endif

    const classifyListRes: any[] = await getClassifyList({ ...params, url });


    if (!classifyListRes) {
        return;
    }

    classifyPageInfoInit();
    classifyList.value = classifyListRes;
    db.setItem('curClassifyList', classifyListRes);

    console.log(JSON.stringify(classifyListRes));


    getClassifyVideoRes({ classifyList: classifyListRes?.slice(0, classifyPageInfo.basicSize) });


}


const comfirmSelectedVideoSoure = ({ value }: any) => {

    const { pluginName } = value[0] as any;

    requestInfo.value = { ...videoParsePlugin[pluginName], ...value[0] } as any;
    db.setItem('curSelectedVideoSoure', value[0]);
    openOrCloseoureModal();
    setTimeout(getClassifyData, 0);
}

</script>







<style lang="scss" scoped>
.layoutWrapper {
    .searchBar {
        position: fixed;
        z-index: 999;
        background-color: #fff;
        width: 100%;
        // height: ;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        padding: 15rpx 20rpx;

        .search {
            padding: 0 20rpx;
        }
    }

    .mainContent {
        margin-top: 80rpx;
    }
}
</style>
