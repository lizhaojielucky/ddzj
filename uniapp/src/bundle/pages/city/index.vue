<template>
    <!-- 搜索 -->
    <view class="search flex m-[24rpx]">
        <!-- 左侧图标 -->
        <u-icon name="search" size="34" color="#888888"></u-icon>
        <!-- 输入 -->
        <input
            type="text"
            class="search--input"
            @input="handleSearch"
            placeholder="请输入城市名称"
            @focus="showClear = true"
            @blur="showClear = false"
        />
        <!-- 清空图标 -->
        <image
            src="../../../static/images/icon_clear.png"
            class="clear"
            v-show="showClear"
            @click="handleReSearch"
        >
        </image>
    </view>

    <!-- 搜索结果 -->
    <view class="city-container" v-show="searchStatus">
        <view class="letter-head">搜索结果</view>
        <view class="bg-white city-box-head">
            <block v-for="(searchItem, searchIndex) in searchResult" :key="searchIndex">
                <view class="text-base city-item" @click="chooseCity(searchItem)">
                    {{ searchItem.name }}
                </view>
            </block>
        </view>
    </view>

    <!-- 定位城市 -->
    <view v-show="!searchStatus">
        <view class="city-container">
            <!-- 当前定位城市 -->
            <view class="letter-head">当前定位城市</view>
            <view class="city-box-head flex justify-between bg-white p-[24rpx]">
                <view class="flex text-base normal" @click="goBack">
                    <image src="../../../static/images/icon_city_address.png"></image>
                    <text class="ml-[18rpx]">{{ cityInfo.name }}</text>
                </view>
                <view class="flex text-base text-blue" @click="reChooseLocation">重新定位</view>
            </view>

            <!-- 热门城市列表 -->
            <view>
                <view class="letter-head">热门城市</view>
                <view class="city-box-head">
                    <block v-for="(hotItem, hotIndex) in hotList" :key="hotIndex">
                        <view class="text-base city-item" @click="chooseCity(hotItem)">
                            {{ hotItem.name }}
                        </view>
                    </block>
                </view>
            </view>

            <!-- 城市列表 -->
            <view v-for="(cityItem, cityIndex) in cityList" :key="cityIndex" class="anchor">
                <view class="letter">{{ cityIndex }}</view>
                <view class="bg-white city-box">
                    <block v-for="(cityItem2, cityIndex2) in cityItem" :key="cityIndex2">
                        <view class="text-base truncate city-item" @click="chooseCity(cityItem2)">
                            {{ cityItem2.name }}
                        </view>
                    </block>
                </view>
            </view>
        </view>

        <!-- 侧边导航条 -->
        <view
            class="bar__sidebar"
            @touchstart.stop.prevent="onTouchMove"
            @touchmove.stop.prevent="onTouchMove"
            @touchend.stop.prevent="onTouchStop"
            @touchcancel.stop.prevent="onTouchStop"
        >
            <view
                v-for="(barItem, barIndex) in labelList"
                :key="barIndex"
                class="bar__index"
                :class="'title ' + (barIndex == touchmoveIndex ? 'active' : '')"
            >
                {{ barItem }}
            </view>
        </view>

        <!-- 侧边弹窗 -->
        <view class="list-alert" v-if="touchmove && labelList[touchmoveIndex + '']">
            <text>{{ labelList[touchmoveIndex] }}</text>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ref, computed, unref, nextTick } from 'vue'
import { onLoad, onPageScroll } from '@dcloudio/uni-app'
import { apiRegionCity } from '@/api/store'
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

// 页面状态
const searchStatus = ref<boolean>(false)
// 搜索关键字
const keyword = ref<string | number>('')
// 清空输入框
const showClear = ref<boolean>(false)
// 搜索结果
const searchResult = ref<any>([])
// 城市列表
const cityList = ref<any>([])
// 侧边列表
const labelList = ref<any>([])
// 热门城市列表
const hotList = [
    { name: '北京市', gcj02_lat: '39.929986', gcj02_lng: '116.395645', id: 110100 },
    { name: '上海市', gcj02_lat: '31.249162', gcj02_lng: '121.487899', id: 310100 },
    { name: '广州市', gcj02_lat: '23.120049', gcj02_lng: '113.30765', id: 440100 },
    { name: '深圳市', gcj02_lat: '22.546054', gcj02_lng: '114.025974', id: 440300 },
    { name: '重庆市', gcj02_lat: '29.544606', gcj02_lng: '106.530635', id: 110100 },
    { name: '成都市', gcj02_lat: '30.679943', gcj02_lng: '104.067923', id: 510100 },
    { name: '杭州市', gcj02_lat: '30.259244', gcj02_lng: '120.219375', id: 110100 },
    { name: '苏州市', gcj02_lat: '31.317987', gcj02_lng: '120.619907', id: 320500 },
    { name: '武汉市', gcj02_lat: '30.581084', gcj02_lng: '114.3162', id: 420100 },
    { name: '沈阳市', gcj02_lat: '41.808645', gcj02_lng: '123.432791', id: 210100 }
]
//
const touchmove = ref(false)
const touchmoveIndex = ref(0)
const anchor = ref<any>([])
const sidebar = ref<any>({})

