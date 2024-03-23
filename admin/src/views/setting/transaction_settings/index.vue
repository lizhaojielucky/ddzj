<template>
    <div class="transaction_settings">
        <el-card class="!border-none mt-4" shadow="never">
            <el-form :model="formData" label-width="160px" ref="formRef">
                <el-form-item label="系统取消待付款订单" prop="cancel_unpaid_orders">
                    <el-radio-group v-model="formData.cancel_unpaid_orders">
                        <div class="flex flex-col">
                            <el-radio class="mb-[14px]" :label="0"
                                >关闭系统自动取消待付款订单</el-radio
                            >
                            <el-radio :label="1">
                                订单提交后
                                <el-input
                                    v-model="formData.cancel_unpaid_orders_times"
                                    class="w-20 mx-2 ls-input"
                                ></el-input>
                                分钟内未付款，系统自动取消
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="系统自动核销订单" prop="verification_orders">
                    <el-radio-group v-model="formData.verification_orders">
                        <div class="flex flex-col">
                            <el-radio class="mb-[14px]" :label="0">关闭系统自动核销订单</el-radio>
                            <el-radio :label="1">
                                师傅未在
                                <el-input
                                    required
                                    v-model="formData.verification_orders_times"
                                    class="w-20 mx-2 ls-input"
                                ></el-input>
                                小时内核销订单，系统自动核销
                            </el-radio>
                        </div>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="系统随机派单" prop="is_auth_dispatch">
                    <div>
                        <el-radio-group v-model="formData.is_auth_dispatch">
                            <el-radio :label="1">开启</el-radio>
                            <el-radio :label="0">关闭</el-radio>
                        </el-radio-group>
                        <div class="form-tips">
                            开启之后，用户下单系统会在符合条件的情况随机派单给师傅
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>

    <footer-btns>
        <el-button
            v-perms="['setting.transaction_settings/setConfig']"
            type="primary"
            @click="onSubmit"
            >保存</el-button
        >
    </footer-btns>
</template>

<script lang="ts" setup>
import { getConfig, setConfig } from '@/api/transaction_settings/index'
import FooterBtns from '@/components/footer-btns/index.vue'

const formData = ref<any>({
    cancel_unpaid_orders: '', // 是否开启：1-是；0-否
    cancel_unpaid_orders_times: '', // 自动取消未支付订单时间
    verification_orders: '', // 是否开启：1-是；0-否
    verification_orders_times: '', // 自动核销订单时间
    is_auth_dispatch: '' // 是否系统随机派单：1-是；0-否
})

// 获取
const toGetConfig = async () => {
    const res = await getConfig()
    formData.value = res
}

// 保存
const onSubmit = async () => {
    await setConfig({ ...formData.value })
}

toGetConfig()
</script>
