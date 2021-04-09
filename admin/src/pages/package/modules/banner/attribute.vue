<template>
    <control title="轮播图">
        <template slot="content">
            <el-form ref="form" :model="contentdef" label-width="90px" size="mini" label-position="left">
                <div class="control-item-title">图片</div>
                <div class="select-frame" v-for="item,index in content" :key="index">
                    <i class="le-icon le-icon-cha2 select-photo__close" @click="handleDelete(index)"></i>
                    <div class="select-frame__item">
                        <pictureDialog v-model="item.url">
                            <div slot="upload" class="select-cover__288-add">
                                <i class="le-icon le-icon-add select-cover__288-icon"></i>
                                <span class="select-cover__288-text">添加图片</span>
                            </div>
                            <div slot="preview" slot-scope="scope" class="select-cover__288-edit">
                                <el-image :src="scope.url" fit="cover"></el-image>
                                <div class="select-cover__288-tips">
                                    替换图片
                                </div>
                            </div>
                        </pictureDialog>
                    </div>
                    <el-form-item label="链接" label-width="50px">
                        <hyperlinkSelect v-model="item.link">请选择跳转链接</hyperlinkSelect>
                    </el-form-item>
                </div>
            </el-form>
            <div class="button-adddata">
                <el-button @click="handleAdditem" :disabled="this.content.length>=10">添加图片</el-button>
                <p class="tips">
                    最多添加10张轮播图片，建议图片尺寸：750px*300px
                </p>
            </div>
        </template>
        <template slot="style">
            <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <div class="control-item-title">轮播图样式</div>
                <choice :data="chamferData" group="list" v-model="facade.chamfer_style"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">指示器样式</div>
                <choice :data="pointerData" group="pointer" v-model="facade.indicator_style"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">指示器位置</div>
                <choice :data="positionData" group="positio" v-model="facade.indicator_align"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">颜色设置</div>
                <el-form-item label="选中颜色">
                    <colour v-model="facade.indicator_color" colour="#f5212d"></colour>
                </el-form-item>
            </el-form>
        </template>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue';
import choice from '@/components/choice.vue';
import colour from '@/components/colour.vue'

import hyperlinkSelect from '@/components/hyperlinkSelect/select.vue'

export default {
    components: {
        control,
        choice,
        colour,

        hyperlinkSelect,
    },
    data() {
        return {
            contentdef: {},
            chamferData: [{
                value: 1,
                icon: "le-icon-graphic-party",
                name: "方角"
            }, {
                value: 2,
                icon: "le-icon-graphic-rounded",
                name: "圆角"
            }],
            pointerData: [{
                value: 2,
                icon: "le-icon-graphic-point2",
                name: "圆角"
            }, {
                value: 1,
                icon: "le-icon-graphic-point",
                name: "圆形"
            }, {
                value: 3,
                icon: "le-icon-zhishiqi-shuzi",
                name: "数字"
            }],
            positionData: [{
                value: 'left',
                icon: "le-icon-graphic-left",
                name: "居左"
            }, {
                value: 'center',
                icon: "le-icon-graphic-middle",
                name: "居中"
            }, {
                value: 'right',
                icon: "le-icon-graphic-right",
                name: "居右"
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
        /**
         * 删除元素
         * @return {[type]} [description]
         */
        handleDelete(index) {
            this.content.splice(index, 1);
        },
        /**
         * 添加元素
         * @return {[type]} [description]
         */
        handleAdditem() {
            if (this.content.length < 10) {
                this.content.push({
                    url: "",
                    link: {}
                });
            } else {
                this.$message({
                    message: '最多添加10张轮播图片',
                    type: 'warning'
                });
            }

        },
    }
};
</script>
<style lang="less" scoped>
@import '../attribute.less';
</style>