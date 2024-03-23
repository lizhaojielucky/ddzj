<template>
    <view class="container">
        <!-- Mian Start -->
        <u-form :model="formData" ref="formRef" :error-type="['message', 'toast']">
            <!-- 联系人 -->
            <view class="card">
                <u-form-item prop="contact">
                    <view class="flex">
                        <view class="label"> 联系人 </view>
                        <u-input v-model="formData.contact" placeholder="请输入联系人" />
                    </view>
                </u-form-item>
            </view>
            <!-- 手机号 -->
            <view class="card">
                <u-form-item prop="mobile">
                    <view class="flex">
                        <view class="label"> 手机号 </view>
                        <u-input v-model="formData.mobile" placeholder="请输入手机号码" />
                    </view>
                </u-form-item>
            </view>
            <!-- 省市区 -->
            <view class="card">
                <u-form-item prop="region">
                    <view class="flex relative" style="width: 100%" @click="chooseLocation">
                        <view class="label"> 省市区 </view>
                        <view class="flex-1">
                            <u-input
                                @click.stop="chooseLocation"
                                v-model="formData.region"
                                placeholder="请选择"
                                :disabled="true"
                            />
                        </view>
                        <!--#ifdef H5 -->
                        <view
                            class="absolute w-full h-full opacity-0"
                            @click="chooseLocation"
                        ></view>
                        <!-- #endif -->
                        <u-icon name="arrow-right" size="22" color="#888888"></u-icon>
                    </view>
                </u-form-item>
            </view>
            <!-- 门牌号 -->
            <view class="card">
                <u-form-item prop="address">
                    <view class="flex w-full col-start">
                        <view class="label"> 门牌号 </view>
                        <view class="flex-1 pt-[6rpx]">
                            <u-input
                                v-model="formData.address"
                                type="textarea"
                                placeholder="请选择"
                                height="124"
                            />
                        </view>
                    </view>
                </u-form-item>
            </view>
            <!-- 是否默认地址 -->
            <view
                class="is-default flex m-[20rpx]"
                @click="formData.is_default = !formData.is_default"
            >
                <image
                    v-if="formData.is_default"
                    src="/static/images/icon_select.png"
                    mode=""
                ></image>
                <image
                    v-if="!formData.is_default"
                    src="/static/images/icon_unselect.png"
                    mode=""
                ></image>
                <text class="text-xs normal ml-[15rpx]">设为默认</text>
            </view>
        </u-form>
        <!-- Mian End -->

        <!-- Footer Start -->
        <view class="flex m-[20rpx] pt-[30rpx]">
            <!-- #ifdef H5 || MP-WEIXIN -->
            <view v-if="addressId" class="flex-1 mr-[20rpx]">
                <button
                    class="bg-white text-lg text-black rounded-full leading-[80rpx] h-[80rpx]"
                    @click="delPupop = true"
                >
                    删除
                </button>
            </view>
            <!-- #endif -->
            <view class="flex-1">
                <button
                    class="bg-primary text-lg text-white rounded-full leading-[80rpx] h-[80rpx]"
                    @click="onSubmit"
                >
                    保存
                </button>
            </view>
        </view>
        <!-- Footer End -->

        <!-- 删除地址 弹窗 Start -->
        <u-modal
            id="delete-dialog"
            v-model="delPupop"
            :showCancelButton="true"
            confirm-text="狠心删除"
            title="温馨提示"
            confirm-color="#F36161"
            @confirm="handleAddressDel"
            @cancel="delPupop = false"
        >
            <view class="text-center p-[50rpx]">
                <text>确认删除该地址吗？</text>
            </view>
        </u-modal>
        <!-- 删除地址 弹窗 End -->
    </view>
</template>

<script lang="ts" setup>
// +----------------------------------------------------------------------
// | LikeShop100%开源免费商用电商系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | 开源版本可自由商用，可去除界面版权logo
// | 商业版本务必购买商业授权，以免引起法律纠纷
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | Gitee下载：https://gitee.com/likeshop_gitee/likeshop
// | 访问官网：https://www.likemarket.net
// | 访问社区：https://home.likemarket.net
// | 访问手册：http://doc.likemarket.net
// | 微信公众号：好象科技
// | 好象科技开发团队 版权所有 拥有最终解释权
// +----------------------------------------------------------------------
// | Author: LikeShopTeam
// +----------------------------------------------------------------------
import { onLoad, onReady, onUnload } from '@dcloudio/uni-app'
import { ref, reactive, computed } from 'vue'
import { toast } from '@/utils/util'
import { getGeocoderCoordinate } from '@/api/app'
import { apiAddressDetail, apiAddressEdit, apiAddressAdd, apiAddressDel } from '@/api/user'

