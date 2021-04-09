<template>
    <control title="辅助线" :is_tab="false">
        <div class="control-item-title">选择样式</div>
        <choose :data="imgData" group="list_style" width="250px" height="40px" v-model="content.style"></choose>
                    <el-divider></el-divider>
        <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
            <div class="control-item-title">颜色设置</div>
            <el-form-item label="线条颜色">
                <colour v-model="facade.fill_color" colour="#bebebe"></colour>
            </el-form-item>
            <el-divider></el-divider>
            <div class="control-item-title">边距设置</div>
            <el-form-item label="上下边距">
                <slider v-model="facade.margin" :min="10" :max="40"></slider>
            </el-form-item>
        </el-form>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import choose from '@/components/choose.vue'
import colour from '@/components/colour.vue'
import slider from '@/components/slider.vue'
export default {
    components: {
        control,
        choose,
        colour,
        slider
    },
    data() {
        return {
            imgData: [{
                value: 'solid',
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/linestyle1.png",
            }, {
                value: 'dashed',
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/linestyle2.png",
            }, {
                value: 'dotted',
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/linestyle3.png",
            }]
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
    }
};
</script>
<style lang="less" scoped>
@import '../attribute.less';
</style>