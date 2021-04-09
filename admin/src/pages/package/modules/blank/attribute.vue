<template>
    <control title="辅助空白" :is_tab="false">
        <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
            <div class="control-item-title">颜色设置</div>
            <el-form-item label="填充颜色">
                <colour v-model="facade.background_color" colour="#FFFFFF"></colour>
            </el-form-item>
            <el-divider></el-divider>
            <div class="control-item-title">高度设置</div>
            <el-form-item label="空白高度">
                <slider v-model="facade.height" :min="10" :max="100"></slider>
            </el-form-item>
        </el-form>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import colour from '@/components/colour.vue'
import slider from '@/components/slider.vue'
export default {
    components: {
        control,
        colour,
        slider
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
        content: {
            get() {
                return this.$store.getters.content;
            },
            set(value) {
                let data = {
                    key: "content",
                    value: value
                }
                this.$store.commit('finish/setAttribute', data)
            }
        },
        facade: {
            get() {
                return this.$store.getters.facade;
            },
            set(value) {
                let data = {
                    key: "facade",
                    value: value
                }
                this.$store.commit('finish/setAttribute', data)
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

    }
};
</script>
<style lang="less" scoped>
@import '../attribute.less';
</style>