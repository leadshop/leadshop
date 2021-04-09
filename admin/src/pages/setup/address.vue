<template>
    <el-card class=" le-matter">
        <div>
            <he-link href="setup/addressPublish">
                <el-button type="primary">新增地址</el-button>
            </he-link>
        </div>
        <el-row class="le-line"></el-row>
        <el-row>
            <el-col>
                <el-table :data="list" class="le-table">
                    <el-table-column prop="name" label="收件人姓名">
                        <template slot-scope="scope">
                            <span class="le-table__text">{{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="联系方式">
                        <template slot-scope="scope">
                            <span class="le-table__text">{{scope.row.mobile}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="联系地址">
                        <template slot-scope="scope">
                            <span class="le-table__text">{{scope.row.province}}{{scope.row.city}}{{scope.row.district}}{{scope.row.address}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否默认">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status === 0" type="text" class="he-default__text" @click="setAsDefault(scope.row)">
                                设为默认
                            </el-button>
                            <div class="le-default__warning" v-else-if="scope.row.status === 1">默认模板</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div class="le-editor flex align-center">
                                <he-link href="setup/addressPublish" :query="{id: scope.row.id}">
                                    <el-button type="text">
                                        编辑
                                    </el-button>
                                </he-link>
                                <span class="le-line"></span>
                                <popconfirm width="320px" @confirm="deleteAddress({id:scope.row.id,index:scope.$index})" title="确认删除该条退货地址？">
                                    <el-button type="text">删除</el-button>
                                </popconfirm>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col>
                <div class="he-tabpane-pagination el-row--flex is-justify-end">
                    <el-pagination background @current-change="currentChange" :current-page="page.current" :page-count="page.count" layout="prev, pager, next, jumper">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </el-card>
</template>
<script type="text/javascript">
import popconfirm from "@/components/popconfirm.vue";
export default {
    components: {
        popconfirm
    },
    data() {
        return {
            page: {
                size: 10,
                current: 1,
                count: 1
            },
            list: []

        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {

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
        this.getList();
    },
    methods: {
        currentChange: function(data) {
            this.page.current = data;
            this.getList();
        },
        getList: function() {
            this.$heshop.address('get').page(this.page.current, this.page.size).then(res => {
                let { data, headers } = res;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
                this.list = data;
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        setAsDefault: function(row) {
            this.$heshop.address('put', { id: row.id, behavior: 'setting' }, null).then(() => {
                for (let i = 0; i < this.list.length; i++) {
                    let item = this.list[i];
                    if (item.id === row.id) {
                        this.$nextTick(() => {
                            item.status = 1;
                        });
                    } else {
                        this.$nextTick(() => {
                            item.status = 0;
                        });
                    }
                }
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        deleteAddress: function(e) {
            this.$heshop.address('delete', e.id).then(() => {
                this.$delete(this.list, e.index);
                if (this.page.current < this.page.count) {
                    this.getList();
                }
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style lang="less" scoped="true">
.le-matter {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: none !important;
}

.he-tabpane-pagination {
    margin-top: 16px;
}

.le-table {
    .le-table__text {
        display: inline-block;
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 0.85);
    }

    /deep/.he-default__text {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #623CEB;
        padding: 0;
    }

    .le-default__warning {
        width: 88px;
        height: 28px;
        line-height: 28px;
        background: rgba(251, 173, 21, 0.1);
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FBAD15;
        text-align: center;
    }
}

.le-editor {
    color: #623ceb;

    .le-line {
        height: 15px;
        width: 1px;
        background-color: #623ceb;
        margin: 0 10px;
    }

    .el-button {
        padding: 0;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
    }
}
</style>