<template>
    <div class="decoration-pages min-w-[1100px]">
        <el-card shadow="never" class="!border-none flex-1 flex" :body-style="{ flex: 1 }">
            <div class="flex h-full items-start">
                <Menu v-model="activeMenu" :menus="menus" />
                <preview v-model="selectWidgetIndex" :pageData="getPageData" :type1="activeMenu" />
                <attr-setting class="flex-1" :widget="getSelectWidget" />
            </div>
        </el-card>
        <footer-btns class="mt-4" :fixed="false" v-perms="['decorate.page/save']">
            <el-button type="primary" @click="setData">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup>
import Menu from '../component/pages/menu.vue'
import Preview from '../component/pages/preview.vue'
import AttrSetting from '../component/pages/attr-setting.vue'
import widgets from '../component/widgets'
import { getDecoratePages, setDecoratePages } from '@/api/decorate'
import { getNonDuplicateID } from '@/utils/util'
enum pagesTypeEnum {
    HOME = '1',
    USER = '2',
    SERVICE = '3'
}

const generatePageData = (widgetNames: string[]) => {
    return widgetNames.map((widgetName) => {
        const options = {
            id: getNonDuplicateID(),
            ...(widgets[widgetName]?.options() || {})
        }
        return options
    })
}

const menus: Record<
    string,
    {
        id: number
        name: string
        pageData: any[]
        pageType: number
    }
> = reactive({
    [pagesTypeEnum.HOME]: {
        id: 1,
        pageType: 1,
        name: '首页装修',
        pageData: generatePageData(['search', 'banner', 'nav', 'hot'])
    },
    [pagesTypeEnum.USER]: {
        id: 2,
        pageType: 2,
        name: '个人中心',
        pageData: generatePageData(['user-info', 'my-subscribe', 'my-service', 'user-banner'])
    },
    [pagesTypeEnum.SERVICE]: {
        id: 3,
        pageType: 3,
        name: '客服设置',
        pageData: generatePageData(['customer-service'])
    }
})

const activeMenu = ref('1')
const selectWidgetIndex = ref(-1)
const getPageData = computed(() => {
    return menus[activeMenu.value]?.pageData ?? []
})
const getSelectWidget = computed(() => {
    return menus[activeMenu.value]?.pageData[selectWidgetIndex.value] ?? ''
})

const getData = async () => {
    const data = await getDecoratePages({ id: activeMenu.value })
    menus[String(data.id)].pageData = JSON.parse(data.data)
    console.log('data:::', menus[String(data.id)].pageData)
}

const setData = async () => {
    await setDecoratePages({
        id: menus[activeMenu.value].id,
        type: menus[activeMenu.value].pageType,
        data: JSON.stringify(menus[activeMenu.value].pageData)
    })
    getData()
}
watch(
    activeMenu,
    () => {
        selectWidgetIndex.value = getPageData.value.findIndex((item) => !item.disabled)
        getData()
    },
    {
        immediate: true
    }
)
</script>
<style lang="scss" scoped>
.decoration-pages {
    min-height: calc(100vh - var(--navbar-height) - 80px);
    @apply flex flex-col;
}
</style>
