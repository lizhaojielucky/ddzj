<template>
    <!-- Trigger Start -->
    <view @click="showPop = true">
        <card>
            <view class="flex justify-between padding">
                <view class="normal"> 请选择数量 </view>
                <view class="text-base normal">
                    <text class="mr-[20rpx]">x{{ goodsNum }}</text>
                    <u-icon name="arrow-right" color="#707070" size="22"></u-icon>
                </view>
            </view>
        </card>
    </view>
    <!-- Trigger End -->

    <u-popup
        v-model="showPop"
        height="860"
        mode="bottom"
        border-radius="0"
        :closeable="true"
        @close="showPop = false"
        :safe-area-inset-bottom="true"
    >
        <view class="p-[25rpx]">
            <!-- Header Start -->
            <view class="flex col-start">
                <view @click="previewImage(0)">
                    <u-image
                        :src="goodsImage[0]?.image"
                        width="200"
                        height="200"
                        border-radius="4rpx"
                    ></u-image>
                </view>
                <view class="m-[20rpx]">
                    <view class="text-xl font-medium normal">{{ goodsName }}</view>
                    <view class="text-primary mt-[10rpx]">
                        <text class="font-medium font-40">{{ goodsPrice }}</text>
                        <text class="text-xs mt-[20rpx]">{{ unitDesc }}</text>
                    </view>
                </view>
            </view>
            <!-- Header End -->

            <!-- Main Start -->
            <view class="mt-[44rpx] flex justify-between">
                <view>数量</view>
                <view>
                    <u-number-box bgColor="transparent" :min="1" v-model="goodsNum"></u-number-box>
                </view>
            </view>
            <!-- Main End -->

            <!-- Footer Start -->
            <view class="footer">
                <button
                    class="bg-primary text-lg text-white leading-[80rpx] h-[80rpx]"
                    @click="onClick"
                >
                    确认预约
                </button>
            </view>
            <!-- Footer End -->
        </view>
    </u-popup>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import Card from './card.vue'

const emit = defineEmits(['confirm'])

const props = withDefaults(
    defineProps<{
        goodsImage: any[] // 商品图片
        goodsName: string // 商品名称
        goodsPrice: string // 商品价格
        unitDesc: string // 商品单位
    }>(),
    {
        goodsImage: [],
        goodsName: '',
        goodsPrice: '',
        unitDesc: ''
    }
)

const goodsNum = ref<number>(1)
const showPop = ref<boolean>(false)

// const goodsImg = computed(() => props.goodsImage[0] || {})

// 立即预约
const onClick = () => {
    emit('confirm', goodsNum.value)
}
// 查看商品图片
const previewImage = (current: number) => {
    uni.previewImage({
        current,
        urls: props.goodsImage.map((el: any) => el.image)
    })
}

// 暴露组件值
defineExpose({
    showPop
})
</script>
<style lang="scss" scoped>
.padding {
    padding: 0 30rpx;
}

// 底部按钮
.footer {
    left: 0;
    bottom: 0;
    width: 100%;
    position: fixed;
    padding: 20rpx 30rpx;
    background-color: #ffffff;
    box-shadow: 2rpx 2rpx 22rpx rgba($color: #000000, $alpha: 0.2);
    padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);
}
</style>
