<template>
    <view class="he-line" :style="[lineStyle]">

    </view>
</template>

<script>

export default {
    name: 'he-line',
    props: {
        color: {
            type: String,
            default: '#e4e7ed'
        },
        // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带rpx单位的值等
        length: {
            type: String,
            default: '100%'
        },
        // 线条方向，col-竖向，row-横向
        direction: {
            type: String,
            default: 'row'
        },
        // 是否显示细边框
        hairLine: {
            type: Boolean,
            default: true
        },
        // 线条与上下左右元素的间距，字符串形式，如"30rpx"、"20rpx 30rpx"
        margin: {
            type: String,
            default: '0'
        },
        // 线条的类型，solid-实线，dashed-方形虚线，dotted-圆点虚线
        borderStyle: {
            type: String,
            default: 'solid'
        }
    },
    computed: {
        lineStyle() {
            let style = {};
            style.margin = this.margin;
            // 如果是水平线条，边框高度为1px，再通过transform缩小一半，就是0.5px了
            if(this.direction == 'row') {
                // 此处采用兼容分开写，兼容nvue的写法
                style.borderBottomWidth = '1px';
                style.borderBottomStyle = this.borderStyle;
                style.width = this.$h.addUnit(this.length);
                if(this.hairLine) style.transform = 'scaleY(0.5)';
            } else {
                // 如果是竖向线条，边框宽度为1px，再通过transform缩小一半，就是0.5px了
                style.borderLeftWidth = '1px';
                style.borderLeftStyle = this.borderStyle;
                style.height = this.$h.addUnit(this.length);
                if(this.hairLine) style.transform = 'scaleX(0.5)';
            }
            style.borderColor = this.color;
            return style;
        }
    }
}
</script>

<style scoped>

.he-line {
    vertical-align: middle;
}
</style>
