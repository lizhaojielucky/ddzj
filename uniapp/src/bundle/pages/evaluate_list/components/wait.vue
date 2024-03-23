<template>
    <view class="card flex justify-between" @click="goPage">
        <view class="flex">
            <u-image :src="image" width="140" height="140"></u-image>
            <view class="ml-[20rpx]">
                <view class="normal font-medium text-xl">{{ name }}</view>
                <view class="mt-[24rpx]">
                    <price :price="price" :desc="unit_name"></price>
                </view>
            </view>
        </view>
        <view class="pt-[30rpx]">
            <u-button @click="goPage" size="mini" :plain="true" shape="circle">去评价</u-button>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, watchEffect } from 'vue'
import Price from '@/components/price/index.vue'

const props = withDefaults(
    defineProps<{
        name: string | null
        image: string | null
        unit_name: string | null
        price: string | null
        goodsId: string | number
    }>(),
    {
        name: '',
        image: '',
        unit_name: '',
        price: '',
        goodsId: ''
    }
)

const goPage = () => {
    uni.navigateTo({
        url: `/bundle/pages/evaluate_submit/index?id=${props.goodsId}`
    })
}
</script>

<style lang="scss" scoped>
.card {
    border-radius: 14rpx;
    background-color: white;
    margin: 20rpx 20rpx 0 20rpx;
    padding: 30rpx;
}
</style>
