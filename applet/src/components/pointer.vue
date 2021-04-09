<template>
    <view class="pointer" :style="{
        marginBottom:margin+'px',
        padding:'0 '+  margin/2+'px'
    }">
        <view class="pointer-content" :class="{
        circle:type==1,
        strip:type==2,
    }" :style="{
        textAlign:align,
    }" v-if="type<3">
            <span class="pointer-item" :style="{
                'background-color':activeColor(index)
            }" v-for="i,index in number" :key="index"></span>
        </view>
        <view class="pointer-text" v-if="type==3" :style="{
            textAlign:align
        }">
            <span>{{current+1}}/{{number}}</span>
        </view>
    </view>
</template>
<script type="text/javascript">
export default {
    props: {
        current: {
            type: [String, Number, Boolean],
            default: 1
        },
        number: {
            type: [String, Number, Boolean],
            default: ''
        },
        margin: {
            type: [Number],
            default: 8
        },
        type: {
            type: [String, Number, Boolean],
            default: 1
        },
        align: {
            type: [String, Number, Boolean],
            default: 'left'
        },
        color: {
            type: [String, Number, Boolean],
            default: '#f44'
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
        activeColor(index) {
            return (this.current) == index ? this.color : "rgba(0,0,0,.3)";
        }
    }
};
</script>
<style lang="less" scoped>
@import './pointer.less';
</style>