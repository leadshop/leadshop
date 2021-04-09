<template>
    <view class="search" :style="{ 
                'padding-top': facade.high_style/2 + 'px' ,
                'padding-bottom': facade.high_style/2 + 'px' ,
                'background-color':facade.background_color,
            }" @click="navigateToDetail">
        <view class="search-content" :class="{'angle':facade.border_style==2}" :style="{ 
                textAlign: facade.text_align ,
                color: facade.text_color ,
                'background-color':facade.border_color,
            }">
            <text class="iconfont iconsearchbar_search" :style="{ 
                color: facade.icon_color ,
            }"></text><span>{{content.text||'请输入关键字搜索'}}</span>
        </view>
    </view>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
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

        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {

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
        navigateToDetail() {
            uni.navigateTo({
                url: "/pages/goods/search"
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>