<template>
    <view class="soureManagementWrapper">
        <view class="importSoure">
            <up-input v-model="sourseUrl" placeholder="请输入url" clearable />
            <view class="btn">
                <up-button @click="importSoure" :customStyle="{ height: '50rpx' }" text="导入" type="primary" size="mini" />
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

const sourseUrl = ref('/https://gitee.com/zqhweb/localstorage/raw/master/publice/LQ-Player/video-soure.json');
const videoSoureList: any = ref([]);
const importSoure = async () => {
    // const reg = /^(http)|^(https):\/\//ig;
    // if (!reg.test(sourseUrl.value)) {
    //     return;
    // }

    const res: any = await getSoureData(sourseUrl.value);
    videoSoureList.value = res;

    let videoSoureData = await db.getItem('videoSoureList');


    if (!videoSoureData) {
        db.setItem('videoSoureList', res)
    } else {
        const allKey = videoSoureData.map((item: any) => {
            return item.key
        });

        videoSoureData = [videoSoureData, ...res.filter((item: any) => {
            return !allKey.includes(item.key)
        })]
        db.setItem('videoSoureList', videoSoureData)
    }

    nextTick()

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