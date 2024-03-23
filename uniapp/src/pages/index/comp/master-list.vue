<template>
    <card title="师傅推荐">
        <template #header-right>
            <view>
                <u-button
                    type="error"
                    size="mini"
                    :plain="true"
                    shape="circle"
                    @click="goPage('/bundle/pages/master_worker_list/index')"
                    class="button"
                >
                    <text class="text-xs text-primary">更多</text>
                    <u-icon name="arrow-right text-primary" size="18"></u-icon>
                </u-button>
            </view>
        </template>

        <block v-for="item3 in lists" :key="item3.id">
            <view
                class="master_worker_item mr-[20rpx]"
                @click.stop="goPage(`/bundle/pages/master_worker_detail/index?id=${item3.id}`)"
            >
                <view class="flex">
                    <u-image
                        :src="item3.user_image"
                        width="100"
                        height="100"
                        border-radius="50"
                    ></u-image>
                    <view class="master_worker_item--text ml-[20rpx]">
                        <view class="master_worker-title">{{ item3.name }}</view>
                        <view class="truncate master_worker-desc mt-[10rpx]"
                            >服务项目：{{ item3.goods_name }}</view
                        >
                    </view>
                </view>
            </view>
        </block>
    </card>
</template>

<script lang="ts" setup>
import Card from './card.vue'

defineProps({
    lists: {
        type: Array,
        default: []
    }
})

const goPage = (url: string) => {
    uni.navigateTo({ url: url })
}
</script>

<style lang="scss">
.master_worker_item {
    display: inline-block;
    padding: 24rpx 20rpx 36rpx 28rpx;
    border: 1px solid $u-border-color;
    border-radius: 0.5rem;

    &--text {
        .master_worker-title {
            font-weight: 500;
            color: #222;
            font-size: 30rpx;
        }

        .master_worker-desc {
            max-width: 350rpx;
            color: #222;
            font-size: 26rpx;
        }
    }
}
</style>
