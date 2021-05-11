<?php
set_time_limit(300);
// error_reporting(E_ALL ^ E_WARNING);

ini_set('display_errors', 1); //错误信息

ini_set('display_startup_errors', 1); //php启动错误信息

error_reporting(-1); //打印出所有的 错误信息

define('PACKAGE_BASE', 'https://www.leadshop.vip/');

$SELF_VERSION = get_version();

$SCRIPT_NAME = basename(__FILE__);

$STEP = get_step();

$global_list = [];

header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");

/**
 * 方法执行区域
 */
if (get_var('_leadshop')) {
    //http://www.qmpaas.com/install.php?_leadshop=1&step=2
    if ($STEP == 2) {
        echo to_json(check_env());
    }
    if ($STEP == 3) {
        echo to_json(show_init_form());
    }
}
/**
 * 页面执行区域
 */
else {
    instal_run();
}

/**
 * 公共函数区域
 * @return [type] [description]
 */

/**
 * 获取当前步骤
 * @return [type] [description]
 */
function get_step()
{
    return get_var('step');
}

/**
 * 获取版本号
 * @param  string $value [description]
 * @return [type]        [description]
 */
function get_version()
{
    $json_string = file_get_contents('./version.json');
    // 用参数true把JSON字符串强制转成PHP数组
    $data = json_decode($json_string, true);
    return $data['version'];
}

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

function install_database($host, $username, $password, $prefix, $database, $inuser = null)
{
    try {
        $dbms = 'mysql';
        $dsn  = "$dbms:host=$host;dbname=$database";
        $pdo  = new PDO($dsn, $username, $password); //初始化一个PDO对象
        //用于创建数据表
        $sql = sprintf('CREATE DATABASE IF NOT EXISTS `%s`  DEFAULT CHARACTER SET = `utf8mb4` DEFAULT COLLATE = `utf8mb4_unicode_ci`', $database);
        $res = $pdo->exec($sql);

        $sqlfile = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'forms/install/install.sql';

        $sql = file_get_contents($sqlfile);
        $sql = str_replace('heshop_initialize_prefix_', $prefix, $sql);
        $res = $pdo->exec($sql);
        //写入用户信息
        if ($inuser) {
            $res = $pdo->exec($inuser);
        }
        return [
            'code' => 0,
            'msg'  => "ok",
        ];
    } catch (PDOException $e) {
        return [
            'code' => -2,
            'msg'  => $e->getMessage(),
        ];
    }
}

function install_config($host, $username, $password, $prefix, $database)
{
    $port = 3306;

    $defaultConfig = <<<ETF
<?php
return [
    'class'       => 'yii\db\Connection',
    'dsn'         => 'mysql:host=DummyDbHost;port=DummyDbPort;dbname=DummyDbDatabase',
    'username'    => 'DummyDbUsername',
    'password'    => 'DummyDbPassword',
    'charset'     => 'utf8mb4',
    'tablePrefix' => 'DummyDbPrefix',
    'attributes'  => [
        PDO::ATTR_STRINGIFY_FETCHES => false,
        PDO::ATTR_EMULATE_PREPARES  => false,
    ],
];
ETF;

    if (stripos($host, ':') !== false) {
        list($host, $port) = explode(':', $host, 2);
    }

    $stub = str_replace([
        'DummyDbHost',
        'DummyDbPort',
        'DummyDbDatabase',
        'DummyDbUsername',
        'DummyDbPassword',
        'DummyDbPrefix',
    ], [
        $host,
        $port,
        $database,
        $username,
        $password,
        $prefix,
    ], $defaultConfig);

    $dbfile = dirname(__DIR__) . DIRECTORY_SEPARATOR . 'config/db.php';
    return file_put_contents($dbfile, $stub);
}

/**
 * 执行数据库表单
 * @return [type] [description]
 */
