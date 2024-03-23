<?php
// +----------------------------------------------------------------------
// | likeshop开源商城系统
// +----------------------------------------------------------------------
// | 欢迎阅读学习系统程序代码，建议反馈是我们前进的动力
// | gitee下载：https://gitee.com/likeshop_gitee
// | github下载：https://github.com/likeshop-github
// | 访问官网：https://www.likeshop.cn
// | 访问社区：https://home.likeshop.cn
// | 访问手册：http://doc.likeshop.cn
// | 微信公众号：likeshop技术社区
// | likeshop系列产品在gitee、github等公开渠道开源版本可免费商用，未经许可不能去除前后端官方版权标识
// |  likeshop系列产品收费版本务必购买商业授权，购买去版权授权后，方可去除前后端官方版权标识
// | 禁止对系统程序代码以任何目的，任何形式的再发布
// | likeshop团队版权所有并拥有最终解释权
// +----------------------------------------------------------------------
// | author: likeshop.cn.team
// +----------------------------------------------------------------------

namespace app\adminapi\logic\order;


use app\common\enum\notice\NoticeEnum;
use app\common\enum\OrderEnum;
use app\common\enum\OrderLogEnum;
use app\common\enum\OrderRefundEnum;
use app\common\enum\PayEnum;
use app\common\enum\YesNoEnum;
use app\common\logic\BaseLogic;
use app\common\logic\OrderLogLogic;
use app\common\logic\RefundLogic;
use app\common\model\order\Order;
use app\common\model\staff\Staff;
use think\facade\Db;

class OrderLogic extends BaseLogic
{
    /**
     * @notes 订单详情
     * @param $id
     * @return array
     * @author ljj
     * @date 2022/2/11 3:01 下午
     */
    public function detail($id)
    {
        $result = Order::where(['id'=>$id])
            ->field('id,sn,user_id,staff_id,order_status,pay_status,pay_way,pay_time,user_remark,order_remarks,verification_code,verification_status,contact,mobile,province_id,city_id,district_id,address,create_time,appoint_time_start,appoint_time_end,finish_time,is_dispatch')
            ->append(['appoint_time','appoint_week','door_time','pay_status_desc','order_status_desc','pay_way_desc','verification_status_desc','cancel_btn','verification_btn','user','staff','province','city','district'])
            ->with(['order_goods' => function($query){
                $query->field('goods_id,order_id,goods_snap,goods_name,goods_price,unit_name,goods_num,total_pay_price')->append(['goods_image'])->hidden(['goods_snap']);
            },'order_log' => function($query){
                $query->field('id,order_id,type,channel,operator_id,create_time')->append(['channel_desc','operator']);
            }])
            ->findOrEmpty()
            ->toArray();

        if ($result['order_status'] == OrderEnum::ORDER_STATUS_SERVICE) {
            $result['cancel_btn'] = 1;
        }

        return $result;
    }

    /**
     * @notes 取消订单
     * @param $params
     * @return bool|string
     * @author ljj
     * @date 2022/2/11 4:10 下午
     */
    public function cancel($params)
    {
        // 启动事务
        Db::startTrans();
        try {
            //更新订单状态
            Order::update([
                'order_status' => OrderEnum::ORDER_STATUS_CLOSE,
                'cancel_time' => time(),
            ],['id'=>$params['id']]);

            //TODO 已支付订单原路退回金额
            $order = Order::where('id',$params['id'])->findOrEmpty()->toArray();
            if($order['pay_status'] == PayEnum::ISPAID) {
                (new RefundLogic())->refund($order,$order['order_amount'],OrderRefundEnum::TYPE_ADMIN,$params['admin_id']);
            }

            //添加订单日志
            (new OrderLogLogic())->record(OrderLogEnum::TYPE_ADMIN,OrderLogEnum::SHOP_CANCEL_ORDER,$params['id'],$params['admin_id']);

            // 提交事务
            Db::commit();
            return true;
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            return $e->getMessage();
        }
    }

    /**
     * @notes 删除订单
     * @param $params
     * @author ljj
     * @date 2022/2/11 4:27 下午
     */
    public function del($params)
    {
        Order::destroy($params['id']);
        return true;
    }

