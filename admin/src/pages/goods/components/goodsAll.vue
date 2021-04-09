<template>
    <div class="le-goods">
        <div class="le-goods__header">
            <el-checkbox :indeterminate="indeterminate" @change="allCheckEvent" class="le_goods__header-checkbox"
                         v-model="allCheck">当页全选
            </el-checkbox>
            <template v-if="status !== 'recycle'">
                <template v-if="tab_key !== 'soldout' && tab_key !== 'onsale' && tab_key !== 'drafts'">
                    <popconfirm :disabled="checkList.length === 0" @confirm="putOffShelf(1)" title="确认上架选中商品？"
                                width="320.2px">
                        <el-button :disabled="checkList.length === 0">上架</el-button>
                    </popconfirm>
                </template>
                <template v-if="tab_key !== 'nosale' && tab_key !== 'drafts'">
                    <popconfirm :disabled="checkList.length === 0" @confirm="putOffShelf(0)" title="确认下架选中商品？"
                                width="320.2px">
                        <el-button :disabled="checkList.length === 0">下架</el-button>
                    </popconfirm>
                </template>
                <popconfirm :disabled="checkList.length === 0" @confirm="batchDeletion" title="确认删除选中商品？"
                            width="320.2px">
                    <el-button :disabled="checkList.length === 0">删除</el-button>
                </popconfirm>
                <el-button style="margin-left: 8px" :disabled="checkList.length === 0" action="setGroup" module="goods"
                           title="选择分类" v-popup.chooseCategory="catObject" width="820" v-if="tab_key !== 'drafts'">改分类
                </el-button>
            </template>
            <template v-else>
                <popconfirm :disabled="checkList.length === 0" width="320px" @confirm="batchRestore" title="确认恢复商品？">
                    <el-button :disabled="checkList.length === 0">恢复</el-button>
                </popconfirm>
                <popconfirm :disabled="checkList.length === 0" width="424px" @confirm="batchRecycleDelete"
                            title="商品将被删除且无法撤销，确定删除？">
                    <el-button :disabled="checkList.length === 0">删除</el-button>
                </popconfirm>
            </template>
        </div>
        <el-table :data="value" @select="selectRow" @select-all="selectAll" @selection-change="selectionChange"
                  @sort-change="sortChange" class="le_goods__main" ref="goodsTable" row-key="id"
                  :default-sort="{prop: 'created_time', order: 'descending'}" style="width: 100%" v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="商品描述" width="309">
                <template slot-scope="scope">
                    <div class="flex">
                        <img :src="scope.row.slideshow[0]" class="le_goods__main-pic"/>
                        <div class="le_goods__main-goodsinfo">
                            <el-popover :content="scope.row.name" placement="top-start" trigger="hover" width="232">
                                <div class="le_goods__main-goodsname" slot="reference">{{ scope.row.name }}</div>
                            </el-popover>
                            <div class="le_goods__main-goodscn">
                                货号：{{ scope.row.goods_sn ? scope.row.goods_sn : '--' }}
                            </div>
                            <div class="le_goods__main-goodscn">ID：{{ scope.row.id }}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :sort-orders="['ascending', 'descending']" label="商品价格" prop="price" sortable="custom">
                <template slot-scope="scope">
                    <span class="le_goods__main-goodstitle">￥{{ scope.row.price }}</span>
                </template>
            </el-table-column>
            <el-table-column :sort-orders="['ascending', 'descending']" label="库存" prop="stocks" sortable="custom">
                <template slot-scope="scope">
                    <span class="le_goods__main-goodstitle">{{ scope.row.stocks }}</span>
                </template>
            </el-table-column>
            <el-table-column :sort-orders="['ascending', 'descending']" label="销量" prop="sales" sortable="custom">
                <template slot-scope="scope">
                    <span class="le_goods__main-goodstitle">{{ scope.row.sales }}</span>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="created_time" sortable="custom">
                <template slot-scope="scope">
                    <span
                        class="le_goods__main-goodstitle">{{ scope.row.created_time | timeFormat('yyyy-mm-dd hh:MM:ss') }}</span>
                </template>
            </el-table-column>
            <el-table-column label="商品状态" prop="status" v-if="tab_key !== 'drafts' && tab_key !== 'recycle'">
                <template slot-scope="scope">
                    <template v-if="scope.row.stocks > 0">
                        <el-tag size="medium" type="success" v-if="scope.row.is_sale == 1">销售中</el-tag>
                        <el-tag size="medium" type="info" v-else-if="scope.row.is_sale == 0">下架中</el-tag>
                    </template>
                    <el-tag size="medium" type="warning" v-else>售罄</el-tag>
                </template>
            </el-table-column>
            <el-table-column :render-header="hintRender" prop="sort" sortable="custom">
                <template slot-scope="scope">
                    <div class="le_goods__main-goodstitle le_goods__main-sort">
                        {{ scope.row.sort }}
                        <el-popover :id="scope.row.id" title=" " trigger="click" v-model="scope.row.popover">
                            <div class="el-popconfirm">
                                <p class="el-popconfirm__main">
                                    <el-input v-model="sort" v-on:input="sort=onlyNum(sort)"></el-input>
                                </p>
                                <div class="el-popconfirm__action">
                                    <el-button @click="cancel(scope.$index)" size="mini" type="text">取消</el-button>
                                    <el-button @click="setSort(scope.$index)" size="mini" type="primary">确定</el-button>
                                </div>
                            </div>
                            <span @click="getSortVal(scope.row)" slot="reference">
                                <he-icon class="le_goods__main-sortedit" type="le-icon-editor"></he-icon>
                            </span>
                        </el-popover>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="访问量" prop="visits" sortable="custom">
                <template slot-scope="scope">
                    <div class="le_goods__main-goodstitle">访问量：{{ scope.row.visits }}</div>
                    <div class="le_goods__main-goodstitle">访客数：{{ scope.row.visitors }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="">
                <template slot-scope="scope">
                    <div class="le-button-editor el-row--flex he-btn flex align-center">
                        <template v-if="status !== 'recycle'">
                            <he-link :query="{id: scope.row.id}" href="goods/publish">
                                <el-button type="text" class="le-goods__btn">编辑</el-button>
                            </he-link>
                            <span class="he-btn__span"></span>
                        </template>
                        <template v-if="status !== 'recycle'">
                            <el-button :hide_footer="true" :id="scope.row.id+'_promote'" module="goods" title="推广"
                                       class="le-goods__btn" type="text" v-popup.promote="{
                                            data: scope.row,
                                            promoteType: 'goods'
                                       }" width="791" v-if="tab_key !== 'drafts'">推广
                            </el-button>
                            <span class="he-btn__span" v-if="tab_key !== 'drafts'"></span>
                            <popconfirm @confirm="deleteGoods(scope.row.id)" width="392px" title="商品删除请谨慎操作，确定删除？">
                                <el-button class="le-goods__btn" type="text">删除</el-button>
                            </popconfirm>
                        </template>
                        <template v-else>
                            <popconfirm @confirm="restore({id:scope.row.id,index:scope.$index})" title="确认恢复商品？"
                                        width="320px">
                                <el-button class="le-goods__btn" type="text">恢复</el-button>
                            </popconfirm>
                            <span class="he-btn__span"></span>
                            <popconfirm @confirm="recycleDelete({id:scope.row.id,index:scope.$index})"
                                        title="商品将被删除且无法撤销，确定删除？" width="392px">
                                <el-button class="le-goods__btn" type="text">删除</el-button>
                            </popconfirm>
                        </template>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="le-goods__footer el-row--flex is-align-middle is-justify-space-between">
            <div>
                <el-checkbox :indeterminate="indeterminate" @change="allCheckEvent" class="le_goods__header-checkbox"
                             v-model="allCheck">当页全选
                </el-checkbox>
                <template v-if="status !== 'recycle'">
                    <popconfirm :disabled="checkList.length === 0" @confirm="putOffShelf(1)" title="确认上架选中商品？"
                                width="320.2px"
                                v-if="tab_key !== 'soldout' && tab_key !== 'onsale' && tab_key !== 'drafts'">
                        <el-button :disabled="checkList.length === 0">上架</el-button>
                    </popconfirm>
                    <popconfirm :disabled="checkList.length === 0" @confirm="putOffShelf(0)" title="确认下架选中商品？"
                                width="320.2px" v-if="tab_key !== 'nosale' && tab_key !== 'drafts'">
                        <el-button :disabled="checkList.length === 0">下架</el-button>
                    </popconfirm>
                    <popconfirm :disabled="checkList.length === 0" @confirm="batchDeletion" title="确认删除选中商品？"
                                width="320.2px">
                        <el-button :disabled="checkList.length === 0">删除</el-button>
                    </popconfirm>
                    <el-button style="margin-left: 8px" :disabled="checkList.length === 0" action="setGroup"
                               module="goods" title="选择分类" v-popup.chooseCategory="catObject" width="820"
                               v-if="tab_key !== 'drafts'">改分类
                    </el-button>
                </template>
                <template v-else>
                    <popconfirm :disabled="checkList.length === 0" width="330px" @confirm="batchRestore"
                                title="确认恢复商品？">
                        <el-button :disabled="checkList.length === 0">恢复</el-button>
                    </popconfirm>
                    <popconfirm :disabled="checkList.length === 0" width="424px" @confirm="batchRecycleDelete"
                                title="商品将被删除且无法撤销，确定删除？">
                        <el-button :disabled="checkList.length === 0">删除</el-button>
                    </popconfirm>
                </template>
            </div>
            <div class="he-tabpane-pagination">
                <el-pagination :current-page="page.current" :page-count="page.count" @current-change="currentChange"
                               @size-change="sizeChange" background="" layout="prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from "../../../components/popconfirm.vue";
