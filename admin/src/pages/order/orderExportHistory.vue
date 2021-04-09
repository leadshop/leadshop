<template>
    <div class="he-matter">
        <el-breadcrumb class="he-link-text" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="he-link">
                <he-link href="order/index">
                    订单管理
                </he-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                导出历史
            </el-breadcrumb-item>
        </el-breadcrumb>
        <div class="le-line">
        </div>
        <div class="le-card">
            <el-table :data="list" lazy="" style="width: 100%">
                <el-table-column label="下单时间">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.conditions.time_start | getTime }} ~
                            {{ scope.row.conditions.time_end | getTime }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="支付方式" prop="title">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.conditions.pay_type === '' ? '全部' : scope.row.conditions.pay_type === 'wechat' ? '微信' : scope.row.conditions.pay_type === 'aliapy' ? '支付宝' : '' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订单来源" prop="title">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.conditions.source === '' ? '全部' : scope.row.conditions.source === 'weapp' ? '微信小程序' : scope.row.conditions.source === 'wechat' ? '公众号' : '' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="导出时间" prop="created_time">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.created_time | getTime }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" prop="title">
                    <template slot-scope="scope">
                        <div style="display: flex;">
                            <el-button
                                @click="export2Excel(scope.row.order_data.tHeader,scope.row.order_data.list,scope.row.created_time)"
                                class="he-class__button-new he-class__button-first" type="text">
                                下载
                            </el-button>
                            <span style="background: #623CEB;margin: 0 15px 0 15px;height: 14px;width: 1px;"></span>
                            <popconfirm width="320px" @confirm="deleteItem({id:scope.row.id,index:scope.$index})"
                                        title="确定删除这条导出记录？">
                                <el-button class="he-class__button-new" type="text">
                                    删除
                                </el-button>
                            </popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="he-pagination el-row--flex is-align-middle is-justify-end">
                <el-pagination :current-page="page.current" :page-count="page.count" @current-change="currentChange"
                               background="" layout="prev, pager, next, jumper">
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
    name: 'orderExportHistory',
    data() {
        return {
            list: [],
            page: {
                current: 1,
                count: 0,
                size: 20
            }
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
    created() {
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {},
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.getList(this.page);
    },
    methods: {
        currentChange: function (e) {
            this.page.count = e;
            this.getList(this.page);
        },
        getList: function (page) {
            this.$heshop.export('get', {include: 'order'}).page(page.current, page.size).then(res => {
                let {data, headers} = res;
                this.list = data;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        deleteItem(e) {
            this.$heshop.export('delete', e.id, {include: 'order'}).then(res => {
                this.$delete(this.list, e.index);
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        export2Excel(tHeader, list, create_time) {
            require.ensure([], () => {
                this.$h.Export2Excel.export_json_to_excel({
                    header: tHeader,
                    data: list,
                    filename: '订单报表(' + this.$moment(new Date(create_time * 1000)).format('YYYYMMDDHHmmss') + ')'
                });
            });
        }
    },
    filters: {
        getTime: function (time) {
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
    }
};
</script>
<style lang="less" scoped="true">
.le-card {
    background-color: #ffffff;
    padding: 24px;
}

.he-link-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
}

.he-pagination {
    padding-top: 17px;
}

.he-class__button-first {
    padding: 0 14px 0 0 !important;
}

.el-button--text.he-class__button-new.el-button--mini {
    font-size: 14px;
    font-weight: 500;
    color: #623CEB;
    line-height: 22px;
    padding: 0;
    margin: 0;
}

.he-text {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    height: 48px;
    line-height: 48px;
}

/deep/ .el-table .el-table__header th {
    padding: 0;

    .cell {
        height: 48px;
        line-height: 48px;
    }
}
</style>