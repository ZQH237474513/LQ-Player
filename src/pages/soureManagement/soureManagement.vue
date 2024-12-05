<template>
    <view class="soureManagementWrapper">
        <view class="importSoure">
            <up-input v-model="sourseUrl" placeholder="请输入url" clearable />
            <view class="btn">
                <up-button @click="importSourehandle" :customStyle="{ height: '50rpx' }" text="导入" type="primary"
                    size="mini" />
            </view>

        </view>
        <view class="soureManagementContent">
            <up-cell-group>
                <up-cell v-for="item, i in videoSoureList" :key="`${i}_${new Date().getTime()}`" :title="item.name">
                    <template #right-icon>
                        <up-switch v-model="item.isActive"></up-switch>
                    </template>
                </up-cell>
            </up-cell-group>
        </view>
    </view>
</template>


<script setup lang="ts">
import { ref, onUnmounted, onMounted, nextTick } from 'vue';
import { getSoureData } from '@apis/index';
import { db } from '@utils/index';
import store from '@store/index';

const { videoStore: { VideoSoure } } = store;


const videoSoure = new VideoSoure();

console.log(videoSoure);



let sourseUrl = { value: {} } as any;

// #ifdef H5
sourseUrl = ref('/https://gitee.com/zqhweb/localstorage/raw/master/publice/LQ-Player/video-soure.json');
// #endif

// #ifdef APP
sourseUrl = ref('https://gitee.com/zqhweb/localstorage/raw/master/publice/LQ-Player/video-soure.json');
// #endif

const videoSoureList: any = ref([]);

/** 导入数据源 */
const importSourehandle = async () => {
    // #ifdef APP
    const reg = /^(http)|^(https):\/\//ig;
    if (!reg.test(sourseUrl.value)) {
        return;
    }
    // #endif

    const res: any = await getSoureData(sourseUrl.value);


    if (!res) {
        return;
    }

    videoSoure.bathSetVideoSoure(res);

    videoSoureList.value = res;

}

onMounted(() => {
    (async () => {
        const videoSoureData = await db.getItem('videoSoureList') || [];
        videoSoureList.value = videoSoureData

    })()
})


onUnmounted(() => {
    db.setItem('videoSoureList', videoSoureList.value)
})

</script>

<style lang="scss" scoped>
.soureManagementWrapper {
    .importSoure {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 0 20rpx;
        margin: 20rpx 0;

        .btn {
            margin-left: 20rpx;
        }
    }
}
</style>