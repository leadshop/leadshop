<template>
    <view class="cap-cube" style="margin: 0px;" :style="{ 
                width:width+'px',
                height:height+'px',
            }">
        <view class="cap-cube__item" style="margin: 0px;" :style="{
        left:item.left +'px',
        top:item.top +'px',
        height:item.height +'px',
        width:item.width +'px',
        backgroundImage:'url('+(item.url || url)+')' ,
        }" v-for="(item,index) in picture" :key="index"  @click="navigateToDetail(item.link)">
        </view>
    </view>
</template>
<script type="text/javascript">
export default {
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            url: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/le-default-goods-bg.png"
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        window() {
            return uni.getSystemInfoSync();
        },
        width() {
            let data = uni.getSystemInfoSync();
            let w = 0;
            switch (parseInt(this.content.style)) {
                case 2:
                case 4:
                case 6:
                    w = data.windowWidth / 2;
                    break;
                case 3:
                    w = data.windowWidth / 3;
                    break;
                case 5:
                    w = data.windowWidth / 4;
                    break;
                default:
                    w = data.windowWidth;
                    break;
            }
            return w;
        },
        height() {
            let data = uni.getSystemInfoSync();
            switch (this.content.style) {
                case 2:
                case 6:
                    return data.windowWidth / 2;
                    break;
                case 3:
                case 5:
                    return data.windowWidth / 3;
                    break;
                default:
                    return data.windowWidth;
            }
        },
        /**
         * 图片计算
         * @return {[type]} [description]
         */
        picture() {
            let fun = 'style' + this.content.style;
            return this[fun].call(this);
        }
    },
    methods: {
        /**
         * 导航详情
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        navigateToDetail(item) {
            if (item.extend) {
                if (item.index == 2) {
                    uni.navigateTo({
                        url: item.path + '?id=' + item.param.id
                    });
                }
                if (item.index == 7) {
                    uni.navigateTo({
                        url: item.path + '?id=' + item.param.id
                    });
                }
                if (item.index == 3) {
                    uni.switchTab({
                        url: item.path + '?id=' + item.param.id
                    });
                }
            } else {
                if ([3, 4, 5].indexOf(item.index) == -1) {
                    uni.navigateTo({
                        url: item.path
                    });
                } else {
                    uni.switchTab({
                        url: item.path
                    });
                }
            }
        },
        style1() {
            let array = [];
            let left = 0;
            let top = 0;
            for (let i = 0; i < 1; i++) {
                let item = this.content.data[i];
                array[i] = {
                    ...item,
                    left: left,
                    top: top,
                    width: this.width,
                    height: this.height
                }
                left = left + parseFloat(this.width);
            }
            return array;
        },
        /**
         * 样式2
         * @return {[type]} [description]
         */
        style2() {
            let array = [];
            let left = 0;
            let top = 0;
            for (let i = 0; i < 2; i++) {
                let item = this.content.data[i];
                array[i] = {
                    ...item,
                    left: left,
                    top: top,
                    width: this.width,
                    height: this.height
                }
                left = left + parseFloat(this.width);
            }
            return array;
        },
        /**
         * 样式3
         * @return {[type]} [description]
         */
        style3() {
            let array = [];
            let left = 0;
            let top = 0;
            for (let i = 0; i < 3; i++) {
                let item = this.content.data[i];
                array[i] = {
                    ...item,
                    left: left,
                    top: top,
                    width: this.width,
                    height: this.height
                }
                left = left + parseFloat(this.width);
            }
            return array;
        },
        /**
         * 样式3
         * @return {[type]} [description]
         */
        style4() {
            let array = [];
            let left = 0;
            let top = 0;
            for (let i = 0; i < 3; i++) {
                let item = this.content.data[i];
                array[i] = {
                    ...item,
                    left: left,
                    top: top,
                    width: this.width,
                    height: i == 0 ? this.height : this.height / 2
                }
                if (i === 0) {
                    left = left + parseFloat(this.width);
                }
                if (i == 1) {
                    let _h = this.height / 2;
                    top = top + parseFloat(_h);
                }
            }

            return array;
        },
        /**
         * 样式3
         * @return {[type]} [description]
         */
        style5() {
            let array = [];
            let left = 0;
            let top = 0;
            for (let i = 0; i < 4; i++) {
                let item = this.content.data[i];
                array[i] = {
                    ...item,
                    left: left,
                    top: top,
                    width: this.width,
                    height: this.height
                }
                left = left + parseFloat(this.width);
            }
            return array;
        },
        /**
         * 样式3
         * @return {[type]} [description]
         */
        style6() {
            let array = [];
            let left = 0;
            let top = 0;
            for (let i = 0; i < 4; i++) {
                let item = this.content.data[i];
                array[i] = {
                    ...item,
                    left: left,
                    top: top,
                    width: this.width,
                    height: this.height / 2
                }
                if (i === 0 || i == 2) {
                    left = left + parseFloat(this.width);
                }
                if (i === 1) {
                    top = top + parseFloat(this.height / 2);
                    left = 0;
                }
            }
            return array;
        },
    }
}
</script>
<style type="text/css">
.cap-cube {
    position: relative;

}

.cap-cube__item {
    position: absolute;
    overflow: hidden;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    background-position: center center;
}
</style>