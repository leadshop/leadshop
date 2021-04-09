<?php
/**
 * 设置管理
 * @link http://www.heshop.com/
 * @copyright Copyright (c) 2020 HeShop Software LLC
 * @license http://www.heshop.com/license/
 */
namespace sms\app;

use framework\common\BasicController;
use Overtrue\EasySms\Message;
use Yii;

class IndexController extends BasicController
{
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        unset($actions['update']);
        return $actions;
    }

    /**
     * 创建购物车
     * @return [type] [description]
     */
    public function actionCreate()
    {
        $post = Yii::$app->request->post();

        $mobile = $post['mobile'] ?? '';
        $time   = time() - 60;
        $check  = M('sms', 'SmsLog')::find()->where(['and', ['mobile' => $mobile, 'type' => 1], ['>=', 'created_time', $time]])->one();
        if ($check) {
            Error('发送过于频繁');
        }

        $post['code']       = $this->getCode();
        $post['valid_time'] = 600;
        $post['AppID']      = Yii::$app->params['AppID'];

        $transaction = Yii::$app->db->beginTransaction(); //启动数据库事务
        $model       = M('sms', 'SmsLog', true);
        $model->setScenario('create');
        $model->setAttributes($post);
        if ($model->validate()) {
            if ($model->save()) {
                $template = Yii::$app->params['appSms']['aliyun']['template'];
                $res = Yii::$app->sms->module('industry')->send($post['mobile'], new Message([
                    'template' => $template,
                    'data'     => [
                        'code' => $post['code'],
                    ],
                ]));
                if ($res) {
                    $transaction->commit(); //事务执行
                    return true;
                } else {
                    $transaction->rollBack(); //事务回滚
                    Error('发送失败');
                }

            } else {
                Error('操作失败');
            }
        }

        // return $model;

        // return $post;

    }

    public function getCode($length = 6)
    {

        $key     = '';
        $pattern = '1234567890';
        for ($i = 0; $i < $length; $i++) {
            $key .= $pattern[mt_rand(0, 9)];
        }

        return $key;
    }

}
