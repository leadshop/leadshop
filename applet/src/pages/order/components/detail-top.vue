<template>
    <view :data-theme="theme">
        <view class="detail-top flex align-center justify-between">
            <view class="flex-sub">
                <view class="he-status__text">
                    {{getStatus}}
                </view>
                <view class="he-countdown" v-if="tradeSetting.cancel_status === 1 && status === 100">
                    剩{{ h }}小时{{i}}分钟自动关闭
                </view>
                <view class="he-countdown" v-if="status === 202">
                    剩{{d}}天{{ h }}小时自动确认收货
                </view>
                <view class="he-countdown" v-if="status === 102">
                    超时未付款
                </view>
                <view class="he-countdown" v-else-if="status === 103 || status === 101">
                    订单已取消
                </view>
            </view>
            <image class="he-icon" :src="getIcon"></image>
        </view>
    </view>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "detail-top",
    props: {
        status: {
            type: Number,
            default: function () {
                return 0;
            }
        },
        createdTime: {
            type: Number,
            default: function () {
                return 0;
            }
        },
        afterSales: {
            type: Number,
            default: function () {
                return 0;
            }
        },
        receivedTime: {
            type: Number,
            default: function () {
                return 0;
            }
        }
    },
    data() {
        return {
            d: '00',
            h: '00', // 小时的默认值
            i: '00', // 分钟的默认值
            timestamp: 0,
            timer: null ,// 定时器
            seconds: 0
        }
    },
    computed: {
        ...mapGetters('setting', {
            tradeSetting: 'tradeSetting'
        }),
        getStatus: function() {
            switch (this.status) {
                case 100:
                    return '等待买家付款';
                case 201:
                    return '等待卖家发货';
                case 202:
                    return '等待买家收货';
                case 203:
                    return '交易成功';
                case 204:
                    return '已完成';
                case 101:
                    return '已关闭';
                case 102:
                    return '已关闭';
                case 103:
                    return '已关闭';
                default:
                    return '';
            }
        },
        getIcon: function() {
            let ip = this.ipAddress + "/";
            if (this.afterSales === 0) {
                switch (this.status) {
                    case 100:
                        // 支付
                        return ip+ 'order-image-pay.png';
                    case 201:
                        // 发货
                        return ip+ 'order-image-ship.png';
                    case 202:
                        // 收货
                        return ip+ 'order-image-receipt.png';
                    case 203:
                        // 完成
                        return ip+ 'order-image-success.png';
                    case 204:
                        return ip+ 'order-image-success.png';
                    case 101:
                        return ip+ 'order-image-close.png';
                    case 102:
                        return ip+ 'order-image-close.png';
                    case 103:
                        return ip+ 'order-image-close.png';
                    default:
                        return ip+ 'order-image-close.png';
                }
            } else if (this.afterSales === 1) {
                switch (this.status) {
                    case 203:
                        return ip+ "order-image-complete.png";
                }
            }

        }
    },
    watch: {
        timestamp() {
            this.clearTimer();
            this.start();
        }
    },
    methods: {
        // 倒计时
        start() {
            // 避免可能出现的倒计时重叠情况
            let _this = this;
            this.clearTimer();
            if (this.timestamp <= 0) return;
            this.seconds = Number(this.timestamp);
            this.formatTime(this.seconds);
            this.timer = setInterval(function()  {
                _this.seconds--;
                if (_this.seconds < 0) {
                    return _this.end();
                }
                _this.formatTime(_this.seconds);
            }, 1000);
        },
        // 格式化时间
        formatTime(seconds) {
            seconds <= 0 && this.end();
            let [day, hour, minute] = [0, 0, 0];
            day = Math.floor(seconds / (60 * 60 * 24));
            hour = Math.floor(seconds / (60 * 60)) - day * 24;
            let showHour = null;
            showHour = Math.floor(seconds / (60 * 60));
            minute = Math.floor(seconds / 60) - hour * 60 - day * 24 * 60;
            showHour = showHour < 10 ? '0' + showHour : showHour;
            minute = minute < 10 ? '0' + minute : minute;
            if (this.status !== 202) {
                this.h = showHour;
            } else {
                this.d = day;
                this.h = hour;
            }
            this.i = minute;
        },
        end: function() {
            this.clearTimer();
        },
        // 清除定时器
        clearTimer() {
            if(this.timer) {
                // 清除定时器
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    },
    mounted() {
        let _this = this;
        let end = null;
        setTimeout(function() {
            if (_this.status !== 202) {
                end = _this.createdTime * 1000 + _this.tradeSetting.cancel_time * 3600000;
            } else {
                end = _this.receivedTime * 1000;
            }
            let start = Date.now();
            let difference = end - start;
            if (difference > 0) {
                _this.timestamp = difference / 1000;
            } else {
                _this.timestamp = 0;
            }
        }, 800);
    },
    beforeDestroy() {
        clearInterval(this.timer);
        this.timer = null;
    }
}
</script>

<style scoped lang="scss">
.detail-top {
    width: 100%;
    height: 240px;
    @include background_linear('background_color', 0deg, 0%, 100%);
    padding:0 80px 54px 44px;
    position: absolute;
    top: 0;
}
.he-icon {
    width: 120px;
    height: 120px;
}
.he-status__text {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #FFFFFF;
    line-height: 1.3;
    margin-bottom: 7px;
}
.he-countdown {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.3;
    margin-top: 7px;
}
</style>