<template>
    <view class="master-detail">
        <z-paging auto-show-back-to-top :auto="true" ref="paging" v-model="dataList" @query="queryList" height="100%">

            <view class="header">
                <view class="flex items-center h-[200rpx] bg-primary px-[24rpx]">
                    <u-image class="mx-[15rpx]" :src="masterData.user_image" width="100" height="100"
                        border-radius="50%">
                    </u-image>
                    <text class="text-2xl text-white font-medium ml-[20rpx]">{{
                    masterData.name
                    }}</text>
                </view>
                <view class="bg-white px-[24rpx] py-[30rpx]">
                    <view class="text-xl font-medium pb-[20rpx]">TA的信息</view>
                    <view class="text-sm pb-[20rpx]">所在地区：{{ masterData.city }} -
                        {{ masterData.district }}</view>
                    <view class="text-sm pb-[20rpx]">加入时间：{{ masterData.create_time }}</view>
                </view>
            </view>

            <view class="p-[24rpx] bg-white mt-[20rpx]">
                <view class="text-xl font-medium pb-[20rpx] normal">TA的服务（{{ masterData?.goods.length || 0 }}）
                </view>

                <view class="">
                    <goods-card :goodsList="masterData.goods"></goods-card>
                </view>
            </view>
        </z-paging>
    </view>
</template>

<script lang="ts" setup>
import { ref, unref, shallowRef, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { apiStaffDetail } from '@/api/store'
import GoodsCard from "@/components/goods-card/index.vue"

// 师傅id
const masterId = ref<number | string>('')
// 师傅列表数据
const dataList = ref<any>([])
// 下拉组件的Ref
const paging = shallowRef<any>(null)

const masterData = computed(() => unref(dataList)[0] || { goods: [] });

onLoad((options) => {
    masterId.value = options?.id || ''
})

const queryList = async () => {
    try {
        const data = await apiStaffDetail({
            id: masterId.value
        })
        paging.value.complete([data])
    } catch (e) {
        console.log('报错=>', e)
        //TODO handle the exception
        paging.value.complete(false)
    }
}
</script>

<style lang="scss">

</style>
