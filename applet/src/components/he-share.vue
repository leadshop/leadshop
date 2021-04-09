<template>
   <view class="he-share">
       <he-popup mode="bottom" v-model="showModal" :border-radius="16">
           <view class="he-share__box">
               <view class="he-share__content">
                   <view class="he-share__title">分享</view>
                   <view class="flex he-share__bottom justify-center align-center">
                        <!--#ifndef H5-->
                       <button class="cu-btn he-share__icon he-share__friend flex flex-direction" open-type="share">
                           <image :src="ipAddress + '/share-icon-wechat.png'" class="he-top__image"></image>
                           <view class="he-bottom">微信好友</view>
                       </button>
                       <!--#endif-->
                       <!--#ifdef H5-->
                       <button class="cu-btn he-share__icon he-share__friend flex flex-direction" @click="openWechat">
                           <image :src="ipAddress + '/share-icon-wechat.png'" class="he-top__image"></image>
                           <view class="he-bottom">微信好友</view>
                       </button>
                       <!--#endif-->
                       <button class="cu-btn he-share__icon he-share__image flex flex-direction" @click="openPoster">
                           <image :src="ipAddress + '/share-icon-image.png'" class="he-top__image"></image>
                           <view class="he-bottom">生成海报</view>
                       </button>
                   </view>
               </view>
               <button class="cu-btn he-share__btn" @click="showModal = false;">取消</button>
           </view>
       </he-popup>
       <he-poster v-model="isPoster" :goods="goods" :goods-id="goodsId"></he-poster>
       <!--#ifdef H5-->
       <view class="le-share" v-if="isWeChat">
           <img class="le-one" src="@/static/h5/image/one.png" alt="">
           <img src="@/static/h5/image/two.png" class="le-two" alt="">
           <view class="le-button" @click="isWeChat = false">我知道了</view>
       </view>
       <!--#endif-->
   </view>
</template>

<script>
import HePopup from "@/components/he-popup.vue";
import hePoster from "./he-poster.vue";

export default {
    name: "he-share",
    props: {
        value: Boolean,
        goodsId: {
            type: [Number, String]
        },
        goods: Object
    },
    data() {
        return {
            isPoster: false,
            // #ifdef H5
            isWeChat: false
            //#endif
        }
    },
    components: {
        HePopup,
        hePoster
    },
    computed: {
        showModal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        openPoster: function() {
            let _this = this;
            _this.isPoster = true;
            setTimeout(function() {
                _this.showModal = false;
            }, 100);
        },
        // #ifdef H5
        openWechat: function() {
            this.isWeChat = true;
        }
        // #endif
    }
}
</script>

<style scoped lang="scss">
.he-share__box {
    height: 439px;
    background: #FFFFFF;
}
.he-share__content {
    height: 351px;
}
.he-share__btn {
    width: 100%;
    height: 88px;
    background: #FFFFFF;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    border-top:1px solid #CCCCCC;
    border-radius: 0;
}
.he-share__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    height: 60px;
    line-height: 60px;
    text-align: center;
    margin-top: 16px;
}
.he-share__icon {
    text-align: center;
    height: 258px;
    padding: 0;
    background: #ffffff;
}
.he-share__icon:first-child {
    margin-right: 98px;
}
.he-share__icon:last-child {
    margin-left: 98px;
}
.he-top__image{
    width: 116px;
    height: 116px;
    font-size: 116px;
    margin-bottom: 10px;
}
.he-bottom {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-top: 10px;
}
.he-share__bottom {
    height: 258px;
}
//#ifdef H5
.le-share {
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 12000;
    top: 0;
    background-color: rgba(0,0,0,.2);
    .le-one {
        width: 430px;
        height: 200px;
        position: absolute;
        top: 0;
        right: 0;
    }
    .le-two {
        width: 750px;
        height: 820px;
        position: absolute;
        bottom: 0;
        right: 0;
    }
    .le-button {
        position: absolute;
        bottom: 320px;
        left:50%;
        transform: translateX(-50%);
        width: 244px;
        height: 80px;
        line-height: 80px;
        text-align: center;
        border: 2px solid #FFFFFF;
        border-radius: 40px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
    }
}
//#endif
</style>
