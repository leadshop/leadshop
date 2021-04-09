<template>
    <div class="le-matter">
        <div class="he-title">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="he-link-text">
                <el-breadcrumb-item class="he-link" >
                    <he-link href="channel/index">
                        渠道管理
                    </he-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <div class="he-box">
                <img class="he-box__img" src="./image/he-buy-applet.png" alt="">
                <div class="he-box__content">
                    <div class="he-box__title">微信小程序</div>
                    <div class="he-box__item">
                        <span class="he-box__label">价格</span>
                        <span class="he-box__price">¥999.00</span>
                    </div>
                    <div class="flex align-center he-box__item">
                        <div class="he-box__label">使用时间</div>
                        <div class="flex" >
                            <div @click="active = 1" class="he-box__radio" :class="{'he-box__radio_1' : active === 1}">
                                <span>永久</span>
                            </div>
                            <div @click="active = 2" class="he-box__radio" :class="{'he-box__radio_1' : active === 2}">
                                <span>3个月</span>
                            </div>
                            <div @click="active = 3" class="he-box__radio" :class="{'he-box__radio_1' : active === 3}">
                                <span>6个月</span>
                            </div>
                            <div @click="active = 4" class="he-box__radio" :class="{'he-box__radio_1' : active === 4}">
                                <span>12个月</span>
                            </div>
                        </div>
                    </div>
                    <div class="he-box__item">
                        <span class="he-box__label">使用店铺</span>
                        <span class="he-box__store">我是店铺名称</span>
                    </div>
                    <el-button type="primary" class="he-box__btn">立即购买</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "buy",
    data() {
        return {
            title: '',
            active: 1
        }
    },
    mounted() {
        let platform = this.$heshop.utils.getQueryVariable('platform');
        switch (platform) {
            case "applets":
                this.title = "购买小程序使用权限";
                break;
            case "wechat":
                this.title = "购买公众号使用权限";
                break;
        }
    }
};
</script>

<style scoped>
.he-title {
    margin-bottom: 24px;
}
.he-box {
    height: 400px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 16px;
    display: flex;
    overflow: hidden;
}
.he-box__img {
    height: 400px;
    width: 320px;
}
.he-box__content {
    padding: 50px 0 50px 57px;
}
.he-box__title {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #000000;
    opacity: 0.85;
    margin-bottom:35px;
}
.he-box__radio {
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 8px;
    padding: 11px 20px;
    cursor: pointer;
}
.he-box__radio_1 {
    border: 1px solid #623CEB;
    background: #EFEBFD;
}
.he-box .he-box__radio_1 span {
    color: #623CEB;
    opacity: 1;
}
.he-box__radio:not(:last-child) {
    margin-right: 8px;
}
.he-box__radio span {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    line-height: 1;
}
.he-box__label {
    display: inline-block;
    width: 56px;
    margin-right: 28px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.65;
}
.he-box__price {
    font-size: 26px;
    font-family: DINPro;
    font-weight: bold;
    color: #FB9115;
    opacity: 0.85;
}
.he-box__store {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}
.he-box__item {
    margin-bottom: 23px;
}
.he-box__btn {
    margin-top: 25px;
}
.flex {
    display: flex;
}
.align-center {
    align-items: center;
}
</style>