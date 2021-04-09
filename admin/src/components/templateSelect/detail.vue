<template>
    <div class="template-detail">
        <ul>
            <li class="template-detail-empty">
                <div class="template-detail-item__img">
                    <img src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/WX20210222-013455@2x.png">
                    <p>空白模板</p>
                </div>
                <div class="template-detail-item__mark">
                    <el-button type="primary" @click="handleCreate('[]')">启用模板</el-button>
                </div>
            </li>
            <li class="template-detail-item" v-for="(item,index) in pageData" :key="index">
                <div class="template-detail-item__cover">
                    <div class="template-detail-item__img">
                        <img :src="item.image">
                    </div>
                    <div class="template-detail-item__mark">
                        <el-button type="primary" @click="handleCreate(item.content)">启用模板</el-button>
                        <el-button @click="preview(item.image)">预览模板</el-button>
                    </div>
                </div>
                <div class="template-detail-item__fotter">
                    <h3>{{item.name}}</h3>
                    <p>设计师：{{item.writer}}</p>
                </div>
            </li>
        </ul>
        <div class="template-detail__paging">
            <el-pagination @current-change="handleSizeChange" layout="prev, pager, next,jumper" :page-size="pageInfo.size" :current-page="pageInfo.current" :total="pageInfo.total"></el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from '@/components/popconfirm.vue'
export default {
    components: {
        popconfirm
    },
    inject: ['self'],
    data() {
        return {
            pageData: [],
            pageInfo: {
                size: 15,
                total: 0,
                current: 1,
            }
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        is_page() {
            if (this.$route.query.id) {
                return true;
            } else {
                return false;
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
        this.handleLoad();
    },
    methods: {
        handleLoad(page = 1) {
            this.$heshop.pagetemplate("get").page(page, 3).then(data => {
                let size = parseInt(data.headers['x-pagination-per-page']);
                let total = parseInt(data.headers['x-pagination-total-count']);
                let current = parseInt(data.headers['x-pagination-current-page']);
                this.pageInfo = { size, total, current }
                this.pageData = data.data;
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        handleSizeChange(e) {
            this.handleLoad(e);
        },
        handleCreate(data = '[]') {
            if (this.self.value) {
                this.$store.commit('finish/setPagesData', JSON.parse(data));
                this.self.handleConfirm();
            } else {
                this.$heshop.pages("POST", { name: "新建微页面", title: (new Date()).valueOf(), content: data }).then(data => {
                    this.self.handleConfirm();
                    this.$router.push({ path: '/package/index', query: { id: data.id } });
                }).catch(error => {
                    console.error("错误信息", error);
                })
            }
        },
        preview: function(image) {
            let router = this.$router.resolve({
                path: '/store/pagePreview',
                query: {
                    img: encodeURIComponent(image)
                }
            });
            window.open(router.href, '_blank');
        },
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>