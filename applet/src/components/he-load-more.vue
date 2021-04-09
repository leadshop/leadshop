<template>
    <view class="he-load-more-wrap" :style="{
		backgroundColor: bgColor,
		marginBottom: marginBottom + 'rpx',
		marginTop: marginTop + 'rpx',
		height: $h.addUnit(height)
	}">
        <he-line color="#d4d4d4" length="50"></he-line>
        <!-- 加载中和没有更多的状态才显示两边的横线 -->
        <view :class="status == 'loadmore' || status == 'nomore' ? 'he-more' : ''" class="he-load-more-inner">
            <view class="he-loadmore-icon-wrap">
                <he-loading class="he-loadmore-icon" :color="iconColor" :mode="iconType == 'circle' ? 'circle' : 'flower'" :show="status == 'loading' && icon"></he-loading>
            </view>
            <!-- 如果没有更多的状态下，显示内容为dot（粗点），加载特定样式 -->
            <view class="he-line-1 he-load-text" :style="[loadTextStyle]" :class="[(status == 'nomore' && isDot == true) ? 'he-dot-text' : 'he-more-text']" @tap="loadMore">
                {{ showText }}
            </view>
        </view>
        <he-line color="#d4d4d4" length="50"></he-line>
    </view>
</template>

<script>
import heLine from "./he-line.vue";
import heLoading from "./he-loading.vue";

export default {
    name: "he-load-more",
    components: {
        heLine,
        heLoading
    },
    props: {
        // 组件背景色
        bgColor: {
            type: String,
            default: 'transparent'
        },
        // 是否显示加载中的图标
        icon: {
            type: Boolean,
            default: true
        },
        // 字体大小
        fontSize: {
            type: String,
            default: '26'
        },
        // 字体颜色
        color: {
            type: String,
            default: '#999999'
        },
        // 组件状态，loadmore-加载前的状态，loading-加载中的状态，nomore-没有更多的状态
        status: {
            type: String,
            default: 'loadmore'
        },
        // 加载中状态的图标，flower-花朵状图标，circle-圆圈状图标
        iconType: {
            type: String,
            default: 'flower'
        },
        // 显示的文字
        loadText: {
            type: Object,
            default () {
                return {
                    loadmore: '加载更多',
                    loading: '加载中..',
                    nomore: '没有更多了'
                }
            }
        },
        // 在“没有更多”状态下，是否显示粗点
        isDot: {
            type: Boolean,
            default: false
        },
        // 加载中显示圆圈动画时，动画的颜色
        iconColor: {
            type: String,
            default: '#b7b7b7'
        },
        // 上边距
        marginTop: {
            type: [String, Number],
            default: 10
        },
        // 下边距
        marginBottom: {
            type: [String, Number],
            default: 10
        },
        // 高度，单位rpx
        height: {
            type: [String, Number],
            default: 'auto'
        }
    },
    data() {
        return {
            // 粗点
            dotText: "●"
        }
    },
    computed: {
        // 加载的文字显示的样式
        loadTextStyle() {
            return {
                color: this.color,
                fontSize: this.fontSize + 'rpx',
                position: 'relative',
                zIndex: 1,
                backgroundColor: this.bgColor,
                // 如果是加载中状态，动画和文字需要距离近一点
            }
        },
        // 加载中圆圈动画的样式
        cricleStyle() {
            return {
                borderColor: `#e5e5e5 #e5e5e5 #e5e5e5 ${this.circleColor}`
            }
        },
        // 加载中花朵动画形式
        // 动画由base64图片生成，暂不支持修改
        flowerStyle() {
            return {
            }
        },
        // 显示的提示文字
        showText() {
            let text = '';
            if(this.status == 'loadmore') text = this.loadText.loadmore;
            else if(this.status == 'loading') text = this.loadText.loading;
            else if(this.status == 'nomore' && this.isDot) text = this.dotText;
            else text = this.loadText.nomore;
            return text;
        }
    },
    methods: {
        loadMore() {
            // 只有在“加载更多”的状态下才发送点击事件，内容不满一屏时无法触发底部上拉事件，所以需要点击来触发
            if(this.status == 'loadmore') this.$emit('loadmore');
        }
    }
}
</script>

<style scoped>

/* #ifdef MP */
u-line {
    flex: none;
}
/* #endif */

.he-load-more-wrap {
    display: flex;

    justify-content: center;
    align-items: center;
}

.he-load-more-inner {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 12px;
}

.he-more {
    position: relative;
    display: flex;
    justify-content: center;
}

.he-dot-text {
    font-size: 28px;
}

.he-loadmore-icon-wrap {
    margin-right: 8px;
}

.he-loadmore-icon {
    display: flex;
    align-items: center;
    justify-content: center;
}
.he-load-text {
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 1.3;
}
</style>
