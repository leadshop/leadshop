<template>
    <div class="choose">
        <ul>
            <li v-for="item,index in data" :key="index" class="choose-radio" :style="{
                width: width,
                height: height
            }">
                <label>
                    <input type="radio" :name="group" class="choose-input" :value="item.value" v-model="select">
                    <div class="choose-item" :style="{padding:padding}">
                        <img :src="item.active" v-if="is_active(item)">
                        <img :src="item.src" v-else>
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
            default: ""
        },
        width: {
            type: [String, Number],
            default: '248px'
        },
        height: {
            type: [String, Number],
            default: '60px'
        },
        padding: {
            type: [String, Number],
            default: '6px'
        },
        group: {
            type: [String, Number],
            default: 'choose'
        },
        data: {
            type: Array,
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
    },
    methods: {
        is_active(item) {
            if (item.active) {
                if (item.value === this.value) {
                    return true;
                }
            }
            return false;
        }
    }
};
</script>
<style lang="less" scoped>
@import './choose.less';
</style>