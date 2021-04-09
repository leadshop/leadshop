<template>
    <div class="le-matter" v-if="load">
        <div class="le-bind" v-if="!bind && !isBind">
            <div class="le-bind__content flex flex-direction align-center">
                <div class="le-bind-logo"></div>
                <div class="le-bind-name">微信公众号</div>
                <div class="le-bind-des">
                    绑定公众号并授权，在这里管理您<br />
                    的公众号，快速发布公众号商城
                </div>
                <el-button class="le-bind-btn" type="primary" @click="bind = true">立即绑定</el-button>
            </div>
        </div>
        <template v-if="(bind && !isBind) || toBind">
            <div class="le-card">
                <div class="flex flex-direction align-center">
                    <div class="le-steps">
                        <el-steps :active="step" align-center>
                            <el-step title="填写公众号信息"></el-step>
                            <el-step title="公众号设置"></el-step>
                        </el-steps>
                    </div>
                    <el-form v-show="step === 1" label-width="100px" class="le-form" ref="form" :model="form" :rules="rules">
                        <el-form-item label="公众号名称" prop="name">
                            <el-input v-model="form.name" placeholder="请输入公众号名称"></el-input>
                        </el-form-item>
                        <el-form-item label="公众号类型" prop="type">
                            <el-select v-model="form.type" placeholder="请选择">
                                <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="AppID" prop="AppID">
                            <el-input v-model="form.AppID" placeholder="请输入AppID"></el-input>
                        </el-form-item>
                        <el-form-item label="AppSecret" prop="AppSecret">
                            <el-input v-model="form.AppSecret" placeholder="请输入AppSecret"></el-input>
                        </el-form-item>
                        <el-form-item label="验证文件" prop="file_name">
                            <el-input v-model="form.file_name">
                                <template slot="append">
                                    <el-upload action="" ref="upload" :on-change="handleChange" :http-request="upload" :limit="1" :auto-upload="false" :on-exceed="handleExceed" :show-file-list="false">选择文件</el-upload>
                                </template>
                            </el-input>
                            <el-button class="le-view-guidelines" module="channel" title="验证文件下载指引" type="text" width="720" :hide_close="true" height="676" v-popup.uploadGuide sure_btn="我知道了">查看指引</el-button>
                        </el-form-item>
                    </el-form>
                    <div class="le-deploy" v-show="step === 2">
                        <div class="le-deploy-1">服务器配置</div>
                        <div class="le-deploy-2 flex">
                            <span class="le-deploy-1-text">请将以下信息填入微信公众号，并启用服务器配置。完成操作后，再保存此页面。</span>
                            <el-button class="le-view-guidelines" module="channel" title="服务器配置指引" type="text" width="720" :hide_close="true" v-popup.deployGuide sure_btn="已完成配置">查看指引</el-button>
                        </div>
                        <div class="le-deploy__item">
                            <span class="le-item__label">服务器地址(URL)</span>
                            <span class="le-item__value" id="url">{{form.url}}</span>
                            <el-button type="text" class="le-view-guidelines" @click="copy('url')">复制</el-button>
                        </div>
                        <div class="le-deploy__item">
                            <span class="le-item__label">令牌(Token)</span>
                            <span class="le-item__value" id="token">{{form.token}}</span>
                            <el-button type="text" class="le-view-guidelines" @click="copy('token')">复制</el-button>
                        </div>
                        <div class="le-deploy__item flex align-center">
                            <span class="le-item__label">消息加解密密钥<br />(EncodingAESKey)</span>
                            <span class="le-item__value" id="key">{{form.encodingAesKey}}</span>
                            <el-button type="text" class="le-view-guidelines" @click="copy('key')">复制</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="le-cardpin">
                <el-button @click="bind=false;toBind=false;">取消</el-button>
                <el-button type="primary" v-if="step === 1" @click="setStep(2, 'form')">下一步</el-button>
                <template v-if="step === 2">
                    <el-button @click="setStep(1, 'form')">上一步</el-button>
                    <el-button type="primary" @click="save('form')">保存</el-button>
                </template>
            </div>
        </template>
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
                        <div class="le-item__label">公众号名称</div>
                        <div class="le-item__value">{{form.name}}</div>
                    </div>
                    <div class="le-item flex">
                        <div class="le-item__label">公众号二维码</div>
                        <div class="le-item__value">
                            <div class="le-item--download" width="340" title="公众号二维码" :hide_cancel="true" sure_btn="下载二维码" module="channel" v-popup.uploadQrcode="qrcode">下载二维码</div>
                            <div class="le-item-tip">下载公众号二维码，用于推广与分享公众号</div>
                        </div>
                    </div>
                    <div class="le-item flex">
                        <div class="le-item__label">服务器配置</div>
                        <div class="le-item__value">
                            <div class="le-item--download" @click="router('/channel/Wechat-deploy')">查看配置</div>
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
    </div>
