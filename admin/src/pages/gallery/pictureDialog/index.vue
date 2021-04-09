<template>
    <popup @confirm="handleConfirm" @close="handleClose" :limit="limit" v-model="url">
        <slot name="preview" v-if="url" :url="url"></slot>
        <slot name="upload" v-else></slot>
    </popup>
</template>
<script type="text/javascript">
import popup from './popup.vue'
export default {
    components: {
        popup,
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        /**
         * 上传限制
         * @type {Number}
         */
        limit: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            ddd: [1, 23, 4, 2]
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        url: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
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
        handleConfirm(value) {
            this.url = value;
            this.$emit("blur", value);
            this.$emit("confirm", value);
        },
        handleClose(value) {
            this.$emit("blur", value);
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>