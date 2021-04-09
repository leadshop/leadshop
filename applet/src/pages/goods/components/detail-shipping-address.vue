<template>
    <he-popup mode="bottom" v-model="showModal" :borderRadius="16">
        <view class="detail-shipping-address flex flex-direction" :data-theme="theme">
            <view class="he-header">
                <text class="he-header__title">配送至</text>
                <text class="iconfont iconpopup_close fr" @click="showModal = false;"></text>
            </view>
            <view class="he-body flex-sub">
                <scroll-view class="he-body__scroll" scroll-y>
                    <view class="he-item flex" v-for="(item, index) in list" :key="index" @click="setSelect(item)">
                        <view class="he-item__select flex justify-center align-center">
                            <text class="iconfont iconbtn_select" v-if="item.is_select"></text>
                        </view>
                        <view class="flex-sub flex flex-direction justify-center">
                            <view class="he-item__address">
                                {{ item.province }}{{ item.city }}{{ item.district }}{{ item.address }}
                            </view>
                            <view class="he-item__info">{{ item.name }} {{ item.mobile }}</view>
                        </view>
                    </view>
                </scroll-view>
            </view>
            <view class="he-footer">
                <button class="cu-btn" @click="newValue=true;">选择其他地区</button>
            </view>
        </view>
    </he-popup>
</template>

<script>
import hePopup from "../../../components/he-popup.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: "detail-shipping-address",
    components: {
        hePopup
    },
    props: {
        value: {
            type: Boolean
        },
        select: {
            type: Object,
            default: function () {
                return {
                    province: '',
                    city: '',
                    district: ''
                }
            }
        },
        isAddress: {
            type: Boolean,
            default: function () {
                return false;
            }
        }
    },
    computed: {
        ...mapGetters('user', {
            list: "getAddress"
        }),
        showModal: {
            get: function () {
                return this.value;
            },
            set: function (val) {
                this.$emit('input', val);
            }
        },
        newValue: {
            get: function () {
                return this.isAddress;
            },
            set: function (val) {
                this.showModal = false;
                this.$emit('update:isAddress', val);
            }
        }
    },
    methods: {
        ...mapActions({
            getAddress: "user/getAddress"
        }),
        setSelect: function (item) {
            for (let i = 0; i < this.list.length; i++) {
                this.list[i].is_select = false;
            }
            item.is_select = true;
            this.$emit('select', item);
            this.showModal = false;
        }
    },
    mounted: function mounted() {
        if (this.isLogin)
            this.getAddress();
    }
}
</script>

<style scoped lang="scss">
.detail-shipping-address {
    height: 63vh;
}

.he-header {
    height: 56px;
    line-height: 56px;
    text-align: center;
    margin-top: 16px;
    padding: 0 32px;
}

.iconpopup_close {
    font-size: 28px;
    width: 28px;
    height: 28px;
    line-height: 1;
    color: #9D9D9D;
    margin-top: 18px;
}

.he-header__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}

.he-body {
    margin-top: 32px;
    margin-bottom: 32px;
}

.he-body__scroll {
    height: calc(63vh - 256px);
}

.he-footer {
    height: 120px;
    padding: 0 32px;
}

.cu-btn {
    margin: 20px 0;
    height: 80px;
    width: 686px;
    border-width: 1px;
    border-style: solid;
    @include border_color('border_color');
    background: #FFFFFF;
    border-radius: 40px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 500;
    padding: 0;
    @include font_color('font_color');
}

.he-item {
    width: 750px;
    margin-bottom: 36px;
}

.he-item__select {
    width: 97px;
}

.iconbtn_select {
    font-size: 32px;
    @include font_color("font_color");
}

.he-item__address {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    padding-right: 56px;
}

.he-item__info {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
</style>
