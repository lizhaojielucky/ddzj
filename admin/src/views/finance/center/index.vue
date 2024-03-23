<template>
    <div class="center">
        <el-card shadow="never" class="!border-none">
            <div class="flex items-center">
                <div class="border-l-4 h-4" style="border-color: rgb(49, 87, 242)"></div>
                <div class="ml-2 title">经营概况</div>
            </div>

            <div class="ml-4 mt-6 pb-6 flex flex-wrap">
                <div class="flex sm:flex-1" v-for="(item, index) in data" :key="index">
                    <div class="w-[66px] h-[66px] mr-2 mt-5 sm:mt-0">
                        <img :src="item.img" />
                    </div>
                    <div class="flex flex-col mt-5 sm:mt-0">
                        <div class="amount">{{ item.amount }}</div>
                        <div class="flex">
                            <div class="text">{{ item.desc }}</div>
                            <div class="w-[16px] h-[16px]">
                                <el-tooltip
                                    :content="`${item.tips}`"
                                    placement="bottom"
                                    effect="dark"
                                >
                                    <img src="@/assets/images/finance_center/yiwen.png" />
                                </el-tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { getFinanceCenter } from '@/api/finance/center'
import total_amount from '@/assets/images/finance_center/total_amount.png'
import total_order from '@/assets/images/finance_center/total_order.png'
import total_refund_amount from '@/assets/images/finance_center/total_refund_amount.png'
import wait_refund_amount from '@/assets/images/finance_center/wait_refund_amount.png'
const data = ref<any>([
    {
        amount: '',
        img: total_amount,
        desc: '累计营业额（元）',
        tips: '成交订单的金额，无论订单是否取消，只要支付过就算营业额'
    },
    {
        amount: '',
        img: total_order,
        desc: '累计成交订单（笔）',
        tips: '已付款就算成交订单数'
    },
    {
        amount: '',
        img: total_refund_amount,
        desc: '已退款金额（元）',
        tips: '退款记录里面已退款成功的金额'
    },
    {
        amount: '',
        img: wait_refund_amount,
        desc: '待退款金额（元）',
        tips: '退款记录里面退款中和退款失败的金额'
    }
])

const getCenterData = async () => {
    const i = ref(0)
    const res = await getFinanceCenter('')
    for (const key in res) {
        data.value[i.value].amount = res[key]
        i.value++
    }
}
getCenterData()
</script>

<style lang="scss" scoped>
.title {
    font-size: 16px;
}
.amount {
    font-family: 'PingFang HK';
    font-weight: 400;
    font-size: 32px;
    text-align: left;
    color: #333;
}
.text {
    font-family: 'PingFang HK';
    font-weight: 400;
    font-size: 14px;
    text-align: left;
    color: #666;
}
</style>
