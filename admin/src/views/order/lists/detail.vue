<template>
    <div>
        <!-- Header Start -->
        <el-card class="!border-none mt-4" shadow="never">
            <el-page-header content="订单详情" @back="$router.back()" />
        </el-card>
        <!-- Header End -->

        <div class="order-detail-main">
            <!-- 订单信息 Start -->
            <el-card class="!border-none mt-4" shadow="never" style="padding: 0 20px">
                <template #header>
                    <div class="card-header">
                        <span class="font-medium nr">订单信息</span>
                    </div>
                </template>
                <!-- 订单信息 -->
                <el-form :inline="true" :model="formData" label-width="auto">
                    <el-form-item label="订单状态: ">
                        <div class="content text-warning">
                            {{ formData.order_status_desc || '-' }}
                        </div>
                    </el-form-item>
                    <el-form-item label="支付状态: ">
                        <div class="content">{{ formData.pay_status_desc || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="订单编号: ">
                        <div class="content">{{ formData.sn || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="支付方式: ">
                        <div class="content">{{ formData.pay_way_desc || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="下单时间: ">
                        <div class="content">{{ formData.create_time || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="支付时间: ">
                        <div class="content">{{ formData.pay_time || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="用户昵称: ">
                        <div class="content">{{ formData?.user?.nickname || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="用户备注: ">
                        <div class="content">{{ formData.user_remark || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="核销码: ">
                        <div class="content">{{ formData.verification_code || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="核销状态: ">
                        <div class="content">
                            <span class="warning" v-if="formData.verification_status_desc">{{
                                formData.verification_status_desc
                            }}</span>
                            <span v-else>-</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="完成时间: ">
                        <div class="content">{{ formData.finish_time || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="商家备注: ">
                        <div class="content">{{ formData.order_remarks || '-' }}</div>
                    </el-form-item>
                </el-form>
                <!-- Button Group Start -->
                <div class="button-group">
                    <operation
                        btnStyle="primary"
                        :id="id"
                        :cancel_btn="formData.cancel_btn"
                        :verification_btn="formData.verification_btn"
                        :verification_status="formData.verification_status"
                        @refresh="getOrderDetail"
                    />
                </div>
                <!-- Button Group End -->
            </el-card>
            <!-- 订单信息 End -->

            <!-- 服务师傅 Start -->
            <el-card
                class="!border-none mt-4"
                shadow="never"
                style="padding: 0 20px"
                v-if="formData.order_status !== 0"
            >
                <template #header>
                    <span class="font-medium nr">服务师傅</span>
                </template>
                <!-- 服务师傅 -->
                <el-form :inline="true" :model="formData" label-width="auto">
                    <el-form-item label="服务师傅">
                        <div v-if="formData.order_status == 1">
                            <div v-if="!formData.staff && btnStatus == 0">
                                <el-button type="primary" @click="handleDispatch"
                                    >指派师傅</el-button
                                >
                            </div>

                            <div v-if="btnStatus == 1" class="flex items-center">
                                <!-- 选择地区列表 -->
                                <el-cascader
                                    :options="options"
                                    :props="props2"
                                    @change="handleSelect"
                                ></el-cascader>
                                <!-- 选择师傅列表 -->
                                <el-select
                                    v-model="value"
                                    class="mx-2"
                                    value-key="id"
                                    @change="handleChange"
                                >
                                    <el-option
                                        v-for="item in staffData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item"
                                    >
                                        <div class="flex items-center">
                                            <el-image
                                                style="
                                                    width: 30px;
                                                    height: 30px;
                                                    border-radius: 50%;
                                                "
                                                :src="item.user.avatar"
                                                :fit="'cover'"
                                            ></el-image>
                                            <div class="ml-2">
                                                {{ `${item.name}（${item.user.account}）` }}
                                            </div>
                                        </div>
                                    </el-option>
                                </el-select>
                                <el-button @click="handleCancel">取消</el-button>
                                <el-button type="primary" @click="handleConfirm"
                                    >确认指派</el-button
                                >
                            </div>

                            <div v-if="btnStatus == 2" class="flex items-center">
                                <div class="flex items-center">
                                    <el-image
                                        style="width: 44px; height: 44px; border-radius: 50%"
                                        :src="formData.staff?.user_image"
                                        :fit="'cover'"
                                    ></el-image>
                                    <div class="ml-2">
                                        {{ `${formData.staff?.name}（${formData.staff?.mobile}）` }}
                                    </div>
                                </div>

                                <el-button type="primary" @click="handleReDispatch"
                                    >重新指派</el-button
                                >
                            </div>
                        </div>
                        <div
                            v-if="formData.staff && formData.order_status !== 1"
                            class="flex items-center"
                        >
                            <div class="flex items-center">
                                <el-image
                                    style="width: 44px; height: 44px; border-radius: 50%"
                                    :src="formData.staff?.user_image"
                                    :fit="'cover'"
                                ></el-image>
                                <div class="ml-2">
                                    {{ `${formData.staff?.name}（${formData.staff?.mobile}）` }}
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                </el-form>
            </el-card>
            <!-- 服务师傅 End -->

            <!-- 预约信息 Start -->
            <el-card class="!border-none mt-4" shadow="never" style="padding: 0 20px">
                <template #header>
                    <span class="font-medium nr">预约信息</span>
                </template>
                <!-- 预约信息 -->
                <el-form :inline="true" :model="formData" label-width="auto">
                    <el-form-item label="预约时间: ">
                        <div class="content">
                            {{ formData.appoint_time || '-' }} {{ formData.appoint_week || '-' }}
                            {{ formData.door_time || '-' }}
                        </div>
                    </el-form-item>
                    <el-form-item label="联系人: ">
                        <div class="content">{{ formData.contact || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="手机号码: ">
                        <div class="content">{{ formData.mobile || '-' }}</div>
                    </el-form-item>
                    <el-form-item label="预约地址: ">
                        <div class="content">{{ formData.address || '-' }}</div>
                    </el-form-item>
                </el-form>
            </el-card>
            <!-- 预约信息 End -->

            <!-- 服务信息 Start -->
            <el-card class="!border-none mt-4" shadow="never" style="padding: 0 20px">
                <template #header>
                    <span class="font-medium nr">服务信息</span>
                </template>
                <!-- 服务信息 -->
                <el-table ref="tableDataRef" :data="formData.order_goods" style="width: 100%">
                    <el-table-column label="服务名称" width="400">
                        <template #default="scope">
                            <div class="flex items-center">
                                <el-image
                                    style="width: 58px; height: 58px"
                                    :src="scope.row.goods_image"
                                    :fit="'cover'"
                                ></el-image>
                                <div class="justify-center ml-2">{{ scope.row.goods_name }}</div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="goods_price" label="价格" width="300" />
                    <el-table-column property="unit_name" label="单位" width="300" />
                    <el-table-column property="goods_num" label="数量" width="300" />
                    <el-table-column
                        property="total_pay_price"
                        label="实付金额"
                        width="120"
                        fixed="right"
                    />
                </el-table>
            </el-card>
            <!-- 服务信息 End -->

            <!-- 订单日志 Start -->
            <el-card class="!border-none mt-4" shadow="never" style="padding: 0 20px">
                <template #header>
                    <span class="font-medium nr">订单日志</span>
                </template>
                <!-- 订单日志 -->
                <el-table ref="tableDataRef" :data="formData.order_log" style="width: 100%">
                    <el-table-column property="operator" label="操作人" max-width="300" />
                    <el-table-column property="channel_desc" label="操作事件" max-width="300" />
                    <el-table-column property="create_time" label="操作时间" max-width="300" />
                </el-table>
            </el-card>
            <!-- 订单日志 End -->
        </div>
    </div>
</template>

<script lang="ts" setup>
import { apiOrderDetail, apiMasterLists, apiDispatchStaff } from '@/api/order/lists'
import { ref } from 'vue'
import Operation from './components/operation.vue'
import area from '@/utils/area'
import feedback from '@/utils/feedback'

const route = useRoute()
const id = ref<any>(route.query.id)

const formData = ref<any>({})
const staffData = ref<any>([])
const value = ref('') // 当前选中的师傅
const region = ref<any>(null) // 当前选中地区
const btnStatus = ref(0) // 0-显示指派 1-显示确认和取消 2-显示重新指派
const staff = ref<any>({})
const options = ref<any>(area) // 地区列表
const props2 = {
    checkStrictly: true
}

// 获取订单详情
const getOrderDetail = async (): Promise<void> => {
    ;(formData.value as object) = await apiOrderDetail({ id: id.value })
    const list = await apiMasterLists(formData.value)
    // 列表过滤掉已存在的师傅
    staffData.value = list.filter((item: any) => item?.id !== formData.value.staff?.id)
    console.log(staffData.value)
}

// 记录所选中的数据对象
const handleChange = (val: any) => {
    staff.value = val
    return val
}

// 选中不同地区的师傅列表
const handleSelect = async (val: number[]) => {
    region.value = val[val.length - 1]
    staffData.value = await apiMasterLists({ region_id: region.value })
}

// 指派师傅
const handleDispatch = async () => {
    getOrderDetail()
    btnStatus.value = 1
}

// 确认指派
const handleConfirm = async () => {
    console.log('000:', region.value, staff.value)
    if (!region.value) {
        feedback.msgError('请选择地区')
        return
    } else if (!value.value) {
        feedback.msgError('请选择师傅')
        return
    }
    await apiDispatchStaff({ id: formData.value.id, staff_id: staff.value.id })
    btnStatus.value = 2
    value.value = ''
    getOrderDetail()
}

// 重新指派
const handleReDispatch = () => {
    btnStatus.value = 1
    value.value = ''
}

// 取消指派
const handleCancel = () => {
    btnStatus.value = 2
    value.value = ''
    getOrderDetail()
}

if (id.value) getOrderDetail()
onMounted(() => {
    setTimeout(() => {
        if (formData.value.staff && formData.value.order_status == 1) {
            btnStatus.value = 2
        }
    }, 200)
})
</script>

<style lang="scss">
.order-detail-main .el-card__header,
.order-detail-main .el-card__body {
    padding: calc(var(--el-card-padding) - 2px) 0;
}
.content {
    width: 24vw;
}
.button-group {
    border-top: 1px solid #f2f2f2;
}
</style>
