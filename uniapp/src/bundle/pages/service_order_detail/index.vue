<template>
    <uni-transition
        mode-class="zoom-in"
        needLayout="true"
        :show="orderData.order_goods.length"
        :duration="500"
    >
        <view class="order_detail">
            <view class="flex pb-[30rpx]">
                <image
                    v-if="orderData.order_status === 0"
                    class="header-image"
                    src="/static/images/icon_pay.png"
                />
                <image
                    v-if="orderData.order_status === 1 || orderData.order_status === 2"
                    class="header-image"
                    src="/static/images/icon_wait.png"
                />
                <image
                    v-if="orderData.order_status === 3"
                    class="header-image"
                    src="/static/images/icon_success.png"
                />
                <image
                    v-if="orderData.order_status === 4"
                    class="header-image"
                    src="@/static/images/icon_close.png"
                />
                <text class="statusDec ml-[15rpx]">{{ orderData.order_status_desc }}</text>
            </view>

            <!-- 地址卡片 -->
            <view class="card">
                <view class="card--header">
                    <view class="title">{{ orderData.contact }} {{ orderData.mobile }}</view>
                </view>
                <view class="text-sm text-muted">
                    {{ orderData.province }}
                    {{ orderData.city }}
                    {{ orderData.district }}
                    {{ orderData.address }}
                </view>
            </view>

            <!-- 商品卡片 -->
            <view class="card">
                <view class="goods-item">
                    <u-image
                        :src="orderData.order_goods[0]?.goods_image"
                        width="160"
                        height="160"
                        border-radius="4"
                    />
                    <view class="ml-[20rpx] mt-[4rpx]">
                        <view class="flex justify-between title">
                            <view class="goods-item--name truncate">{{
                                orderData.order_goods[0]?.goods_name
                            }}</view>
                            <text>x{{ orderData.order_goods[0]?.goods_num }}</text>
                        </view>
                        <view class="mt-[24rpx]">
                            <price
                                :price="orderData.order_goods[0]?.goods_price"
                                :desc="orderData.order_goods[0]?.unit_name"
                            />
                        </view>
                    </view>
                </view>
            </view>

            <!-- 上门时间 -->
            <view class="card normal text-base flex justify-between">
                <view>上门时间</view>
                <view>
                    {{ orderData.appoint_time }} {{ orderData.appoint_week }}
                    {{ orderData.door_time }}
                </view>
            </view>

            <!-- 服务金额 -->
            <view class="card normal text-base">
                <view class="flex justify-between">
                    <view>服务金额</view>
                    <view>¥{{ orderData.order_amount }}</view>
                </view>
                <view class="mt-[30rpx] flex justify-between">
                    <view>实付金额</view>
                    <view class="text-primary">¥{{ orderData.total_amount }}</view>
                </view>
            </view>

            <!-- 备注 -->
            <view class="card flex justify-between flex-wrap normal text-base">
                <view>备注</view>
                <view style="width: 100%; word-wrap: break-word">{{ orderData.user_remark }}</view>
            </view>

            <!-- 订单信息 -->
            <view class="card normal text-base">
                <view class="flex justify-between">
                    <view>订单编号</view>
                    <view>{{ orderData.sn }}</view>
                </view>
                <view class="mt-[30rpx] flex justify-between">
                    <view>支付方式</view>
                    <view>{{ orderData.pay_way_desc }}</view>
                </view>
                <view class="mt-[30rpx] flex justify-between">
                    <view>下单时间</view>
                    <view>{{ orderData.create_time }}</view>
                </view>
            </view>
        </view>
    </uni-transition>

    <view
        class="footer flex justify-end"
        v-if="orderData.confirm_service_btn || orderData.verification_btn"
    >
        <order-footer
            :orderId="orderData.id"
            :confirmService="orderData.confirm_service_btn"
            :verification="orderData.verification_btn"
            :goods_image="orderData.order_goods[0].goods_image"
            :goods_name="orderData.order_goods[0].goods_name"
            @refresh="initOrderDetail"
        />
    </view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { apiStaffOrderDetail } from '@/api/order'
import Price from '@/components/price/index.vue'
import OrderFooter from '@/components/order-footer/index.vue'

const orderData = ref<any>({
    order_goods: [],
    order_amount: '',
    total_amount: '',
    total_goods_price: ''
})
const orderId = ref<number | string>('')

const initOrderDetail = async (): Promise<void> => {
    orderData.value = await apiStaffOrderDetail({ id: orderId.value })
}

onLoad((options) => {
    orderId.value = parseInt(options?.id)
    initOrderDetail()
})
</script>

<style lang="scss">
.order_detail {
    height: 100%;
    padding: 30rpx 24rpx;
    padding-bottom: 140rpx;
    background: linear-gradient(to bottom, #f36161 200rpx, transparent 0);

    .statusDec {
        color: rgba(255, 255, 255, 1) !important;
    }

    .header-image {
        width: 44rpx;
        height: 44rpx;
    }

    .card {
        padding: 24rpx;
        margin-bottom: 20rpx;
        background-color: #fff;
        border-radius: 10rpx;

        &--header {
            padding-bottom: 20rpx;
        }
        .title {
            color: #000;
            font-size: 28rpx;
            .num {
                color: #666;
                font-size: 28rpx;
            }
        }
    }

    .goods-item {
        display: flex;
        &--name {
            width: 430rpx;

            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
.footer {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 108rpx;
    position: fixed;
    padding: 20rpx 30rpx;
    background-color: #fff;
    box-shadow: 2rpx 2rpx 22rpx rgba($color: #000, $alpha: 0.2);

    .btn {
        width: 320rpx;
    }
}
</style>