function show_init_form()
{
    global $SCRIPT_NAME, $STEP;

    // $action == 1 表示是提交的表单
    $action = get_var('action');

    $forumTitle                = get_var('forumTitle');
    $mysqlHost                 = get_var('mysqlHost');
    $mysqlDatabase             = get_var('mysqlDatabase');
    $mysqlUsername             = get_var('mysqlUsername');
    $mysqlPassword             = get_var('mysqlPassword');
    $tablePrefix               = get_var('tablePrefix');
    $adminUsername             = get_var('adminUsername');
    $adminPassword             = get_var('adminPassword');
    $adminPasswordConfirmation = get_var('adminPasswordConfirmation');
    //处理端口号

    // P([$forumTitle, $mysqlHost, $mysqlDatabase, $mysqlUsername, $mysqlPassword, $tablePrefix, $adminUsername, $adminPassword]);

    // 判断每个字段是否合法
    $forumTitleInvalid    = $action && !$forumTitle;
    $mysqlHostInvalid     = $action && !$mysqlHost;
    $mysqlDatabaseInvalid = $action && !$mysqlDatabase;
    $mysqlUsernameInvalid = $action && !$mysqlUsername;
    $mysqlPasswordInvalid = $action && !$mysqlPassword;
    $tablePrefixInvalid   = $action && $tablePrefix && !preg_match("/^\w+$/", $tablePrefix);
    $adminUsernameInvalid = $action && !$adminUsername;
    $adminPasswordInvalid = $action && (!$adminPassword || !$adminPasswordConfirmation || ($adminPasswordConfirmation != $adminPassword));

    // 需要检查数据库连接
    $mysqlConnectCheck = $action && !$mysqlHostInvalid && !$mysqlUsernameInvalid && !$mysqlPasswordInvalid;

    $mysqlVersionInvalid       = true;
    $mysqlConnectInvalid       = true;
    $mysqlUserPassInvalid      = true;
    $mysqlDatabaseDbInvalid    = true;
    $mysqlDatabaseDbInvalidMsg = "";
    $mysqlVersionInvalidMsg    = "";

    if ($mysqlConnectCheck) {
        $r = check_mysql_connection($mysqlHost, $mysqlUsername, $mysqlPassword);

        $mysqlConnectInvalid  = ($r === -1) || $r === false;
        $mysqlUserPassInvalid = ($r === -2);
        $mysqlHostInvalid     = $mysqlHostInvalid || $mysqlConnectInvalid;

        if ($mysqlUserPassInvalid) {
            $mysqlUsernameInvalid = true;
            $mysqlPasswordInvalid = true;
        }

        if (!$mysqlConnectInvalid && !$mysqlUserPassInvalid) {
            // 如果数据库可连接
            $r = check_mysql_version($mysqlHost, $mysqlUsername, $mysqlPassword);
            if ($r !== true) {
                // 如果数据库版本错误，也标记mysqlHost字段不合法
                $mysqlHostInvalid       = true;
                $mysqlVersionInvalid    = true;
                $mysqlVersionInvalidMsg = $r;
            } else {
                $mysqlVersionInvalid = false;
            }
            if (!$mysqlDatabaseInvalid) {
                // 如果输入了数据库名称
                $r = check_mysql_database($mysqlHost, $mysqlUsername, $mysqlPassword, $mysqlDatabase);
                if ($r !== true) {
                    $mysqlDatabaseInvalid      = true;
                    $mysqlDatabaseDbInvalidMsg = $r;
                    $mysqlDatabaseDbInvalid    = true;
                }
            }
        }
    }
    $LANG = array();

    if ($action && !$forumTitle) {
        $LANG['forumTitle'] = "站点名称不能为空";
    }

    if ($mysqlConnectCheck && !$mysqlConnectInvalid) {
        $LANG['mysqlHost'] = $mysqlDatabaseDbInvalidMsg;
    }
    if ($action && !$mysqlDatabase) {
        $LANG['mysqlDatabase'] = "数据库名称不能为空";
    }

    if ($action && $mysqlUserPassInvalid) {
        $LANG['mysqlUsername'] = "使用您输入的 MySQL 用户名密码组合无法连接到数据库";
    }

    if ($action && $mysqlUserPassInvalid) {
        $LANG['mysqlPassword'] = "使用您输入的 MySQL 用户名密码组合无法连接到数据库";
    }

    if ($action && $tablePrefixInvalid) {
        $LANG['tablePrefix'] = "使用您输入的 MySQL 用户名密码组合无法连接到数据库";
    }

    if ($action && !$adminUsername) {
        $LANG['adminUsername'] = "管理员用户名不能为空";
    }

    if ($action && !$adminPassword) {
        $LANG['adminPassword'] = "管理员密码不能为空";
    }

    if ($action && ($adminPassword != $adminPasswordConfirmation)) {
        $LANG['adminPassword'] = "管理员密码两次输入不一致";
    }

    if (strpos($mysqlDatabase, '-') !== false) {
        $LANG['mysqlDatabase'] = "数据库名称中不能包含 - ";
    }

    $ready_to_install = $action && !$forumTitleInvalid && !$mysqlHostInvalid && !$mysqlDatabaseInvalid && !$mysqlUsernameInvalid
    && !$mysqlPasswordInvalid && !$tablePrefixInvalid && !$adminUsernameInvalid && !$adminPasswordInvalid && !$mysqlUserPassInvalid;

    if ($ready_to_install) {
        $md5Password = md5($adminPassword);
        $table       = $tablePrefix . "account";
        $inuser      = "insert into {$table}(mobile,password,nickname) values('{$adminUsername}','{$md5Password}','管理员')";
        $data        = install_database($mysqlHost, $mysqlUsername, $mysqlPassword, $tablePrefix, $mysqlDatabase, $inuser);
        if ($data['code'] === 0) {
            //创建配置文件
            $returned = install_config($mysqlHost, $mysqlUsername, $mysqlPassword, $tablePrefix, $mysqlDatabase);
            if ($returned) {
                make_lock_file();
                return [
                    'code' => 0,
                    'msg'  => "安装成功",
                ];
            } else {
                return [
                    'code' => -1,
                    'msg'  => "请检查目录是否可写",
                ];
            }
        } else {
            return $data;
        }

    } else {
        return [
            'code' => -1,
            'msg'  => $LANG,
        ];
    }
}

