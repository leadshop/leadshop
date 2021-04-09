<?php
/**
 * 订单模型
 * @link http://www.heshop.com/
 * @copyright Copyright (c) 2020 HeShop Software LLC
 * @license http://www.heshop.com/license/
 */

namespace statistical\models;

use framework\common\CommonModels;

class OrderLog extends CommonModels
{
    const id               = ['bigkey' => 20, 'unique', 'comment' => 'ID'];
    const order_sn         = ['varchar' => 50, 'notNull', 'comment' => '订单号'];
    const UID              = ['bigint' => 20, 'notNull', 'comment' => '买家ID'];
    const total_amount     = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '总计价格'];
    const pay_amount       = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '实际支付'];
    const goods_amount     = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '商品金额'];
    const goods_reduced    = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '商品减少'];
    const freight_amount   = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '物流金额'];
    const freight_reduced  = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '物流减少'];
    const promotion_amount = ['decimal' => '10,2', 'notNull', 'default' => 0, 'comment' => '促销活动优惠金额'];
    const status           = ['smallint' => 3, 'notNull', 'default' => 100, 'comment' => '100待付款  101用户取消 102超时取消 103商户取消  201已付款(待发货)  202已发货(待收货)  203已收货 204已完成'];
    const after_sales      = ['tinyint' => 1, 'notNull', 'default' => 0, 'comment' => '0正常  1售后中'];
    const source           = ['varchar' => 50, 'notNull', 'comment' => '来源'];
    const pay_type         = ['varchar' => 20, 'comment' => 'wechat微信  alipay支付宝'];
    const AppID            = ['varchar' => 50, 'notNull', 'comment' => '应用ID'];
    const merchant_id      = ['bigint' => 10, 'notNull', 'comment' => '商户ID'];
    const created_time     = ['bigint' => 10, 'comment' => '创建时间'];
    const updated_time     = ['bigint' => 10, 'comment' => '修改时间'];
    const deleted_time     = ['bigint' => 10, 'comment' => '删除时间'];
    const is_deleted       = ['tinyint' => 1, 'default' => 0, 'comment' => '删除状态'];

    /**
     * 实现数据验证
     * 需要数据写入，必须在rules添加对应规则
     * 在控制中执行[模型]->attributes = $postData;
     * 否则会导致验证不生效，并且写入数据为空
     * @return [type] [description]
     */
    public function rules()
    {
        return [
            //创建订单
            [['order_sn', 'UID', 'total_amount', 'pay_amount', 'goods_amount', 'merchant_id', 'AppID', 'source','status'], 'required', 'message' => '{attribute}不能为空'],
            [['UID', 'merchant_id'], 'integer', 'message' => '{attribute}必须是整数'],
            [['total_amount', 'pay_amount', 'goods_amount', 'goods_reduced', 'freight_amount', 'freight_reduced', 'promotion_amount'], 'number', 'message' => '{attribute}必须是数字'],

        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%statistical_order_log}}';
    }

    /**
     * 增加额外属性
     * @return [type] [description]
     */
    public function attributes()
    {
        $attributes = parent::attributes();
        return $attributes;
    }

    /**
     * 场景处理
     * @return [type] [description]
     */
    public function scenarios()
    {
        $scenarios           = parent::scenarios();
        $scenarios['save'] = ['order_sn', 'UID', 'total_amount', 'pay_amount', 'goods_amount', 'goods_reduced', 'freight_amount', 'freight_reduced', 'promotion_amount', 'merchant_id', 'source', 'AppID', 'pay_type','status'];

        return $scenarios;
    }

    /**
     * @inheritdoc
     */
    public function attributeLabels()
    {
        return [
            'order_sn'         => '订单编号',
            'UID'              => '用户ID',
            'total_amount'     => '总计价格',
            'pay_amount'       => '实付价格',
            'goods_amount'     => '商品价格',
            'goods_reduced'    => '商品减少金额',
            'freight_amount'   => '运费',
            'freight_reduced'  => '运费减少金额',
            'promotion_amount' => '活动优惠',
            'pay_type'         => '支付类型',
            'AppID'            => '应用ID',
            'merchant_id'      => '商户ID',
            'source'           => '来源',
        ];
    }

}
