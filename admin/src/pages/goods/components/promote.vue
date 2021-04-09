<template>
    <div class="le-main flex">
        <el-menu @close="handleClose" @open="handleOpen" class="le-menu" default-active="1">
            <el-menu-item @click="chooseType(1)" class="le-menu__item" index="1">
                <span slot="title">
                    微信小程序
                </span>
            </el-menu-item>
            <el-menu-item @click="chooseType(2)" class="le-menu__item" index="2">
                <span slot="title">
                    公众号
                </span>
            </el-menu-item>
        </el-menu>
        <div class="flex flex-sub">
            <div id="promote">
                <div class="he-poster">
                    <div class="he-poster__body">
                        <img :src="value.slideshow[0]" alt="" class="he-poster__icon"/>
                        <div class="he-poster__info">
                            <div class="he-info__left">
                                <div>
                                    <span class="he-poster__price">
                                        <span style="font-size:40px;">
                                            ￥
                                        </span>
                                        {{ value.price }}
                                    </span>
                                    <span class="he-poster__line__price">
                                        ￥{{ value.line_price }}
                                    </span>
                                </div>
                                <div class="he-poster__name">
                                    {{ value.name | getName }}
                                </div>
                                <div class="he-poster__shop">
                                    <img :src="store_info.logo" alt="" class="he-poster__shop__logo"/>
                                    <span class="he-poster__shop__name">
                                        {{ store_info.name }}
                                    </span>
                                </div>
                            </div>
                            <div class="he-info__right">
                                <img :src="qrcode.weapp.image" alt="" class="he-poster__QRCode"
                                     v-if="qrcode.weapp.image && type==1">
                                <img :src="qrcode.wechat.image" alt="" class="he-poster__QRCode"
                                     v-if="qrcode.wechat.image && type==2">
                                <p class="he-poster__sign">
                                    长按识别{{ type == 1 ? `小程序` : `公众号` }}码
                                </p>
                                </img>
                                </img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-sub">
                <div class="he-title">
                    {{ type == 1 ? `小程序路径` : `公众号链接` }}
                </div>
                <el-input :value="type===1?qrcode.weapp.url:qrcode.wechat.url" class="le-url" disabled="">
                    <el-button @click="copy()" slot="append">
                        复制
                    </el-button>
                </el-input>
                <el-button @click="downLoad" class="le-poster__btn" plain="">
                    下载海报
                </el-button>
                <el-button @click="downLoadQrcode" class="le-applets__btn" plain="">
                    仅下载{{ type == 1 ? `小程序` : `公众号` }}码
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
import html2canvas from 'html2canvas';

export default {
    name: "promote",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            qrcode: {
                weapp: {},
                wechat: {}
            },
            store_info: {},
            type: 1
        }
    },
    mounted() {
        this.getQrcode();
        this.getStore();
    },
    methods: {
        getQrcode() {
            this.$heshop.qrcode('post', {scene: 'id=' + this.value.id, page: 'pages/goods/detail'}).then(res => {
                this.qrcode = res;
            }).catch((err) => {
                console.error(err)
            });
        },
        getStore() {
            this.$heshop.search('post', {include: 'setting'}, {
                keyword: 'setting_collection',
                content_key: 'store_setting'
            }).then(res => {
                this.store_info = res;
            }).catch((err) => {
                console.error(err)
            });
        },
        chooseType(type) {
            this.type = type;
        },
        downLoad() {
            new html2canvas(document.getElementById('promote'), {useCORS: true}).then(canvas => {
                let base64 = canvas.toDataURL();
                this.downloadFile(base64, this.value.name);
            });
        },
        downLoadQrcode() {
            if (this.type == 1) {
                this.downloadFile(this.qrcode.wxapp, this.value.name);
            } else {
                this.downloadFile(this.qrcode.wechat, this.value.name);
            }
        },
        downloadFile(content, fileName) { //下载base64图片
            var base64ToBlob = function (code) {
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
        handleOpen() {
        },
        handleClose() {
        },
        copy: function () {
            let _this = this;
            copy({
                content: _this.type === 1 ? _this.qrcode.weapp.url : _this.qrcode.wechat.url,
                success: function () {
                    _this.$message.success("复制成功")
                }
            });
        }
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
};
</script>
<style lang="scss" scoped="">
@import "./promote.less";
</style>