    /**
     * @notes 商家备注
     * @param $params
     * @return bool
     * @author ljj
     * @date 2022/2/11 4:45 下午
     */
    public function remark($params)
    {
        Order::update(['order_remarks'=>$params['remark'] ?? ''],['id'=>$params['id']]);
        return true;
    }

    /**
     * @notes 商家备注详情
     * @param $id
     * @return array
     * @author ljj
     * @date 2022/2/11 4:56 下午
     */
    public function remarkDetail($id)
    {
        return Order::where('id',$id)->field('order_remarks')->findOrEmpty()->toArray();
    }

    /**
     * @notes 核销订单
     * @param $params
     * @return bool|string
     * @author ljj
     * @date 2022/2/11 5:03 下午
     */
    public function verification($params)
    {
        // 启动事务
        Db::startTrans();
        try {
            //更新订单状态
            Order::update([
                'order_status' => OrderEnum::ORDER_STATUS_FINISH,
                'verification_status' => OrderEnum::VERIFICATION,
                'finish_time' => time(),
            ],['id'=>$params['id']]);

            //添加订单日志
            (new OrderLogLogic())->record(OrderLogEnum::TYPE_ADMIN,OrderLogEnum::SHOP_VERIFICATION,$params['id'],$params['admin_id']);

            $order = Order::where('id',$params['id'])->findOrEmpty()->toArray();

            // 订单完成通知 - 通知买家
            event('Notice', [
                'scene_id' =>  NoticeEnum::ORDER_FINISH_NOTICE,
                'params' => [
                    'user_id' => $order['user_id'],
                    'order_id' => $order['id']
                ]
            ]);

            // 提交事务
            Db::commit();
            return true;
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            return $e->getMessage();
        }
    }


    /**
     * @notes 指派师傅
     * @param $params
     * @return bool|string
     * @author ljj
     * @date 2022/8/29 5:26 下午
     */
    public function dispatchStaff($params)
    {
        // 启动事务
        Db::startTrans();
        try {
            $order = Order::where('id',$params['id'])->findOrEmpty()->toArray();

            //为订单指派师傅
            Order::update(['staff_id'=>$params['staff_id'],'is_dispatch'=>OrderEnum::DISPATCH_YES],['id'=>$params['id']]);

            //添加订单日志
            (new OrderLogLogic())->record(OrderLogEnum::TYPE_ADMIN,OrderLogEnum::SHOP_DISPATCH_STAFF,$params['id'],$params['admin_id']);

            // 订单待确认服务通知 - 通知师傅
            event('Notice', [
                'scene_id' =>  NoticeEnum::ORDER_WAIT_CONFIRM_NOTICE_STAFF,
                'params' => [
                    'order_id' => $params['id'],
                    'staff_id' => $params['staff_id'],
                ]
            ]);

            if ($order['staff_id'] > 0 && $order['staff_id'] != $params['staff_id']) {
                // 平台取消派单通知 - 通知师傅
                event('Notice', [
                    'scene_id' =>  NoticeEnum::ORDER_CANCEL_DISPATCH_NOTICE_STAFF,
                    'params' => [
                        'order_id' => $params['id'],
                        'staff_id' => $order['staff_id'],
                    ]
                ]);
            }

            // 提交事务
            Db::commit();
            return true;
        } catch (\Exception $e) {
            // 回滚事务
            Db::rollback();
            return $e->getMessage();
        }
    }

    /**
     * @notes 师傅列表
     * @param $params
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     * @author ljj
     * @date 2022/8/29 6:10 下午
     */
    public function staffLists($params)
    {
        $where[] = ['status','=',YesNoEnum::YES];
        if(isset($params['name']) && $params['name']) {
            $where[] = ['name','like','%'.$params['name'].'%'];
        }
        if (isset($params['region_id']) && $params['region_id']) {
            $where[] = ['province_id|city_id|district_id','=',$params['region_id']];
        }

        $lists = Staff::where($where)
            ->field('id,name,user_id')
            ->with('user')
            ->order('id desc')
            ->select()
            ->toArray();

        return $lists;
    }
}