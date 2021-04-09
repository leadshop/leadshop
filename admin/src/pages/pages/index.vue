<template>
    <div class="layout-page">
        <el-card>
            <div slot="header" class="clearfix">
                <templateSelect style="margin: 0">
                    <el-button type="primary">新建微页面</el-button>
                </templateSelect>
            </div>
            <div class="layout-page-body">
                <template>
                    <el-table :data="tableData" size="medium">
                        <el-table-column label="名称">
                            <template slot-scope="scope">
                                {{scope.row.title}}
                                <span class="layout-table-tag" v-if="scope.row.status">首页</span>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="goods_number" label="商品数" width="180">
                        </el-table-column>
                        <el-table-column label="浏览人数/浏览人次">
                            <template slot-scope="scope">
                                {{scope.row.visitor_number}}/{{scope.row.visit_number}}
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="created_time" label="创建时间" :formatter="dateFormat">
                        </el-table-column>
                        <el-table-column label="操作" width="260" class="layout-table-action">
                            <template slot-scope="scope">
                                <router-link :to="{path:'/package/index',query:{id:scope.row.id}}" target="_blank" class="layout-table-link">
                                    <el-button type="text" size="medium">编辑</el-button>
                                </router-link>
                                <span class="layout-table-line" v-if="!scope.row.status">|</span>
                                <popconfirm width="320px" @confirm="handleDelete(scope.row)" v-if="!scope.row.status">
                                    <el-button type="text" size="medium">删除</el-button>
                                </popconfirm>
                                <span class="layout-table-line">|</span>
                                <el-button type="text" style="margin: 0 5px;" size="medium" module="goods" title="推广" :hide_footer="true" :id="scope.row.id" v-popup.promote="{
                                                data: scope.row,
                                                promoteType: 'pages'
                                       }" width="791">推广</el-button>
                                <span class="layout-table-line" v-if="!scope.row.status">|</span>
                                <popconfirm width="320px" @confirm="handleDefault(scope.row)" title="确认设置该微页面为首页？" v-if="!scope.row.status">
                                    <el-button type="text" size="medium">设为首页</el-button>
                                </popconfirm>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="layout-table-paging">
                        <el-pagination @current-change="handlePageChange" background layout="prev, pager, next,jumper" :total="pageInfo.total" :page-size="pageInfo.size" :current-page="pageInfo.current"></el-pagination>
                    </div>
                </template>
            </div>
        </el-card>
    </div>
</template>
<script type="text/javascript">
import popconfirm from '@/components/popconfirm.vue'
import promotion from '@/components/promotion'
import templateSelect from '@/components/templateSelect'
export default {
    components: {
        popconfirm,
        promotion,
        templateSelect
    },
    data() {
        return {
            tableData: [],
            pageInfo: {
                size: 20,
                total: 0,
                current: 1
            },
            fullHeight: document.documentElement.clientHeight
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        scrollHeight() {
            return {
                height: (parseInt(this.fullHeight) - 65) + 'px'
            }
        }
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
    mounted() {
        let that = this;
        //监听页面大小
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight
                that.fullHeight = window.fullHeight;
            })()
        }
        this.handleLoadData();
    },
    methods: {
        /**
         * 格式化时间
         * @param  {[type]} row    [description]
         * @param  {[type]} column [description]
         * @return {[type]}        [description]
         */
        dateFormat(row, column) {
            var date = row[column.property];
            if (date === undefined) {
                return ''
            }
            return this.$moment(date * 1000).format("YYYY-MM-DD HH:mm:ss")
        },
        /**
         * 执行删除事件
         * @return {[type]} [description]
         */
        handleDelete(data) {
            this.$heshop.pages("delete", parseInt(data.id)).page(this.pageInfo.current, this.pageInfo.size).then(data => {
                this.$message({
                    title: '删除成功',
                    message: '成功删除微页面',
                    type: 'success'
                });
                this.handleLoadData();
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        /**
         * 执行删除事件
         * @return {[type]} [description]
         */
        handleDefault(data) {
            data.status = 1;
            this.$heshop.pages("put", { id: data.id, behavior: 'setting' }, data).then(data => {
                this.$message({
                    title: '设置成功',
                    message: '成功设置该微页面为首页',
                    type: 'success'
                });
                this.handleLoadData();
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        /**
         * 加载数据信息
         * @return {[type]} [description]
         */
        handleLoadData() {
            this.$heshop.pages("get").page(this.pageInfo.current, this.pageInfo.size).then(data => {
                this.pageInfo = {
                    size: parseInt(data.headers['x-pagination-per-page']),
                    total: parseInt(data.headers['x-pagination-total-count']),
                    current: parseInt(data.headers['x-pagination-current-page'])
                }
                this.tableData = data.data;
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        handlePageChange(value) {
            this.pageInfo.current = value;
            this.handleLoadData();
        }
    }
};
</script>
<style lang="less" scoped>
@import '../../components/layout.less';
@import './style.less';
</style>