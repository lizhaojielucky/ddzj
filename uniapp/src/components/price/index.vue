<template>
    <view class="primary">
        <text class="text-2xl font-medium text">{{ price }}</text>
        <text class="text-xs text">{{ desc }}</text>
		<text v-if="scribingPrice" class="text-xs line-through ml-2 text-muted"
		    >{{ scribingPrice }}元</text
		>
    </view>
</template>

<script setup lang="ts">
import { ref, withDefaults } from 'vue'

/** Props Start **/
const props = withDefaults(
    defineProps<{
        price?: string // 价格
        desc?: string // 介绍
		scribingPrice?:string // 划线价
    }>(),
    {
        price: '',
        desc: '',
		scribingPrice:''
    }
)
/** Props End **/

/** Methods Start **/

/** Methods End **/
</script>

<style lang="scss" scoped>
.text {
    color: rgba(248, 113, 113) !important;
}
</style>
