<template>
    <div class="content" @dragover="allowDrop($event)">
        <div class="cloud-header">
            <h2>default</h2>
        </div>
        <div class="cloud-body">
        </div>
    </div>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
export default {
    components: {
        // empty
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
        allowDrop() {

        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>