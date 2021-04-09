<template>
    <view class="he-page-content">
        <view class="he-search flex align-center">
            <view class="he-search__input flex align-center">
                <view class="he-search__icon iconfont iconsearchbar_search"></view>
                <input v-model.trim="keyword" type="text" focus
                       class="flex-sub"
                       confirm-type="search"
                       @confirm="search"
                       placeholder-class="he-placeholder" :maxlength="40"
                       placeholder="输入商品名称搜索"/>
            </view>
            <text class="flex-sub he-search__text" @tap="search">搜索</text>
        </view>
        <view class="he-history" v-if="!$h.test.isEmpty(keywordList)">
            <view class="he-header flex justify-between align-center">
                <view class="he-title">历史搜索</view>
                <view class="he-clear">
                    <view class="iconfont iconsearch_empty" @tap="emptyList"></view>
                </view>
            </view>
            <view class="he-body flex flex-wrap">
                <text class="he-item" @tap="setKeyword(item)" v-for="(item, index) in keywordList" :key="index">{{item}}</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: "search",
    data() {
        return {
            keyword: '',
            keywordList: [],
            fromStr: ''
        }
    },
    onLoad(options) {
        this.keyword = options.keyword;
        this.fromStr = options.from;
        this.keywordList = this.getStorageSync('keyword_list') ? this.getStorageSync('keyword_list') : [];
    },
    methods: {
        search: function() {
            if (!this.$h.test.isEmpty(this.keyword)) {
                uni.setStorageSync('search_key', this.keyword);
                let list = this.getStorageSync('keyword_list');
                list = list ? list : [];
                list.unshift(this.keyword);
                list = list.filter(function (ele, index, array) {
                    return array.indexOf(ele) === index;
                });
                uni.setStorageSync('keyword_list', list);
                uni.redirectTo({
                    url: '/pages/goods/search-list'
                });
            }
        },
        setKeyword: function(item) {
            this.keyword = item;
            uni.setStorageSync('search_key', item);
            uni.redirectTo({
                url: '/pages/goods/search-list'
            });
        },
        emptyList: function() {
            uni.removeStorageSync('keyword_list');
            this.keywordList = [];
        }
    }
}
</script>

<style scoped>
.he-page-content {
    background: #FFFFFF;
}
.he-search {
    width: 750px;
    height: 112px;
    padding: 24px 8px 24px 32px;
}
.he-search__input {
    width: 609px;
    height: 64px;
    background: #F7F7F7;
    border-radius: 32px;
    padding: 0 32px;
}
.he-search__text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    height: 64px;
    line-height: 64px;
    text-align: center;
}
.he-search__icon {
    width: 28px;
    height: 28px;
    font-size: 28px;
    color: RGBA(153, 153, 153, 1);
    margin-right: 16px;
}
/deep/.he-placeholder {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
}
.he-history {
    min-height: calc(100vh - 112px);
    padding-top: 19px;
}
.iconsearch_empty {
    font-size: 36px;
    color: #CBCBCB;
    width: 36px;
    height: 36px;
}
.he-clear {
    height: 56px;
    padding: 10px;
    margin-right: 20px;
}
.he-header {
    height: 56px;
}
.he-header .he-title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #555555;
    margin-left: 32px;
}
.he-body {
    padding: 10px 32px 0 32px;
}
.he-body .he-item {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    padding:16px 24px;
    background: #F7F7F7;
    border-radius: 32px;
    margin: 0 16px 16px 0;
}
</style>
