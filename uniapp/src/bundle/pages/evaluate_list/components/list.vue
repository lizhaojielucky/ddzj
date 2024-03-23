<template>
    <z-paging
        auto-show-back-to-top
        :auto="i == index"
        ref="paging"
        v-model="dataList"
        :data-key="i"
        @query="queryList"
        :fixed="false"
        height="100%"
    >
        <template v-if="index == 0">
            <block v-for="(item2, index) in dataList" :key="index">
                <wait
                    :name="item2.goods_name"
                    :image="item2.goods_image"
                    :unit_name="item2.unit_name"
                    :price="item2.goods_price"
                    :goodsId="item2.id"
                ></wait>
            </block>
        </template>

        <template v-if="index == 1">
            <block v-for="(item2, index) in dataList" :key="index">
                <already
                    v-if="item2.goods_comment"
                    :comment="item2.goods_comment.comment"
                    :goods_comment_image="item2.goods_comment.goods_comment_image"
                    :reply="item2.goods_comment.reply"
                    :create_time="item2.goods_comment.create_time"
                    :goods_id="item2.goods_comment.goods_id"
                    :service_comment="item2.goods_comment.service_comment"
                    :goods_image="item2.goods_image"
                    :goods_name="item2.goods_name"
                    :goods_price="item2.goods_price"
                    :unit_name="item2.unit_name"
                ></already>
            </block>
        </template>
    </z-paging>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, shallowRef, unref } from 'vue'
import Wait from './wait.vue'
import Already from './already.vue'
import { apiEvaluateLists } from '@/api/user'

const props = withDefaults(
    defineProps<{
        type: number
        count: number
        i: number
        index: number
    }>(),
    {
        type: 0,
        count: 0
    }
)

const paging = shallowRef<any>(null)
const dataList = ref<any>([])
const isFirst = ref<boolean>(true)

watch(
    () => props.index,
    async () => {
        await nextTick()
        if (props.i == props.index && unref(isFirst)) {
            isFirst.value = false
            paging.value?.reload()
        }
    },
    { immediate: true }
)

const queryList = async (pageNo: number, pageSize: number) => {
    try {
        const { lists } = await apiEvaluateLists({
            type: props.type,
            pageNo,
            pageSize
        })
        paging.value.complete(lists)
    } catch (e) {
        console.log('报错=>', e)
        //TODO handle the exception
        paging.value.complete(false)
    }
}
</script>

<style scoped></style>
