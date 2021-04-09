<template>
    <Widget :index="index">
        <Element  :facade="facade" :content="content"></Element>
    </Widget>
</template>
<script type="text/javascript">
import Widget from '@/components/widget.vue'
import Element from './element.vue'
export default {
    components: {
        Widget,
        Element
    },
    props: {
        index: {
            type: [Number, String]
        },
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

    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>