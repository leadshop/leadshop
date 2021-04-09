<template>
    <view class="he-page-content" :data-theme="theme">
        <!-- #ifdef MP-WEIXIN-->
        <view class="he-box he-get-address" @tap="chooseAddress" v-if="$h.test.isEmpty(id)">
            <view class="fl iconfont iconaddress_wechataddress"></view>
            <text class="fl he-text">获取微信地址</text>
            <view class="fr iconfont iconbtn_arrow"></view>
        </view>
        <!-- #endif -->
        <view class="he-box he-info">
            <view class="he-info__item flex align-center justify-between">
                <text class="he-item__label">收货人</text>
                <input
                    type="text"
                    v-model="form.name"
                    :maxlength="10"
                    class="he-item__value"
                    placeholder-style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
                    placeholder="请填写收货人姓名（最多10个字）">
            </view>
            <view class="he-info__item flex align-center justify-between">
                <text class="he-item__label">手机号码</text>
                <input
                    type="number"
                    v-model="form.mobile"
                    class="he-item__value"
                    :maxlength="11"
                    placeholder-style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
                    placeholder="请填写手机号码（最多11个数字）">
            </view>
            <view class="he-info__item flex align-center justify-between">
                <text class="he-item__label">所在地区</text>
                <view class="flex align-center" @click="isAddress = true;">
                    <text class="he-item__value he-area-text" v-if="form.province && form.city && form.district">{{form.province}}/{{form.city}}/{{form.district}}</text>
                    <text v-else class="he-placeholder he-area-text">请选择所在地区</text>
                    <view class="iconfont iconbtn_arrow"></view>
                </view>
            </view>
            <view class="he-info__itemOther flex justify-between">
                <view class="he-item__label" >详细地址</view>
                <textarea
                    id="textarea"
                    @input="setArea"
                    :value="form.address"
                    :disable-default-padding="true"
                    class="he-item__value"
                    placeholder-style="font-size: 26rpx;font-family: PingFang SC;font-weight: 500;color: #999999;"
                    :maxlength="50"
                    placeholder="如街道、小区、门牌号、楼栋号等">
                </textarea>
            </view>
        </view>
        <view class="he-box he-default flex justify-between align-center">
            <view class="he-text">设为默认地址</view>
            <he-switch v-model="form.status" :active-value="1" :inactive-value="0" @change="editAddress"></he-switch>
        </view>
        <button class="cu-btn he-save" @click="submit">保存并使用</button>
        <button class="cu-btn he-delete" @click="strikeOut" v-if="!$h.test.isEmpty(id)">删除收货地址</button>
        <he-select-address v-model="isAddress" @select="selectArea" :select="form"></he-select-address>
    </view>
</template>

<script>
import heSelectAddress from "@/components/he-select-address.vue";
import heSwitch from "@/components/he-switch.vue";

export default {
    name: "address-edit",
    components: {
        heSelectAddress,
        heSwitch
    },
    data() {
        return {
            form: {
                name: '',
                mobile: '',
                province: '',
                city: '',
                district: '',
                address: '',
                status: 0
            },
            id: null,
            isAddress: false
        }
    },
    methods: {
        chooseAddress: function() {
            let _this = this;
            uni.chooseAddress({
                success: function (res) {
                    _this.form.name = res.userName;
                    _this.form.mobile = res.telNumber;
                    _this.form.province = res.provinceName;
                    _this.form.city = res.cityName;
                    _this.form.address = res.detailInfo;
                    _this.form.district = res.countyName;
                },
                fail: function(err) {
                    console.error(err);
                    _this.$toError();
                }
            });
        },
        getAddress: function (id) {
            let _this = this;
            this.$heshop.address('get', id).then(function (res) {
                _this.form = res;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        setArea: function(e) {
            this.form.address = e.detail.value;
        },
        setStatus: function() {
            this.form.status  = this.form.status === 0 ? 1 : 0;
        },
        submit: function() {
            let _this = this;
            if (this.id) {
                this.$heshop.address('put', this.id, this.form).then(function () {
                    uni.setStorageSync(_this.$storageKey.address, {
                        form: _this.form,
                        id: _this.id,
                        type: 'put'
                    });
                    uni.navigateBack({
                        delta: 1
                    });
                }).catch(function(err) {
                    console.error(err);
                    _this.$toError();
                });
            } else {
                this.$heshop.address('post', this.form).then(function (res) {
                    uni.setStorageSync(_this.$storageKey.address, {
                        form: _this.form,
                        id: res,
                        type: 'post'
                    });
                    uni.navigateBack({
                        delta: 1
                    });
                }).catch(function(err) {
                    console.error(err);
                    _this.$toError();
                });
            }
        },
        strikeOut: function () {
            let _this = this;
            this.$heshop.address('delete', this.id).then(function () {
                uni.setStorageSync(_this.$storageKey.address, {
                    id: _this.id,
                    type: 'delete'
                });
                uni.navigateBack({
                    delta: 1
                });
            }).catch(function (err) {
                console.error(err);
                _this.$toError();
            });
        },
        selectArea: function(area) {
            this.form.province = area[0].name;
            this.form.city = area[1].name;
            this.form.district = area[2].name;
        },
        editAddress: function(val) {
            this.form.status = val;
        }
    },
    onLoad(options) {
        if (options.id) {
            this.id =parseInt(options.id);
            uni.setNavigationBarTitle({
                title: '编辑收货地址'
            });
        }
    },
    watch: {
        id: function (val) {
            this.getAddress(val);
        },
        selectList: function (val) {
            this.form.province = val[0].name;
            this.form.city = val[1].name;
            this.form.district = val[2].name;
        }
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    padding: 20px;
}
.he-box {
    background: #FFFFFF;
    border-radius: 16px;
}
.he-get-address {
    height: 96px;
    line-height: 96px;
    padding: 0 24px 0 32px;
    margin-bottom: 16px;
}
.he-get-address .he-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 20px;
}
.iconbtn_arrow {
    width: 22px;
    height: 22px;
    font-size: 22px;
    color: #bebebe;
}
.iconaddress_wechataddress {
    width: 36px;
    height: 36px;
    font-size: 36px;
    color: RGBA(70, 187, 54, 1);
}
.he-info {
    padding: 16px 24px;
    margin-bottom: 16px;
}
.he-info__item {
    height: 100px;
    border-bottom: 1px solid #E5E5E5;
}
.he-item__label {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-item__value {
    width: 506px;
}
.he-area-text {
    width: 484px;
}
.he-placeholder {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.he-info__itemOther {
    padding:38px 0 0 0;
}
.he-info__itemOther .he-item__label {
}
.he-info__itemOther .he-item__value {
    height: 127px;
}
.he-default {
    height: 96px;
    padding: 0 24px;
}
.he-default .he-text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}

.cu-btn {
    width: 710px;
    height: 80px;
    border-radius: 40px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-save {
    margin-top: 80px;
    @include background_color('background_color');
    color: #FFFFFF;
}
.he-delete {
    background: #FFFFFF;
    border: 1px solid #CCCCCC;
    color: #222222;
    margin-top: 24px;
}
</style>
