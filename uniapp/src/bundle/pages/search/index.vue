<template>
    <view class="search">
        <!-- 搜索框 -->
        <view class="px-[24rpx] py-[14rpx] bg-white">
            <u-search
                v-model="keyword"
                placeholder="请输入关键词搜索"
                height="72"
                @search="handleSearch"
                @custom="handleSearch"
                @clear="search.searching = false"
            ></u-search>
        </view>

        <!-- 搜索 -->
        <view class="search-content">
            <!--  -->
            <suggest
                v-show="!search.searching"
                @search="handleSearch"
                @clear="handleClear"
                :hot_search="search.hot_search"
                :his_search="search.his_search"
                :status="search.status"
            ></suggest>

            <!--  -->
            <view class="search-content-s pt-[20rpx]" v-show="search.searching">
                <z-paging
                    ref="paging"
                    v-model="search.result"
                    @query="queryList"
                    :fixed="false"
                    height="100%"
                >
                    <view class="bg-white px-[24rpx]">
                        <goods-card :goodsList="search.result"></goods-card>
                    </view>
                </z-paging>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, reactive, shallowRef } from 'vue'
import Suggest from './component/suggest.vue'
import { HISTORY } from '@/enums/cacheEnums'
import { getHotSearch, apiGoodsLists } from '@/api/store'
import cache from '@/utils/cache'
import GoodsCard from '@/components/goods-card/index.vue'

interface Search {
    hot_search: string[]
    his_search: string[]
    result: any
    searching: boolean
    status: number
}

const search = reactive<Search>({
    hot_search: [],
    his_search: [],
    result: [],
    searching: false,
    status: 0
})
const keyword = ref<string>('')
const paging = shallowRef()

const handleSearch = (value: string) => {
    keyword.value = value
    if (keyword.value) {
        if (!search.his_search.includes(keyword.value)) {
            search.his_search.unshift(keyword.value)
            cache.set(HISTORY, search.his_search)
        }
    }
    paging.value.reload()
    search.searching = true
}

const getHotSearchFunc = async () => {
    try {
        const data = await getHotSearch()
        search.hot_search = data.data
        search.status = data.status
    } catch (e) {
        //TODO handle the exception
        console.log('获取热门搜索失败=>', e)
    }
}

const handleClear = async (): Promise<void> => {
    const resModel: any = await uni.showModal({
        title: '温馨提示',
        content: '是否清空历史记录？'
    })
    if (resModel.confirm) {
        cache.set(HISTORY, '')
        search.his_search = []
    }
}

const queryList = async (pageNo: number, pageSize: number) => {
    try {
        const { lists } = await apiGoodsLists({
            keyword: keyword.value,
            page_no: pageNo,
            page_size: pageSize
        })
        paging.value.complete(lists)
    } catch (e) {
        console.log('报错=>', e)
        //TODO handle the exception
        paging.value.complete(false)
    }
}

getHotSearchFunc()
search.his_search = cache.get(HISTORY) || []
</script>

<style lang="scss" scoped>
.search {
    &-content {
        height: calc(100vh - 46px - env(safe-area-inset-bottom));

        &-s {
            height: 100%;
        }
    }
}
</style>
