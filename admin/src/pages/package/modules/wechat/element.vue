<template>
    <div class="wechat">
        <img src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/wechat_bg.png" width="100%" height="100%">
    </div>
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

        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        margin() {
            if (this.facade.chamfer_style == 1) {
                return 0;
            } else {
                return 10;
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

    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>