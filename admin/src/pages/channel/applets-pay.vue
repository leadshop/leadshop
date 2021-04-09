<template>
    <div class="le-matter">
        <el-form class="le-form" :rules="rules" ref="bind" :model="form" label-width="190px">
            <div class="le-form__header flex align-center">
                <span class="le-tip"></span>
                <span class="le-text">支付配置</span>
            </div>
            <el-form-item label="支付方式">
                <span class="le-text">微信支付</span>
            </el-form-item>
            <el-form-item label="支付类型">
                <span class="le-text">普通商户</span>
            </el-form-item>
            <el-form-item label="微信AppID" prop="appid">
                <el-input placeholder="请输入微信AppID" v-model="form.appid"></el-input>
            </el-form-item>
           <el-form-item label="微信支付商户号" prop="mchid">
               <el-input placeholder="请输入微信支付商户号" v-model="form.mchid"></el-input>
           </el-form-item>
           <el-form-item label="微信支付Api密钥" prop="key">
               <el-input placeholder="请输入微信支付Api密钥" v-model="form.key"></el-input>
           </el-form-item>
            <el-form-item prop="certPem">
                <span slot="label">
                    微信支付<br/>
                    apiclient_cert.pem
                </span>
                <el-input v-model="form.certPem" type="textarea"  resize="none" :rows="5"  placeholder="请输入微信支付apiclient_cert.pem"></el-input>
            </el-form-item>
            <el-form-item prop="keyPem">
                 <span slot="label">
                    微信支付<br/>
                    apiclient_key.pem
                </span>
                <el-input type="textarea" v-model="form.keyPem" resize="none" :rows="5"  placeholder="请输入微信支付apiclient_key.pem"></el-input>
            </el-form-item>
        </el-form>
        <div class="le-cardpin">
            <el-button type="primary" @click="save('bind')">保存</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "applets-pay",
    data() {
        return {
            form: {
                appid: '',
                isService: 0
            },
            rules: {
                appid: [
                    { required: true, message: '请输入微信AppID', trigger: 'blur' },
                ],
                mchid: [
                    { required: true, message: '请输入微信支付商户号', trigger: 'blur' },
                ],
                key: [
                    { required: true, message: '请输入微信支付Api密钥', trigger: 'blur' }
                ],
                certPem: [
                    { required: true, message: '请输入微信支付apiclient_cert.pem', trigger: 'blur' }
                ],
                keyPem: [
                    { required: true, message: '请输入微信支付apiclient_key.pem', trigger: 'blur' }
                ],
            }
        }
    },
    methods: {
        save: function(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$heshop.appconfig('post', {
                            behavior: 'save',
                            key: 'appPay_weapp'
                        },
                        this.form
                    ).then(res => {
                        this.$notify({
                            title: '保存成功',
                            message: '微信支付手动绑定成功。',
                            type: 'success'
                        });
                        this.toBind = false;
                        this.bind = false;
                    }).catch(err => {
                        this.$message.error(err.data.message);
                    });
                }
            });
        },
        getConfig: function() {
            this.$heshop.appconfig('get').then(res => {
                this.form = res.appPay.wechat;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    },
    mounted() {
        this.getConfig();
    }
}
</script>

<style scoped lang="scss">
.le-matter {

}
.le-form {
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
    }
    .el-input--mini {
        width: 280px;
    }
    .le-text {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #262626;
    }
}
</style>
