<template>
    <div class="le-matter">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="he-link-text">
            <el-breadcrumb-item class="he-link">
                <he-link href="goods/index">
                    商品管理
                </he-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>导出历史</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="le-card">
            <el-table :data="list" v-loading="loading">
                <el-table-column label="创建时间">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{scope.row.conditions.time_start | getTime}} ~
                        </div>
                        <div class="he-text">
                            {{scope.row.conditions.time_end | getTime}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="商品价格">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{scope.row.conditions.price_start | getPrice}} ~ {{scope.row.conditions.price_end | getPrice}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="商品分类">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{scope.row.conditions.show_group?scope.row.conditions.show_group:'全部'}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="created_time" label="导出时间">
                    <template slot-scope="scope">
                        <div class="he-text">{{scope.row.created_time | getTime}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="操作">
                    <template slot-scope="scope">
                        <div class="le-button flex align-center">
                            <el-button
                                @click="export2Excel(scope.row.goods_data.tHeader,scope.row.goods_data.list,scope.row.created_time)"
                                type="text" class="">下载</el-button>
                            <span class="le-line"></span>
                            <popconfirm width="360px"
                                        @confirm="deleteItem({id:scope.row.id,index:scope.$index})"
                                        title="确定删除这条导出历史记录？">
                                <el-button class="" type="text">删除</el-button>
                            </popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="he-pagination el-row--flex is-align-middle is-justify-end">
                <el-pagination :current-page="page.current" background layout="prev, pager, next, jumper" @current-change="currentChange" :page-count="page.count">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from "@/components/popconfirm.vue";
export default {
    components: {
        popconfirm
    },
    name: 'goodsExportHistory',
    data() {
        return {
            del_id: null,
            list: [],
            page: {
                current: 1,
                count: 0,
                size: 10
            },
            loading: false
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {},
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {},
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
        this.getList(this.page);
    },
    methods: {
        currentChange: function(e) {
            this.page.current = e;
            this.getList(this.page);
        },
        getList: function(page) {
            this.loading = true;
            this.$heshop.export('get', { include: 'goods' }).page(page.current, page.size).then(res => {
                let { data, headers } = res;
                this.list = data;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                }
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
                this.$message.error(err.data.message);
            });
        },
        deleteItem(e) {
            let _this = this;
            this.$heshop.export('delete', e.id, { include: 'goods' }).then(() => {
                this.$delete(_this.list, e.index);
                if (_this.page.current < _this.page.count) {
                    _this.getList(_this.page);
                }
                this.$message.success('删除成功');
            }).catch(err => {
                console.error(err);
            });
        },
        export2Excel(tHeader, list, create_time) {
            require.ensure([], () => {
                this.$h.Export2Excel.export_json_to_excel({ header: tHeader, data: list, filename: '商品报表(' + this.$moment(new Date(create_time * 1000)).format('YYYYMMDDHHmmss') + ')' });
            });
        }
    },
    filters: {
        getTime: function(time) {
            if (time) {
                time = new Date(time * 1000);
                let y = time.getFullYear();
                let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
                let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
                let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
                return `${y}-${m}-${d} ${h}:${mm}:${s}`;
            } else {
                return '--';
            }
        },
        getPrice: function(price) {
            if (price) {
                return '￥' + price;
            } else {
                return '--';
            }
        },
    }
};
</script>
<style lang="less" scoped="true">
.he-link-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
}

.he-pagination {
    padding-top: 17px;
}

.el-button--text.he-class__button-new.el-button--mini {
    font-size: 14px;
    font-weight: 500;
    color: #623ceb;
    line-height: 22px;
    padding: 0 14px;
    margin: 0;
}

.he-text {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    margin: 5px 0;
}

.le-card {
    margin-top: 24px;
    height: 100%;
    width: 100%;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
}
.le-button {
    .el-button {
        padding-left: 0;
        padding-right: 0;
        font-size: 14px;
    }
    .le-line {
        display: inline-block;
        width: 1px;
        height: 15px;
        background-color: #623ceb;
        margin: 0 10px;
    }
}
</style>
