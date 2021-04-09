<template>
    <div class="le-matter" v-loading="loading">
        <div class="le-line flex align-center">
            <span class="le-sign"></span>
            <span class="le-text">当前首页</span>
        </div>
        <div class="le-body flex flex-wrap">
            <div class="le-mobile">
                <iframe class="le-mobile__img" :src="origin" alt=""></iframe>
                <div class="le-mobile__box"></div>
            </div>
            <div class="flex-sub le-content">
                <div>
                    <el-button type="primary" @click="router">编辑首页</el-button>
                </div>
                <div class="le-content__text">
                    <span class="le-text">首页名称:</span>
                    <span class="le-store">{{firstPage.title}}</span>
                </div>
                <div class="le-promote flex">
                    <div class="le-menu">
                        <div class="le-menu__item" @click="active = 0;" :class="{'le-menu__active' : active === 0}">微信小程序</div>
                        <div class="le-menu__item" @click="active = 1;" :class="{'le-menu__active' : active === 1}">公众号</div>
                    </div>
                    <div class="le-poster">
                        <div class="le-zoom" id="poster-other">
                            <div class="le-poster__content">
                                <img class="le-poster__icon" :src="store_info.logo" alt="">
                                <div class="le-poster__name">{{store_info.name}}</div>
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
                        <el-button class="le-btn" @click="downLoadQrcode">仅下载{{active=== 0?`小程序`:`公众号`}}码</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="le-line flex align-center">
            <span class="le-sign"></span>
            <span class="le-text">我的模板</span>
        </div>
        <div class="le-footer">
            <div class="le-footer__content flex flex-wrap">
                <div class="le-item" v-for="(item, index) in list" :key="index">
                    <div class="le-item__content flex flex-direction">
                        <div class="le-item__body">
                            <div class="le-item__img__content">
                                <img class="le-item__img" :src="item.image" alt="">
                            </div>
                            <div class="le-item__preview flex flex-direction justify-center align-center">
                                <el-button class="he-btn__top" type="primary" @click="putPage(item)">启用模板</el-button>
                                <el-button class="he-btn__bottom" @click="preview(item.image)">预览模板</el-button>
                            </div>
                        </div>
                        <div class="le-bottom flex-sub">
                            <div class="he-name">{{item.name}}</div>
                            <div class="he-user">设计师：{{item.writer}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex justify-end le-pagination">
                <el-pagination background @current-change="currentChange" :current-page="page.current" :page-count="page.count" layout="prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
        <he-loading :show="load"></he-loading>
    </div>
</template>
<script type="text/javascript">
import html2canvas from "html2canvas";
import copy from "@/lib/function/copy";
import heLoading from "../../components/heloading2.vue";
export default {
    components: {
        heLoading
    },
    data() {
        return {
            menuActive: '1',
            list: [],
            page: {},
            store_info: {},
            qrcode: null,
            active: 0,
            promote: {

            },
            firstPage: {},
            origin: '',
            loading: true,
            load: false
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        qrcodeImg: function() {
            if (this.qrcode) {
                if (this.active === 0) {
                    return this.qrcode.weapp.image;
                } else {
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
                } else {
                    return this.qrcode.wechat.url;
                }
            } else {
                return '';
            }
        }
    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {
        this.origin = $_W.AppURL + '/h5/';
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        await this.getIndex();
        this.list = await this.getTemplate();
        await this.getStore();
        this.loading = false;
        await this.getQrcode();
    },
    methods: {
        preview: function(image) {
            let router = this.$router.resolve({
                path: '/store/pagePreview',
                query: {
                    img: encodeURIComponent(image)
                }
            });
            window.open(router.href, '_blank');
        },
        router: function() {
            this.$router.push({
                path: '/package/index',
                query: {
                    id: this.firstPage.id
                }
            });
        },
        menuSelect: function(index) {
            this.menuActive = index;
        },
        currentChange: function(e) {
            this.page.current = e;
            this.getTemplate();
        },
        getTemplate: function() {
            let _this = this;
            return new Promise((resolve, reject) => {
                _this.$heshop.pagetemplate('get').then(function(res) {
                    let { data, headers } = res;
                    _this.page = {
                        current: +headers['x-pagination-current-page'],
                        count: +headers['x-pagination-page-count'],
                        size: +headers['x-pagination-per-page'],
                        total: +headers['x-pagination-total-count']
                    }
                    resolve(data);
                }).catch(function(err) {
                    console.error(err);
                    reject(err);
                });
            });
        },
        putPage: function(item) {
            let _this = this;
            this.load = true;
            this.$heshop.pagetemplate('get', item.id).then(function(res) {
                _this.$heshop.pages("POST", { name: "新建微页面", title: (new Date()).valueOf(), content: res.content }).then(function(data) {
                    _this.load = false;
                    _this.$router.push({ path: '/package/index', query: { id: data.id } });
                }).catch(function(error) {
                    console.error("错误信息", error);
                });
            });
        },
        getIndex: function() {
            let _this = this;
            this.$heshop.pages('get', {
                behavior: 'firstPage'
            }).then(function(res) {
                _this.firstPage = res;
            })
        },
        getStore() {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.$heshop.search('post', { include: 'setting' }, { keyword: 'setting_collection', content_key: 'store_setting' }).then(res => {
                    _this.store_info = res;
                    resolve();
                }).catch((err) => {
                    this.$message.error(err.data.message);
                    reject();
                });
            });
        },
        getQrcode() {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.$heshop.qrcode('post', {
                    page: 'pages/index/index'
                }).then(res => {
                    _this.qrcode = res;
                    resolve()
                }).catch((err) => {
                    this.$message.error(err.data.message);
                    reject();
                });
            });
        },
        downLoad() {
            let id = 'poster-other';
            new html2canvas(document.getElementById(id), {
                backgroundColor: "transparent",
                useCORS: true,
            }).then(canvas => {
                let base64 = canvas.toDataURL('image/jpeg');
                this.downloadFile(base64, this.store_info.name);
            });
        },
        downLoadQrcode() {
            if (this.active === 0) {
                this.downloadFile(this.qrcode.weapp.image, this.store_info.name);
            } else {
                this.downloadFile(this.qrcode.wechat.image, this.store_info.name);
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
        copy: function() {
            let _this = this;
            copy({
                content: _this.active === 0 ? _this.qrcode.weapp.url : _this.qrcode.wechat.url,
                success: function() {
                    _this.$message.success("复制成功")
                }
            });
        },
    }
};
</script>
<style lang="less" scoped="true">
.le-matter {
    position: relative;
}

.le-line {
    .le-sign {
        display: inline-block;
        width: 4px;
        height: 16px;
        background: #623CEB;
        margin-right: 12px;
    }

    .le-text {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.85;
    }
}

.le-body {
    margin-top: 15px;

    .le-mobile {
        min-width: 380px;
        height: 680px;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-radius: 40px;
        margin-right: 24px;
        padding: 38px 20px;
        box-sizing: border-box;
        margin-bottom: 25px;
        position: relative;

        .le-mobile__img {
            width: 340px;
            height: 603px;
            border: 1px solid #DCDFE6;
        }

        .le-mobile__box {
            position: absolute;
            top: 38px;
            width: 340px;
            height: 603px;
            background-color: transparent;
        }
    }

    .le-content {
        height: 680px;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 40px 0 0 40px;
        box-sizing: border-box;
        margin-bottom: 25px;
    }

    .le-content__text {
        margin-top: 24px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
    }

    .le-text {
        opacity: 0.45;
    }

    .le-store {
        opacity: 0.85;
        margin-left: 9px;
    }

    .le-promote {
        //padding: 0 0 20px 0;
        margin-top: 24px;
        padding: 32px 32px 32px 0;
        width: 762px;
        height: 300px;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-radius: 8px;

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
            color: rgba(0, 0, 0, 0.65);
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
                    position: absolute;
                    top: 0;
                    left: 50%;
                    border-radius: 50%;
                    transform: translate(-50%, -50%);
                }

                .le-poster__name {
                    font-size: 32px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(0, 0, 0, .85);
                }

                .le-poster__shop {
                    font-size: 24px;
                    font-family: PingFang SC;
                    font-weight: 500;
                    color: rgba(0, 0, 0, .65);
                    margin-top: 18px;
                }

                .le-hr {
                    width: 548px;
                    height: 1px;
                    background-color: #D7D7D7;
                    margin-top: 55px;
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
                    color: rgba(0, 0, 0, .45);
                    margin-top: 15px;
                }
            }
        }

        .le-edit {
            .le-title {
                font-size: 14px;
                font-family: Microsoft YaHei;
                font-weight: 400;
                color: rgba(0, 0, 0, 0.65);
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

    .le-menu {
        width: 140px;
        height: 100%;

        .el-menu-item {
            padding: 0 !important;
            text-align: center;
        }

        .el-menu-item:hover,
        .el-menu-item:focus {
            background-color: #FFFFFF;
        }
    }

}

.le-footer {
    margin-top: 16px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 40px 0 0 40px;

    .le-item {
        position: relative;
        width: 186px;
        height: 417px;
        margin: 0 20px 20px 0;
    }

    .le-item__content {
        width: 186px;
        height: 417px;
        background: #FFFFFF;
        border: 1px solid #DEE1E7;
        border-radius: 4px;
        cursor: pointer;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;

        .le-item__body {
            width: 186px;
            height: 327px;
            border-radius: 4px 4px 0 0;
            position: relative;
        }

        .le-item__img {
            width: 186px;
            display: block;
        }

        .le-item__img__content {
            width: 186px;
            height: 327px;
            overflow: hidden;
        }

        .le-item__preview {
            position: absolute;
            top: 0;
            width: 186px;
            height: 327px;
            opacity: 0;
            background-color: rgba(0, 0, 0, .3);
            border-radius: 4px 4px 0 0;
        }

        .le-bottom {
            font-family: PingFang SC;
            font-weight: 500;
            color: #000000;
            padding: 15px 10px;
        }

        .he-btn__top {
            width: 104px;
            height: 32px;
            background: #623CEB;
            border-radius: 4px;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
            margin: 0 0 8px 0;
        }

        .he-btn__bottom {
            width: 104px;
            height: 32px;
            border: 1px solid #FFFFFF;
            border-radius: 4px;
            background-color: transparent;
            font-size: 14px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FEFEFF;
            margin: 8px 0 0 0;
        }

        .he-name {
            font-size: 14px;
            opacity: 0.85;
            margin-bottom: 7px;
        }

        .he-user {
            font-size: 12px;
            opacity: 0.45;
        }
    }

    .le-item__content:hover {
        top: -7px;
    }

    .le-item__content:hover .le-item__preview {
        opacity: 1;
    }

    .le-pagination {
        padding: 0 40px 40px 0;
    }
}
</style>