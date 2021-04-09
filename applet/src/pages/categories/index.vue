<template>
    <view class="he-page-content flex" scroll-y>
        <scroll-view class="index-scroll" :scroll-top="scrollTop" scroll-with-animation scroll-y :data-theme="theme">
            <view class="he-item flex align-center " @click="setSelect(index)" :class="current === index ? 'he-item__1' : ''" v-for="(item, index) in list" :key="item.id">
                <text class="he-item__text">{{item.name}}</text>
            </view>
        </scroll-view>
        <view class="flex-sub">
            <view class="index-small-search">
                <view class="he-input flex align-center" @click="navigateTo">
                    <text class="iconfont iconsearchbar_search"></text>
                    <text class="he-placeholder">输入商品名称搜索</text>
                </view>
            </view>
            <index-a :group="item.id" :goods-show="item.goods_show" v-if="item.type === 1" :goods-loading.sync="goodsLoading"></index-a>
            <index-b :list="item.children" v-else-if="item.type === 2"></index-b>
            <index-c :list="item.children" v-else-if="item.type === 3"></index-c>
        </view>
    </view>
</template>
<script>
import indexA from "./component/index-a.vue";
import indexB from "./component/index-b.vue";
import indexC from "./component/index-c.vue";

export default {
    name: "index",
    components: {
        indexA,
        indexB,
        indexC,
    },
    data() {
        return {
            list: [],
            current: 0,
            scrollTop: 0,
            menuHeight: 0, // 左边菜单的高度
            menuItemHeight: 0, // 左边菜单item的高度
            page: {
                current: 1,
                size: 10
            },
            item: {
                goods_show: null
            },
            goodsLoading: false
        }
    },
    methods: {
        async setSelect(index) {
            if (index == this.current || this.goodsLoading) return;
            this.current = index;
            // 如果为0，意味着尚未初始化
            if (this.menuHeight == 0 || this.menuItemHeight == 0) {
                await this.getElRect('index-scroll', 'menuHeight');
                await this.getElRect('he-item', 'menuItemHeight');
            }
            // 将菜单菜单活动item垂直居中
            this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;
        },
        // 获取一个目标元素的高度
        getElRect(elClass, dataVal) {
            new Promise((resolve, reject) => {
                const query = uni.createSelectorQuery().in(this);
                query.select('.' + elClass).fields({ size: true }, res => {
                    // 如果节点尚未生成，res值为null，循环调用执行
                    if (!res) {
                        setTimeout(() => {
                            this.getElRect(elClass);
                        }, 10);
                        return;
                    }
                    this[dataVal] = res.height;
                }).exec();
            })
        },
        getCatList: function() {
            let _this = this;
            this.$heshop.group('get', {
                merchant_id: 1,
                include: 'goods',
                type: 'all'
            }).then(function(res) {
                _this.list = _this.$heshop.toTree({
                    parentKey: 'parent_id',
                    idKey: 'id',
                    parentId: 0,
                    childrenKey: 'children'
                }).on(res).get();
                _this.item = _this.list[_this.current];
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        navigateTo: function() {
            uni.navigateTo({ url: '/pages/goods/search' });
        }
    },
    onLoad() {
        this.getCatList();
    },
    watch: {
        current: {
            handler(newVal) {
                this.item = this.list[newVal];
            }
        }
    }
}
</script>
<style scoped lang="scss">
.he-page-content {
    background: #FFFFFF;
    height: 100vh;
}

.index-scroll {
    width: 180px;
    height: 100vh;
    background: #F5F5F5;
}

.he-item {
    width: 180px;
    height: 88px;
}

.he-item__1 {
    background: #FFFFFF;
}

.he-item__1 .he-item__text {
    @include font_color('font_color');
    @include border_color('border_color');
    border-left-style: solid;
    border-left-width: 4px;
}

.he-item__text {
    display: inline-block;
    width: 100%;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    color: #666666;
    border-left: 4px solid transparent;
}

.index-small-search {
    width: 570px;
    height: 104px;
    background: #FFFFFF;
    overflow: hidden;
}

.he-input {
    width: 529px;
    height: 64px;
    background: #F7F7F7;
    border-radius: 32px;
    margin: 20px;
}

.iconsearchbar_search {
    font-size: 28px;
    color: #999999;
    margin-right: 16px;
    margin-left: 32px;
}

.he-placeholder {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
}
</style>