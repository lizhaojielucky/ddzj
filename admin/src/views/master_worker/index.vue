<template>
    <el-card shadow="never" class="!border-none">
        <el-form :model="formData" inline>
            <el-form-item label="师傅信息">
                <el-input
                    class="ls-input"
                    v-model="formData.staff_info"
                    placeholder="账号/手机号"
                />
            </el-form-item>
            <el-form-item label="加入时间">
                <data-picker
                    class="ls-input"
                    style="width: 280px"
                    v-model:start_time="formData.start_time"
                    v-model:end_time="formData.end_time"
                ></data-picker>
            </el-form-item>
            <el-form-item label="所在地区">
                <el-cascader
                    class="w-56 ls-input"
                    :options="options"
                    :props="props2"
                    @change="handleSelect"
                    ref="cascaderPanelRef"
                />
            </el-form-item>
            <el-form-item label="首页推荐">
                <el-select v-model="formData.is_recommend" placeholder="请选择" class="ls-input">
                    <el-option label="全部" value></el-option>
                    <el-option label="推荐" value="1"></el-option>
                    <el-option label="不推荐" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="师傅状态">
                <el-select v-model="formData.status" placeholder="请选择" class="ls-input">
                    <el-option label="全部" value></el-option>
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="停用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <div class="flex">
                    <el-button type="primary" @click="getLists">查询</el-button>
                    <el-button @click="handleResetParams">重置</el-button>
                </div>
            </el-form-item>
        </el-form>
    </el-card>

    <el-card shadow="never" class="mt-4 !border-none">
        <el-button type="primary" @click="$router.push('edit')" v-perms="['staff.staff/add']"
            >添加师傅</el-button
        >
        <div class="mt-3">
            <el-table :data="pager.lists" style="width: 100%" v-loading="pager.loading">
                <el-table-column label="用户昵称" min-width="200">
                    <template #default="scope">
                        <div class="flex col-center">
                            <div class="w-[40px] h-[40px]">
                                <el-image
                                    style="width: 40px; height: 40px"
                                    :src="scope.row.user?.avatar"
                                    :preview-src-list="[scope.row.user?.avatar]"
                                    :hide-on-click-modal="true"
                                    :preview-teleported="true"
                                    :fit="'cover'"
                                />
                            </div>
                            <el-popover placement="top-start" width="200px" trigger="hover">
                                <div class="flex">
                                    <span class="flex-none mr-2">头像：</span>
                                    <el-image
                                        :src="scope.row.user?.avatar"
                                        style="width: 40px; height: 40px; border-radius: 50%"
                                    />
                                </div>
                                <div class="flex mt-2">
                                    <span class="flex-none mr-2 truncate">昵称：</span>

                                    <el-tooltip :content="scope.row.user?.nickname" placement="top">
                                        <span>{{ scope.row.user?.nickname }}</span>
                                    </el-tooltip>
                                </div>
                                <div class="flex mt-2">
                                    <span class="flex-none mr-2">编号：</span>
                                    <span>{{ scope.row.user?.sn }}</span>
                                </div>
                                <template #reference>
                                    <el-tooltip :content="scope.row.user?.nickname" placement="top">
                                        <div class="mt-2 ml-1 truncate pointer">
                                            {{ scope.row.user?.nickname }}
                                        </div>
                                    </el-tooltip>
                                </template>
                            </el-popover>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="师傅姓名" min-width="120" />
                <el-table-column property="mobile" label="手机号码" min-width="160" />
                <el-table-column label="所在地区" min-width="200">
                    <template #default="scope">
                        <div>
                            {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.district }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="80">
                    <template #default="scope">
                        <el-switch
                            v-perms="['staff.staff/status']"
                            v-model="scope.row.status"
                            :active-value="1"
                            :inactive-value="0"
                            @change="handleStatusChange($event, scope.row.id)"
                        />
                    </template>
                </el-table-column>
                <el-table-column property="recommend_desc" label="首页推荐" min-width="160">
                    <template #default="scope">
                        <el-tag type="info" v-if="scope.row.is_recommend == 0">不推荐</el-tag>
                        <el-tag v-if="scope.row.is_recommend == 1">推荐</el-tag>
                    </template>
                </el-table-column>
                <el-table-column property="create_time" label="添加时间" min-width="180" />
                <el-table-column label="操作" min-width="148" fixed="right">
                    <template #default="scope">
                        <div class="flex">
                            <router-link
                                v-perms="['staff.staff/edit']"
                                class="mr-2"
                                :to="{
                                    path: 'edit',
                                    query: {
                                        id: scope.row.id
                                    }
                                }"
                            >
                                <el-link type="primary" :underline="false">编辑</el-link>
                            </router-link>
                            <el-link
                                class="ml-4"
                                type="primary"
                                :underline="false"
                                @click="handleDelete(scope.row.id)"
                                v-perms="['staff.staff/del']"
                            >
                                删除
                            </el-link>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex justify-end mt-4">
            <pagination v-model="pager" @change="getLists" />
        </div>
    </el-card>
</template>

<script lang="ts" setup>
import {
    apiMasterWorkerLists,
    apiMasterWorkerDel,
    apiMasterWorkerStatusEdit
} from '@/api/master_worker'
import { ref } from 'vue'
import Pagination from '@/components/pagination/index.vue'
import DataPicker from '@/components/data-picker/index.vue'
import feedback from '@/utils/feedback'
import { usePaging } from '@/hooks/usePaging'
import area from '@/utils/area'

interface formDataObj {
    staff_info?: string
    start_time: string
    end_time: string
    is_recommend: number | string | undefined // 首页推荐 0-不推荐 1-推荐
    region_id: number | string | undefined
    status: number | string
    user: object
}

const options = ref<any>(area) // 地区列表
const cascaderPanelRef = shallowRef<any>()
const props2 = {
    checkStrictly: true
}
const formData = ref<formDataObj>({
    staff_info: '',
    start_time: '',
    end_time: '',
    is_recommend: '',
    region_id: '',
    status: '',
    user: {}
})

const { pager, getLists, resetPage, resetParams } = usePaging({
    fetchFun: apiMasterWorkerLists,
    params: formData.value
})

// 重置筛选框
const handleResetParams = () => {
    resetParams()
    cascaderPanelRef.value.cascaderPanelRef.clearCheckedNodes()
}

// 选中不同地区的师傅列表
const handleSelect = async (val: number[] | null) => {
    if (!val) return
    formData.value.region_id = val[val.length - 1]
}

// 删除师傅
const handleDelete = async (id: number): Promise<void> => {
    await feedback.confirm('确认要删除吗？')
    await apiMasterWorkerDel({ id })
    getLists()
}
// 状态修改
const handleStatusChange = async (event: Event, id: number): Promise<void> => {
    await apiMasterWorkerStatusEdit({ status: event, id })
    getLists()
}

getLists()
</script>

<style lang="scss">
.ls-input {
    width: 280px;
}
</style>
