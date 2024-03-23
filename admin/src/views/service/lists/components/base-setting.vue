<template>
    <el-form-item label="服务名称:" prop="name">
        <el-input
            class="w-56 ls-input"
            maxlength="64"
            show-word-limit
            v-model.trim="modelValue.name"
            placeholder="请输入服务名称"
        />
    </el-form-item>
    <el-form-item label="服务简介:" prop="remarks">
        <el-input class="w-56 ls-input" v-model="modelValue.remarks" placeholder="请输入服务简介" />
    </el-form-item>
    <el-form-item label="服务分类:" prop="category_id">
        <!-- 选择分类 -->
        <el-cascader
            class="mr-2 w-56 ls-input"
            v-model="modelValue.category_id"
            :options="categoryData"
            :props="props"
            clearable
        />

        <!-- 新增分类 -->
        <el-button type="text" @click="toAddCategory">新增分类</el-button>
        <el-button type="text">|</el-button>
        <el-button type="text" @click="getCategoryLists">刷新</el-button>
    </el-form-item>
    <el-form-item label="轮播图:" prop="goods_image">
        <div>
            <material-picker v-model="modelValue.goods_image" :limit="10"></material-picker>
            <div class="form-tips">
                建议尺寸：800*800，可拖拽改变图片顺序，默认首张图为主图，最多上传10张
            </div>
        </div>
    </el-form-item>
    <el-form-item label="价格:" prop="price">
        <el-input class="w-56 ls-input" v-model="modelValue.price" placeholder="请输入价格" />
    </el-form-item>
    <el-form-item label="划线价:" prop="scribing_price">
        <el-input
            class="w-56 ls-input"
            v-model="modelValue.scribing_price"
            placeholder="请输入划线价"
        />
    </el-form-item>
    <el-form-item label="单位:" prop="unit_id">
        <!-- 选择单位 -->
        <el-select v-model="modelValue.unit_id" class="w-56 select" placeholder="请选择">
            <el-option
                :label="item.name"
                :value="item.id"
                v-for="(item, index) in unitData"
                :key="index"
            />
        </el-select>
        <!-- 新增单位 -->
        <unit-form @refresh="getUnitCommonLists" type="text" btnText="新增单位" class="mr-3" />
        <el-button type="text">|</el-button>
        <el-button type="text" @click="getUnitCommonLists">刷新</el-button>
    </el-form-item>
    <el-form-item label="排序:">
        <el-input class="w-56 ls-input" v-model="modelValue.sort" />
    </el-form-item>
    <el-form-item label="商品状态:" prop="status">
        <el-radio v-model="modelValue.status" :label="1">立即上架</el-radio>
        <el-radio v-model="modelValue.status" :label="0">放入仓库</el-radio>
    </el-form-item>
</template>

<script lang="ts" setup>
import { apiCategoryLists } from '@/api/service/category'
import { apiUnitCommonLists } from '@/api/service/unit'
import { reactive, ref } from 'vue'
import MaterialPicker from '@/components/material/picker.vue'
import unitForm from '../../unit/components/unit-form.vue'

interface Lists {
    name: string
    id: number | string
}

withDefaults(
    defineProps<{
        modelValue?: any
    }>(),
    {
        modelValue: {}
    }
)

const categoryData = ref<Array<Lists> | null>([])
const unitData = ref<Array<Lists> | null>([])
const props = reactive({
    multiple: false,
    checkStrictly: false,
    label: 'name',
    value: 'id',
    children: 'sons',
    emitPath: false
})

// 获取分类通用列表
const getCategoryLists = async (): Promise<void> => {
    const res: any = await apiCategoryLists({})
    categoryData.value = res.lists
}

// 获取单位通用列表
const getUnitCommonLists = async (): Promise<void> => {
    ;(unitData.value as object) = await apiUnitCommonLists()
}

// 去新建分类
const toAddCategory = () => {
    window.open(window.origin + '/admin/service/category', '_blank')
}

getCategoryLists()
getUnitCommonLists()
</script>

<style lang="scss" scoped>
.ls-input {
    width: 460px;
}
.select {
    width: 340px;
    margin-right: 10px;
}
</style>
