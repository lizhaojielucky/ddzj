<template>
    <el-card shadow="never" class="!border-none">
        <el-page-header :content="id ? '编辑服务' : '新增服务'" @back="$router.back()" />
    </el-card>

    <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="demo-formData"
    >
        <el-card
            class="!border-none"
            shadow="never"
            body-style="padding: 0"
            style="margin-top: 15px"
        >
            <el-tabs v-model="activeName">
                <!-- 基础设置 -->
                <el-tab-pane label="基础设置" name="base_setting">
                    <base-setting v-model="formData"></base-setting>
                </el-tab-pane>

                <!-- 服务详情 -->
                <el-tab-pane label="服务详情" name="service_detail">
                    <div class="xl:flex">
                        <editorVue v-model="formData.content" width="640" height="664"></editorVue>
                        <div class="detail ml-[30px]">
                            <div class="title">- 服务详情 -</div>
                            <div class="p-[0.6rem] break-words" v-html="formData.content"></div>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </el-form>

    <footer-btns>
        <el-button type="primary" @click="onSubmit(formRef)">保存</el-button>
    </footer-btns>
</template>

<script lang="ts" setup>
import { apiServiceAdd, apiServiceEdit, apiServiceDetail } from '@/api/service/lists'
import { ref } from 'vue'
import baseSetting from './components/base-setting.vue'
import editorVue from '@/components/editor/index.vue'
import FooterBtns from '@/components/footer-btns/index.vue'
import type { ElForm } from 'element-plus'

interface formDataObj {
    name?: string
    remarks?: string
    category_id?: string
    goods_image: Array<string>
    price?: string
    scribing_price?: string
    unit_id?: string
    status?: number
    content?: string
    sort?: string | number
}
type FormInstance = InstanceType<typeof ElForm>
const formRef = ref<FormInstance>()

const route = useRoute()
const router = useRouter()
const id: any = route.query.id

// 切换索引
const activeName = ref<string>('base_setting')
// 表单数据
const formData = ref<formDataObj>({
    name: '',
    remarks: '',
    category_id: '',
    goods_image: [],
    price: '',
    scribing_price: '',
    unit_id: '',
    status: 0,
    content: '',
    sort: ''
})

// 表单校验规则
const rules = ref<object>({
    name: [{ required: true, message: '请输入服务名称', trigger: 'blur' }],
    category_id: [{ required: true, message: '请选择分类', trigger: 'change' }],
    goods_image: [{ required: true, message: '请上传轮播图', trigger: 'change' }],
    price: [{ required: true, message: '请输入价格', trigger: 'blur' }],
    unit_id: [{ required: true, message: '请选择单位', trigger: 'change' }],
    status: [{ required: true, message: '请选择商品状态', trigger: 'change' }]
})

// 获取详情
const getServiceDetail = async (): Promise<void> => {
    ;(formData.value as any) = await apiServiceDetail({ id })
}

// 添加
const handleServiceAdd = async (): Promise<void> => {
    await apiServiceAdd({ ...formData.value })
    router.back()
}

// 编辑
const handleServiceEdit = async (): Promise<void> => {
    await apiServiceEdit({ ...formData.value })
    router.back()
}

// 提交
const onSubmit = (formEl: FormInstance | undefined): void => {
    if (!formEl) return
    formEl.validate((valid): boolean | undefined => {
        if (!valid) {
            activeName.value = 'base_setting'
            return false
        }
        if (!id) handleServiceAdd()
        else handleServiceEdit()
    })
}

if (id) getServiceDetail()
</script>

<style lang="scss">
.el-tabs__header {
    padding: 0 20px;
    border-bottom: 1px solid #e5e5e5;
}

.el-tabs__content {
    padding: 20px;
}

.detail {
    width: 375px;
    height: 662px;
    overflow: auto;
    border: 1px solid #e5e5e5;

    .title {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e5e5e5;
    }
}
</style>
