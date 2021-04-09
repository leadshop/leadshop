<template>
    <he-popup mode="bottom" v-model="showModal" :border-radius="16">
        <view class="he-header">
            <view class="he-close flex justify-center align-center" @click="showModal = false;">
                <text class="iconfont iconpopup_close"></text>
            </view>
            <view class="he-header__text">包邮规则</view>
        </view>
        <scroll-view class="he-body" scroll-y>
            <view class="he-item" v-for="(item, index) in package.free_area" :key="index">
                <view class="he-item__top flex align-center">
                    <view class="he-item__sign"></view>
                    <view >{{package.type | getName(item, unit)}}</view>
                </view>
                <view class="he-item__bottom">{{item.area}}</view>
            </view>
        </scroll-view>
    </he-popup>
</template>

<script>
import HePopup from "@/components/he-popup.vue";

export default {
    name: "detail-free-shipping",
    props: {
        value: {
            type: Boolean
        },
        package: {
            type: Object,
            default: {}
        },
        unit: {
            type: String,
        }
    },
    components: {
        HePopup
    },
    computed: {
        showModal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input',val);
            }
        }
    },
    filters: {
        getName: function (data, item, unit) {
            switch (data) {
                case 1:
                    return '订单满' + item.number + '元包邮';
                case 2:
                    return '订单满' + item.number + '件包邮';
                case 3:
                    return '商品满' + item.number + '元包邮';
                case 4:
                    return '商品满' + item.number + unit +'包邮';
            }
        }
    }
}
</script>

<style scoped>
.he-header {
    position: relative;
    overflow: hidden;
    margin-bottom: 60px;
}
.he-close {
    position: absolute;
    right: 0;
    top: 0;
    width: 84px;
    height: 84px;
}
.he-header__text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin-top: 32px;
}
.iconpopup_close {
    font-size: 20px;
    color: #999999;
}
.he-body {
    padding: 0 32px;
    height: calc(50vh - 80px);
}
.he-item {
    margin-bottom: 51px;
}
.he-item__top {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-bottom: 21px;
}
.he-item__sign {
    width: 6px;
    height: 6px;
    background: #E60B30;
    border-radius: 50%;
    margin-right: 10px;
}
.he-item__bottom {
    margin-left: 18px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 1.3;
}
</style>