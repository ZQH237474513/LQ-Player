<template>
    <view class="videoItemWrapper" @click="goPlayPage">
        <view class="content">
            <view class="img">
                <up-image width="100%" :radius="5" mode="scaleToFill" :src="data.pic" :lazy-load="true"> <template
                        v-slot:loading>
                        <up-loading-icon color="red"></up-loading-icon>
                    </template>
                </up-image>
            </view>
        </view>
        <view class="title">
            <up-text :lines="1" bold :size="14" :text="data.name"></up-text>
        </view>
    </view>
</template>


<script setup lang="ts">
import { db } from '@utils/index';
const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})


const goPlayPage = () => {
    db.setItem('curPlayerItem', props.data)
    uni.navigateTo({
        url: `/pages/play/play?id=${props?.data.id}`
    })

}
</script>


<style lang="scss" scoped>
.videoItemWrapper {
    .content {
        border-radius: 20rpx;
    }

    .title {
        padding: 10rpx 0 10rpx 10rpx;
        font-size: 25rpx;
        font-weight: bold;
    }

}
</style>