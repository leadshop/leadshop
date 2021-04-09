<template>
    <div class="le-matter upload-guide">
        <div class="le-item">
            <div class="le-item__header">
                <span class="le-sign"></span>
                <span class="le-text">1. 登录微信公众平台，进入公众号设置-功能设置</span>
            </div>
            <div class="le-item__body le-item__body-1">
                <img src="../image/he-upload-guide-1.png" alt="">
            </div>
        </div>
        <div class="le-item">
            <div class="le-item__header">
                <span class="le-sign"></span>
                <span class="le-text">2. 点击以下任意一个“设置”</span>
            </div>
            <div class="le-item__body le-item__body-2">
                <img src="../image/he-upload-guide-2.png" alt="">
            </div>
        </div>
        <div class="le-item">
            <div class="le-item__header">
                <span class="le-sign"></span>
                <span class="le-text">3. 下载”验证文件“</span>
            </div>
            <div class="le-item__body">
                <img src="../image/he-upload-guide-3.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "upload-guide",
    methods: {
      affirm: function(e) {
        let { handleClose } = e;
        handleClose();
      }
    }
};
</script>

<style scoped>
.le-matter.upload-guide {
    width: 600px;
    margin:0 40px;
    height: 480px;
    overflow-y: auto;
}
.le-sign {
    width: 10px;
    height: 10px;
    background: #623CEB;
    border-radius: 50%;
    display: inline-block;
    margin-right: 3px;
}
.le-text {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
}
.le-item__body {
    margin-top: 20px;
    margin-bottom: 28px;
}
.le-item__body img {
    width: 584px;
}
.le-item__body-1 img {
    height: 198px;
}
.le-item__body-2 img {
    height: 327px;
}
</style>