/**
 * 判断锁文件
 * @return [type] [description]
 */
function lock_file_guard()
{
    if (file_exists(dirname(__DIR__) . "/install.lock")) {
        echo "为了安全，本文件每次运行成功后会被自动锁定，如果想再次运行，请删除 install.lock 后重试。";
        exit(0);
    }
}

/**
 * 创建锁定文件
 */
function make_lock_file()
{
    file_put_contents(dirname(__DIR__) . "/install.lock", "locked");
}

/**
 * 环境监测
 * @return [type] [description]
 */
function check_env()
{
    global $LANG;
    $env_check = array(
        'php_version' => true,
        'https'       => true,
    );

    $LANG['php_version'] = 'PHP版本要求 7.2以上';
    if (version_compare(phpversion(), '7.2.0', '<')) {
        $env_check['php_version'] = false;
    }

    $ext_check = pre_check();
    $env_check = array_merge($env_check, $ext_check);

    $ext_check = extension_check();
    $env_check = array_merge($env_check, $ext_check);

    $func_check = function_check();
    $env_check  = array_merge($env_check, $func_check);

    $ssl_check = check_ssl_certificate();
    $env_check = array_merge($env_check, $ssl_check);

    $LANG['https'] = '站点推荐使用HTTPS';
    if (!is_https()) {
        $env_check['https'] = 'warn';
    }

    return [
        'lang'  => $LANG,
        'check' => $env_check,
    ];
}

/**
 * 检查能否正确连接ssl网站
 */
function check_ssl_certificate()
{
    global $LANG;
    $LANG['ssl_certificate'] = 'CA根证书库检查 <a href="https://forum.leadshop.vip/thread/68" target="_blank">处理方案</a>';
    $LANG['download_test']   = '下载外部文件';
    $ssl_check               = array();
    $url_to_check            = 'https://qmxq.oss-cn-hangzhou.aliyuncs.com/leadshop/upgrade.txt';
    try {
        http_download_to_str($url_to_check);
    } catch (Exception $e) {
        if (strpos($e->getMessage(), "code(60)") || strpos($e->getMessage(), "code(77)")) {
            $ssl_check['ssl_certificate'] = false;
        } else {
            $ssl_check['download_test'] = false;
        }
    }
    return $ssl_check;
}

/**
 * 写入监测
 * @param  [type] $dir [description]
 * @return [type]      [description]
 */
function writable_check($dir)
{
    $tmpfile = $dir . "/" . uniqid('test', true);
    if (!is_writable($dir)) {
        return false;
    }
    if (file_put_contents($tmpfile, "hello") === false) {
        return false;
    }
    if (!file_exists($tmpfile)) {
        return false;
    }
    return unlink($tmpfile);
}

/**
 * 目录检查
 * @return [type] [description]
 */
function pre_check()
{
    global $SCRIPT_NAME;
    $pre_check = array(
        'base_name'       => true,
        'dir_name'        => true,
        'base_writable'   => true,
        'parent_writable' => true,
        'config_writable' => true,
        'stores_writable' => true,

    );
    global $LANG;
    $check_all = true;

    $dir               = __DIR__;
    $config_dir        = dirname(__DIR__) . "/config";
    $stores_dir        = dirname(__DIR__) . "/stores";
    $base_name         = basename($dir);
    $LANG['base_name'] = "检查当前目录 $dir 目录名称是否为 web";
    $LANG['base_path'] = $dir;
    if ($base_name !== 'web') {
        $pre_check['base_name'] = false;
    }

    $dir_name         = dirname($dir);
    $LANG['dir_name'] = "检查上级目录 $dir_name 不能为根目录";
    $LANG['dir_path'] = $dir_name;
    if (!$dir_name || $dir_name === "/" || preg_match("/^[a-z|A-Z]:[\/|\\\]?$/m", $dir_name)) {
        $pre_check['dir_name'] = false;
    }

    $LANG['base_writable'] = "检查当前目录 $dir 是否可写";
    if (!writable_check($dir)) {
        $pre_check['base_writable'] = false;
    }

    $LANG['config_writable'] = "检查目录  $config_dir 是否可写";
    if (!writable_check($config_dir)) {
        $pre_check['config_writable'] = false;
    }

    $LANG['stores_writable'] = "检查目录  $stores_dir 是否可写";
    if (!writable_check($stores_dir)) {
        $pre_check['stores_writable'] = false;
    }

    $LANG['parent_writable'] = "检查上级目录 $dir_name 是否可写";
    if (!writable_check($dir_name)) {
        $pre_check['parent_writable'] = false;
    }
    return $pre_check;
}

/**
 * 检查扩展模块是否加载，并生成$LANG相关文字
 * @return [type] [description]
 */
