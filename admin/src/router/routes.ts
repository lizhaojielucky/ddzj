/**
 * Note: 路由配置项
 *
 * path: '/path'                    // 路由路径
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * meta : {
	title: 'title'                  // 设置该路由在侧边栏的名字
	icon: 'icon-name'                // 设置该路由的图标
	activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
	query: '{"id": 1}'             // 访问路由的默认传递参数
	hidden: true                   // 当设置 true 的时候该路由不会在侧边栏出现 
    hideTab: true                   //当设置 true 的时候该路由不会在多标签tab栏出现
  }
 */

import type { RouteRecordRaw } from 'vue-router'
import { PageEnum } from '@/enums/pageEnum'
import Layout from '@/layout/default/index.vue'

export const LAYOUT = Layout

export const INDEX_ROUTE_NAME = Symbol()

export const constantRoutes: Array<RouteRecordRaw> = [
    {
        path: '/:pathMatch(.*)*',
        component: () => import('@/views/error/404.vue')
    },
    {
        path: PageEnum.ERROR_403,
        component: () => import('@/views/error/403.vue')
    },
    {
        path: PageEnum.LOGIN,
        component: () => import('@/views/account/login.vue')
    },
    {
        path: '/user',
        component: LAYOUT,
        children: [
            {
                path: 'setting',
                component: () => import('@/views/user/setting.vue'),
                meta: {
                    title: '个人设置'
                }
            }
        ]
    },
    {
        path: '/dev_tools',
        component: LAYOUT,
        children: [
            {
                path: 'code/edit',
                component: () => import('@/views/dev_tools/code/edit.vue'),
                meta: {
                    title: '编辑数据表',
                    activeMenu: '/dev_tools/code'
                }
            }
        ]
    },
    {
        path: '/setting',
        component: LAYOUT,
        children: [
            {
                path: 'dict/data',
                component: () => import('@/views/setting/dict/data/index.vue'),
                meta: {
                    title: '数据管理',
                    activeMenu: '/setting/dict'
                }
            },
            {
                path: 'system/task/edit',
                component: () => import('@/views/setting/system/task/edit.vue'),
                meta: {
                    title: '新增任务',
                    activeMenu: '/setting/system/task'
                }
            }
        ]
    },
    {
        path: '/service',
        component: LAYOUT,
        children: [
            {
                path: 'lists/edit',
                component: () => import('@/views/service/lists/edit.vue'),
                meta: {
                    title: '服务列表',
                    activeMenu: '/service/lists'
                }
            }
        ]
    },
    {
        path: '/service',
        component: LAYOUT,
        children: [
            {
                path: 'category/edit',
                component: () => import('@/views/service/category/edit.vue'),
                meta: {
                    title: '服务列表',
                    activeMenu: '/service/category'
                }
            }
        ]
    },
    {
        path: '/user',
        component: LAYOUT,
        children: [
            {
                path: 'userList/detail',
                component: () => import('@/views/user/userList/detail.vue'),
                meta: {
                    title: '用户列表',
                    activeMenu: '/user/userList'
                }
            }
        ]
    },
    {
        path: '/master_worker',
        component: LAYOUT,
        children: [
            {
                path: 'edit',
                component: () => import('@/views/master_worker/edit.vue'),
                meta: {
                    title: '添加师傅',
                    activeMenu: '/master_worker'
                }
            }
        ]
    },
    {
        path: '/order',
        component: LAYOUT,
        children: [
            {
                path: 'detail',
                component: () => import('@/views/order/lists/detail.vue'),
                meta: {
                    title: '订单详情',
                    activeMenu: '/order/index'
                }
            }
        ]
    },
    {
        path: '/setting',
        component: LAYOUT,
        children: [
            {
                path: 'payment/payment_way/edit',
                component: () => import('@/views/setting/payment/payment_way/edit.vue'),
                meta: {
                    title: '支付方式',
                    activeMenu: '/setting/payment/payment_way'
                }
            }
        ]
    }
]

export const INDEX_ROUTE: RouteRecordRaw = {
    path: PageEnum.INDEX,
    component: LAYOUT,
    name: INDEX_ROUTE_NAME
}
