<?php


namespace app\forms;


use Alipay\EasySDK\Kernel\Config;
use app\datamodel\Option;
use yii\base\BaseObject;

class CommonAlipay extends BaseObject
{
    public function getConfig($option = [])
    {
        if (isset($option['is_qmpaas']) && $option['is_qmpaas'] == true) {
            $form = CommonOption::get(Option::PAY_SETTING, 0, Option::GROUP_ADMIN, []);
            if (empty($form) || empty($form['alipay'])) {
                Error('未配置支付信息');
            }
            $payType = $form['alipay'];
        } elseif ($option) {
            $payType['appid'] = $option['appid'];
            $payType['private_key'] = $option['private_key'];
            $payType['public_key'] = $option['public_key'];
        } else {
            $payType = \Yii::$app->params['appPay'][\Yii::$app->params['AppType']] ?? null;
        }
        $options = new Config();
        $options->protocol = 'https';
        $options->gatewayHost = 'openapi.alipay.com';
        $options->signType = 'RSA2';
        $options->appId = $payType['appid'];
        $options->merchantPrivateKey = $payType['private_key'];
        //注：如果采用非证书模式，则无需赋值上面的三个证书路径，改为赋值如下的支付宝公钥字符串即可
        $options->alipayPublicKey = $payType['public_key'];
        //可设置异步通知接收服务地址（可选）
        $options->notifyUrl = $payType['notify_url'] ?? '';
        return $options;
    }
}