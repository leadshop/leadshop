<template>
    <control title="搜索框">
        <template slot="content">
            <el-form ref="form"  @submit.native.prevent label-width="90px" size="small" label-position="left">
                <el-form-item label="提示文字">
                    <el-input type="text" @keyup.native.enter placeholder="请输入关键字搜索" v-model="content.text" maxlength="10" show-word-limit>
                    </el-input>
                </el-form-item>
            </el-form>
        </template>
        <template slot="style">
            <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <div class="control-item-title">边框样式</div>
                <choice :data="borderData" group="border_style" v-model="facade.border_style"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">文本位置</div>
                <choice :data="textData" group="text_align" v-model="facade.text_align"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">颜色设置</div>
                <el-form-item label="背景颜色">
                    <colour v-model="facade.background_color" colour="#f7f7f7"></colour>
                </el-form-item>
                <el-form-item label="输入框颜色">
                    <colour v-model="facade.border_color" colour="#FFFFFF"></colour>
                </el-form-item>
                <el-form-item label="图标颜色">
                    <colour v-model="facade.icon_color" colour="#999999"></colour>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <colour v-model="facade.text_color" colour="#999999"></colour>
                </el-form-item>
                <el-divider></el-divider>
                <div class="control-item-title">高度设置</div>
                <el-form-item label="框体高度">
                    <slider v-model="facade.high_style" :min="20" :max="40"></slider>
                </el-form-item>
            </el-form>
        </template>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import choice from '@/components/choice.vue'
import colour from '@/components/colour.vue'
import slider from '@/components/slider.vue'

export default {
    components: {
        control,
        choice,
        colour,
        slider
    },
    data() {
        return {
            borderData: [{
                value: 1,
                icon: "le-icon-graphic-party",
                name: "方框"
            }, {
                value: 2,
                icon: "le-icon-graphic-rounded",
                name: "圆角"
            }],
            textData: [{
                value: 'left',
                icon: "le-icon-graphic-left",
                name: "居左"
            }, {
                value: 'center',
                icon: "le-icon-graphic-middle",
                name: "居中"
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

    }
};
</script>
<style lang="less" scoped>
@import '../attribute.less';
</style>