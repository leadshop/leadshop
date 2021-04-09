<template>
    <div class="le-matter">
        <el-row class="le-cat__header">
            <el-col :span="12">
                <el-autocomplete placeholder="输入分类名称搜索" class="le-cat__input" v-model="state"
                                 @select="(cat) => {handleSelect(cat, 0)}"
                                 :trigger-on-focus="false"
                                 :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'searchList')}" >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-autocomplete>
            </el-col>
        </el-row>
        <div class="le-cat__body el-row--flex">
            <div  class="le-cat__body-item">
                <el-autocomplete placeholder="输入一级分类名称搜索" class="le-cat__input"
                                 v-model="state1"
                                 :trigger-on-focus="false"
                                 :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'catList')}"
                                 @select="(cat) => {handleSelect(cat, 1)}"
                >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-autocomplete>
                <div class="le-cat__body-item-list" >
                    <div v-for="(item, index) in catList" @click="selectCats(item, 1)" class="el-row--flex is-align-middle le-cat__body-item-listitem el-row--flex" v-if="item.type != 1" :class="current1 === item.id ? 'active' : ''" :key="index">
                        <he-icon type="le-icon-tick" size="8px" v-if="item.checked"></he-icon>
                        <!-- <div class="he-select" :class="item.checked ? 'el-icon-arrow-right' : ''"></div> -->
                        <div class="le-cat__body-item-label el-row--flex is-justify-space-between is-align-middle">
                            <span>{{item.name}}</span>
                            <i v-if="item.children && item.type === 3" class="el-icon-arrow-right"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="le-cat__body-item">
                <el-autocomplete placeholder="输入二级分类名称搜索" class="le-cat__input" v-model="state2"
                                 :fetch-suggestions="(queryString, cb) => {querySearch(queryString, cb, 'second')}"
                                 :trigger-on-focus="false"
                                 @select="(cat) => {handleSelect(cat, 2)}"
                >
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-autocomplete>
                <div class="le-cat__body-item-list">
                    <div v-for="(item, index) in second" :key="index" @click="selectCats(item, 2)" class="el-row--flex is-align-middle le-cat__body-item-listitem el-row--flex"  v-if="item.type == 3" :class="current2 === item.id ? 'active' : ''">
                        <he-icon type="le-icon-tick" size="8px" v-if="item.checked"></he-icon>
                        <div class="le-cat__body-item-label el-row--flex is-justify-space-between is-align-middle">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "chooseGroup",
    props: {
        value: [Array, Object]
    },
    data() {
        return {
            cats:[],
            catList: [],
            first:[],
            second: [],
            third: [],
            searchList: [],
            current1: 0,
            current2: 0,
            current3: 0,
            state: '',
            state1: '',
            state2: '',
            state3: ''
        }
    },
    created() {
        this.getData();
    },
    methods: {
        getList: function() {
            this.$heshop.group('get', {include: 'goods'}).then(res => {

            }).catch(res => {
                this.$message.error(err.data.message);
            });
        },
        getData() {
            this.$heshop.group('get', {include: 'goods'}).then(res => {
                this.catList = this.$heshop.toTree({
                    parentKey: 'parent_id',
                    idKey: 'id',
                    parentId: 0,
                    childrenKey: 'children'
                }).on(res).get();
                this.catList.forEach(cat1 => {
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
                if (this.current1 === 0) {
                    this.current1 = this.catList[0].id;
                    this.catList[0].checked = true;
                }
            }).catch(res => {
                this.$message.error(err.data.message);
            });
        },
        selectCats(item, type) {
            this.catList.forEach(item1 => {
                item1.checked = false;
                if (item1.children) {
                    item1.children.forEach(item2 => {
                        item2.checked = false;
                        if (item2.children) {
                            item2.children.forEach(item3 => {
                                item3.checked = false;
                            });
                        }
                    });
                }
            });
            item.checked = true;
            switch (type) {
                case 1:
                    this.second = [];
                    this.third = [];
                    this.current1 = item.id;
                    this.current2 = 0;
                    this.second = item.children;
                    break;
                case 2:
                    this.third = [];
                    this.current2 = item.id;
                    this.current3 = 0;
                    this.third = item.children;
                    break;
                default:
                    this.current3 = item.id;
            }
        },
        optionClick(item) {
            let sign = true;
            this.cats.forEach((cat, index) => {
                if (cat.id === item.id) {
                    sign = false;
                    this.cats.splice(index, 1);
                }
            });
            if (sign && item.checked) {
                this.cats.push(item);
            }
        },
        querySearch: function(queryString, cb, key) {
            let catList = this[key];
            let results = queryString ? catList.filter(function(restaurant) {
                return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) >= 0);
            }) : catList;

            let new_result = [];

            results.forEach(v=>{
                if (v.type>1) {
                    new_result.push(v);
                }
            })

            cb(new_result);
        },
        handleSelect(cat, type) {
            let array = cat.path.split('-');
            if (type === 0) {
                if (array.length === 1) {
                    this.selectCats(cat, 1);
                } else if (array.length === 2) {
                    this.catList.forEach(item => {
                        item.checked = false;
                        if (item.id === Number(array[1])) {
                            this.selectCats(item, 1);
                        }
                    });
                    this.selectCats(cat, 2);
                } else if (array.length === 3) {
                    this.catList.forEach(item => {
                        item.checked = false;
                        if (item.id === Number(array[1])) {
                            this.selectCats(item, 1);
                        }
                    });
                    this.second.forEach(item => {
                        if (item.id === Number(array[2])) {
                            this.selectCats(item, 2);
                        }
                    });
                    this.selectCats(cat, 3);
                }
            } else if (type === 1) {
                this.selectCats(cat, 1);
            } else if (type === 2) {
                this.second.forEach(item => {
                    if (item.id === Number(array[1])) {
                        this.selectCats(item, 1);
                    }
                });
                this.selectCats(cat, 2);
            } else if (type === 3) {
                this.third.forEach(item => {
                    if (item.id === Number(array[1])) {
                        this.selectCats(item, 1);
                    }
                });
                this.third.forEach(item => {
                    if (item.id === Number(array[2])) {
                        this.selectCats(item, 2);
                    }
                });
                this.selectCats(cat, 3);
            }
        },
        affirm(e) {
            let { handleClose } = e;
            let check = null;
            this.catList.forEach(item1 => {
                if (item1.checked) {
                    return check = item1;
                }
                if (item1.children) {
                    item1.children.forEach(item2 => {
                        if (item2.checked) {
                            return check = item2;
                        }
                    });
                }
            });
            this.value.result = check;
            this.$emit('input', this.value);
            handleClose();
        }
    }
};
</script>

