<template>
    <div class="le-matter le-promote flex" v-loading="loading">
        <div class="le-menu">
            <div class="le-menu__item" @click="active = 0;" :class="{'le-menu__active' : active === 0}">微信小程序</div>
            <div class="le-menu__item" @click="active = 1;" :class="{'le-menu__active' : active === 1}">公众号</div>
        </div>
        <div class="le-poster">
            <div class="le-zoom" id="poster-goods" v-if="promoteType === 'goods'">
                <img class="le-img" :src="newData.slideshow[0]" alt="">
                <div class="le-content flex">
                    <div class="le-left flex-sub flex flex-direction justify-between">
                        <div>
                            <div class="le-price">
                                <span class="le-sell-price">{{newData.price}}</span>
                                <span class="le-line-price">￥{{newData.line_price}}</span>
                            </div>
                            <div class="le-name">
                                {{newData.name | getName}}
                            </div>
                        </div>
                        <div class="le-shop flex align--center">
                            <img class="le-shop__img" :src="store_info.logo" alt="">
                            <span class="le-shop__name">{{store_info.name}}</span>
                        </div>
                    </div>
                    <div class="le-right">
                        <img class="le-qrcode" :src="qrcodeImg" alt="">
                        <div class="le-text">长按识别{{active===0?`小程序`:`公众号`}}码</div>
                    </div>
                </div>
            </div>
            <div class="le-zoom" id="poster-other" v-else-if="promoteType === 'group' || promoteType === 'index' || promoteType === 'pages'">
                <div class="le-poster__content">
                    <img class="le-poster__icon" :src="promoteType === 'group' ? newData.icon : promoteType === 'pages' ? store_info.logo: store_info.logo " alt="">
                    <div class="le-poster__name">{{promoteType === 'group' ? newData.name : promoteType === 'pages' ? store_info.name: store_info.name}}</div>
                    <div class="le-poster__shop" v-if="promoteType === 'group'">{{ store_info.name }}</div>
                    <div class="le-hr"></div>
                    <img :src="qrcodeImg" class="le-qrcode" alt="">
                    <div class="le-text">长按识别{{active===0?`小程序`:`公众号`}}码</div>
                </div>
            </div>
        </div>
        <div class="le-edit flex-sub">
            <div class="le-title">{{active===0?`小程序路径`:`公众号链接`}}</div>
            <el-input :value="url" class="le-url" disabled>
                <el-button @click="copy()" slot="append">
                    复制
                </el-button>
            </el-input>
            <el-button class="le-btn" @click="downLoad">下载海报</el-button>
            <el-button class="le-btn" @click="downLoadQrcode" >仅下载{{active=== 0?`小程序`:`公众号`}}码</el-button>
        </div>
    </div>
</template>

<script>
import html2canvas from "html2canvas";
import copy from "@/lib/function/copy.js";

export default {
    name: "promote",
    props: {
        value: {
            type: Object,
            default: function () {
                return '';
            }
        }
    },
    computed: {
        promoteType: function() {
            return this.value.promoteType;
        },
        newData: function() {
            return this.value.data;
        },
        qrcodeImg: function() {
            if (this.qrcode) {
                if (this.active === 0) {
                    return this.qrcode.weapp.image;
                } else  {
                    return this.qrcode.wechat.image;
                }
            } else {
                return '';
            }
        },
        url: function() {
            if (this.qrcode) {
                if (this.active === 0) {
                    return this.qrcode.weapp.url;
                } else  {
                    return this.qrcode.wechat.url;
                }
            } else {
                return '';
            }
        }
    },
    data() {
        return {
            loading: false,
            active: 0,
            store_info: {},
            qrcode: null
        }
    },
    methods: {
        getStore() {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.$heshop.search('post', { include: 'setting' }, { keyword: 'setting_collection', content_key: 'store_setting' }).then(res => {
                    _this.store_info = res;
                    resolve();
                }).catch((err) => {
                    console.error(err);
                    reject();
                });
            });
        },
        getQrcode() {
            let _this = this;
            let data = {};
            if (this.promoteType === 'goods') {
                data.page = 'pages/goods/detail';
                data.scene = 'id='+_this.newData.id;
            } else if (this.promoteType === 'group') {
                data.page = 'pages/categories/index';
                data.scene = 'id='+_this.newData.id;
            } else if (this.promoteType === 'index') {
                data.page = 'pages/index/index';
            } else if (this.promoteType === 'pages') {
                data.page = 'pages/index/index';
                data.scene = 'id='+ _this.newData.id;
            }
            return new Promise(function(resolve, reject) {
                _this.$heshop.qrcode('post', data).then(res => {
                    _this.qrcode = res;
                    resolve()
                }).catch((err) => {
                    console.error(err);
                    if (err.status === 403) {
                        _this.$message.error(err.message);
                    }
                    reject();
                });
            });
        },
        copy: function() {
            let _this = this;
            copy({
                content: _this.active === 0 ? _this.qrcode.weapp.url : _this.qrcode.wechat.url,
                success: function() {
                    _this.$message.success("复制成功")
                }
            });
        },
        downLoad() {
            let id = '';
            if (this.promoteType === 'goods') {
                id = 'poster-goods';
            } else if (this.promoteType === 'group') {
                id = 'poster-other';
            } else if (this.promoteType === 'index') {
                id = 'poster-other';
            } else if (this.promoteType === 'pages') {
                id = 'poster-other';
            }
            let name = '';
            if (this.promoteType === 'goods') {
                name = this.newData.name;
            } else if (this.promoteType === 'group') {
                name = this.newData.name;
            } else if (this.promoteType === 'index') {
                name = this.store_info.name;
            }
            new html2canvas(document.getElementById(id), {
                backgroundColor: "transparent",
                useCORS: true,}).then(canvas => {
                let base64 = canvas.toDataURL('image/jpeg');
                this.downloadFile(base64, name);
            });
        },
        downLoadQrcode() {
            let name = '';
            if (this.promoteType === 'goods') {
                name = this.newData.name;
            } else if (this.promoteType === 'group') {
                name = this.newData.name;
            } else if (this.promoteType === 'index') {
                name = this.store_info.name;
            }
            if (this.active === 0) {
                this.downloadFile(this.qrcode.weapp.image, name);
            } else {
                this.downloadFile(this.qrcode.wechat.image, name);
            }
        },
        downloadFile(content, fileName) { //下载base64图片
            let base64ToBlob = function(code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;
                let uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {
                    type: contentType
                });
            };
            let aLink = document.createElement('a');
            let blob = base64ToBlob(content); //new Blob([content]);
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
        },
    },
    mounted() {
        this.loading = true;
        let _this = this;
        Promise.all([this.getStore(), this.getQrcode()]).then(function() {
            _this.loading = false;
        }).catch(function(err) {
            _this.$message.error(err.message);
            _this.loading = false;
        });
    },
    filters: {
        getName(name) {
            if (name.length > 20) {
                return name.slice(0, 20) + '...';
            } else {
                return name;
            }
        }
    }
}
</script>

