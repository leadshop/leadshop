<template>
    <div class="goods-selet__table">
        <div class="goods-selet__search">
            <el-autocomplete placeholder="请输入商品名称搜索" v-model="keyword" :trigger-on-focus="false" class="le-goodspage_search" size="small" :fetch-suggestions="querySearch" @select="handleSearch" @keyup.enter.native="handleSearch">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-autocomplete>
        </div>
        <el-radio-group v-model="select" @change="handleChange" v-if="self.type =='radio'">
            <el-table ref="multipleTable" :data="goodsData">
                <el-table-column>
                    <template slot="header" slot-scope="scope">
                        <span style="padding-left: 30px">商品</span>
                    </template>
                    <template slot-scope="scope">
                        <div class="goods-selet__table-item">
                            <div class="goods-selet__table-radio">
                                <el-radio :label="scope.row.id"><span></span></el-radio>
                            </div>
                            <div class="goods-selet__table-cover">
                                <Picture :src="getGoodsCover(scope.row.slideshow)"></Picture>
                            </div>
                            <div class="goods-selet__table-detail">
                                {{scope.row.name}}{{scope.row.id}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品价格" width="120">
                    <template slot-scope="scope">
                        ￥{{scope.row.price}}
                    </template>
                </el-table-column>
                <el-table-column prop="stocks" label="库存" width="160">
                </el-table-column>
            </el-table>
        </el-radio-group>
        <el-table ref="multipleTable" :data="goodsData" tooltip-effect="dark" @selection-change="handleChange" v-if="self.type =='checkbox'" row-key="id">
            <el-table-column type="selection" width="40" :reserve-selection="true" :selectable='selectEnable'>
            </el-table-column>
            <el-table-column label="商品">
                <template slot-scope="scope">
                    <div class="goods-selet__table-item">
                        <div class="goods-selet__table-cover">
                            <Picture :src="getGoodsCover(scope.row.slideshow)"></Picture>
                        </div>
                        <div class="goods-selet__table-detail">
                            {{scope.row.name}}
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="商品价格" width="120">
                <template slot-scope="scope">
                    ￥{{scope.row.price}}
                </template>
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
import Picture from '@/components/image.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('goods');
export default {
    components: {
        Picture
    },
    inject: ['self'],
    data() {
        return {
            select: 0,
            keyword: ""
        }
    },
    props: {
        /**
         * 执行的上传方法
         * @type {Object}
         */
        limit: {
            type: Number,
            default: 1
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
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        keyword(value) {
            if (value == "") {
                this.handleGoods({ current: 1, keyword: { search: "" } }).then(data => {
                    this.toggleSelection(data);
                });
            }
        }
    },
    methods: {
        ...mapActions(['handleGoods']),
        handleChange(arr) {
            if (this.self.type == 'radio') {
                for (let index in this.goodsData) {
                    let item = this.goodsData[index];
                    if (item.id == arr) {
                        this.self.selectData = JSON.parse(JSON.stringify(item));
                        break;
                    }
                }
            }
            if (this.self.type == 'checkbox') {
                this.self.selectData = arr;
            }
        },
        /**
         * 处理搜索器
         * @param  {[type]}   queryString [description]
         * @param  {Function} cb          [description]
         * @return {[type]}               [description]
         */
        querySearch(queryString, cb) {
            this.$heshop.search("POST", { include: 'goods' }, { keyword: { tab_key: "onsale",search: queryString } }).page(1, 20).then(data => {
                let _array = [];
                data.data.map((iten) => {
                    _array.push({
                        value: iten.name
                    })
                })
                cb(_array);
            }).catch(error => {
                console.error("错误提示", error)
            })
            // 调用 callback 返回建议列表的数据

        },
        createFilter(queryString) {
            return (restaurant) => {
                return (restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        /**
         * [handleSearch description]
         * @return {[type]} [description]
         */
        handleSearch() {
            this.handleGoods({ current: 1, keyword: {  search: this.keyword } }).then(data => {
                this.toggleSelection(data);
            });
        },
        /**
         * 设定选中数据
         * @param  {[type]} rows [description]
         * @return {[type]}      [description]
         */
        toggleSelection(rows) {

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
            } else {
                // 不禁用
                return true
            }
        },
        /**
         * 获取KEY
         * @param  {[type]} row [description]
         * @return {[type]}     [description]
         */
        getRowKeys(row) {
            return row.id
        },
        /**
         * 分页
         * @return {[type]} [description]
         */
        handleSizeChange(e) {
            this.handleGoods({ current: e, keyword: {} }).then(data => {
                this.toggleSelection(data);
            });
        },
        /**
         * 获取封面信息
         * @param  {[type]} cover [description]
         * @return {[type]}       [description]
         */
        getGoodsCover(cover) {
            if (cover && cover[0]) {
                if (typeof(cover[0]) == 'string') {
                    return cover[0];
                }
            }
            return "http://qmxq.oss-cn-hangzhou.aliyuncs.com/le-default-goods-bg.png";
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>