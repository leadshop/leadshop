<template>
    <div class="hyperlink-detail">
        <div class="hyperlink-detail-search">
            <el-input placeholder="输入链接名称搜索" class="input-radio-search" v-model="searchData" @keyup.enter.native="hendleSearch">
                <el-button slot="append" icon="el-icon-search" @click="hendleSearch"></el-button>
            </el-input>
        </div>
        <el-scrollbar :style="{height:'196px'}">
            <el-radio-group v-model="self.selectData">
                <el-radio :label="item" v-for="(item,index) in linkList" :key="index" v-if="self.forbidden.indexOf(index) == -1">
                    <div class="hyperlink-detail-span" v-if="item.extend">
                        <goodsSelet type="radio" v-if="item.index == 2" v-model="item.param">
                            {{item.name}}
                            <span class="hyperlink-detail-tips" v-if="item.param.name">
                                ({{item.param.name}})
                            </span>
                            <i class="le-icon le-icon-arrow-right"></i>
                        </goodsSelet>
                        <groupSelect v-if="item.index == 3" v-model="item.param">
                            {{item.name}}
                            <span class="hyperlink-detail-tips" v-if="item.param.address">
                                ({{item.param.address}})
                            </span>
                            <i class="le-icon le-icon-arrow-right"></i>
                        </groupSelect>
                        <pagesSelet v-if="item.index == 7" v-model="item.param">
                            {{item.name}}
                            <span class="hyperlink-detail-tips" v-if="item.param.name">
                                ({{item.param.name}})
                            </span>
                            <i class="le-icon le-icon-arrow-right"></i>
                        </pagesSelet>
                    </div>
                    <span v-else>{{item.name}}</span>
                </el-radio>
            </el-radio-group>
        </el-scrollbar>
    </div>
</template>
<script type="text/javascript">
import goodsSelet from '@/components/goodsSelet/index.vue'
import classifySelect from '@/components/classifySelect/index.vue'
import groupSelect from '@/components/groupSelect/group.vue'
import pagesSelet from './pages.vue'

export default {
    components: {
        goodsSelet,
        classifySelect,
        groupSelect,
        pagesSelet
    },
    inject: ['self'],
    data() {
        return {
            searchData: "",
            cacheData: null,
            linkList: [{
                    name: "店铺首页",
                    path: "/pages/index/index",
                    param: {},
                    index: 0,
                    extend: false
                }, {
                    name: "全部商品",
                    path: "/pages/goods/list",
                    param: {},
                    index: 1,
                    extend: false
                },
                {
                    name: "单一商品",
                    path: "/pages/goods/detail",
                    param: {},
                    index: 2,
                    extend: true
                },
                {
                    name: "商品分类",
                    path: "/pages/goods/search-list",
                    param: {},
                    index: 3,
                    extend: true
                },
                {
                    name: "购物车",
                    path: "/pages/cart/index",
                    param: {},
                    index: 4,
                    extend: false
                },
                {
                    name: "个人中心",
                    path: "/pages/user/index",
                    param: {},
                    index: 5,
                    extend: false
                },
                {
                    name: "我的订单",
                    path: "/pages/order/index",
                    param: {},
                    index: 6,
                    extend: false
                },
                {
                    name: "微页面",
                    path: "/pages/page/index",
                    param: {},
                    index: 7,
                    extend: true
                },
                {
                    name: "所有分类",
                    path: "/pages/categories/index",
                    param: {},
                    index: 8,
                    extend: false
                }
            ]
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        searchData(value) {
            if (value == "") {
                this.linkList = JSON.parse(JSON.stringify(this.cacheData));
                this.self.selectData = null;
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.cacheData = JSON.parse(JSON.stringify(this.linkList));
    },
    methods: {
        hendleSearch(e) {
            let value = this.searchData;
            let simpleArr = this.linkList.filter((item, i) => {
                let str = ['', ...value, ''].join('.*'); //转化成正则格式的字符串
                let reg = new RegExp(str) //正则
                return reg.test(item.name) //去匹配待查询的字符串
            });
            this.linkList = simpleArr;
            for (let index in simpleArr) {
                let item = simpleArr[index];
                this.self.selectData = item;
                break;
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>