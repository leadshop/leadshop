<template>
    <div class="convert">
        <el-switch v-model="select"></el-switch> <span>{{text}}</span>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        value: {
            type: [String, Number, Boolean],
            default: ''
        },
        on: {
            type: String,
            default: "显示"
        },
        off: {
            type: String,
            default: "隐藏"
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
        select: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value);
            }
        },
        text() {
            if (this.select) {
                return this.on
            } else {
                return this.off
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import './convert.less';
</style>