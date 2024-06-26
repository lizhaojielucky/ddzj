<template>
    <div class="material flex col-stretch" v-loading="pager.loading">
        <div class="material__left">
            <el-scrollbar class="ls-scrollbar" style="height: calc(100% - 40px)">
                <div class="material-left__content p-t-16 p-b-16">
                    <el-tree
                        ref="treeRefs"
                        node-key="id"
                        :data="cateLists"
                        empty-text
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        icon-class="el-icon-arrow-right"
                        :current-node-key="cateId"
                        @node-click="currentChange"
                    >
                        <template v-slot="{ data }">
                            <div class="flex flex-1 flex-center" style="min-width: 0">
                                <img
                                    style="width: 20px; height: 16px"
                                    src="@/assets/images/icon_folder.png"
                                    class="m-r-10"
                                />
                                <span class="flex-1 line-1 m-r-10">
                                    {{ data.name }}
                                </span>
                                <el-dropdown v-if="data.id > 0" :hide-on-click="false">
                                    <span class="muted m-r-10">···</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <div>
                                                <popover-input
                                                    type="text"
                                                    tips="分类名称"
                                                    @confirm="handleEditCate($event, data.id)"
                                                >
                                                    <el-dropdown-item>命名分组</el-dropdown-item>
                                                </popover-input>
                                            </div>
                                            <div @click="handleDeleteCate(data.id)">
                                                <el-dropdown-item>删除分组</el-dropdown-item>
                                            </div>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </template>
                    </el-tree>
                </div>
            </el-scrollbar>
            <div class="flex flex-center">
                <popover-input tips="分类名称" type="text" @confirm="handleAddCate">
                    <el-button>添加分组</el-button>
                </popover-input>
            </div>
        </div>
        <div class="material__center flex flex-col">
            <div class="operate-btn flex">
                <div class="flex-1 flex">
                    <upload
                        class="m-r-10"
                        :data="{ cid: cateId }"
                        :type="type.type"
                        :show-progress="true"
                        @change="refresh"
                    >
                        <el-button type="primary">本地上传</el-button>
                    </upload>
                    <popup
                        class="m-r-10 inline"
                        content="确定删除选中的文件？"
                        :disabled="!select.length"
                        @confirm="batchFileDelete()"
                    >
                        <template #trigger>
                            <el-button :disabled="!select.length">删除</el-button>
                        </template>
                    </popup>
                    <popup
                        class="m-r-10 inline"
                        @confirm="batchFileMove"
                        :disabled="!select.length"
                        title="移动文件"
                    >
                        <template #trigger>
                            <el-button :disabled="!select.length">移动</el-button>
                        </template>

                        <div>
                            <span class="m-r-20">移动文件至</span>
                            <el-select v-model="moveId" placeholder="请选择">
                                <template v-for="item in cateLists" :key="item.id">
                                    <el-option
                                        v-if="item.id !== ''"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </template>
                            </el-select>
                        </div>
                    </popup>
                </div>
                <el-input
                    placeholder="请输入名字"
                    style="width: 280px"
                    v-model="fileParams.name"
                    @keyup.enter="refresh"
                >
                    <template #append>
                        <el-button :icon="Search" @click="refresh"></el-button>
                    </template>
                </el-input>
            </div>
            <div class="material-center__content flex flex-col flex-1">
                <ul class="file-list flex flex-wrap m-t-14">
                    <li
                        class="file-item-wrap"
                        v-for="item in pager.lists"
                        :key="item.id"
                        :style="{ width: fileSize }"
                        @click="selectFile(item)"
                    >
                        <file-item
                            :uri="item.uri"
                            :file-size="fileSize"
                            @close="batchFileDelete([item.id])"
                        >
                            <div class="item-selected" v-if="selectStatus(item.id)">
                                <el-icon color="#fff" size="24">
                                    <check />
                                </el-icon>
                            </div>
                        </file-item>

                        <div class="item-name line-1 xs p-t-10">{{ item.name }}</div>
                    </li>
                </ul>
                <div
                    class="flex flex-1 row-center col-center"
                    v-if="!pager.loading && !pager.lists.length"
                >
                    暂无数据~
                </div>
            </div>
            <div class="material-center__footer flex row-right">
                <pagination
                    v-model="pager"
                    @change="getFileList"
                    layout="total, prev, pager, next, jumper"
                />
            </div>
        </div>
        <div class="material__right">
            <div class="flex row-between p-l-10 p-r-10">
                <div class="sm flex flex-center">
                    已选择 {{ select.length }}
                    <span v-if="limit">/{{ limit }}</span>
                </div>
                <el-button type="text" @click="clearSelect">清空</el-button>
            </div>

            <el-scrollbar class="ls-scrollbar" style="height: calc(100% - 32px)">
                <ul class="select-lists flex-col p-t-10">
                    <li class="m-b-16" v-for="item in select" :key="item.id">
                        <div class="select-item">
                            <file-item
                                :uri="item.uri"
                                file-size="100px"
                                @close="cancelSelete(item.id)"
                            ></file-item>
                        </div>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, ref, toRefs, watch } from 'vue'
