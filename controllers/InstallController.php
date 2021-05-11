<?php

namespace app\controllers;

use app\forms\ImageTools;
use framework\common\AppAsset;
use Yii;
use yii\web\Controller;

class InstallController extends Controller
{
    use ImageTools;
    public $layout = false;

    /**
     * Displays homepage.
     * @return string
     */
    public function actionIndex()
    {
        $install_file = Yii::$app->BasePath . '/install.lock';
        if (file_exists($install_file)) {
            echo "为了安全，本文件每次运行成功后会被自动锁定，如果想再次运行，请删除 install.lock 后重试。";
            exit();
        }

        $industry = "install";
        $alias    = 'install';

        $AppAsset = $this->compiling($industry, $alias, 'ins');

        $param = ["AppAsset" => $AppAsset, 'industry' => $industry, 'alias' => $alias];
        return $this->render('index', $param);
    }

    /**
     * 处理编译
     * @param  string $name  [description]
     * @param  string $alias [description]
     * @return [type]        [description]
     */
    public function compiling($name = '', $alias = '', $type = 'ins')
    {
        $view     = \Yii::$app->view;
        $config   = array('industry' => $name, 'alias' => $alias, 'type' => $type);
        $AppAsset = new AppAsset($config);
        $am       = $AppAsset->getAssetManager();
        $AppAsset->publish($am);
        $AppAsset->registerAssetFiles($view);
        return $AppAsset;
    }
}
