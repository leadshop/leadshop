<?php
/**
 * @link http://www.heshop.com/
 * @copyright Copyright (c) 2020 HeShop Software LLC
 * @license http://www.heshop.com/license/
 */

namespace leadmall;

use framework\common\BasicModule;

/**
 * v2 module definition class
 */
class Module extends BasicModule
{
    /**
     * @inheritdoc
     */
    public $controllerNamespace = 'leadmall';

    /**
     * @inheritdoc
     */
    public function init()
    {
        parent::init();
    }

    public function eventList()
    {
        $this->on('check_order', ["\order\api\IndexController", 'check_order']); //订单检测
        $this->on('check_evaluate', ["\order\api\EvaluateController", 'check_evaluate']); //评价检测

        $this->on('visit', ["\statistical\api\VisitController", 'save_log']); //访客

        $this->on('user_upload', ["\statistical\api\UploadController", 'save_log']); //用户上传文件

        $this->on('user_statistical', ["\users\app\IndexController", 'statistical']); //用户统计

        $this->on('visit_goods', ["\statistical\api\GoodsVisitController", 'save_log']); //浏览商品记录

        $this->on('add_order', ["\goods\app\IndexController", 'reduce_stocks']); //下单商品减库存
        $this->on('add_order', ["\cart\app\IndexController", 'cart_clear']); //下单清空对应购物车商品

        $this->on('cancel_order', ["\goods\app\IndexController", 'add_stocks']); //取消订单返还库存

        $this->on('pay_order', ["\goods\app\IndexController", 'add_sales']); //付款增加商品销售额

    }
}
