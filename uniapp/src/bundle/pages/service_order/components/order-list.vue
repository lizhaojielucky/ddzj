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
        <block v-for="(item, index) in dataList" :key="index">
            <order-card :orderInfo="item">
                <order-footer
                    :orderId="item?.id"
                    :cancel="item.cancel_btn"
                    :evaluate="item.comment_btn"
                    :contact="item.contact_btn"
                    :pay="item.pay_btn"
                    :mobile="item?.staff?.mobile"
                    :confirmService="item.confirm_service_btn"
                    :verification="item.verification_btn"
                    :orderStatus="item.order_status"
                    :goods_image="item.order_goods[0].goods_image"
                    :goods_name="item.order_goods[0].goods_name"
                    :type="2"
                    @refresh="queryList"
                />
            </order-card>
        </block>
    </z-paging>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, shallowRef, unref } from 'vue'
import orderCard from './order-card.vue'
import orderFooter from '@/components/order-footer/index.vue'
import { apiStaffOrderLists } from '@/api/order'
import { onShow } from '@dcloudio/uni-app'

const props = withDefaults(
    defineProps<{
        order_status: number
        i: number
        index: number
    }>(),
    {
        order_status: 0
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
        const { lists } = await apiStaffOrderLists({
            order_status: props.order_status,
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
