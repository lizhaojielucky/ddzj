<template>
    <view v-show="isEmpty">
        <!-- 轮播图 -->
        <la-swiper
            :content="goodsData.goods_image"
            height="750"
            indicatorPos="bottomRight"
            mode="number"
        />

        <!-- 商品信息 -->
        <card :title="goodsData.name" :border_bottom="false">
            <template #header-right>
                <view class="flex" @click="handleCollection(!goodsData.is_collect)">
                    <image
                        class="collection"
                        v-if="!goodsData.is_collect"
                        src="/static/images/icon_collection.png"
                    >
                    </image>
                    <image
                        class="collection"
                        v-else
                        src="/static/images/icon_collection_s.png"
                    ></image>
                    <text>{{ goodsData.is_collect ? '取消收藏' : '收藏' }}</text>
                </view>
            </template>
            <view class="flex justify-between padding">
                <view class="text-primary">
                    <price
                        :price="goodsData.price"
                        :desc="goodsData.unit_desc"
                        :scribingPrice="goodsData.scribing_price"
                    ></price>
                </view>
                <view class="text-xs normal" color="#707070">
                    {{ goodsData.order_num }}人预约过
                </view>
            </view>
        </card>

        <!-- 规格选择 -->
        <goods-spec
            ref="goodsSpecRef"
            :goodsImage="goodsData.goods_image.data"
            :goodsName="goodsData.name"
            :goodsPrice="goodsData.price"
            :unitDesc="goodsData.unit_desc"
            @confirm="handleOrder"
        />

        <!-- 上门时间
        <card :url="'/bundle/pages/appoint_time/index'">
            <view class="flex justify-between padding">
                <view class="normal"> 上门时间 </view>
                <view class="flex text-base normal">
                    <text class="mr-[20rpx] text-muted">{{ appoint }}</text>
                    <u-icon name="arrow-right" color="#707070" size="22"></u-icon>
                </view>
            </view>
        </card> -->

        <!-- 服务师傅 -->
        <card title="服务师傅">
            <view class="w-full overflow-hidden">
                <scroll-view class="whitespace-nowrap pt-[20rpx] pl-[30rpx]" scroll-x="true">
                    <block v-for="item in goodsData.goods_staff" :key="item.id">
                        <view
                            class="w-[100rpx] mr-[54rpx] text-center inline-block"
                            @click="
                                goPage(`/bundle/pages/master_worker_detail/index?id=${item.id}`)
                            "
                        >
                            <u-image
                                :src="item.user?.avatar || ''"
                                width="100"
                                height="100"
                                border-radius="50%"
                            ></u-image>
                            <view class="truncate normal mt-[20rpx] text-base">{{
                                item.name
                            }}</view>
                        </view>
                    </block>
                </scroll-view>
            </view>
        </card>

        <!-- 用户评价 -->
        <card title="用户评价" :url="`/bundle/pages/evaluate_goods/index?id=${goodsId}`">
            <template #header-right>
                <view class="flex text-sm text-muted">
                    <text class="mr-[14rpx]">全部评价</text>
                    <u-icon name="arrow-right" color="#707070" size="22"></u-icon>
                </view>
            </template>
            <template v-if="goodsData.goods_comment.length">
                <block v-for="commenItem in goodsData.goods_comment" :key="commenItem.id">
                    <view class="comment mt-[20rpx]">
                        <view class="flex p-[20rpx]">
                            <u-image
                                :src="commenItem.user?.avatar"
                                width="80"
                                height="80"
                                border-radius="50%"
                            ></u-image>
                            <view class="ml-[20rpx]">
                                <view class="text-base normal">{{ commenItem.user.nickname }}</view>
                                <view class="text-xs text-muted">{{ commenItem.update_time }}</view>
                            </view>
                        </view>
                        <view class="text-base normal ml-[20rpx] line-3">{{
                            commenItem.comment
                        }}</view>
                    </view>
                </block>
            </template>
            <view class="text-center p-[40rpx] text-muted" v-else> 暂无评价 </view>
        </card>

        <!-- 服务详情 -->
        <view style="padding-bottom: 350rpx">
            <card title="服务详情" :border_bottom="false">
                <view class="p-[24rpx]">
                    <mp-html :content="goodsData.content" />
                    <!-- <u-parse :html="goodsData.content"></u-parse> -->
                </view>
            </card>
        </view>

        <view class="footer">
            <view>
                <button
                    class="bg-primary text-lg text-white leading-[80rpx] h-[80rpx]"
                    @click="onAppointment"
                >
                    立即预约
                </button>
            </view>
        </view>
    </view>

    <view v-show="!isEmpty" class="empty">
        <u-empty
            text="抱歉，该服务项目不存在~"
            :src="'/static/images/empty/collection.png'"
            :icon-size="300"
            color="#888888"
        >
            <template #bottom>
                <view class="empty-bottom">
                    <button
                        class="bg-primary text-lg text-white leading-[80rpx] h-[80rpx]"
                        @click="goHome"
                    >
                        去看看其它
                    </button>
                </view>
            </template>
        </u-empty>
    </view>
