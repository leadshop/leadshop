<?php
/**
 * @copyright ©2020 浙江禾成云计算有限公司
 * @link      : http://www.zjhejiang.com
 * Created by PhpStorm.
 * User: Andy - Wangjie
 * Date: 2021/1/27
 * Time: 9:41
 */

namespace users\app;

use framework\common\BasicController;
use sizeg\jwt\Jwt;
use users\models\LoginUserInfo;
use users\models\Oauth;
use users\models\User;
use yii\helpers\ArrayHelper;

/**
 * Class LoginController
 * @package users\app
 */
abstract class LoginController extends BasicController
{
    /**
     * @return LoginUserInfo
     */
    abstract protected function getUserInfo();

    public function actionCreateorupdate()
    {
        $t        = \Yii::$app->db->beginTransaction();
        $userInfo = $this->getUserInfo();
        $user = User::find()->alias('u')->joinWith(['oauth as o'])->where([
            'u.AppID'      => \Yii::$app->params['AppID'],
            'u.is_deleted' => 0,
            'o.oauthID'    => $userInfo->openId,
        ])->one();
        if (!$user) {
            $user               = new User();
            $user->created_time = time();
            $user->updated_time = time();
        }
        if (!$user->oauth) {
            $oauth = new Oauth();
        } else {
            $oauth = $user->oauth;
        }
        $user->nickname = $userInfo->nickname;
        $user->avatar   = $userInfo->avatar;
        $user->gender   = $userInfo->gender;
        $user->AppID    = \Yii::$app->params['AppID'];
        if (!$user->save()) {
            Error($user->getFirstErrors());
        }
        $oauth->oauthID = $userInfo->openId;
        $oauth->UID     = $user->id;
        $oauth->unionID = $userInfo->unionId;
        $oauth->type    = \Yii::$app->params['AppType'];
        $oauth->format  = to_json($userInfo);
        if (!$oauth->save()) {
            Error($oauth->getFirstErrors());
        }
        $t->commit();
        $res          = ArrayHelper::toArray($user);
        $res['token'] = $this->getToken($user->id);
        return $res;
    }

    protected function getAppId()
    {
        if (!isset(\Yii::$app->params['AppType']) || empty(\Yii::$app->params['AppType'])) {
            Error('未知来源');
        }
        //来源
        $appType = \Yii::$app->params['AppType'];
        if (!isset(\Yii::$app->params['apply'][$appType]) || empty(\Yii::$app->params['apply'][$appType])) {
            Error('未知渠道');
        }
        $apply = \Yii::$app->params['apply'][$appType];
        if (!isset($apply['AppID']) || empty($apply['AppID'])) {
            Error('未知AppID');
        }
        return $apply['AppID'];
    }

    /**
     * 获取Token信息
     * @param  string $id [description]
     * @return [type]      [description]
     */
    public function getToken($id = '')
    {
        /** @var Jwt $jwt */
        $jwt    = \Yii::$app->jwt;
        $signer = $jwt->getSigner('HS256');
        $key    = $jwt->getKey();
        $time   = time();
        // Adoption for lcobucci/jwt ^4.0 version
        $token = $jwt->getBuilder()
            ->issuedBy('http://www.heshop.com') // Configures the issuer (iss claim)
            ->permittedFor('http://mail.heshop.com') // Configures the audience (aud claim)
            ->identifiedBy('jub4q3yrgto', true) // Configures the id (jti claim), replicating as a header item
            ->issuedAt($time) // Configures the time that the token was issue (iat claim)
            ->expiresAt($time + 3600) // Configures the expiration time of the token (exp claim)
            ->withClaim('id', $id) // Configures a new claim, called "id"
            ->getToken($signer, $key); // Retrieves the generated token
        return (string) $token;
    }
}
