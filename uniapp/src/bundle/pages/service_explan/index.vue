<template>
    <view class="p-[24rpx]">
        <mp-html :content="content" />
    </view>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { onLoad } from "@dcloudio/uni-app";
import {
    apiPolicyAgreement,
} from "@/api/app"

let content = ref<string | null>('')
let type = ref<number | string | null | any>(1)
// 获取服务协议
const getPolicyAgreement = async (): Promise<void> => {
    const res = await apiPolicyAgreement()
    if (type.value == 1) {
        uni.setNavigationBarTitle({
            title: res.service_title
        })
        content.value = res.service_content
    } else {
        uni.setNavigationBarTitle({
            title: res.privacy_title
        })
        content.value = res.privacy_content
    }
}

onLoad((options) => {
    type.value = options.type
    getPolicyAgreement()
})
</script>