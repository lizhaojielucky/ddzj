<template>
    <view class="bg-white suggest">
        <!-- 热门搜索 -->
        <view class="hot" v-if="hot_search.length && status == 1">
            <view class="font-medium pl-[24rpx] pt-[26rpx] pb-[6rpx] text-lg">热门搜索</view>

            <view class="w-full px-[24rpx]">
                <block v-for="(hotItem, index) in hot_search" :key="index">
                    <view
                        class="max-w-full truncate keyword"
                        @click="handleHistoreSearch(hotItem.name)"
                        >{{ hotItem.name }}
                    </view>
                </block>
            </view>
        </view>

        <view class="mx-[24rpx] my-[40rpx]" v-if="hot_search.length && his_search.length"></view>

        <!-- 历史搜索 -->
        <view class="history" v-if="his_search.length">
            <view class="flex justify-between px-[24rpx] pb-[6rpx] pt-[26rpx]">
                <view class="text-lg font-medium">历史搜索</view>
                <view class="text-xs text-muted" @click="() => emit('clear')">清空</view>
            </view>

            <view class="w-full px-[24rpx]">
                <block v-for="(hisItem, index) in his_search" :key="index">
                    <view class="truncate keyword" @click="handleHistoreSearch(hisItem)">{{
                        hisItem
                    }}</view>
                </block>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, nextTick, onMounted } from 'vue'

const emit = defineEmits<{
    (event: 'search', value: string): void
    (event: 'clear', value: void): void
}>()

const props = withDefaults(
    defineProps<{
        hot_search?: any[]
        his_search?: string[]
        status: number
    }>(),
    {
        hot_search: [],
        his_search: [],
        status: 0
    }
)

const handleHistoreSearch = (text: string) => {
    emit('search', text)
}
onMounted(() => {
    console.log('props', props.hot_search)
})
</script>

<style lang="scss" scoped>
.suggest {
    height: 100%;

    .keyword {
        display: inline-block;
        margin: 24rpx 16rpx 0 0;
        padding: 8rpx 24rpx;
        border-radius: 26rpx;
        background-color: #f4f4f4;
    }
}
</style>
