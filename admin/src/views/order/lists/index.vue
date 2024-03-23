<template>
    <div>
        <el-card shadow="never" class="!border-none">
            <el-form :model="formData" inline>
                <el-form-item label="订单编号">
                    <el-input
                        class="ls-input"
                        v-model="formData.order_info"
                        placeholder="请输入订单编号"
                    />
                </el-form-item>
                <el-form-item label="用户信息">
                    <el-input
                        class="ls-input"
                        v-model="formData.user_info"
                        placeholder="请输入用户信息"
                    />
                </el-form-item>
                <el-form-item label="服务名称">
                    <el-input
                        class="ls-input"
                        v-model="formData.goods_info"
                        placeholder="请输入服务名称"
                    />
                </el-form-item>
                <el-form-item label="服务师傅">
                    <el-input
                        class="ls-input"
                        v-model="formData.staff_info"
                        placeholder="请输入师傅姓名"
                    />
                </el-form-item>
                <el-form-item label="支付状态">
                    <el-select v-model="formData.pay_status" placeholder="请选择" class="ls-input">
                        <el-option label="全部" value></el-option>
                        <el-option label="待支付" value="0"></el-option>
                        <el-option label="已支付" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="派单状态">
                    <el-select v-model="formData.is_dispatch" placeholder="请选择" class="ls-input">
                        <el-option label="全部" value></el-option>
                        <el-option label="未派单" value="0"></el-option>
                        <el-option label="已派单" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="下单时间">
                    <data-picker
                        class="ls-input"
                        style="width: 280px"
                        v-model:start_time="formData.start_time"
                        v-model:end_time="formData.end_time"
                    ></data-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="resetPage">查询</el-button>
                    <el-button @click="resetParams">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card shadow="never" class="mt-4 !border-none">
            <el-tabs v-model="formData.order_status" @tab-change="resetPage">
                <el-tab-pane
                    v-for="(value, key, index) in pager.extend"
                    :key="index"
                    :label="`${orderMode[key]}(${value})`"
                    :name="index ? index : ''"
                >
                </el-tab-pane>
            </el-tabs>
            <div class="mt-4">
                <el-table
                    ref="tableData"
                    size="large"
                    :data="pager.lists"
                    v-loading="pager.loading"
                >
                    <el-table-column property="sn" label="订单编号" min-width="180" />
                    <el-table-column property="nickname" label="用户信息" min-width="100">
                        <template #default="scope">
                            <el-popover placement="top-start" width="200px" trigger="hover">
                                <div class="flex">
                                    <span class="flex-none mr-2">头像：</span>
                                    <el-image
                                        :src="scope.row.user?.avatar"
                                        style="width: 40px; height: 40px; border-radius: 50%"
                                    >
                                    </el-image>
                                </div>
                                <div class="flex mt-2">
                                    <span class="flex-none mr-2">昵称：</span>
                                    <span>{{ scope.row.user?.nickname }}</span>
                                </div>
                                <div class="flex mt-2">
                                    <span class="flex-none mr-2">编号：</span>
                                    <span>{{ scope.row.user?.sn }}</span>
                                </div>
                                <template #reference>
                                    <router-link :to="`/user/detail?id=${scope.row.user?.id}}`">
                                        <div class="pointer normal">
                                            {{ scope.row.user?.nickname }}
                                        </div>
                                    </router-link>
                                </template>
                            </el-popover>
                        </template>
                    </el-table-column>
                    <el-table-column label="服务名称" min-width="260">
                        <template #default="scope">
                            <div
                                class="flex items-center goods-box"
                                v-for="(item2, index2) in scope.row.order_goods"
                                :key="index2"
                            >
                                <div class="w-[60px] h-[60px]">
                                    <el-image
                                        style="width: 60px; height: 60px"
                                        :src="item2.goods_image"
                                        :preview-src-list="[item2.goods_image]"
                                        :hide-on-click-modal="true"
                                        :preview-teleported="true"
                                        :fit="'contain'"
                                    />
                                </div>
                                <router-link
                                    :to="`/service/lists/edit?id=${item2.goods_id}`"
                                    class="ml-2 xs"
                                >
                                    <div class="goods-name">{{ item2.goods_name }}</div>
                                    <div class="form-tips">
                                        {{ item2.goods_price }} {{ item2.unit_name }}
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column property="total_num" label="数量" width="80" />
                    <el-table-column property="order_amount" label="实付金额" min-width="100">
                        <template #default="scope"> ¥{{ scope.row.order_amount }} </template>
                    </el-table-column>
                    <el-table-column property="appoint_week" label="预约日期" width="160">
                        <template #default="scope">
                            {{ scope.row.appoint_time }} {{ scope.row.appoint_week }}
                            {{ scope.row.door_time }}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column property="door_time" label="上门时间" min-width="100" /> -->
                    <el-table-column property="contact" label="联系人" width="100" />
                    <el-table-column label="订单状态" width="100" prop="order_status_desc">
                        <template v-slot="{ row }">
                            <span
                                :class="{
                                    error:
                                        row.order_status_desc === '待支付' ||
                                        row.order_status_desc === '已关闭'
                                }"
                                >{{ row.order_status_desc }}</span
                            >
                        </template>
                    </el-table-column>
                    <el-table-column label="派单状态" width="100" prop="dispatch_desc">
                        <template v-slot="{ row }">
                            <el-tag type="success" v-if="row.is_dispatch == 1"> 已派单 </el-tag>
                            <el-tag type="danger" v-if="row.is_dispatch == 0"> 未派单 </el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column property="address" label="操作" min-width="140" fixed="right">
                        <template #default="scope">
                            <router-link
                                class="mr-2"
                                :to="{
                                    path: '/order/detail',
                                    query: {
                                        id: scope.row.id
                                    }
                                }"
                            >
                                <el-link type="primary" :underline="false">详情</el-link>
                            </router-link>
                            <!-- 操作 -->
                            <operation
                                btnStyle="text"
                                :id="scope.row.id"
                                :cancel_btn="scope.row.cancel_btn"
                                :del_btn="scope.row.del_btn"
                                :verification_btn="scope.row.verification_btn"
                                @refresh="resetPage"
                            />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="flex justify-end mt-4">
                <pagination v-model="pager" @change="getLists" />
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { apiOrderLists } from '@/api/order/lists'
import { reactive } from 'vue'
import { OrderMode } from '@/enums/modeEnum'
import Operation from './components/operation.vue'
import Pagination from '@/components/pagination/index.vue'
import DataPicker from '@/components/data-picker/index.vue'
import { usePaging } from '@/hooks/usePaging'

