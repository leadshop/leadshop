<template>
    <div class="le-install">
        <div class="le-install-header">
            <img alt="" class="le-header-logo" src="./assets/logo.png"/>
        </div>
        <div class="le-install-body">
            <div class="le-body-content">
                <div class="le-steps">
                    <ul>
                        <li :class="step === 0 ? '' : 'le-steps-before'" class="active" style="z-index: 3;cursor:pointer;">
                            <div class="center">
                                1.参数配置
                            </div>
                        </li>
                        <li :class="step > 0 ? 'active' : ''">
                            <div class="center">
                                2.安装
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="le-steps-one" v-if="step === 0">
                    <le-table style="margin-bottom: 24px;" title="MySQL数据库配置">
                        <le-form-item label="数据库服务器" required style="margin-top: 41px;">
                            <le-input placeholder="请输入服务器的IP或域名" v-model="form.db_host">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="数据库端口" required tips="默认的端口为3306">
                            <le-input placeholder="请输入服务器的数据库端口" v-model="form.db_port">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="数据库用户" required>
                            <le-input placeholder="请输入数据库用户名" v-model="form.db_username">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="数据库密码" required>
                            <le-input placeholder="请输入数据库密码" v-model="form.db_password">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="数据库名称" required>
                            <le-input placeholder="请输入数据库名称" v-model="form.db_name">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="数据库表前缀" required style="margin-bottom: 48px">
                            <le-input placeholder="请输入数据库表前缀" v-model="form.db_prefix">
                            </le-input>
                        </le-form-item>
                    </le-table>
                    <le-table title="超级管理员">
                        <le-form-item label="管理员账号" required style="margin-top: 41px;">
                            <le-input type="number" placeholder="请输入手机号" v-model="form.admin_username">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="管理员密码" required>
                            <le-input placeholder="请输入管理员密码" v-model="form.admin_password">
                            </le-input>
                        </le-form-item>
                        <le-form-item label="确认管理员密码" required style="margin-bottom: 48px">
                            <le-input placeholder="请再次输入管理员密码" v-model="password_check">
                            </le-input>
                        </le-form-item>
                    </le-table>
                    <button @click="onPost" class="le-btn le-steps__btn">
                        继续
                    </button>
                </div>
                <div class="le-steps-two flex flex-direction align-center justify-center" v-if="step === 1">
                    <img alt="" class="le-upload__img" src="./assets/upload.gif"/>
                    <div class="le-upload__text">
                        正在安装中，请稍后...
                    </div>
                </div>
                <div class="le-steps-three flex flex-direction align-center" v-if="step === 2">
                    <img alt="" class="le-upload__success" src="./assets/uplaod-success.png"/>
                    <div class="le-success__text">
                        安装成功！进入管理后台
                    </div>
                    <div class="le-version">
                        版本号1.0.0
                    </div>
                    <button class="le-btn le-three-btn" @click="goHome">
                        进入管理后台
                    </button>
                </div>
            </div>
            <div class="le-body-copy">
                Copyright © 2020-2021 浙江禾成云计算有限公司 浙ICP备2020042526号
            </div>
        </div>
    </div>
