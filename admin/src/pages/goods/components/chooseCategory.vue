<template>
    <div class="le-matter">
        <el-row class="le-cat__header">
            <el-col :span="12">
                <el-autocomplete clearable :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'searchList')}"
                                 @keydown.enter.native="handleSelect(null,'searchChoose', 'searchList')"
                                 @clear="(cat) => {handleSelect(cat,'searchChoose', 'searchList')}"
                                 :trigger-on-focus="false" @select="(cat) => {handleSelect(cat,'searchChoose', 'searchList')}" class="le-cat__input"
                                 placeholder="输入分类名称搜索" v-model="search">
                    <el-button @click="getSearch('searchList')" icon="el-icon-search" slot="append">
                    </el-button>
                </el-autocomplete>
            </el-col>
        </el-row>
        <div class="le-cat__body el-row--flex">
            <div class="le-cat__body-item">
                <el-autocomplete :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'first')}" :trigger-on-focus="false"
                                 clearable
                                 @clear="(cat) => {handleSelect(cat,'searchChoose1', 'first')}"
                                 @keydown.enter.native="handleSelect(null,'searchChoose1', 'first')"
                                 @select="(cat) => {handleSelect(cat,'searchChoose1', 'first')}" class="le-cat__input" placeholder="输入一级分类名称搜索" v-model="search1">
                    <el-button @click="getSearch('first')" icon="el-icon-search" slot="append">
                    </el-button>
                </el-autocomplete>
                <div class="le-cat__body-item-list">
                    <el-scrollbar style="height: 250px;">
                        <div :class="current1 === index ? 'active' : ''" :key="index" @click="selectCats(index, 1)" class="le-cat__body-item-listitem el-row--flex" v-for="(item, index) in first" v-show="item.show">
                            <el-checkbox :disabled="true" v-if="item.children"></el-checkbox>
                            <el-checkbox @change="optionClick(item)" v-model="item.checked" v-else></el-checkbox>
                            <div class="le-cat__body-item-label el-row--flex is-justify-space-between is-align-middle">
                                <span>
                                    {{item.name}}
                                </span>
                                <i class="el-icon-arrow-right" v-if="item.children">
                                </i>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="le-cat__body-item">
                <el-autocomplete :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'second')}" :trigger-on-focus="false"
                                 clearable
                                 @clear="(cat) => {handleSelect(cat,'searchChoose2', 'second')}"
                                 @keydown.enter.native="handleSelect(null,'searchChoose2', 'second')"
                                 @select="(cat) => {handleSelect(cat,'searchChoose2', 'second')}" class="le-cat__input" placeholder="输入二级分类名称搜索" v-model="search2">
                    <el-button @click="getSearch('second')" icon="el-icon-search" slot="append">
                    </el-button>
                </el-autocomplete>
                <div class="le-cat__body-item-list">
                    <el-scrollbar style="height: 250px;">
                        <div :class="current2 === index ? 'active' : ''" :key="index" @click="selectCats(index, 2)" class="le-cat__body-item-listitem el-row--flex" v-for="(item, index) in second" v-show="item.show">
                            <el-checkbox :disabled="true" v-if="item.children"></el-checkbox>
                            <el-checkbox @change="optionClick(item)" v-model="item.checked" v-else></el-checkbox>
                            <div class="le-cat__body-item-label el-row--flex is-justify-space-between is-align-middle">
                                <span>
                                    {{item.name}}
                                </span>
                                <i class="el-icon-arrow-right" v-if="item.children">
                                </i>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="le-cat__body-item">
                <el-autocomplete :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'third')}" :trigger-on-focus="false"
                                 clearable
                                 @clear="(cat) => {handleSelect(cat,'searchChoose3', 'third')}"
                                 @keydown.enter.native="handleSelect(null,'searchChoose3', 'third')"
                                 @select="(cat) => {handleSelect(cat,'searchChoose3', 'third')}" class="le-cat__input" placeholder="输入三级分类名称搜索" v-model="search3">
                    <el-button @click="getSearch('third')" icon="el-icon-search" slot="append">
                    </el-button>
                </el-autocomplete>
                <div class="le-cat__body-item-list">
                    <el-scrollbar style="height: 250px;">
                        <div :key="index" class="le-cat__body-item-listitem el-row--flex" v-for="(item, index) in third" v-show="item.show">
                            <el-checkbox @change="optionClick(item)" v-model="item.checked">
                            </el-checkbox>
                            <div class="le-cat__body-item-label el-row--flex is-justify-space-between is-align-middle">
                                <span>
                                    {{item.name}}
                                </span>
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
            </div>
        </div>
        <div class="le-cat__footer" v-if="cats.length > 0">
            <el-tag :key="index" @close="deleteTag(item, index)" class="le-cat__footer-tag" closable="" size="medium" type="info" v-for="(item, index) in cats" v-if="!item.children">
                {{item.value}}
            </el-tag>
        </div>
    </div>
