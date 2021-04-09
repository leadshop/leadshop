<template>
    <view>
        <view class="list-B flex justify-between" :data-theme="theme">
            <view class="he-column" id="u-left-column">
                <view class="he-item" v-for="(item) in leftList"  :key="item.id" @tap="navigateTo(item)">
                    <he-image :height="347" :width="347" :src="item.slideshow[0]"></he-image>
                    <view class="he-item__name he-line-2">{{item.name}}</view>
                    <view class="he-item__footer flex justify-between align-center">
                        <text class="he-item__price">{{item.price}}</text>
                        <view class="he-cart"  @click.stop="shopping(item)">
                            <text class="iconfont iconbtn_addtocart"></text>
                        </view>
                    </view>
                </view>
            </view>
            <view class="he-column" id="u-right-column">
                <view class="he-item" v-for="(item, index) in rightList" :key="index" @tap="navigateTo(item)">
                    <he-image :height="347" :width="347" :src="item.slideshow[0]"></he-image>
                    <view class="he-item__name he-line-2">{{item.name}}</view>
                    <view class="he-item__footer flex justify-between align-center">
                        <text class="he-item__price">{{item.price}}</text>
                        <view class="he-cart" @click.stop="shopping(item)">
                            <text class="iconfont iconbtn_addtocart"></text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <he-cart :show.sync="isShopping" :goods="goods" shopping-type="cart"></he-cart>
    </view>
</template>

<script>
import heCart from "../../components/he-cart.vue";
import heImage from "../../components/he-image.vue";
export default {
    name: "list-B",
    components: {
        heCart,heImage
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            leftList: [],
            rightList: [],
            tempList: [],
            isShopping: false,
            goods: {},
            select: {}
        }
    },
    computed: {
        // 破坏flowList变量的引用，否则watch的结果新旧值是一样的
        copyFlowList() {
            return this.cloneData(this.list);
        }
    },
    mounted() {
        this.tempList = this.cloneData(this.copyFlowList);
        this.splitData();
    },
    methods: {
        cloneData(data) {
            return JSON.parse(JSON.stringify(data));
        },
        async splitData() {
            if (!this.tempList.length) return;
            let leftRect = await this.$hGetRect('#u-left-column');
            let rightRect = await this.$hGetRect('#u-right-column');
            let item = this.tempList[0];
            if(!item) return;
            if (leftRect.height < rightRect.height) {
                this.leftList.push(item);
            } else if (leftRect.height > rightRect.height) {
                this.rightList.push(item);
            } else {
                if (this.leftList.length <= this.rightList.length) {
                    this.leftList.push(item);
                } else {
                    this.rightList.push(item);
                }
            }
            this.tempList.splice(0, 1);
            if (this.tempList.length) {
                this.splitData();
            }
        },
        navigateTo: function(item) {
            this.$emit('navigateTo', item);
        },
        shopping: function(item) {
            this.select = {};
            let _this = this;
            this.$heshop.goods('get', item.id, {
                type: 'param'
            }).then(function(res) {
                _this.goods = Object.assign(item, res);
                _this.isShopping = true;
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        }
    },
    watch: {
        copyFlowList(nVal, oVal) {
            let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
            this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
            this.splitData();
        }
    },
}
</script>

<style scoped lang="scss">
.list-B {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding: 17px 20px 0 20px;
}
.he-column {
    width: 347px;
    height: auto;
}
.he-item {
    width: 347px;
    background: #FFFFFF;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 13px;
    position: relative;
}
.he-item__name {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #353535;
    line-height: 1.3;
    padding: 19px 26px 0 26px;
    margin-bottom: 8px;
}
.he-cart {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 0;
    right: 0;
}
.iconbtn_addtocart {
    font-size: 36px;
    position: absolute;
    bottom: 15px;
    right: 24px;
    @include font_color('font_color');
}
.he-item__footer {
    padding: 0 18px 0 26px;
    margin-bottom: 12px;
}
.he-item__price {
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    @include font_color('font_color');
    line-height: 1.8;
}
.he-item__price:before {
    content: "￥";
    font-size: 24px;
}
.he-img__box {
    width: 347px;
    height: 347px;
    position: relative;
    background: #ECEDF1;
}
.iconimago_defaultproduct {
    width: 120px;
    height: 120px;
    font-size: 120px;
    position: absolute;
    top:50%;
    left:50%;
    color: #DFE0E6;
    transform: translate(-50%, -50%);
}
</style>
