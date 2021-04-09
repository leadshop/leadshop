<template>
    <he-popup mode="center" :border-radius="16" v-model="showModal" :zoom="false">
        <view class="he-box flex-direction flex" :data-theme="theme">
            <view class="he-body flex-sub">
                <view class="he-title">撤回售后申请</view>
                <text class="he-content">
                    撤销申请后，售后将被关闭，
                    如后续仍有问题，可继续申请售后，
                    是否确认撤销？
                </text>
            </view>
            <view class="he-footer flex justify-between align-end">
                <view class="he-line"></view>
                <button class="cu-btn he-cancel" @click="showModal=false;">取消</button>
                <button class="cu-btn he-sure" @click="onSubmit">确定</button>
            </view>
        </view>
    </he-popup>
</template>

<script>
import hePopup from "@/components/he-popup.vue";

export default {
    name: "afterSalesDetail-application",
    components: {
        hePopup
    },
    props: {
        value: Boolean,
        detailId: Number
    },
    computed: {
        showModal: {
            get:function () {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        onSubmit: function() {
            this.$emit('submit', this.detailId);
            this.showModal = false;
        }
    }
}
</script>

<style scoped lang="scss">
.he-box {
    width: 510px;
    height: 357px;
    background: #FFFFFF;
    border-radius: 16px;
}
.he-body {
    border-bottom: 1px solid #E5E5E5;
    font-weight: 500;
    font-family: PingFang SC;
    color: #222222;
    text-align: center;
    padding: 24px;
}
.he-title {
    margin-top: 32px;
    font-size: 32px;
}
.he-content {
    font-size: 26px;
    margin-top:20px;
    display: inline-block;
}
.he-footer {
    height: 88px;
    position: relative;
}
.cu-btn {
    width: 254px;
    height: 86px;
    border: none;
    background: #FFFFFF;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-cancel {
    color: #666666;
}
.he-sure {
   @include font_color("font_color");
}
.he-line {
    width: 2px;
    height: 88px;
    background: #E5E5E5;
    position: absolute;
    top: 0;
    left: 50%;
}
</style>