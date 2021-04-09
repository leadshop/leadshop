<?php

/**
 * @Author: qinuoyun
 * @Date:   2020-09-09 15:12:15
 * @Last Modified by:   wiki
 * @Last Modified time: 2021-03-11 10:43:56
 */

if (!function_exists('import')) {
    /**
     * 加载函数
     * @param  string $value [description]
     * @return [type]        [description]
     */
    function import($value = '')
    {
        P("加载");
    }
}

if (!function_exists('TestWrite')) {
    /**
     * 测试写入
     * @param [type] $d [description]
     */
    function TestWrite($d)
    {
        $tfile = '_qinuoyun.txt';
        $d     = preg_replace("#\/$#", '', $d);
        $fp    = @fopen($d . '/' . $tfile, 'w');
        if (!$fp) {
            return false;
        } else {
            fclose($fp);
            $rs = @unlink($d . '/' . $tfile);
            if ($rs) {
                return true;
            } else {
                return false;
            }

        }
    }
}
if (!function_exists('gdversion')) {
    /**
     * 获取版本
     * @return [type] [description]
     */
    function gdversion()
    {
        //没启用php.ini函数的情况下如果有GD默认视作2.0以上版本
        if (!function_exists('phpinfo')) {
            if (function_exists('imagecreate')) {
                return '2.0';
            } else {
                return 0;
            }

        } else {
            ob_start();
            phpinfo(8);
            $module_info = ob_get_contents();
            ob_end_clean();
            if (preg_match("/\bgd\s+version\b[^\d\n\r]+?([\d\.]+)/i", $module_info, $matches)) {$gdversion_h = $matches[1];} else { $gdversion_h = 0;}
            return $gdversion_h;
        }
    }
}

if (!function_exists('load_wechat')) {
    /**
     * 获取微信操作对象（单例模式）
     * @staticvar array $wechat 静态对象缓存对象
     * @param type $type 接口名称 ( Card|Custom|Device|Extend|Media|Oauth|Pay|Receive|Script|User )
     * @return \Wehcat\WechatReceive 返回接口对接
     */
    function &load_wechat($type = '', $options = [])
    {
        static $wechat = array();
        $index         = md5(strtolower($type));
        if (!isset($wechat[$index])) {
            // 定义微信公众号配置参数（这里是可以从数据库读取的哦）
            $options = array_merge(array(
                'token'          => '', // 填写你设定的key
                'appid'          => '', // 填写高级调用功能的app id, 请在微信开发模式后台查询
                'appsecret'      => '', // 填写高级调用功能的密钥
                'encodingaeskey' => '', // 填写加密用的EncodingAESKey（可选，接口传输选择加密时必需）
                'mch_id'         => '', // 微信支付，商户ID（可选）
                'partnerkey'     => '', // 微信支付，密钥（可选）
                'ssl_cer'        => '', // 微信支付，双向证书（可选，操作退款或打款时必需）
                'ssl_key'        => '', // 微信支付，双向证书（可选，操作退款或打款时必需）
                'cachepath'      => '', // 设置SDK缓存目录（可选，默认位置在Wechat/Cache下，请保证写权限）
            ), $options);
            \framework\wechat\Loader::config($options);
            $wechat[$index] = \framework\wechat\Loader::get($type);
        }
        return $wechat[$index];
    }
}

if (!function_exists('env')) {
    /**
     * Gets the value of an environment variable.
     *
     * @param string $key
     * @param mixed $default
     * @param string $delimiter
     * @return mixed
     */
    function env($key, $default = null, $delimiter = '')
    {
        if (!isset($_ENV) || !isset($_ENV[$key])) {
            return value($default);
        }

        $value = $_ENV[$key];

        if ($value === false) {
            return value($default);
        }

        switch (strtolower($value)) {
            case 'true':
            case '(true)':
                return true;
            case 'false':
            case '(false)':
                return false;
            case 'empty':
            case '(empty)':
                return '';
            case 'null':
            case '(null)':
                return;
        }

        if (strlen($value) > 1 && str_starts_with($value, '"') && str_ends_with($value, '"')) {
            $value = substr($value, 1, -1);
        }

        if (strlen($delimiter) > 0) {
            if (strlen($value) == 0) {
                $value = $default;
            } else {
                $value = explode($delimiter, $value);
            }
        }

        return $value;
    }
}

