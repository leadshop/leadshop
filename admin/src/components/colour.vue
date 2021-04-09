<template>
    <div class="colour">
        <el-color-picker v-model="select" :predefine="predefineColors"></el-color-picker>
        <el-input type="text" v-model="select" class="colour-input" readonly> </el-input>
        <el-button type="text" class="colour-reset" @click="onReset">重置</el-button>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        colour: {
            type: [String, Number],
        }
    },
    data() {
        return {
            predefineColors: [
                '#ff4500',
                '#ff8c00',
                '#ffd700',
                '#90ee90',
                '#00ced1',
                '#1e90ff',
                '#c71585'
            ]
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        select: {
            get() {
                return this.value || this.colour || '#cccccc';
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    methods: {
        /**
         * 重置颜色
         * @param  {[type]} key   [description]
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        onReset(key, value) {
            this.select = this.colour || "#CCCCCC";
        }
    }
};
</script>
<style lang="less" scoped>
@import './colour.less';
</style>