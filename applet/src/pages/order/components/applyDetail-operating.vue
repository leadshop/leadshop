<template>
    <view class="applyDetail-operating" :data-theme="theme">
        <view class="he-item flex align-center justify-between">
            <view class="he-item__label">售后方式</view>
            <view class="he-item__label">{{value.type === 0 ? '仅退款' : value.type === 1 ? '退货退款' : value.type === 2 ? '换货' : '' }}</view>
        </view>
        <view class="he-item flex align-center justify-between" v-if="value.type !== 2">
            <view class="he-item__label">退款原因</view>
            <view class="flex align-center he-item__return" @click="showModal = true;">
                <view :class="value.return_reason ? 'he-item__label' : 'he-item__reason'">
                    {{value.return_reason ? value.return_reason : '请选择退款原因'}}
                </view>
                <text class="iconfont iconbtn_arrow"></text>
            </view>
        </view>
        <view class="he-item flex align-center justify-between">
            <view class="he-item__label">{{value.type === 2 ? '换货数量' : '退款数量'}}</view>
            <he-number-box :disabled-input="true" v-model="value.return_number" :min="1" :max="goods.goods_number"></he-number-box>
        </view>
        <view class="he-item he-item__other" v-if="value.type !== 2">
            <view class="flex align-center justify-between">
                <view class="he-item__label">退款金额</view>
                <view class="he-refund-amount">¥{{value.return_amount}}</view>
            </view>
            <view class="he-max-refund">最多可退¥{{value.return_amount}}</view>
        </view>
        <he-popup v-model="showModal" :border-radius="16" mode="bottom">
            <view class="he-box">
                <view class="he-header flex justify-center">
                    <text class="he-header__title">退款原因</text>
                    <view class="he-close flex justify-center align-center" @click="showModal = false;">
                        <text class="iconfont iconpopup_close"></text>
                    </view>
                </view>
                <view class="he-body">
                    <view class="he-body__item flex align-center" v-for="(item, index) in selectList" :key="index" @click="setSelect(item.value)" v-if="value.type == item.type || item.type < 0">
                        <view class="he-item__select flex align-center justify-center">
                            <text class="iconfont iconbtn_select" v-if="value.return_reason == item.value"></text>
                        </view>
                        <view class="he-item__text" :class="value.return_reason == item.value ? 'he-item__text-1': ''">{{item.value}}</view>
                    </view>
                </view>
            </view>
        </he-popup>
    </view>
</template>
<script>
import heNumberBox from "../../../components/he-number-box.vue";
import hePopup from "@/components/he-popup.vue";

export default {
    name: "applyDetail-operating",
    components: {
        heNumberBox,
        hePopup
    },
    props: {
        value: Object,
        goods:Object
    },
    computed: {

    },
    data() {
        return {
            selectList: [{
                    value: '拍错/多拍/不喜欢',
                    type: -1
                },
                {
                    value: '未按约定时间发货',
                    type: 0
                },
                {
                    value: '商品破损/少发',
                    type: 1
                },
                {
                    value: '商品与描述不符',
                    type: 1
                },
                {
                    value: '商家发错',
                    type: 1
                },
                {
                    value: '协商一致退款',
                    type: -1
                },
                {
                    value: '其他',
                    type: -1
                }
            ],
            showModal: true
        }
    },
    methods: {
        setSelect: function(return_reason) {
            this.value.return_reason = return_reason;
            this.showModal = false;
            this.$emit('input', this.value);
        }
    },
    watch: {
        "value.return_number": {
            handler(newVal) {
                this.value.return_amount = Math.floor(parseFloat(this.goods.pay_amount/this.goods.goods_number) * newVal*100)/100;
                this.$emit('input', this.value);
            },
            deep: true,
            immediate: true
        }
    }
}
</script>
<style scoped lang="scss">
.applyDetail-operating {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px 24px;
    margin-bottom: 16px;
}

.he-item {
    height: 100px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
}

.he-item__other {
    height: 136px;
    padding-top: 38px;
}

.he-item:not(:last-child) {
    border-bottom: 1px solid #E5E5E5;
}

.he-item__label {
    color: #222222;
}

.iconbtn_arrow {
    font-size: 24px;
    color: RGBA(190, 190, 190, 1);
    margin-left: 10px;
}

.he-item__reason {
    color: #999999;
}

.he-item__return {
    line-height: 1.3;
}

.he-refund-amount {
    font-size: 32px;
    font-family: DINPro;
    font-weight: bold;
    color: #222222;
}

.he-max-refund {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: right;
}

.he-box {
    height: 45vh;
}

.he-header {
    position: relative;
}

.he-header__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin: 32px 0;
}

.iconpopup_close {
    font-size: 20px;
    color: #999999;
}

.he-close {
    height: 84px;
    width: 84px;
    position: absolute;
    top: 0;
    right: 0;
}

.he-body {
    height: calc(45vh - 100px);
    padding-left: 32px;
}

.he-body__item {
    height: 80px;
}

.he-item__select {
    width: 32px;
    height: 32px;
    margin-right: 32px;
}

.he-item__text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}

.he-item__text-1 {
    color: #222222;
}

.iconbtn_select {
    font-size: 32px;
    @include font_color('font_color');
}
</style>