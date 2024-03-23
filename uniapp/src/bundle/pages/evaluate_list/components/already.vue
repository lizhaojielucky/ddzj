<template>
    <view class="card" @click="toGoodsDetail(goods_id)">
        <!-- Header Start -->
        <view class="card--header flex justify-between">
            <view class="text-muted text-xs">{{ create_time }}</view>
            <view class="flex">
                <u-rate
                    :count="5"
                    v-model="service_comment"
                    size="28"
                    inactive-icon="star-fill"
                ></u-rate>
                <view class="ml-[20rpx] lighter text-xs">
                    <text v-if="service_comment == 5">非常好</text>
                    <text v-if="service_comment == 4">好</text>
                    <text v-if="service_comment == 3">一般</text>
                    <text v-if="service_comment == 2">差</text>
                    <text v-if="service_comment == 1">非常差</text>
                </view>
            </view>
        </view>

        <!-- Main Start -->
        <view class="card--main">
            <view class="content">
                {{ comment }}
            </view>

            <view class="flex flex-wrap">
                <block v-for="(item3, index) in goods_comment_image">
                    <view
                        class="mt-[10rpx]"
                        :class="{ 'mr-[10rpx]': (index + 1) % 3 != 0 }"
                        @click.stop="previewImage(index)"
                    >
                        <u-image :src="item3.uri" width="210" height="210"></u-image>
                    </view>
                </block>
            </view>

            <view class="flex mt-[20rpx] goods">
                <u-image :src="goods_image" width="140" height="140"></u-image>
                <view class="ml-[20rpx]">
                    <view class="normal font-medium text-xl">{{ goods_name }}</view>
                    <view class="mt-[24rpx]">
                        <price :price="goods_price" :desc="unit_name"></price>
                    </view>
                </view>
            </view>

            <view class="reply normal text-base mt-[20rpx]" v-if="reply">
                <text class="font-medium">商家回复: </text>
                <text>
                    {{ reply }}
                </text>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'
import Price from '@/components/price/index.vue'

/** Props Start **/
const props = withDefaults(
    defineProps<{
        goods_id: string | number
        comment: string | null
        goods_comment_image: string | null
        reply: string | null
        create_time: string | null
        service_comment: string | number
        goods_image: string
        goods_name: string
        goods_price: string
        unit_name: string
    }>(),
    {
        goods_id: '',
        comment: '',
        goods_comment_image: '',
        reply: '',
        create_time: '',
        service_comment: '',
        goods_image: '',
        goods_name: '',
        goods_price: '',
        unit_name: ''
    }
)
/** Props End **/

/** Methods Start **/
// 去商品详情
const toGoodsDetail = (id: number | string) => {
    uni.navigateTo({
        url: `/pages/goods/index?id=${id}`
    })
}

// 查看评价图片
const previewImage = (current: number) => {
    uni.previewImage({
        current,
        urls: props.goods_comment_image.map((el) => el.uri)
    })
}
/** Methods End **/
</script>

<style lang="scss" scoped>
.card {
    border-radius: 14rpx;
    background-color: white;
    margin: 20rpx 20rpx 0 20rpx;
    padding: 30rpx;
    &--header {
        width: 100%;
    }
    &--main {
        .content {
            padding: 20rpx 0;
            font-size: 28rpx;
            color: #222222;
        }
        .goods {
            padding-top: 20rpx;
            border-top: 1px solid #f6f6f6;
        }
        .reply {
            word-break: break-all;
            padding: 24rpx 20rpx;
            background-color: #f6f6f6;
            border-radius: 10rpx;
        }
    }
}
</style>
