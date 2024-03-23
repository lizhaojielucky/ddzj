<template>
    <el-card shadow="never" class="!border-none">
        <el-page-header :content="id ? '编辑师傅' : '新增师傅'" @back="$router.back()" />
    </el-card>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="120px">
        <el-card shadow="never" style="margin-top: 15px" class="!border-none">
            <!-- 用户绑定 -->
            <el-form-item label="绑定用户:" prop="user_id">
                <user-select
                    btn-text="选择用户"
                    type="primary"
                    v-model="formData.user_id"
                    :user="formData.user"
                    :id="id"
                />
            </el-form-item>
            <el-form-item label="师傅名称:" prop="name">
                <el-input
                    class="ls-input w-56"
                    v-model="formData.name"
                    placeholder="请输入师傅的真实姓名"
                />
            </el-form-item>
            <el-form-item label="性别:" prop="sex">
                <el-radio v-model="formData.sex" name="1" :label="1">男</el-radio>
                <el-radio v-model="formData.sex" name="2" :label="2">女</el-radio>
            </el-form-item>
            <!-- 服务项目 -->
            <div class="serviceItem">
                <el-form-item label="服务项目:" prop="goods_ids">
                    <service-select
                        v-model="formData.goods_ids"
                        v-model:selectData="formData.goods"
                    >
                        <template #popup>
                            <el-button type="primary">选择服务</el-button>
                        </template>
                    </service-select>
                </el-form-item>
            </div>
            <!-- 手机号码 -->
            <el-form-item label="手机号码:" prop="mobile">
                <el-input
                    class="ls-input w-56"
                    v-model="formData.mobile"
                    placeholder="请输入手机号码"
                />
            </el-form-item>
            <!-- 所在地区 -->
            <el-form-item label="所在地区:" prop="district_id">
                <area-select
                    class="ls-input w-56"
                    v-model:province="formData.province_id"
                    v-model:city="formData.city_id"
                    v-model:district="formData.district_id"
                />
            </el-form-item>
            <el-form-item label="详细地址:">
                <el-input
                    class="ls-input"
                    type="textarea"
                    v-model="formData.address"
                    placeholder="选填，请输入详细地址"
                    :rows="6"
                ></el-input>
            </el-form-item>
            <el-form-item label="状态:" prop="status">
                <el-switch
                    v-model="formData.status"
                    :active-text="formData.status ? '正常' : '停用'"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="首页推荐:">
                <el-radio v-model="formData.is_recommend" name="1" :label="1">推荐</el-radio>
                <el-radio v-model="formData.is_recommend" name="0" :label="0">不推荐</el-radio>
            </el-form-item>
        </el-card>
    </el-form>
    <footer-btns>
        <el-button type="primary" @click="onSubmit(formRef)">保存</el-button>
    </footer-btns>
</template>

<script lang="ts" setup>
import { apiMasterWorkerAdd, apiMasterWorkerEdit, apiMasterWorkerDetail } from '@/api/master_worker'
import { ref, reactive } from 'vue'
import FooterBtns from '@/components/footer-btns/index.vue'
import UserSelect from '@/components/user-select/index.vue'
import AreaSelect from '@/components/area-select/index.vue'
import ServiceSelect from '@/components/service-select/index.vue'
import type { ElForm } from 'element-plus'

/** Interface Start **/
interface formDataObj {
    user_id?: number | string //用户id
    user?: object //用户id
    name?: string //师傅姓名
    sex?: number | string //性别
    mobile?: number | string //手机号码
    goods?: any //服务项目
    goods_ids: Array<any> //服务项目
    province_id: number | string //省
    city_id: number | string //市
    district_id: number | string //区
    address: string //详细地址
    longitude: string //经度
    latitude: string //纬度
    status: number //状态
    is_recommend?: number //是否推荐
}
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()
/** Interface End **/

/** Data Start **/
const route = useRoute()
const router = useRouter()
const id: any = route.query.id
const formData = ref<formDataObj>({
    user_id: '', //用户id
    name: '', //师傅姓名
    sex: 1, //性别
    mobile: '', //手机号码
    goods_ids: [], //服务项目
    goods: [],
    province_id: '', //省
    city_id: '', //市
    district_id: '', //区
    address: '', //详细地址
    longitude: '111', //经度 暂时不用
    latitude: '111', //纬度  暂时不用
    status: 0, //状态
    is_recommend: 0, //是否推荐
})
// 表单娇艳规则
const rules = reactive<object>({
    user_id: [{ required: true, message: '请选择用户', trigger: [] }],
    name: [{ required: true, message: '请输入师傅名称', trigger: 'blur' }],
    sn: [{ required: true, message: '请输入师傅编号', trigger: 'blur' }],
    sex: [{ required: true, message: '请选择性别', trigger: ['blur', 'change'] }],
    goods_ids: [{ required: true, message: '请选择服务项目', trigger: ['blur', 'change'] }],
    mobile: [
        { required: true, message: '请输入手机号', trigger: ['blur'] },
        { pattern: /^1[3-9]\d{9}$/, message: '手机号码输入有误', trigger: ['blur'] },
    ],
    district_id: [{ required: true, message: '请选择地区', trigger: ['blur', 'change'] }],
    status: [{ required: true, message: '请选择状态', trigger: 'change' }],
})
/** Data End **/

/** Methods Start **/
// 获取详情
const getMasterWorkerDetail = async (id: number): Promise<void> => {
    ;(formData.value as {}) = await apiMasterWorkerDetail({ id })
}
// 添加师傅
const handleMasterWorkerAdd = async (): Promise<void> => {
    await apiMasterWorkerAdd({ ...formData.value })
    router.back()
}
// 编辑师傅
const handleMasterWorkerEdit = async (): Promise<void> => {
    await apiMasterWorkerEdit({ ...formData.value })
    router.back()
}
// 提交数据
const onSubmit = (formEl: FormInstance | undefined): void => {
    if (!formEl) return
    formEl.validate((valid): boolean | undefined => {
        if (!valid) return false
        if (!id) handleMasterWorkerAdd()
        else handleMasterWorkerEdit()
    })
}
/** Methods End **/

/** LifeCycle Start **/
// 请求详情 => 如果是编辑的话
if (id) getMasterWorkerDetail(id)
/** LifeCycle End **/
</script>

<style lang="scss" scoped>
.ls-input,
.select {
    width: 340px;
}
.serviceItem :deep() .el-form-item__content {
    display: block;
}
.serviceItem :deep() .dialog__trigger {
    width: 80px;
}
</style>