import type { Ref } from 'vue'
import { useCate, useFile } from './hook'
import PopoverInput from '@/components/popover-input/index.vue'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import Upload from '@/components/upload/index.vue'
import FileItem from './file-item.vue'
import { Search } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
export default defineComponent({
    components: {
        PopoverInput,
        Pagination,
        Popup,
        Upload,
        FileItem
    },
    props: {
        fileSize: {
            type: String,
            default: '100px'
        },
        limit: {
            type: Number,
            default: 1
        }
    },
    emits: ['change'],
    setup(props, { emit }) {
        const treeRefs: Ref<typeof ElTree | null> = ref(null)
        const type = inject('type') as Ref<any>
        const { limit } = toRefs(props)
        const typeValue = inject('typeValue') as Ref<10 | 20 | 30>
        const visible = inject('visible') as Ref<boolean>
        const { cateId, cateLists, handleAddCate, handleEditCate, handleDeleteCate, getCateLists } =
            useCate(typeValue)
        const {
            moveId,
            pager,
            fileParams,
            select,
            getFileList,
            refresh,
            batchFileDelete,
            batchFileMove,
            selectFile,
            selectStatus,
            clearSelect,
            cancelSelete
        } = useFile(cateId, typeValue, limit)

        const currentChange = (item: any) => {
            cateId.value = item.id
        }

        watch(
            visible,
            async (val: boolean) => {
                if (val) {
                    await getCateLists()
                    treeRefs.value?.setCurrentKey(cateId.value)
                    getFileList()
                }
            },
            {
                immediate: true
            }
        )
        watch(cateId, (val: string) => {
            fileParams.name = ''
            refresh()
        })
        watch(
            select,
            (val: any[]) => {
                emit('change', val)
            },
            {
                deep: true
            }
        )
        return {
            treeRefs,
            Search,
            type,
            limit,
            cateId,
            cateLists,
            handleAddCate,
            handleEditCate,
            handleDeleteCate,
            currentChange,
            moveId,
            pager,
            fileParams,
            select,
            getFileList,
            refresh,
            batchFileDelete,
            batchFileMove,
            selectFile,
            selectStatus,
            clearSelect,
            cancelSelete
        }
    }
})
</script>

<style scoped lang="scss">
.material {
    height: 100%;
    flex: 1;
    &__left {
        width: 170px;
        :deep(.el-tree-node__content) {
            height: 40px;
        }
    }
    &__center {
        flex: 1;
        border-left: 1px solid #e5e5e5;
        padding: 16px;
        .file-list {
            .file-item-wrap {
                margin-right: 16px;
                margin-bottom: 16px;
                line-height: 1.3;
                cursor: pointer;
                .item-selected {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    background-color: rgba(0, 0, 0, 0.5);
                    box-sizing: border-box;
                }
                .operation-btns {
                    height: 28px;
                    visibility: hidden;
                }
                &:hover .operation-btns {
                    visibility: visible;
                }
            }
        }
    }
    &__right {
        border-left: 1px solid #e5e5e5;
        width: 150px;
        .select-lists {
            padding: 10px;

            .select-item {
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>
