<?php
/**
 * @link https://www.leadshop.vip/
 * @copyright Copyright ©2020-2021 浙江禾成云计算有限公司
 */
namespace basics\app;

use framework\common\BasicController;
use Yii;

/**
 * 后台用户管理器
 */
class BasicsController extends BasicController
{
    /**
     * 处理接口白名单
     * @var array
     */
    public $whitelists = [];

    /**
     * 重写父类
     * @return [type] [description]
     */
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['index']);
        unset($actions['create']);
        unset($actions['update']);
        unset($actions['delete']);
        unset($actions['view']);
        return $actions;
    }

    public function runModule($model, $name = '', $action = "index", $params = [])
    {
        $class      = ['', $model, 'app', ucfirst($name) . "Controller"];
        $class      = implode('\\', $class);
        $controller = (new $class($this->id, $this->module));
        if ($action == "index") {
            $_POST['_method']          = "get";
            $_SERVER['REQUEST_METHOD'] = "GET";
        }
        if ($action == "create") {
            $_POST['_method'] = "post";
        }
        if ($action == "view") {
            $_GET                      = $params;
            $_POST['_method']          = "get";
            $_SERVER['REQUEST_METHOD'] = "GET";
        }
        if ($action == "update") {
            if (empty($params)) {
                $params = $_GET;
            } else {
                $_GET = $params;
            }
            $_POST            = \Yii::$app->request->post();
            $_POST['_method'] = "put";
        }
        if ($action == "delete") {
            $_POST['_method'] = "delete";
        }
        Yii::$app->params['runModule'] = true;
        return $controller->runAction($action, $params);
    }

}
