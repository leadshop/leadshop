<template>
    <div class="le-card">
        <div class="le-header">
            <el-input class="le-input" placeholder="请输入服务名称搜索"
                      @keyup.enter.native="getList"
                      v-model="search" clearable @clear="getList">
                <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
            <el-button type="primary" @click="routerEdit()" class="le-header__btn">添加商品服务</el-button>
        </div>
        <el-table class="le-table" :data="list">
            <el-table-column prop="title" label="服务名称"></el-table-column>
            <el-table-column prop="goods_number" label="商品数"></el-table-column>
            <el-table-column prop="time" label="创建时间" min-width="180px">
                <template slot-scope="scope">
                    {{ scope.row.created_time | timeFormat('yyyy-mm-dd hh:MM:ss') }}
                </template>
            </el-table-column>
            <el-table-column prop="sort" label="排序" :render-header="hintRender">
                <template slot-scope="scope">
                    <div class="le_goods__main-goodstitle le_goods__main-sort">
                        {{ scope.row.sort }}
                        <el-popover v-bind="$attrs" v-model="scope.row.popover" title=" " trigger="click">
                            <div class="el-popconfirm">
                                <p class="el-popconfirm__main">
                                    <el-input v-model="sort"></el-input>
                                </p>
                                <div class="el-popconfirm__action">
                                    <el-button size="mini" type="text" @click="cancel">取消</el-button>
                                    <el-button size="mini" type="primary" @click="sortChange">确定</el-button>
                                </div>
                            </div>
                            <span @click="editSort(scope.row, scope.$index)" slot="reference">
                                <he-icon class="le_goods__main-sortedit" type="le-icon-editor"></he-icon>
                            </span>
                        </el-popover>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.status"
                               @change="editChange($event,scope.row.id,scope.$index)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <div class="flex align-center le-edit">
                        <el-button type="text" @click="routerEdit({id: scope.row.id})">
                            编辑
                        </el-button>
                        <span class="le-edit-line"></span>
                        <popconfirm width="330px" @confirm="deleteService({id:scope.row.id,index:scope.$index})"
                                    title="确认删除该条商品服务？">
                            <el-button type="text">删除</el-button>
                        </popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="le-footer">
            <el-pagination :current-page="page.current" background layout="prev, pager, next, jumper"
                           @current-change="currentChange" :page-count="page.count">
            </el-pagination>
        </div>
    </div>
</template>

<script type="text/javascript">
import HelpHint from "./components/helpHint.vue";
import popconfirm from "../../components/popconfirm.vue";

export default {
    components: {
        HelpHint,
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
            sort: 0,
            loading: false,
            sortIndex: 0
        };
    },
    async mounted() {
        this.getList();
    },
    methods: {
        getList: function () {
            this.loading = true;
            this.$heshop.service('get', {
                search: this.search
            }).page(this.page.current, this.page.size).then(res => {
                let {data, headers} = res;
                data.forEach(item => {
                    item.popover = false;
                });
                this.list = data;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
                this.loading = false;
            }).catch(() => {
                this.loading = false;
                this.$message.error('获取失败');
            });
        },
        currentChange: function (e) {
            this.page.current = e;
            this.getList();
        },
        hintRender: function () {
            return this.$createElement('HelpHint', {
                props: {
                    content: '序号越大，排序越靠前'
                }
            }, '排序');
        },
        editSort: function (row, index) {
            this.sort = row.sort;
            this.sortIndex = index;
        },
        sortChange: function () {
            let {id} = this.list[this.sortIndex];
            this.$heshop.service('put', id, {
                sort: this.sort,
            }).then(() => {
                this.list[this.sortIndex].popover = false;
                this.list[this.sortIndex].sort = this.sort;
            }).catch(err => {
                this.$message.error(err.data[0].message);
            });
        },
        cancel: function () {
            this.list[this.sortIndex].popover = false;
        },
        editChange(e, id, index) {
            this.$heshop.service('put', id, {status: e}).then(() => {
            }).catch(error => {
                this.list[index].status = e === 1 ? 0 : 1;
                this.$message.error(error.data.message);
            });
        },
        deleteService(e) {
            this.$heshop.service('delete', e.id).then(() => {
                this.$message.success('删除成功');
                this.$delete(this.list, e.index);
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        routerEdit: function (obj) {
            let data = {path: '/goods/servicePublish'}
            if (obj) data.query = obj;
            this.$router.push(data);
        }
    }
};
</script>
<style lang="less" scoped="true">
.le-card {
    min-width: 700px;
    background: #FFFFFF;
    border-radius: 16px;
    width: 100%;
    height: 100%;
    padding: 24px;
    position: relative;
}

.le-header {
    margin-bottom: 16px;

    .le-input {
        width: 370px;
        height: 32px;

        /deep/ .el-input__inner {
            width: 330px;
        }

        /deep/ .el-input-group__append {
            width: 40px;
            padding: 0;
            text-align: center;

            .el-button {
                padding: 0;
                margin: 0;
            }
        }
    }

    .le-header__btn {
        width: 133px;
        height: 32px;
        padding: 0;
        background: #623CEB;
        border-radius: 4px;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #FFFFFF;
        margin-left: 24px;
    }
}

.le-table {
    min-width: 658px;

    /deep/ .el-table__row {
        .cell {
            height: 48px;
            line-height: 48px;
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #333333;
        }
    }

    /deep/ .has-gutter .cell {
        height: 48px;
        line-height: 48px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #333333;
    }

    .le-edit {
        height: 100%;

        .el-button {
            padding: 0;
        }
    }

    .le-edit-line {
        width: 1px;
        height: 14px;
        background: #623CEB;
        margin: 0 15px;
    }
}

.le-footer {
    position: absolute;
    bottom: 24px;
    right: 24px;
}

.le_goods__main-sort {
    cursor: pointer;
    height: 48px;
    line-height: 48px;
}

.le_goods__main-sortedit {
    opacity: 0;
    cursor: pointer;
    width: 14px;
    height: 14px;
    color: #bbbfc8;
}

.le_goods__main-sort:hover .le_goods__main-sortedit {
    opacity: 1;
}

</style>
