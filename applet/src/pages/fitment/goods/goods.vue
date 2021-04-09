<template>
    <view class="goods" :data-theme="theme">
        <view class="goods-layout" :style="{
                paddingLeft: facade.padding + 'px' ,
                paddingRight:facade.padding + 'px' ,
                marginLeft: -facade.margin/2 + 'px' ,
                marginRight:-facade.margin/2 + 'px' ,
            }" :class="{
                        larger:facade.list_style==1,
                        small:facade.list_style==2,
                        list:facade.list_style==3,
                        swipe:facade.list_style==4
            }">
            <view class="goods-wrapper" :class="{
                        white:facade.card_style==1,
                        card:facade.card_style==2,
                        stroke:facade.card_style==3,
                        lucency:facade.card_style==4,
                        chamfer:facade.chamfer_style
            }" v-for="(item,index) in goodsData" :key="index">
                <view class="goods-item" :style="{
                margin: facade.margin/2 + 'px' ,
            }" @click="navigateToDetail(item.id)">
                    <view class="goods-item-photo">
                        <view class="goods-item-image">
                            <view class="goods-item-cover">
                                <image lazy-load style="width: 100%; height: 100%" :src="getGoodsCover(item.slideshow)" :mode="mode"></image>
                            </view>
                        </view>
                    </view>
                    <view class="goods-item-detail" v-if="is_hide">
                        <view class="goods-item-title" v-if="content.is_title">
                            {{item.name}}
                        </view>
                        <view class="goods-item-info">
                            <view class="goods-item-price">
                                <view v-if="content.is_price">
                                    <span class="goods-item-price__tag">¥</span><span class="goods-item-price__val">{{item.price}}</span>
                                </view>
                            </view>
                            <view class="goods-item-button" @click.stop="cart(item)" v-if="content.is_button">
                                <text class="iconfont iconbtn_addtocart"></text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="clear"></view>
        </view>
        <he-index-cart :goods-id.sync="goodsId"></he-index-cart>
    </view>
</template>
<script type="text/javascript">
import heIndexCart from "../../../components/he-index-cart.vue";
export default {
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    },
    components: {
        heIndexCart
    },
    data() {
        return {
            goods: [],
            goodsData: [],
            goodsId: null
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        mode() {
            if (this.facade.list_style === 1) {
                return "center"
            } else {
                return "aspectFill"
            }
        },
        is_hide() {
            if (this.facade.list_style !== 3) {
                if (!this.content.is_title && !this.content.is_price && !this.content.is_button) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        content: {
            deep: true,
            handler: function(newV, oldV) {
                this.handleCheck();
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.handleCheck();
    },
    methods: {
        /**
         * 导航详情
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        navigateToDetail(id) {
            uni.navigateTo({
                url: '/pages/goods/detail?id=' + id
            });
        },
        handleCheck() {
            if (this.content.type == 1 && this.content.goods && this.content.goods.length > 0) {
                this.goodsData = this.content.goods;
                this.handleGoodsList(this.content.goods);
            } else if (this.content.type == 2) {
                this.goodsData = this.goods
                this.handleGroupList(this.content.group);
            } else {
                this.goodsData = this.goods
            }
        },
        /**
         * 获取封面信息
         * @param  {[type]} cover [description]
         * @return {[type]}       [description]
         */
        getGoodsCover(cover) {
            if (cover) {
                if (Object.prototype.toString.call(cover) == '[object Array]') {
                    return cover[0];
                }
            }
            return "http://qmxq.oss-cn-hangzhou.aliyuncs.com/le-default-goods-bg.png";
        },
        /**
         * 加载数据信息
         * @return {[type]} [description]
         */
        handleGoodsList(data) {
            let _array = [];
            data.map(item => {
                _array.push(item.id);
            })
            if (_array.length > 0) {
                this.$heshop.goods("GET", { behavior: 'fitment', goods_id: _array.toString() }).then(data => {
                    if (data.length > 0) {
                        this.goodsData = data;
                    }
                }).catch(error => {
                    console.error("获取错误信息", error)
                })
            }
        },
        /**
         * 加载数据信息
         * @return {[type]} [description]
         */
        handleGroupList({ id, limit }) {
            if (id) {
                this.$heshop.search("POST", { include: 'goods' }, { keyword: { group: id, tab_key: 'onsale' } }).page(1, limit).then(data => {
                    if (data.data.length > 0) {
                        this.goodsData = data.data;
                    } else {
                        this.goodsData = this.goods
                    }
                }).catch(error => {
                    console.error("获取错误信息", error)
                })
            }
        },
        cart: function(item) {
            this.goodsId = item.id
        }
    }
};
</script>
<style lang="scss" scoped>
@import './element.less';

.goods-item-price,
.iconfont {
    @include font_color('font_color');
}
</style>