<template>
    <div>
        <div class="le-prompt">
            提示：请先完成以下步骤，再保存此处的公众号设置
        </div>
        <div class="le-matter upload-guide">

            <div class="le-item">
                <div class="le-item__header">
                    <span class="le-sign"></span>
                    <span class="le-text">1. 复制配置信息</span>
                </div>
                <div class="le-item__body le-item__body-1">
                    <img src="../image/he-deploy-guide-1.png" alt="">
                </div>
            </div>
            <div class="le-item">
                <div class="le-item__header">
                    <span class="le-sign"></span>
                    <span class="le-text">2. 登录微信公众平台，打开公众号的基础配置</span>
                </div>
                <div class="le-item__body le-item__body-2">
                    <img src="../image/he-deploy-guide-2.png" alt="">
                </div>
            </div>
            <div class="le-item">
                <div class="le-item__header">
                    <span class="le-sign"></span>
                    <span class="le-text">3. 粘贴配置信息</span>
                </div>
                <div class="le-item__body le-item__body-3">
                    <img src="../image/he-deploy-guide-3.png" alt="">
                </div>
            </div>
            <div class="le-item">
                <div class="le-item__header">
                    <span class="le-sign"></span>
                    <span class="le-text">4. 启用服务器配置</span>
                </div>
                <div class="le-item__body le-item__body-4">
                    <img src="../image/he-deploy-guide-4.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "deploy-guide",
    methods: {
        affirm: function(e) {
            let { handleClose } = e;
            handleClose();
        }
    }
};
</script>

<style scoped>
.upload-guide {
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
    height: 163px;
    width: 565px;
}
.le-item__body-2 img {
    height: 214px;
    width: 154px;
}
.le-item__body-3 img {
    height: 420px;
}
.le-item__body-4 img {
    height: 200px;
}
.le-prompt {
    width: 600px;
    height: 32px;
    background: #FFF4E7;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FB9115;
    line-height: 32px;
    padding-left: 16px;
    margin: 0 auto 36px auto;
}
</style>