</template>

<script setup lang="ts">
import { ref, computed, reactive, shallowRef, unref } from 'vue'
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app'
import LaSwiper from '@/components/la-swiper/index.vue'
import Card from './components/card.vue'
import GoodsSpec from './components/goods-spec.vue'
import Price from '@/components/price/index.vue'
import { apiGoodsDetail, apiGoodsCollection } from '@/api/goods'
import { removeStorageData } from '@/utils/util'
import { useUserStore } from '@/stores/user'
import { useAppStore } from '@/stores/app'

type GOODS = {
    name: string // 服务名称
    remarks: string // 服务简介
    unit_desc: string // 单位描述
    image: string // 主图
    price: string // 价格
    scribing_price: string // 划线价格
    content: string // 服务详情
    order_num: string // 预约人数
    is_collect: string // 是否收藏
    goods_image: any // 轮播图
    goods_comment: any // 服务评价
    goods_staff: any // 服务师傅
    appoint_time: any // 上门时间
    [index: string]: string | number | any
}

type TIME = {
    year: string
    date: string
    start_time: string
    end_time: string
}

const goodsData = reactive<GOODS>({
    name: '',
    remarks: '',
    unit_desc: '',
    image: '',
    price: '',
    scribing_price: '',
    content: '',
    order_num: '',
    is_collect: '',
    goods_image: {},
    goods_comment: [],
    goods_staff: [],
    appoint_time: []
})

// 是否登录
const userStore = useUserStore()
const isLogin = computed(() => userStore.token)
const isEmpty = ref(true)
const goodsId = ref<number | string>('')
const goodsSpecRef = shallowRef<InstanceType<typeof GoodsSpec> | any>()
const appointTime = ref<TIME>({
    year: '',
    date: '',
    start_time: '',
    end_time: ''
})

// 预约上门时间
const appoint = computed(() => {
    const time = unref(appointTime)
    if (!time.date) return '请选择时间'
    else return `${time.date} ${time.start_time}-${time.end_time}`
})

/**
 * @description 获取商品详情
 */

const appStore = useAppStore()
const initGoodaDetail = async (): Promise<void> => {
    try {
        const res: GOODS = await apiGoodsDetail({
            id: goodsId.value,
            city_id: appStore.cityInfo.city_id
        })
        for (const key in goodsData) {
            if (res[key] != null && res[key] != undefined) {
                goodsData[key] = res[key]
            }
        }
    } catch (error) {
        console.log(error)
        isEmpty.value = false
    }
}

// 收藏
const handleCollection = async (collect: boolean | number | null): Promise<void> => {
    if (!isLogin.value) {
        return uni.$u.toast('请先登录!')
    }
    try {
        await apiGoodsCollection({
            id: unref(goodsId),
            is_collect: collect ? 1 : 0
        })
        initGoodaDetail()
    } catch (error) {
        //TODO handle the exception
        console.log('收藏请求错误', error)
    }
}

// 立即预约
const onAppointment = () => {
    goodsSpecRef.value.showPop = true
}

// 处理预约
const handleOrder = (goodsNum: number) => {
    try {
        const goods = {
            goods_num: goodsNum,
            id: goodsId.value
        }
        unref(appointTime).date = ''
        if (unref(appointTime).date === '') {
            return goPage(`/bundle/pages/appoint_time/index?params=${JSON.stringify(goods)}`)
        }
        const params = {
            goodsData: goods,
            appointData: unref(appointTime)
        }
        goPage(`/pages/order_buy/index?params=${JSON.stringify(params)}`)
    } catch (error) {
        console.log('处理预约', error)
    }
}

const goPage = (url: string) => {
    uni.navigateTo({ url: url })
}

// 返回首页
const goHome = () => {
    uni.reLaunch({ url: '/pages/index/index' })
}

onShow(() => {
    removeStorageData('selectDate')
})

onLoad((options) => {
    goodsId.value = options?.id || 0
    initGoodaDetail()

    // 监听上门时间选择
    uni.$on('appointTime', (event: TIME) => {
        appointTime.value = event
    })
})

onUnload(() => {
    uni.$off(['appointTime'])
})
</script>

<style lang="scss">
// 收藏图标
.collection {
    width: 44rpx;
    height: 44rpx;
}

.padding {
    padding: 0 30rpx;
}

.line-3 {
    -webkit-line-clamp: 3;
    overflow: hidden;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; // 弹性伸缩盒
    -webkit-box-orient: vertical; // 设置伸缩盒子元素排列方式
}

// 底部按钮
.footer {
    left: 0;
    bottom: 0;
    width: 100%;
    position: fixed;
    padding: 20rpx 30rpx;
    background-color: #ffffff;
    box-shadow: 2rpx 2rpx 22rpx rgba($color: #000000, $alpha: 0.2);
    padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx);
}

// 服务下架或不存在时
.empty {
    padding-top: 200rpx;

    .empty-bottom {
        width: 90vw;
        margin-top: 130rpx;
    }
}
</style>
