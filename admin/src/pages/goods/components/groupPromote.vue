<template>
    <el-row class="he-main">
        <el-col :span="5">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                <el-menu-item index="1" @click="chooseType(1)">
                    <span slot="title">微信小程序</span>
                </el-menu-item>
                <el-menu-item index="2" @click="chooseType(2)">
                    <span slot="title">公众号</span>
                </el-menu-item>
            </el-menu>
        </el-col>
        <el-col :span="19" class="el-row--flex">
            <div class="he-zoom" id="promote">
                <div class="he-poster">
                    <div class="he-poster__body">
                        <img class="he-poster__icon" :src="value.icon" alt="">
                        <p class="he-poster__name">{{ value.name }}</p>
                        <p class="he-poster__shop">来自店铺</p>
                        <div class="he-poster__line"></div>
                        <img v-if="qrcode.weapp.image && type==1" class="he-poster__QRCode" :src="qrcode.weapp.image"
                             alt="">
                        <img v-if="qrcode.wechat.image && type==2" class="he-poster__QRCode" :src="qrcode.wechat.image"
                             alt="">
                        <p class="he-poster__sign">长按识别{{ type == 1 ? `小程序` : `公众号` }}码</p>
                    </div>
                </div>
            </div>
            <div>
                <div class="he-title">{{ type == 1 ? `小程序路径` : `公众号链接` }}</div>
                <el-input class="he-url" disabled :value="type===1?qrcode.weapp.url:qrcode.wechat.url">
                    <el-button slot="append" type="primary" @click="copy">复制</el-button>
                </el-input>
                <el-button type="primary" plain @click="downLoad">下载海报</el-button>
                <el-button class="he-applets__btn" type="primary" plain @click="downLoadQrcode">
                    仅下载{{ type == 1 ? `小程序` : `公众号` }}码
                </el-button>
            </div>
        </el-col>
    </el-row>
</template>
<script>
import html2canvas from 'html2canvas';
import copy from "@/lib/function/copy.js";

export default {
    name: "groupPromote",
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
            type: 1
        }
    },
    mounted() {
        this.getQrcode();
    },
    methods: {
        getQrcode() {
            this.$heshop.qrcode('post', {scene: 'id=' + this.value.id, page: 'pages/categories/index'}).then(res => {
                this.qrcode = res;
            }).catch((err) => {
                this.$message.error(err.data.message);
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
                this.downloadFile(this.qrcode.weapp.image, this.value.name);
            } else {
                this.downloadFile(this.qrcode.wechat.image, this.value.name);
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
    }
};
</script>
<style scoped lang="scss">
.he-main {
    margin: 0 0 40px 0;
}

/deep/ .el-menu-vertical-demo .el-menu-item {
    text-align: center;
}

/deep/ .el-menu-vertical-demo {
    height: 232px;
}

.he-zoom {
    zoom: 0.32;
    margin: 0 32px 0 64px;
}

.he-poster {
    width: 750px;
    height: 728px;
    background-color: #f3f5f7;
    position: relative;
}

.he-poster__body {
    width: 686px;
    height: 592px;
    background: #FFFFFF;
    border-radius: 16px;
    position: absolute;
    bottom: 32px;
    left: 32px;
    text-align: center;

    .he-poster__icon {
        width: 160px;
        height: 161px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .he-poster__name {
        font-size: 32px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
        margin: 119px 0 0 0;
    }

    .he-poster__shop {
        font-size: 24px;
        font-weight: 500;
        color: #000000;
        opacity: 0.65;
    }

    .he-poster__line {
        width: 548px;
        height: 1px;
        background-color: #D7D7D7;
        margin: auto;
    }

    .he-poster__QRCode {
        width: 180px;
        height: 180px;
        margin-top: 51px;
    }

    .he-poster__sign {
        font-size: 22px;
        font-weight: 500;
        color: #000000;
        opacity: 0.45;
    }
}

.he-title {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.65;
    margin-top: 16px;
}

.he-url {
    margin: 16px 0;
    width: 302px;

    /deep/ .el-input__inner {
        padding-right: 0;
    }

    /deep/ .el-button {
        background-color: #623CEB;
        color: #ffffff;
    }
}

.he-applets__btn {
    width: 128px;
    padding: 9px 0;
}
</style>