<template>
    <view class="he-page-content">
        <view class="he-search">
            <view class="he-input flex align-center" @tap="navigateTo">
                <view class="iconfont iconsearchbar_search"></view>
                <text class="he-placeholder" v-if="!keyword.search">输入商品名称搜索</text>
                <text class="he-input__text" v-else>{{keyword.search}}</text>
            </view>
        </view>
        <list-sort @sort="setSort"></list-sort>
        <list-a :list="list" v-if="style == 0" @navigateTo="toDetail"></list-a>
        <list-b :list="list" v-else-if="style == 1" @navigateTo="toDetail"></list-b>
        <list-c :list="list" v-else-if="style == 2" @navigateTo="toDetail"></list-c>
        <list-d :list="list" v-else-if="style == 3" @navigateTo="toDetail"></list-d>
        <he-load-more v-if="list.length > 0" :status="loadStatus"></he-load-more>
        <view class="safe-area-inset-bottom"></view>
        <he-no-content-yet v-if="isNothing" text="暂未找到相关商品"></he-no-content-yet>
    </view>
</template>
<script>
import listSort from "./components/list-sort.vue";
import listA from "@/components/goods-list/list-A.vue";
import listB from "@/components/goods-list/list-B.vue";
import listC from "@/components/goods-list/list-C.vue";
import listD from "@/components/goods-list/list-D.vue";
import heNoContentYet from "@/components/he-no-content-yet.vue";
import heLoadMore from "@/components/he-load-more.vue";

export default {
    name: "search-list",
    data() {
        return {
            style: 0,
            list: [],
            page: {
                count: 1,
                size: 10,
                current: 1
            },
            keyword: {
                group: null,
                search: '',
                sort: {
                    sort: 'DESC'
                }
            },
            isNothing: false,
            loadStatus: 'loadmore'
        }
    },
    components: {
        listSort,
        listA,
        listB,
        listC,
        listD,
        heNoContentYet,
        heLoadMore
    },
    methods: {
        navigateTo: function() {
            let url = '/pages/goods/search?keyword=' + this.keyword.search + '&from=/pages/goods/search-list';
            uni.redirectTo({
                url: url
            });
        },
        getList: function() {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.$heshop.search('post', {
                    include: 'goods'
                }, {
                    keyword: _this.keyword
                }).page(_this.page.current, _this.page.size).then(function(res) {
                    let { data, headers } = res;
                    resolve(data);
                    // #ifdef MP-WEIXIN
                    _this.page = {
                        current: +headers['X-Pagination-Current-Page'],
                        count: +headers['X-Pagination-Page-Count'],
                        size: +headers['X-Pagination-Per-Page']
                    }
                    // #endif
                    // #ifdef H5
                    _this.page = {
                        current: +headers['x-pagination-current-page'],
                        count: +headers['x-pagination-page-count'],
                        size: +headers['x-pagination-per-page']
                    }
                    // #endif
                }).catch(err => {
                    reject(err);
                });
            });
        },
        setSort: function(e) {
            let style = this.style;
            let _this = this;
            this.list = [];
            this.keyword.sort = {
                [e.key]: e.value
            }
            this.page.current = 1;
            this.loadStatus = "loadmore";
            this.getList().then(function(res) {
                _this.style = -1;
                _this.list = res;
                setTimeout(function() {
                    _this.style = style;
                });
                _this.loadStatus = _this.list.length < _this.page.size ? 'nomore' : 'loadmore';
            });
        },
        toDetail: function(item) {
            uni.navigateTo({ url: '/pages/goods/detail?id=' + item.id });
        }
    },
    onLoad(options) {
        this.keyword.group = options.group ? options.group : null;
        this.style = options.goods_show ? options.goods_show : 3;
        uni.setNavigationBarTitle({
            title: options.name ? options.name : '全部商品'
        })
    },
    onShow() {
        let _this = this;
        let search_key = this.getStorageSync('search_key');
        if (search_key) {
            this.keyword.search = search_key;
            uni.removeStorageSync('search_key');
        }
        this.getList().then(function(res) {
            _this.list = res;
            _this.isNothing = _this.list.length === 0;
            _this.loadStatus = _this.list.length < _this.page.size ? 'nomore' : 'loadmore';
        });
    },
    onReachBottom() {
        let _this = this;
        if (this.page.count > this.page.current) {
            this.page.current++;
            this.loadStatus = "loading";
            this.getList().then(function(res) {
                _this.list.push(...res);
                _this.loadStatus = "loadmore";
            });
        } else {
            this.loadStatus = "nomore";
        }
    }
}
</script>
<style scoped>
.he-search {
    width: 100%;
    padding: 24px 30px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: #FFFFFF;
}

.he-input {
    background: #F7F7F7;
    border-radius: 32px;
    height: 64px;
    line-height: 64px;
}

.he-placeholder {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 32px;
}

.iconsearchbar_search {
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 32px;
    margin: 0 16px 0 32px;
    color: RGBA(157, 157, 157, 1);
}

.he-page-content {
    padding-bottom: 40px;
}

.he-input__text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    overflow: hidden;
    height: 64px;
}
</style>