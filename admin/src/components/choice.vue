<template>
    <div class="choice">
        <ul>
            <li v-for="item,index in data" :key="index" class="choice-radio" :style="{width:width}">
                <label>
                    <input type="radio" :name="group" class="choice-input" :value="item.value" v-model="select">
                    <div class="choice-item">
                        <i class="le-icon" :class="item.icon"></i>
                        <span>{{item.name}}</span>
                    </div>
                </label>
            </li>
        </ul>
    </div>
</template>
<script type="text/javascript">
export default {
    props: {
        value: {
            type: [String, Number],
            default: ''
        },
        group: {
            type: [String, Number],
            default: 'choice'
        },
        data: {
            type: Array,
        },
        width: {
            type: String,
            default: "84px"
        }
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
@import './choice.less';
</style>