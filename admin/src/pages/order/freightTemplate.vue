<template>
    <div class="le-form-card le-matter">
        <el-row>
            <el-col :span="12">
                <el-input class="he-input" placeholder="请输入模板名称搜索" v-model="search" clearable
                          @keyup.enter.native="getList" @clear="getList">
                    <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
                </el-input>
                <he-link href="order/freightPublish">
                    <el-button type="primary">新建模板</el-button>
                </he-link>
            </el-col>
            <el-col :span="24" class="he-table">
                <el-table
                    style="width: 100%"
                    :data="list"
                    lazy
                    v-loading="loading"
                >
                    <el-table-column prop="name" label="模板名称">
                        <template slot-scope="scope">
                            <div class="he-name">
                                {{ scope.row.name }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="goods_number" label="被使用商品数">
                    </el-table-column>
                    <el-table-column prop="status" label="是否默认">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.status === 0" type="text" class="he-class__button-new"
                                       @click="setAsDefault(scope.row)">
                                设为默认
                            </el-button>
                            <el-tag size="medium" type="warning" v-else-if="scope.row.status === 1">默认模板</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <div style="display: flex;align-items: center;">
                                <he-link href="order/freightPublish" :query="{id: scope.row.id}">
                                    <el-button type="text" class="he-class__button-new">
                                        编辑
                                    </el-button>
                                </he-link>
                                <span style="background: #623CEB;margin: 0 15px 0 15px;height: 14px;width: 1px;"></span>
                                <popconfirm width="320px" @confirm="deleteService({id:scope.row.id,index:scope.$index})"
                                            title="确认删除该条运费模板？">
                                    <el-button class="he-class__button-new" type="text">删除</el-button>
                                </popconfirm>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="he-pagination el-row--flex is-align-middle is-justify-end">
                <div>
                    <el-pagination :current-page="page.current" background layout="prev, pager, next, jumper"
                                   @current-change="currentChange" :page-count="page.count">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script type="text/javascript">
import popconfirm from "@/components/popconfirm.vue";

export default {
    components: {
        popconfirm
    },
    data() {
        return {
            list: [],
            page: {
                current: 1,
                count: 1,
                size: 10,
                total: 1
            },
            search: '',
            loading: false,
        };
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.getList();
    },
    methods: {
        getList: function () {
            this.loading = true;
            this.$heshop.freighttemplate('get', {
                search: this.search
            }).page(this.page.current, this.page.size).then(res => {
                let {data, headers} = res;
                this.list = data;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
                this.loading = false;
            }).catch(err => {
                this.$message.error(err.data.message);
                this.loading = false;
            });
        },
        currentChange: function (e) {
            this.page.current = e;
            this.getList();
        },
        deleteService(e) {
            this.$heshop.freighttemplate('delete', e.id).then(() => {
                this.$delete(this.list, e.index);
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        setAsDefault: function (row) {
            this.$heshop.freighttemplate('put', {id: row.id, behavior: 'setting'}, null).then(() => {
                for (let i = 0; i < this.list.length; i++) {
                    let item = this.list[i];
                    if (item.id == row.id) {
                        this.$nextTick(() => {
                            item.status = 1;
                        })
                    } else {
                        this.$nextTick(() => {
                            item.status = 0;
                        })
                    }
                }
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style lang="less" scoped="true">
.le-form-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 24px;
}

.he-table {
    margin-top: 16px;
}

.he-input {
    width: 367px;
    margin-right: 24px;
}

.he-input /deep/ .el-input-group__append {
    padding: 0px 15px;

    .el-button {
        padding: 9px 20px;
    }
}

.le_goods__main-sort {
    cursor: pointer;
    height: 48px;
    line-height: 48px;
}

.le_goods__main-sortedit {
    opacity: 0;
    cursor: pointer;
}

.le_goods__main-sort:hover .le_goods__main-sortedit {
    opacity: 1;
}

.he-pagination {
    margin-top: 16px;
}

.he-pagination /deep/ .el-pagination.is-background li {
    background-color: #ffffff;
    border: 1px solid #DCDFE6;
}

.he-pagination /deep/ .el-pagination.is-background button {
    background-color: #ffffff;
    border: 1px solid #DCDFE6;
}

.he-table /deep/ .he-class__button-new {
    color: rgb(98, 60, 235);
    padding: 0;
}

.he-name {
    height: 48px;
    line-height: 48px;
}
</style>
