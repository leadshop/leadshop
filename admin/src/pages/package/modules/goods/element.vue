<template>
    <div class="goods">
        <div class="goods-layout" :style="{
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
            <div class="goods-wrapper" :class="{
                        white:facade.card_style==1,
                        card:facade.card_style==2,
                        stroke:facade.card_style==3,
                        lucency:facade.card_style==4,
                        chamfer:facade.chamfer_style
            }" v-for="item,index in goodsData" :key="index">
                <div class="goods-item" :style="{
                margin: facade.margin/2 + 'px' ,
            }">
                    <div class="goods-item-photo">
                        <div class="goods-item-image">
                            <div class="goods-item-cover">
                                <el-image style="width: 100%; height: 100%" :src="getGoodsCover(item.slideshow)" fit="cover"></el-image>
                            </div>
                        </div>
                    </div>
                    <div class="goods-item-detail" v-if="is_hide">
                        <div class="goods-item-title" v-if="content.is_title">
                            {{item.name}}
                        </div>
                        <div class="goods-item-info">
                            <div class="goods-item-price">
                                <div v-if="content.is_price">
                                    <span class="goods-item-price__tag">¥</span><span class="goods-item-price__val">{{item.price}}</span>
                                </div>
                            </div>
                            <div class="goods-item-button" v-if="content.is_button">
                                <i class="le-icon le-icon-nav_shoppingcart_normal"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
        </div>
    </div>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
export default {
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            goods: [{
                id: 1,
                name: "商品名称",
                cover: "cover",
                price: 999
            }, {
                id: 1,
                name: "商品名称",
                cover: "cover",
                price: 999
            }, {
                id: 1,
                name: "商品名称",
                cover: "cover",
                price: 999
            }, {
                id: 1,
                name: "商品名称",
                cover: "cover",
                price: 999
            }, {
                id: 1,
                name: "商品名称",
                cover: "cover",
                price: 999
            }],
            goodsData: []
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
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
        handleCheck() {
            if (this.content.type == 1 && this.content.goods && this.content.goods.length > 0) {
                this.goodsData = this.content.goods;
            } else if (this.content.type == 2) {
                this.handleGroupList(this.content.group);
                this.goodsData = this.goods
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
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>