<?php
/**
 * @Author: Qinuoyun
 * @Date:   2020-11-03 21:51:01
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-01-05 10:17:04
 */
namespace framework\common;

use linslin\yii2\curl\Curl;
use Yii;

class CodeAuthorization
{

    /**
     * 公钥
     * @var string
     */
    private static function getPublicKey($key = '')
    {
        return '-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDyoR5tgtSDemV57nNT5neZukCI
1Vz+5iWJipNyeugZCUuCqEGNeMTbaEk0RYNa+8FWsVave5j8NgQVwMb5biZBtFQh
pY0BzKWkt7jLVGbPW0dbuDGdXmhWKJloRANWG+POKz6b5XkMgMgKsip7TixLHV2N
LEP0By5qPz8qRht9AwIDAQAB
-----END PUBLIC KEY-----';
    }

    /**
     * 秘钥
     * @param  string $value [description]
     * @return [type]        [description]
     */
    private static function getEncryptKey($value = '')
    {
        return '-----BEGIN ENCRYPT KEY-----
kim5RkcJBcZgeo8HxyFqoJwVfZ8JADNMyaoOvzytI2HAbQGLy8aIIYBGTvsc8nO8
Gi8sxp1TRtj2lyyhtATYP5eJyiypYsbQvH4X0oaGvQA_dAwJYznfLTmeIqPFJkFD
yjsCtacUGPYB8OEQ1KawjLpgVx-sxeCjChrd08vFsPUNYM29pN5LVF_jeaP_q-Va
-pgHkU5BFzUhQ7UOuvAbpa-9IL2_SMXbs6PPjlQQ8GPWfCdoJMJpH5Sklz2n0YCa
0uknGTENsB3Lm7bxh3_YUf6NcNCYlcrPZR96Jd_6fJDD_huMh3jYBHFtZ5lXeRqk
ct1Z_2A2VnS0hhitZLi3c5nDZOU_A9N1LL218ZpsT3Msmpsqqur1jLcRFdk-0TcD
7GN0Y-YEs6J3BA0fFHLdNAN6MveLNx2wGleXqrIL-RK3po-uinmPi73zAyGVYIIS
IgQaJWEYfAAIooCwdLqBzfCtb7zDH567FuiS8xKlw-z1gYjgHaVEzYB036yAC1mB
s4xDcooif9tFE16iYDt4O03qi_Hsw2sIND-p6FX4Kbe91yKrFfAomDeY10vk31dl
JruByWJsPyJ49TWkswznqquVN-MFyYsOS0GatxxGYUFcU_Eu9zxnNGn7rGYYLFbW
E6AD9SJ0-sfhEpUjdxA-e6VgDv__h8LK9RNO9km8nqK-DhUgItRRD7mfMzcveUQ6
9CaWTgvXgxpX-WWGrR6ygScFpfXvrhR-1d3k7KfNuSQK3o640kup1mRK0bkfrOtg
c5OHtSs_b_GK9EcSiUi0YfOn-Dpc4vVXel0v-r1WUnQOd9YGGXrPoU3pUv7a4rmA
kcp1foz81Q6bZxFuKT51wZ3BK7xMpmTHj9J4tXBr1_QLFoQHw727bCJhwNydxIUl
tQQPIszueNjDpSY5J-QAcbaqFqfxocqAq05ot0YLkDdCZhk3vcFMFhvVykSx3tVJ
oOqNXvLRGMMA605Psy3VXyhtUqGkRT3j6KkdqUlwT4oxKUpnXkFxowAMsvGe6G4B
mjl-LS4xiW_PMdNEdcwn08b4rZ6n7b5yUxpR724sQVNr998H7eir-1hGqeMhlCoh
ZJJI1XeyxgchSYQ3lJ8KFOi9638wckeDuWpPV4Z0UvTQJYn9EPPjs-eo_gktsf93
LVHjv-ofPAEvg8QsLy2qw6uM3LYGieQ4N5nD132FTNmq1moAbXLIXQI4JDK1BPdm
FOvexxOzAlLvwfx0mIqwynxRtMedf07HhH9m9NcB4pPT_95RrxFGVFMwY4yLVale
Q6hye_XyA_gXWJwRyEQgftQ1pr4svP7nVYw-BnjaxmAgHU7eK0yqCT2UEUlNRojd
j_IuXZrDSI8bakDRnQrEKrryyuSvbldJTUjT1svJHfjem7Xp7KO78SQ8WmTv2vWt
6iJMhLSG5YOgoNXpFIbFlVCpREc-fhp4KtxCGNUPaCdIAnKW3p50yPnssB2jbQSC
0AVTuMmjfFQZ3vR7I180RdHsIpywLOZ0DXzVdWNASDQdJR8ImR7Msuf56WftIbCd
ganfq0nmThQyGgkD_BJ0Hpt8ljWCdqlSmn7dEhHuGW1JRqA2zVw6giLI6lSsU87N
Gd9EAZxXRtl35RBUU9sa9WexUQEFUTnwiRnXLpEcXHfAAfY7UfsmigXr5otHb4NR
IEwGWOpMFTEEVZ4HsGtA_9-JQUH-9adZuDENxZCTf9wjaW3jTRPCuHhyKfY--W35
LdhMJJwOe85E7tEiU5GCxtk10Im36aVQ_lt2cHCVVliaVHf2aXu1ML5rQ2mQsnRZ
jNWB-mIUclFzF-SMt3vZ4mKJZJ0uelkYOMqZ2mSOY5EptEW2Wlr5DO4RKsEtGkUL
JWv2ECNft6d4BEbcyUauMw
-----END ENCRYPT KEY-----';
    }

