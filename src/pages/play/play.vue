<template>
    <view class="palyLayout">
        <view class="playerWrapper">
            <video class="player" :autoplay="true" :src="selecedValue.src" :title="title" vslide-gesture :play-strategy="2"
                object-fit="fill"></video>

            <!-- <web-view title="ces" :src='`/hybrid/html/index.html${queryParams(wvParams)}`' /> -->
        </view>
        <view class="videoDesWrapper">
            <view class="selections">
                <view class="title">选集</view>
                <view class="selectionsContentWrpper">
                    <template v-for="item in data?.videoList">
                        <view @click="() => selecedItemHandle(item)"
                            :class="`selectionsItem ${item?.src === selecedValue?.src ? 'active' : ''}`">{{
                                item.name }}</view>

                    </template>
                </view>
            </view>


        </view>
    </view>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { db } from '@src/utils/index';

const data: any = ref({});
const selecedValue: any = ref({});
const title: any = ref('')

watch(selecedValue, (newValue) => {
    const { name } = newValue;

    title.value = `${data.value.name} ${name}`;

    updataTitle(title.value)

})


const selecedItemHandle = (item: any) => {
    selecedValue.value = item;
}

const updataTitle = (title: string) => {
    setTimeout(() => {
        uni.setNavigationBarTitle({
            title,
        })
    }, 0.8e3);
}

onLoad((e: any) => {
    (async () => {
        const curPlayerItem = await db.getItem('curPlayerItem')
        data.value = curPlayerItem;
        selecedValue.value = curPlayerItem.videoList[0];
    })()
})


</script>

<style lang="scss" scoped>
.palyLayout {
    background-color: #000;
    margin: 0 0 50rpx 0;

    .playerWrapper {
        height: 420rpx;

        .player {
            width: 100%;
            height: 100%;
        }
    }

    .videoDesWrapper {
        padding: 20rpx 10rpx;
        border-top: 1px solid #333333;

        .selections {
            color: #fff;

            .title {
                font-size: 40rpx;
                font-weight: bold;
            }

            .selectionsContentWrpper {
                display: grid;
                margin: 20rpx 0;
                grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
                gap: 20rpx;

                .selectionsItem {
                    height: 60rpx;
                    // margin: 0 20rpx;
                    border-radius: 5rpx;
                    // padding: 20rpx;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border: 1px solid #fff;
                    font-size: 20rpx;
                    color: #fff;
                    font-weight: bold;
                    background-color: #3b3b3b;



                }

                .active {
                    background-color: red;
                }


            }

        }
    }
}
</style>