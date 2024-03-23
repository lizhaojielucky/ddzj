<template>
    <view class="order_buy">
        <!-- Main Start -->
        <!-- 地址卡片 -->
        <view class="card" @click="goPage('/bundle/pages/user_address/index?type=true')">
            <view class="card--header flex justify-between">
                <template v-if="orderData.address.length === 0">
                    <view class="title pt-[20rpx]">请选择地址</view>
                </template>
                <template v-else>
                    <view class="title"
                        >{{ orderData.address?.contact }} {{ orderData.address?.mobile }}</view
                    >
                </template>

                <u-icon name="arrow-right" color="#707070" size="22"></u-icon>
            </view>
            <template v-if="!orderData.address.length">
                <view class="text-sm text-muted">
                    {{ orderData.address.province }}
                    {{ orderData.address.city }}
                    {{ orderData.address.district }}
                    {{ orderData.address.address }}
                </view>
            </template>
        </view>

        <!-- 商品卡片 -->
        <view class="card">
            <view class="goods-item">
                <u-image
                    :src="orderData.goods.image"
                    width="160"
                    height="160"
                    border-radius="4"
                ></u-image>
                <view class="ml-[20rpx] mt-[4rpx]">
                    <view class="flex justify-between title">
                        <view class="goods-item--name truncate">{{ orderData.goods.name }}</view>
                        <text class="num">x{{ orderData.goods.goods_num }}</text>
                    </view>
                    <view class="mt-[24rpx]">
                        <price
                            :price="orderData.goods.price"
                            :desc="orderData.goods.unit_desc"
                        ></price>
                    </view>
                </view>
            </view>
        </view>

        <!-- 上门时间 -->
        <view
            class="card flex justify-between"
            @click="
                goPage(
                    `/bundle/pages/appoint_time/index?appointTime=${JSON.stringify(appointTime)}`
                )
            "
        >
            <view class="normal text-base font-medium">上门时间</view>
            <view class="flex">
                <text class="mr-[20rpx] text-sm text-black">{{ appoint }}</text>
                <u-icon name="arrow-right" color="#707070" size="22"></u-icon>
            </view>
        </view>

        <!-- 备注 -->
        <view class="card">
            <view class="normal text-lg font-medium">备注</view>
            <view class="mt-[10rpx]">
                <u-input
                    v-model="userRemark"
                    type="textarea"
                    placeholder="请填写您的特殊需求"
                    height="124"
                />
            </view>
        </view>

        <!-- 服务金额 -->
        <view class="card flex justify-between normal text-base">
            <view class="font-medium">服务金额</view>
            <view>{{ `¥${orderData.total_goods_price}` }}</view>
        </view>
        <!-- Main End -->

        <!-- Footer Start -->
        <view class="footer flex justify-between items-center">
            <view class="text-primary">
                <text class="text-base">需支付：¥</text>
                <text class="font-medium text-4xl">{{ orderData.order_amount }}</text>
            </view>
            <view class="btn">
                <button
                    class="bg-primary text-lg text-white leading-[80rpx] h-[80rpx]"
                    @click="onSubmitOrder"
                >
                    提交订单
                </button>
            </view>
        </view>
        <!-- Footer End -->
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { apiPlaceOrder } from '@/api/order'
import Price from '@/components/price/index.vue'
import { usePay } from '@/hooks/payment'

// 支付钩子
const { initPayWay } = usePay()

/** Data Start **/
const orderData = ref<any>({
    address: [],
    goods: [],
    order_amount: '',
    total_amount: '',
    total_goods_price: ''
})
const appointTime = ref<object | null>({
    year: '' as string,
    date: '' as string,
    start_time: '' as string,
    end_time: '' as string
})
const userRemark = ref<string | null>('')
const addressId = ref<number | string | null>('')
const goodsForm = ref<object | null>({
    goods_num: '' as string,
    id: '' as string
})
/** Data End **/

