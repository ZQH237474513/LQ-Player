<template>
    <view class="cardWrapper" v-if="data.video.length">
        <view class="titleBr">
            <view class="title"> {{ data.name }}</view>
            <view>
                <up-icon name="arrow-right-double" color="#000" size="20"></up-icon>
            </view>
        </view>
        <view class="videContent">
            <video-item v-for="item in data.video" :data="item" />
        </view>

    </view>
</template>


<script setup lang="ts">
import videoItem from '@components/video-item/video-item.vue'


defineProps({
    data: {
        type: Object,
        default: {}
    }
})
</script>


<style lang="scss" scoped>
.cardWrapper {
    margin: 20rpx 10rpx;

    .titleBr {
        display: flex;
        justify-content: space-between;
        margin: 20rpx 5rpx;
        align-items: center;

        .title {
            font-size: 35rpx;
            font-weight: bold;
        }
    }

    .videContent {
        display: grid;
        gap: 10rpx;
        grid-template-columns: repeat(auto-fill, minmax(122px, 1fr));
    }
}
</style>