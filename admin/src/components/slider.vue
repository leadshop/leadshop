<template>
    <div class="slider">
        <el-slider v-model="select" :min="min" :max="max"></el-slider>
        <el-input type="text" v-model="select" class="slider-input" readonly> </el-input>
    </div>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        min: {
            type: [String, Number],
            default: 20
        },
        max: {
            type: [String, Number],
            default: 40
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
        }
    }
};
</script>
<style lang="less" scoped>
@import './slider.less';
</style>