<?php
/**
 * @copyright ©2020 浙江禾成云计算有限公司
 * @link: http://www.zjhejiang.com
 * Created by PhpStorm.
 * User: Andy - Wangjie
 * Date: 2021/1/4
 * Time: 17:55
 */

namespace app\datamodel;

use framework\common\CommonModels;

/**
 * This is the model class for table "{{%wechat_platform}}".
 *
 * @property int $id
 * @property string $appid 第三方平台应用appid
 * @property string $appsecret 第三方平台应用appsecret
 * @property string $token 第三方平台应用token（消息校验Token）
 * @property string $encoding_aes_key 第三方平台应用Key（消息加解密Key）
 * @property string $component_access_token
 * @property int $token_expires token过期时间
 * @property int $type 授权类型  1：公众号  2：小程序  3：公众号/小程序同时展现
 * @property string $third_appid 第三方平台绑定的应用appid
 * @property string $created_time
 * @property string $updated_time
 */
class WechatPlatform extends CommonModels
{
    const id                        = ['bigkey' => 20, 'unique', 'comment' => 'ID'];
    const appid                     = ['varchar' => 128, 'notNull', 'comment' => '第三方平台应用appid'];
    const appsecret                 = ['varchar' => 255, 'notNull', 'comment' => '第三方平台应用appsecret'];
    const token                     = ['varchar' => 255, 'notNull', 'comment' => '第三方平台应用token（消息校验Token）'];
    const encoding_aes_key          = ['varchar' => 512, 'notNull', 'comment' => 'encoding_aes_key'];
    const component_access_token    = ['varchar' => 255, 'notNull', 'default' => '', 'comment' => 'component_access_token'];
    const token_expires             = ['int' => 11, 'notNull', 'default' => 0, 'comment' => 'token过期时间'];
    const type                      = ['tinyint' => 1, 'notNull', 'default' => 2, 'comment' => '授权类型1：公众号2：小程序3：公众号/小程序同时展现'];
    const third_appid               = ['varchar' => 128, 'notNull', 'default' => '', 'comment' => '第三方平台绑定的应用appid'];
    const created_time              = ['bigint' => 10, 'comment' => '创建时间'];
    const updated_time              = ['bigint' => 10, 'comment' => '修改时间'];
    const deleted_time              = ['bigint' => 10, 'comment' => '删除时间'];
    const is_deleted                = ['tinyint' => 1, 'default' => 0, 'comment' => '删除状态'];

    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return '{{%wechat_platform}}';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['appid', 'appsecret', 'token', 'encoding_aes_key', 'third_appid', 'created_time', 'updated_time'], 'required'],
            [['token_expires', 'type'], 'integer'],
            [['created_time', 'updated_time'], 'safe'],
            [['appid', 'third_appid'], 'string', 'max' => 128],
            [['appsecret', 'token', 'component_access_token'], 'string', 'max' => 255],
            [['encoding_aes_key'], 'string', 'max' => 512],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'appid' => 'Appid',
            'appsecret' => 'Appsecret',
            'token' => 'Token',
            'encoding_aes_key' => 'Encoding Aes Key',
            'component_access_token' => 'Component Access Token',
            'token_expires' => 'Token Expires',
            'type' => 'Type',
            'third_appid' => 'Third Appid',
            'created_time' => 'Created At',
            'updated_time' => 'Updated At',
        ];
    }

    public static function getPlatform($type = 2)
    {
        $platform = self::find()->where([
            'type' => $type,
        ])->one();
        if (!$platform || !$platform->appid || !$platform->appsecret || !$platform->encoding_aes_key || !$platform->token) {
            throw new \Exception('平台尚未配置');
        }
        if ($platform && $platform->token_expires < time()) {
            try {
                $service = load_wechat('Service', [
                    'component_appid'          => $platform->appid,
                    'component_appsecret'      => $platform->appsecret,
                    'component_encodingaeskey' => $platform->encoding_aes_key,
                    'component_token'          => $platform->token,
                ]);
                if ($platform->token_expires < time()) {
                    $token = $service->getComponentAccessToken();
                    if ($token) {
                        $platform->component_access_token = $token;
                        $platform->token_expires = time() + 5800;
                        if (!$platform->save()) {
                            \Yii::error('更新open3rdtoken失败,保存失败!');
                        }
                    } else {
                        \Yii::error('更新open3rdtoken失败:::' . $service->errMsg . 'code:'. $service->errCode);
                    }
                }
            } catch (\Exception $exception) {
                \Yii::error('更新open3rdtoken失败' . $exception->getMessage());
                return $platform;
            }
        }
        return $platform;
    }
}
