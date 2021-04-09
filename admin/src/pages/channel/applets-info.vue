<template>
    <div class="le-matter ">
        <div class="le-bind" v-if="!bind && !isBind">
            <div class="le-bind__content flex flex-direction align-center">
                <div class="le-bind-logo"></div>
                <div class="le-bind-name">微信小程序</div>
                <div class="le-bind-des">
                    绑定小程序并授权，快速发布小程<br/>
                    序商城，自动提交最新版本的审核
                </div>
                <el-button class="le-bind-btn" type="primary" @click="goBind">立即绑定</el-button>
            </div>
        </div>
        <el-form class="le-form" :rules="rules" :model="form" ref="bind" label-width="180px" v-if="(bind && !isBind) || toBind">
            <div class="le-form__header flex align-center">
                <span class="le-tip"></span>
                <span class="le-text">填写小程序信息</span>
            </div>
            <el-form-item label="小程序名称" prop="name">
                <el-input v-model="form.name" placeholder="请输入小程序名称"></el-input>
            </el-form-item>
            <el-form-item label="AppID" prop="AppID">
                <el-input v-model="form.AppID" placeholder="请输入AppID"></el-input>
            </el-form-item>
            <el-form-item label="AppSecret" prop="AppSecret">
                <el-input v-model="form.AppSecret" placeholder="请输入AppSecret"></el-input>
            </el-form-item>
            <el-form-item label="原始ID">
                <el-input v-model="form.oldID" placeholder="请输入原始ID"></el-input>
            </el-form-item>
        </el-form>
        <template v-if="isBind && !toBind">
            <div class="le-bind-over">
                <div class="le-bind-header" v-if="!isPay">
                    <span class="le-text">你的微信小程序尚未设置支付方式，请先设置支付方式。</span>
                    <el-button type="primary" class="le-btn">立即配置</el-button>
                </div>
                <div class="le-info le-card">
                    <div class="le-info__header flex align-center">
                        <span class="le-tip"></span>
                        <span class="le-text">基本信息</span>
                    </div>
                    <div class="le-item flex">
                        <div class="le-item__label">小程序名称</div>
                        <div class="le-item__value">{{form.name}}</div>
                    </div>
                    <div class="le-item flex">
                        <div class="le-item__label">小程序码</div>
                        <div class="le-item__value">
                            <div class="le-item--download" width="340" title="小程序二维码" :hide_cancel="true" sure_btn="下载二维码" module="channel" v-popup.uploadQrcode="qrcode">下载小程序码</div>
                            <div class="le-item-tip">下载小程序码，用于推广与分享小程序</div>
                        </div>
                    </div>
                </div>
                <div class="le-info le-card">
                    <div class="le-info__header flex align-center">
                        <span class="le-tip"></span>
                        <span class="le-text">账号信息</span>
                    </div>
                    <div class="le-item flex">
                        <div class="le-item__label">AppID</div>
                        <div class="le-item__value">{{form.AppID}}</div>
                    </div>
                    <div class="le-item flex">
                        <div class="le-item__label">AppSecret</div>
                        <div class="le-item__value">{{form.AppSecret}}</div>
                    </div>
                    <el-button class="le-editor" type="primary" @click="toBind = true">修改账号信息</el-button>
                </div>
            </div>
        </template>
        <div class="le-cardpin" v-if="(bind && !isBind) || toBind">
            <el-button type="primary" @click="save('bind')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "applets-info",
    data() {
        return {
            bind: false,
            toBind: false,
            rules: {
                name: [
                    { required: true, message: '请输入小程序名称', trigger: 'blur' },
                ],
                AppID: [
                    { required: true, message: '请输入AppID', trigger: 'blur' },
                ],
                AppSecret: [
                    { required: true, message: '请输入AppSecret', trigger: 'blur' },
                ]
            },
            form: {
                name: '',
                AppID: '',
                AppSecret: '',
                oldID: ''
            },
            isPay: false,
            isBind: false,
            qrcode: ''
        }
    },
    methods: {
        goBind: function() {
            this.bind = true;
        },
        save: function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$heshop.appconfig('post', {
                            behavior: 'save',
                            key: 'apply_weapp'
                        },
                        this.form
                    ).then(res => {
                        this.$notify({
                            title: '保存成功',
                            message: '小程序手动绑定成功。',
                            type: 'success'
                        });
                        this.toBind = false;
                        this.bind = false;
                        this.getForm();
                    }).catch(err => {
                        this.$message.error(err.data.message);
                    });
                }
            });
        },
        getForm: function () {
            this.$heshop.appconfig('get').then(res => {
                this.form = res.apply.weapp;
                this.isPay = !!res.appPay.weapp.appid;
                this.isBind = !!res.apply.weapp.AppID;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        getCode: function() {
            this.$heshop.qrcode('post').then(res => {
                this.qrcode = res.weapp.image;
            }).catch((err) => {
                this.$message.error(err.data.message);
            });
        }
    },
    mounted() {
        this.getForm();
        this.getCode();
    }
}
</script>

<style scoped lang="scss">
.le-matter {

}
.le-bind {
    height: 454px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 96px 0 80px 80px;
    .le-bind__content {
        width: 480px;
        height: 278px;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-radius: 16px;
        position: relative;
        .le-bind-name {
            font-size: 20px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #262626;
            margin-top: 68px;
        }
        .le-bind-des {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #BFBFBF;
            line-height: 20px;
            margin-top: 15px;
        }
        .le-bind-btn {
            width: 104px;
            height: 32px;
            background: #623CEB;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            padding: 0;
            margin-top: 30px;
        }
        .le-bind-logo {
            width: 80px;
            height: 80px;
            background-image: url("./image/he-applets.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            border-radius: 50%;
            position: absolute;
            top: -40px;
        }
    }
}
.le-form {
    height: 320px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    .le-form__header {
        margin-bottom: 38px;
        .le-tip {
            width: 4px;
            height: 16px;
            background: #623CEB;
            margin-right: 12px;
        }
        .le-text {
            font-size: 16px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #262626;
        }
        .el-input {
            width: 380px;
        }
    }
}
.le-bind-over {
    .le-card {
        background: #FFFFFF;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
    }
    .le-bind-header {
        height: 56px;
        background: #FEE8EA;
        border-radius: 16px;
        padding: 14px 24px;
        margin-bottom: 24px;
        .le-text {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #F5212D;
        }
        .le-btn {
            width: 80px;
            height: 28px;
            background: #623CEB;
            border-radius: 4px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            padding: 0;
            margin-left: 20px;
        }
    }
    .le-info {
        //height: 358px;
        .le-info__header {
            margin-bottom: 40px;
            .le-tip {
                width: 4px;
                height: 16px;
                background: #623CEB;
                margin-right: 12px;
            }
            .le-text {
                font-size: 16px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: #262626;
            }
        }
    }
    .le-item {
        margin-bottom: 23px;
        .le-item__label {
            width: 176px;
            text-align: right;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #262626;
        }
        .le-item__value {
            padding-left: 16px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #262626;
        }
        .le-item__img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
        }
        .le-item--download {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #623CEB;
            line-height: 20px;
            cursor: pointer;
        }
        .le-item-tip {
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #BFBFBF;
        }
    }
    .le-editor {
        width: 132px;
        height: 32px;
        background: #623CEB;
        border-radius: 4px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        padding: 0;
        margin-left: 193px;
    }
}
</style>
