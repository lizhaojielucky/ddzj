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

namespace app\adminapi\validate\order;


use app\common\enum\OrderEnum;
use app\common\model\order\Order;
use app\common\validate\BaseValidate;

class OrderValidate extends BaseValidate
{
    protected $rule = [
        'id' => 'require|checkId',
        'staff_id' => 'require',
    ];

    protected $message = [
        'id.require' => '参数错误',
        'staff_id.require' => '请选择师傅',
    ];

    public function sceneDetail()
    {
        return $this->only(['id']);
    }

    public function sceneCancel()
    {
        return $this->only(['id'])
            ->append('id','checkCancel');
    }

    public function sceneDel()
    {
        return $this->only(['id'])
            ->append('id','checkDel');
    }

    public function sceneRemark()
    {
        return $this->only(['id']);
    }

    public function sceneRemarkDetail()
    {
        return $this->only(['id']);
    }

    public function sceneVerification()
    {
        return $this->only(['id'])
            ->append('id','checkVerification');
    }

    public function sceneDispatchStaff()
    {
        return $this->only(['id','staff_id'])
            ->append('id','checkDispatchStaff');
    }


    /**
     * @notes 检验订单id
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/11 11:46 上午
     */
    public function checkId($value,$rule,$data)
    {
        $result = Order::where(['id'=>$value])->findOrEmpty();
        if ($result->isEmpty()) {
            return '订单不存在';
        }
        return true;
    }

    /**
     * @notes 检验订单能否取消
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/11 3:08 下午
     */
    public function checkCancel($value,$rule,$data)
    {
        $result = Order::where('id',$value)->findOrEmpty()->toArray();
        if ($result['order_status'] > OrderEnum::ORDER_STATUS_SERVICE) {
            return '订单不允许取消';
        }
        return true;
    }

    /**
     * @notes 检验订单能否删除
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/11 4:19 下午
     */
    public function checkDel($value,$rule,$data)
    {
        $result = Order::where('id',$value)->findOrEmpty()->toArray();
        if ($result['order_status'] != OrderEnum::ORDER_STATUS_CLOSE) {
            return '订单不允许删除';
        }
        return true;
    }

    /**
     * @notes 检验订单能否核销
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/2/11 5:05 下午
     */
    public function checkVerification($value,$rule,$data)
    {
        $result = Order::where('id',$value)->findOrEmpty()->toArray();
        if ($result['order_status'] != OrderEnum::ORDER_STATUS_SERVICE) {
            return '订单不允许核销';
        }
        return true;
    }

    /**
     * @notes 校验订单指派师傅
     * @param $value
     * @param $rule
     * @param $data
     * @return bool|string
     * @author ljj
     * @date 2022/8/29 5:19 下午
     */
    public function checkDispatchStaff($value,$rule,$data)
    {
        $result = Order::where('id',$value)->findOrEmpty()->toArray();
        if ($result['order_status'] != OrderEnum::ORDER_STATUS_APPOINT) {
            return '订单不允许指派师傅';
        }
        return true;
    }
}
