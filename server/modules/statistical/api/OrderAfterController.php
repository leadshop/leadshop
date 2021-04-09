<?php
/**
 * 订单统计
 * @link http://www.heshop.com/
 * @copyright Copyright (c) 2020 HeShop Software LLC
 * @license http://www.heshop.com/license/
 */
namespace statistical\api;

use framework\common\BasicController;

class OrderAfterController extends BasicController
{
    /**
     * 插入记录
     * @param  [type] $event [description]
     * @return [type]        [description]
     */
    public static function save_log($event)
    {
        $info = $event->order_after_info;
        $check = M('statistical', 'OrderAfterLog')::find()->where(['order_goods_id' => $info['order_goods_id']])->one();
        if ($check) {
            $check->setScenario('save');
            $check->setAttributes($info);
            $check->save();
        } else {
            unset($info['status']);
            $model = M('statistical', 'OrderAfterLog', true);
            $model->setScenario('save');
            $model->setAttributes($info);
            $model->save();
        }

    }
}
