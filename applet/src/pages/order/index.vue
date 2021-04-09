<template>
    <view class="he-page-content">
        <he-tabs ref="tabs" :list="tabs" :bar-height="4" :tabs-style="{position: 'fixed', top: 0, width: '100%', zIndex: 1}" :bar-bottom="24" :active-color="themeColor" :bold="false" bg-color="#F5F5F5"
                 :height="114" :is-scroll="false" @change="change" :current="current"></he-tabs>
        <index-list v-model="list" :tab-cur="tabCur"></index-list>
        <view class="he-nothing"  v-show="isNothing">
            <image class="he-nothing__image" :src="ipAddress + '/order-background-empty.png'"></image>
            <view>暂无相关订单</view>
        </view>
        <he-load-more v-if="list.length > 0" :status="loadStatus"></he-load-more>
        <view class="safe-area-inset-bottom"></view>
    </view>
</template>

<script>
import indexNav from "./components/index-nav.vue";
import indexList from "./components/index-list.vue";
import heLoadMore from "@/components/he-load-more.vue";
import heTabs from "@/components/he-tabs.vue"
export default {
    name: "index",
    data() {
        return {
            tabCur: 'all',
            current: 0,
            page: {
                current: 1,
                size: 10,
                count: 1
            },
            list: [],
            isNothing: false,
            loadStatus: 'loadmore',
            loading: false,
            tabs: [{name: '全部', key: 'all'}, {name: '待付款', key: 'unpaid'}, {name: '待发货', key: 'unsent'}, {name: '待收货', key: 'unreceived'}, {name: '待评价', key: 'noevaluate'}]
        }
    },
    components: {
        indexNav,
        indexList,
        heLoadMore,heTabs
    },
    methods: {
        setTab: function(callBack) {
            let _this = this;
            this.page.current = 1;
            // this.list = [];
            this.isNothing = false;
            this.loading = true;
            this.loadStatus = "loadmore";
            this.getList().then(function(res) {
                _this.loading = false;
                _this.list = res;
                _this.isNothing = _this.list.length === 0;
                _this.loadStatus = _this.list.length < _this.page.size ? 'nomore' : 'loadmore';
                callBack();
            });
        },
        getList: function() {
            let _this = this;
            return new Promise(function (resolve) {
                _this.$heshop.order('get', {
                    tab_key: _this.tabCur
                }).page(_this.page.current, _this.page.size).then(function (res) {
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
                }).catch(function(err) {
                    console.error(err);
                    _this.$toError();
                });
            });
        },
        change: function(e) {
            let _this = this;
            _this.tabCur = _this.tabs[e].key;
            this.setTab(function() {
                _this.current = e;
            });
        }
    },
    onLoad(options) {
        this.tabCur = options.tabCur ? options.tabCur :'all';
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].key === this.tabCur) {
                this.current = i;
            }
        }
        let _this = this;
        this.getList().then(function(res) {
          _this.list = res;
          _this.isNothing = _this.list.length === 0;
          _this.loadStatus = _this.list.length < _this.page.size ? 'nomore' : 'loadmore';
        });
    },
    onShow() {
        let storageKey = this.$storageKey.evaluation_post;
        let storage = uni.getStorageSync(storageKey);
        if (storage) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].id === storage.id) {
                    this.list[i].status = 204;
                    if (this.tabCur === 'noevaluate' || this.tabCur === 'unreceived') {
                        this.$delete(this.list, i);
                        this.isNothing = this.list.length === 0;
                    }
                    uni.removeStorageSync(storageKey);
                    break;
                }
            }
        }
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
.he-page-content {
    overflow: hidden;
}
.he-nothing {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
}
.he-nothing__image {
    width: 320px;
    height: 320px;
}
</style>