interface formDataObj {
    order_info: string //否	string	订单编号
    user_info: string //否	string	用户信息
    goods_info: string //否	string	服务名称
    pay_status: string | number //否	int	支付状态;0-待支付;1-已支付;
    start_time: string //否	string	开始时间
    end_time: string //否	string	结束时间
    order_status: string | number //否	int	订单状态;0-待支付;1-预约中;2-服务中;3-已完成;4-已关闭
    staff_info: string // 否 师傅信息
    is_dispatch: string | number // 否 int 派单状态;0-委派单;1-已派单
}

const orderMode: any = reactive<any>(OrderMode)
const formData = reactive<formDataObj>({
    order_info: '',
    user_info: '',
    goods_info: '',
    pay_status: '',
    start_time: '',
    end_time: '',
    order_status: '',
    staff_info: '',
    is_dispatch: ''
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: apiOrderLists,
    params: formData
})

getLists()
</script>

<style lang="scss" scoped>
.ls-input {
    width: 280px;
}

.error {
    color: #db2828;
}

.goods-box {
    .goods-name {
        color: #333333;
    }
}

.goods-box:hover {
    .goods-name {
        color: #4a5dff;
        text-decoration: underline;
    }
}
a {
    text-decoration: none !important; //去掉原有链接文字下划线
}
.el-tabs__nav-wrap::after {
    height: 1px !important;
}
</style>
