<template>
    <control title="标题">
        <h4>风格选择</h4>
        <choose :data="styleData" v-model="content.style"></choose>
        <div class="empty"></div>
        <template slot="content">
            <el-form ref="form" :model="content" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <div class="control-item-title">主标题</div>
                <el-form-item label="文字">
                    <el-input type="text" @keyup.native.enter placeholder="请输入主标题" v-model="content.title" maxlength="8" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-divider v-if="content.style == 3"></el-divider>
                <template v-if="content.style == 3">
                    <div class="control-item-title">子标题</div>
                    <el-form-item label="文字">
                        <el-input type="text" @keyup.native.enter placeholder="请输入子标题" v-model="content.subtitle" maxlength="8" show-word-limit>
                        </el-input>
                    </el-form-item>
                    <el-divider></el-divider>
                    <div class="control-item-title">右侧按钮</div>
                    <el-form-item label="是否显示">
                        <el-switch v-model="content.is_more"></el-switch>
                    </el-form-item>
                    <el-form-item label="文字" v-if="content.is_more">
                        <el-input type="text" @keyup.native.enter placeholder="查看更多" v-model="content.moretitle" maxlength="4" show-word-limit>
                        </el-input>
                    </el-form-item>
                </template>
                <el-form-item label="链接" v-if="content.style == 3 && content.is_more">
                    <hyperlinkSelect v-model="content.morelink">
                        请选择跳转链接
                    </hyperlinkSelect>
                </el-form-item>
            </el-form>
        </template>
        <template slot="style">
            <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <div class="control-item-title" v-if="content.style != 3">颜色设置</div>
                <el-form-item label="标题颜色" v-if="content.style != 3">
                    <colour v-model="facade.title_color" colour="#333333"></colour>
                </el-form-item>
                <div class="control-item-title" v-if="content.style == 3">主标题</div>
                <el-form-item label="文字颜色" v-if="content.style == 3">
                    <colour v-model="facade.title_color" colour="#333333"></colour>
                </el-form-item>
                <el-form-item label="字号" v-if="content.style == 3">
                    <slider v-model="facade.title_font_size" :min="12" :max="32"></slider>
                </el-form-item>
                <el-divider v-if="content.style == 3"></el-divider>
                <div class="control-item-title" v-if="content.style == 3">子标题</div>
                <el-form-item label="文字颜色" v-if="content.style == 3">
                    <colour v-model="facade.subtitle_color" colour="#999999"></colour>
                </el-form-item>
                <el-form-item label="字号" v-if="content.style == 3">
                    <slider v-model="facade.subtitle_font_size" :min="12" :max="32"></slider>
                </el-form-item>
                <el-divider v-if="content.style == 3"></el-divider>
                <div class="control-item-title" v-if="content.style == 3">右侧按钮</div>
                <el-form-item label="按钮颜色" v-if="content.style == 3">
                    <colour v-model="facade.more_color" colour="#999999"></colour>
                </el-form-item>
                <el-divider></el-divider>
                <div class="control-item-title">边距设置</div>
                <el-form-item label="上下边距">
                    <slider v-model="facade.margin" :min="20" :max="40"></slider>
                </el-form-item>
            </el-form>
        </template>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import choose from '@/components/choose.vue'
import colour from '@/components/colour.vue'
import slider from '@/components/slider.vue'
import hyperlinkSelect from '@/components/hyperlinkSelect/select.vue'
export default {
    components: {
        control,
        choose,
        colour,
        slider,
        hyperlinkSelect
    },
    data() {
        return {
            styleData: [{
                value: 1,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/title-style1.png",
            }, {
                value: 2,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/title-style2.png",
            }, {
                value: 3,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/title-style3.png",
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