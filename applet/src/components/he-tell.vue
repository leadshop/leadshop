<template>
    <he-popup mode="center" v-model="showModal" :border-radius="16" :zoom="false">
        <view class="he-box flex flex-direction" :data-theme="theme">
            <view class="he-box__content flex-sub">
                <view class="he-box__title">联系我们</view>
                <view class="he-box__mobile">{{phoneNumber}}</view>
            </view>
            <view class="he-box__footer">
                <view class="he-line"></view>
                <button class="cu-btn fl" @click="showModal = false;">取消</button>
                <button class="cu-btn fr" @click="makePhone">拨打</button>
            </view>
        </view>
    </he-popup>
</template>

<script>
import HePopup from "@/components/he-popup";
export default {
    name: "he-tell",
    props: {
        value: {
            type: Boolean
        },
        phoneNumber: {
            type: String
        }
    },
    computed: {
        showModal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        makePhone: function() {
            uni.makePhoneCall({
                phoneNumber: this.phoneNumber,
                success: function() {
                },
                fail: function(err) {
                    console.error(err);
                }
            });
            this.showModal = false;
        }
    },
    components: {HePopup}
}
</script>

<style scoped lang="scss">
.he-box {
    width: 510px;
    height: 289px;
}
.he-box__content {
    text-align: center;
    font-size: 32px;
    font-family: PingFang SC;
    color: #222222;
    overflow: hidden;
}
.he-box__title {
    font-weight: 500;
    margin-top: 57px;
}
.he-box__mobile {
    font-weight: bold;
    margin-top: 21px;
}
.he-box__footer {
    position: relative;
}
.cu-btn {
    width: 254.5px;
    height: 88px;
    border-radius: 0;
    background: transparent;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    border-top: 1px solid #E5E5E5;
}
.cu-btn.fl {
    color: #666666;
}
.cu-btn.fr {
    @include font_color('font_color');
}
.he-line {
    height: 89px;
    width: 1px;
    background: #E5E5E5;
    position: absolute;
    z-index: 1;
    left:50%;
    transform: translateX(-50%);
}
</style>