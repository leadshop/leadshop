<template>
    <div class="le-matter le-card">
        <div>
            <el-autocomplete class="he-input" placeholder="输入分类搜索" v-model="search"
                             @keydown.enter.native="handleSelect(null)" @select="(cat) => {handleSelect(cat)}"
                             :trigger-on-focus="false"
                             :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'searchList')}">
                <el-button slot="append" icon="el-icon-search" @click="getSearch"></el-button>
            </el-autocomplete>
            <he-link href="goods/groupPublish">
                <el-button type="primary">添加分类</el-button>
            </he-link>
        </div>
        <div class="le-line"></div>
        <div class="flex">
            <div class="flex-sub">
                <div class="he-attr__header">
                    <span class="he-text">一级分类</span>
                </div>
                <div class="he-attr__body">
                    <div class="he-attr__group he-group__title">
                        <span class="he-group__name">分类名称</span>
                        <span class="he-group__sort">排序
                            <el-popover content="序号越大，排序越靠前" placement='top' trigger="hover" width="180">
                                <i slot="reference" class="el-icon-warning"></i>
                            </el-popover>
                        </span>
                        <span class="he-group__handle">操作</span>
                    </div>
                    <div class="he-group__empty" v-if="first.length === 0">该分类下暂无内容</div>
                    <el-scrollbar style="height:472px;">
                        <div class="he-attr__group" :style="chooseIndex.first === index?'background-color:#F7F5FE;':''"
                             @click="chooseClick('first',index)"
                             v-for="(item,index) in first" :key="index" v-show="item.show">
                            <div class="he-group__name el-row--flex is-align-middle">
                                <img :src="item.icon" alt="" class="he-img">
                                <div class="he-title">{{ item.name }}</div>
                            </div>
                            <div class="he-group__sort le_goods__main-goodstitle le_goods__main-sort">
                                {{ item.sort }}
                                <el-popover v-model="item.popover" title=" " trigger="click">
                                    <div class="el-popconfirm">
                                        <p class="el-popconfirm__main">
                                            <el-input v-model="sort"></el-input>
                                        </p>
                                        <div class="el-popconfirm__action">
                                            <el-button size="mini" type="text" @click.stop="cancel(index, 'first')">取消
                                            </el-button>
                                            <el-button size="mini" type="primary"
                                                       @click.stop="sortChange(index, 'first')">确定
                                            </el-button>
                                        </div>
                                    </div>
                                    <span @click="editSort(item)" slot="reference">
                                        <he-icon type="le-icon-editor" class="le_goods__main-sortedit"></he-icon>
                                    </span>
                                </el-popover>
                            </div>
                            <div class="he-group__handle">
                                <he-link href="goods/groupPublish" :query="{id: item.id}">
                                    <el-button type="text" class="he-class__button-new">
                                        编辑
                                    </el-button>
                                </he-link>
                                <span>|</span>
                                <el-button type="text" class="he-class__button-new" title="推广" top="25vh"
                                           v-popup.promote="{
                                    promoteType: 'group',
                                    data: item
                                    }"
                                           module="goods" width="791" :id="item.id+'_promote1'" :hide_footer="true">
                                    推广
                                </el-button>
                                <span>|</span>
                                <popconfirm width="392px" @confirm="deleteGroup({key:'first',index:index})"
                                            title="分类删除请谨慎，确定删除？">
                                    <el-button class="he-class__button-new" type="text">删除</el-button>
                                </popconfirm>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="flex-sub">
                <div class="he-attr__header">
                    <span class="he-text">二级分类</span>
                </div>
                <div class="he-attr__body">
                    <div class="he-attr__group he-group__title">
                        <span class="he-group__name">分类名称</span>
                        <span class="he-group__sort">排序
                            <el-popover content="序号越大，排序越靠前" placement='top' trigger="hover" width="180">
                                <i slot="reference" class="el-icon-warning"></i>
                            </el-popover>
                        </span>
                        <span class="he-group__handle">操作</span>
                    </div>
                    <div class="he-group__empty" v-if="second.length === 0">该分类下暂无内容</div>
                    <el-scrollbar style="height:472px;">
                        <div class="he-attr__group" @click="chooseClick('second',index)"
                             :style="chooseIndex.second === index?'background-color:#F7F5FE;':''"
                             v-for="(item,index) in second" :key="index" v-show="item.show">
                            <div class="he-group__name el-row--flex is-align-middle">
                                <img :src="item.icon" alt="" class="he-img">
                                <div class="he-title">{{ item.name }}</div>
                            </div>
                            <div class="he-group__sort le_goods__main-goodstitle le_goods__main-sort">
                                {{ item.sort }}
                                <el-popover v-model="item.popover" title=" " trigger="click">
                                    <div class="el-popconfirm">
                                        <p class="el-popconfirm__main">
                                            <el-input v-model="sort"></el-input>
                                        </p>
                                        <div class="el-popconfirm__action">
                                            <el-button size="mini" type="text" @click.stop="cancel(index, 'second')">
                                                取消
                                            </el-button>
                                            <el-button size="mini" type="primary"
                                                       @click.stop="sortChange(index, 'second')">确定
                                            </el-button>
                                        </div>
                                    </div>
                                    <span @click="editSort(item)" slot="reference">
                                        <he-icon type="le-icon-editor" class="le_goods__main-sortedit"></he-icon>
                                    </span>
                                </el-popover>
                            </div>
                            <div class="he-group__handle">
                                <he-link href="goods/groupPublish" :query="{id: item.id}">
                                    <el-button type="text" class="he-class__button-new">
                                        编辑
                                    </el-button>
                                </he-link>
                                <span>|</span>
                                <el-button type="text" class="he-class__button-new" title="推广" top="25vh"
                                           v-popup.promote="{
                                    promoteType: 'group',
                                    data: item
                                }" module="goods" width="791" :id="item.id+'_promote1'" :hide_footer="true">
                                    推广
                                </el-button>
                                <span>|</span>
                                <popconfirm width="392px" @confirm="deleteGroup({key:'second',index:index})"
                                            title="分类删除请谨慎，确定删除？">
                                    <el-button class="he-class__button-new" type="text">删除</el-button>
                                </popconfirm>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="flex-sub">
                <div class="he-attr__header">
                    <span class="he-text">三级分类</span>
                </div>
                <div class="he-attr__body">
                    <div class="he-attr__group he-group__title">
                        <span class="he-group__name">分类名称</span>
                        <span class="he-group__sort">排序
                            <el-popover content="序号越大，排序越靠前" placement='top' trigger="hover" width="180">
                                <i slot="reference" class="el-icon-warning"></i>
                            </el-popover>
                        </span>
                        <span class="he-group__handle">操作</span>
                    </div>
                    <div class="he-group__empty" v-if="third.length === 0">该分类下暂无内容</div>
                    <el-scrollbar style="height:472px;">
                        <div class="he-attr__group" v-for="(item,index) in third" :key="index"
                             @click="chooseClick('third',index)" v-show="item.show">
                            <div class="he-group__name el-row--flex is-align-middle">
                                <img :src="item.icon" alt="" class="he-img">
                                <div class="he-title">{{ item.name }}</div>
                            </div>
                            <div class="he-group__sort le_goods__main-goodstitle le_goods__main-sort">
                                {{ item.sort }}
                                <el-popover v-model="item.popover" title=" " trigger="click">
                                    <div class="el-popconfirm">
                                        <p class="el-popconfirm__main">
                                            <el-input v-model="sort"></el-input>
                                        </p>
                                        <div class="el-popconfirm__action">
                                            <el-button size="mini" type="text" @click.stop="cancel(index, 'third')">取消
                                            </el-button>
                                            <el-button size="mini" type="primary"
                                                       @click.stop="sortChange(index, 'third')">确定
                                            </el-button>
                                        </div>
                                    </div>
                                    <span @click="editSort(item)" slot="reference">
                                        <he-icon type="le-icon-editor" class="le_goods__main-sortedit"></he-icon>
                                    </span>
                                </el-popover>
                            </div>
                            <div class="he-group__handle">
                                <he-link href="goods/groupPublish" :query="{id: item.id}">
                                    <el-button type="text" class="he-class__button-new">
                                        编辑
                                    </el-button>
                                </he-link>
                                <span>|</span>
                                <el-button type="text" class="he-class__button-new" title="推广" top="25vh"
                                           v-popup.promote="{
                                                promoteType: 'group',
                                                data: item
                                            }"
                                           module="goods" width="791" :id="item.id+'_promote1'" :hide_footer="true">
                                    推广
                                </el-button>
                                <span>|</span>
                                <popconfirm width="392px" @confirm="deleteGroup({key:'third',index:index})"
                                            title="分类删除请谨慎，确定删除？">
                                    <el-button class="he-class__button-new" type="text">删除</el-button>
                                </popconfirm>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from "@/components/popconfirm.vue";
