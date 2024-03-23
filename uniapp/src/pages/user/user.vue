<template>
    <view class="user">
        <view class="flex justify-between user--info">
            <!-- 用户头像 -->
            <u-image
                @click="goPage('/bundle/pages/user_profile/index')"
                :src="userInfo?.avatar || config.default_avatar"
                width="100"
                height="100"
                border-radius="50"
            >
            </u-image>
            <!-- 用户名字 -->
            <view
                class="user-name flex-1 ml-[20rpx] mt-[25rpx]"
                @click="goPage('/bundle/pages/user_profile/index')"
            >
                {{ userInfo?.nickname || '未登录' }}
            </view>
            <!-- 设置 -->
            <u-icon
                name="setting"
                color="#fff"
                size="44"
                @click="goPage('/pages/user_set/user_set')"
            ></u-icon>
        </view>

        <view v-for="(item, index) in userInfo.decorate_page" :key="index">
            <template v-if="item.name == 'my-subscribe'">
                <userSubscribe :content="item.content" :userInfo="userInfo" :styles="item.styles" />
            </template>
            <template v-if="item.name == 'my-service'">
                <userService :content="item.content" :styles="item.styles" />
            </template>
            <template v-if="item.name == 'user-banner'">
                <w-user-banner :content="item.content" :styles="item.styles" />
            </template>
        </view>
    </view>
    <!-- 底部导航栏 -->
    <Tabbar />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { useUserStore } from '@/stores/user'
import { onLoad, onShow } from '@dcloudio/uni-app'
import Tabbar from '@/components/tabbar/index.vue'
import userService from '@/components/widgets/my-service/my-service.vue'
import userSubscribe from '@/components/widgets/my-subscribe/my-subscribe.vue'

/** Data Start **/
const appStore = useAppStore()
const userStore = useUserStore()
let userInfo = ref<any>({
    nickname: '',
    is_staff: 0,
    avatar: '',
    mobile: '',
    service_num: 0,
    wait_pay_num: 0,
    staff_wait_num: 0,
    finish_num: 0,
    appoint_num: 0,
    decorate_page: []
})

userInfo = computed(() => userStore.userInfo)
const config = computed(() => appStore.config)

const initUserInfoFunc = async (): Promise<void> => {
    await userStore.getUser()
    userInfo.value = userStore.userInfo
    console.log(userInfo.value)
}

const toOrderLists = (type: number) => {
    uni.reLaunch({ url: `/pages/order/index?type=${type}` })
}

// 跳转页面
const goPage = (url: any) => {
    uni.navigateTo({ url: url })
}

onShow(() => {
    initUserInfoFunc()
})
</script>

<style lang="scss">
.user {
    // padding: 0 20rpx;
    padding-bottom: 100rpx;
    background: linear-gradient(to bottom, #f36161 260rpx, transparent 0);

    .card {
        border-radius: 14rpx;
        background-color: #ffffff;
    }

    // 用户信息
    &--info {
        padding: 50rpx 20rpx 24rpx;

        .user-name {
            color: #ffffff;
            font-size: 36rpx;
            font-weight: 500;
        }
    }

    // 订单信息
    .order-info {
        padding: 30rpx 24rpx;

        &--header {
            padding-bottom: 30rpx;
            border-bottom: 1px solid #e5e5e5;

            .title {
                color: #222222;
                font-size: 32rpx;
                font-weight: 500;
            }
        }

        &--main {
            padding-top: 30rpx;

            .order-menu-item {
                flex: auto;
                text-align: center;
                position: relative;

                image {
                    width: 60rpx;
                    height: 60rpx;
                }

                &--text {
                    color: #222222;
                    font-size: 26rpx;
                }
            }
        }
    }

    // 服务导航
    .service-nav {
        padding: 0 24rpx;

        &--item:last-child {
            border-bottom: 0;
        }

        &--item {
            padding: 26rpx 0;
            position: relative;
            border-bottom: 1px solid #e5e5e5;

            &--left {
                text,
                .name {
                    margin-left: 20rpx;
                    color: #222222;
                    font-size: 30rpx;
                }

                .name {
                    width: 190rpx;
                    position: relative;
                }

                image {
                    width: 48rpx;
                    height: 48rpx;
                }
            }
        }
    }

    // 徽章
    .badge {
        width: 30rpx;
        height: 30rpx;
        text-align: center;
        line-height: 30rpx;
        top: -10rpx;
        right: 30rpx;
        color: #ffffff !important;
        border-radius: 50%;
        position: absolute;
        font-size: 22rpx !important;
        background-color: #f36161;
    }
}
</style>
