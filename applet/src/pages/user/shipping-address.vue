<template>
    <view class="he-page-content" :data-theme="theme">
        <!-- #ifdef MP-WEIXIN-->
        <view class="he-get-address" @tap="chooseAddress">
            <view class="fl iconfont iconaddress_wechataddress"></view>
            <text class="fl he-text">获取微信地址</text>
            <view class="fr iconfont iconbtn_arrow"></view>
        </view>
        <!-- #endif -->
        <view class="he-item flex justify-between align-center" :style="[style]" :key="item.id" v-for="(item, index) in list">
            <view class="he-left flex align-center" @click="setSelect(index, item)">
                <view class="iconfont he-icon-select" v-if="submit && indexId !== -1" :class="indexId === item.id ? 'iconbtn_select' : ''"></view>
                <view class="flex-sub">
                    <view class="he-top flex align-center" :class="indexId === item.id ? 'he-top__1' : 'he-top__0'">
                        <text class="he-username">{{item.name}}</text>
                        <text>{{item.mobile}}</text>
                        <text v-if="item.status === 1" class="he-default">默认</text>
                    </view>
                    <view class="he-address">{{item.province}}{{item.city}}{{item.district}}{{item.address}}
                    </view>
                </view>
            </view>
            <view class="he-right flex align-center justify-center"  @click="navigateTo('/pages/user/address-edit?id=' + item.id, false)">
                <text class="iconfont iconaddress_edit"></text>
            </view>
        </view>
        <view class="he-loading" v-if="loading">
            <he-loading size="50" mode="flower"></he-loading>
        </view>
        <he-no-content-yet v-if="isNothing" :image="ipAddress + '/address-background-empty.png'" text="暂无收货地址"></he-no-content-yet>
        <view class="safe-area-inset-bottom">
            <view class="he-area-height"></view>
        </view>
        <view class="he-add-box safe-area-inset-bottom">
            <button class="he-add-btn cu-btn block" hover-class="he-hover-btn" @click="navigateTo('/pages/user/address-edit', true)">
                新增收货地址
            </button>
        </view>
    </view>
</template>

<script>
import heNoContentYet from "../../components/he-no-content-yet.vue";
import heLoading from "../../components/he-loading.vue";

export default {
    name: "shipping-address",
    components: {
        heNoContentYet,
        heLoading
    },
    data() {
        return {
            list: [],
            indexId: -1,
            submit: null,
            isNothing: false,
            loading: true
        }
    },
    computed: {
        style: function () {
            let style = {};
            if (!this.submit) {
                style.padding = '33rpx 18rpx 33rpx 40rpx';
            } else {
                style.padding = '33rpx 18rpx 33rpx 32rpx';
            }
            return style;
        }
    },
    methods: {
        chooseAddress: function () {
            let _this = this;
            if (this.isMax()) return;
            uni.chooseAddress({
                success: function (res) {
                    let data = {
                        name: res.userName,
                        mobile: res.telNumber,
                        province: res.provinceName,
                        city: res.cityName,
                        district: res.countyName,
                        address: res.detailInfo,
                        status: 0
                    }
                    _this.$heshop.address('post', data).then(function (res) {
                        data.id = res;
                        _this.list.unshift(data);
                    }).catch(function (err) {
                        console.error(err);
                    });
                },
                fail: function(err) {
                    console.error(err);
                }
            });
        },
        navigateTo: function(url, boolean) {
            if (boolean) if (this.isMax()) return;
            uni.navigateTo({url});
        },
        getList: function () {
            let _this = this;
            return new Promise(function (resolve) {
                _this.$heshop.address('get').then(function(res) {
                    resolve(res);
                }).catch(function(err) {
                    console.error(err);
                    _this.$toError();
                });
            });
        },
        setAddress: function () {
            let address = this.getStorageSync(this.$storageKey.address);
            if (!address) return;
            let status = null;
            if (address.type === 'put') {
                if (address.form.status === 1) status = true;
                if (status === true) {
                    for (let i = 0; i < this.list.length; i++) {
                        this.$set(this.list[i], 'status' , 0);
                    }
                }
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id == address.id) {
                        this.$set(this.list, i, address.form);
                    }
                }
            } else if (address.type === 'post') {
                if (address.form.status === 1) status = true;
                if (status === true) {
                    for (let i = 0; i < this.list.length; i++) {
                        this.$set(this.list[i], 'status' , 0);
                    }
                }
                this.list.unshift({...address.form, id: address.id});
            } else if (address.type === 'delete') {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id == address.id) {
                        this.list.splice(i, 1);
                    }
                }
            }
            uni.removeStorageSync(this.$storageKey.address);
        },
        setSelect: function(index, item) {
            if (!this.submit) return;
            this.indexId = item.id;
            uni.setStorageSync(this.$storageKey.address_submit, item);
            uni.navigateBack({
                delta: 1
            });
        },
        isMax: function() {
            if (this.list.length >= 20) {
                uni.showToast({
                    title: "已达到20条地址上限，请先删除不常用地址。",
                    icon: "none"
                });
                return true;
            }
            return false;
        }
    },
    onLoad(options) {
        let _this = this;
        this.submit = options.submit ? options.submit : null;
        this.getList().then(function(res) {
            _this.loading = false;
            _this.list = res;
            if (options.id) {
                _this.indexId = parseInt(options.id);
            }
            _this.isNothing = _this.list.length === 0;
        });
    },
    onShow() {
        this.setAddress();
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    overflow: hidden;
}
.he-loading {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.he-add-btn {
    height: 80px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    @include background_color('background_color');
    margin: 27px 32px 13px 32px;
}
.he-hover-btn {
    color: rgba(255, 255, 255, 0.8);
}
.he-add-box {
    width: 100%;
    overflow: hidden;
    background: #FFFFFF;
    position: fixed;
    bottom: 0;
    z-index: 1;
}
.he-area-height {
    height: 136px;
}
.he-get-address {
    margin: 20px 20px 0 20px;
    height: 96px;
    line-height: 96px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 0 24px 0 32px;
}
.he-get-address .he-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 20px;
}
.he-item {
    margin: 16px 20px 0 20px;
    background: #FFFFFF;
    border-radius: 16px;
}
.he-top {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: bold;

    margin-bottom: 13px;
}
.he-top__0 {
    color: #222222;
}
.he-top__1 {
    @include font_color('font_color');
}
.he-username {
    margin-right: 24px;
}
.he-address {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 34px;
}
.he-left {
    width: 571px;
}
.he-right {
    height: 80px;
    width: 80px;
}
.iconaddress_wechataddress {
    font-size: 36px;
    color: RGBA(70, 187, 54, 1);
}
.iconbtn_arrow {
    font-size: 22px;
    color: #bebebe;
}
.iconaddress_edit {
    font-size: 32px;
    color: RGBA(204, 204, 204, 1);
}
.he-default {
    width: 54px;
    height: 26px;
    @include background_color('background_color');
    border-radius: 13px;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 26px;
    text-align: center;
    margin-left: 24px;
}
.iconbtn_select {
    font-size: 32px;
    @include font_color('font_color');
}
.he-icon-select {
    width:32px;
    height: 32px;
    margin-right:24px;
}
</style>