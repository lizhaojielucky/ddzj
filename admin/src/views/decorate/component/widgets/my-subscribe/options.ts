export default () => ({
    title: '我的预约',
    name: 'my-subscribe',
    content: {
        title: '我的预约',
        data: [
            {
                image: '',
                name: '代支付',
                display: true,
                link: '/pages/order/index?type=1'
            },
            {
                image: '',
                name: '预约中',
                display: true,
                link: '/pages/order/index?type=2'
            },
            {
                image: '',
                name: '服务中',
                display: true,
                link: '/pages/order/index?type=3'
            },
            {
                image: '',
                name: '已完成',
                display: true,
                link: '/pages/order/index?type=4'
            },
            {
                image: '',
                name: '已关闭',
                display: true,
                link: '/pages/order/index?type=5'
            }
        ]
    },
    styles: {}
})
