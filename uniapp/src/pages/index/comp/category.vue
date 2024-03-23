<template>
    <block v-for="(item2, index) in lists" :key="item2.id">
        <card :title="item2.name">
            <template #header-right>
                <view>
                    <u-button
                        type="error"
                        size="mini"
                        :plain="true"
                        shape="circle"
                        class="button"
                        @click.stop="
                            goPage(`/bundle/pages/category_goods_list/index?id=${item2.id}`)
                        "
                    >
                        <text class="text-xs text-primary">更多</text>
                        <u-icon name="arrow-right text-primary" size="18"></u-icon>
                    </u-button>
                </view>
            </template>

            <goods-card :goodsList="item2.goods" type="row"></goods-card>
        </card>
    </block>
</template>

<script lang="ts" setup>
import Card from './card.vue'
import GoodsCard from '@/components/goods-card/index.vue'

const props = defineProps({
    lists: {
        type: Array,
        default: []
    }
})

const goPage = (url: string) => {
    uni.navigateTo({ url })
}
</script>

<style></style>