    /**
     * 更新号获取
     * 原因：防止用于直接调用授权类或者打印父级类获取更新号等信息
     * @param string $value [description]
     */
    public function UpdateCheck($object, $maps, $moduleFile)
    {
        $upkey = $this->UpdateNumber($object);
        //进行更新文件校验
        if ($maps[$upkey] && $maps[$upkey] == $moduleFile) {
            return true;
        } else {
            exit("抱歉，检测到您的更新包非官方文件，请从官方下载正版更新包");
        }
    }

    /**
     * 序列号获取器
     * 原因：防止用于直接调用授权类或者打印父级类获取秘钥等信息
     * @param string $value [description]
     */
    public function IsAuthorization()
    {
        $key = $this->SerialNumber();
        if (empty(Yii::$app->params['serialNumber']) || !isset(Yii::$app->params['serialNumber'])) {
            exit("请在配置文件检查授权码是否为空");
        }
        //校验授权信息
        if (Yii::$app->params['serialNumber'] === $key) {
            return true;
        } else {
            exit("抱歉您的授权信息与本机不相符，无法使用，若搬站请登录云平台换取新的授权码");
        }
    }

    /**
     * 获取提交Code
     */
    public function GetCommitCode($access_token)
    {
        $curl   = new Curl();
        $params = [
            "data" => [
                "attributes" => [
                    "unique" => $this->SystemUnique(),
                    "host"   => Yii::$app->request->hostInfo,
                ],
            ],
        ];
        $response = $curl->setRequestBody(json_encode($params))
            ->setHeaders([
                'Authorization'  => 'Bearer ' . $access_token,
                'Content-Type'   => 'application/json',
                'Content-Length' => strlen(json_encode($params)),
            ])
            ->post("http://heshop.tpddns.cn:9001/api/qima/code");
        return $response;
    }

    /**
     * 白色密码
     * @param string $value [description]
     */
    final private function PasswordWhite($data = '', $key = "qinuoyun")
    {
        $arraytext = explode(PHP_EOL, $data);
        array_pop($arraytext);
        array_shift($arraytext);
        $ciphertext  = implode("", $arraytext);
        $publictext  = (new RSAOpenssl(self::getPublicKey()))->PublicDecrypt($ciphertext);
        $decrypttext = decrypt($publictext, $key);
        return $decrypttext;
    }

    /**
     * 获取系统唯一值
     */
    public function SystemUnique()
    {
        ob_start(); //打开缓冲区
        phpinfo(INFO_GENERAL); //使用phpinfo函数
        $contents = ob_get_contents();
        ob_end_clean();
        return MD5($contents);
    }

    /**
     * 兑换授权序列号
     * @return [type] [description]
     */
    final private function SerialNumber()
    {
        $object = [
            "unique" => $this->SystemUnique(),
            "host"   => Yii::$app->request->hostInfo,
            "name"   => Yii::$app->params['username'],
            "date"   => Yii::$app->params['regtime'],
        ];
        //对象转字符串
        $string = json_encode($object);
        //获取秘钥
        $rsaencrypt = $this->PasswordWhite(self::getEncryptKey(), "www.heshop.com");
        //加密数据
        $textfont = (new RSAOpenssl(self::getPublicKey(), $rsaencrypt))->PrivateEncrypt($string);
        //处理MD5字符串
        $antistop = MD5($object['unique']);
        //处理序列号
        $secretkey = strtoupper(substr($antistop, 8, 2) . MD5($textfont) . substr($textfont, 30, 2));
        //分隔符返回序列号
        return implode("-", str_split($secretkey, 6));
    }

    /**
     * 获取更新序列号
     * @param  string $value [description]
     * @return [type]        [description]
     */
    final private function UpdateNumber()
    {
        //对象转字符串
        $string = json_encode($object);
        //获取秘钥
        $rsaencrypt = $this->PasswordWhite(self::getEncryptKey(), "www.heshop.com");
        //加密数据
        $textfont = (new RSAOpenssl(self::getPublicKey(), $rsaencrypt))->PrivateEncrypt($string);
        //处理MD5字符串
        $antistop = MD5($object['version']);
        //处理序列号
        $secretkey = strtoupper("UP" . MD5($textfont) . substr($textfont, 30, 2));
        //分隔符返回序列号
        return implode(str_split($secretkey, 6));
    }

}
