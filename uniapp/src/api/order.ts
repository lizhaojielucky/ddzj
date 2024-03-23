import request from '@/utils/request'

/**
 * @param { Object } params
 * @return { Promise }
 * @description 订单下单
 */
export const apiPlaceOrder = (params: any) =>
    request.post({ url: '/order/placeOrder', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 订单列表
 */
export const apiOrderLists = (params: any) => request.get({ url: '/order/lists', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 订单详情
 */
export const apiOrderDetail = (params: any) => request.get({ url: '/order/detail', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 取消订单
 */
export const apiOrderCancel = (params: any) => request.post({ url: '/order/cancel', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 删除订单
 */
export const apiOrderDel = (params: any) => request.post({ url: '/order/del', data: params })

/** 师傅订单服务 Start **/
/**
 * @param { Object } params
 * @return { Promise }
 * @description 师傅服务列表
 */
export const apiStaffOrderLists = (params: any) =>
    request.get({ url: '/staff_order/lists', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 师傅服务详情
 */
export const apiStaffOrderDetail = (params: any) =>
    request.get({ url: '/staff_order/detail', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 确认服务
 */
export const apiStaffOrderConfirmService = (params: any) =>
    request.post({ url: '/staff_order/confirmService', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 核销订单
 */
export const apiStaffOrderVerification = (params: any) =>
    request.post({ url: '/staff_order/verification', data: params })
/** 师傅订单服务 Start **/
