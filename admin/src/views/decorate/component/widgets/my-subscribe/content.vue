<template>
    <div class="my-service">
        <div
            v-if="content.title"
            class="py-[10px] px-[15px] title flex items-center justify-between"
        >
            <div class="">{{ content.title }}</div>
            <div>查看 ></div>
        </div>

        <div class="flex pt-[20px] pb-[10px]">
            <div
                v-for="(item, index) in content.data"
                :key="index"
                :class="{ 'flex-1': item.display }"
            >
                <div class="flex flex-col items-center mb-[15px]">
                    <decoration-img
                        v-if="item.display"
                        width="28px"
                        height="28px"
                        :src="getImageUrl(item.image)"
                        alt=""
                    />
                    <div v-if="item.display" class="mt-[7px]">{{ item.name }}</div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import type options from './options'
import DecorationImg from '../../decoration-img.vue'
import useAppStore from '@/stores/modules/app'

const { getImageUrl } = useAppStore()
type OptionsType = ReturnType<typeof options>
const props = defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({}),
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({}),
    },
})
console.log('props:', props.content)
</script>

<style lang="scss" scoped>
.my-service {
    margin: 10px 10px 0;
    background-color: #fff;
    border-radius: 7px;
    .title {
        border-bottom: 1px solid #e5e5e5;

        div {
            &:nth-child(1) {
                font-size: 16px;
                font-weight: 500;
            }
            &:nth-child(2) {
                font-size: 12px;
                color: #888888;
            }
        }
    }
    position: relative;
    top: -55px;
}
</style>
