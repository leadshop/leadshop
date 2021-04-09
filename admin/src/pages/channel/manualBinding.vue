<template>
    <div class="le-matter">
        <div class="he-title">
            <el-breadcrumb separator-class="el-icon-arrow-right" class="he-link-text">
                <el-breadcrumb-item class="he-link">
                    <he-link href="channel/index">
                        渠道管理
                    </he-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item class="he-link">
                    <he-link href="channel/bind" :query="{platform: platform}">
                        {{title}}
                    </he-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>手动绑定</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
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
                    <el-form-item label="AppID" prop="appId">
                        <el-input v-model="form.AppID" placeholder="请输入AppID"></el-input>
                    </el-form-item>
                    <el-form-item label="AppSecret" prop="appSecret">
                        <el-input v-model="form.AppSecret" placeholder="请输入AppSecret"></el-input>
                    </el-form-item>
                    <el-form-item label="验证文件" prop="file">
                        <el-input v-model="form.file_name">
                            <template slot="append">
                                <el-upload action="" ref="upload" :on-change="handleChange" :http-request="upload" :limit="1" :auto-upload="false" :show-file-list="false">选择文件</el-upload>
                            </template>
                        </el-input>
                        <el-button class="le-view-guidelines" module="channel" title="验证文件下载指引" type="text" width="720" :hide_close="true" height="676" v-popup.uploadGuide sure_btn="我知道了">查看指引</el-button>
                    </el-form-item>
                </el-form>
                <div class="le-deploy" v-show="step === 2">
                    <div class="le-deploy-1">服务器配置</div>
                    <div class="le-deploy-2">
                        <span class="le-deploy-1">请将以下信息填入微信公众号，并启用服务器配置。完成操作后，再保存此页面。</span>
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
        </el-card>
        <div class="le-cardpin">
            <el-button>取消</el-button>
            <el-button type="primary" v-if="step === 1" @click="setStep(2)">下一步</el-button>
            <template v-if="step === 2">
                <el-button @click="setStep(1)">上一步</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: "manualBinding",
    data() {
        return {
            title: '',
            platform: '',
            form: {
                type: '',
                name: '',
                AppID: '',
                AppSecret: '',
                file_name:'',
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
                appId: [
                    { required: true, message: '请输入AppID', trigger: 'blur' },
                ],
                appSecret: [
                    { required: true, message: '请输入AppSecret', trigger: 'blur' },
                ],
                file: [
                    { required: true, message: '请上传验证文件', trigger: 'blur' },
                ]
            },
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
            step: 1
        }
    },
    mounted() {
        let platform = this.$heshop.utils.getQueryVariable('platform');
        this.platform = platform;
        switch (platform) {
            case "applets":
                this.title = "绑定小程序";
                break;
            case "wechat":
                this.title = "绑定公众号";
                break;
        }

        this.getConfig();
    },
    methods: {
        getConfig: function() {
            this.$heshop.appconfig('get').then(res => {
                this.form = res.apply.wechat
                this.form.file_name = ''
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        setStep: function(num) {
            this.step = num;
        },
        save: function() {
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
            ).then(res => {
                this.$notify({
                    title: '保存成功',
                    message: '公众号手动绑定成功。',
                    type: 'success'
                });
                this.$refs.upload.submit();
            }).catch(err => {
                console.error(err)
                this.$message.error(err.data.message);
            })
        },
        handleChange: function(e) {
            this.form.file_name = e.name;
            this.$forceUpdate();
        },
        upload(param){
            var formData = new FormData();
            formData.append('file', param.file);
            this.$heshop.file(formData, { behavior: 'upload' }).then(() => {
            }).catch(error => {
                console.error("数据出出力", error)
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
                // remove temp target
                target.parentElement.removeChild(target);
            }
        }
    }
};
</script>
<style scoped>
.flex {
    display: flex;
}

.flex-direction {
    flex-direction: column;
}

.le-steps {
    width: 60%;
}

.align-center {
    align-items: center;
}

.he-title {
    margin-bottom: 24px;
}

.le-form {
    margin-top: 50px;
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
</style>
