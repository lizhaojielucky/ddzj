<template>
    <!-- Header Start -->
    <view class="card flex">
        <u-image :src="evaluateInfo?.goods_image" width="140" height="140"></u-image>
        <view class="ml-[20rpx]">
            <view class="normal font-medium text-xl">{{ evaluateInfo?.goods_name }}</view>
            <view class="mt-[24rpx]">
                <price :price="evaluateInfo?.goods_price" :desc="evaluateInfo?.unit_name"></price>
            </view>
        </view>
    </view>
    <!-- Header End -->

    <!-- Main Start -->
    <view class="card mt-[20rpx]">
        <view class="flex">
            <text class="normal font-medium text-base mr-[20rpx]">服务评分</text>
            <u-rate
                :count="5"
                v-model="formData.service_comment"
                :min-count="1"
                inactive-icon="star-fill"
                size="34"
            ></u-rate>
            <view class="ml-[20rpx] lighter text-xs">
                <text v-if="formData.service_comment == 5">非常好</text>
                <text v-if="formData.service_comment == 4">好</text>
                <text v-if="formData.service_comment == 3">一般</text>
                <text v-if="formData.service_comment == 2">差</text>
                <text v-if="formData.service_comment == 1">非常差</text>
            </view>
        </view>

        <view class="content mt-[30rpx]">
            <u-input
                v-model="formData.comment"
                type="textarea"
                placeholder="请输入评价内容"
                height="200"
            />
        </view>

        <view class="mt-[30rpx]">
            <uploader
                v-model="formData.image"
                :deletable="true"
                preview-size="160rpx"
                :maxUpload="6"
                image-fit="aspectFill"
            />
        </view>
    </view>

    <view class="footer mt-[30rpx]">
        <button
            class="bg-primary text-lg text-white leading-[80rpx] h-[80rpx] rounded-full"
            @click="onSubmit"
        >
            提交
        </button>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { apiEvaluateGoodsInfo, apiEvaluateAdd } from '@/api/user'
import Price from '@/components/price/index.vue'
import Uploader from '@/components/uploader/index.vue'

interface EvaluateInfoObj {
    goods_id: number
    goods_name: string
    goods_price: string | number
    goods_num: number
    unit_name: string
    goods_image: string
}

interface FormDataObj {
    order_goods_id: number
    service_comment: number | string
    comment: string | number
    image: Array<string | null>
}

const evaluateInfo = ref<EvaluateInfoObj | null>({
    goods_id: 2,
    goods_name: '日常保洁',
    goods_price: '100.00',
    goods_num: 1,
    unit_name: '元/分钟',
    goods_image: ''
})
const formData = ref<FormDataObj | null>({
    order_goods_id: 0,
    service_comment: 0,
    comment: '',
    image: []
})

const onSubmit = async (): Promise<void> => {
    try {
        await apiEvaluateAdd({ ...formData.value })
        uni.navigateBack()
    } catch (error) {
        console.log('提交评价: ', error)
    }
}

const initEvaluateGoodsInfo = async (): Promise<void> => {
    try {
        evaluateInfo.value = await apiEvaluateGoodsInfo({
            order_goods_id: formData.value.order_goods_id
        })
    } catch (error) {
        console.log('获取评价: ', error)
    }
}

onLoad((options) => {
    formData.value.order_goods_id = options.id || 0
    initEvaluateGoodsInfo()
})
</script>

<style lang="scss">
.card {
    border-radius: 14rpx;
    background-color: #ffffff;
    margin: 20rpx 20rpx 0 20rpx;
    padding: 30rpx;

    .content {
        padding: 0 24rpx;
        border-radius: 14rpx;
        background-color: #f6f6f6;
    }
}

.footer {
    padding: 0 30rpx;
}
</style>
