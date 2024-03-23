import request from '@/utils/request'

// 服务列表
export function apiServiceLists(params: any) {
    return request.get({ url: '/goods.goods/lists', params })
}

// 添加服务
export function apiServiceAdd(params: any) {
    return request.post({ url: '/goods.goods/add', params })
}

// 删除服务
export function apiServiceDel(params: any) {
    return request.post({ url: '/goods.goods/del', params })
}

// 编辑服务
export function apiServiceEdit(params: any) {
    return request.post({ url: '/goods.goods/edit', params })
}

// 编辑服务状态
export function apiServiceStatus(params: any) {
    return request.post({ url: '/goods.goods/status', params })
}

// 服务详情
export function apiServiceDetail(params: any) {
    return request.get({ url: '/goods.goods/detail', params })
}
