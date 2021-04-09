<?php
/**
 * @Author: Qinuoyun
 * @Date:   2020-11-03 21:51:01
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-01-05 10:17:03
 */
namespace framework\common;

/**
 * @Author: qinuoyun
 * @Date:   2020-11-06 14:41:13
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2020-11-06 14:42:40
 */

class RSAOpenssl
{

    public $pi_key;
    public $pu_key;

    /**
     * 判断公钥和私钥是否可用
     * @param [type] $private_key [description]
     * @param [type] $public_key  [description]
     */
    public function __construct($public_key = null, $private_key = null)
    {
        if ($public_key) {
            $this->pu_key = openssl_pkey_get_public($public_key);
        }
        if ($private_key) {
            $this->pi_key = openssl_pkey_get_private($private_key);
        }

    }

    /**
     * 私钥加密
     * @param [type] $data [description]
     */
    public function PrivateEncrypt($data, $key = null)
    {
        $RSA_PRIVATE = empty($key) ? $this->pi_key : $key;

        $crypto = '';
        foreach (str_split($data, 117) as $chunk) {
            openssl_private_encrypt($chunk, $encryptData, $RSA_PRIVATE);
            $crypto .= $encryptData;
        }
        $encrypted = $this->urlsafe_b64encode($crypto);
        return $encrypted;
    }

    /**
     * 私钥加密的内容通过公钥可用解密出来
     * @param [type] $encrypted [description]
     */
    public function PublicDecrypt($encrypted)
    {
        $crypto = '';
        foreach (str_split($this->urlsafe_b64decode($encrypted), 128) as $chunk) {
            openssl_public_decrypt($chunk, $decryptData, $this->pu_key);
            $crypto .= $decryptData;
        }
        return $crypto;
    }

    /**
     * 公钥加密
     * @param [type] $data [description]
     */
    public function PublicEncrypt($data)
    {
        $crypto = '';
        foreach (str_split($data, 117) as $chunk) {
            openssl_public_encrypt($chunk, $encryptData, $this->pu_key);
            $crypto .= $encryptData;
        }
        $encrypted = $this->urlsafe_b64encode($crypto);
        return $encrypted;
    }

    /**
     * 私钥解密
     * @param [type] $encrypted [description]
     */
    public function PrivateDecrypt($encrypted)
    {
        $crypto = '';
        foreach (str_split($this->urlsafe_b64decode($encrypted), 128) as $chunk) {
            openssl_private_decrypt($chunk, $decryptData, $this->pi_key);
            $crypto .= $decryptData;
        }
        return $crypto;
    }

    /**
     * 加密码时把特殊符号替换成URL可以带的内容
     * @param  [type] $string [description]
     * @return [type]         [description]
     */
    public function urlsafe_b64encode($string)
    {
        $data = base64_encode($string);
        $data = str_replace(array('+', '/', '='), array('-', '_', ''), $data);
        return $data;
    }

    /**
     * 解密码时把转换后的符号替换特殊符号
     * @param  [type] $string [description]
     * @return [type]         [description]
     */
    public function urlsafe_b64decode($string)
    {
        $data = str_replace(array('-', '_'), array('+', '/'), $string);
        $mod4 = strlen($data) % 4;
        if ($mod4) {
            $data .= substr('====', $mod4);
        }
        return base64_decode($data);
    }

}
