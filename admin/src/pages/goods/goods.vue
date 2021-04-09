<template>
    <div class="le-matter">
        <el-button class="le-publish-btn" type="primary" @click="router('/goods/publish')">发布商品</el-button>
        <div class="le-card le-search ">
            <div class="flex flex-wrap">
                <div class="le-item flex">
                    <div class="le-item__label">商品搜索</div>
                    <div class="le-item__value">
                        <el-input class="le-left__input"
                                  v-model="keyword.search"
                                  @keyup.enter.native="getSearch"
                                  @clear="getSearch" clearable
                                  placeholder="输入商品名称/货号/ID搜索"
                        ></el-input>
                    </div>
                </div>
                <div class="le-item flex">
                    <div class="le-item__label">商品价格</div>
                    <div class="le-item__value">
                        <el-input class="le-right__input"
                                  @keyup.enter.native="getSearch" @clear="getSearch"
                                  clearable
                                  @keyup.native="keyword.price_start = oninput(keyword.price_start)"
                                  v-model="keyword.price_start"
                                  placeholder="最低价格">
                            <template slot="append">元</template>
                        </el-input>
                        <span class="le-go">至</span>
                        <el-input class="le-right__input"
                                  v-model="keyword.price_end"
                                  clearable
                                  @keyup.native="keyword.price_end = oninput(keyword.price_end)"
                                  @keyup.enter.native="getSearch" @clear="getSearch"
                                  placeholder="最高价格">
                            <template slot="append">元</template>
                        </el-input>
                    </div>
                </div>
                <div class="le-item flex">
                    <div class="le-item__label">商品分类</div>
                    <div class="le-item__value">
                        <div class="le-group-input flex justify-between align-center"
                             action="openGroup" v-popup.chooseCategory="catObject" title="选择分类" width="801" module="goods"
                        >
                            <div class="he-select__content">
                                <div class="le-placeholder" v-if="keyword.group.length === 0">请选择</div>
                                <div class="he-select__tag" v-for="(item, index) in keyword.group" :key="index">
                                    <span>{{item.value}}</span>
                                    <i class="el-tag__close el-icon-close" @click.stop="delGroup(item, index)"></i>
                                </div>
                            </div>
                            <i class="el-icon-arrow-down"></i>
                        </div>
                    </div>
                </div>
                <div class="le-item flex">
                    <div class="le-item__label">创建时间</div>
                    <div class="le-item__value">
                        <el-date-picker
                            class="le-date__input"
                            @change="getSearch"
                            v-model="time_start" type="datetime"
                            placeholder="开始时间">
                        </el-date-picker>
                        <span class="le-go">至</span>
                        <el-date-picker
                            class="le-date__input"
                            @change="getSearch"
                            v-model="time_end" type="datetime"
                            placeholder="结束时间">
                        </el-date-picker>
                    </div>
                </div>
            </div>
            <div class="le-button">
                <el-button @click="getSearch" type="primary">筛选</el-button>
                <el-button @click="empty">清空</el-button>
                <popconfirm @confirm="exportGoods" width="328px" title="确认导出选中商品信息？">
                    <el-button>导出</el-button>
                </popconfirm>
                <el-button type="text" @click="router('/goods/goodsExportHistory')">导出历史</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" type="card" class="le-tabs"  @tab-click="tableClick">
            <el-tab-pane  :label="`全部(${tabCount.all})`" name="all">
                <goodsAll :tab_key="keyword.tab_key" v-model="list" :page="page" status="all" @request="getRequest" @delete="deleteGoods" @selection="selection" :loading="tableLoading" @count="getCount" v-if="keyword.tab_key == 'all'" />
            </el-tab-pane>
            <el-tab-pane  :label="`销售中(${tabCount.onsale})`" name="onsale">
                <goodsAll v-model="list" :page="page" status="onsale" @request="getRequest" @delete="deleteGoods" @selection="selection" :loading="tableLoading" :tab_key="keyword.tab_key" @count="getCount" v-if="keyword.tab_key == 'onsale'" />
            </el-tab-pane>
            <el-tab-pane  :label="`下架中(${tabCount.nosale})`" name="nosale">
                <goodsAll v-model="list" :page="page" status="nosale" :tab_key="keyword.tab_key" @count="getCount" @request="getRequest" @delete="deleteGoods" @selection="selection" :loading="tableLoading" v-if="keyword.tab_key == 'nosale'" />
            </el-tab-pane>
            <el-tab-pane  :label="`售罄(${tabCount.soldout})`" name="soldout">
                <goodsAll v-model="list" :page="page" status="soldout" :tab_key="keyword.tab_key" @count="getCount" @request="getRequest" @delete="deleteGoods" @selection="selection" :loading="tableLoading" v-if="keyword.tab_key == 'soldout'" />
            </el-tab-pane>
            <el-tab-pane  :label="`草稿箱(${tabCount.drafts})`" name="drafts">
                <goodsAll v-model="list" :page="page" status="drafts" :tab_key="keyword.tab_key" @count="getCount" @request="getRequest" @delete="deleteGoods" @selection="selection" :loading="tableLoading" v-if="keyword.tab_key == 'drafts'" />
            </el-tab-pane>
            <el-tab-pane  :label="`回收站(${tabCount.recycle})`" name="recycle">
                <goodsAll v-model="list" :page="page" status="recycle" :tab_key="keyword.tab_key" @count="getCount" @request="getRequest" @delete="deleteGoods" @selection="selection" :loading="tableLoading" v-if="keyword.tab_key == 'recycle'" />
            </el-tab-pane>
        </el-tabs>
        <heloading v-model="load" page="goodsExportHistory" path="goods" @submit="exportGoods"></heloading>
    </div>
