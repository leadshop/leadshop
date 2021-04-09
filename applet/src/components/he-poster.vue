<template>
    <he-popup v-model="showModal" mode="center" :border-radius="16" background-color="transparent" :zoom="false" width="100%" height="100%">
        <view class="he-poster flex justify-center align-center" @touchmove.stop.prevent="() => {}">
            <view class="he-poster__box" v-if="loading">
                <view class="he-poster__close flex align-center justify-center" @click="showModal = false;">
                    <text class="iconfont iconpopup_close"></text>
                </view>
                <!-- #ifndef H5 -->
                <l-painter :board="base" @success="path = $event;" @done="successImage" @fail="failImage" isRenderImage v-if="loading" />
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <l-painter :board="base" @success="path = $event;" @done="successImage" @fail="failImage" isRenderImage v-if="loading && !path" />
                <image class="he-wechat__image" :src="path" v-if="path"></image>
                <!-- #endif -->
                <!-- #ifndef H5 -->
                <button class="he-poster__save cu-btn" @click="saveImage">保存图片</button>
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <button class="he-poster__save cu-btn">长按图片保存</button>
                <!-- #endif -->
            </view>
        </view>
    </he-popup>
</template>
<script>
import hePopup from "./he-popup.vue";
import detailPoster from "./detail-poster"
import lPainter from './lime-painter'

export default {
    name: "detail-poster",
    props: {
        value: Boolean,
        goodsId: {
            type: [Number, String]
        },
        goods: Object
    },
    components: {
        hePopup,
        detailPoster,
        lPainter
    },
    data() {
        return {
            path: "",
            base: {},
            loading: false,
            poster: ''
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        showModal(value) {
            if (value) {
                this.loadImage();
            }
        }
    },
    computed: {
        showModal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        },
        background: function() {
            return {
                background: 'url(' + this.poster + ')'
            }
        }
    },
    methods: {
        successImage() {
            uni.hideLoading();
        },
        failImage() {
            uni.hideLoading();
            uni.showToast({
                title: '生成失败',
                duration: 2000
            });
        },
        saveImage: function() {
            // #ifndef H5
            uni.saveImageToPhotosAlbum({
                filePath: this.path,
                success() {
                    uni.showToast({
                        title: '已保存到相册',
                        icon: 'success',
                        duration: 2000
                    });
                }
            });
            // #endif
            // #ifdef H5
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
            let blob = base64ToBlob(this.path); //new Blob([content]);
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = 'fileName';
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
            // #endif
        },
        loadImage() {
            this.loading = false;
            uni.showLoading({
                title: '海报生成中'
            });
            this.base = {
                width: '562rpx',
                height: '784rpx',
                background: '#F5F5F5',
                radius: '16px',
                views: [{
                        type: 'image',
                        src: this.goods.slideshow[0] || this.goods.slideshow[1],
                        css: {
                            left: '24rpx',
                            top: '24rpx',
                            width: '514rpx',
                            height: '514rpx',
                            radius: '12rpx'
                        }
                    },
                    {
                        type: 'view',
                        css: {
                            left: '24rpx',
                            top: '550rpx',
                            background: '#FFFFFF',
                            width: '514rpx',
                            height: '210rpx',
                            radius: '16rpx'
                        }
                    },
                    {
                        type: 'text',
                        text: '￥',
                        css: {
                            left: '47rpx',
                            top: '578rpx',
                            fontSize: '30rpx',
                            color: '#E60B30'
                        }
                    },
                    {
                        type: 'text',
                        text: this.goods.price,
                        css: {
                            left: '75rpx',
                            top: '574rpx',
                            fontSize: '44rpx',
                            lineHeight: '44rpx',
                            textAlign: 'left',
                            color: '#E60B30'
                        }
                    },
                    {
                        type: 'text',
                        text: '￥' + this.goods.line_price,
                        css: {
                            left: (this.goods.price.length * 24 + 75) + 'rpx',
                            top: '590rpx',
                            fontSize: '21rpx',
                            color: '#999999',
                            textDecoration: 'line-through'
                        }
                    },
                    {
                        type: 'text',
                        text: this.goods.name,
                        css: {
                            left: '48rpx',
                            top: '624rpx',
                            width: '288rpx',
                            fontSize: '24rpx',
                            textAlign: 'left',
                            maxLines: 2,
                            color: '#222222'
                        }
                    },
                    {
                        type: 'image',
                        src: this.storeSetting.logo,
                        css: {
                            left: '48rpx',
                            top: '700rpx',
                            width: '36rpx',
                            height: '36rpx',
                            radius: '18rpx'
                        }
                    },
                    {
                        type: 'text',
                        text: this.storeSetting.name,
                        css: {
                            left: '96rpx',
                            top: '707rpx',
                            fontSize: '18rpx',
                            color: '#666666'
                        }
                    },
                    {
                        type: 'text',
                        text: '长按识别小程序码',
                        css: {
                            left: '380rpx',
                            top: '713rpx',
                            fontSize: '17rpx',
                            textAlign: 'center',
                            color: '#999999'
                        }
                    }, {
                        type: 'image',
                        src: 'https://open.heshop.vip/upload/image/2021/03/12/beed1589a93a49a06d751c4ca6f91a50.jpeg',
                        css: {
                            left: '378rpx',
                            top: '568rpx',
                            width: '136rpx',
                            height: '136rpx',
                            color: '#000000'
                        }
                    }
                ]
            }

            this.$heshop.qrcode('post', {
                page: 'pages/goods/detail',
                scene: 'id=' + this.goodsId
            }).then(res => {
                // #ifndef H5
                this.base.views[9] = {
                    type: 'image',
                    src: res.weapp,
                    css: {
                        left: '378rpx',
                        top: '568rpx',
                        width: '136rpx',
                        height: '136rpx',
                        color: '#000000'
                    }
                }
                // #endif
                // #ifdef H5

                this.base.views[9] = {
                    type: 'image',
                    src: res.wechat,
                    css: {
                        left: '378rpx',
                        top: '568rpx',
                        width: '136rpx',
                        height: '136rpx',
                        color: '#000000'
                    }
                }
                // #endif


                setTimeout(() => {
                    this.loading = true;
                    uni.hideLoading();
                }, 1000)


            }).catch((err) => {
                console.error(err);
            });
        }
    }
}
</script>
<style scoped>
.he-poster {
    height: 100vh;
}

.he-poster__box {
    position: relative;
    width: 562px;
}

.he-poster__close {
    width: 52px;
    height: 52px;
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    margin: 0 0 32px 510px;
}

.he-poster__image {
    width: 562px;
    height: 784px;
    border-radius: 16px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
}

.he-poster__save {
    width: 380px;
    height: 80px;
    background: #E60B30;
    border-radius: 40px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin: 40px 91px 0 91px;
}

.iconpopup_close {
    font-size: 20px;
    color: #FFFFFF;
}

.he-wechat__image {
    width: 562px;
    height: 784px;
}
</style>