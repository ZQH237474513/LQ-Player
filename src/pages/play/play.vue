<template>
    <view class="palyLayout">
        <view class="playerWrapper">

            <video class="player" :autoplay="true" :src="selecedValue.src" :title="title" vslide-gesture :play-strategy="2"
                object-fit="fill"></video>

            <!-- <web-view title="ces" :src='`/hybrid/html/index.html${queryParams(wvParams)}`' /> -->
        </view>
        <view class="videoDesWrapper" :style="{ height: `${screenHeight - 260 - getNavBarHeight()}px` }">
            <view class="videoDetail">
                <view class="synopsis">
                    <view class="image">
                        <image :src="data.pic" mode="scaleToFill" />
                    </view>
                    <view class="text">
                        <view class="name">{{ data?.name }}</view>
                        <view class="otherDes">
                            <view>
                                <up-text color="#fff" :lines="2" :text="data.actor"></up-text>
                            </view>
                            <view>{{ `${data?.area} . ${data?.year} . ${data?.lang}` }}</view>
                            <view>{{ data.note }}</view>

                        </view>
                    </view>
                </view>

                <view class="des" v-html="data.des" />

            </view>
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
import { ref, watch, computed } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { db } from '@src/utils/index';
import { SYSTEM_INFO, getNavBarHeight } from '@utils/system'

const data: any = ref({});
const selecedValue: any = ref({});
const title: any = ref('')


const { screenHeight } = SYSTEM_INFO as any;


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
        const curPlayerItem = await db.getItem('curPlayerItem');



        // #ifdef H5
        const des = (curPlayerItem.des || "").replaceAll(/[ style="]/ig, '');
        data.value = {
            ...curPlayerItem, des
        };
        // #endif

        // #ifdef APP
        data.value = curPlayerItem;
        // #endif


        selecedValue.value = curPlayerItem.videoList[0];
    })()
})


</script>

<style lang="scss" scoped>
.palyLayout {
    background-color: #000;
    margin: 0 0 50rpx 0;
    min-height: 100vh;

    .playerWrapper {
        height: 260px;

        .player {
            width: 100%;
            height: 100%;
        }
    }

    .videoDesWrapper {
        padding: 20rpx 10rpx;
        border-top: 1px solid #333333;
        height: 150vw;
        overflow: scroll;
        color: #fff;

        .videoDetail {
            .synopsis {
                width: 100%;
                display: flex;
                justify-content: start;
                flex-wrap: nowrap;
                margin: 20rpx 10rpx;

                .image {
                    min-width: 160rpx;
                    height: 260rpx;
                    margin-right: 20rpx;

                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 10rpx;
                    }
                }

                .text {
                    display: flex;
                    flex-direction: column;
                    justify-content: start;
                    flex-wrap: nowrap;

                    .name {
                        margin-top: 5rpx;
                        font-size: 35rpx;
                        font-weight: bold;
                        margin-bottom: 20rpx;
                    }

                    .otherDes {
                        line-height: 45rpx;
                        font-size: 25rpx;
                    }
                }
            }

            .des {
                font-size: 30rpx;
                text-indent: 2em;
                line-height: 45rpx;
                margin: 20rpx 0;
            }
        }

        .selections {

            .title {
                font-size: 40rpx;
                font-weight: bold;
            }



            .selectionsContentWrpper {
                display: grid;
                margin: 20rpx 0;
                grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                gap: 20rpx;

                @media screen and (min-width:800px) {
                    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
                }




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