function extension_check()
{
    global $LANG;
    $ext_check         = array();
    $needed_extensions = array(
        'bcmath', 'ctype', 'curl', 'dom', 'gd', 'json', 'mbstring', 'openssl', 'pdo', 'pdo_mysql', 'tokenizer', 'xml', 'zip',
    );

    $all_passed = true;
    foreach ($needed_extensions as $ext) {
        if (!extension_loaded($ext)) {
            $all_passed                     = false;
            $ext_check['extension_' . $ext] = false;
            $LANG['extension_' . $ext]      = "PHP扩展要求支持 " . $ext;
        }
    }
    if ($all_passed) {
        $ext_check['extension_all'] = true;
        $LANG['extension_all']      = "PHP扩展检查";
    }

    return $ext_check;
}

/**
 * 检查函数是否正常。包括函数是否启用，ssl相关函数能否正确生成公钥/私钥
 */
function function_check()
{
    global $LANG;
    $func_check       = array();
    $needed_functions = array(
        'symlink', 'realpath',
    );
    $shellMsg = '<a href="https://forum.leadshop.vip/thread/35" target="_blank">处理方案</a>';

    $all_passed = true;

    foreach ($needed_functions as $func) {
        if (!function_exists($func)) {
            $all_passed                      = false;
            $func_check['function_' . $func] = false;
            $LANG['function_' . $func]       = "PHP函数要求启用 " . $func;
            if ($func == 'shell_exec') {
                $LANG['function_' . $func] = "PHP函数要求启用 " . $func . $shellMsg;
            }
        }
    }

    if ($all_passed) {
        $func_check['function_all'] = true;
        $LANG['function_all']       = "PHP函数检查";
    }

    $LANG['function_openssl_pkey_new']           = 'PHP函数openssl生成密钥测试 <a href="https://forum.leadshop.vip/thread/69" target="_blank">处理方案</a>';
    $LANG['function_openssl_pkey_export']        = 'PHP函数openssl导出密钥测试 <a href="https://forum.leadshop.vip/thread/69" target="_blank">处理方案</a>';
    $pkey                                        = false;
    function_exists('openssl_pkey_new') && $pkey = openssl_pkey_new(['private_key_bits' => 2048]);
    if ($pkey === false) {
        $func_check['function_openssl_pkey_new']    = false;
        $func_check['function_openssl_pkey_export'] = false;
    } else {
        if (!openssl_pkey_export($pkey, $pkeyout)) {
            $func_check['function_openssl_pkey_export'] = false;
        }
    }

    return $func_check;
}

function check_mysql_connection($host, $username, $password)
{
    $port = 3306;
    if (strpos($host, ":") !== false) {
        list($host, $port) = explode(":", $host);
    }
    try {
        $conn = "mysql:host=$host;port=$port;charset=utf8mb4";
        return new PDO($conn, $username, $password);
    } catch (PDOException $e) {
        if ($e->getCode() === 2002) {
            return -1; // -1 表示连接被拒绝
        }
        if ($e->getCode() === 1045) {
            return -2; // -2 表示用户名/密码错误
        }
        return false;
    }
}

/**
 * 数据库版本检查
 * @param  [type] $host     [description]
 * @param  [type] $username [description]
 * @param  [type] $password [description]
 * @return [type]           [description]
 */
function check_mysql_version($host, $username, $password)
{
    $pdo = check_mysql_connection($host, $username, $password);
    if ($pdo === false) {
        return "数据库无法连接";
    }
    if ($q = $pdo->query('SELECT VERSION()')) {
        $version = $q->fetchColumn();
        if (strpos($version, 'MariaDB') !== false) {
            if (version_compare($version, '10.3.0', '>=')) {
                return true;
            }
        } else {
            if (version_compare($version, '8.0.0', '>=')) {
                return true;
            }
        }
    } else {
        return "无法查询数据库版本";
    }
    if ($q = $pdo->query("SELECT @@GLOBAL.innodb_default_row_format")) {
        $rowformat = $q->fetchColumn();
        if ($rowformat != "dynamic") {
            return "MySQL配置不正确，请确认innodb_default_row_format配置为dynamic";
        }
        $large_prefix = $pdo->query("SELECT @@GLOBAL.innodb_large_prefix")->fetchColumn();
        if ($large_prefix != 1) {
            return "MySQL配置不正确，请确认innodb_large_prefix配置为on";
        }
    } else {
        return "MySQL版本太低，请使用MySQL 5.7.9版本以上或MariaDB 10.2以上";
    }
    return true;
}

/**
 * 数据库权限检查
 * @param  [type] $host     [description]
 * @param  [type] $username [description]
 * @param  [type] $password [description]
 * @param  [type] $database [description]
 * @return [type]           [description]
 */
