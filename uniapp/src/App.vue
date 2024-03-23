<script setup lang="ts">
import { onLaunch } from '@dcloudio/uni-app'
import { useAppStore } from './stores/app'
import { useUserStore } from './stores/user'
import { apiIndexVisit } from '@/api/app'
import { getClient } from '@/utils/client'

const appStore = useAppStore()
const { getUser } = useUserStore()

onLaunch(async () => {
    await appStore.getConfig()
    appStore.getLocationFunc()
    appStore.getSystemInfo()
    // #ifdef H5
    // const { status, page_status, page_url } = appStore.getH5Config
    // if (status == 0) {
    // 	if (page_status == 1) return (location.href = page_url)
    // 	uni.reLaunch({ url: '/pages/empty/empty' })
    // }
    // #endif
    await getUser()
    await apiIndexVisit({
        terminal: getClient()
    })
})
</script>
<style lang="scss">
//
</style>
