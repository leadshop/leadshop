<template>
    <control title="微页面设置" :is_tab="false">
        <div class="empty30"></div>
        <el-form ref="form" label-width="90px" size="small" label-position="left" >
            <el-form-item label="微页面标题">
                <el-input type="text" @keyup.native.enter placeholder="请输入微页面标题" v-model="titleName" maxlength="8" show-word-limit>
                </el-input>
                
            </el-form-item>
        </el-form>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
export default {
    components: {
        control
    },
    props: {
        value: ""
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        titleName: {
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
@import '../attribute.less';
</style>