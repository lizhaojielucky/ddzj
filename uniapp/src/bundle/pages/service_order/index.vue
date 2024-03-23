<template>
    <view class="order-list">
        <!-- :auth="true" 是表示需要权限登录的 -->
        <tabs
            :current="current"
            @change="handleChange"
            height="80"
            bar-width="60"
            :barStyle="{ bottom: '0' }"
            :auth="true"
            activeColor="#F36161"
        >
            <tab v-for="(item, i) in tabList" :key="i" :name="item.name">
                <view class="orderList pt-[20rpx]" v-if="isLogin">
                    <orderList
                        :order_status="item.order_status"
                        :i="i"
                        :index="current"
                    ></orderList>
                </view>
            </tab>
        </tabs>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import orderList from './components/order-list.vue'
import tab from '@/components/tab/tab.vue'
import tabs from '@/components/tabs/tabs.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 是否登录
const isLogin = computed(() => userStore.token)

const tabList = ref<any>([
    {
        name: '全部',
        order_status: 0
    },
    {
        name: '预约中',
        order_status: 1
    },
    {
        name: '服务中',
        order_status: 2
    },
    {
        name: '已完成',
        order_status: 3
    },
    {
        name: '已关闭',
        order_status: 4
    }
])
const current = ref<number>(0)

const handleChange = (index: number) => {
    current.value = Number(index)
}

onLoad(async (options: { type?: any }) => {
    current.value = options?.type * 1 || 0
})
</script>

<style lang="scss">
.container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;
}

.main {
    flex: 1;
    min-height: 0;
    overflow: scroll;
    swiper {
        height: 100%;
    }
}
.orderList {
    height: calc(100vh - 86px - env(safe-area-inset-bottom));
}
</style>
