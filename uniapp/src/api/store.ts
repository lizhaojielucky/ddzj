import request from '@/utils/request'

/**
 * @param { Object } params
 * @return { Promise }
 * @description 首页数据
 */
export const apiIndex = (params: any) => request.get({ url: '/index/index', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 轮博图
 */
export const apiAdLists = (params: any) => request.get({ url: '/ad/lists', data: params })

/**
 * @return { Promise }
 * @description 服务分类
 */
export const apiCategoryLists = () => request.get({ url: '/goods_category/lists' })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 商品服务分类
 */
export const apiGoodsCategoryLists = (params: any) =>
    request.get({ url: '/goods_category/otherLists', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 服务列表
 */
export const apiGoodsLists = (params: any) =>
    request.get({ url: '/goods/lists', data: params }, { ignoreCancel: true })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 服务师傅
 */
export const apiStaffLists = (params: any) => request.get({ url: '/staff/lists', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 师傅详情
 */
export const apiStaffDetail = (params: any) => request.get({ url: '/staff/detail', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 获取地级市列表
 */
export const apiRegionCity = () => request.get({ url: '/region/city' })

/**
 * @description 热门搜索
 * @return { Promise }
 */
export function getHotSearch() {
    return request.get({ url: '/search/hotLists' })
}

/**
 * @description 搜索
 * @param { string } keyword 关键词
 * @return { Promise }
 */
export function getSearch(data: { keyword: string; pageNo: number; pageSize: number }) {
    return request.get({ url: '/search', data })
}