</template>
<script>
export default {
    name: "chooseCategory",
    props: {
        value: [Array, Object]
    },
    data() {
        return {
            cats: [],
            catList: [],
            first: [],
            second: [],
            third: [],
            nameList: {},
            searchList: [],
            searchChoose: null,
            searchChoose1: null,
            searchChoose2: null,
            searchChoose3: null,
            current1: 0,
            current2: 0,
            search: '',
            search1: '',
            search2: '',
            search3: ''
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            let { cat, result } = JSON.parse(JSON.stringify(this.value));
            let data = cat;
            this.cats = result;

            data.forEach(item => {
                item.checked = false;
                item.show = true;
                if (this.cats.length > 0) {
                    this.cats.forEach(cat => {
                        if (item.id === cat.id) {
                            item.checked = true;
                        }
                    });
                }
            });

            this.catList = this.$heshop.toTree({
                parentKey: 'parent_id',
                idKey: 'id',
                parentId: 0,
                childrenKey: 'children'
            }).on(data).get();

            this.catList.forEach(cat1 => {
                cat1.value = cat1.name;
                this.searchList.push(cat1);
                if (cat1.children) {
                    cat1.children.forEach(cat2 => {
                        let new_cat2 = JSON.parse(JSON.stringify(cat2));
                        cat2.value = cat2.name;
                        new_cat2.value = `${cat1.value}>${cat2.name}`;
                        this.searchList.push(new_cat2);
                        if (cat2.children) {
                            cat2.children.forEach(cat3 => {
                                let new_cat3 = JSON.parse(JSON.stringify(cat3));
                                cat3.value = cat3.name;
                                new_cat3.value = `${new_cat2.value}>${cat3.name}`;
                                this.searchList.push(new_cat3);
                            });
                        }
                    });
                }
            });

            let nameList = {};
            this.searchList.forEach(v => {
                nameList[v.id] = v;
            })
            this.nameList = nameList;

            this.catBuild();
        },
        selectCats(index, type) {
            let show_val1 = { is_run: false, show: false, index: -1 };
            let show_val2 = { is_run: false, show: false, index: -1 };
            let show_val3 = { is_run: false, show: false, index: -1 };
            switch (type) {
                case 1:
                    this.current1 = index;
                    this.current2 = 0;
                    this.search2 = '';
                    this.search3 = '';
                    show_val2 = { is_run: true, show: true, index: -1 };
                    show_val3 = { is_run: true, show: true, index: -1 };
                    break;
                case 2:
                    this.current2 = index;
                    this.search3 = '';
                    show_val3 = { is_run: true, show: true, index: -1 };
                    break;
            }
            this.catBuild();
            this.catShow(show_val1, show_val2, show_val3);
        },
        catBuild() {
            this.first = this.catList;
            this.second = this.first[this.current1].children ? this.first[this.current1].children : [];
            this.third = this.second[this.current2] && this.second[this.current2].children ? this.second[this.current2].children : [];
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
                        if (val1.index === k) {
                            v.show = true;
                        } else {
                            v.show = false;
                        }
                    }
                })
            }

            if (val2.is_run) {

                this.second.forEach((v, k) => {
                    if (val2.show) {
                        v.show = true;
                    } else {
                        if (val2.index === k) {
                            v.show = true;
                        } else {
                            v.show = false;
                        }
                    }
                })
            }

            if (val3.is_run) {

                this.third.forEach((v, k) => {
                    if (val3.show) {
                        v.show = true;
                    } else {
                        if (val3.index === k) {
                            v.show = true;
                        } else {
                            v.show = false;
                        }
                    }
                })
            }
        },
        getSearch(key) {
            let cat = null; //搜索选中的分类
            let search = '';
            let show_val1 = { is_run: false, show: false, index: -1 };
            let show_val2 = { is_run: false, show: false, index: -1 };
            let show_val3 = { is_run: false, show: false, index: -1 };
            switch (key) {
                case 'searchList':
                    search = this.search
                    cat = this.searchChoose;
                    break;
                case 'first':
                    search = this.search1
                    cat = this.searchChoose1;
                    break;
                case 'second':
                    search = this.search2
                    cat = this.searchChoose2;
                    break;
                case 'third':
                    search = this.search3
                    cat = this.searchChoose3;
                    break;
            }

            if (search) {
                if (!cat) {
                    this[key].forEach(v => {
                        if (v.value == search) {
                            cat = v;
                        }
                    });
                }
                if (cat) {
                    let arr = cat.path.split('-');

                    switch (key) {
                        case 'searchList':
                            if (arr.length == 1) {
                                this.first.forEach((v, k) => {
                                    if (v.id == cat.id) {
                                        this.current1 = k;
                                        this.current2 = 0;
                                        show_val1 = { is_run: true, show: false, index: k };
                                        show_val2 = { is_run: true, show: true, index: -1 };
                                        show_val3 = { is_run: true, show: true, index: -1 };
                                    }
                                })
                            } else if (arr.length == 2) {
                                this.first.forEach((v, k) => {
                                    if (v.id == arr[1]) {
                                        this.current1 = k;
                                        show_val1 = { is_run: true, show: false, index: k };
                                        this.first[k].children.forEach((v1, k1) => {
                                            if (v1.id == cat.id) {
                                                this.current2 = k1;
                                                show_val2 = { is_run: true, show: false, index: k1 };
                                                show_val3 = { is_run: true, show: true, index: -1 };
                                            }
                                        })
                                    }
                                })
                            } else {
                                this.first.forEach((v, k) => {
                                    if (v.id == arr[1]) {
                                        this.current1 = k;
                                        show_val1 = { is_run: true, show: false, index: k };
                                        this.first[k].children.forEach((v1, k1) => {
                                            if (v1.id == arr[2]) {
                                                this.current2 = k1;
                                                show_val2 = { is_run: true, show: false, index: k1 };
                                                this.first[k].children[k1].children.forEach((v2, k2) => {
                                                    if (v2.id == cat.id) {
                                                        show_val3 = { is_run: true, show: false, index: k2 };
                                                    }
                                                })

                                            }
                                        })
                                    }
                                })
                            }

                            break;
                        case 'first':
                            this.first.forEach((v, k) => {
                                if (v.id == cat.id) {
                                    this.current1 = k;
                                    this.current2 = 0;
                                    show_val1 = { is_run: true, show: false, index: k };
                                    show_val2 = { is_run: true, show: true, index: -1 };
                                    show_val3 = { is_run: true, show: true, index: -1 };
                                }
                            })
                            break;
                        case 'second':
                            this.second.forEach((v, k) => {
                                if (v.id == cat.id) {
                                    this.current2 = k;
                                    show_val2 = { is_run: true, show: false, index: k };
                                    show_val3 = { is_run: true, show: true, index: -1 };
                                }
                            })
                            break;
                        case 'third':
                            this.third.forEach((v, k) => {
                                if (v.id == cat.id) {
                                    show_val3 = { is_run: true, show: false, index: k };
                                }
                            })
                            break;
                    }

                    this.catBuild();

                } else {
                    switch (key) {
                        case 'second':
                            this.third = [];
                            show_val2 = { is_run: true, show: false, index: -1 };
                            break;
                        case 'third':
                            show_val3 = { is_run: true, show: false, index: -1 };
                            break;
                        default:
                            this.second = [];
                            this.third = [];
                            show_val1 = { is_run: true, show: false, index: -1 };
                            break;
                    }
                }
            } else {
                switch (key) {
                    case 'second':
                        this.current2 = 0;
                        show_val1 = { is_run: false, show: true, index: -1 };
                        show_val2 = { is_run: true, show: true, index: -1 };
                        show_val3 = { is_run: true, show: true, index: -1 };
                        break;
                    case 'third':
                        show_val3 = { is_run: true, show: true, index: -1 };
                        break;
                    default:
                        this.current1 = 0;
                        this.current2 = 0;
                        show_val1 = { is_run: true, show: true, index: -1 };
                        show_val2 = { is_run: true, show: true, index: -1 };
                        show_val3 = { is_run: true, show: true, index: -1 };
                        break;
                }
                this.catBuild();
            }

            this.catShow(show_val1, show_val2, show_val3);


        },
        querySearch: function(queryString, cb, key) {
            let catList = this[key];
            let results = queryString ? catList.filter(function(restaurant) {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            }) : catList;

            switch (key) {
                case 'first':
                    this.searchChoose1 = null;
                    break;
                case 'second':
                    this.searchChoose2 = null;
                    break;
                case 'third':
                    this.searchChoose3 = null;
                    break;
                default:
                    this.searchChoose = null;
                    break;
            }
            cb(results);
        },
        handleSelect(cat, key, search) {
            this[key] = cat;
            this.getSearch(search);
        },
        optionClick(item) {
            let sign = true;
            this.cats.forEach((cat, index) => {
                if (cat.id === item.id) {
                    sign = false;
                    this.cats.splice(index, 1);
                    let path = item.path.split('-').map(Number);
                    let level = path.length;
                    if (level === 3) {
                        let p_deleted = false; //父级是否被删除,保证每次只删除一个
                        let p2_deleted = false; //父父级是否被删除,保证每次只删除一个
                        this.cats.forEach((v, k) => {
                            if (v.id === path[1]) {
                                if (!p2_deleted) {
                                    p2_deleted = true;
                                    this.cats.splice(k, 1);
                                }
                                this.cats.forEach((v2, k2) => {
                                    if (v2.id === path[2]) {
                                        if (!p_deleted) {
                                            p_deleted = true;
                                            this.cats.splice(k2, 1);
                                        }
                                    }
                                })
                            }
                        })
                    } else if (level === 2) {
                        let p_deleted = false;
                        this.cats.forEach((v, k) => {
                            if (v.id === path[1]) {
                                if (!p_deleted) {
                                    p_deleted = true;
                                    this.cats.splice(k, 1);
                                }
                            }
                        })
                    }
                }
            });
            if (sign && item.checked) {
                let path = item.path.split('-').map(Number);
                let level = path.length;
                if (level === 3) {
                    item.value = this.nameList[path[1]].name + '>' + this.nameList[path[2]].name + '>' + item.name;
                    this.cats.push(this.nameList[path[1]], this.nameList[path[2]]);
                } else if (level === 2) {
                    item.value = this.nameList[path[1]].name + '>' + item.name;
                    this.cats.push(this.nameList[path[1]]);
                } else {
                    item.value = item.name
                }
                this.cats.push(item);
            }
        },
        deleteTag(item, index) {
            this.cats.splice(index, 1);
            let path = item.path.split('-').map(Number);
            let level = path.length;
            if (level === 3) {
                let p_deleted = false; //父级是否被删除,保证每次只删除一个
                let p2_deleted = false; //父父级是否被删除,保证每次只删除一个
                this.cats.forEach((v, k) => {
                    if (v.id === path[1]) {
                        if (!p2_deleted) {
                            p2_deleted = true;
                            this.cats.splice(k, 1);
                        }
                        this.cats.forEach((v2, k2) => {
                            if (v2.id === path[2]) {
                                if (!p_deleted) {
                                    p_deleted = true;
                                    this.cats.splice(k2, 1);
                                }
                            }
                        })
                    }
                })
            } else if (level === 2) {
                let p_deleted = false;
                this.cats.forEach((v, k) => {
                    if (v.id === path[1]) {
                        if (!p_deleted) {
                            p_deleted = true;
                            this.cats.splice(k, 1);
                        }
                    }
                })
            }
            this.first.forEach(cat => {
                if (cat.id === item.id) {
                    cat.checked = false;
                }
                if (cat.children) {
                    cat.children.forEach(function(cat2) {
                        if (cat2.id === item.id) {
                            cat2.checked = false;
                        }
                        if (cat2.children) {
                            cat2.children.forEach(function(cat3) {
                                if (cat3.id === item.id) {
                                    cat3.checked = false;
                                }
                            });
                        }
                    })
                }
            });
        },
        affirm(e) {
            let { handleClose } = e;
            this.value.result = this.cats;
            this.$emit('input', this.value);
            handleClose();
        }
    }
};
</script>
<style lang="scss" scoped="">
.le-matter {
    padding: 0 40px;
}

