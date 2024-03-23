<template>
    <view class="user-wallet">
        <view class="wrapper">
            <view class="top">
                <view class="text">总资产（元）</view>
                <view class="total">{{ walletData.total_money || '0.00' }}</view>

                <view class="flex">
                    <view class="flex-1">
                        <view class="text">可用余额（元）</view>
                        <view class="num">{{ walletData.user_money }}</view>
                    </view>
                    <!-- <view class="flex-1">
                        <view class="text">可提现余额（元）</view>
                        <view class="num">{{ walletData.user_earnings }}</view>
                    </view> -->
                </view>
            </view>

            <view class="flex mt-[40rpx]">
                <navigator
                    v-if="walletData.recharge_open"
                    class="recharge"
                    hover-class="none"
                    url="/bundle/pages/user_recharge/user_recharge"
                >
                    <!-- <view class="btn1" v-if="walletData.recharge_open"> 充值 </view> -->
                    <view class="btn1"> 充值 </view>
                </navigator>
                <!-- <navigator
                    class="withdraw"
                    hover-class="none"
                    url="/bundle/pages/user_withdraw/user_withdraw"
                >
                    <view class="btn2"> 提现 </view>
                </navigator> -->
            </view>
        </view>

        <view class="menus grid grid-cols-3">
            <navigator
                class="menu"
                hover-class="none"
                :url="`/bundle/pages/account_detail/account_detail?changeObject=1`"
            >
                <image src="@/static/images/icon/balance.png" alt="" />
                <view class="text">账户明细</view>
            </navigator>
            <!-- <navigator
                class="menu"
                hover-class="none"
                :url="`/bundle/pages/account_detail/account_detail?changeObject=2`"
            >
                <image src="@/static/images/icon/brokerage.png" alt="" />
                <view class="text">提现明细</view>
            </navigator> -->
            <navigator
                class="menu"
                hover-class="none"
                :url="`/bundle/pages/recharge_record/recharge_record`"
            >
                <image src="@/static/images/icon/recharge.png" alt="" />
                <view class="text">充值记录</view>
            </navigator>
            <!-- <navigator
                class="menu"
                hover-class="none"
                :url="`/bundle/pages/withdraw_record/withdraw_record`"
            >
                <image src="@/static/images/icon/withdraw.png" alt="" />
                <view class="text">提现记录</view>
            </navigator> -->
        </view>
    </view>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { apiUserWallet } from '@/api/wallet'

const walletData = ref<any>({
    user_money: '', // 可用余额
    user_earnings: '', // 可提现余额
    total_money: '', // 总资产
})

const getWalletData = () => {
    apiUserWallet('').then((res: any) => {
        walletData.value = res
    })
}

onShow(() => {
    getWalletData()
})
</script>

<style lang="scss" scoped>
.user-wallet {
    .wrapper {
        margin: 20rpx 15rpx;
        width: 720rpx;
        height: 484rpx;
        border-radius: 14rpx;
        background: #fff;
        padding: 20rpx;
        .top {
            width: 680rpx;
            height: 320rpx;
            border-radius: 20rpx;
            background: $u-type-primary;
            padding: 30rpx;
            .text {
                font-weight: 400;
                font-size: 24rpx;
                text-align: center;
                color: #e5fff5;
                margin-top: 20rpx;
            }
            .total {
                font-size: 68rpx;
                font-weight: 600;
                text-align: center;
                color: #e5fff5;
            }
            .num {
                font-weight: 600;
                font-size: 38rpx;
                text-align: center;
                color: #fff;
            }
        }

        .btn1,
        .btn2 {
            border-radius: 14rpx;
            background: #f4f4f4;
            width: 320rpx;
            height: 84rpx;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .btn2 {
            margin-left: 40rpx;
            background: $u-type-primary;
        }
        .recharge,
        .withdraw {
            font-weight: 400;
            font-size: 30rpx;
            line-height: 40rpx;
            color: #333;
        }
        .withdraw {
            color: #fff;
        }
    }

    .menus {
        margin: 20rpx 15rpx;
        width: 720rpx;
        height: 360rpx;
        border-radius: 14rpx;
        background: #fff;
        padding: 10rpx;
        .menu {
            width: 220rpx;
            height: 160rpx;
            border-radius: 14rpx;
            background: #fff;
            image {
                width: 54rpx;
                height: 54rpx;
                margin: 28rpx 78rpx 0;
            }
            .text {
                text-align: center;
            }
        }
    }
}
</style>
