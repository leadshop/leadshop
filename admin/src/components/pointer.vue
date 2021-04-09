<template>
    <div class="pointer" :style="{
        marginBottom:margin+'px',
        marginLeft:margin/2+'px',
    }">
        <div class="pointer-content" :class="{
        circle:type==1,
        strip:type==2,
    }" :style="{
        textAlign:align,
    }" v-if="type<3">
            <span class="pointer-item active" :style="{
                'background-color':color
            }"></span>
            <span class="pointer-item"></span>
            <span class="pointer-item"></span>
        </div>
        <div class="pointer-text" v-if="type==3" :style="{
            textAlign:align
        }">
            <span>1/3</span>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
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

    }
};
</script>
<style lang="less" scoped>
@import './pointer.less';
</style>