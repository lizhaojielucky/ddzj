<template>
    <view class="flex">
        <!-- 取消订单 -->
        <template v-if="cancel">
            <button
                class="Btn bg-white text-base text-black leading-[60rpx] h-[60rpx] rounded-full"
                @click.stop="handleOrderCancel(orderId)"
            >
                取消订单
            </button>
        </template>

        <!-- 删除订单 -->
        <template v-if="orderStatus == 4 || del">
            <button
                class="Btn bg-white text-base text-black leading-[60rpx] h-[60rpx] rounded-full"
                @click.stop="handleOrderDel(orderId)"
            >
                删除订单
            </button>
        </template>

        <!-- 去评价 -->
        <template v-if="evaluate">
            <button
                class="Btn bg-white text-sm text-muted leading-[60rpx] h-[60rpx] rounded-full mx-3"
                @click.stop="goPage('/bundle/pages/evaluate_list/index')"
            >
                去评价
            </button>
        </template>

        <!-- 联系师傅 -->
        <template v-if="contact">
            <button
                class="Btn bg-white text-sm text-muted leading-[60rpx] h-[60rpx] rounded-full"
                @click.stop="handleContactMobile()"
            >
                联系师傅
            </button>
        </template>

        <!-- 去支付 -->
        <template v-if="pay">
            <button
                class="bg-primary text-lg ml-[20rpx] text-white leading-[60rpx] h-[60rpx] rounded-full"
                @click.stop="handlePayment"
            >
                去支付
            </button>
        </template>

        <!-- 确认服务 -->
        <template v-if="confirmService">
            <button
                class="bg-primary text-lg text-white leading-[60rpx] h-[60rpx] rounded-full"
                @click.stop="handleConfirmService(orderId)"
            >
                确认服务
            </button>
        </template>

        <!-- 核销订单 -->

        <template v-if="verification">
            <view class="flex justify-around">
                <button
                    class="Btn flex-1 mr-2 bg-white text-sm text-black leading-[70rpx] h-[70rpx] rounded-full"
                    @click.stop="showInputCode = true"
                >
                    手动核销码
                </button>

                <button
                    class="flex-1 bg-primary text-sm text-white leading-[70rpx] h-[70rpx] rounded-full"
                    @click.stop="handleScanQRCode"
                >
                    扫码核销
                </button>
            </view>

            <!-- 手动输入核销码MODAL -->
            <u-modal
                ref="uModalInput"
                v-model="showInputCode"
                show-cancel-button
                confirmColor="#F36161"
                confirm-text="确定"
                @confirm="inputOrderCode"
                @cancel="handleCancel"
                title="手动核销"
            >
                <view class="slot-content justify-center" style="padding: 60rpx 40rpx">
                    <u-input
                        type="number"
                        v-model="code"
                        :border="true"
                        placeholder="请输入核销码"
                        style="width: 100%"
                    />
                </view>
            </u-modal>
        </template>
    </view>
    <u-popup v-model="showConfirmPop" mode="center" height="500" border-radius="14">
        <view class="text-center w-[560rpx] pt-[40rpx]">
            <view class="w-[160rpx] h-[160rpx] px-[200rpx]">
                <u-image width="160" height="160" :src="goods_image" />
            </view>
            <view class="mt-[20rpx] truncate">{{ goods_name }}</view>
            <view class="mt-[10rpx] mb-[40rpx] text-[#f36161]">完成服务请点击确认</view>
            <button
                class="flex-1 bg-primary text-sm text-white leading-[70rpx] h-[70rpx] rounded-full mx-[40rpx]"
                @click.stop="confirmVerification"
            >
                确认核销
            </button>
        </view>
    </u-popup>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
    apiOrderCancel,
    apiStaffOrderConfirmService,
    apiStaffOrderVerification,
    apiOrderDel
} from '@/api/order'
import { toast } from '@/utils/util'

const emit = defineEmits(['refresh', 'backRefresh'])

