<template>
    <div class="le-login">
        <div class="le-login__content">
            <div class="le-content__body">
                <div class="le-body__icon"></div>
                <div class="le-body__form">
                    <div class="le-form__item">
                        <div class="le-label">手机号</div>
                        <el-input v-model="postData.mobile" autocomplete="off" class="le-value"></el-input>
                    </div>
                    <div class="le-form__item">
                        <div class="le-label">密码</div>
                        <el-input v-model="postData.password" autocomplete="off" type="password" class="le-value"></el-input>
                    </div>
                    <el-button class="le-login-submit" :disabled="disabled"  @click="submitForm()">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers('setting');

export default {
    data() {
        return {
            postData: {
                mobile: '',
                password: ''
            }
        };
    },
    computed: {
        disabled: function() {
            return !(this.postData.mobile && this.postData.password);
        }
    },
    methods: {
        ...mapActions(['getSettingInfo']),
        submitForm() {
            this.$heshop.login("post", this.postData).then(data => {
                this.$store.commit('apply/login', data);
                this.getSettingInfo();
                setTimeout(() => {
                    this.$router.push({ path: `/panel/index` }).catch(error => {
                        console.error("路由跳转错误", error)
                    });
                }, 1000);
            }).catch(err => {
                if (err.data && err.data.message) {
                    this.$message.error(err.data.message);
                } else {
                    this.$message.error('系统出错');
                }
            });
        }
    }
};
</script>

<style lang="less" >
@import "./login.less";
</style>