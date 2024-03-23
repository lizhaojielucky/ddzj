import request from '@/utils/request'

// 获取交易设置
export function getConfig(params: any = '') {
    return request.get({ url: '/setting.transaction_settings/getConfig', params })
}

// 设置交易设置
export function setConfig(params: any) {
    return request.post({ url: '/setting.transaction_settings/setConfig', params })
}