const cityInfo = computed(() => appStore.cityInfo)

onLoad(() => {
    initCityData()
})

onPageScroll(({ scrollTop }) => {
    const index = anchor.value.findIndex((item: number | string) => {
        return item >= scrollTop
    })
    const isLessTop = index !== -1
    if (isLessTop && !unref(touchmove)) touchmoveIndex.value = index
})

// 重置搜索
const handleReSearch = () => {
    keyword.value = ''
    showClear.value = false
    searchStatus.value = false
    searchResult.value = []
}

// 搜索城市
const handleSearch = (event: any) => {
    keyword.value = event?.detail?.value.trim()
    if (!keyword.value) {
        searchStatus.value = false
        return
    }
    searchStatus.value = true
    searchResult.value = []
    console.log('cityList.value', cityList.value)
    for (const key in cityList.value) {
        const len = cityList.value[key].length
        const item = cityList.value[key]
        for (let i = 0; i < len; i++) {
            const reg = new RegExp(keyword.value)
            if (reg.test(item[i].name)) {
                searchResult.value.push(item[i])
            }
        }
    }
}

// 重新定位
const reChooseLocation = () => {
    uni.chooseLocation({
        success(res: any) {
            appStore.initCityFunc(res.latitude, res.longitude)
        }
    })
}

// 处理侧边栏移动函数
const onTouchMove = (event: any): void => {
    const y = parseInt(event.changedTouches[0].clientY)
    const len = unref(labelList).length
    const itemHeight = Number(unref(sidebar).height / len)
    let index = Math.floor((y - unref(sidebar).top) / itemHeight)
    if (index < 0) {
        index = 0
    } else if (index > len - 1) {
        index = len - 1
    }
    if (unref(touchmoveIndex) != index) {
        touchmove.value = true
        touchmoveIndex.value = index
        uni.pageScrollTo({
            duration: 0,
            scrollTop: unref(anchor)[index]
        })
    }
}

const onTouchStop = () => {
    touchmove.value = false
}

// 选择城市
const chooseCity = (param: any) => {
    const obj = {
        name: param.name,
        city_id: param.id,
        latitude: param.db09_lat,
        longitude: param.db09_lng
    }
    appStore.setCityInfo(obj)
    uni.navigateBack()
}

// 初始化城市数据
const initCityData = async (): Promise<void> => {
    const data = await apiRegionCity()
    cityList.value = data
    labelList.value = Reflect.ownKeys(data ?? {})

    setRect()
}

// 获取元素数据
const setRect = async () => {
    await nextTick()
    const title = uni.createSelectorQuery().selectAll('.bar__sidebar')
    title
        .boundingClientRect((res: any) => {
            sidebar.value = {
                height: res[0].height,
                top: res[0].top
            }
        })
        .exec()
    const letter = uni.createSelectorQuery().selectAll('.anchor')
    letter
        .boundingClientRect((res: any) => {
            res.top = Number(res.bottom)
            anchor.value = res.map((item: { bottom: number }) => Number(item.bottom))
        })
        .exec()
}
/**
 * @return { void }
 * @description 返回上一页
 */
const goBack = () => {
    uni.navigateBack()
}
</script>

<style lang="scss">
// 头部搜索
.search {
    height: 70rpx;
    padding: 15rpx 30rpx;
    border-radius: 10rpx;
    background-color: white;
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

.city-container {
    padding: 0 60rpx 0 24rpx;

    // 首字母样式
    .letter,
    .letter-head {
        height: 70rpx;
        line-height: 50rpx;
        padding: 10rpx 4rpx;
        margin-top: 10rpx;
        color: #888888;
        font-size: 26rpx;
    }

    // 城市样式
    .city-box,
    .city-box-head {
        border-radius: 4rpx;

        .city-item {
            padding: 0 24rpx;
            width: 210rpx;
            height: 88rpx;
            display: inline-block;
            margin-right: 18rpx;
            line-height: 88rpx;
            text-align: center;
            border-radius: 4rpx;
            background-color: #ffffff;

            // line-1
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        .city-item:nth-child(3n) {
            margin-right: 0;
        }

        .city-item:hover {
            color: white;
            background: rgba(#f36161, 0.5);
        }

        image {
            width: 32rpx;
            height: 32rpx;
        }
    }
}

.bar__sidebar {
    position: fixed;
    top: 50%;
    right: 8rpx;
    display: flex;
    flex-direction: column;
    text-align: center;
    transform: translateY(-50%);
    user-select: none;
    z-index: 99;

    .active {
        border-radius: 50%;
        color: white;
        background-color: #f36161;
    }
}

.bar__index {
    font-weight: 500;
    padding: 8rpx 8rpx;
    font-size: 22rpx;
    line-height: 1;
}

.list-alert {
    position: fixed;
    width: 120rpx;
    height: 120rpx;
    right: 90rpx;
    top: 50%;
    margin-top: -60rpx;
    border-radius: 24rpx;
    font-size: 50rpx;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.65);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    z-index: 9999999;

    text {
        line-height: 50rpx;
    }
}
</style>
