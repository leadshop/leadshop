<?php
/**
 * 商品列表切换栏下对应数量统计
 * @link https://www.leadshop.vip/
 * @copyright Copyright ©2020-2021 浙江禾成云计算有限公司
 */
namespace leadmall\app;

use leadmall\Map;
use basics\app\BasicsController as BasicsModules;
use Yii;

class TabcountController extends BasicsModules implements Map
{

    public $modules = [
        'orderevaluate' => [
            'module'     => 'order',
            'controller' => 'evaluate',
        ],
    ];

    /**
     * 重写父类
     * @return [type] [description]
     */
    public function actions()
    {
        $actions = parent::actions();
        unset($actions['create']);
        unset($actions['update']);
        return $actions;
    }

    public function actionCreate()
    {
        $include = Yii::$app->request->get('include', '');
        $module  = $this->modules[$include] ?? false;
        if (!$module) {
            Error('未定义操作');
        }

        return $this->runModule($module['module'], $module['controller'], "tabcount");

    }

}
