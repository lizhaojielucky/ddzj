<template>
    <view class="container">
        <view class="px-[24rpx] py-[14rpx] bg-white">
            <u-search
                v-model="keyword"
                placeholder="请输入关键词搜索"
                height="72"
                @search="search"
                @custom="search"
                @clear="queryList"
            ></u-search>
        </view>

        <view class="main bg-white mt-[20rpx]">
            <z-paging
                auto-show-back-to-top
                :auto="true"
                ref="paging"
                v-model="dataList"
                @query="queryList"
                :fixed="false"
                height="100%"
            >
                <!-- 订单卡片 -->
                <navigator
                    v-for="item in dataList"
                    :key="item.id"
                    :url="`/bundle/pages/master_worker_detail/index?id=${item.id}`"
                >
                    <view class="flex master_worker_item col-start">
                        <u-image
                            :src="item.user_image"
                            width="100"
                            height="100"
                            border-radius="50%"
                        ></u-image>
                        <view class="ml-[20rpx]">
                            <view class="text-lg font-medium normal">{{ item.name }}</view>
                            <view class="lighter text-sm mt-[10rpx]"
                                >所在地区：{{ item.city }} - {{ item.district }}</view
                            >
                            <view class="lighter text-sm mt-[10rpx] truncate w-[580rpx]"
                                >服务项目：{{ item.goods_name }}</view
                            >
                        </view>
                    </view>
                </navigator>
            </z-paging>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { apiStaffLists } from '@/api/store'

// 页面状态
const searchStatus = ref<boolean>(false)
// 搜索关键字
const keyword = ref<string | number>('')
// 师傅列表数据
const dataList = ref<any>([])
// 下拉组件的Ref
const paging = shallowRef<any>(null)

// 处理搜索
const search = (flag: boolean) => {
    if (flag) {
        if (keyword.value !== '') searchStatus.value = true
    } else {
        keyword.value = ''
        searchStatus.value = false
    }
    paging.value?.reload()
}

const queryList = async (pageNo: number, pageSize: number) => {
    try {
        const { lists } = await apiStaffLists({
            pageNo,
            pageSize,
            name: keyword.value
        })
        paging.value.complete(lists)
    } catch (e) {
        console.log('报错=>', e)
        //TODO handle the exception
        paging.value.complete(false)
    }
}

// 去师傅主页
const toDetail = (id: number | string) => {
    uni.navigateTo({
        url: `/bundle/pages/master_worker_detail/index?id=${id}`
    })
}
</script>

<style lang="scss">
.container {
    display: flex;
    height: 100vh;
    overflow: hidden;
    flex-direction: column;

    // 头部搜索
    .search-box {
        width: 100%;
        height: 100rpx;
        padding: 15rpx 24rpx;

        .search {
            width: 620rpx;
            height: 100%;
            padding: 15rpx 30rpx;
            border-radius: 10rpx;
            background-color: #f6f6f6;

            // 输入框
            &--input {
                width: 84%;
                padding-left: 20rpx;
            }

            // 清空
            .clear {
                width: 34rpx;
                height: 34rpx;
                padding-left: 20rpx;
            }
        }
    }

    .main {
        flex: 1;
        min-height: 0;
        overflow: scroll;

        // 师傅
        .master_worker_item {
            padding: 30rpx 24rpx 28rpx 24rpx;
            border-bottom: 1px solid #f2f2f2;
        }
    }
}
</style>
