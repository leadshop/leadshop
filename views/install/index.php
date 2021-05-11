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
    <title>Leadshop开源商城安装引导</title>

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
