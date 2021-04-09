<template>
    <view class="he-settlement flex align-center justify-between" :data-theme="theme">
        <view class="flex align-center" @click.stop="setAll">
            <he-radio :is-change="false" v-model="all"></he-radio>
            <view class="he-select__all">全选</view>
        </view>
        <view v-if="!isEdit" class="flex">
            <view class="he-price">
                <view>
                    <text class="he-total__text">合计：</text>
                    <text class="he-total__price">¥{{total | floatPrice}}</text>
                </view>
                <view class="he-shipping__text">不含运费</view>
            </view>
            <button class="cu-btn he-button" @click="submit('submit')">结算</button>
        </view>
        <button v-else class="cu-btn he-btn__delete" @click="submit('del')">删除</button>
    </view>
</template>

<script>
import heRadio from "@/components/he-radio.vue";

export default {
    name: "cart-settlement",
    components: {
        heRadio
    },
    props: {
        value: {
            type: Boolean
        },
        total: {
            type: Number
        },
        isEdit: {
            type: Boolean
        },
        select: {
            type: Array
        }
    },
    computed: {
        all: {
            get: function () {
                return this.value;
            },
            set: function(val) {
                return this.$emit('input', val);
            }
        }
    },
    methods: {
        submit: function(item) {
            if (!this.$h.test.isEmpty(this.select)) {
                this.$emit(item);
            } else {
                this.$h.toast("您还没有选择宝贝哦");
            }
        },
        setAll: function() {
            this.all = !this.all;
            this.$emit('setAll', !this.all);
        }
    }
}
</script>

<style scoped lang="scss">
.he-settlement {
    position: fixed;
    bottom: var(--window-bottom);
    width: 100%;
    height: 96px;
    background: #FFFFFF;
    padding: 0 20px;
}
.he-button {
    width: 180px;
    height: 72px;
    background: #E60B30;
    @include background_color('background_color');
    border-radius: 36px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
}
.he-select__all {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-left: 16px;
}
.he-price {
    margin-right: 24px;
}
.he-total__text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-total__price {
    font-size: 32px;
    font-family: DINPro;
    font-weight: bold;
    @include font_color('font_color');
}
.he-shipping__text {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: right;
}
.he-btn__delete {
    width: 180px;
    height: 72px;
    background: #FFFFFF;
    border-radius: 36px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    border-style: solid;
    border-width: 1px;
    @include border_color("border_color");
    @include font_color('font_color');
}
.he-button[disabled] {
    background: #cccccc !important;
    opacity: 1;
    color: #FFFFFF;
}
.he-btn__delete[disabled] {
  opacity: 1;
  background-color: #FFFFFF!important;
}
</style>