const props = withDefaults(
    defineProps<{
        orderId?: string | number | null // 订单ID
        cancel?: boolean | number | null // 取消订单
        evaluate?: boolean | number | null // 评价
        contact?: boolean | number | null // 联系师傅
        pay?: boolean | number | null // 支付
        confirmService?: boolean | number | null // 确认服务
        verification?: boolean | number | null // 核销订单
        mobile?: number | string | null // 手机号码
        type?: number | null // 支付方式
        orderStatus?: number | string | null // 订单状态;0-待支付;1-预约中;2-服务中;3-已完成;4-已关闭
        del?: boolean | number | null // 删除订单
        goods_image?: string
        goods_name?: string
    }>(),
    {
        orderId: '',
        cancel: false,
        evaluate: false,
        contact: false,
        pay: false,
        confirmService: false,
        verification: false,
        del: false,
        mobile: '',
        type: 2,
        orderStatus: ''
    }
)
const code = ref<number | string>('') // 输入核销码
const showInputCode = ref<boolean>(false) // 显示(输入核销码)：是 | 否

// 页面跳转
const goPage = (url: string) => {
    uni.navigateTo({ url: url })
}

// 取消订单
const handleOrderCancel = async (id: number | string): Promise<void> => {
    const modelRes = await uni.showModal({
        title: '温馨提示',
        content: '确认取消该订单吗？'
    })
    if (modelRes.cancel) return

    try {
        await apiOrderCancel({ id: props.orderId })
    } catch (error) {
        console.log('错误信息：', error, props.orderId)
    }
    emit('refresh')
}

// 删除订单
const handleOrderDel = async (id: number | string): Promise<void> => {
    const modelRes = await uni.showModal({
        title: '温馨提示',
        content: '确认删除该订单吗？'
    })
    if (modelRes.cancel) return

    try {
        await apiOrderDel({ id: props.orderId })
        emit('refresh')
        // uni.navigateBack()
    } catch (error) {
        console.log('错误信息：', error, props.orderId)
    }

    await emit('refresh')
}

// 支付
const handlePayment = () => {
    uni.navigateTo({
        url: `/bundle/pages/order_pay/order_pay?order_id=${props.orderId}&from=order`
    })
}
// 联系师傅
const handleContactMobile = () => {
    uni.makePhoneCall({
        phoneNumber: props.mobile //仅为示例
    })
}
// 确认服务
const handleConfirmService = async (id: number | string): Promise<void> => {
    const modelRes = await uni.showModal({
        title: '温馨提示',
        content: '确认服务该订单吗？'
    })
    if (modelRes.cancel) return
    await apiStaffOrderConfirmService({ id: id })
    uni.$u.toast('操作成功')
    emit('refresh')
}

// 扫码核销
const handleScanQRCode = async () => {
    // #ifdef H5
    if (!isWeixinClient()) return toast('h5暂不支持扫码')
    showInputCode.value = true
    // #endif

    // #ifndef H5
    try {
        const data: any = await uni.scanCode({})
        code.value = data.result
        showConfirmPop.value = true
    } catch (error) {
        uni.$u.toast(error)
    }
    // #endif
}

// 确认核销
const showConfirmPop = ref(false)
const confirmVerification = async () => {
    try {
        await apiStaffOrderVerification({ verification_code: code.value })
        code.value = ''
        uni.$u.toast('订单核销成功')
        showConfirmPop.value = false
        emit('refresh')
    } catch (error) {
        uni.$u.toast(error)
    }
}
// 手动输入核销码
const inputOrderCode = async (): Promise<void> => {
    if (code.value === '') return toast('请输入核销码')
    await apiStaffOrderVerification({ verification_code: code.value })
    uni.$u.toast('订单核销成功')
    code.value = ''
    emit('refresh')
}

// 取消核销码弹框
const handleCancel = () => {
    code.value = ''
    emit('refresh')
}
</script>

<style lang="scss" scoped>
.Btn {
    border: 1px solid rgba(187, 187, 187, 1);
    background-color: rgba(255, 255, 255, 1);
    color: rgba(16, 16, 16, 1);
    text-align: center;
}
</style>
