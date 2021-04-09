<template>
    <view class="he-page-content" :data-theme="theme">
        <text class="he-mobile-text" v-if="mobile">
            更换手机后，下次登录可使用新手机号登录。
            当前手机号：{{mobile}}
        </text>
        <view class="he-box">
            <view class="he-item flex ">
                <text class="he-item__label">手机号</text>
                <input type="number" class="he-item__input flex-sub"
                       v-model="iphone"
                       placeholder-style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
                       :maxlength="16" placeholder="请填写要绑定的手机号">
            </view>
            <view class="he-item flex">
                <text class="he-item__label">验证码</text>
                <input type="number" class="he-item__input flex-sub"
                       v-model="code"
                       placeholder-style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
                       oninput="value=value.replace(/[^\d]/g,'')" placeholder="请填写收到的验证码">
                <button type="text" class="cu-btn he-item__get-code"
                        :disabled="!!time"
                        :class="time ? 'he-item__get-code-0' : 'he-item__get-code-1'"
                        @click="getCode">{{time ? num + 's后重新获取' : '获取验证码'}}</button>
            </view>
        </view>
        <button class="cu-btn he-submit" @click="submit">确认绑定</button>
    </view>
</template>

<script>
export default {
    name: "bind-phone",
    data() {
        return {
            iphone: '',
            code: '',
            time: null,
            num: 60
        }
    },
    computed: {
        mobile: function() {
            return this.getStorageSync('userInfo').mobile;
        }
    },
    methods: {
        submit: function() {
            let _this = this;
            if (this.iphone && this.code) {
                this.$heshop.users('put', {
                    behavior: 'bindMobile',
                    type: 'code'
                }, {
                    mobile: this.iphone,
                    code: this.code
                }).then(function() {
                    _this.$h.toast("绑定手机号成功");
                }).catch(function(err) {
                    console.error(err);
                });
            }
        },
        getCode: function() {
            if (!this.iphone) return;
            if (this.time) return;
            let _this = this;
            this.$heshop.sms('post', {
                mobile: this.iphone,
                type: 1
            }).then(function(err) {
                _this.time = setInterval(function() {
                    _this.num--;
                    if (_this.num <= 0) {
                        clearInterval(_this.time);
                        _this.time = null;
                    }
                }, 1000);
            }).catch(function(err) {
            });
        }
    },
    beforeDestroy() {
        this.time ? clearInterval(this.time) : null;
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    padding: 20px;
}
.he-box {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px 24px;
}
.he-item {
    height: 100px;
}
.he-item:first-child {
    border-bottom: 1px solid #E5E5E5;
}
.he-submit {
    margin-top: 80px;
    width: 710px;
    height: 80px;
    border-radius: 40px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    @include background_color('background_color');
}
.he-item__label {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    width: 156px;
    line-height: 100px;
}
.he-item__input {
    height: 100px;
    width: 100%;
}
.he-item__get-code {
    width: 240px;
    height: 100px;
    padding: 0;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    background-color: #FFFFFF;
}
.he-item__get-code-0 {
    color: #999999;
}
.he-item__get-code-1 {
    @include font_color('font_color');
}
.he-mobile-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 32px;
    margin: 20px 0;
    display: inline-block;
}
</style>
