// 页面模式
export enum PageMode {
    'ADD' = 'add', // 添加
    'EDIT' = 'edit' // 编辑
}

export enum ServiceMode {
    'all_count' = '全部', //	int	全部
    'SHELVE' = '销售中', //销售中
    'UNSHELVE' = '仓库中' //仓库中
}

export enum OrderMode {
    'all_count' = '全部', //	int	全部
    'wait_pay_count' = '待支付', //	int	待支付
    'appoint_count' = '预约中', //	int	预约中
    'service_count' = '服务中', //	int	服务中
    'finish_count' = '已完成', //	int	已完成
    'close_count' = '已关闭' //	int	已关闭
}

export enum RefundMode {
    'all_count' = '全部',
    'refund_wait_count' = '退款中',
    'refund_success_count' = '退款成功',
    'refund_fail_count' = '退款失败'
}
