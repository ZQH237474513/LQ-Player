<template>
    <view class="userWarpper">
        <view class="avatarWrapper">
            <up-avatar :size="100" :src="log"></up-avatar>
            <view class="text">LQ Player</view>
        </view>
        <up-cell-group>
            <!-- <up-cell icon="integral-fill" title="导入插件"></up-cell> -->
            <up-cell icon="setting-fill" title="源管理" :iconStyle="{ color: 'red' }" isLink
                url="pages/soureManagement/soureManagement"></up-cell>
            <up-cell icon="integral-fill" title="历史记录" :iconStyle="{ color: 'red' }" isLink
                url="pages/history/history"></up-cell>
            <up-cell icon="integral-fill" title="我的收藏" :iconStyle="{ color: 'red' }" isLink
                url="pages/history/history"></up-cell>
            <up-cell icon="integral-fill" title="清除缓存" @click="clearStorageHanle" :iconStyle="{ color: 'red' }" isLink
                url="pages/history/history"></up-cell>
        </up-cell-group>
    </view>
</template>

<script setup lang="ts">
import icons from '@src/utils/icons';
import { db } from '@utils/index';

const { log } = icons;

const clearStorageHanle = () => {
    db.clearStorage();
    uni.showToast({
        title: '清除成功',
        icon: 'success',
        mask: true
    });
}


</script>

<style lang="scss" scoped>
.avatarWrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 30rpx 0;
    flex-direction: column;

    .text {
        font-size: 60rpx;
        font-weight: bold;
        padding: 20rpx 0;
    }
}
</style>
