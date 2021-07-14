<?php
/**
 * @Author: qinuoyun
 * @Date:   2020-08-20 13:46:09
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-05-26 14:32:05
 */
namespace framework\common;

use Yii;

class AccessToken
{

    /**
     * 获取Token信息
     * 超时时间:21600
     * 单位是秒
     * @param  string $id [description]
     * @return [type]      [description]
     */
    public static function getToken($id = '', $type = 1)
    {
        /** @var Jwt $jwt */
        $jwt    = Yii::$app->jwt;
        $signer = $jwt->getSigner('HS256');
        $key    = $jwt->getKey();
        $time   = time();
        $host   = Yii::$app->request->hostInfo;

        if ($type == 1) {
            $origin     = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
            $expiration = isset(Yii::$app->params['expiration']) ? Yii::$app->params['expiration'] : 3600;
            $expiration = 86400;
        } else {
            $origin     = "refresh";
            $expiration = 2592000;
        }
        // Adoption for lcobucci/jwt ^4.0 version
        $token = $jwt->getBuilder()
            ->issuedBy($host) // Configures the issuer (iss claim)
            ->permittedFor($origin) // Configures the audience (aud claim)
            ->identifiedBy(Yii::$app->params['AppID'] ? Yii::$app->params['AppID'] : '', true) // Configures the id (jti claim), replicating as a header item
            ->issuedAt($time) // Configures the time that the token was issue (iat claim)
            ->expiresAt($time + (int) $expiration) // Configures the expiration time of the token (exp claim)
            ->withClaim('id', $id) // Configures a new claim, called "id"
            ->getToken($signer, $key); // Retrieves the generated token
        return (string) $token;
    }

    /**
     * Token验证处理
     * @param  [type] $token [description]
     * @param  [type] $type  [description]
     * @return [type]        [description]
     */
    public static function accessToken($token)
    {
        $token = Yii::$app->jwt->getParser()->parse((string) $token);
        $data  = Yii::$app->jwt->getValidationData();
        $AppID = Yii::$app->params['AppID'] ? Yii::$app->params['AppID'] : '';
        $host  = Yii::$app->request->hostInfo;
        $data->setIssuer($host);
        $data->setId($AppID);
        $data->setCurrentTime(time());
        if ($token->validate($data)) {
            $id = $token->getClaim('id');
            if ($id) {
                return $token;
            } else {
                throw new TokenHttpException('Token Parsing Failed', 401);
            }
        } else {
            if ($token->getClaim('jti') !== $AppID) {
                throw new TokenHttpException('Token Validation Failure', 401);
            } else {
                throw new TokenHttpException('Token validation timeout', 401);
            }
        }
    }

    /**
     * 重置Token
     * @param  string $token [description]
     * @return [type]        [description]
     */
    public static function resetToken($token = '')
    {
        $object = self::accessToken($token);
        if ($object->getClaim('aud') == 'refresh') {
            return $object;
        } else {
            throw new TokenHttpException('RefreshToken Parsing Failed', 401);
        }
    }
}
