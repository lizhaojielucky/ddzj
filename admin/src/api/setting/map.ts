import request from '@/utils/request'

// 获取地图配置
export function getMapConfig(params: any = '') {
    return request.get({ url: '/setting.web.web_setting/getMapKey', params })
}

// 设置地图配置
export function setMapConfig(params: any) {
    return request.post({ url: '/setting.web.web_setting/setMapKey', params })
}
