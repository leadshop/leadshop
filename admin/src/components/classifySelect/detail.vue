<template>
    <div class="classify-select__detail">
        <div class="classify-select__header">
            <el-input placeholder="输入搜索分类" v-model="keyword" class="le-goodspage_search" size="small" @keyup.enter.native="handleSearch">
                <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
            </el-input>
        </div>
        <div class="classify-select__content">
            <div class="classify-select__list">
                <el-input placeholder="输入搜索一级分类" v-model="keyword1" class="le-goodspage_search" size="small" @keyup.enter.native="handleSearch1">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch1"></el-button>
                </el-input>
                <el-scrollbar :style="{height:'168px','margin-top': '8px'}">
                    <el-radio-group v-model="selectData1" @change="handleChange1">
                        <el-radio :label="item" v-for="item,index in classifyData1" :key="index">
                            <i class="le-icon le-icon-tick" v-if="!item.children"></i>
                            {{item.name}}
                            <i class="le-icon le-icon-arrow-right" v-if="item.children"></i>
                        </el-radio>
                    </el-radio-group>
                </el-scrollbar>
            </div>
            <div class="classify-select__list">
                <el-input placeholder="输入搜索二级分类" v-model="keyword2" class="le-goodspage_search" size="small" @keyup.enter.native="handleSearch2">>
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch2" </el-button> </el-input> <el-scrollbar :style="{height:'168px','margin-top': '8px'}">
                        <el-radio-group v-model="selectData2" @change="handleChange2">
                            <el-radio :label="item" v-for="item,index in classifyData2" :key="index">
                                <i class="le-icon le-icon-tick" v-if="!item.children"></i>
                                {{item.name}}
                            </el-radio>
                        </el-radio-group>
                        </el-scrollbar>
            </div>
            <div class="classify-select__list">
                <el-input placeholder="输入搜索三级分类" v-model="keyword3" class="le-goodspage_search" size="small" @keyup.enter.native="handleSearch3">
                    <el-button slot="append" icon="el-icon-search" @click="handleSearch3"></el-button>
                </el-input>
                <el-scrollbar :style="{height:'168px','margin-top': '8px'}">
                    <el-radio-group v-model="selectData3" @change="handleChange3">
                        <el-radio :label="item" v-for="item,index in classifyData3" :key="index">
                            <i class="le-icon le-icon-tick" v-if="!item.children"></i>
                            {{item.name}}
                        </el-radio>
                    </el-radio-group>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    inject: ['self'],
    data() {
        return {
            keyword: "",
            keyword1: "",
            keyword2: "",
            keyword3: "",
            classifyData1: [],
            classifyData2: [],
            classifyData3: [],
            selectData1: [],
            selectData2: [],
            selectData3: [],
            isSelect: false,
            cacheData: {}
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        keyword(value) {
            if (value == "") {
                this.classifyData1 = JSON.parse(JSON.stringify(this.cacheData['classifyData1']));
            }
        },
        keyword1(value) {
            if (value == "") {
                this.classifyData1 = JSON.parse(JSON.stringify(this.cacheData['classifyData1']));
            }
        },
        keyword2(value) {
            if (value == "") {
                this.classifyData2 = this.cacheData['classifyData2'] ? JSON.parse(JSON.stringify(this.cacheData['classifyData2'])) : [];
            }
        },
        keyword3(value) {
            if (value == "") {
                this.classifyData3 = this.cacheData['classifyData3'] ? JSON.parse(JSON.stringify(this.cacheData['classifyData3'])) : [];
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.handleLoad();
    },
    methods: {
        /**
         * 分组数据加载
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleLoad(e) {
            this.$heshop.group("get", { include: 'goods' }).then(res => {
                this.setMenuTreeData(res);
                this.classifyData1 = this.TreeModel.get();
                this.cacheData['classifyData1'] = JSON.parse(JSON.stringify(this.classifyData1));
            }).catch(error => {
                console.error("错误提示", error)
            })
        },
        /**
         * 获取树状结构数据
         * @param {[type]} data [description]
         */
        setMenuTreeData(data) {
            //添加到子集路由
            this.TreeModel = this.$heshop.toTree({
                parentKey: "parent_id",
                idKey: "id",
                parentId: 0,
                childrenKey: 'children',
                name: "name",
                title: "name"
            }).on(data);
        },
        /**
         * 处理分类选择
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        handleChange1(value) {
            this.classifyData2 = [];
            this.classifyData3 = [];
            this.self.selectData = [];
            if (value.children && value.children.length > 0) {
                this.classifyData2 = value.children;
                this.cacheData['classifyData2'] = JSON.parse(JSON.stringify(value.children));
                this.self.isSelect = false;
            } else {
                this.self.selectData.push(value);
                this.self.isSelect = true;
            }
            let data = JSON.parse(JSON.stringify(value));
            if (data.children) {
                delete data.children;
            }
            this.self.selectData.push(data);
        },
        handleChange2(value) {
            this.classifyData3 = [];
            if (value.children && value.children.length > 0) {
                this.classifyData3 = value.children;
                this.cacheData['classifyData3'] = JSON.parse(JSON.stringify(value.children));
                this.self.isSelect = false;
            } else {
                this.self.selectData.push(value);
                this.self.isSelect = true;
            }
            let data = JSON.parse(JSON.stringify(value));
            if (data.children) {
                delete data.children;
            }
            this.self.selectData.push(data);
        },
        handleChange3(value) {
            this.self.selectData.push(value);
            this.self.isSelect = true;
        },
        /**
         * 执行数据搜索
         * @param  {[type]} key   搜索的字段
         * @param  {[type]} value 搜索的数值
         * @return {[type]}       [description]
         */
        search(rawData, value, is_full = true) {
            let key = this.groupField.name;
            const greaterThanTen = rawData.filter((element, index) => {
                if (is_full) {
                    if (element[key] == value) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    let str = ['', ...value, ''].join('.*'); //转化成正则格式的字符串
                    let reg = new RegExp(str) //正则
                    if (reg.test(element[key])) {
                        return true;
                    } else {
                        return false;
                    }
                }
            });
            if (is_full && greaterThanTen.length) {
                return greaterThanTen[0];
            } else {
                return greaterThanTen;
            }
        },
        /**
         * 搜索分类
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        handleSearch(val) {
            let data = this.TreeModel.search("name", this.keyword, true);
            if (data['$_path']) {
                //需要强制转字符串，否则如果为一级的时候，数据为数字，会报错
                let path = data['path'].toString().split("-");
                if (path.length == 1) {
                    let simpleArr = this.classifyData1.filter((item, i) => {
                        return item.id == data.id;
                    })
                    for (let index in simpleArr) {
                        let item = simpleArr[index];
                        this.selectData1 = item;
                    }
                    this.classifyData1 = simpleArr;
                }
                path.shift()
                if (path[0]) {
                    let simpleArr = this.cacheData['classifyData1'].filter((item, i) => {
                        return item.id == path[0];
                    })
                    this.classifyData1 = simpleArr;
                    this.classifyData2 = [];
                    this.classifyData3 = [];

                    for (let index in simpleArr) {
                        let item = simpleArr[index];
                        if (item.children) {
                            this.classifyData2 = item.children;
                            this.selectData1 = item;
                            break
                        }
                    }
                }
                if (path[1]) {
                    let simpleArr = this.classifyData2.filter((item, i) => {
                        return item.id == path[1];
                    })
                    this.classifyData2 = simpleArr;
                    this.classifyData3 = [];

                    for (let index in simpleArr) {
                        let item = simpleArr[index];
                        if (item.children) {
                            this.classifyData3 = item.children;
                            this.selectData2 = item;
                            break
                        }
                    }
                }
                if (this.classifyData3.length > 0) {
                    let simpleArr = this.classifyData3.filter((item, i) => {
                        return item.id == data.id;
                    })
                    for (let index in simpleArr) {
                        let item = simpleArr[index];
                        this.selectData3 = item;
                    }
                    this.classifyData3 = simpleArr;
                }
            }
        },
        /**
         * 搜索分类1
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        handleSearch1() {
            let simpleArr = this.classifyData1.filter((item) => {
                return item.name == this.keyword1;
            })
            for (let index in simpleArr) {
                let item = simpleArr[index];
                this.selectData1 = item;
            }
            this.classifyData1 = simpleArr;

        },
        /**
         * 搜索分类2
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        handleSearch2() {

            let simpleArr = this.classifyData2.filter((item, i) => {
                return item.name == this.keyword2
            })
            for (let index in simpleArr) {
                let item = simpleArr[index];
                this.selectData1 = item;
            }
            this.classifyData1 = simpleArr;

        },
        /**
         * 搜索分类3
         * @param  {[type]} val [description]
         * @return {[type]}     [description]
         */
        handleSearch3() {

            let simpleArr = this.classifyData3.filter((item, i) => {
                return item.name == this.keyword3
            })
            for (let index in simpleArr) {
                let item = simpleArr[index];
                this.selectData1 = item;
            }
            this.classifyData1 = simpleArr;

        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>