import { defineStore } from 'pinia'
import { apiConfigGet } from '@/api/app'
import { isWeixinClient } from '@/utils/client'
// #ifdef H5
import { getLocation } from '@/hooks/wechat'
// #endif
import { getGeocoderCoordinate } from '@/api/app'

interface City {
    name: string | null | undefined
    city_id: number | null | undefined | string
    latitude: string | null | undefined
    longitude: string | null | undefined
}

interface AppModule {
    config: Record<string, any>
    cityInfo: City
    sysInfo: Record<string, any>
}

export const useAppStore = defineStore({
    id: 'appStore',
    state: (): AppModule => ({
        // 公共配置
        config: {
            navigation_menu: [],
            style: {}
        },
        // 城市信息
        cityInfo: {
            name: '选择',
            city_id: '',
            latitude: '',
            longitude: ''
        },
        // 系统信息
        sysInfo: {}
    }),
    getters: {
        appConfig: (state) => state.config,
        cityData: (state) => state.cityInfo
    },
    actions: {
        // 对url过滤，如url是完整地址则直接返回；如不完整则拼接域名前缀
        getImageUrl(url: string) {
			if (!url) return
            return (url.includes('http://') || url.includes('https://')) ? url : `${this.config.domain}${url}`
        },

        setCityInfo(city: City) {
            this.cityInfo = city

            console.log('cityInfo', city)
            uni.$emit('refreshhome')
        },

        //  获取公共数据
        async getConfig() {
            try {
                const res = await apiConfigGet()
                this.config = res
            } catch (error) {
                console.log('公共数据请求', error)
            }
        },

        // 获取系统信息
        getSystemInfo() {
            uni.getSystemInfo({
                success: (res) => {
                    const { statusBarHeight, platform }: any = res
                    let navHeight
                    if (platform == 'ios' || platform == 'devtools') {
                        navHeight = statusBarHeight + 44
                    } else {
                        navHeight = statusBarHeight + 48
                    }
                    this.sysInfo = {
                        ...res,
                        navHeight
                    }
                },
                fail(err) {
                    console.log(err)
                }
            })
        },

        // 初始化获取位置
        async getLocationFunc() {
            let res: any
            const slef = <any>this
            try {
                if (isWeixinClient()) {
                    try {
                        // 获取微信给的地址
                        res = await getLocation()
                        slef.initCityFunc(res.latitude, res.longitude)
                        console.log('获取位置成功：', res)
                    } catch (e) {
                        console.log('获取位置失败：', e)
                    }
                } else {
                    uni.getLocation({
                        // #ifndef APP
                        type: 'gcj02',
                        // #endif
                        success(res) {
                            slef.initCityFunc(res.latitude, res.longitude)
                        },
                        fail(result) {
                            console.log(result)
                            // #ifdef MP
                            if (!slef.sysInfo.locationEnabled) {
                                return uni.showModal({
                                    title: '温馨提示',
                                    content: '您的手机定位还未开启后，开启后重新进入小程序或刷新'
                                })
                            }
                            slef.getAuthorizeFunc()
                            // #endif
                        }
                    })
                }
            } catch (err) {
                console.log('失败原因：', err)
            }
        },

        // 小程序未开启定位或拒绝授权
        async getAuthorizeFunc() {
            const data: any = await uni.showModal({
                title: '您已拒绝地理位置权限',
                content: '是否进入权限管理，调整授权？'
            })
            if (data.confirm) {
                const data: any = await uni.openSetting()
                if (data.authSetting['scope.userLocation']) this.getLocationFunc()
            }
        },

        // 逆解析地址
        async initCityFunc(latitude: string, longitude: string) {
            try {
                const res = await getGeocoderCoordinate({
                    location: `${latitude},${longitude}`
                })
                if (res.status == 0) {
                    const obj = {
                        name: res.result.address_component.city,
                        city_id: res.result.ad_info.city_code.substring(3, 9),
                        latitude: latitude,
                        longitude: longitude
                    }
                    this.setCityInfo(obj)
                } else {
                    uni.$u.toast(res.message)
                }
            } catch (error) {
                console.log('逆解析地址', error)
            }
        }
    }
})
