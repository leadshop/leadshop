<template>
    <view class="he-page-content" :class="isLoading ? 'flex justify-center align-center' : ''">
        <detail-skeleton v-if="isLoading"></detail-skeleton>
        <template v-else-if="!isLoading && !emptyStatus">
            <detail-banner :video="detail.video" :is-video="detail.is_video" :video-cover="detail.video_cover" :list="detail.slideshow" :goods-id="detail.id"></detail-banner>
            <detail-basic-information
                :name="detail.name"
                :price="detail.price"
                :unit="detail.unit"
                :sales="detail.sales"
                :goods="detail"
                :goods-id="detail.id"
                :virtual_sales="detail.virtual_sales"
                :line-price="detail.line_price"></detail-basic-information>
            <detail-parameter
                :unit="detail.unit"
                :package="detail.package"
                @shopping="shopping"
                :select="select"
                :goods-id="detail.id"
                :services="detail.services">
            </detail-parameter>
            <detail-evaluation :goods-id="detail.id"></detail-evaluation>
            <detail-rich :content="detail.body.content"></detail-rich>
            <he-products-featured v-if="goodsSetting.recommend_showpage.goodsinfo.value"></he-products-featured>
            <detail-bottom-button
                :slide-show="detail.slideshow"
                :name="detail.name"
                :stocks="detail.stocks"
                :shopping-type.sync="shoppingType"
                v-model="isShopping"></detail-bottom-button>
            <he-cart
                :show.sync="isShopping"
                :shopping-type="shoppingType"
                @setSelect="setSelect"
                :goods="detail"></he-cart>
            <view class="safe-area-inset-bottom">
            <view class="he-bottom-height"></view>
            </view>
        </template>
        <template v-else-if="emptyStatus">
            <he-no-content-yet :text="emptyText" :image="ipAddress + '/goods-background-empty.png'"></he-no-content-yet>
            <he-products-featured ></he-products-featured>
        </template>
</view>
</template>

<script>
import detailBanner from "./components/detail-banner.vue";
import detailBasicInformation from "./components/detail-basic-information.vue";
import detailParameter from "./components/detail-parameter.vue";
import detailEvaluation from "./components/detail-evaluation.vue";
import detailRich from "./components/detail-rich.vue";
import detailBottomButton from "./components/detail-bottom-button.vue";
import detailSkeleton from "./components/detail-skeleton.vue";
import heProductsFeatured from "../../components/he-products-featured.vue";
import heCart from "@/components/he-cart.vue";
import heNoContentYet from "@/components/he-no-content-yet.vue";
import {mapGetters} from "vuex";

export default {
    name: "detail",
    components: {
        detailBanner,
        detailBasicInformation,
        detailParameter,
        detailEvaluation,
        detailRich,
        detailBottomButton,
        detailSkeleton,
        heProductsFeatured,
        heCart,
        heNoContentYet,
    },
    computed: {
        ...mapGetters("setting", {
            address: "getLocation",
            goodsSetting: 'goodsSetting'
        }),
        emptyText: function () {
            if (this.emptyStatus === 1) {
                return "商品不存在";
            } else if (this.emptyStatus === 2) {
                return "商品已下架";
            }
        },
        shareData: function() {
            return {
                title: this.detail.name,
                path: '/pages/goods/detail?id=' + this.detail.id,
                // #ifndef H5
                imageUrl: this.detail.slideshow[0],
                // #endif
                // #ifdef H5
                imgUrl: this.detail.slideshow[0],
                // #endif
            }
        }
    },
    data() {
        return {
            detail: {
                slideshow: []
            },
            isLoading: true,
            isShopping: false,
            select: null,
            shoppingType: 'cart',
            emptyStatus: null
        }
    },
    methods: {
        getDetail: function getDetail(id, callback) {
            let _this = this;
            _this.$heshop.goods('get', id).then(function(res) {
                if (!res.hasOwnProperty('empty_status')) {
                    _this.detail = res;
                } else {
                    _this.emptyStatus = res.empty_status;
                    uni.setNavigationBarTitle({
                        title: _this.emptyText
                    });
                }
                _this.isLoading = false;
                callback();
            }).catch(err => {
                console.error(err);
                this.$toError();
            });
        },
        shopping: function() {
            this.isShopping = true;
            this.shoppingType = '';
        },
        setSelect: function(select) {
            this.select = select;
        }
    },
    onLoad(options) {
        // #ifdef MP-WEIXIN
        uni.showShareMenu({
            withShareTicket: true
        });
        // #endif
        let id = 0;
        if (options.scene) {
            id = parseInt(decodeURIComponent(options.scene).split('=')[1]);
        } else {
            id = parseInt(options.id)
        }
        let _this = this;
        this.getDetail(id, function() {
            // #ifdef H5
            _this.$wechat.onMenuShareAppMessage(_this.shareData);
            // #endif
        });
    },
    // #ifndef H5
    onShareAppMessage() {
        return this.$shareAppMessage(this.shareData);
    }
    // #endif
}
</script>

<style scoped>
.he-bottom-height {
    height: 115px;
}
.he-page-content {
    overflow: hidden;
}
</style>
