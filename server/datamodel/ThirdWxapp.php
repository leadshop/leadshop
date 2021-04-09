<?php
/**
 * @copyright ©2020 浙江禾成云计算有限公司
 * @link: http://www.zjhejiang.com
 * Created by PhpStorm.
 * User: Andy - Wangjie
 * Date: 2021/1/5
 * Time: 11:20
 */

namespace app\datamodel;

use framework\common\CommonModels;

/**
 * This is the model class for table "{{%third_wxapp}}".
 *
 * @property int $id ID
 * @property string $nick_name 公众号名称
 * @property string $type 类型 1小程序 2公众号
 * @property string $token 平台生成的token值
 * @property string $head_img 公众号头像
 * @property int $verify_type_info 授权方认证类型，-1代表未认证，0代表微信认证
 * @property string $user_name 原始ID
 * @property string $qrcode_url 二维码图片的URL
 * @property string $business_info json格式。用以了解以下功能的开通状况（0代表未开通，1代表已开通）： open_store:是否开通微信门店功能 open_scan:是否开通微信扫商品功能 open_pay:是否开通微信支付功能 open_card:是否开通微信卡券功能 open_shake:是否开通微信摇一摇功能
 * @property int $idc idc
 * @property string $principal_name 公众号的主体名称
 * @property string $signature 帐号介绍
 * @property string $func_info json格式。权限集列表，ID为17到19时分别代表： 17.帐号管理权限 18.开发管理权限 19.客服消息管理权限 请注意： 1）该字段的返回不会考虑小程序是否具备该权限集的权限（因为可能部分具备）。
 * @property string $authorizer_appid 公众号appid
 * @property string $authorizer_access_token 授权方接口调用凭据（在授权的公众号或小程序具备API权限时，才有此返回值），也简称为令牌
 * @property int $authorizer_expires refresh有效期
 * @property string $authorizer_refresh_token 接口调用凭据刷新令牌
 * @property string $domain 业务域名
 * @property string $AppID 应用ID
 * @property string $created_time 授权时间
 * @property string $updated_time
 * @property string $deleted_time
 * @property int $is_deleted
 */
class ThirdWxapp extends CommonModels
{
    const id                        = ['bigkey' => 20, 'unique', 'comment' => 'ID'];
    const nick_name                 = ['varchar' => 50, 'default' => '', 'comment' => '公众号名称'];
    const type                      = ['tinyint' => 1, 'notNull', 'default' => 1, 'comment' => '1:小程序 2:公众号'];
    const token                     = ['varchar' => 50, 'notNull', 'default' => '', 'comment' => '平台生成的token值'];
    const head_img                  = ['varchar' => 255, 'notNull', 'default' => '', 'comment' => '公众号头像'];
    const verify_type_info          = ['tinyint' => 1, 'notNull', 'default' => 0, 'comment' => '授权方认证类型，-1代表未认证，0代表微信认证'];
    const user_name                 = ['varchar' => 50, 'notNull', 'default' => '', 'comment' => '原始ID'];
    const qrcode_url                = ['varchar' => 2048, 'notNull', 'default' => '', 'comment' => '二维码图片的URL'];
    const business_info             = ['varchar' => 2048, 'notNull', 'default' => '', 'comment' => 'json格式。用以了解以下功能的开通状况（0代表未开通，1代表已开通）： open_store:是否开通微信门店功能 open_scan:是否开通微信扫商品功能 open_pay:是否开通微信支付功能 open_card:是否开通微信卡券功能 open_shake:是否开通微信摇一摇功能'];
    const idc                       = ['int' => 10, 'notNull', 'default' => 0, 'comment' => 'idc'];
    const principal_name            = ['varchar' => 50, 'notNull', 'default' => '', 'comment' => '公众号的主体名称'];
    const signature                 = ['varchar' => 255, 'notNull', 'default' => '', 'comment' => '帐号介绍'];
    const func_info                 = ['longtext' => 0, 'notNull', 'comment' => 'json格式。权限集列表，ID为17到19时分别代表： 17.帐号管理权限 18.开发管理权限 19.客服消息管理权限 请注意： 1）该字段的返回不会考虑小程序是否具备该权限集的权限（因为可能部分具备）。'];
    const authorizer_appid          = ['varchar' => 50, 'notNull', 'default' => '', 'comment' => '公众号appid'];
    const authorizer_access_token   = ['varchar' => 255, 'notNull', 'default' => '', 'comment' => '授权方接口调用凭据（在授权的公众号或小程序具备API权限时，才有此返回值），也简称为令牌'];
    const authorizer_expires        = ['int' => 10, 'notNull', 'default' => 0, 'comment' => 'refresh有效期'];
    const authorizer_refresh_token  = ['varchar' => 255, 'notNull', 'default' => '', 'comment' => '接口调用凭据刷新令牌'];
    const domain                    = ['longtext' => 0, 'comment' => '业务域名'];
    const AppID                     = ['varchar' => 50, 'notNull', 'default' => 0, 'comment' => '应用ID'];
    const created_time              = ['bigint' => 10, 'comment' => '创建时间'];
    const updated_time              = ['bigint' => 10, 'comment' => '修改时间'];
    const deleted_time              = ['bigint' => 10, 'comment' => '删除时间'];
    const is_deleted                = ['tinyint' => 1, 'default' => 0, 'comment' => '删除状态'];

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['verify_type_info', 'idc', 'authorizer_expires', 'is_deleted', 'type'], 'integer'],
            [['func_info', 'domain', 'AppID'], 'string'],
            [['created_time', 'updated_time', 'deleted_time'], 'safe'],
            [['nick_name', 'token', 'user_name', 'principal_name', 'authorizer_appid'], 'string', 'max' => 45],
            [['head_img', 'signature', 'authorizer_access_token', 'authorizer_refresh_token'], 'string', 'max' => 255],
            [['qrcode_url', 'business_info'], 'string', 'max' => 2048],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'nick_name' => 'Nick Name',
            'token' => 'Token',
            'head_img' => 'Head Img',
            'verify_type_info' => 'Verify Type Info',
            'user_name' => 'User Name',
            'qrcode_url' => 'Qrcode Url',
            'business_info' => 'Business Info',
            'idc' => 'Idc',
            'principal_name' => 'Principal Name',
            'signature' => 'Signature',
            'func_info' => 'Func Info',
            'authorizer_appid' => 'Authorizer Appid',
            'authorizer_access_token' => 'Authorizer Access Token',
            'authorizer_expires' => 'Authorizer Expires',
            'authorizer_refresh_token' => 'Authorizer Refresh Token',
            'created_time' => 'Created At',
            'updated_time' => 'Updated At',
            'deleted_time' => 'Deleted At',
            'is_deleted' => 'Is Delete',
        ];
    }
}