<style scoped lang="scss">
.le-promote {
    padding: 0 0 20px 0;
    .le-menu {
        width: 140px;
        border-right: 1px solid #DCDFE6;
    }
    .le-menu__item {
        line-height: 1;
        text-align: center;
        padding: 12px 0;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(0,0,0,0.65);
        cursor: pointer;
    }
    .le-menu__active {
        color: #623CEB;
    }
    .le-poster {
        width: 240px;
        margin: 0 16px 0 32px;
    }
    .le-zoom {
        zoom: 0.32;
    }
    #poster-goods {
        width: 750px;
        height: 1046px;
        padding: 32px;
        background-color: RGBA(242, 244, 246, 1);
        .le-img {
            width: 686px;
            height: 686px;
            border-radius: 16px;
        }
        .le-content {
            width: 686px;
            height: 280px;
            background: #FFFFFF;
            box-shadow: 0 0 32px 0 rgba(33, 34, 36, 0.06);
            border-radius: 16px;
            margin-top: 16px;
            padding: 32px;
            .le-left {
                .le-price {
                    .le-sell-price {
                        font-size: 40px;
                        font-family: Microsoft YaHei;
                        font-weight: 400;
                        color: #F5212D;
                    }
                    .le-line-price {
                        font-size: 28px;
                        font-family: PingFang SC;
                        font-weight: 500;
                        text-decoration: line-through;
                        color: rgba(0,0,0,0.45);
                        margin-left: 23px;
                    }
                    .le-sell-price:before {
                        content: '￥';
                        font-size: 80%;
                    }
                }
                .le-name {
                    font-size: 32px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(0,0,0,0.85);
                }
                .le-shop {
                    .le-shop__img {
                        width: 48px;
                        height: 48px;
                        border-radius: 50%;
                    }
                    .le-shop__name {
                        font-size: 24px;
                        font-family: PingFang SC;
                        font-weight: 500;
                        color: rgba(0,0,0,.65);
                        line-height: 48px;
                    }
                }
            }
            .le-right {
                margin-left: 59px;
                width: 180px;
                text-align: center;
                .le-qrcode {
                    width: 180px;
                    height: 180px;
                }
                .le-text {
                    font-size: 22px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(0,0,0,0.45);
                }
            }
        }
    }
    #poster-other {
        width: 750px;
        height: 728px;
        background: #F3F5F7;
        padding: 104px 32px 32px 32px;
        .le-poster__content {
            width: 686px;
            height: 592px;
            background: #FFFFFF;
            border-radius: 16px;
            position: relative;
            text-align: center;
            padding: 115px 69px 0 69px;
            .le-poster__icon {
                width: 160px;
                height: 160px;
                border-radius: 50%;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%,-50%);
            }
            .le-poster__name {
                font-size: 32px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(0,0,0,.85);
            }
            .le-poster__shop {
                font-size: 24px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(0,0,0,.65);
                margin-top: 18px;
            }
            .le-hr {
                width: 548px;
                height: 1px;
                background-color: #D7D7D7;
                margin-top: 65px;
            }
            .le-qrcode {
                width: 180px;
                height: 180px;
                margin-top: 51px;
            }
            .le-text {
                font-size: 22px;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(0,0,0,.45);
                margin-top: 15px;
            }
        }
    }
    .le-edit {
        .le-title {
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(0,0,0,0.65);
            margin: 13px 0;
        }
        .le-url {
            width: 100%;
            margin-bottom: 16px;
            /deep/.el-input-group__append {
                width: 59px;
                height: 34px;
                padding: 0;
                background: #623CEB;
                text-align: center;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                color: #FFFFFF;
                position: relative;
                top: -1px;
                .el-button--default {
                    padding: 0;
                }
            }
            /deep/.el-input__inner {
                background-color: RGBA(243, 245, 247, 1);
                padding-right: 0;
            }
        }
        .le-btn {
            border: 1px solid #623CEB;
            background: #FFFFFF;
            border-radius: 4px;
            font-weight: 400;
            color: #623CEB;
            font-family: Microsoft YaHei;
            font-size: 12px;
            height: 32px;
        }
        .le-btn:first-child {
            width: 96px;
        }
        .le-btn:last-child {
            width: 128px;
        }
    }
}
</style>
