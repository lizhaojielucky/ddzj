<template>
    <view class="container">
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
                <view class="List pt-[20rpx]" v-if="isLogin">
                    <List :type="item.type" :count="item.count" :i="i" :index="current"></List>
                </view>
            </tab>
        </tabs>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import List from './components/list.vue'
import tab from '@/components/tab/tab.vue'
import tabs from '@/components/tabs/tabs.vue'
import { useUserStore } from '@/stores/user'

const tabList = ref([
    {
        name: '待评价',
        type: 0,
        count: 0
    },
    {
        name: '已评价',
        type: 1,
        count: 0
    }
])
const current = ref<number>(0)
const userStore = useUserStore()
// 是否登录
const isLogin = computed(() => userStore.token)

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
.List {
    height: calc(100vh - 86px - env(safe-area-inset-bottom));
}
</style>
