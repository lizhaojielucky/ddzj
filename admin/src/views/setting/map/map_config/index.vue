<!-- 地图配置 -->
<template>
    <div class="map_config">
        <el-form ref="formRef" :rules="rules" class="ls-form" :model="formData" label-width="120px">
            <el-card shadow="never" class="!border-none">
                <div class="text-xl font-medium mb-[20px]">地图设置</div>
                <el-form-item label="地图配置" prop="tencent_map_key">
                    <div>
                        <div class="w-80">
                            <el-input
                                v-model="formData.tencent_map_key"
                                placeholder="请输入地图配置值"
                            ></el-input>
                        </div>
                        <div class="form-tips">默认为腾讯地图配置Key</div>
                    </div>
                </el-form-item>
            </el-card>
        </el-form>

        <footer-btns>
            <el-button
                v-perms="['setting.web.web_setting/setMapKey']"
                type="primary"
                @click="handleSubmit"
                >保存</el-button
            >
        </footer-btns>
    </div>
</template>

<script lang="ts" setup>
import { getMapConfig, setMapConfig } from '@/api/setting/map'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
    tencent_map_key: '' // 腾讯地图配置值
})

// 表单验证
const rules = {
    tencent_map_key: [
        {
            required: true,
            message: '请输入地图配置值',
            trigger: ['blur']
        }
    ]
}

// 获取备案信息
const getData = async () => {
    const data = await getMapConfig('')
    for (const key in formData) {
        //@ts-ignore
        formData[key] = data[key]
    }
    console.log(data)
}

// 设置备案信息
const handleSubmit = async () => {
    await formRef.value?.validate()
    await setMapConfig(formData)
    getData()
}

getData()
</script>

<style lang="scss" scoped></style>