function check_mysql_database($host, $username, $password, $database)
{
    $database = addslashes($database);
    $pdo      = check_mysql_connection($host, $username, $password);
    if ($pdo === false) {
        return "数据库无法连接";
    }
    if ($pdo->exec("USE $database") !== false) {
        if ($pdo->query("SHOW TABLES")->rowCount() > 0) {
            return "数据库 $database 不为空，请清空后重试";
        }
        return true;
    } else {
        if ($q = $pdo->query("SHOW DATABASES LIKE '$database'")) {
            if ($q->rowCount() > 0) {
                return "无法切换到数据库 $database";
            }
            if ($pdo->query("CREATE DATABASE $database DEFAULT CHARACTER SET = `utf8mb4` DEFAULT COLLATE = `utf8mb4_unicode_ci`") === false) {
                return "无法创建数据库 $database ，请检查用户权限";
            }
            return true;
        }
        return "无法获取数据库列表";
    }
}

/**
 * 获取GET参数
 * @param  [type] $var [description]
 * @return [type]      [description]
 */
function get_var($var)
{
    if (!isset($_GET[$var])) {
        if (!isset($_POST[$var])) {
            $_POST = json_decode(file_get_contents("php://input"), true);
            if (!isset($_POST[$var])) {
                return false;
            }
        }
        $ret = $_POST[$var];
    } else {
        $ret = $_GET[$var];
    }
    return htmlspecialchars($ret);
}

/**
 * 用于界面跳转
 * @param  [type] $url [description]
 * @return [type]      [description]
 */
function redirect($url)
{
    header('Location: ' . $url);
    exit(0);
}

/**
 * 监测是否是HTTPS
 * @return boolean [description]
 */
function is_https()
{
    if (isset($_SERVER["HTTPS"]) && strtolower($_SERVER["HTTPS"]) != "off") {
        return true;
    }
    if (isset($_SERVER["HTTP_X_FORWARDED_PROTO"]) && strtolower($_SERVER["HTTP_X_FORWARDED_PROTO"]) == "https") {
        return true;
    }
    if (isset($_SERVER["HTTP_SCHEME"]) && strtolower($_SERVER["HTTP_SCHEME"]) == "https") {
        return true;
    }
    if (isset($_SERVER["HTTP_FROM_HTTPS"]) && strtolower($_SERVER["HTTP_FROM_HTTPS"]) != "off") {
        return true;
    }
    if (isset($_SERVER["SERVER_PORT"]) && $_SERVER["SERVER_PORT"] == 443) {
        return true;
    }
    return false;
}

/**
 * 执行文件下载
 * @param  [type]  $url              [description]
 * @param  boolean $ignore_ssl_error [description]
 * @return [type]                    [description]
 */
function http_download_to_str($url, $ignore_ssl_error = false)
{
    if (!function_exists('curl_init')) {
        throw new Exception("curl扩展未启用");
    }
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36');
    if ($ignore_ssl_error) {
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    } else {
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 2);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 1);
    }

    $response = curl_exec($ch);

    if ($response === false) {
        $error_no = curl_errno($ch);
        throw new Exception("下载 $url 错误，code($error_no)，错误信息：" . curl_error($ch));
    }
    curl_close($ch);
    return $response;
}

/**
 * 创建文件
 * @param  [type]  $path      [description]
 * @param  integer $mode      [description]
 * @param  boolean $recursive [description]
 * @return [type]             [description]
 */
function try_mkdir($path, $mode = 0777, $recursive = false)
{
    if (file_exists($path)) {
        return;
    }
    mkdir($path, $mode, $recursive);
}

/**
 * 移除目录
 * @param  [type] $path [description]
 * @return [type]       [description]
 */
function remove_dir($path)
{
    if (empty($path) || !$path) {
        return false;
    }
    return is_file($path) ?
    @unlink($path) :
    array_map(__FUNCTION__, glob($path . '/*')) == @rmdir($path);
}

/**
 * 检查SQL文件
 * @return boolean [description]
 */
function has_mysql_init_sql()
{
    $file = __DIR__ . DIRECTORY_SEPARATOR . '../forms/install.sql';
    return file_exists($file);
}

/**
 * 数组转JSON
 * @param  array  $array 数组数据
 * @return json          返回JSON数据
 */
function to_json($array = array())
{
    return json_encode($array, 320);
}

/**
 * JSON转数组
 * @param  string $json JSON数据
 * @return array        返回数组数据
 */
function to_array($json = '')
{
    return $json ? json_decode($json, true) : null;
}

/**
 * 检测升级文件是否被篡改
 * @param  [type] $str [description]
 * @return [type]      [description]
 */
function check_and_strip_upgrade_md5($str)
{
    $lines = explode("\n", $str);
    openssl_public_decrypt(base64_decode($lines[0]), $md5, get_public_key());
    array_shift($lines);
    $str = implode("\n", $lines);
    if (md5($str) !== $md5) {
        throw new Exception("升级文件被篡改，请检查你的服务器是否有安全隐患");
    }
    return $str;
}

/**
 * 执行自身更新
 * @return [type] [description]
 */
