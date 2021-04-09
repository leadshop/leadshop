<?php
namespace leadmall;

use framework\common\BasicEvent;

/**
 * 事件处理器
 */
class Event extends BasicEvent
{
    public $param              = [];
    public $user_upload        = [];
    public $user_statistical   = []; //用户统计信息
    public $visit_goods_info   = null; //商品信息,用于添加商品访问记录
    public $visit_info         = null; //访问用户信息
    public $order_goods        = []; //订单商品,用于修改库存和清空购物车
    public $cancel_order_goods = []; //取消订单商品,用于库存返还
    public $order_info         = []; //订单详情,用于插入有效订单记录
    public $order_after_info   = []; //售后订单详情,用于插入售后订单记录
}
