<template>
    <view class="banner">
        <view class="banner-item-photo" :style="{width: '100%',height: height}">
            <swiper class="banner-item-image" :circular="circular" :autoplay="autoplay" @change="handleChange" :class="{'corner':facade.chamfer_style==2}">
                <swiper-item class="banner-item-cover" v-for="item,index in contentData" :key="index">
                    <image lazy-load :src="item.url" mode="aspectFill" style="width: 100%;height: 100%" @click="navigateToDetail(item.link)"></image>
                </swiper-item>
            </swiper>
            <pointer :current="current" :number="contentData.length" :margin="margin" :color="facade.indicator_color" :type="facade.indicator_style" :align="facade.indicator_align"></pointer>
        </view>
    </view>
</template>
<script type="text/javascript">
import pointer from '@/components/pointer.vue'
import MPageNavigate from "../../../libs/function/MPageNavigate";
export default {
    components: {
        pointer
    },
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
            current: 0,
            autoplay: true,
            circular: true
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        height() {
            const res = uni.getSystemInfoSync();
            let _r = 0.4;
            return (res.windowWidth * _r) + 'px';
        },
        contentData() {
            let _array = [];
            for (let index in this.content) {
                let item = this.content[index];
                if (item.url) {
                    _array.push(item);
                }
            }
            return _array;
        },
        margin() {
            if (this.facade.chamfer_style == 1) {
                return 10;
            } else {
                return 20;
            }
        }
    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {

    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {

    },
    methods: {
        /**
         * 导航详情
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        navigateToDetail(item) {
            this.$h.MPageNavigate(item);
        },
        /**
         * 修改数据变更
         * @param  {[type]} event [description]
         * @return {[type]}       [description]
         */
        handleChange(event) {
            this.current = event.detail.current
        },
        getCover(cover = "") {
            let url = "";
            if (cover) {
                if (Object.prototype.toString.call(cover) == '[object Array]' && cover[0]) {
                    return cover[0].url;
                }
            }
            return url;
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>