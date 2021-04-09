<?php
/**
 * 订单统计
 * @link http://www.heshop.com/
 * @copyright Copyright (c) 2020 HeShop Software LLC
 * @license http://www.heshop.com/license/
 */
namespace statistical\api;

use framework\common\BasicController;

class OrderController extends BasicController
{
    /**
     * 插入记录
     * @param  [type] $event [description]
     * @return [type]        [description]
     */
    public static function save_log($event)
    {
        $data                                  = $event->order_info;
        $check = M('statistical', 'OrderLog')::find()->where(['order_sn' => $data['order_sn']])->one();
        if ($check) {
            $check->setScenario('save');
            $check->setAttributes($data);
            $check->save();
        } else {
            $model = M('statistical', 'OrderLog', true);
            $model->setScenario('save');
            $model->setAttributes($data);
            $model->save();
        }

    }
}
