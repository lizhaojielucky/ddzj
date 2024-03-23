<template>
    <!-- 列表里的操作 -->
    <div v-if="btnStyle === 'text'" class="inline">
        <!-- 下拉 -->
        <el-dropdown>
            <el-link class="ml-2 mt-[5px]" type="primary" :underline="false">
                更多
                <el-icon class="el-icon--right">
                    <arrow-down />
                </el-icon>
            </el-link>
            <template #dropdown>
                <el-dropdown-menu>
                    <!-- 删除订单 -->
                    <el-dropdown-item v-if="del_btn" v-perms="['order.order/del']">
                        <el-link type="danger" :underline="false" @click="handleDelete"
                            >删除订单</el-link
                        >
                    </el-dropdown-item>

                    <el-dropdown-item v-if="cancel_btn" v-perms="['order.order/cancel']">
                        <el-link type="primary" :underline="false" @click="handleCancel"
                            >取消订单</el-link
                        >
                    </el-dropdown-item>

                    <el-dropdown-item v-perms="['order.order/verification']">
                        <popup
                            class="mr-2 inline"
                            width="450px"
                            @confirm="handleVerification"
                            v-if="verification_btn"
                        >
                            <template #trigger>
                                <el-link type="primary" :underline="false">核销订单</el-link>
                            </template>
                            确认要核销订单吗？
                        </popup>
                    </el-dropdown-item>

                    <!-- 商家备注 -->
                    <el-dropdown-item v-perms="['order.order/remark']">
                        <popup
                            class="mr-2 inline"
                            width="450px"
                            :center="true"
                            @confirm="handleRemark"
                            @open="getRemarkDetail"
                        >
                            <template #trigger>
                                <el-link type="primary" :underline="false">商家备注</el-link>
                            </template>
                            <div style="height: 300px" class="mt-4">
                                <el-form ref="orderFormRef" :model="orderForm" label-width="auto">
                                    <el-form-item label="商家备注:">
                                        <el-input
                                            class="ls-input"
                                            type="textarea"
                                            v-model="orderForm.order_remarks"
                                            placeholder="请输入"
                                            :rows="10"
                                        ></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                        </popup>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

    <!-- 详情里的操作 -->
    <div v-else class="flex mt-3 inline">
        <!-- 核销订单 -->
        <div
            v-if="verification_btn"
            :disabled="verification_status === 1"
            v-perms="['order.order/verification']"
        >
            <el-button type="primary" @click="handleVerification">
                {{ verification_status === 0 ? '核销订单' : '已核销' }}
            </el-button>
        </div>

        <!-- 取消订单 -->
        <el-button
            v-if="cancel_btn"
            @click="handleCancel"
            type="danger"
            class="mx-4"
            v-perms="['order.order/cancel']"
            >取消订单</el-button
        >

        <!-- 商家备注 -->
        <popup
            class="inline"
            width="450px"
            :center="true"
            @confirm="handleRemark"
            @open="getRemarkDetail"
            v-perms="['order.order/remark']"
        >
            <template #trigger>
                <el-button>商家备注</el-button>
            </template>
            <div style="height: 300px" class="mt-4">
                <el-form ref="orderFormRef" :model="orderForm" label-width="auto">
                    <el-form-item label="商家备注:">
                        <el-input
                            class="ls-input"
                            type="textarea"
                            v-model="orderForm.order_remarks"
                            placeholder="请输入"
                            :rows="10"
                        ></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </popup>
    </div>
</template>

<script lang="ts" setup>
import {
    apiOrderDel,
    apiOrderVerification,
    apiOrderCancel,
    apiOrderRemark,
    apiOrderRemarkDetail
} from '@/api/order/lists'
import Popup from '@/components/popup/index.vue'
import { ref, defineEmits } from 'vue'
import feedback from '@/utils/feedback'

const emit = defineEmits(['refresh'])

const props = withDefaults(
    defineProps<{
        id: string | number //订单ID
        btnStyle: string //按钮样式
        cancel_btn: number //取消订单
        del_btn: number //删除订单
        verification_btn: number //核销按钮
        verification_status: number //核销文字
    }>(),
    {
        id: '',
        btnStyle: 'text',
        cancel_btn: 0,
        del_btn: 0,
        verification_btn: 0,
        verification_status: 0
    }
)

const orderForm = ref({
    order_remarks: '' as string
})

// 取消订单
const handleCancel = async (): Promise<void> => {
    await feedback.confirm('确定要取消订单吗？')
    await apiOrderCancel({ id: props.id })
    emit('refresh')
}

// 核销订单
const handleVerification = async (): Promise<void> => {
    await feedback.confirm('确认要核销订单吗？')
    await apiOrderVerification({ id: props.id })
    emit('refresh')
}

// 删除服务
const handleDelete = async (): Promise<void> => {
    await feedback.confirm('确认要删除吗？')
    await apiOrderDel({ id: props.id })
    emit('refresh')
}

// 提交商家备注
const handleRemark = async (): Promise<void> => {
    await apiOrderRemark({ id: props.id, remark: orderForm.value.order_remarks })
    emit('refresh')
}

// 商家备注详情
const getRemarkDetail = async (): Promise<void> => {
    orderForm.value = await apiOrderRemarkDetail({ id: props.id })
}
</script>

<style lang="scss" scoped>
.ls-input {
    width: 30vw;
}
</style>
