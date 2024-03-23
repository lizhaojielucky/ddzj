<template>
    <div>
        <el-card class="!border-none" shadow="never">
            <el-page-header content="编辑通知设置" @back="$router.back()" />
        </el-card>
        <el-form
            ref="formRef"
            :model="formData"
            label-width="auto"
            :rules="rules"
            v-loading="loading"
        >
            <div>
                <!-- 通知名称 -->
                <el-card class="!border-none mt-4" shadow="never">
                    <div class="font-medium mb-7">通知名称</div>
                    <el-form-item label="通知名称" prop="scene_name">
                        {{ formData.scene_name }}
                    </el-form-item>
                    <el-form-item label="通知类型" prop="type"> {{ formData.type }} </el-form-item>
                    <el-form-item label="通知业务" prop="scene_desc">
                        {{ formData.scene_desc }}
                    </el-form-item>
                </el-card>

                <!-- 短信通知 -->
                <el-card class="!border-none mt-4" shadow="never">
                    <div class="font-medium mb-7">短信通知</div>
                    <el-form-item label="开启状态" prop="sms_notice.status" required>
                        <el-radio-group v-model="formData.sms_notice.status">
                            <el-radio label="0">关闭</el-radio>
                            <el-radio label="1">开启</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="模板ID" prop="sms_notice.template_id">
                        <div class="w-80">
                            <el-input
                                v-model="formData.sms_notice.template_id"
                                placeholder="请输入模板ID"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item label="短信内容" prop="sms_notice.content">
                        <div class="flex-1">
                            <div class="w-full max-w-[320px]">
                                <el-input
                                    type="textarea"
                                    :rows="6"
                                    v-model="formData.sms_notice.content"
                                />
                            </div>
                            <div
                                class="form-tips"
                                v-for="(item, index) in formData.sms_notice.tips"
                                :key="index"
                            >
                                {{ item }}
                            </div>
                        </div>
                    </el-form-item>
                </el-card>

                <!-- <el-card class="!border-none mt-4" shadow="never">
                    <div class="font-medium mb-7">微信模版消息</div>
                    <el-alert
                        title="温馨提示： 1. 请前往微信公众平台，将【主营行业：IT科技/互联网|电子商务 副营行业：消费品】类目添加至您的服务类目，否则将影响订阅通知的正常发送。 2. 查找订阅通知并选用，调整关键词的顺序后，复制模板ID，粘贴在此页面对应的模板ID输入框中"
                        type="warning"
                        :closable="false"
                    />
                    <el-form-item
                        class="mt-4"
                        label="开启状态"
                        prop="smsNotice.status"
                        label-width="150px"
                        required
                    >
                        <el-radio-group v-model="formData.smsNotice.status">
                            <el-radio label="0">关闭</el-radio>
                            <el-radio label="1">开启</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="模版字段first内容"
                        prop="wechatNotice.firstContent"
                        label-width="150px"
                    >
                        <div class="w-80">
                            <el-input
                                v-model="formData.wechatNotice.firstContent"
                                placeholder="请输入模板ID"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="模版字段remrk内容"
                        prop="wechatNotice.remrkContent"
                        label-width="150px"
                    >
                        <div class="w-80">
                            <el-input
                                v-model="formData.wechatNotice.remrkContent"
                                placeholder="请输入模板ID"
                            />
                        </div>
                    </el-form-item>
                    <el-form-item
                        label="模版内容"
                        label-width="150px"
                        prop="wechatNotice.list"
                        required
                    >
                        <el-button type="primary" @click="handleAdd">新增模版字段</el-button>
                    </el-form-item>
                    <el-form-item label-width="150px" class="overflow-scroll md:overflow-hidden">
                        <div>
                            <div>
                                <el-table size="large" :data="formData.wechatNotice.list">
                                    <el-table-column label="字段名" prop="name" min-width="160">
                                        <template #default="{ row }">
                                            <el-input v-model="row.name" clearable />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="字段值" prop="value" min-width="160">
                                        <template #default="{ row }">
                                            <el-input v-model="row.value" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="字段内容"
                                        prop="content"
                                        min-width="160"
                                    >
                                        <template #default="{ row }">
                                            <el-input v-model="row.content" />
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" min-width="80" fixed="right">
                                        <template #default="{ $index }">
                                            <el-button
                                                v-perms="['setting:storage:edit']"
                                                type="danger"
                                                link
                                                @click="handleDel($index)"
                                            >
                                                删除
                                            </el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                            <div class="form-tips" v-if="true">
                                可选变量 用户昵称:nickname 订单编号:order_sn 支付时间:pay_time
                                <br />
                                模板库: 搜索
                                “订单支付成功通知”，选用类目：软件服务提供商的模板，选用并选择以下参数，提交获得模板ID。
                                <br />
                                字段名 字段值 字段内容
                                <br />
                                订单编号 character_string1 {order_sn}
                                <br />
                                支付时间 time2 {pay_time}
                                <br />
                                订单金额 amount3 {order_amount}
                                <br />
                                商品名称 thing4 {goods_name}
                                <br />
                                配置路径：小程序后台 > 功能 > 订阅消息 CSS
                            </div>
                        </div>
                    </el-form-item>
                </el-card> -->
            </div>
        </el-form>
        <footer-btns>
            <el-button type="primary" @click="handleSave">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import feedback from '@/utils/feedback'
import { noticeDetail, setNoticeConfig } from '@/api/setting/message'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const formData = reactive<any>({
    id: '',
    scene_name: '', // 通知名称
    scene_desc: '', // 通知业务
    type: '', // 通知类型
    sms_notice: {
        status: 0,
        template_id: '',
        content: '',
        tips: [],
        type: 'sms'
    }
})
//表单验证
const rules = {
    'sms_notice.template_id': [
        {
            required: true,
            message: '请输入模板ID',
            trigger: 'blur'
        }
    ],
    'sms_notice.content': [
        {
            required: true,
            message: '请输入短信内容',
            trigger: 'blur'
        }
    ]
}

const formRef = shallowRef<FormInstance>()
// //模版内容添加
// const handleAdd = () => {
//     formData.wechatNotice.list.push({
//         name: '',
//         value: '',
//         content: ''
//     })
// }
// //模版内容删除
// const handleDel = (index: number) => {
//     formData.wechatNotice.list.splice(index, 1)
// }

const getDetails = async () => {
    loading.value = true
    const data = await noticeDetail({
        id: route.query.id
    })

    Object.keys(formData).forEach((key) => {
        // @ts-ignore
        formData[key] = data[key]
    })

    console.log(formData)
    loading.value = false
}

const handleSave = async () => {
    await formRef.value?.validate()
    console.log(formData)
    await setNoticeConfig({
        id: route.query.id,
        template: [
            {
                type: formData.sms_notice.type,
                template_id: formData.sms_notice.template_id,
                content: formData.sms_notice.content,
                status: formData.sms_notice.status
            }
        ]
    })
    feedback.msgSuccess('操作成功')
    router.back()
}

route.query.id && getDetails()
</script>

<style lang="scss" scoped>
.tablemove {
    @media screen and (max-width: 768px) {
        overflow: scroll;
    }
}
</style>
