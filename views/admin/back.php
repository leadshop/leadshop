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
    <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover"/>
    <script type="text/javascript" src="//res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
    <script type="text/javascript" src="//at.alicdn.com/t/font_2072967_p83jlariv2.js"></script>
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_2072967_p83jlariv2.css">
    <title><?=$title?></title>
    <script>
    function HTMLEncode(html) {
        var temp = document.createElement("div");
        (temp.textContent != null) ? (temp.textContent = html) : (temp.innerText = html);
        var output = temp.innerHTML;
        temp = null;
        return output;
    }
    let origin = window.location.origin;
    var $_W = {
        AppURL: origin+"/index.php?q=",
        AppWEB: origin+"/index.php?r=wechat",
        AppID: "98c08c25f8136d590c",
        Copyright: HTMLEncode("Powered By Leadshop © 2021"),
        AppName: "leadmall",
        AppAlias: "fitment",
        AppSecret: "3AYpU16dZ1CY7ejqvrE39B351vanLJVD",
        AppConfig: {
            defaultRoute: "index/index",
            loginURL: "/api/leadmall/login",
            loginPage: "/login/index"
        }
    }
    </script>
    <?php $this->head()?>

</head>
<body>
<?php $this->beginBody()?>
<div id="app">
</div>
<?php $this->endBody()?>
</body>
</html>
<?php $this->endPage()?>