type FORM = {
    contact: string // 联系方式
    mobile: string | number // 手机号码
    province: string | number // 省
    province_id: string | number // 省
    city: string | number // 市
    city_id: string | number // 市
    district: string | number // 区
    district_id: string | number // 区
    address: string // 详细地址
    is_default: number | boolean // 是否默认
    region: string
}

const formData = ref<FORM>({
    contact: '',
    mobile: '',
    province: '',
    province_id: '',
    city: '',
    city_id: '',
    district: '',
    district_id: '',
    address: '',
    is_default: 0,
    region: ''
})
const formRef = ref()
const addressId = ref<string | number>('')
const delPupop = ref<boolean | null>(false)
const rules = ref<object>({
    contact: [
        { required: true, message: '请输入联系人', trigger: ['change', 'blur'] },
        { min: 1, max: 20, message: '输入长度不得超过20位', trigger: ['blur', 'change'] }
    ],
    mobile: [
        { required: true, message: '请输入手机号码', trigger: ['change', 'blur'] },
        {
            pattern: /^1[3-9]\d{9}$/,
            transform(value: any) {
                return String(value)
            },
            message: '请输入正确的手机号'
        }
    ],
    region: [{ required: true, message: '请选择省市区', trigger: ['change', 'blur'] }],
    address: [{ required: true, message: '请输入门牌号', trigger: ['change', 'blur'] }]
})

// 获取地址详情
const getAddressDetail = async (): Promise<void> => {
    formData.value = await apiAddressDetail({ id: addressId.value })
    formData.value.region = `${formData.value.province} ${formData.value.city} ${formData.value.district}`
}

// 校验
const onSubmit = () => {
    formRef.value.validate((valid: boolean) => {
        if (!valid) return false
        if (!addressId.value) handleAddressAdd()
        else handleAddressEdit()
    })
}
// 添加地址
const handleAddressAdd = async (): Promise<void> => {
    await apiAddressAdd({ ...formData.value })
    setTimeout(() => {
        uni.navigateBack()
    }, 300)
}
// 编辑地址
const handleAddressEdit = async (): Promise<void> => {
    await apiAddressEdit({ ...formData.value })
    setTimeout(() => {
        uni.navigateBack()
    }, 300)
}
// 选择省市区
const chooseLocation = () => {
    uni.chooseLocation({
        success(res) {
            getLocation(res.latitude, res.longitude)
        },
        fail(error) {
            console.log(error)
        }
    })
}

// 逆解析地址
const getLocation = async (latitude: string | number, longitude: string | number) => {
    try {
        const res = await getGeocoderCoordinate({
            location: `${latitude},${longitude}`
        })
        const data = res.result
        handleAddressInfo(data)
    } catch (error) {
        console.log('地址逆解析', error)
    }
}

// 处理接口返回的地址数据
const handleAddressInfo = (event: any) => {
    let city_id = event.ad_info.city_code.substr(3, 6)
    if (city_id == 110000 || city_id == 310000 || city_id == 210000 || city_id == 410000) {
        city_id = city_id * 1
        city_id += 100
    }
    formData.value.city_id = city_id + ''
    formData.value.province_id = formData.value.city_id.substr(0, 3) + '000'
    formData.value.district_id = event.ad_info.adcode
    formData.value.region = `${event.ad_info.province} ${event.ad_info.city} ${event.ad_info.district}`
    formData.value.address = event.address_component.street_number
}

// 删除地址
const handleAddressDel = async (): Promise<void> => {
    try {
        await apiAddressDel({ id: addressId.value })
        setTimeout(() => {
            uni.navigateBack()
        }, 300)
    } catch (error) {
        console.log(error)
    }
}

onLoad((options: { id?: number }) => {
    addressId.value = Number(options.id)
    if (options.id) {
        uni.setNavigationBarTitle({
            title: '编辑地址'
        })
        getAddressDetail()
    } else {
        uni.setNavigationBarTitle({
            title: '添加地址'
        })
        let wxAddress = uni.getStorageSync('wxAddress')

        if (!wxAddress) return
        wxAddress = JSON.parse(wxAddress)
        formData.value.contact = wxAddress.name
        formData.value.mobile = wxAddress.mobile
        getLocation(wxAddress.latitude, wxAddress.longitude)
    }
})

onReady(() => {
    formRef.value?.setRules(rules.value)
})

onUnload(() => {
    uni.removeStorageSync('wxAddress')
})
</script>
<style lang="scss" scoped>
.container {
    padding: 20rpx;

    .card {
        margin-bottom: 20rpx;
        padding: 0 24rpx;
        border-radius: 14rpx;
        background-color: #ffffff;

        .label {
            color: #222222;
            font-size: 28rpx;
            margin-right: 30rpx;
            line-height: 70rpx;
        }
    }

    .is-default {
        image {
            width: 34rpx;
            height: 34rpx;
        }
    }
}
</style>
