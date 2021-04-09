<template>
    <div class="hyperlink-select">
        <popup @confirm="handleConfirm" :forbidden="forbidden">
            <div class="classify-select-tag" v-if="selectData.name" @click="stop">
                <Tag @close="handleClose" :closable="!isHome">
                    {{selectData.name}}
                </Tag>
                <el-button type="text" :disabled="isHome">修改</el-button>
            </div>
            <slot v-else></slot>
        </popup>
    </div>
</template>
<script type="text/javascript">
import popup from './index.vue'
import Tag from '@/components/tag.vue'
export default {
    components: {
        popup,
        Tag,
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        index: {
            type: Number
        },
        /**
         * 禁用选项
         * @type {Object}
         */
        forbidden: {
            type: Array,
            default () {
                return []
            }
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
        selectData: {
            get() {
                return this.value
            },
            set(value) {
                let data = JSON.parse(JSON.stringify(value));
                this.$emit('input', data);
            }
        },
        isHome: function() {
            return this.index === 0;
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
        handleClose() {
            this.selectData = {};
        },
        /**
         * 处理确认事件
         * @return {[type]} [description]
         */
        handleConfirm(value) {
            this.$nextTick(() => {
                this.selectData = value;
            })
        },
        stop: function(event) {
            if (this.isHome) event.stopPropagation();
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>