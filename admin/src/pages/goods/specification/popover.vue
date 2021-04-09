<template>
    <el-popover placement="bottom-start" v-model="visible" title="" width="124" class="specification-popover">
        <div class="specification-popover__content">
            <el-input v-model="inputValue" :type="type" @input="inputChange"></el-input>
        </div>
        <div class="specification-popover__footer">
            <el-button type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" @click="handleConfirm">确定</el-button>
        </div>
        <el-button type="text" slot="reference" style="padding-left: 0;">
            <slot></slot>
        </el-button>
    </el-popover>
</template>
<script type="text/javascript">
export default {
    inject: ['self'],
    props: {
        field: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'numebr'
        }
    },
    data() {
        return {
            visible: false,
            inputValue: null
        };
    },
    methods: {
        /**
         * 只允许输入文字
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        inputChange(value) {
            if (this.field !== "goods_sn") {
                this.inputValue = value.replace(/[^\d\.]/g, '');
            }
        },
        /**
         * 处理确认事件
         * @return {[type]} [description]
         */
        handleConfirm() {
            if (this.self) {
                for (let index in this.self.checkedCities) {
                    let item = this.self.checkedCities[index];
                    if (item[this.field] >= 0) {
                        item[this.field] = this.inputValue;
                    }
                }
                this.visible = false;
                this.inputValue = null;
            }
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>