<?php
/**
 * @copyright ©2020 浙江禾成云计算有限公司
 * @link      : http://www.zjhejiang.com
 * Created by PhpStorm.
 * User: Andy - Wangjie
 * Date: 2021/1/29
 * Time: 10:45
 */

namespace app\datamodel;


use framework\common\CommonModels;

/**
 * This is the model class for table "{{%option}}".
 *
 * @property int $id
 * @property int $AppID
 * @property string $group
 * @property string $name
 * @property string $value
 * @property int $merchant_id
 * @property string $created_time
 * @property string $updated_time
 * @property string $deleted_time
 * @property string $is_deleted
 */
class Option extends CommonModels
{
    const GROUP_ADMIN = 'qmpaas';
    const GROUP_INDUSTRY = 'industry';

    const NAME_SMS = 'sms';//短信配置
    const REGISTER = 'register'; //注册配置
    const PAY_SETTING = 'pay'; //支付配置
    const BASIC_SETTING = 'basic'; //基础配置
    const COPYRIGHT_SETTING = 'copyright'; //版权设置

    const id                        = ['bigkey' => 20, 'unique', 'comment' => 'ID'];
    const AppID                     = ['varchar' => 50, 'notNull', 'comment' => 'AppID'];
    const group                     = ['varchar' => 255, 'notNull', 'comment' => '分组'];
    const name                      = ['varchar' => 255, 'notNull', 'comment' => '名称'];
    const value                     = ['longtext' => 0, 'notNull', 'comment' => '数据json'];
    const merchant_id               = ['bigint' => 10, 'notNull', 'comment' => '商户ID'];
    const created_time              = ['bigint' => 10, 'comment' => '创建时间'];
    const updated_time              = ['bigint' => 10, 'comment' => '修改时间'];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%option}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['AppID', 'name', 'value'], 'required'],
            [['created_time', 'updated_time'], 'safe'],
            [['merchant_id'], 'integer'],
            [['AppID', 'value'], 'string'],
            [['group', 'name'], 'string', 'max' => 255],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'AppID' => 'AppID',
            'group' => 'Group',
            'name' => 'Name',
            'value' => 'Value',
            'merchant_id' => '商户ID',
            'created_at' => 'Created At',
            'updated_at' => 'Updated At',
        ];
    }
}
