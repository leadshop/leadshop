<template>
    <view class="he-page-content" :data-theme="theme">
        <image class="he-background__box" :src="ipAddress + '/login-background-login.png'"></image>
        <view class="he-background__box he-content flex flex-direction align-center">
            <image class="he-icon" :src="storeSetting.logo" mode="aspectFit"></image>
            <view class="he-text">请授权微信登录</view>
            <view class="he-other__text">
                以便我们为您提供更好的服务
            </view>
            <!-- #ifndef H5 -->
            <button v-if="canIUseGetUserProfile" class="cu-btn he-login" @click="getUserProfile">微信一键授权登录</button>
            <button v-else class="cu-btn he-login" open-type="getUserInfo" @getuserinfo="decryptUserInfo">微信一键授权登录</button>
            <!-- #endif -->
            <!-- #ifdef H5 -->
            <button class="cu-btn he-login" @click="decryptUserInfo">微信一键授权登录</button>
            <!-- #endif -->
            <button class="cu-btn he-out" @click="notLogin">暂不登录</button>
        </view>
    </view>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "login",
    methods: {
        ...mapActions({
            decryptUserInfo: 'user/decryptUserInfo',
            getUserProfile: 'user/getUserProfile'
        }),
        notLogin: function() {
            uni.navigateBack({delta: 1});
        }
    },
    // #ifndef H5
    computed: {
        canIUseGetUserProfile: function() {
          return uni.canIUse('getUserProfile');
        }
    }
    // #endif
}
</script>

<style scoped lang="scss">
.he-page-content {
    background: #FFFFFF;
}
.he-background__box {
    width: 100%;
    height: 960px;
}
.he-icon {
    width: 180px;
    height: 180px;
}
.he-content {
    position: absolute;
    top: 0;
    padding-top: 160px;
}
.cu-btn {
    width: 560px;
    height: 80px;
    border-radius: 40px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-out {
    background: #FFFFFF;
    font-size: 28px;
    font-weight: 500;
    color: #999999;
    margin-top: 16px;
}
.he-login {
    font-size: 30px;
    color: #FFFFFF;
    @include background_color('background_color');
    margin-top: 88px;
}
.he-text {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-top: 64px;
}
.he-other__text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: 24px;
}
</style>