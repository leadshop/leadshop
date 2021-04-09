<template>
    <div class="le-matter">
        <el-card>
            <div class="he-card">
                <div class="he-item">
                    <img class="he-item__sign" src="./image/he-weChat.png">
                    <div class="he-item__authority" v-if="isWechat">无使用权限</div>
                    <div class="he-item__text">微信公众号</div>
                    <div class="he-item__des">
                        绑定公众号并授权，在这里管理您<br />
                        的公众号，快速发布公众号商城
                    </div>
                    <he-link href="channel/manualBinding" :query="{platform: 'wechat'}" v-if="!isWechat">
                        <el-button type="primary">立即绑定</el-button>
                    </he-link>
                    <he-link href="channel/buy" :query="{platform: 'wechat'}" v-else>
                        <el-button type="primary">立即购买</el-button>
                    </he-link>
                </div>
                <div class="he-item" :class="{'he-item-0' : isApplets}">
                    <img class="he-item__sign" src="./image/he-applets.png">
                    <div class="he-item__authority" v-if="isApplets">无使用权限</div>
                    <div class="he-item__text">微信小程序</div>
                    <div class="he-item__des">
                        绑定小程序并授权，快速发布小程<br />
                        序商城，自动提交最新版本的审核
                    </div>
                    <he-link href="channel/bind" :query="{platform: 'applets'}" v-if="!isWechat">
                        <el-button type="primary">立即绑定</el-button>
                    </he-link>
                    <he-link href="channel/buy" :query="{platform: 'applets'}" v-else>
                        <el-button type="primary">立即购买</el-button>
                    </he-link>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
export default {
    name: "index",
    data() {
        return {
            isWechat: false,
            isApplets: false
        }
    },
    methods: {

    }
};
</script>
<style scoped>
/deep/ .el-card__body {
    padding: 56px 80px 80px 80px;
}

.he-card {
    display: flex;
}

.he-item {
    width: 400px;
    height: 278px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 16px;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
}

.he-item-0 {
    background: rgba(243, 245, 247, 0.5);
}

.he-item-0 .he-item__text {
    opacity: 0.55;
}

.he-item-0 .he-item__des {
    opacity: 0.25;
}

.he-item:first-child {
    margin-right: 80px;
}

.he-item__sign {
    width: 80px;
    height: 80px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}

.he-item__authority {
    width: 104px;
    height: 32px;
    background: #959697;
    position: absolute;
    top: 24px;
    left: 0;
    line-height: 32px;
    text-align: center;
    border-radius: 0px 16px 16px 0px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
}

.he-item__text {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    margin-top: 68px;
}

.he-item__des {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
    opacity: 0.45;
    margin-top: 20px;
    margin-bottom: 39px;
}
</style>