.le-cat__body {
    border: 1px solid #DCDFE6;
    margin-top: 16px;
}

.le-matter .le-cat__input {
    width: 100%;
}

.le-matter .le-cat__input /deep/ .el-input {
    width: 100%;
}

.le-cat__body-item {
    padding-bottom: 16px;
}

.le-cat__body-item {
    border-right: 1px solid #DCDFE6;
}

.le-cat__body-item:last-child {
    border-right: none;
}

.le-cat__input /deep/ .el-button.el-button--mini {
    padding: 9px 17px;
}

.le-cat__input /deep/ .el-input-group__append {
    padding: 0 17px;
}

.le-cat__body .le-cat__input {
    padding: 16px 16px 0 16px;
}

.le-cat__body-item-list {
    margin-top: 15px;
}

.le-cat__body-item-list /deep/ .el-scrollbar__wrap {
    overflow-x: hidden;
}


.le-cat__body-item-listitem {
    height: 32px;
    padding: 0 16px;
    line-height: 32px;
}

.le-cat__body-item-listitem.active {
    background: #f3f5f7;
}

.le-cat__body-item-listitem /deep/ .el-checkbox {
    margin-right: 7px;
}

.le-cat__body-item-label {
    width: 100%;
    cursor: pointer;
}

.le-cat__footer {
    margin-top: 16px;
}

.le-cat__footer-tag {
    margin-right: 8px;
    background-color: #ffffff;
    margin-bottom: 8px;
    border: 1px solid #BEBEBE;
}
</style>
