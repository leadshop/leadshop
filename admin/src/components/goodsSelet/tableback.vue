<template>
    <div class="goods-selet__table">
        <div class="goods-selet__search">
            <el-input placeholder="请输入内容" v-model="keyword" class="le-goodspage_search" size="small">
                <el-button slot="append" icon="el-icon-search" @click="handleGoods"></el-button>
            </el-input>
        </div>
        <el-radio-group v-model="select" @change="handleChange" v-if="self.type =='radio'">
            <el-table ref="multipleTable" :data="goodsData">
                <el-table-column label="商品">
                    <template slot-scope="scope">
                        <div class="goods-selet__table-item">
                            <div class="goods-selet__table-radio">
                                <el-radio :label="scope.row.id"><span></span></el-radio>
                            </div>
                            <div class="goods-selet__table-cover"></div>
                            <div class="goods-selet__table-detail">
                                {{scope.row.name}}{{scope.row.id}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="商品价格" width="120">
                </el-table-column>
                <el-table-column prop="stocks" label="库存" width="160">
                </el-table-column>
            </el-table>
        </el-radio-group>
        <el-table ref="multipleTable" :data="goodsData" tooltip-effect="dark" @selection-change="handleChange" v-if="self.type =='checkbox'" :row-key="getRowKeys">
            <el-table-column type="selection" width="40" :selectable='selectEnable'>
            </el-table-column>
            <el-table-column label="商品">
                <template slot-scope="scope">
                    <div class="goods-selet__table-item">
                        <div class="goods-selet__table-cover"></div>
                        <div class="goods-selet__table-detail">
                            {{scope.row.name}}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="商品价格" width="120">
            </el-table-column>
            <el-table-column prop="stocks" label="库存" width="160">
            </el-table-column>
        </el-table>
        <div class="goods-selet__goodspage">
            <el-pagination @current-change="handleSizeChange" layout="prev, pager, next,jumper" :page-size="pageInfo.size" :current-page="pageInfo.current" :total="pageInfo.total"></el-pagination>
        </div>
    </div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('goods');
export default {
    inject: ['self'],
    data() {
        return {
            select: 0,
            keyword: ""
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        ...mapState(['goodsData', 'pageInfo'])
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.handleSizeChange(1);
    },
    methods: {
        ...mapActions(['handleGoods']),
        handleChange(e) {
            if (this.self.type == 'radio') {
                for (let index in this.goodsData) {
                    let item = this.goodsData[index];
                    if (item.id == e) {
                        this.self.selectData = JSON.parse(JSON.stringify(item));
                        break;
                    }
                }
            }
            if (this.self.type == 'checkbox') {
                if (this.self.selectData && this.self.selectData.length > 0) {
                    let data = this.self.selectData.concat(e);
                    this.self.selectData = Array.from(new Set(data));
                } else {
                    this.self.selectData = e;
                }
            }

        },
        /**
         * 设定选中数据
         * @param  {[type]} rows [description]
         * @return {[type]}      [description]
         */
        toggleSelection(rows) {
            if (this.self.type == 'checkbox') {
                if (rows) {
                    let maps = JSON.stringify(this.self.selectData);
                    rows.forEach(row => {
                        let s = '"id":' + row.id + ',';
                        if (maps.indexOf(s) > 0) {
                            this.$refs.multipleTable.toggleRowSelection(row);
                        }
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            }
        },
        /**
         * [selectEnable description]
         * @param  {[type]} row      [description]
         * @param  {[type]} rowIndex [description]
         * @return {[type]}          [description]
         */
        selectEnable(row, rowIndex) {
            if (this.self.value && this.self.value.some(item => item.id === row.id)) {
                // 禁用
                return false
            } else if (this.self.data && this.self.data.some(item => item.id === row.id)) {
                return false
            } else {
                // 不禁用
                return true
            }
        },
        getRowKeys(row){
            return row
        },
        /**
         * 分页
         * @return {[type]} [description]
         */
        handleSizeChange(e) {
            this.handleGoods({ current: e }).then(data => {
                this.toggleSelection(data);
            });
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>