import request from '@/utils/request'
// #ifdef H5
import { getSignLink } from '@/hooks/wechat'
// #endif

//发送短信
export function smsSend(data: any) {
    return request.post({ url: '/sms/sendCode', data: data })
}

/**
 * @return { Promise }
 * @description 获取公共配置
 */
export const apiConfigGet = () => request.get({ url: '/config/config' })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 访问量
 */
export const apiIndexVisit = (params: any) => request.post({ url: '/index/visit', data: params })

/**
 * @return { Promise }
 * @description 获取公共配置
 */
// 获取政策协议
export const apiPolicyAgreement = () => request.get({ url: '/config/agreement' })

/**
 * @return { Promise }
 * @description 获取客服信息
 */
export const apiContactService = () => request.get({ url: '/user/customerService' })

/**
 * @return { Promise }
 * @description 微信消息订阅
 */
export const apiSubscribe = () => request.get({ url: '/subscribe/lists' })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 支付方式
 */
export const apiPayPayWay = (params: any) => request.get({ url: '/pay/payWay', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 预支付
 */

// 获取支付状态
export function getPayStatus(data: any) {
    return request.get({ url: '/mall.pay/status', data: data }, { isAuth: true })
}

export const apiPayPrepay = (params: any) => request.post({ url: '/pay/prepay', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 公众号登录
 */
export const apiOALogin = (params: any) => request.post({ url: '/login/oaLogin', data: params })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 公众号-获取授权url
 */
export const apiCodeUrlGet = () =>
    request.get({
        url: '/login/codeUrl',
        data: {
            url: location.href
        }
    })

/**
 * @param { Object } params
 * @return { Promise }
 * @description 微信sdk配置
 */
export const apiJsConfig = () =>
    request.get({ url: '/wechat/jsConfig', data: { url: getSignLink() } })

/**
 * @param { Object } params { address: 广州市番禺区xxx }
 * @return { Promise }
 * @description 地址逆解析
 */
export const getGeocoder = (params: any) => request.get({ url: '/index/geocoder', data: params })

/**
 * @param { Object } params { location: xxx,xxx }
 * @return { Promise }
 * @description 地址逆解析
 */
export const getGeocoderCoordinate = (params: any) =>
    request.get({ url: '/index/geocoderCoordinate', data: params })

export function uploadImage(file: any, token?: string) {
    return request.uploadFile({
        url: '/upload/image',
        filePath: file,
        name: 'file',
        header: {
            token
        },
        fileType: 'image'
    })
}
