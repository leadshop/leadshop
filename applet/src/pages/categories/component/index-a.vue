<template>
    <view class="flex-sub">
        <view class="he-content">
           <image v-if="advertising" :src="advertising" class="he-advertising"></image>
           <index-goods-list :goods-show="goodsShow" :load-status="loadStatus" :is-nothing="isNothing" @scrollToLower="scrollToLower" :height="height" :list="goods"></index-goods-list>
        </view>
    </view>
</template>

<script>
import indexGoodsList from "./index-goods-list.vue";

export default {
    name: "index-A",
    components: {
        indexGoodsList
    },
    props: {
        group: Number,
        goodsShow: Number,
        goodsLoading: Boolean
    },
    data() {
        return {
            goods: [],
            advertising: '',
            isNothing: false,
            page: {
                current: 1,
                size: 10,
                count: 1
            },
            height: 104,
            loadStatus: 'loadmore'
        }
    },
    methods: {
        getGoodsList: function(group) {
            let _this = this;
            this.$emit('update:goodsLoading', true);
            return new Promise(function (resolve) {
                _this.$heshop.search('post', {
                    include: 'goods'
                }, {
                    keyword: {
                        group: group,
                        sort: {
                            sort: "DESC"
                        }
                    }
                }).page(_this.page.current, _this.page.size).then(function (res) {
                    let { data, headers } = res;
                    resolve(data);
                    _this.$emit('update:goodsLoading', false);
                    _this.page = {
                        current: +headers['x-pagination-current-page'] ? +headers['x-pagination-current-page'] : +headers['X-Pagination-Current-Page'],
                        count: +headers['x-pagination-page-count'] ? +headers['x-pagination-page-count'] : +headers['X-Pagination-Page-Count'],
                        size: +headers['x-pagination-per-page'] ? +headers['x-pagination-per-page']: +headers['X-Pagination-Per-Page']
                    }
                }).catch(function(err) {
                    console.error(err);
                    _this.$toError();
                });
            });
        },
        scrollToLower: function() {
            let _this = this;
            if (this.page.count > this.page.current) {
                this.loadStatus = 'loading';
                this.page.current ++;
                this.getGoodsList(this.group).then(function(res) {
                    if (_this.goodsShow !== 2) {
                        _this.goods = res;
                    } else {
                        _this.sliceArray(res);
                    }
                    _this.loadStatus = 'loadmore';
                });
            } else {
                this.loadStatus = 'nomore';
            }
        },
        sliceArray: function(array) {
            this.goods.push(array.splice(0, 3));
            if (array.length > 0) {
                this.sliceArray(array);
            }
        },
    },
    watch: {
        advertising: {
            handler(newVal) {
                this.height = newVal ? 304 : 104;
            }
        },
        group: {
            handler(v) {
                this.goods = [];
                this.page = {
                    current: 1,
                    size: 10,
                    count: 1
                }
                let _this = this;
                this.getGoodsList(this.group).then(function(res) {
                    if (_this.goodsShow !== 2) {
                        _this.goods = res;
                    } else {
                        _this.sliceArray(res);
                    }
                    _this.loadStatus = res.length < _this.page.size ? 'nomore' : 'loadmore';
                    _this.isNothing = _this.goods.length === 0;
                });
            },
            immediate: true
        }
    }
}
</script>

<style scoped>
.flex-sub {
    background: #FFFFFF;
}
.he-content {
    height: 100%;
}
.he-advertising {
    width: 530px;
    height: 180px;
    border-radius: 8px;
    display: block;
    margin: 0 20px 10px 20px;
}
</style>