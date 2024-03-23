<template>
    <div>
        <!-- 热门服务 -->
        <div class="hot_title pb-[10px] pt-[10px] overflow-hidden">
            <div class="flex items-center news-title mx-[10px] mb-[15px] text-[17px] font-medium">
                热门服务
            </div>
            <div class="hot">
                <div class="flex flex-wrap">
                    <div
                        class="flex-col items-center justify-center mx-[10px] w-[100px] h-[160px]"
                        v-for="item in data.hot_service"
                        :key="item.id"
                    >
                        <div>
                            <el-image class="w-[100px] h-[100px]" :src="item?.image"></el-image>
                        </div>

                        <el-tooltip :content="item.name" placement="top">
                            <div class="text-lg font-bold text-center truncate">
                                {{ item.name }}
                            </div>
                        </el-tooltip>

                        <el-tooltip :content="item.remarks" placement="top">
                            <div class="text-xs text-center truncate text-tx-disabled">
                                {{ item.remarks }}
                            </div>
                        </el-tooltip>
                    </div>
                </div>
            </div>
        </div>
        <!-- 师傅推荐 -->
        <div class="hot_title pb-[10px] pt-[10px]">
            <div class="flex items-center news-title mx-[10px] mb-[15px] text-[17px] font-medium">
                师傅推荐
            </div>
            <div class="flex hot">
                <div v-for="item in data.recommend_staff" :key="item.id">
                    <div class="master_worker_item ml-[10px]">
                        <div class="flex">
                            <el-avatar :src="item?.user_image" :size="43"> </el-avatar>
                            <div class="master_worker_item--text ml-[10px]">
                                <div class="master_worker-title">{{ item.name }}</div>
                                <div class="truncate master_worker-desc mt-[5px]">
                                    服务项目：{{ item.goods_name }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 服务分类推荐 -->
        <div
            class="hot_title pb-[10px] pt-[10px]"
            v-for="item in data.recommend_goods_category"
            :key="item.id"
        >
            <div class="flex items-center news-title mx-[10px] mb-[15px] text-3xl font-medium">
                {{ item.name }}
            </div>
            <div class="hot">
                <div class="flex">
                    <div
                        class="flex-col mx-[10px] w-[100px] h-[160px]"
                        v-for="iten in item.goods"
                        :key="iten.id"
                    >
                        <div>
                            <el-image
                                class="rounded-t"
                                style="width: 100px; height: 100px"
                                :src="iten?.image"
                            />
                        </div>
                        <div class="text-lg font-bold truncate my-1.5">{{ iten.name }}</div>
                        <div class="text-sm truncate text-error">
                            <span class="text-2xl font-medium">{{ iten.price }}</span
                            >{{ iten.unit_desc }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { getDecoratePages } from '@/api/decorate'
import type options from './options'
type OptionsType = ReturnType<typeof options>
defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})
const data = ref<any>({
    hot_service: [],
    recommend_goods_category: [],
    recommend_staff: []
})
const getData = async () => {
    const { hot_service, recommend_goods_category, recommend_staff } = await getDecoratePages({
        id: 1
    })
    // 只取前三个
    data.value.hot_service = hot_service.slice(0, 3)
    // 过滤无商品的分类
    data.value.recommend_goods_category = recommend_goods_category.filter((item) => {
        return item.goods.length !== 0
    })
    data.value.recommend_staff = recommend_staff
}
getData()
</script>

<style lang="scss" scoped>
.hot_title {
    background-color: white;
    margin-top: 10px;
}
.master_worker_item {
    display: inline-block;
    padding: 12px 10px 18px 14px;
    border: 1px solid #e5e5e5;
    border-radius: 0.5rem;

    &--text {
        .master_worker-title {
            font-weight: 500;
            color: #222;
            font-size: 15px;
        }

        .master_worker-desc {
            max-width: 175px;
            color: #222;
            font-size: 13px;
        }
    }
}
</style>