</template>
<script>
import leTable from "@/components/le-table.vue";
import leInput from "@/components/le-input.vue";
import leFormItem from "@/components/le-form-item.vue";
import axios from 'axios';
export default {
    name: 'App',
    components: {
        leTable,
        leInput,
        leFormItem
    },
    data() {
        return {
            origin:'http://www.test.com',
            form: {
                db_prefix:'',
                db_host:'',
                db_port:'3306',
                db_username:'',
                db_password:'',
                db_name:'',
                admin_username:'',
                admin_password:''
            },
            password_check:'',
            step: 0
        }
    },
    async mounted() {
        this.origin = window.location.origin;
        this.getCheck();
    },
    methods: {
        getCheck() {
            axios({
                method:'get',
                url:this.origin+'/api/leadmall/install'
            }).then(res=>{
                if (res.data) {
                    this.step = 2;
                } else {
                    this.step = 0;
                }
            }).catch(err=>{
                alert(err.response.data.message);
            })
        },
        onPost(){
            if (this.form.admin_password !== this.password_check) {
                alert('两次管理员密码不一致');
                return;
            }
            this.step = 1;
            axios({
                method:'post',
                url:this.origin+'/api/leadmall/install',
                timeout:30000,
                data:this.form
            }).then(()=>{
                this.step = 2;
            }).catch(err=>{
                this.step = 0;
                alert(err.response.data.message);
            })
        },
        goHome(){
            window.location.href=this.origin+'/leadshop/login/index';
        }
    }
}
</script>
<style>
    @import "./assets/css/index.css";
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    box-sizing: border-box;
}
.le-install {
    width: 100%;
    height: 100vh;
    background-color: #F3F5F7;
}
.le-install-header {
    height: 64px;
    background: #FFFFFF;
    position: relative;
}
.le-header-logo {
    width: 150px;
    height: 40px;
    position: absolute;
    left: 120px;
    top: 13px;
}
.le-install-body {
    height: calc(100vh - 64px);
    overflow-y: auto;
}
.le-body-copy {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #8C8C8C;
    line-height: 14px;
    padding: 31px 0 38px 0;
    text-align: center;
    box-sizing: border-box;
}
.le-body-content {
    background: #FFFFFF;
    border-radius: 16px;
    margin: 24px auto 0 auto;
    width: 1200px;
    padding-top: 56px;
    box-sizing: border-box;
    overflow: hidden;
}
.le-install-body::-webkit-scrollbar{
    width:8px;
}
.le-install-body::-webkit-scrollbar-track{
    background: rgb(239, 239, 239);
    border-radius:2px;
}
.le-install-body::-webkit-scrollbar-thumb{
    background: #bfbfbf;
    border-radius:10px;
}
.le-install-body::-webkit-scrollbar-corner{
    background: #179a16;
}
.le-steps {
    margin: 0 56px 0 56px;
    width: 1088px;
    height: 48px;
    position: relative;

}

.le-steps ul {
    list-style-type: none;
    padding: 0;
    margin: 0
}

.le-steps ul li {
    position: relative;
    float: left;
    width: 50%;
    height: 48px;
    background: #fff;
}

.le-steps ul li .center {
    width: 30%;
    height: 48px;
    line-height: 48px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    top: 0;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-left: -15%
}


.le-steps ul li:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 0;
    right: -48px;
    width: 0;
    height: 0;
    border: 24px solid #FFFF;
    border-right-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent
}
.le-steps ul li:not(:first-child)::before {
    content: "";
    position: absolute;
    top: -5px;
    left: -2px;
    width: 0;
    height: 0;
    border: 29px solid #fff;
    border-right-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent
}
.le-steps ul li.active {
    background-color: #623ceb;
    color: #fff
}

.le-steps ul li.active:not(:last-child)::after {
    border-left-color: #623ceb;
    border-right-color: transparent;
    border-top-color: transparent;
    border-bottom-color: transparent
}
.le-steps-one {
    margin-top: 40px;
    overflow: hidden;
}
.le-steps__btn {
    width: 80px;
    height: 40px;
    line-height: 14px;
    margin: 40px auto 56px auto;
}
.le-btn {
    background: #623CEB;
    border-radius: 4px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;
    display: block;
    border: none;
}
.le-btn:focus {
    outline: none;
}
.le-steps-two {
    width: 800px;
    height: 500px;
    border: 2px solid #F3F5F7;
    border-radius: 8px;
    margin: 40px auto 85px auto;
}
.le-upload__img {
    width: 200px;
    height: 200px;
    margin-bottom: 24px;
}
.le-upload__text {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #595959;
    margin-top: 24px;
}
.le-steps-three {
    width: 800px;
    height: 500px;
    border: 2px solid #F3F5F7;
    border-radius: 8px;
    margin: 40px auto 85px auto;
}
.le-upload__success {
    width: 160px;
    height: 160px;
    margin-top: 75px;
}
.le-success__text {
    font-size: 20px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #262626;
    margin-top: 5px;
}
.le-version {
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(140, 140, 140, 0.65);
    margin-top: 12px;
}
.le-three-btn {
    width: 144px;
    height: 40px;
    margin-top: 30px;
}
</style>
