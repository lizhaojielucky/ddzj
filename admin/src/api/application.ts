import request from '@/utils/request'

export function apiRechargeGetRule() {
    return request.get({ url: '/marketing.recharge/getSettings' })
}
export function apiRechargeSetRule(params: any) {
    return request.post({ url: '/marketing.recharge/setSettings', params })
}
