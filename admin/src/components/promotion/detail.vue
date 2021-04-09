<template>
    <div class="promotion-detail">
        <div class="promotion-detail__menu">
            <label class="promotion-detail__item">
                <input type="radio" class="promotion-detail__input" :value="0" v-model="select">
                <span>微信小程序</span>
            </label>
            <label class="promotion-detail__item">
                <input type="radio" class="promotion-detail__input" :value="1" v-model="select">
                <span>H5</span>
            </label>
        </div>
        <div class="promotion-detail__body">
            <img :src="coverInfo.cover">
        </div>
        <div class="promotion-detail__form">
            <el-form label-position="top" label-width="80px">
                <el-form-item :label="coverInfo.title">
                    <el-input placeholder="请输入内容" :value="coverInfo.path" size="small" :disabled="true">
                        <el-button slot="append" @click="allowCopy">复制</el-button>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="allowDrop">下载海报</el-button>
                    <el-button @click="allowDrop">{{coverInfo.button}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
export default {
    props: {
        value: {
            type: [Object]
        }
    },
    data() {
        return {
            select: 0,
            detail: [{
                title: "小程序路径",
                cover: "http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/promotion_cover.png",
                path: "/pages/goods/wscgoods",
                button: "下载小程序码"
            }, {
                title: "链接",
                cover: "http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/promotion_coverh5.png",
                path: "/pages/goods/wscgoods",
                button: "仅下载二维码"
            }]
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        coverInfo() {
            return this.detail[this.select];
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
        allowCopy() {
            this.$message({
                title: '成功',
                message: '复制链接成功',
                type: 'success'
            });
        },
        allowDrop() {
            this.$message({
                title: '成功',
                message: '后端接口尚未开通',
                type: 'warning'
            });
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>