<style scoped lang="scss">
//@import "./../../../theme/element-variables";
.le-matter {
    padding: 32px 40px;
}
.le-cat__body {
    border: 1px solid #DCDFE6;
    margin-top: 16px;
}
.le-matter .le-cat__input {
    width:100%;
}
.le-matter .le-cat__input /deep/ .el-input {
    width:100%;
}
.le-cat__body-item {
    padding-bottom:16px;
}
.le-cat__body-item {
    border-right:  1px solid #DCDFE6;
}
.le-cat__body-item:last-child {
    border-right:none;
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
    max-height: 183px;
    overflow: auto;
}
.le-cat__body-item-list::-webkit-scrollbar {
    display: none;
}
.le-cat__body-item-listitem {
    height: 32px;
    padding: 0 16px;
    line-height: 32px;
}
.le-cat__body-item-listitem.active {
    color: #623CEB;
}
.le-cat__body-item-listitem /deep/ .el-checkbox {
    margin-right:7px;
}
.le-cat__body-item-label {
    width:100%;
    cursor: pointer;
}

.le-cat__footer {
    margin-top: 16px;
}
.le-cat__footer-tag {
    margin:0 8px 8px 0;
    background-color: #ffffff;
    border: 1px solid #BEBEBE;
}
.he-select {
    width:14px;
    height: 14px;
}
</style>
