<template>
    <uni-transition
        mode-class="zoom-in"
        needLayout="true"
        :show="serviceData.qrcode.length"
        :duration="500"
    >
        <view class="box">
            <view class="flex justify-center">
                <u-image :src="serviceData.qrcode" width="300" height="300"></u-image>
            </view>
            <view class="text-center mt-[20rpx] normal text-base">
                {{ serviceData.title }}
            </view>
            <view class="text-center mt-[20rpx] text-muted text-sm" v-if="serviceData.time">
                服务时间：{{ serviceData.time }}
            </view>
            <view class="text-center mt-[20rpx] text-muted text-sm" v-if="serviceData.mobile">
                服务电话：{{ serviceData.mobile }}
            </view>
            <view class="mt-[40rpx]">
                <!-- #ifdef H5 -->
                <button
                    class="bg-primary text-lg text-white rounded-full"
                    @click="toast('长按二维码保存')"
                >
                    长按二维码保存
                </button>
                <!-- #endif -->
                <!-- #ifndef H5 -->
                <button
                    class="bg-primary text-lg text-white leading-[80rpx] h-[80rpx] rounded-full"
                    @click="saveImageQr"
                >
                    保存二维码
                </button>
                <!-- #endif -->
            </view>
        </view>
    </uni-transition>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { toast } from '@/utils/util'
import { apiContactService } from '@/api/app'

/** Interface Start **/
interface serviceDataObj {
    qrcode: string // 客服二维码
    title: string // 客服微信
    mobile: string // 客服电话
    time: string // 服务时间
}
/** Interface End **/

/** Data Start **/

const serviceData = ref<serviceDataObj>({
    qrcode: '',
    title: '',
    mobile: '',
    time: ''
})
/** Data End **/

/** Methods Start **/
// 获取客服信息
const getContactService = async (): Promise<void> => {
    const res = await apiContactService()
    serviceData.value = res[0].content

    // const res = await apiIndex({
    //     city_id: appStore.city.city_id
    // })
    // console.log('客服信息：',res)
}

// 保存二维码
const saveImageQr = async (): Promise<void> => {
    try {
        const res = await uni.getImageInfo({ src: serviceData.value.qrcode })
        try {
            await uni.saveImageToPhotosAlbum({ filePath: res.path })
            toast('保存成功')
        } catch (e) {
            const modelRes = await uni.showModal({
                title: '图片保存失败',
                content: '请确认是否已开启授权'
            })
            if (modelRes.confirm) uni.openSetting()
        }
    } catch (err) {
        toast('请在小程序后台配置downloadFile')
    }
}
/** Methods End **/

/** Life Cycle Start **/
getContactService()
/** Life Cycle End **/
</script>

<style lang="scss">
page {
    padding: 24rpx;
    box-sizing: border-box;
    background-color: #ffffff;
}

.box {
    padding: 64rpx 120rpx;
    background: linear-gradient(
        to bottom,
        rgba(#f36161, 0.1),
        rgba(#f36161, 0) 164rpx,
        transparent 0
    );
}
</style>
