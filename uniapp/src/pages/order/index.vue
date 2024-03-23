<template>
    <view class="order-list">
        <u-tabs
            :list="tabList"
            bg-color="#F36161"
            active-color="#fff"
            inactive-color="#fff"
            :is-scroll="true"
            v-model="current"
            @change="change"
            height="80"
        ></u-tabs>
        <!-- <tabs
            :current="current"
            @change="handleChange"
            height="80"
            bar-width="60"
            :barStyle="{ bottom: '0' }"
            :auth="true"
            bgColor="#F36161"
            activeColor="#fff"
            inactiveColor="#fff"
        >
            <tab v-for="(item, i) in tabList" :key="i" :name="item.name"> </tab>
        </tabs> -->
        <view class="orderList pt-[20rpx]" v-if="userStore.isLogin">
            <orderList :order_status="current"></orderList>
        </view>
        <view v-else>
            <u-empty
                :src="'/static/images/empty/order.png'"
                text="您还没有登录～"
                mode="data"
                :icon-size="300"
                margin-top="300"
                color="#888888"
            >
                <template #bottom>
                    <view class="mt-4">
                        <u-button
                            shape="circle"
                            @click="goPage('/pages/login/login')"
                            :ripple="true"
                            :hair-line="false"
                            type="info"
                        >
                            去登录</u-button
                        >
                    </view>
                </template>
            </u-empty>
        </view>
    </view>

    <!-- 底部导航栏 -->
    <Tabbar />
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
import orderList from './components/order-list.vue'
import Tabbar from '@/components/tabbar/index.vue'
import tab from '@/components/tab/tab.vue'
import tabs from '@/components/tabs/tabs.vue'
import { useUserStore } from '@/stores/user'
import { removeStorageData } from '@/utils/util'

const userStore = useUserStore()

const tabList = ref<any>([
    {
        name: '全部',
        order_status: 0
    },
    {
        name: '待支付',
        order_status: 1
    },
    {
        name: '预约中',
        order_status: 2
    },
    {
        name: '服务中',
        order_status: 3
    },
    {
        name: '已完成',
        order_status: 4
    },
    {
        name: '已关闭',
        order_status: 5
    }
])
const current = ref<number>(0)

const change = (index: number) => {
    current.value = Number(index)
}

onShow(() => {
    removeStorageData('selectDate')
})

/**
 * @param { string } url
 * @return { void }
 * @description 跳转页面方法
 */
const goPage = (url: string) => {
    uni.redirectTo({ url: url })
}

onLoad(async (options: { type?: any }) => {
    current.value = options?.type * 1 || 0
    if (!Object.keys(options).length) {
        current.value = 0
    }
})
</script>

<style lang="scss" scoped>
.element.style {
    background-color: red;
}
.orderList {
    height: calc(100vh - 190rpx - env(safe-area-inset-bottom));
}
</style>
