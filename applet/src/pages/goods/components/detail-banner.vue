<template>
    <view class="he-swiper-wrap">
        <swiper class="he-swiper-notice" autoplay vertical v-if="orderList.length && goodsSetting.order_list_roll">
            <swiper-item v-for="(item, index) in orderList" :key="index">
                <view class="he-item flex align-center">
                    <image class="he-item__img" :src="item.avatar"></image>
                    <view class="he-item__text flex">
                        <view  class="he-line-1 flex-sub">{{item.nickname}}</view>
                        <view class="flex-sub">下单成功</view>
                    </view>
                </view>
            </swiper-item>
        </swiper>
        <swiper :current="elCurrent" @change="change" :interval="3000"
                circular :duration="500" :autoplay="!play"
                :style="{
				height: '750rpx',
				backgroundColor: bgColor
			}">
            <swiper-item class="he-swiper-item" v-if="isVideo">
                <view class="he-video-img" @click="setPay" v-if="!play">
                    <image class="he-video-play" :src="ipAddress + '/goods-banner-image.png'"></image>
                    <image class="he-swiper-image" :src="videoCover ? videoCover:video.cover" mode="aspectFill"></image>
                </view>
                <video :src="video.url" enable-play-gesture :autoplay="play"  :controls="false" class="he-video" v-else></video>
            </swiper-item>
            <swiper-item class="he-swiper-item" v-for="(item, index) in list" :key="index">
                <view class="he-list-image-wrap" @tap.stop.prevent="listClick(index)" >
                    <!--#ifndef H5-->
                    <image class="he-swiper-image" :src="item[name] || item" mode="aspectFill" @tap="doPreviewImage(index, list)"></image>
                    <!--#endif-->
                    <!--#ifdef H5-->
                    <img class="he-swiper-image" v-lazy="item[name] || item">
                    <!--#endif-->
                </view>
            </swiper-item>
        </swiper>
        <view class="he-swiper-indicator" >
            <view class="he-indicator-item-number">{{ uCurrent + 1 }}/{{ list.length + (isVideo ? 1 : 0)}}</view>
        </view>
    </view>
</template>

<script>

export default {
    name: "detail-banner",
    props: {
        list: {
            type: Array,
            default () {
                return [];
            }
        },
        name: {
            type: String,
            default: 'image'
        },
        bgColor: {
            type: String,
            default: '#f3f4f6'
        },
        current: {
            type: [Number, String],
            default: 0
        },
        goodsId: {
            type: Number,
            default: 0
        },
        video: {
            type: [Object, Array, String]
        },
        isVideo: {
            type: Number
        },
        videoCover: {
            type: String
        }
    },
    watch: {
        list(nVal, oVal) {
            if(nVal.length !== oVal.length) this.uCurrent = 0;
        },
        current(n) {
            this.uCurrent = n;
        }
    },
    data() {
        return {
            uCurrent: this.current,
            orderList: [],
            play: false
        };
    },
    computed: {
        elCurrent() {
            return Number(this.current);
        }
    },
    methods: {
        listClick(index) {
            this.$emit('click', index);
        },
        change(e) {
            let current = e.detail.current;
            this.uCurrent = current;
            this.$emit('change', current);
        },
        getOrder: function() {
            let _this = this;
            this.$heshop.goods('get', {
                goods_id: this.goodsId,
                behavior: 'goods_order'
            }).then(function(res) {
                _this.orderList = res;
            }).catch(function(err) {
            });
        },
        setPay: function() {
            this.play = true;
        },
        doPreviewImage:function (index, list) {
            this.$utils.doPreviewImage(index, list);
        }
    },
    mounted() {
        this.getOrder();
    }
};
</script>

<style scoped lang="scss">
.he-swiper-wrap {
    position: relative;
    overflow: hidden;
    transform: translateY(0);
}
.he-video {
    width: 100%;
    height: 100%;
}
.he-swiper-image {
    width: 100%;
    will-change: transform;
    height: 100%;
    /* #ifndef APP-NVUE */
    display: block;
    /* #endif */
    /* #ifdef H5 */
    pointer-events: none;
    object-fit: contain;
    /* #endif */
}
.he-swiper-indicator {
    padding: 0 24px;
    position: absolute;
    display: flex;
    flex-direction: row;
    width: 100%;
    z-index: 1;
    justify-content: flex-end;
    top: auto;
    bottom: 12px;
}
.he-indicator-item-number {
    padding: 6px 16px;
    line-height: 1;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 100px;
    font-size: 26px;
    color: rgba(255, 255, 255, 0.8);
}
.he-list-image-wrap {
    width: 100%;
    height: 100%;
    flex: 1;
    transition: all 0.5s;
    overflow: hidden;
    box-sizing: content-box;
    position: relative;
}
.he-swiper-item {
    display: flex;
    flex-direction: row;
    overflow: hidden;
    align-items: center;
}
.he-swiper-notice {
    position: absolute;
    z-index: 88;
    top: 88px;
    left: 32px;
    height: 60px;
    width: 296px;
    background: rgba(0,0,0,0.5);
    border-radius: 30px;
    .he-item__img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 10px 0 10px 10px;
    }
    .he-item__text {
        width: 204px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        margin-left: 7px;
    }
}
.he-video-img {
    width: 100%;
    height: 100%;
    position: relative;
    .he-video-play {
        width: 120px;
        height: 120px;
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
    }
}
</style>
