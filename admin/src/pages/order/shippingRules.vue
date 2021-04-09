<template>
    <div class="le-card le-matter">
        <div class="le-header">
            <el-input class="le-header__input" placeholder="请输入规则名称搜索" v-model="search" clearable
                      @keyup.enter.native="getList" @clear="getList">
                <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
            <el-button class="le-header__btn" type="primary" @click="router">新建规则</el-button>
        </div>
        <div class="le-body">
            <el-table
                :data="list"
                lazy
                v-loading="loading"
            >
                <el-table-column prop="name" label="规则名称">
                    <template slot-scope="scope">
                        <div style="height: 48px;line-height: 48px">
                            {{ scope.row.name }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="包邮类型">
                    <template slot-scope="scope">
                        {{ scope.row.type | getType }}
                    </template>
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
                            <he-link href="order/shippingPublish" :query="{id: scope.row.id}">
                                <el-button type="text" class="he-class__button-new">
                                    编辑
                                </el-button>
                            </he-link>
                            <span style="background: #623CEB;margin: 0 15px 0 15px;height: 14px;width: 1px;"></span>
                            <popconfirm width="320px" @confirm="deleteService({id:scope.row.id,index:scope.$index})"
                                        title="确认删除该条包邮规则？">
                                <el-button type="text" class="he-class__button-new">删除</el-button>
                            </popconfirm>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="he-pagination el-row--flex is-align-middle is-justify-end">
            <div>
                <el-pagination :current-page="page.current" background layout="prev, pager, next, jumper"
                               @current-change="currentChange" :page-count="page.count">
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
    async mounted() {
        this.getList();
    },
    methods: {
        getList: function () {
            this.loading = true;
            this.$heshop.packagefreerules('get', {
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
            }).catch((err) => {
                this.loading = false;
                this.$message.error(err.data.message);
            });
        },
        currentChange: function (e) {
            this.page.current = e;
            this.getList();
        },
        deleteService(e) {
            this.$heshop.packagefreerules('delete', e.id).then(() => {
                this.$delete(this.list, e.index);
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        setAsDefault: function (row) {
            this.$heshop.packagefreerules('put', {id: row.id, behavior: 'setting'}, null).then(() => {
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
                let msg = err.data.message || err.data[0].message;
                this.$message.error(msg);
            })
        },
        router: function () {
            this.$router.push({
                path: '/order/shippingPublish'
            });
        }
    },
    filters: {
        getType: function (type) {
            switch (type) {
                case 1:
                    return '订单满额包邮';
                case 2:
                    return '订单满件包邮';
                case 3:
                    return '商品满额包邮';
                case 4:
                    return '商品满件包邮';
            }
        }
    }
};
</script>
<style lang="less" scoped="true">
.le-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 24px;
    height: 100%;
}

.le-header {
    .le-header__btn {
        width: 104px;
        height: 32px;
        background: #623CEB;
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        padding: 0;

    }

    .le-header__input {
        width: 368px;
        margin-right: 24px;

        .el-input-group__append {
            padding: 9px 16px;

            .el-button {
                padding: 9px 16px;
            }
        }
    }
}

.le-body {
    margin-top: 16px;
    width: 100%;
    height: calc(100% - 116px);
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
    padding: 0;
    color: #623CEB;
}
</style>
