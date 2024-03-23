<template>
    <view class="card" @click.stop="goPage">
        <view class="card--header flex justify-between">
            <view class="order-sn">订单编号：{{ orderInfo.sn }}</view>
            <view class="status">{{ orderInfo.order_status_desc }}</view>
        </view>

        <block v-for="item3 in orderInfo.order_goods" :key="item3.id">
            <view class="card--main flex">
                <u-image :src="item3.goods_image" width="160" height="160"></u-image>
                <view class="ml-[20rpx] service-text">
                    <view class="service-text--name truncate">{{ item3.goods_name }}</view>
                    <view class="mt-[16rpx]"
                        >预约时间: {{ orderInfo.appoint_time }} {{ orderInfo.appoint_week }}</view
                    >
                    <view class="mt-[16rpx]">实付金额: ¥{{ orderInfo.order_amount }}</view>
                </view>
            </view>
        </block>

        <view class="card--footer flex justify-between items-center">
            <view class="primary">
                <template v-if="orderInfo.order_cancel_time">
                    <view class="flex items-center" v-if="timeStamp >= 0">
                        <u-count-down
                            :timestamp="timeStamp"
                            format="mm:ss"
                            :font-size="26"
                            :separator-size="26"
                            @end="timeStamp = 0"
                        />
                        <text class="ml-[10rpx]">后自动取消</text>
                    </view>
                </template>
            </view>

            <view>
                <slot></slot>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { ref, reactive, watchEffect } from 'vue'

const props = withDefaults(
    defineProps<{
        orderInfo?: any // 底部
    }>(),
    {
        orderInfo: {}
    }
)
const timeStamp = ref<number | null>(0)

const getCountDownSegment = watchEffect(() => {
    // 获取倒计时段
    const endTimestamp = props.orderInfo.order_cancel_time
    const startTimestamp = new Date().getTime() / 1000
    timeStamp.value = (endTimestamp - startTimestamp) * 1000
})

const goPage = () => {
    uni.navigateTo({
        url: `/pages/order_detail/index?id=${props.orderInfo.id}`
    })
}
</script>

<style lang="scss" scoped>
.card {
    border-radius: 14rpx;
    background-color: #ffffff;
    margin: 20rpx 20rpx 0 20rpx;

    &--header {
        padding: 24rpx 30rpx;
        font-size: 26rpx;
        border-bottom: 1px solid #e5e5e5;
        .order-sn {
            color: #222222;
        }
        .status {
            color: #f36161;
        }
    }

    &--main {
        padding: 30rpx;
        color: #555555;
        font-size: 26rpx;

        .service-text {
            &--name {
                width: 460rpx;
                font-weight: 500;
                color: #222222;
                font-size: 32rpx;
            }
        }
    }

    &--footer {
        padding: 20rpx 30rpx;
        font-size: 26rpx;
        border-top: 1px solid #e5e5e5;
    }
}
</style>
