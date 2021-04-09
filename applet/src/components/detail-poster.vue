<template>
    <view>
        <canvas :style="{width:562+'rpx', height:784+'rpx', background: 'orange'}" id="graceCanvas" canvas-id="graceCanvas" class="grace-canvas"></canvas>
    </view>
</template>

<script>
export default {
    name: "detail-poster",
    props: {
        goods: Object
    },
    data() {
        return {
            width:  562,   // 画布宽度，单位 rpx
            height: 784,  // 画布高度
            widthIn: 300,   // 自动计算转换为 px
            heightIn: 500,  // 自动计算转换为 px
            context: null
        }
    },
    mounted() {
        setTimeout(() => {
            // 画布初始化
            const ctx = uni.createCanvasContext('graceCanvas')
            ctx.setFillStyle('red')
            ctx.fillRect(0, 0, 1500, 2000)
            ctx.setFillStyle('blue')
            ctx.fillRect(150, 0, 150, 200)
            ctx.clearRect(10, 10, 150, 75)
            ctx.draw()
        }, 2000)
        //延迟1秒等待画布创建
        // setTimeout(()=>{this.draw();}, 1000);
    },
    methods: {
        // 画布初始化
        initSize : function () {
            this.widthIn  = uni.upx2px(this.width);
            this.heightIn = uni.upx2px(this.height);
        },
        draw: function() {
            // 步骤 01. 绘制背景颜色
            this.step01();
        },
        // 步骤 01 : 绘制背景颜色
        step01 : function () {
            this.context.setFillStyle('#F1F3F5');
            this.context.fillRect(0,0,this.widthIn, this.heightIn);
            this.context.drawImage(this.goods.slideshow[0],0,0,this.widthIn, this.heightIn);
        },
    }
}
</script>

<style scoped>

</style>
