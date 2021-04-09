<template>
    <he-popup v-model="showModal" mode="center" :border-radius="16">
        <view class="after-receipt flex flex-direction align-center" :data-theme="theme">
            <view class="flex align-center justify-center he-header">
                <view class="he-radio flex justify-center align-center">
                    <text class="iconfont iconbtn_select"></text>
                </view>
                <text class="he-title">确认收货成功</text>
            </view>
            <view class="he-body">分享您的体验，给小伙伴提供更多参考吧</view>
            <button class="cu-btn he-button" @click="navigateTo">好的({{num}}S)</button>
        </view>
    </he-popup>
</template>

<script>
import hePopup from "@/components/he-popup.vue";

export default {
    name: "after-receipt",
    props: {
        value: Boolean,
        orderId: Number
    },
    components: {
        hePopup
    },
    data() {
        return {
            time: null,
            num: 3
        }
    },
    computed: {
        showModal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        setTime: function() {
            let _this = this;
            this.time = setInterval(function() {
                _this.num--;
                if (_this.num <= 0) {
                    _this.showModal = false;
                    _this.clearTime();
                    _this.navigateTo();
                }
            }, 1000);
        },
        clearTime: function() {
            clearInterval(this.time);
            this.time = null;
        },
        navigateTo: function () {
            this.clearTime();
            this.showModal = false;
            uni.navigateTo({url: "/pages/order/evaluation?id=" + this.orderId});
        }
    },
    watch: {
        'showModal': {
            handler(val) {
                if (val) {
                    this.setTime();
                } else {
                    this.clearTime();
                }
            },
            immediate: true
        }
    }
}
</script>

<style scoped lang="scss">
.after-receipt {
    width: 590px;
    height: 330px;
    background: #FFFFFF;
    overflow: hidden;
}
.he-radio {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #22AC38;
    margin-right: 4px;
}
.iconbtn_select {
    color: #FFFFFF;
}
.he-title {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #22AC38;
    margin-left: 4px;
}
.he-header {
    margin-top:65px;
}
.he-body {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: 24px;
}
.he-button {
    width: 400px;
    height: 72px;
    border-radius: 36px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin-top: 55px;
    @include background_color("background_color");
}
</style>