if (!function_exists('Error')) {
    /**
     * [Error description]
     * @param string $value [description]
     */
    function Error($msg = '系统错误', $code = 403)
    {
        return (new framework\common\ErrorCentral($msg, $code));
    }
}

if (!function_exists('getDirList')) {
    /**
     * 获取文件目录
     * @param  [type] $dir [description]
     * @return [type]      [description]
     */
    function getDirList($dir)
    {
        $path = array('.', '..', '.htaccess', '.DS_Store', 'controllers', 'config', 'debug', 'framework');
        $ext  = array("php", "html", "htm", "js", "css");
        $list = array();
        if (is_dir($dir)) {
            if ($handle = opendir($dir)) {
                while (($file = readdir($handle)) !== false) {
                    if (!in_array($file, $path) && !in_array(pathinfo($file, PATHINFO_EXTENSION), $ext)) {
                        $list[$file] = $file;
                    }
                }
                closedir($handle);
            }
        }
        return $list;
    }
}

if (!function_exists('read_all_dir')) {
    /**
     * [read_all_dir description]
     * @param  [type] $dir [description]
     * @return [type]      [description]
     */
    function read_all_dir($dir, $is_root = true)
    {

        $result = array();
        $handle = opendir($dir); //读资源
        if ($handle) {
            while (($file = readdir($handle)) !== false) {
                if ($file != '.' && $file != '..') {
                    $cur_path = $dir . DIRECTORY_SEPARATOR . $file;
                    if (is_dir($cur_path)) {
                        //判断是否为目录，递归读取文件
                        $result['dir'][$cur_path] = read_all_dir($cur_path);
                    } else {
                        if (is_bool($is_root)) {
                            $result['file'][] = $cur_path;
                        }
                        if (is_string($is_root)) {
                            $result['file'][] = str_replace($is_root, "", $cur_path);
                        }

                    }
                }
            }
            closedir($handle);
        }
        return $result;
    }
}

if (!function_exists('P')) {
    /**
     * 打印输出数据
     * @Author   Sean       Yan
     * @DateTime 2018-09-07
     * @param    [type]     $name [description]
     * @param    integer    $type [description]
     */
    function P($name, $type = 1)
    {

        switch ($type) {
            case 1:
                echo "<pre style='position:relative;z-index:1000;padding:10px;border-radius:5px;background:#F5F5F5;border:1px solid #aaa;font-size:14px;line-height:18px;opacity:0.9;'>" . print_r($name, true) . "</pre>";
                break;
            case 2:
                $name = unhtml($name);
                echo "<pre style='position:relative;z-index:1000;padding:10px;border-radius:5px;background:#F5F5F5;border:1px solid #aaa;font-size:14px;line-height:18px;opacity:0.9;'>" . print_r($name, true) . "</pre>";
                break;
            case 3:
                echo "<pre>" . print_r($name, true) . "</pre>";
                break;
            default:
                # code...
                break;
        }

    }
}