/** Computed Start **/
// 预约上门时间
const appoint = computed(() => {
    if (!appointTime.value.date) return '请选择时间'
    else
        return `${appointTime.value.date} ${appointTime.value.start_time}-${appointTime.value.end_time}`
})
/** Computed End **/

/** Methods Start **/
// 初始化下单数据
const initPlaceOrder = async (address_id: number | string | null = ''): Promise<void> => {
    const params = {
        action: 'settlement',
        appoint_time_start: `${appointTime.value.year}-${appointTime.value.date} ${appointTime.value.start_time}`,
        appoint_time_end: `${appointTime.value.year}-${appointTime.value.date} ${appointTime.value.end_time}`,
        goods: goodsForm.value,
        address_id: address_id
    }
    orderData.value = await apiPlaceOrder({ ...params })
    addressId.value = orderData.value.address?.id
}
// 1. 确认提交订单
const onSubmitOrder = async (): Promise<void> => {
    const modelRes = await uni.showModal({
        title: '温馨提示',
        content: '是否确认下单？'
    })
    if (modelRes.confirm) {
        handlePlaceOrder()
    }
}
// 2. 下单处理
const handlePlaceOrder = async (): Promise<void> => {
    if (!addressId.value) return uni.$u.toast('请先去选择地址')
    const params = {
        action: 'submit',
        appoint_time_start: `${appointTime.value.year}-${appointTime.value.date} ${appointTime.value.start_time}`,
        appoint_time_end: `${appointTime.value.year}-${appointTime.value.date} ${appointTime.value.end_time}`,
        goods: goodsForm.value,
        address_id: addressId.value,
        user_remark: userRemark.value
    }
    try {
        const res = await apiPlaceOrder({ ...params })
        console.log('res', res)

        uni.navigateTo({
            url: `/bundle/pages/order_pay/order_pay?order_id=${res.order_id}&from=${res.type}`
        })
    } catch (err) {
        console.log('下单', err)
    }
}

// 跳转页面方法
const goPage = (url: string) => {
    uni.navigateTo({
        url: url
    })
}
/** Methods End **/

/** Life Cycle Start **/
onLoad((options: any) => {
    // 获取商品详情传来的参数
    const { goodsData, appointData } = JSON.parse(options.params)
    goodsForm.value = goodsData
    appointTime.value = appointData

    // 初始化订单信息
    initPlaceOrder()

    // 监听上门时间选择
    uni.$on('appointTime', (event) => {
        appointTime.value = event
    })
    uni.$on('address', (event) => {
        addressId.value = event
        initPlaceOrder(event)
    })
})

onUnload(() => {
    uni.$off(['appointTime', 'address'])
})
/** Life Cycle End **/

// start_time: `${appointTime.value.year}-${appointTime.value.date} ${appointTime.value.start_time}`,
// end_time: `${appointTime.value.year}-${appointTime.value.date} ${appointTime.value.end_time}`
</script>

<style lang="scss">
.order_buy {
    padding: 40rpx 24rpx;
    background: linear-gradient(to bottom, #f36161 200rpx, transparent 0);

    .card {
        padding: 24rpx;
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 10rpx;

        &--header {
            padding-bottom: 20rpx;
        }
        .title {
            color: rgba(16, 16, 16, 1);
            font-size: 32rpx;
            .num {
                font-size: 28rpx;
                color: #666;
            }
        }
    }

    .goods-item {
        display: flex;
        &--name {
            width: 430rpx;

            // line-1
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }

    .footer {
        left: 0;
        bottom: 0;
        width: 100%;
        position: fixed;
        padding: 20rpx 30rpx;
        background-color: #ffffff;
        box-shadow: 2rpx 2rpx 22rpx rgba($color: #000000, $alpha: 0.2);
        padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);

        .btn {
            width: 320rpx;
            height: 100%;
        }
    }
}
</style>
