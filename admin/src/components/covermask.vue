<template>
    <div class="covermask" data-type="forbid">
        <span>释放鼠标将组建添加到此处</span>
    </div>
</template>
<script type="text/javascript">
export default {
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        coms() {
            return this.$store.state.finish.coms;
        }
    },
    methods: {
    
    }
};
</script>
<style lang="less" scoped>
@import './covermask.less';
</style>