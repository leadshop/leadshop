<template>
    <view class="he-page-content">
        <view class="he-top">
            <view class="he-title">商品评价({{tabCount.all}})</view>
            <view class="flex flex-wrap" :data-theme="theme">
                <view class="he-tab__item" @click="setTab(item.key)" v-for="(item, index) in tabs" :class="tabKey === item.key ? 'he-tab__item-1' : 'he-tab__item-0'" :key="index">{{item.name}}({{tabCount[item.key] | setCount}})</view>
            </view>
        </view>
        <view class="he-bottom">
            <view class="he-item" v-for="item in list" :key="item.id">
                <view class="he-item__header flex align-center justify-between">
                    <view class="flex align-center">
                        <!--#ifndef H5-->
                        <image class="he-item__avatar" :src="item.user.avatar" :lazy-load="true"></image>
                        <!--#endif-->
                        <!--#ifdef H5-->
                        <img class="he-item__avatar" v-lazy="item.user.avatar">
                        <!--#endif-->
                        <text class="he-item__name">{{item.user.nickname}}</text>
                    </view>
                    <view class="he-item__stars flex">
                        <text v-for="num in 5" :key="num" class="iconfont iconevaluate_star" :class="item.star >= num ? 'he-star__1' : 'he-star__0'"></text>
                    </view>
                </view>
                <view class="he-item__body">
                    <view class="he-item__content">{{item.content}}</view>
                    <view class="he-item__attr">{{item.goods_param}}</view>
                    <view class="he-item__pictures flex flex-wrap" v-if="!$h.test.isEmpty(item.images)">
                        <he-image :height="210" :width="210" mode="aspectFill" class="he-item__img" :image-style="{
                            borderRadius: '8rpx'}" @click="doPreviewImage(img, item.images)" v-for="(img, imgIndex) in item.images" :key="imgIndex"  :src="img"></he-image>
                    </view>
                    <view class="he-item__time">{{$h.timeFormat(item.deleted_time)}}</view>
                </view>
                <view class="he-item__footer" v-if="item.reply">
                    <text>商家：</text>
                    <text class="he-item__reply">{{item.reply}}</text>
                </view>
            </view>
        </view>
        <view class="he-no-more" v-if="isLoading">加载中...</view>
        <view class="he-no-more" v-if="isNoMore">没有更多评价了</view>
        <he-no-content-yet v-if="isNothing" text="暂无评价" :image="ipAddress + '/evaluation-background-empty.png'"></he-no-content-yet>
    </view>
</template>

<script>
import heNoContentYet from "../../components/he-no-content-yet.vue";

export default {
    name: "evaluation",
    components: {
        heNoContentYet
    },
    data() {
        return {
            tabs: [{key: 'all', name: '全部'}, {key: 'image', name: '有图'}, {key: 'good', name: '好评'}, {key: 'general', name: '中评'}, {key: 'bad', name: '差评'}],
            list: [],
            tabKey: 'all',
            goodsId: null,
            isNothing: false,
            isLoading: false,
            isNoMore: false,
            tabCount: {
                all: 0,
                good: 0,
                image: 0,
                general: 0,
                bad: 0
            },
            page: {
                current: 1,
                count: 1,
                size: 10
            },
        }
    },
    methods: {
        // 切换状态
        setTab: function(active) {
            // 禁止双击
            if (this.tabKey === active) return;
            let _this = this;
            this.tabKey = active;
            this.isNoMore = false;
            this.page.current = 1;
            this.getList().then(function(res) {
                _this.list = res;
                _this.isNothing = _this.list.length === 0;
            });
        },
        getList: function() {
            let _this = this;
            return new Promise(function (resolve, reject) {
                _this.$heshop.evaluate('get', {
                    goods_id: _this.goodsId,
                    tab_key: _this.tabKey
                }).page(_this.page.current, _this.page.size).then(function(res) {
                    let data = res.data,
                        headers = res.headers;
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
                    resolve(data);
                }).catch(err => {
                    this.$toError();
                    reject(err);
                });
            });
        },
        getTabCount: function() {
            let _this = this;
            return new Promise(function(resolve, reject) {
                _this.$heshop.tabcount('post', {
                    include: 'orderevaluate'
                }, {
                    goods_id: _this.goodsId
                }).then(function(res) {
                    resolve(res);
                }).catch(function (err){
                    this.$toError();
                    reject(err);
                });
            });
        },
        doPreviewImage(img, images) {
            this.$utils.doPreviewImage(img, images);
        }
    },
    onLoad(options) {
        let id = options.id ? parseInt(options.id) : null;
        this.goodsId = id;
        if (id) {
            let _this = this;
            Promise.all([this.getList(), this.getTabCount()]).then(function(res){
                _this.list = res[0];
                _this.tabCount = res[1];
                _this.isNothing = _this.list.length === 0;
            }).catch(function(err) {
                console.error(err);
            });
        } else {
            this.$toError();
        }
    },
    onReachBottom() {
        let _this = this;
        this.isLoading = true;
        if (this.page.count > this.page.current) {
            this.page.current++;
            this.getList().then(function(res) {
                _this.list.push(...res);
                _this.isLoading = false;
            });
        } else {
            this.isLoading = false;
            this.isNoMore = true;
        }
    },
    filters: {
        setCount: function(count) {
            return count > 999 ? '999+' : count;
        }
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    padding: 0 20px 20px 20px;
    overflow: hidden;
}
.he-top {
    width: 710px;
    height: 241px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 24px;
    margin-top: 20px;
}
.he-tab__item {
    border-style: solid;
    border-width: 1px;
    border-radius: 28px;
    padding: 0 20px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    margin:0 16px 16px 0;
    height: 56px;
    line-height: 54px;
}
.he-tab__item-0 {
    color: #222222;
    border-color: #D9D9D9;
    background-color: #FFFFFF;
}
.he-tab__item-1 {
    @include font_color("font_color");
    @include border_color("border_color");
    @include background_color("opacify_background_0");
}
.he-title {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    line-height: 36px;
    margin-bottom: 24px;
}
.he-item {
    padding: 32px 24px;
    background: #FFFFFF;
    border-radius: 16px;
    margin-top: 20px;
}
.he-item:last-child {
    margin-bottom:20px;
}
.he-item__avatar {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    border-radius: 50%;
}
.he-item__name {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.iconevaluate_star {
    width: 20px;
    height: 20px;
    font-size: 20px;
}
.iconevaluate_star:not(:first-child) {
    margin-left: 8px;
}
.he-star__0 {
    color: rgba(229, 229, 229, 1);
}
.he-star__1 {
    color: rgba(255, 199, 28, 1);
}
.he-item__body {
    margin-top: 23px;
}
.he-item__content {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
}
.he-item__attr {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
    margin: 20px 0 16px 0;
    display: inline-block;
}
.he-item__pictures {
    margin-top: 4px;
}
.he-item__img {
    margin: 0 16px 16px 0;
}
.he-item__img:nth-child(3) {
    margin-right: 0;
}
.he-item__img:nth-child(6) {
    margin-right: 0;
}
.he-item__time {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: 4px;
}
.he-item__footer {
    width: 662px;
    background: #F7F7F7;
    border-radius: 16px;
    padding: 25px;
    margin-top: 20px;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-item__reply {
    opacity: 0.65;
}
.he-no-more {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
    text-align: center;
    margin-top: 40px;
}
</style>
