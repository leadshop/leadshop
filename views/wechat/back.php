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
    <script type="text/javascript" src="//at.alicdn.com/t/font_2072967_irmruj0qtt.js"></script>
    <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_2072967_irmruj0qtt.css">
    <title>首页</title>
    <script>
    let origin = window.location.origin;
    window.siteinfo = {
        "uniacid": "3",
        "acid": "3",
        "multiid": "0",
        "version": "2",
        "AppURL": origin+"/index.php",
        "siteroot": origin+"/index.php",
        "design_method": "3",
        "tabBar": {
            "color": "#ccc",
            "selectedColor": "#ff4c92",
            "borderStyle": "black",
            "backgroundColor": "#ffffff",
            "list": [
                {
                    "pagePath": "/pages/index/index",
                    "text": "A"
                },
                {
                    "pagePath": "/pages/categories/index",
                    "text": "B"
                },
                {
                    "pagePath": "/pages/cart/index",
                    "text": "C"
                },
                {
                    "pagePath": "/pages/goods/list",
                    "text": "D"
                },
                {
                    "pagePath": "/pages/user/index",
                    "text": "E"
                }
            ]
        }
    }
    <?php if (!empty($tabBar)) {echo "window.siteinfo.tabBar = " . json_encode($tabBar);}?>
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
