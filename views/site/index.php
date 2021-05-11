 <?php
/* @var $this \yii\web\View */
/* @var $content string */
// $AppAsset->register($this);
?>
<?php $this->beginPage()?>
<!DOCTYPE html>
<html lang="<?=Yii::$app->language?>">
<head>
    <meta charset="<?=Yii::$app->charset?>">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"> -->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"/>
    <script type="text/javascript" src="//res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
    <script type="text/javascript" src="//at.alicdn.com/t/font_2072967_irmruj0qtt.js"></script>
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_2072967_irmruj0qtt.css">
    <title><?=$title?></title>
    <?php $this->head()?>
    <script language="javascript">
    console.clear();
    var $_W = {
        AppWEB: "<?=Yii::$app->request->hostInfo?>/h5",
        Copyright: "Powered By Leadshop © 2021",
        AppURL: "<?=Yii::$app->request->hostInfo?>",
        AppID: "98c08c25f8136d590c",
        AppName: "leadmall",
        AppAlias: "<?=$alias?>",
        AppSecret: "3AYpU16dZ1CY7ejqvrE39B351vanLJVD",
        AppConfig: {
            defaultRoute: "index/index",
            loginURL: "/api/leadmall/login",
            loginPage: "/login/index"
        }
    }
    window.siteinfo = {
        "uniacid": "3",
        "acid": "3",
        "multiid": "0",
        "version": "2",
        "AppURL": "<?=Yii::$app->request->hostInfo?>",
        "siteroot": "https://api.manong.cloud/app/index.php",
        "design_method": "3",
    }
    <?php if (!empty($tabBar)) {
    echo "window.siteinfo.tabBar = " . json_encode($tabBar);
}?>
    </script>
</head>
<body>
<?php $this->beginBody()?>
<div id="app">

</div>
<?php $this->endBody()?>
</body>
</html>
<?php $this->endPage()?>
