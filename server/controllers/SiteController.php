<?php

namespace app\controllers;

use app\forms\ImageTools;
use fitment\models\Fitment;
use framework\common\AppAsset;
use setting\models\Setting;
use Yii;
use yii\imagine\Image;
use yii\web\Controller;

class SiteController extends Controller
{
    use ImageTools;
    public $layout = false;

    /**
     * Displays homepage.
     * @return string
     */
    public function actionIndex()
    {
        $industry = "admin";
        $alias    = 'admin';

        if (Yii::$app->request->getPathInfo()) {
            $pathinfo = explode("/", Yii::$app->request->getPathInfo());
            if ($pathinfo[0] == "") {
                array_shift($pathinfo);
            }
            if (!empty($pathinfo[0])) {
                $industry = $pathinfo[0];
            }
            if (!empty($pathinfo[1])) {
                $alias = $pathinfo[1];
            }
        }

        if ($industry == "h5") {
            $AppAsset = $this->compiling($industry, $alias, 'uni');
        } else {
            $AppAsset = $this->compiling($industry, $alias, 'vue');
        }
        $tabBar = [];
        $param = ["AppAsset" => $AppAsset, 'industry' => "$industry", 'alias' => $alias];
        if ($industry == 'h5') {
            $data = Fitment::find()->where(['AppID' => '98c08c25f8136d590c', 'keyword' => 'tabbar'])->select('keyword,content')->asArray()->one();
            if ($data) {
                $tabBar = str2url(to_array($data['content']));

                $newBar = [
                    "color" => $tabBar["inactive_color"],
                    "selectedColor" => $tabBar["active_color"],
                    "backgroundColor" => $tabBar["background_color"],
                    "list" => [
                    ],
                ];
                $temp = Yii::$app->basePath . '/web/h5/static/images/icon';
                if (!is_dir($temp)) {
                    mkdir($temp);
                }
                foreach ($tabBar["data"] as $k => $item) {
                    if ($tabBar['tabbarStyle'] == 2) {
                        $icon = 'icon_' . md5($k) . '.' . $this->getImageExtension($item["iconPath"]);
                        $iconPath = $temp . $icon;
                        $this->downloadFile($item["iconPath"], $iconPath);
                        $this->zoomImage($iconPath, $iconPath);
                        copy($iconPath, Yii::$app->basePath . '/web/h5/static/images/icon/' . $icon);
                        $selectIcon = 'select_icon_' . md5($k) . '.' . $this->getImageExtension($item["selectedIconPath"]);
                        $selectIconPath = $temp . $selectIcon;
                        $this->downloadFile($item["selectedIconPath"], $selectIconPath);
                        $this->zoomImage($selectIconPath, $selectIconPath);
                        copy($selectIconPath, Yii::$app->basePath . '/web/h5/static/images/icon/' . $selectIcon);
                        $newItem["iconPath"] = '/static/images/icon/' . $icon;
                        $newItem["selectedIconPath"] = '/static/images/icon/' . $selectIcon;
                    }
                    $newItem["pagePath"] = $item["link"]["path"];
                    $newItem["text"] = $item["text"];
                    $newBar["list"][] = $newItem;
                }
                $param['tabBar'] = $newBar;
            }
        } elseif ($industry == 'leadshop') {
            $name = '小店';
            $res = Setting::findOne(['AppID' => '98c08c25f8136d590c', 'keyword' => 'setting_collection']);
            if ($res) {
                $info = to_array($res['content']);
                $name = $info['store_setting']['name'] ?? '小店';
            }
            $param['title'] = $name . '--后台管理';
        }
        return $this->render('index', $param);
    }

    /**
     * 处理URL地址
     * @return [type] [description]
     */
    public function getUrlAddress()
    {

    }

    public function actionError()
    {
        return $this->actionIndex();
    }

    /**
     * 处理编译
     * @param  string $name  [description]
     * @param  string $alias [description]
     * @return [type]        [description]
     */
    public function compiling($name = '', $alias = '', $type = 'vue')
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