</template>
<script type="text/javascript">
import goodsAll from "./components/goodsAll.vue";
import popconfirm from "@/components/popconfirm.vue";
import heloading from "@/components/heloading.vue";
import floatNum from "@/lib/function/floatNum";

export default {
    components: {
        goodsAll,
        popconfirm,
        heloading
    },
    data() {
        return {
            load: {
                show: false,
                type: 1
            },
            ruleForm: {
                pass: '',
                checkPass: '',
                age: ''
            },
            activeName: 'all',
            options: [],
            value1: '',
            value2: '',
            keyword: {
                tab_key: 'all', // 全部all  销售中onsale   下架中nosale  售罄soldout  回收站recycle
                search: '',
                group: [],
                price_start: '',
                price_end: '',
                time_start: '',
                time_end: '',
                sort: {}
            },
            time_start: '',
            time_end: '',
            tabCount: {
                all: 0,
                onsale: 0,
                nosale: 0,
                soldout: 0,
                drafts: 0,
                recycle: 0
            },
            page: {
                size: 20,
                current: 1
            },
            list: [],
            checkList: [],
            tableLoading: false,
            catObject: {
                cat: [],
                result: []
            },
        }
    },
    async mounted() {
        this.getList(this.page);
        this.getCount();
        this.getGroup();
    },
    methods: {
        router: function(path) {
            this.$router.push({
                path: path
            });
        },
        empty() {
            for (let key in this.keyword) {
                if (key === 'tab_key') {
                    this.keyword[key] = 'all';
                } else if (key === 'sort') {
                    this.keyword[key] = {
                        created_time: 'DESC'
                    };
                } else if (key === 'group') {
                    this.keyword[key] = [];
                } else {
                    this.keyword[key] = '';
                }
            }
            this.time_start = '';
            this.time_end = '';
            this.catObject.result = []
            this.page.current = 1;
            this.getCount();
            this.getList(this.page);
        },
        getSearch() {
            this.page.current = 1;
            this.keyword.time_start = this.time_start ? new Date(this.time_start).getTime().toString().substr(0, 10) : '';
            this.keyword.time_end = this.time_end ? new Date(this.time_end).getTime().toString().substr(0, 10) : '';
            this.getCount();
            this.getList(this.page);
        },
        getRequest(data) {
            let page = data.page ? data.page : { size: 20, current: 1 };
            this.keyword.sort = data.sort ? data.sort : { created_time: "DESC" };
            this.getList(page);
        },
        getList: function(page) {
            this.tableLoading = true;
            let keyword = JSON.parse(JSON.stringify(this.keyword));
            keyword.group = keyword.group.map(v => {
                return v.id;
            });
            this.$heshop.search('post', { include: 'goods' }, { keyword }).page(page.current, page.size).then(res => {
                this.tableLoading = false;
                let { data, headers } = res;
                this.list = data.map(v => {
                    v.popover = false;
                    return v;
                });
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
                this.tabCount[this.activeName] = this.page.total;
            }).catch(err => {
                this.tableLoading = false;
                console.error(err);
            });
        },
        tableClick: function(e) {
            this.page = {
                size: 20,
                current: 1
            }
            this.keyword.tab_key = e.paneName;
            this.getList(this.page);
        },
        deleteGoods: function(id) {
            this.$heshop.goods('delete', id).then(() => {
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].id === id) {
                        this.$delete(this.list, i);
                        if (this.page.current < this.page.count) {
                            this.getList(this.page);
                        }else if (this.page.current === this.page.count && this.list.length === 0) {
                            this.page.current--;
                            this.getList(this.page);
                        }
                        break;
                    }
                }
                this.$message.success('删除成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        getCount: function() {
            let keyword = JSON.parse(JSON.stringify(this.keyword));
            keyword.group = keyword.group.map(v => {
                return v.id;
            });
            this.$heshop.tabcount('post', { include: 'goods' }, { keyword }).then(res => {
                this.tabCount = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        getGroup: function() {
            this.$heshop.group('get', { include: 'goods', parent: 'yes' }).then(res => {
                let new_options = [{
                    value: '',
                    label: '全部'
                }];
                res.forEach(v => {
                    new_options.push({
                        label: v.name,
                        value: v.id
                    });
                });
                this.options = new_options;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        selection: function(e) {
            this.checkList = e;
        },
        exportGoods: function() {
            this.load = {
                show:true,
                type:1
            }
            this.keyword.time_start = this.time_start ? new Date(this.time_start).getTime().toString().substr(0, 10) : '';
            this.keyword.time_end = this.time_end ? new Date(this.time_end).getTime().toString().substr(0, 10) : '';
            let conditions = this.keyword;
            this.$heshop.export('post', { include: 'goods' }, {
                conditions: conditions,
                id_list: this.checkList
            }).then(() => {
                this.$set(this.load,'type',2);
            }).catch(error => {
                this.$set(this.load,'type',3);
            });
        },
        openGroup: function(e) {
            let list = [];
            for (let i = 0; i < e.result.length; i++) {
                let item = e.result[i];
                if (!item.children) list.push(item);
            }
            this.keyword.group = list;
            this.catObject.result = list;
            this.getSearch();
        },
        delGroup: function(item, index) {
            let path = item.path.split('-').map(Number);
            let level = path.length;
            if (level === 3) {
                let p_deleted = false; //父级是否被删除,保证每次只删除一个
                let p2_deleted = false; //父父级是否被删除,保证每次只删除一个
                let result = this.catObject.result;
                for (let i = 0; i < result.length; i++) {
                    if (result[i].id === path[1]) {
                        if (!p2_deleted) {
                            p2_deleted = true;
                            this.catObject.result.splice(i, 1);
                        }
                        for (let j = 0; j < result.length; j++) {
                            if (result[j].id === path[2]) {
                                if (!p_deleted) {
                                    p_deleted = true;
                                    this.catObject.result.splice(j, 1);
                                }
                            }
                        }
                    }
                }
            } else if (level === 2) {
                let p_deleted = false;
                this.catObject.result.forEach((v, k) => {
                    if (v.id === path[1]) {
                        if (!p_deleted) {
                            p_deleted = true;
                            this.catObject.result.splice(k, 1);
                        }
                    }
                });
            }
            this.$delete(this.keyword.group, index);
            this.getSearch();
        },
        oninput: function(value) {
            return floatNum(value);
        }
    }
};

</script>
<style lang="scss" scoped>
@import "./goods.less";
</style>
