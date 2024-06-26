<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            :clickModalClose="true"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="84px" :rules="formRules">
                <el-form-item label="上级部门" prop="pid" v-if="formData.pid !== 0">
                    <el-tree-select
                        class="flex-1"
                        v-model="formData.pid"
                        :data="leaderList"
                        clearable
                        node-key="id"
                        :props="{
                            value: 'id',
                            label: 'name'
                        }"
                        check-strictly
                        :default-expand-all="true"
                        placeholder="请选择上级部门"
                    />
                </el-form-item>
                <el-form-item label="部门名称" prop="name">
                    <el-input v-model.trim="formData.name" placeholder="请输入部门名称" />
                </el-form-item>
                <el-form-item label="负责人">
                    <el-input v-model="formData.leader" placeholder="请输入负责人姓名" />
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input v-model="formData.mobile" placeholder="请输入联系电话" />
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <div>
                        <el-input-number v-model="formData.sort" />
                        <div class="form-tips">默认为0， 数值越大越排前</div>
                    </div>
                </el-form-item>
                <el-form-item label="部门状态">
                    <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { deptLists, deptEdit, deptAdd } from '@/api/org/department'
import Popup from '@/components/popup/index.vue'
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const leaderList = ref<any[]>([])
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑部门' : '新增部门'
})
const formData = reactive({
    id: '',
    pid: '' as string | number,
    name: '', // 部门名称
    leader: '',
    mobile: '',
    sort: 0,
    status: 1
})

const inputValidator = (rule: object, value: string, callback: any) => {
    const reg = /^[^\s]*$/
    if (!reg.test(value)) {
        callback(new Error('名称不能包含空格！'))
    } else {
        callback()
    }
}

const formRules = {
    pid: [
        {
            required: true,
            message: '请选择上级部门',
            trigger: ['blur', 'change']
        }
    ],
    name: [
        {
            required: true,
            message: '请输入部门名称',
            trigger: ['blur']
        },
        {
            validator: inputValidator,
            trigger: 'blur'
        }
    ] as any[]
}

const getOptions = async () => {
    const data: any = await deptLists()
    leaderList.value = data
    console.log('leaderList.value:', leaderList.value)
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    mode.value == 'edit' ? await deptEdit(formData) : await deptAdd(formData)
    popupRef.value?.close()
    emit('success')
}

const open = (type = 'add') => {
    mode.value = type
    popupRef.value?.open()
}

const setFormData = (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

const handleClose = () => {
    emit('close')
}

getOptions()

defineExpose({
    open,
    setFormData
})
</script>
