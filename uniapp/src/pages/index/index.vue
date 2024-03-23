<template>
    <view class="container">
        <view class="main">
            <z-paging
                ref="paging"
                v-model="indexData"
                @query="upCallback"
                :fixed="false"
                height="100%"
            >
                <view v-for="(item, index) in indexData.decorate_age" :key="index">
                    <template v-if="item.name == 'search'">
                        <w-search :content="item.content" :styles="item.styles" />
                    </template>
                    <template v-if="item.name == 'banner'">
                        <w-banner :content="item.content" :styles="item.styles" />
                    </template>
                    <template v-if="item.name == 'nav'">
                        <w-nav :content="item.content" :styles="item.styles" />
                    </template>
                </view>

                <!-- 热门服务 -->
                <template v-if="indexData.hot_service?.length">
                    <hot :lists="indexData.hot_service"></hot>
                </template>

                <!-- 师傅推荐 -->
                <template v-if="indexData.recommend_staff?.length">
                    <master :lists="indexData.recommend_staff"></master>
                </template>

                <!-- 推荐分类 -->
                <template v-if="indexData.recommend_goods_category.length">
                    <category :lists="indexData.recommend_goods_category"></category>
                </template>
            </z-paging>
        </view>

        <!-- 底部导航栏 -->
        <Tabbar />
    </view>
</template>

<script setup lang="ts">
import { reactive, shallowRef } from 'vue'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import Tabbar from '@/components/tabbar/index.vue'
import Category from './comp/category.vue'
import Hot from './comp/hot-list.vue'
import Master from './comp/master-list.vue'
import { apiIndex } from '@/api/store'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()
const paging = shallowRef()
const indexData = reactive<any>({
    decorate_age: [],
    hot_service: [],
    recommend_staff: [],
    recommend_goods_category: []
})

const upCallback = async (): Promise<void> => {
    try {
        const data = await apiIndex({
            city_id: appStore.cityInfo.city_id
        })
        console.log('data', data)

        for (const key in indexData) {
            if (data[key] != null && data[key] != undefined) {
                indexData[key] = data[key]
            }
        }
        paging.value.complete([data])
    } catch (err) {
        console.log(err)
        // refreshRef.value.endErr()
        paging.value.complete(false)
    }
}

onLoad(() => {
    uni.$on('refreshhome', () => {
        upCallback()
    })
})

onUnload(() => {
    uni.$off('refreshhome')
})
// #ifdef MP
const updateManager = wx.getUpdateManager()
updateManager.onUpdateReady(function () {
    wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
            if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate()
            }
        }
    })
})
updateManager.onUpdateFailed(function () {
    uni.$u.toast('新版本下载失败，请检查网络！')
})
// #endif
</script>

<style lang="scss">
.container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;

    .main {
        flex: 1;
        min-height: 0;
        overflow: scroll;
    }
}
</style>
