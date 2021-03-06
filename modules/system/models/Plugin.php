<?php
/**
 * @link https://www.leadshop.vip/
 * @copyright Copyright ©2020-2021 浙江禾成云计算有限公司
 */
namespace system\models;

use framework\common\CommonModels;

class Plugin extends CommonModels
{
    const id      = ['primaryKey' => 10, 'comment' => "ID"];
    const name    = ['string' => 100, 'default' => '100', 'description' => "备注2"];
    const title   = ['string' => 100, 'default' => '1', 'description' => '标题'];
    const status  = ['tinyint' => 1, 'notNull', 'comment' => '0非默认  1默认'];
    const content = ['longtext' => 255, 'description' => '数据内容'];

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
            ['body', 'string'],
            ['title', 'string'],
        ];
    }

    /**
     * @inheritdoc
     */
    public static function tableName()
    {
        return '{{%plugin}}';
    }

}
