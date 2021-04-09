<template>
    <control title="商品">
        <template slot="content">
            <el-form ref="form" :model="content" @submit.native.prevent label-width="80px" size="small" label-position="left">
                <div class="control-item-title">添加商品</div>
                <el-radio-group v-model="content.type">
                    <el-radio :label="1">选择商品</el-radio>
                    <el-radio :label="2">选择分类</el-radio>
                </el-radio-group>
                <div class="empty"></div>
                <goodsSelet v-if="content.type==1" v-model="content.goods" :number="5" :limit="5-content.goods.length" @confirm="handleGoodsConfirm"></goodsSelet>
                <classifySelect v-if="content.type==2" v-model="content.group"></classifySelect>
                <el-divider></el-divider>
                <div class="control-item-title">商品内容</div>
                <el-form-item label="商品名称">
                    <convert v-model="content.is_title" on="显示" off="隐藏"></convert>
                </el-form-item>
                <el-form-item label="商品价格">
                    <convert v-model="content.is_price" on="显示" off="隐藏"></convert>
                </el-form-item>
                <el-form-item label="购买按钮">
                    <convert v-model="content.is_button" on="显示" off="隐藏"></convert>
                </el-form-item>
            </el-form>
        </template>
        <template slot="style">
            <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="mini" label-position="left">
                <div class="control-item-title">列表样式</div>
                <choice :data="listData" width="112px" group="list_style" v-model="facade.list_style"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">卡片样式</div>
                <el-radio-group v-model="facade.card_style">
                    <el-radio :label="1">无边白底</el-radio>
                    <el-radio :label="2">卡片投影</el-radio>
                    <el-radio :label="3">描边白底</el-radio>
                    <el-radio :label="4">无边透明底</el-radio>
                </el-radio-group>
                <el-divider></el-divider>
                <div class="control-item-title">卡片倒角</div>
                <choice :data="cardData" group="chamfer_style" v-model="facade.chamfer_style"></choice>
                <el-divider></el-divider>
                <div class="control-item-title">距离设置</div>
                <el-form-item label="商品间距">
                    <slider v-model="facade.margin" :min="0" :max="30"></slider>
                </el-form-item>
                <el-form-item label="左右边距">
                    <slider v-model="facade.padding" :min="0" :max="30"></slider>
                </el-form-item>
            </el-form>
        </template>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import choice from '@/components/choice.vue'
import slider from '@/components/slider.vue'
import convert from '@/components/convert.vue'
import tag from '@/components/tag.vue'
import classifySelect from '@/components/classifySelect/select.vue'
import goodsSelet from '@/components/goodsSelet/select.vue'
import photoSelect from '@/components/photoSelect/select.vue'
import hyperlinkSelect from '@/components/hyperlinkSelect/select.vue'




export default {
    components: {
        control,
        choice,
        slider,
        convert,
        classifySelect,
        goodsSelet,
        photoSelect,
        hyperlinkSelect,
        tag
    },
    data() {
        return {
            demo11: "",
            listData: [{
                value: 1,
                icon: "le-icon-graphic-figure",
                name: "大图模式"
            }, {
                value: 2,
                icon: "le-icon-graphic-columns",
                name: "一行两个"
            }, {
                value: 3,
                icon: "le-icon-graphic-list",
                name: "列表模式"
            }, {
                value: 4,
                icon: "le-icon-graphic-sliding",
                name: "横向滑动"
            }],
            cardData: [{
                value: 0,
                icon: "le-icon-graphic-angle",
                name: "直角"
            }, {
                value: 1,
                icon: "le-icon-rounded-line",
                name: "圆角"
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
        handleGoodsConfirm(data) {
            // let goods = this.content.goods || [];

            // goods = JSON.parse(JSON.stringify(goods));

            // goods.push.apply(goods, data);

            // this.content.goods = goods.splice(0, 20);
        }
    }
};
</script>
<style lang="less" scoped>
@import '../attribute.less';
</style>