import HelpHint from "./helpHint.vue";

export default {
    components: {
        HelpHint,
        popconfirm
    },
    props: {
        value: {
            type: Array
        },
        page: {
            type: Object
        },
        status: {
            type: String
        },
        loading: {
            type: Boolean
        },
        tab_key: {
            type: String
        }
    },
    data() {
        return {
            allCheck: false,
            checkList: [],
            content: {},
            catObject: {
                cat: [],
                result: []
            },
            indeterminate: false,
            sort: 1,
            order: {created_time: 'DESC'}
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
    watch: {
        value: {
            handler(newVal) {
                if (this.allCheck) {
                    let that = this;
                    let len = this.value.length;
                    newVal.forEach(row => {
                        for (let i = 0; i < len; i++) {
                            if (row.id === that.checkList[i]) {
                                that.$refs.goodsTable.toggleRowSelection(row, false);
                                break;
                            } else {
                                that.$refs.goodsTable.toggleRowSelection(row, true);
                            }
                        }
                    });
                }
            },
            deep: true
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    mounted() {
        this.getGroup();
    },
    methods: {
        hintRender: function () {
            return this.$createElement('HelpHint', {
                props: {
                    content: '序号越大，排序越靠前'
                }
            }, '排序');
        },
        onlyNum: function (value) {
            let num = Number(value.replace(/\D/g, ''));
            if (num > 999) {
                return 999
            } else if (num < 0) {
                return 0;
            }

            return num;
        },
        selectRow: function () {
            if (this.allCheck) this.allCheck = false;
        },
        selectionChange: function (rows) {
            this.checkList = rows.map(v => {
                return v.id;
            });
            this.$emit('selection', this.checkList);
            this.allCheck = this.checkList.length === this.value.length;
            this.indeterminate = this.checkList.length > 0 && this.checkList.length < this.value.length;
        },
        selectAll: function (rows) {
            if (rows.length > 0) {
                this.allCheck = true;
                this.indeterminate = false;
            } else {
                this.allCheck = false;
            }
        },
        allCheckEvent: function () {
            if (this.allCheck) {
                this.value.forEach(row => {
                    this.$refs.goodsTable.toggleRowSelection(row, true);
                });
            } else {
                this.$refs.goodsTable.clearSelection();
            }
        },
        sizeChange: function (e) {
            this.page.size = e;
            this.$emit('request', {page: this.page, sort: this.order});
        },
        currentChange: function (e) {
            this.page.current = e;
            this.$emit('request', {page: this.page, sort: this.order});
        },
        deleteGoods: function (e) {
            this.$emit('delete', e);
            this.$emit('count');
        },
        putOffShelf: function (e) {
            this.$heshop.goods('put', {
                id: this.checkList,
                behavior: 'batchsetting',
            }, {is_sale: e}).then(() => {
                this.$refs.goodsTable.clearSelection();
                this.$emit('request', {page: this.page, sort: this.order});
                this.$emit('count');
                this.allCheck = false;
                let str = '';
                if (e === 1) {
                    str = '上架成功';
                } else {
                    str = '下架成功';
                }
                this.$message.success(str);
            }).catch(err => {
                this.$refs.goodsTable.clearSelection();
                this.$message.error(err.data.message);
            });
        },
        restore: function (e) {
            this.$heshop.recycle('put', {id: e.id, include: 'goods'}, null).then(() => {
                this.$delete(this.value, e.index);
                this.$emit('count');
                this.$message.success('恢复成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        batchDeletion: function () {
            this.$heshop.goods('delete', this.checkList).then(() => {
                this.$refs.goodsTable.clearSelection();
                this.$emit('request', {page: this.page, sort: this.order});
                this.$emit('count');
                this.$message.success('删除成功');
                this.allCheck = false;
            }).catch(err => {
                this.$refs.goodsTable.clearSelection();
                this.$message.error(err.data.message);
            });
        },
        recycleDelete: function (e) {
            this.$heshop.recycle('delete', e.id, {include: 'goods'}).then(() => {
                this.$delete(this.value, e.index);
                this.$emit('count');
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        batchRestore: function () {
            this.$heshop.recycle('put', {id: this.checkList, include: 'goods'}, null).then(() => {
                this.$emit('request', {page: this.page, sort: this.order});
                this.$emit('count');
                this.$message.success('恢复成功');
                this.allCheck = false;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        batchRecycleDelete: function () {
            this.$heshop.recycle('delete', this.checkList, {include: 'goods'}).then(() => {
                this.$emit('request', {page: this.page, sort: this.order});
                this.$emit('count');
                this.$message.success('删除成功');
                this.allCheck = false;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        sortChange: function (e) {
            this.order = {}
            this.order[e.prop] = e.order == 'ascending' ? 'ASC' : 'DESC';
            this.$emit('request', {page: this.page, sort: this.order});
        },
        getSortVal: function (row) {
            this.sort = row.sort;
        },
        setSort: function (index) {
            let {id} = this.value[index];
            this.$heshop.goods('put', {id, behavior: 'batchsetting'}, {
                sort: this.sort,
            }).then(() => {
                this.value[index].popover = false;
                this.value[index].sort = this.sort;
                this.$message.success('修改成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        cancel: function (index) {
            this.value[index].popover = false;
        },
        getGroup() {
            this.$heshop.group('get', {include: 'goods'}).then(res => {
                this.catObject.cat = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        setGroup(e) {
            let group = e.result.map(v => {
                return v.id;
            });
            this.$heshop.goods('put', {
                id: this.checkList,
                behavior: 'batchsetting',
            }, {group}).then(() => {
                this.$refs.goodsTable.clearSelection();
                this.allCheck = false;
                this.$message.success('修改成功');
            }).catch(err => {
                this.$refs.goodsTable.clearSelection();
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style lang="scss" scoped="true">
.le-goods {
    min-width: 1436px;
}

.le-goods__header {
    height: 52px;
}

.le_goods__header-checkbox {
    width: 122px;
    padding-left: 14px;
}

.le-goods__footer {
    height: 69px;
}

.le_goods__main-pic {
    width: 64px;
    height: 64px;
    margin-right: 9px;
    display: block;
}

.le_goods__main-goodsinfo {
    width: 236px;
}

/deep/ .el-table--mini td,
/deep/ .el-table--mini th {
    padding: 16px 0;
}

.le_goods__main-goodsname {
    font-size: 14px;
    line-height: 18px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #010101;
    opacity: 0.85;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    cursor: pointer;
}

.le_goods__main-goodscn {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 1.1;
    color: rgba(0, 0, 0, 0.65);
}

.le_goods__main-goodstitle {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

.le_goods__main-sort {
    cursor: pointer;
    height: 56px;
    line-height: 56px;
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

/deep/ .el-tag {
    background-color: #FFFFFF !important;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    padding: 0 16px;
    border-radius: 4px;
    height: 28px;
}

.le-goods .le-button-editor {
    .le-goods__btn.el-button {
        padding: 0;
    }
}
</style>
<style scoped>
.le-main /deep/ .el-pagination__editor.el-input {
    width: 50px;

}

.le-main /deep/ .el-pagination__editor.el-input .el-input__inner {
    padding: 0;
}

.el-pagination__jump {
    margin-left: 10px;
}

.he-btn /deep/ .el-button--mini.el-button--text {
    padding: 9px;
    color: #623CEB;
}

.he-btn {
    color: #623CEB;
}

.he-btn__span {
    display: inline-block;
    height: 12px;
    width: 1px;
    background-color: #623CEB;
    margin: 0 8px;
}

.le_goods__main /deep/ .el-table__header-wrapper .el-table-column--selection .cell {
    display: none;
}

/deep/ .is-always-shadow {
    box-shadow: none;
}

.le-matter /deep/ .el-tabs--card > .el-tabs__content {
    box-shadow: none;
}
</style>