function do_self_update()
{
    global $SELF_VERSION;
    $self_replaced  = false;
    $need_upgrade   = false;
    $remote_version = trim(http_download_to_str('https://qmxq.oss-cn-hangzhou.aliyuncs.com/leadshop/latest_dl_ver.txt'));
    if ($remote_version !== $SELF_VERSION) {
        // 只要不相等，就更新
        $need_upgrade  = true;
        $load_file_md5 = "6a1da29f924895901948dfa102f37678";
        $new_file_md5  = trim(http_download_to_str('https://qmxq.oss-cn-hangzhou.aliyuncs.com/leadshop/latest_dl_md5.txt'));
        if ($load_file_md5 === $new_file_md5) {
            $self_replaced = true;
        }
    }
    return array($need_upgrade, $self_replaced, $remote_version);
}

/**
 * 监测更新程序
 * @return [type] [description]
 */
function check_self_update()
{
    global $SCRIPT_NAME;
    list($need_upgrade, $self_replaced, $remote_version) = do_self_update();
    if ($need_upgrade) {
        if ($self_replaced) {
            if (download_update_files($remote_version)) {
                make_lock_file();
                return 1;
            } else {
                return '更新失败，请坚持站点目录是否有写入权限';
            }
        } else {
            return '无法自动完成install.php升级，请登录论坛下新的install.php文件的 <a href="https://forum.leadshop.vip">前往论坛</a> 后上传更新。';
        }
    } else {
        return "ok 当前版本已经是最新版本{$remote_version}无需更新";
    }
}

/**
 * 执行下载JSON
 * @param  [type] $url [description]
 * @return [type]      [description]
 */
function download_json($url)
{
    $pkg_str = http_download_to_str($url);
    if ($pkg_str === false) {
        throw new Exception("下载错误: " . $url);
    }
    $json = json_decode($pkg_str, true);
    if ($json === null) {
        throw new Exception("${pkg_str} 无法被解析成 json");
    }

    return $json;
}

/**
 * 递归调用获取md5
 * @param string $dir1        路径1，是标准
 */
function get_folder_md5($dir1, $dirPath, &$data)
{
    if (is_dir($dir1)) {
        $arr = scandir($dir1);
        foreach ($arr as $entry) {
            if (($entry != ".") && ($entry != "..") && ($entry != ".svn") && ($entry != "runtime") && ($entry != ".DS_Store")) {
                $new = $dir1 . "/" . $entry; //$new是完整文件名或文件夹名
                //如果不想显示文件名可以注释下面这句
                //echo $entry . "\n";
                if (is_dir($new)) {
                    get_folder_md5($new, $dirPath, $data);
                } else {
                    $md5_dir = str_replace($dirPath, "", $new);
                    $_key    = md5($md5_dir);
                    //读书数据值
                    $md5_key = md5_file($new);
                    if ($data[$_key]) {
                        if ($data[$_key]['key'] == $md5_key) {
                            unset($data[$_key]);
                        } elseif ($data[$_key]['path'] == '/web/install.php') {
                            unset($data[$_key]);
                        }
                    }
                }
            }
        }
    }
    return $data;
}

function download_update_files($version = '1.0.3')
{
    //读取更新记录
    $data = download_json("https://qmxq.oss-cn-hangzhou.aliyuncs.com/V{$version}/upgrade.txt");
    $dir1 = dirname(__DIR__);
    //对不获取更新文件
    $update_data = get_folder_md5($dir1, $dir1, $data);
    if (count($update_data)) {
        foreach ($update_data as $key => $param) {
            //拼接URL地址信息
            $url  = "https://qmxq.oss-cn-hangzhou.aliyuncs.com/V{$version}" . $param['path'];
            $data = http_download_to_str($url);
            //判断OSS中文件是否存在
            if (strpos($data, "NoSuchKey") === false) {
                $path = $dir1 . $param['path'];
                file_put_contents($path, $data);
            }
        }
        return 1;
    } else {
        return 0;
    }
}

/**
 * 执行鞥更新
 * https://qmxq.oss-cn-hangzhou.aliyuncs.com/V1.0.3/upgrade.txt
 * @return [type] [description]
 */
function update_fun()
{
    lock_file_guard();
    //开始执行更新
    $end = check_self_update();
    if ($end == 1) {
        echo "ok 更新成功";
    } elseif ($end === 0) {
        echo "更新失败，请重试";
    } else {
        echo $end;
    }
}

