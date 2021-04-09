<template>
    <view class="user-features">
        <template v-if="isLogin">
            <!--#ifndef H5-->
            <button v-if="!mobile" class="he-item he-item__btn" open-type="getPhoneNumber" hover-class="" @getphonenumber="getPhoneNumber">
                <view class="fl iconfont iconpersonalcenter_phone"></view>
                <text class="fl he-text">绑定手机号</text>
                <view class="fr iconfont iconbtn_arrow"></view>
            </button>
            <view class="he-item" v-else>
                <view class="fl iconfont iconpersonalcenter_phone"></view>
                <text class="fl he-text">绑定手机号</text>
                <view class="fr iconfont iconbtn_arrow"></view>
                <text class="fr he-mobile">{{mobile}}</text>
            </view>
            <!--#endif-->
            <!--#ifdef H5-->
            <view class="he-item" @click="bindPhone">
                <view class="fl iconfont iconpersonalcenter_address"></view>
                <text class="fl he-text">绑定手机号</text>
                <view class="fr iconfont iconbtn_arrow"></view>
                <text class="fr he-mobile" v-if="mobile">{{mobile}}</text>
            </view>
            <!--#endif-->
            <view class="he-item" @click="navigateTo('/pages/user/shipping-address')">
                <view class="fl iconfont iconpersonalcenter_address"></view>
                <text class="fl he-text">收货地址</text>
                <view class="fr iconfont iconbtn_arrow"></view>
            </view>
        </template>
        <view class="he-item" @click="clearStorage">
            <view class="fl iconfont iconpersonalcenter_clearcache"></view>
            <text class="fl he-text">清除缓存</text>
            <view class="fr iconfont iconbtn_arrow"></view>
        </view>
        <view class="he-item" @click="isPhone = true;">
            <view class="fl iconfont iconpersonalcenter_contactus"></view>
            <text class="fl he-text">联系我们</text>
            <view class="fr iconfont iconbtn_arrow"></view>
        </view>
        <!--联系我们-->
        <he-tell v-model="isPhone" :phone-number="storeSetting.phone"></he-tell>
        <!--清理缓存-->
        <he-clear-storage v-model="isClear"></he-clear-storage>
        <!--#ifdef H5-->
        <!--绑定手机-->
        <user-bind-phone v-model="isBind"></user-bind-phone>
        <!--#endif-->
    </view>
</template>
<script>
import heTell from "@/components/he-tell.vue";
import heClearStorage from "@/components/he-clear-storage.vue";
// #ifdef H5
import userBindPhone from "./user-bind-phone.vue";
// #endif
export default {
    name: "user-features",
    components: {
        heTell,
        heClearStorage,
        // #ifdef H5
        userBindPhone
        // #endif
    },
    computed: {
        mobile: function() {
            let data = this.$store.state.apply.userInfo.mobile;
            if (!data) return;
            data = data + "";
            return data ? data.match(/(\d{3})(\d{4})(\d{4})/).slice(1).reduce(function(value, item, index) {
              return index === 1 ? value + "****" : value + item;
            }) : null;
        }
    },
    data() {
        return {
            isPhone: false,
            isClear: false,
            // #ifdef H5
            isBind: false
            // #endif
        }
    },
    methods: {
        navigateTo: function(url) {
            uni.navigateTo({url: url});
        },
        clearStorage: function() {
            this.isClear = true;
        },
        // #ifdef H5
        bindPhone: function () {
            if (this.mobile) {
                this.isBind = true;
            } else {
                this.navigateTo('/pages/user/bind-phone');
            }
        },
        // #endif
        // #ifndef H5
        getPhoneNumber: function(e) {
            let _this = this;
            let errMsg = e.detail.errMsg;
            if (errMsg === 'getPhoneNumber:ok') {
                uni.login({
                    success(res) {
                        if (res.code) {
                            _this.$heshop.users('put', {
                                behavior: 'bindMobile'
                            }, {
                                code:res.code,
                                encryptedData: e.detail.encryptedData,
                                iv: e.detail.iv
                            }).then(function(res) {
                                _this.$store.state.apply.userInfo.mobile = res.mobile;
                            }).catch(function(err) {
                                if (err.status === 422) {
                                    _this.$h.toast(err.data[0].message);
                                } else {
                                    _this.$h.toast(err.data.message);
                                }
                            });
                        } else {
                            // _this.$h.toast(res.message);
                            console.error(res.errMsg);
                            _this.$toError();
                        }
                    }
                });
            } else if (errMsg === 'getPhoneNumber:fail user deny') {

            }
        }
        // #endif
    }
}
</script>
<style scoped>
.user-features {
    margin: 20px 20px 0 20px;
    padding: 20px 0;
    background: #ffffff;
    border-radius: 16px;
}

.he-item {
    height: 80px;
    line-height: 80px;
    padding: 0 24px;
}

.fr {
    font-size: 22px;
}

.iconpersonalcenter_contactus,
.iconpersonalcenter_clearcache,
.iconpersonalcenter_phone,
.iconpersonalcenter_address {
    font-size: 28px;
    color: #bebebe;
}

.he-text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 20px;
}
/*#ifndef H5*/
.he-item__btn {
    background-color: #FFFFFF;
}
.he-item__btn:after {
    display: none;
}
/*#endif*/
.he-mobile {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    margin-right: 14px;
}
</style>
