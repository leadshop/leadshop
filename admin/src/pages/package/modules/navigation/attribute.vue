<template>
    <control title="图文导航">
        <h4>导航样式</h4>
        <choice :data="navData" width="112px" group="navData" v-model="content.style"></choice>
        <template slot="content">
            <el-form ref="form" :model="content" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <draggable v-model="content.data" handle=".select-cover__move" chosenClass="chosen" forceFallback="true" group="navigation10" animation="1000" @start="onStart" @end="onEnd" v-if="content.data.length>1">
                    <transition-group>
                        <div class="select-cover" v-for="item,index in content.data" :key="`im_${index}`" v-if="content.style==1">
                            <i class="le-icon le-icon-cha2 select-photo__close" @click="handleDelete(index)"></i>
                            <div class="select-cover__header">
                                <i class="le-icon le-icon-tuoye select-cover__move" @click.stop="onStart"></i>
                                <span>导航{{index+1}}</span>
                            </div>
                            <div class="select-cover__content">
                                <div class="select-cover__item">
                                    <pictureDialog v-model="item.url">
                                        <div slot="upload" class="select-cover__item-add">
                                            <i class="le-icon le-icon-add"></i>
                                            <span class="select-cover__item-text">添加图片</span>
                                        </div>
                                        <div slot="preview" slot-scope="scope" class="select-cover__item-edit">
                                            <el-image :src="scope.url" fit="cover"></el-image>
                                            <div class="select-cover__item-tips">
                                                替换图片
                                            </div>
                                        </div>
                                    </pictureDialog>
                                </div>
                                <div class="select-cover__detail">
                                    <el-form-item label="标题" label-width="40px">
                                        <el-input type="text" @keyup.native.enter placeholder="请输入标题" v-model="item.title" maxlength="10">
                                        </el-input>
                                    </el-form-item>
                                    <el-form-item label="链接" label-width="40px">
                                        <hyperlinkSelect v-model="item.link">请选择跳转链接</hyperlinkSelect>
                                    </el-form-item>
                                </div>
                            </div>
                        </div>
                    </transition-group>
                </draggable>
                <draggable v-model="content.data" handle=".select-cover__move" chosenClass="chosen" forceFallback="true" group="navigation10" animation="1000" @start="onStart" @end="onEnd" v-if="content.style==2">
                    <transition-group>
                        <div class="select-text" v-for="item,index in content.data" :key="`te_${index}`">
                            <i class="le-icon le-icon-cha2 select-photo__close" @click="handleDelete(index)"></i>
                            <div class="select-cover__header">
                                <i class="le-icon le-icon-tuoye select-cover__move" @click.stop="onStart"></i>
                                <span>导航{{index+1}}</span>
                            </div>
                            <div class="select-text__detail">
                                <el-form-item label="标题" label-width="40px">
                                    <el-input type="text" @keyup.native.enter placeholder="请输入标题" v-model="item.title" maxlength="10">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="链接" label-width="40px">
                                    <hyperlinkSelect v-model="item.link">请选择跳转链接</hyperlinkSelect>
                                </el-form-item>
                            </div>
                        </div>
                    </transition-group>
                </draggable>
            </el-form>
            <div class="button-adddata">
                <el-button @click="handleAdditem" :disabled="this.content.data.length>=20">添加导航</el-button>
                <p class="tips">
                    最多添加20个导航，建议图片尺寸：200px*200px 拖拽可改变导航顺序
                </p>
            </div>
        </template>
        <template slot="style">
            <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <div class="control-item-title">展示样式</div>
                <choice :data="styleData" width="112px" group="nav_style" v-model="facade.nav_style"></choice>
                <el-form-item label="显示行数" v-if="facade.nav_style == 2">
                    <el-radio-group v-model="facade.nav_line">
                        <el-radio :label="2">2行</el-radio>
                        <el-radio :label="3">3行</el-radio>
                        <el-radio :label="4">4行</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="每行个数" v-if="facade.nav_style == 2">
                    <el-radio-group v-model="facade.nav_line_mun">
                        <el-radio :label="3">3个</el-radio>
                        <el-radio :label="4">4个</el-radio>
                        <el-radio :label="5">5个</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-divider v-if="facade.nav_style==2"></el-divider>
                <div class="control-item-title" v-if="facade.nav_style==2">指示器样式</div>
                <choice :data="indicatorData" group="indicator" v-model="facade.indicator_style" v-if="facade.nav_style==2"></choice>
                <div class="empty10"></div>
                <el-form-item label="选中颜色" v-if="facade.nav_style==2">
                    <colour v-model="facade.active_color" colour="#f5212d"></colour>
                </el-form-item>
                <el-divider></el-divider>
                <div class="control-item-title">颜色设置</div>
                <el-form-item label="背景颜色">
                    <colour v-model="facade.background_color" colour="#FFFFFF"></colour>
                </el-form-item>
                <el-form-item label="文字颜色">
                    <colour v-model="facade.text_color" colour="#333333"></colour>
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
import convert from '@/components/convert.vue'
import photoSelect from '@/components/photoSelect/select.vue'
import hyperlinkSelect from '@/components/hyperlinkSelect/select.vue'
import draggable from 'vuedraggable'
export default {
    components: {
        control,
        choice,
        colour,
        slider,
        convert,
        photoSelect,
        hyperlinkSelect,
        draggable
    },
    data() {
        return {
            drag: false,
            contentdef: {},
            navData: [{
                value: 1,
                icon: "le-icon-graphic-graphic",
                name: "图文导航"
            }, {
                value: 2,
                icon: "le-icon-graphic-text",
                name: "文字导航"
            }],
            styleData: [{
                value: 1,
                icon: "le-icon-gray-line",
                name: "单行展示"
            }, {
                value: 2,
                icon: "le-icon-graphic-multiplelines",
                name: "多行展示"
            }],
            indicatorData: [{
                value: 2,
                icon: "le-icon-graphic-indicator",
                name: "长条"
            }, {
                value: 1,
                icon: "le-icon-graphic-point",
                name: "圆形"
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
        //开始拖拽事件
        onStart() {
            this.drag = true;
        },
        //拖拽结束事件
        onEnd() {
            this.drag = false;
        },
        /**
         * 删除元素
         * @return {[type]} [description]
         */
        handleDelete(index) {
            this.content.data.splice(index, 1);
        },
        /**
         * 添加元素
         * @return {[type]} [description]
         */
        handleAdditem() {
            if (this.content.data.length < 20) {
                this.content.data.push({
                    url: "",
                    title: "导航",
                    link: {}
                });
            } else {
                this.$message({
                    message: '最多添加20张轮播图片',
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