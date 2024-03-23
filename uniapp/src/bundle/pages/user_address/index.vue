<template>
    <!-- 收货地址的列表数据 -->
    <view class="address-list">
        <z-paging
            auto-show-back-to-top
            ref="paging"
            v-model="addressList"
            @query="queryList"
            :fixed="false"
            use-page-scroll
            height="100%"
        >
            <block v-for="(item, index) in addressList" :key="item.id">
                <view
                    class="address-list--item flex justify-between mt-[20rpx]"
                    :data-id="item.id"
                    @click.stop="onSelect"
                >
                    <view class="flex-1">
                        <view>
                            <text class="text-xl font-medium">
                                {{ item.contact }} {{ item.mobile }}
                            </text>
                            <text class="default" v-if="item.is_default">默认</text>
                        </view>
                        <view class="mt-[20rpx] sm text-muted">
                            {{ item.province }}
                            {{ item.city }}
                            {{ item.district }}
                            {{ item.address }}
                        </view>
                    </view>
                    <view class="setting" @click.stop="goEditAddress(item.id)"> 编辑 </view>
                </view>
            </block>
        </z-paging>

        <view class="fixed flex items-center justify-between bg-white footer">
            <!-- #ifdef H5 || MP-WEIXIN -->
            <view v-if="isWeixin" class="mr-[20rpx]">
                <button
                    class="bg-color text-lg text-black border-none rounded-full flex items-center justify-center leading-[80rpx] h-[80rpx]"
                    @click="getWxAddressFun"
                >
                    <image
                        class="icon-md mr-[10rpx]"
                        :src="'../../static/images/icon_wechat.png'"
                    ></image>
                    微信导入
                </button>
            </view>
            <!-- #endif -->
            <view>
                <button
                    class="bg-primary text-lg text-white rounded-full leading-[80rpx] h-[80rpx]"
                    @click="goEditAddress('')"
                >
                    添加地址
                </button>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { shallowRef, ref } from 'vue'
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'
import { getGeocoder } from '@/api/app'
import { apiAddressLists, apiAddressEditDefault } from '@/api/user'
import { wxOaAddress } from '@/hooks/wechat'
import { toast } from '@/utils/util'
import { isWeixinClient } from '@/utils/client'
import { wxOaConfig } from '@/hooks/wechat'

const paging = shallowRef<any>(null)
const type = ref(false)
const addressList = ref<any>([]) // 地址数据列表
const isWeixin = ref(true) // 是不是微信，如果是就显示微信导入地址按钮
const isIOS = uni.getSystemInfoSync().system.includes('iOS')

// 选择当前地址作为支付地址
const onSelect = async (event: any) => {
    const id = event?.currentTarget?.dataset?.id
    try {
        if (type.value) {
            uni.$emit('address', id)
            uni.navigateBack()
        } else {
            await apiAddressEditDefault({ id })
            uni.redirectTo({
                url: '/bundle/pages/user_address/index',
            })
        }
    } catch (error) {
        console.log(error, '设置默认地址捕捉错误')
    }
}

// 编辑地址
const goEditAddress = (params = '') => {
    console.log('parmas', params)

    uni.navigateTo({
        url: `/bundle/pages/user_address_edit/index?id=${params}`,
    })
}

// 获取地址列表
const queryList = async (pageNo, pageSize) => {
    try {
        const res = await apiAddressLists({ pageNo, pageSize })
        console.log(res, addressList.value)
        paging.value.setLocalPaging(res)
    } catch (e) {
        console.log('报错=>', e)
        //TODO handle the exception
        paging.value.setLocalPaging(false)
    }
}

// 微信导入地址
const getWxAddressFun = async () => {
    // #ifdef H5
    // 解决ios环境下无法微信导入问题
    if (isIOS && location.href.indexOf('#reloaded') == -1) {
        location.href = location.href + '#reloaded'
        location.reload()
    }
    try {
        wxOaConfig().then()
        const res = await wxOaAddress()
        getLocation(res.cityName + res.countyName + res.detailInfo, res)
    } catch (error) {
        console.log(error)
    }
    // #endif
    // #ifdef MP-WEIXIN
    const { errMsg } = await uni.authorize({ scope: 'scope.address' })
    if (errMsg === 'authorize:ok') {
        try {
            const res = await uni.chooseAddress()
            console.log(res)
            getLocation(res.cityName + res.countyName + res.detailInfo, res)
        } catch (error) {
            console.log('导入微信地址地址', error)
        }
    }
    // #endif
}

// 解析地址转坐标d
const getLocation = async (address: string, address_info: any) => {
    try {
        const res = await getGeocoder({ address })
        if (res.status == 0) {
            const data = res.result
            const obj = {
                latitude: data.location.lat,
                longitude: data.location.lng,
                name: address_info.userName,
                mobile: address_info.telNumber,
            }
            uni.setStorageSync('wxAddress', JSON.stringify(obj))
            goEditAddress()
        } else {
            toast(res.message)
        }
    } catch (error) {
        console.log('逆解析地址', error)
    }
}

onLoad((options: { type?: boolean }) => {
    if (options.type) type.value = options.type
    //#ifdef H5
    isWeixin.value = isWeixinClient()
    //#endif
})

onUnload(() => {
    uni.$emit('changeAddress')
})

onShow(() => {
    paging.value.reload()
})
</script>
<style lang="scss">
page {
    // overflow: hidden;
    padding-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.icon-md {
    width: 48rpx;
    height: 48rpx;
    vertical-align: top;
}

.address-list {
    &--item {
        border-radius: 14rpx;
        background-color: #ffffff;
        margin: 20rpx 20rpx 0 20rpx;
        padding: 30rpx 30rpx 36rpx 30rpx;

        .default {
            padding: 0 4rpx;
            margin-left: 20rpx;
            color: #f36161;
            font-size: 22rpx;
            background: rgba(#f36161, 0.1);
        }

        .setting {
            height: 90rpx;
            width: 100rpx;
            line-height: 90rpx;
            text-align: right;
            color: #f36161;
            font-size: 26rpx;
        }
    }
}

.footer {
    z-index: 999;
    left: 0;
    right: 0;
    bottom: 0;
    height: 118rpx;
    line-height: 118rpx;
    position: fixed;
    padding: 0 30rpx;
    box-sizing: content-box;
    padding-bottom: env(safe-area-inset-bottom);

    > view {
        width: 100%;
    }
}
</style>