import HelpHint from "./components/helpHint.vue";

export default {
    components: {
        HelpHint,
        popconfirm
    },
    data() {
        return {
            activeName: 'first',
            search: '', //搜索名称
            searchChoose: null, //输入框选择对象
            searchList: [], //输入框搜索列队
            nameList: {}, //搜索重命名,名称匹配列队
            list: [], //处理后的渲染列队
            first: [],
            second: [],
            third: [],
            chooseIndex: {
                first: 0,
                second: 0
            },
            sort: 0,
            group_show: 0,
            style_index: 0,
        };
    },
    async mounted() {
        this.getList();
        this.getSetting();
    },
    methods: {
        chooseClick(key, index) {
            this.chooseIndex[key] = index;
            this.listBuild();
        },
        listBuild() {
            this.first = this.list;
            this.second = this.first[this.chooseIndex.first].children ? this.first[this.chooseIndex.first].children : [];
            this.third = this.second[this.chooseIndex.second] && this.second[this.chooseIndex.second].children ? this.second[this.chooseIndex.second].children : [];
        },
        getList: function () {
            this.$heshop.group('get', {include: 'goods'}).then(res => {
                res = res.map(v => {
                    v.popover = false;
                    v.show = true;
                    return v;
                })
                this.list = this.$heshop.toTree({
                    parentKey: 'parent_id',
                    idKey: 'id',
                    parentId: 0,
                    childrenKey: 'children'
                }).on(res).get();

                this.list.forEach(cat1 => {
                    cat1.value = cat1.name;
                    this.searchList.push(cat1);
                    if (cat1.children) {
                        cat1.children.forEach(cat2 => {
                            cat2.type = cat1.type;
                            cat2.value = `${cat1.value} > ${cat2.name}`;
                            this.searchList.push(cat2);
                            if (cat2.children) {
                                cat2.children.forEach(cat3 => {
                                    cat3.value = `${cat2.value} > ${cat3.name}`;
                                    this.searchList.push(cat3);
                                });
                            }
                        });
                    }
                });

                this.listBuild();
            }).catch((err) => {
                this.$message.error(err.data.message);
            });
        },
        hintRender: function () {
            return this.$createElement('HelpHint', {
                props: {
                    content: '序号越大，排序越靠前'
                }
            }, '排序');
        },
        cancel: function (index, key) {
            this.$set(this[key][index], 'popover', false);
        },
        sortChange: function (index, key) {
            this[key][index].popover = false;
            let item = this.$heshop.utils.deepClone(this[key][index]);
            item.sort = this.sort;
            this.$heshop.group('put', {id: this[key][index].id, include: 'goods'}, item).then(() => {
                this[key][index].sort = this.sort;
            }).catch((err) => {
                this.$message.error(err.data[0].message);
            });
        },
        editSort: function (item) {
            this.sort = item.sort;
        },
        deleteGroup(e) {
            this.$heshop.group('delete', this[e.key][e.index].id, {include: 'goods'}).then(() => {
                this.$message.success('删除成功');
                this.$delete(this[e.key], e.index);
            }).catch(err => {
                if (err.data.status === 403) {
                    this.$message.error(err.data.message);
                }
            });
        },
        /**
         * 控制分类显示隐藏
         * @param  {[type]} val  is_run是否执行 show为false时,index匹配的显示其余隐藏  show为true时全部显示
         * @return {[type]}      [description]
         */
        catShow(val1, val2, val3) {
            if (val1.is_run) {

                this.first.forEach((v, k) => {
                    if (val1.show) {
                        v.show = true;
                    } else {
                        v.show = val1.index === k;
                    }
                })
            }

            if (val2.is_run) {

                this.second.forEach((v, k) => {
                    if (val2.show) {
                        v.show = true;
                    } else {
                        v.show = val2.index === k;
                    }
                });
            }

            if (val3.is_run) {

                this.third.forEach((v, k) => {
                    if (val3.show) {
                        v.show = true;
                    } else {
                        v.show = val3.index === k;
                    }
                });
            }
        },
        getSearch() {
            let show_val1 = {is_run: false, show: false, index: -1};
            let show_val2 = {is_run: false, show: false, index: -1};
            let show_val3 = {is_run: false, show: false, index: -1};
            if (this.search) {
                let search_value = null;
                if (this.searchChoose) {
                    //有选择输入框下拉内容,优先使用选择内容
                    search_value = this.searchChoose;
                } else {
                    //没有选择时从列队中全民匹配
                    this.searchList.forEach(v => {
                        if (v.value == this.search) {
                            search_value = v;
                        }
                    })
                }

                if (search_value) {
                    let path = search_value.path.split('-').map(Number);
                    let level = path.length;
                    this.first.forEach((v, k) => {
                        if (level > 1) {
                            if (v.id === path[1]) {
                                this.chooseIndex.first = k;
                                show_val1 = {is_run: true, show: false, index: k};
                            }
                        } else {
                            //内容结果为1级时,使用内容id作为判断依据
                            if (v.id === search_value.id) {
                                this.chooseIndex.first = k;
                                this.chooseIndex.second = 0;
                                show_val1 = {is_run: true, show: false, index: k};
                                show_val2 = {is_run: true, show: true, index: -1};
                                show_val3 = {is_run: true, show: true, index: -1};
                            }
                        }

                    });

                    if (level > 1) {
                        this.first[this.chooseIndex.first].children.forEach((v1, k1) => {
                            if (level > 2) {
                                //内容结果大于2级时,用path[2]作为判断依据
                                if (v1.id === path[2]) {
                                    this.chooseIndex.second = k1;
                                    show_val2 = {is_run: true, show: false, index: k1};
                                }
                            } else {
                                //内容结果为2级时,使用内容id作为判断依据
                                if (v1.id === search_value.id) {
                                    this.chooseIndex.second = k1;
                                    show_val2 = {is_run: true, show: false, index: k1};
                                    show_val3 = {is_run: true, show: true, index: -1};
                                }
                            }
                        });
                    }

                    if (level > 2) {
                        this.first[this.chooseIndex.first].children[[this.chooseIndex.second]].children.forEach((v2, k2) => {
                            if (v2.id === search_value.id) {
                                show_val3 = {is_run: true, show: false, index: k2};
                            }

                        });
                    }
                    this.listBuild();
                } else {
                    this.second = [];
                    this.third = [];
                    show_val1 = {is_run: true, show: false, index: -1};
                }
            } else {
                this.chooseIndex = {
                    first: 0,
                    second: 0
                }
                show_val1 = {is_run: true, show: true, index: -1};
                show_val2 = {is_run: true, show: true, index: -1};
                show_val3 = {is_run: true, show: true, index: -1};
                this.listBuild();
            }
            this.catShow(show_val1, show_val2, show_val3);
        },
        handleSelect(e = null) {
            this.searchChoose = e;
            this.getSearch();
        },
        querySearch: function (queryString, cb, key) {
            let catList = this[key];
            let results = queryString ? catList.filter(function (restaurant) {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            }) : catList;

            this.searchChoose = null; //输入内容改变时,将之前选择结果清空

            let return_data = JSON.parse(JSON.stringify(results)); //引用问题阻隔
            cb(return_data);
        },
        getSetting() {
            this.$heshop.search('post', {include: 'setting'}, {keyword: 'goods_group_setting'}).then(res => {
                if (res) {
                    this.group_show = this.style_index = res.content.group_show;
                }
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        enable: function () {
            let data = {
                keyword: 'goods_group_setting',
                content: {
                    group_show: this.style_index
                }
            }
            this.$heshop.setting('post', data).then(() => {
                this.group_show = this.style_index;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style lang="less" scoped="true">
@import "./group.less";

.he-input {
    width: 367px;
    margin-right: 24px;

    /deep/ .el-input-group {
        width: 100%;
    }
}

.he-input /deep/ .el-input-group__append {
    padding: 0 15px;

    .el-button {
        padding: 9px 20px;
    }
}

.he-attr__header {
    min-width: 400px;
    margin-right: 25px;
    height: 48px;
    line-height: 48px;
    background: rgba(98, 60, 235, 0.05);
    border-radius: 4px;
    text-align: center;
}

.he-attr__header .he-text {
    font-size: 14px;
    font-weight: 400;
    color: #623CEB;
    opacity: 0.85;
}

.he-attr__body {
    overflow: hidden;
    min-width: 400px;
    margin-right: 25px;
    height: 520px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    margin-top: 8px;

    /deep/ .el-scrollbar__wrap {
        overflow-x: hidden !important;
    }

    .he-group__empty {
        text-align: center;
        color: #808080;
        margin-top: 40px;
    }

    .he-attr__group {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 48px;
        line-height: 48px;
        border-bottom: 1px solid #DCDFE6;

        span {
            font-size: 14px;
            display: inline-block;
            opacity: 0.85;

            i {
                color: #BBBFC8;
            }

        }

        .he-group__name {
            margin-left: 20px;
            width: 35%;
        }

        .he-group__sort {
            text-align: center;
            width: 15%;
        }

        .he-group__handle {
            margin-right: 20px;
            text-align: right;
            width: 35%;

            .he-class__button-new,
            span {
                color: #623CEB;
            }
        }

    }

    .he-group__title {
        color: #000;
        background: #F3F5F7;
        border-bottom: none;
    }

    .he-img {
        width: 28px;
        height: 28px;
        border-radius: 50%;
    }

    .he-title {
        font-size: 14px;
        font-weight: 400;
        color: #010101;
        opacity: 0.85;
        margin-left: 4px;
    }

    .el-button--text.he-class__button-new.el-button--mini {
        padding: 0 5px;
    }
}

.le_goods__main-sortedit {
    opacity: 0;
    width: 14px;
    height: 14px;
    cursor: pointer;
    color: #bbbfc8;
}

.le_goods__main-sort:hover .le_goods__main-sortedit {
    opacity: 1;
}

.he-style {
    padding: 0 12px;
    margin-bottom: 16px;
    width: 184px;
    background: #FFFFFF;
    border-radius: 4px;
    cursor: pointer;

    .he-text {
        width: 100px;
        height: 15px;
        font-size: 14px;
        font-weight: 400;
        margin-left: 12px;
    }

    .le-icon {
        width: 48px;
        height: 48px;
    }
}

.he-style__yes {
    color: #623CEB;
    border: 1px solid #623CEB;

    .he-text {
        color: #623CEB;;
    }
}

.he-style__no {
    color: #DCDFE6;
    border: 1px solid #DCDFE6;

    .he-text {
        color: #000000;
        opacity: 0.65;
    }
}

.he-preview {
    width: 330px;
    height: 600px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 40px;

    > img {
        width: 300px;
        height: 534px;
        margin: 33px 15px;
    }
}

.he-display-style {
    padding: 20px;
}

.he-using {
    margin-top: 12px;
    font-size: 12px;
    font-weight: 400;
    color: #53C41A;

    .he-using-icon {
        display: inline-block;
        width: 6px;
        height: 6px;
        background: #53C41A;
        border-radius: 50%;
        margin-right: 8px;
    }
}

.he-enable {
    margin: 24px 0;
}

.he-style__preview {
    padding-left: 24px;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: center;
}

.he-button {
    display: flex;
    align-items: right;
}

.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>
