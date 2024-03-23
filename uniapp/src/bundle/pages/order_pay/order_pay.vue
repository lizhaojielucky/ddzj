<template>
    <!-- <u-navbar title="订单支付" @leftClick="handleleft"> </u-navbar> -->
    <view class="box flex justify-center items-center flex-col">
        <view class="box-text">￥{{ payData.order_amount }}</view>
        <view class="box-time flex" v-if="timeStamp >= 0 && params.from === 'order'"
            >支付剩余时间<u-count-down
                :timestamp="timeStamp"
                @end="handleCountDownEnd"
                format="mm:ss"
                :font-size="26"
                :separator-size="26"
        /></view>
    </view>
    <view class="pay-box">
        <radio-group>
            <view
                v-for="item in payData.lists"
                :key="item.id"
                class="item"
                @click="selectPayWay(item.pay_way)"
            >
                <label>
                    <view class="flex justify-between items-center">
                        <view class="flex items-center py-[20rpx] justify-between w-full">
                            <view class="flex items-center">
                                <u-image :src="item.image" width="48" height="48" />
                                <view class="pl-[20rpx]">
                                    <view class="text-[28rpx] text-[#333]">{{ item.name }}</view>
                                    <view class="pt-1 text-[24rpx] text-muted">
                                        {{ item.extra }}
                                    </view>
                                </view>
                            </view>
                            <view>
                                <radio
                                    color="#F36161"
                                    :value="item.pay_way"
                                    :checked="item.pay_way === payWay"
                                />
                            </view>
                        </view>
                    </view>
                </label>
            </view>
        </radio-group>
        <!-- <u-radio-group v-model="payWay" class="radio" @change="radioChange">
            <view
                class="flex justify-between items-center item"
                v-for="item in payData.lists"
                :key="item.id"
                @click="selectPayWay(item.pay_way)"
            >
                <view class="flex items-center py-[20rpx] justify-between w-full">
                    <view class="flex">
                        <u-image :src="item.image" width="48" height="48" />
                        <view class="pl-[20rpx]">
                            <view class="text-[28rpx] text-[#333]">{{ item.name }}</view>
                            <view class="pt-1 text-[24rpx] text-muted">
                                {{ item.extra }}
                            </view>
                        </view>
                    </view>
                    <view>
                        <u-radio :name="item.pay_way" active-color="#F36161" />
                    </view>
                </view>
            </view>
        </u-radio-group> -->
    </view>
    <view class="bottom_box w-full p-[20rpx]">
        <button class="pay_btn" @click="onSubmitOrder">立即支付</button>
    </view>
</template>
<script setup lang="ts">
import { ref } from 'vue'

import { usePay } from '@/hooks/payment'
import { onLoad } from '@dcloudio/uni-app'

//支付钩子
const { initPayWay, handlePayPrepay } = usePay()
const params = ref<any>({
    from: 'order',
    order_id: '',
    icon: '',
    order_amount: ''
})
const payData: any = ref({
    cancel_time: '',
    order_amount: ''
})
// 支付方式:1-微信支付;2-支付宝支付;3-余额支付;
const payWay = ref()
const timeStamp = ref<number | string | undefined>()

const initPlaceOrder = async () => {
    payData.value = await initPayWay({ ...params.value })
    timeStamp.value = (payData.value.cancel_time - Date.now() / 1000) * 1000
    const checkPay =
        payData.value.lists.find((item: any) => item.is_default) || payData.value.lists[0]
    payWay.value = checkPay?.pay_way
}

const onSubmitOrder = async () => {
    const modelRes = await uni.showModal({
        title: '温馨提示',
        content: '确认支付吗？'
    })
    if (modelRes.cancel) return

    try {
        handlePayPrepay({
            from: params.value.from,
            pay_way: payWay.value,
            order_id: params.value.order_id
        })
    } catch (error) {
        console.log(error)
    }
}
const selectPayWay = (pay: number) => {
    payWay.value = pay
}

onLoad(async (option: any) => {
    if (option?.order_amount) {
        params.value.order_amount = option?.order_amount
        payWay.value = 2
    }
    params.value.order_id = option.order_id
    params.value.from = option.from
    initPlaceOrder()
})
const handleCountDownEnd = async (e: any): Promise<void> => {
    await uni.showModal({
        title: '温馨提示',
        showCancel: false,
        content: '当前订单支付时间已过，请重新下单',
        success: () => {
            uni.reLaunch({
                url: '/pages/index/index'
            })
        }
    })
}
</script>
<style lang="scss" scoped>
// 处理h5strat
.radio {
    display: block;
}
// END
.box {
    margin: 20rpx 20rpx 0;
    height: 240rpx;
    border-radius: 14rpx 14rpx 0 0;
    background: linear-gradient(90deg, $u-type-primary 0%, $u-type-primary 100%);
    &-text {
        color: rgba(255, 255, 255, 1);
        font-size: 60rpx;
    }
    &-time {
        border-radius: 200rpx;
        background-color: rgba(255, 255, 255, 1);
        padding: 10rpx 48rpx;
        margin-top: 24rpx;
        font-size: 24rpx;
    }
}
.pay-box {
    border-radius: 0 0 14rpx 14rpx;
    background-color: white;
    padding: 20rpx;
    margin: 20rpx;
    margin-top: 0;
    .item:not(:last-child) {
        border-bottom: 1rpx solid #e5e5e592;
        padding-bottom: 20rpx;
    }
}

.bottom_box {
    width: 100%;
    position: fixed;
    bottom: env(safe-area-inset-bottom);
    .pay_btn {
        border-radius: 200rpx;
        color: white;
        background-color: $u-type-primary;
        font-size: 30rpx;
        line-height: 80rpx;
        height: 80rpx;
        text-align: center;
    }
}
</style>
