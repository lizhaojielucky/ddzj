<template>
    <z-paging ref="paging" v-model="balance.lists" @query="queryList" :fixed="false" height="100%">
        <!-- 余额明细列表 -->
        <view class="balance-details">
            <view v-for="(item, index) in balance.lists" :key="index">
                <view class="balance-details-item">
                    <view class="flex">
                        <view class="flex-1 balance-details-item-text">{{
                            item.change_type_desc
                        }}</view>
                        <view v-if="item.action == 2" class="balance-details-item-amount-add">
                            +{{ item.change_amount }}
                        </view>
                        <view v-else class="balance-details-item-amount-reduce">
                            -{{ item.change_amount }}
                        </view>
                    </view>

                    <view class="balance-details-item-time">{{ item.remark }}</view>
                    <view class="balance-details-item-time">{{ item.create_time }}</view>
                </view>
            </view>
        </view>
    </z-paging>
</template>

<script lang="ts" setup>
import { reactive, ref, shallowRef } from 'vue'
import { apiAccountLogLists } from '@/api/wallet'
import { onLoad } from '@dcloudio/uni-app'

const props = withDefaults(
    defineProps<{
        status: string | number
        i: number
        index: number
    }>(),
    {
        status: ''
    }
)

const balance = reactive({
    lists: [] as any,
    change_type: 1
})
// 下拉组件的Ref
const paging = shallowRef()

const queryList = async (page_no: number, page_size: number) => {
    try {
        const { lists } = await apiAccountLogLists({
            page_no,
            page_size,
            action: props.status,
            change_object: balance.change_type
        })
        paging.value.complete(lists)
    } catch (e) {
        paging.value.complete(false)
    }
}

onLoad((options: any) => {
    balance.change_type = options.changeObject

    if (balance.change_type == 2) {
        uni.setNavigationBarTitle({
            title: '佣金明细'
        })
    }
})
</script>

<style lang="scss" scoped>
.balance-details {
    .balance-details-item {
        background-color: #fff;
        padding: 20rpx 30rpx;
        border-bottom: 1rpx solid #ebebeb;

        .balance-details-item-text {
            font-size: 30rpx;
            font-weight: 400;
        }

        .balance-details-item-amount-add {
            font-size: 34rpx;
            font-weight: 400;
            color: #ff0017;
        }

        .balance-details-item-amount-reduce {
            font-size: 34rpx;
            font-weight: 400;
            color: #333;
        }

        .balance-details-item-time {
            font-size: 24rpx;
            font-weight: 400;
            color: #999;
            margin-top: 10rpx;
        }
    }
}

.empty {
    padding-top: 300rpx;
}
</style>