if (!function_exists('to_mkdir')) {
    /**
     * 创建目录
     * @param    string    $path     目录名称，如果是文件并且不存在的情况下会自动创建
     * @param    string    $data     写入数据
     * @param    bool    $is_full  完整路径，默认False
     * @param    bool    $is_cover 强制覆盖，默认False
     * @return   bool    True|False
     */
    function to_mkdir($path = null, $data = null, $is_full = false, $is_cover = false)
    {
        #非完整路径进行组合
        if (!$is_full) {
            $path = \Yii::$app->basePath . '/' . ltrim(ltrim($path, './'), '/');
        }
        $file = $path;
        #检测是否为文件
        $file_suffix = pathinfo($path, PATHINFO_EXTENSION);
        if ($file_suffix) {
            $path = pathinfo($path, PATHINFO_DIRNAME);
        } else {
            $path = rtrim($path, '/');
        }

        #执行目录创建
        if (!is_dir($path)) {
            if (!mkdir($path, 0777, true)) {
                return false;
            }
            chmod($path, 0777);
        }
        #文件则进行文件创建
        if ($file_suffix) {
            if (!is_file($file)) {
                if (!file_put_contents($file, $data)) {
                    return false;
                }
            } else {
                #强制覆盖
                if ($is_cover) {
                    if (!file_put_contents($file, $data)) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
        }
        return true;
    }
}

if (!function_exists('get_sn')) {
    /**
     * 获取SN唯一编号
     * @return [type] [description]
     */
    function get_sn($prefix = '')
    {
        $Sn = $prefix . strtoupper(dechex(date('m'))) . date('d') . substr(time(), -5) . substr(microtime(), 2, 5) . sprintf('%02d', rand(0, 99));
        return $Sn;
    }
}

if (!function_exists('get_random')) {
    /**
     * 获取随机数
     * @param  integer $length [description]
     * @return [type]          [description]
     */
    function get_random($length = 6)
    {
        $str    = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; //62个字符
        $strlen = 62;
        while ($length > $strlen) {
            $str .= $str;
            $strlen += 62;
        }
        $str = str_shuffle($str);
        return substr($str, 0, $length);
    }

}

if (!function_exists('to_json')) {
    /**
     * 数组转JSON
     * @param  array  $array 数组数据
     * @return json          返回JSON数据
     */
    function to_json($array = array())
    {
        return json_encode($array, 320);
    }

}

if (!function_exists('to_array')) {
    /**
     * JSON转数组
     * @param  string $json JSON数据
     * @return array        返回数组数据
     */
    function to_array($json = '')
    {
        return $json?json_decode($json, true):null;
    }
}

if (!function_exists('N')) {
    /**
     * 检测变量
     */
    function N($key, $type = 'empty', $from = 'post')
    {
        $data = $from === 'post' ? \Yii::$app->request->post() : \Yii::$app->request->get();
        if (!isset($data[$key])) {
            return false;
        }

        switch ($type) {
            case 'empty':
                return !empty($data[$key]);
                break;
            case 'array':
                return is_array($data[$key]);
                break;
            case 'string':
                return is_string($data[$key]);
                break;
            default:
                return false;
                break;
        }
    }
}

if (!function_exists('M')) {
    /**
     * [M description]
     * @param [type]  $name   [description]
     * @param [type]  $model  [description]
     * @param boolean $is_new [description]
     */
    function M($name = null, $model = null, $is_new = false)
    {
        return \framework\leadmall::Model($name, $model, $is_new);
    }
}

if (!function_exists('str2url')) {
    /**
     * 本地地址  代替字符串转url
     * @param  string $json [description]
     * @return [type]       [description]
     */
    function str2url($value)
    {
        $value_str = to_json($value);
        $url       = \Yii::$app->request->hostInfo;
        $value_str = str_replace(URL_STRING, $url, $value_str);
        $new_value = to_array($value_str);
        return $new_value;
    }
}

if (!function_exists('url2str')) {
    /**
     * 本地地址  url转代替字符串
     * @param  string $json [description]
     * @return [type]       [description]
     */
    function url2str($value)
    {
        $value_str = to_json($value);
        $url       = \Yii::$app->request->hostInfo;
        $value_str = str_replace($url, URL_STRING, $value_str);
        $new_value = to_array($value_str);
        return $new_value;
    }
}

if (!function_exists('encrypt')) {
    /**
     * 信息加密函数
     * @param  string $data 需要加密数据
     * @param  string $key  加解密秘钥
     * @return string       返回加密数据
     */
    function encrypt($data = "", $key = "this7")
    {
        $char = $str = null;
        $key  = md5($key);
        $x    = 0;
        $len  = strlen($data);
        $l    = strlen($key);
        for ($i = 0; $i < $len; $i++) {
            if ($x == $l) {
                $x = 0;
            }
            $char .= $key[$x];
            $x++;
        }
        for ($i = 0; $i < $len; $i++) {
            $str .= chr(ord($data[$i]) + (ord($char[$i])) % 256);
        }
        return base64_encode($str);
    }
}

if (!function_exists('decrypt')) {
    /**
     * 信息解密数据
     * @param  string $data 被加密字符串
     * @param  string $key  加解密秘钥
     * @return string       返回解密数据
     */
    function decrypt($data = "", $key = "this7")
    {
        $char = $str = null;
        $key  = md5($key);
        $x    = 0;
        $data = base64_decode($data);
        $len  = strlen($data);
        $l    = strlen($key);
        for ($i = 0; $i < $len; $i++) {
            if ($x == $l) {
                $x = 0;
            }
            $char .= substr($key, $x, 1);
            $x++;
        }
        for ($i = 0; $i < $len; $i++) {
            if (ord(substr($data, $i, 1)) < ord(substr($char, $i, 1))) {
                $str .= chr((ord(substr($data, $i, 1)) + 256) - ord(substr($char, $i, 1)));
            } else {
                $str .= chr(ord(substr($data, $i, 1)) - ord(substr($char, $i, 1)));
            }
        }
        return $str;
    }
}

if (!function_exists('dd')) {
    /**
     * Dump the passed variable and end the script.
     *
     * @param mixed $arg
     * @param bool $dumpAndDie
     * @return void
     */
    function dd($arg, $dumpAndDie = true)
    {
        echo "<pre>";
        // http_response_code(500);
        \yii\helpers\VarDumper::dump($arg);
        echo "</pre>";
        if ($dumpAndDie) {
            die(1);
        }
    }
}

if (!function_exists('make_dir')) {
    /**
     * Create the directory by pathname
     * @param string $pathname The directory path.
     * @param int $mode
     * @return bool
     */
    function make_dir($pathname, $mode = 0777)
    {
        if (is_dir($pathname)) {
            return true;
        }
        if (is_dir(dirname($pathname))) {
            return mkdir($pathname, $mode);
        }
        make_dir(dirname($pathname));
        return mkdir($pathname, $mode);
    }
}

if (!function_exists('mb_rtrim')) {
    /**
     * @param $string
     * @param $trim
     * @param $encoding
     * @return string
     */
    function mb_rtrim($string, $trim, $encoding = 'utf8')
    {

        $mask = [];
        $trimLength = mb_strlen($trim, $encoding);
        for ($i = 0; $i < $trimLength; $i++) {
            $item = mb_substr($trim, $i, 1, $encoding);
            $mask[] = $item;
        }

        $len = mb_strlen($string, $encoding);
        if ($len > 0) {
            $i = $len - 1;
            do {
                $item = mb_substr($string, $i, 1, $encoding);
                if (in_array($item, $mask)) {
                    $len--;
                } else {
                    break;
                }
            } while ($i-- != 0);
        }

        return mb_substr($string, 0, $len, $encoding);
    }
}

if (!function_exists('remove_dir')) {
    /**
     * 删除文件夹
     * @param $dir
     * @return bool
     */
    function remove_dir($dir)
    {
        //先删除目录下的文件：
        $dh = opendir($dir);
        while ($file = readdir($dh)) {
            if ($file != "." && $file != "..") {
                $fullpath = $dir . "/" . $file;
                if (!is_dir($fullpath)) {
                    unlink($fullpath);
                } else {
                    remove_dir($fullpath);
                }
            }
        }

        closedir($dh);
        //删除当前文件夹：
        if (rmdir($dir)) {
            return true;
        } else {
            return false;
        }
    }
}