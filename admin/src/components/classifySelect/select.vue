<template>
    <div class="classify-select">
        <popup v-model="selectData" type="checkbox" @confirm="handleConfirm">
            <el-button v-if="!selectData.name">选择分类</el-button>
            <el-form-item label="商品分类" label-width="80px" v-if="selectData.name">
                <Tag @close="handleClose">
                    <div class="classify-select-tag">{{selectData.name | setleng}}</div>
                </Tag>
                <el-button type="text">修改</el-button>
            </el-form-item>
        </popup>
        <el-form-item label="显示件数" label-width="80px" v-show="selectData.name">
            <el-input type="text" maxlength="50" v-model="limit" @change="handleChange">
            </el-input>
            <span class="classify-select-tips">最多添加50件商品</span>
        </el-form-item>
    </div>
</template>
<script type="text/javascript">
import popup from './index.vue'
import Tag from '@/components/tag.vue'
export default {
    components: {
        popup,
        Tag
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        }
    },
    data() {
        return {
            limit: 20
        };
    },
    filters: {
        setleng: (value) => {
            if (value.length > 9) {
                return value.substring(0, 7) + "..."
            } else {
                return value
            }
        }
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
                data.limit = this.limit;
                this.$emit('input', data);
            }
        }
    },

    methods: {
        handleConfirm(data) {
            this.$emit('confirm', data);
        },
        /**
         * 关闭
         * @return {[type]} [description]
         */
        handleClose(index) {
            this.$emit('delete', {});
            this.selectData = {}
        },
        /**
         * 修改
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        handleChange(value) {
            let data = JSON.parse(JSON.stringify(this.value));
            data.limit = this.limit;
            this.$emit('input', data);
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>