</template>
<script>
export default {
    name: "manualBinding",
    data() {
        return {
            form: {
                type: '',
                name: '',
                AppID: '',
                AppSecret: '',
                file_name: '',
                token: '',
                encodingAesKey: '',
                url: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入公众号名称', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择公众号类型', trigger: 'change' }
                ],
                AppID: [
                    { required: true, message: '请输入AppID', trigger: 'blur' },
                ],
                AppSecret: [
                    { required: true, message: '请输入AppSecret', trigger: 'blur' },
                ],
                file_name: [
                    { required: true, message: '请上传验证文件', trigger: 'change' },
                ]
            },
            load: false,
            bind: false,
            isBind: false,
            toBind: false,
            isPay: false,
            typeList: [{
                    label: '订阅号',
                    value: 10
                },
                {
                    label: '认证订阅号',
                    value: 11
                },
                {
                    label: '服务号',
                    value: 20
                },
                {
                    label: '认证服务号/认证政府订阅号/认证媒体订阅号',
                    value: 21
                }
            ],
            step: 1,
            qrcode: ''
        }
    },
    computed: {

    },
    mounted() {
        this.getConfig();
        this.getCode();
    },
    methods: {
        getConfig: function() {
            this.$heshop.appconfig('get').then(res => {
                res.apply.wechat.file_name = '';
                this.form = res.apply.wechat;
                this.isBind = !!res.apply.wechat.AppID;
                this.isPay = !!res.appPay.wechat.appid;
                this.load = true;
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        setStep: function(num, formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.step = num;
                }
            });
        },
        save: function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        type: this.form.type,
                        name: this.form.name,
                        AppID: this.form.AppID,
                        AppSecret: this.form.AppSecret,
                        token: this.form.token,
                        encodingAesKey: this.form.encodingAesKey
                    }
                    this.$heshop.appconfig('post', {
                            behavior: 'save',
                            key: 'apply_wechat'
                        },
                        data
                    ).then(() => {
                        this.$notify({
                            title: '保存成功',
                            message: '公众号手动绑定成功。',
                            type: 'success'
                        });
                        this.toBind = false;
                        this.$refs.upload.submit();
                    }).catch(err => {
                        console.error(err)
                        this.$message.error(err.data.message);
                    });
                }
            })
        },
        handleExceed: function(e, list) {
            this.$set(this.form, 'file_name', e[0].name);
        },
        handleChange: function(e) {
            this.$set(this.form, 'file_name', e.name);
        },
        upload(param) {
            var formData = new FormData();
            formData.append('file', param.file);
            this.$heshop.file(formData, { behavior: 'upload' }).then(() => {
            }).catch(err => {
                console.error("数据出出力", err)
            })
        },
        copy: function(id, attr = 'innerText') {
            let target = null;

            if (attr) {
                target = document.createElement('div');
                target.id = 'tempTarget';
                target.style.opacity = '0';
                if (id) {
                    let curNode = document.querySelector('#' + id);
                    target.innerText = curNode[attr];
                } else {
                    target.innerText = attr;
                }
                document.body.appendChild(target);
            } else {
                target = document.querySelector('#' + id);
            }

            try {
                let range = document.createRange();
                range.selectNode(target);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand('copy');
                window.getSelection().removeAllRanges();
            } catch (e) {
                console.error('复制失败')
            }

            if (attr) {
                target.parentElement.removeChild(target);
            }
        },
        router: function(path) {
            this.$router.push({
                path: path
            });
        },
        getCode: function() {
            this.$heshop.qrcode('post').then(res => {
                this.qrcode = res.wechat.image;
            }).catch((err) => {
                console.error(err);
                // this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style scoped lang="scss">
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
            background-image: url("./image/he-weChat.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            border-radius: 50%;
            position: absolute;
            top: -40px;
        }
    }
}

.le-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 80px;
}


.le-steps {
    width: 50%;
}


.he-title {
    margin-bottom: 24px;
}

.le-form {
    margin-top: 50px;

    /deep/.el-input {
        width: 360px;

        .el-input-group__append {
            background-color: #ffffff;
        }
    }

}

.le-view-guidelines {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #623ceb;
    padding: 0;
    margin-left: 16px;
}

.le-deploy {
    width: 40%;
    margin-top: 50px;
}

.le-deploy__item {
    margin-bottom: 20px;
}

.le-deploy-1 {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 44px;
    opacity: 0.85;
}

.le-deploy-1-text {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #8C8C8C;
}

.le-deploy-2 {
    margin-bottom: 35px;
}

.le-item__label {
    text-align: right;
    width: 123px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 20px;
    opacity: 0.65;
    margin-right: 15px;
    display: inline-block;
}

.le-item__value {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
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