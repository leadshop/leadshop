<template>
    <div class="control attribute">
        <h3 class="control-content__title">{{title}}</h3>
        <slot></slot>
        <el-tabs value="first" class="control-content__tabs" v-if="is_tab">
            <el-tab-pane label="内容设置" name="first">
                <slot name="content"></slot>
            </el-tab-pane>
            <el-tab-pane label="样式设置" name="second">
                <slot name="style"></slot>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        title: {
            type: String,
            default: '搜索框设置'
        },
        size: {
            type: String,
            default: "14px;"
        },
        is_tab: {
            type: Boolean,
            default: true
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
@import './control.less';
</style>