function instal_run()
{
    $version = get_version();
    $body    = <<<ERT
<!DOCTYPE html><html><head> <meta charset="UTF-8"> <!-- import CSS --> <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css"> <link rel="stylesheet" href="https://qmxq.oss-cn-hangzhou.aliyuncs.com/install/index.css"></head><body> <div id="app"> <div class="header"> <div class="header-logo"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/logo.png" id="logo"> </div> </div> <div v-if="step == 1" class="step1"> <el-card class="box-card" shadow="never"> <div class="box-card__title"> <h3>安装协议</h3> </div> <div class="box-card__body"> <p>本授权协议适用且仅适用于Leadshop微商城系列开源软件产品(以下简称Leadshop)任何版本，浙江禾成云计算有限公司拥有本授权协议的最终解释权。 </p> <p>一、协议许可的权利</p> <p>1. 你可以在协议规定的约束和限制范围内修改Leadshop系列开源软件产品或界面风格以适应你的网站要求。</p> <p>2. 你拥有使用本软件构建的系统全部内容所有权，并独立承担与这些内容的相关法律义务。</p> <p>二、协议规定的约束和限制</p> <p>1. 开源版本不可去除界面版权logo，不可去除代码版权。否则会被视为盗版行为并承担相应法律责任。</p> <p>2. 如果你未能遵守本协议的条款，你的授权将被终止，所被许可的权利将被收回，并承担相应法律责任。</p> <p>3. 所有用户均可根据自己的需要对Leadshop进行修改。但无论何种情况，即：无论用途如何、是否经过修改或美化、修改程度如何，只要您使用Leadshop的任何整体或部分程序算法，都必须保留页脚处的Leadshop名称和www.leadshop.vip的链接地址，且修改后的程序版权依然归Leadshop开发团队所有。</p> <p>4. 安装时会触发Leadshop官网云服务器接口，获取版本信息数据，并向云服务器提交本机IP信息。</p> <p>三、有限担保和免责声明</p> <p>1. 本软件及所附带的文件是作为不提供任何明确的或隐含的赔偿或担保的形式提供的。</p> <p>2. 用户出于自愿而使用本软件，你必须了解使用本软件的风险，在尚未购买产品技术服务之前，我们不承诺对免费用户提供任何形式的技术支持、使用担保，也不承担任何因使用本软件而产生问题的相关责任。</p> <p>3. 电子文本形式的授权协议如同双方书面签署的协议一样，具有完全的和等同的法律效力。你一旦开始确认本协议并安装本软件，即被视为完全理解并接受本协议的各项条款，在享有上述条款授予的权力的同时，受到相关的约束和限制。协议许可范围以外的行为，将直接违反本授权协议并构成侵权，我们有权随时终止授权，责令停止损害，并保留追究相关责任的权力。</p> <p>4. 如果本软件带有其它软件的整合API示范例子包，这些文件版权不属于本软件官方，并且这些文件是没经过授权发布的，请参考相关软件的使用许可合法的使用。 5. 利用本软件构建的网站的任何信息内容以及导致的任何版权纠纷和法律争议及后果，我们不承担任何责任。</p> <p>6. 程序的使用（或无法再使用）中所有一般化、特殊化、偶然性或必然性的损坏（包括但不限于数据的丢失，自己或第三方所维护数据的不正确修改，和其他程序协作过程中程序的崩溃等），我们不承担任何责任。 </p> </div> <div class="box-card__footer"> <el-button type="primary" @click="OperationNext">同意并继续</el-button> </div> </el-card> </div> <div v-if="step == 2" class="step2"> <el-card class="box-card"> <div class="box-card__banner"> <h3> 欢迎使用Leadshop安装向导 </h3> <p> 本程序将帮助你安装Leadshop的最新版本</p> </div> <div class="box-card__content"> <div class="check_info"> <p>本程序运营过程中的提示都很重要，请一定认真阅读 </p> <p>请先配置好服务器的域名和SSL等，使用用户要访问的域名来访问本地安装程序 </p> <p>本程序不能自动完成HTTP服务区的配置，数据库的安装配置 </p> <p>Leadshop要求数据库是MySQL5.7.3以上,PHP7.2以上</p> </div> <div class="check_img" v-if="!checkData"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/detection-icon.gif"> <p>检测中，请稍后...</p> </div> <div class="check_list" v-if="checkData"> <div class="__title"> 基础环境检测 </div> <div class="__tips" v-if="!checkData.check['extension_all'] || !checkData.check['function_all']"> <p> 安装无法继续，请纠正以下错误。 </p> <p>错误信息： 环境检查失败，</p> <p>请按要求确认PHP版本，启用PHP扩展与函数。</p> </div> <ul class="__lists" v-if="checkData"> <!-- 监测PHP版本号 --> <li v-if="checkData.check['php_version'] === true"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-succeed.png"> <p v-html="checkData.lang['php_version']"></p> </li> <li v-if="checkData.check['php_version'] === false"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-error.png"> <p>{{checkData.lang['php_version']}}</p> </li> <!-- 监测HTTPS --> <li v-if="checkData.check['https'] === true"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-succeed.png"> <p>{{checkData.lang['https']}}</p> </li> <li v-if="checkData.check['https'] === 'warn'"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-warning.png"> <p>{{checkData.lang['https']}}</p> </li> <li v-if="checkData.check['https'] === false"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-error.png"> <p>{{checkData.lang['https']}}</p> </li> <!-- 监测函数库 --> <li v-for="item,index in checkFun" :key="index" v-if="checkData.check[item] === false"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-error.png"> <p v-html="checkData.lang[item]"></p> </li> <!-- 监测扩展库 --> <li v-for="item,index in checkExt" :key="index" v-if="checkData.check[item] === false"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-error.png"> <p v-html="checkData.lang[item]"></p> </li> </ul> </div> <div class="check_list" v-if="checkData"> <div class="__title"> 安装目录监测 </div> <div class="__tips succeed" v-if="checkData.check['base_name'] && checkData.check['base_writable'] && checkData.check['dir_name']"> <p>安装目录检查成功。</p> <p>当前目录： {{checkData.lang['base_path']}}</p> <p>Leadshop将被安装到{{checkData.lang['dir_path']}}</p> </div> <ul class="__lists"> <!-- 监测站点目录 --> <li v-for="item,index in checkDir" :key="index"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-succeed.png" v-if="checkData.check[item] === true"> <img src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/install-error.png" v-if="checkData.check[item] === false"> <p>{{checkData.lang[item]}}</p> </li> </ul> </div> </div> <div class="box-card__footer" v-if="checkData"> <el-button @click="EnvironmentalMonitoring">重新监测</el-button> <el-button @click="PreviousStep">上一步</el-button> <el-button type="primary" @click="OperationNext">下一步</el-button> </div> </el-card> </div> <div v-if="step >= 3" class="step3"> <el-card class="box-card"> <div class="box-card__step"> <div class="le-steps"> <ul> <li :class="step === 3 ? '' : 'le-steps-before'" class="active" style="z-index: 3;cursor:pointer;"> <div class="center"> 1.参数配置 </div> </li> <li :class="step > 3 ? 'active' : ''"> <div class="center"> 2.安装 </div> </li> </ul> </div> </div> <div class="box-card__form" v-if="step == 3"> <el-form :model="form" label-width="140px" :rules="rules" ref="ruleForm"> <div class="check_list"> <div class="__title"> MySQL数据库配置 </div> <div class="__lists __form_item"> <el-form-item label="站点名称" prop="forumTitle"> <el-input v-model="form.forumTitle" placeholder="请输入站点名称"></el-input> </el-form-item> <el-form-item label="MySQL 服务器地址" prop="mysqlHost"> <el-input v-model="form.mysqlHost" placeholder="请输入MySQL服务器地址(可用:指定端口号)"></el-input> </el-form-item> <el-form-item label="数据库名称" prop="mysqlDatabase"> <el-input v-model="form.mysqlDatabase" placeholder="请输入数据库名称"></el-input> </el-form-item> <el-form-item label="MySQL 用户名" prop="mysqlUsername"> <el-input v-model="form.mysqlUsername" placeholder="请输入MySQL用户名"></el-input> </el-form-item> <el-form-item label="MySQL 密码" prop="mysqlPassword"> <el-input v-model="form.mysqlPassword" placeholder="请输入MySQL密码"></el-input> </el-form-item> <el-form-item label="表前缀(可选)"> <el-input v-model="form.tablePrefix" placeholder="请输入表前缀"></el-input> </el-form-item> </div> </div> <div class="check_list"> <div class="__title"> MySQL数据库配置 </div> <div class="__lists __form_item"> <el-form-item label="设置管理员手机号" prop="adminUsername"> <el-input v-model="form.adminUsername" placeholder="请输入管理员手机号"></el-input> </el-form-item> <el-form-item label="设置管理员密码" prop="adminPassword"> <el-input type="password" v-model="form.adminPassword" placeholder="请输入管理员密码"></el-input> </el-form-item> <el-form-item label="管理员密码确认" prop="adminPasswordConfirmation"> <el-input type="password" v-model="form.adminPasswordConfirmation" placeholder="请再次输入密码"></el-input> </el-form-item> </div> </div> <div class="box-card__footer"> <el-button type="primary" @click="onSubmit">继续</el-button> </div> </el-form> </div> <div class="box-card__upload" v-if="step == 4" style="padding-top: 102px"> <img alt="" class="le-upload__img" src=" https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/upload.gif" /> <div class="le-upload__text"> 正在安装中，请稍后... </div> </div> <div class="box-card__upload" v-if="step == 5" style="padding-top: 75px;margin-bottom: 0;"> <img alt="" class="le-upload__img" src=" https://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/uplaod-success.png" style="margin-bottom: 0;" /> <div class="le-success__text"> 安装成功！进入管理后台 </div> <div class="le-version"> 版本号{$version} </div> <a href="/"> <el-button type="primary" class="__complete">进入管理后台</el-button> </a> </div> </el-card> </div> <div class="le-panel__footer"> <div class="le-link"> <span>官网</span>丨 <span> <a href="http://forum.leadshop.vip/" target="_blank">论坛</a> </span>丨 <span>文档</span> </div> <div class="le-copy"> Powered By Leadshop © 2021 </div> </div> </div></body><!-- import Vue before Element --><script src="https://unpkg.com/vue/dist/vue.js"></script><!-- import JavaScript --><script src="https://unpkg.com/axios/dist/axios.min.js"></script><script src="https://unpkg.com/element-ui/lib/index.js"></script><script src="https://qmxq.oss-cn-hangzhou.aliyuncs.com/install/index.js"></script></html>
ERT;
    echo $body;
}
