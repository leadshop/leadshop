<template>
    <el-row>
        <el-col :span="24" class="el-row--flex is-justify-center">
            <div class="he-goodsPreview">
                <div class="he-goodsPreview__zoom">
                    <div class="he-goodsPreview__content">
                        <div class="he-goodsPreview__banner">
                            <el-carousel @change="change" trigger="click" height="750px" indicator-position="none">
                                <el-carousel-item v-for="(item, index) in form.slideshow" :key="index">
                                    <img :src="item" alt="" class="he-goodsPreview__banner-img">
                                </el-carousel-item>
                            </el-carousel>
                            <div class="he-goodsPreview__indicators">
                                {{ initialIndex + 1 }}/{{ form.slideshow.length }}
                            </div>
                        </div>
                        <div class="he-goodsPreview__name he-goodsPreview__item">
                            <div>
                                <span class="price">{{ form.price }}</span>
                                <span class="origin-price">￥{{ form.line_price }}</span>
                                <span class="sale">已售{{ form.sales }}{{ form.unit }}</span>
                            </div>
                            <div class="el-row--flex is-justify-space-between">
                                <div class="he-goodsPreview__title">
                                    {{ form.name }}
                                </div>
                                <div class="he-goodsPreview__share">
                                    <he-icon type="le-icon-fenxiang"></he-icon>
                                    <div>分享</div>
                                </div>
                            </div>
                        </div>
                        <div class="he-goodsPreview__item he-goodsPreview__parameter">
                            <div class="el-row--flex is-justify-space-between is-align-middle">
                                <div class="el-row--flex is-align-middle">
                                    <div class="label">规格</div>
                                    <div class="content">请选择</div>
                                </div>
                                <he-icon class="arrow" type="le-icon-arrow-right"></he-icon>
                            </div>
                            <div class="el-row--flex is-justify-space-between is-align-middle">
                                <div class="el-row--flex is-align-middle">
                                    <div class="label">运费</div>
                                    <div class="content">送至北京东区 ￥12.00</div>
                                </div>
                                <he-icon class="arrow" type="le-icon-arrow-right"></he-icon>
                            </div>
                            <div class="el-row--flex is-justify-space-between is-align-middle">
                                <div class="el-row--flex is-align-middle">
                                    <div class="label">包邮</div>
                                    <div class="content">满￥99部分地区包邮</div>
                                </div>
                                <he-icon class="arrow" type="le-icon-arrow-right"></he-icon>
                            </div>
                        </div>
                        <div class="he-goodsPreview__item he-goodsPreview__evaluation">
                            <div
                                class="he-goodsPreview__evaluation-header el-row--flex is-justify-space-between is-align-middle">
                                <div class="he-title el-row--flex is-align-middle">
                                    <div class="he-title__sign"></div>
                                    <div>评价</div>
                                    <div>（6523）</div>
                                </div>
                                <div class="el-row--flex is-align-middle he-more">
                                    <div class="he-more__top">查看全部</div>
                                    <he-icon class="arrow" type="le-icon-arrow-right"></he-icon>
                                </div>
                            </div>
                            <div class="el-row--flex he-header is-justify-space-between is-align-middle">
                                <div class="el-row--flex is-align-middle">
                                    <img class="he-header__avatar" src="../image/default-avatar.png"/>
                                    <div class="he-header__name">中国人</div>
                                </div>
                                <div class="he-header__star el-row--flex">
                                    <he-icon class="he-header__star-item" type="le-icon-star" v-for="(item, index) in 5"
                                             :key="index"></he-icon>
                                </div>
                            </div>
                            <div class="he-header__body">
                                手感还不错，聚酯纤维的， 类似雪纺的手感，线头较多，颜色偏暗，长度没有模特那么长，膝盖下面一点，总体比较满意， 如果外面的白纱稍微有点质感会更好，现在有点轻飘飘的，不挺
                            </div>
                            <div class="he-header__footer">
                            </div>
                        </div>
                        <div class="he-detail">
                            <div class="he-detail__title"> - 商品详情 -</div>
                            <div class="he-detail__body" v-html="form.body.content"></div>
                        </div>
                    </div>
                    <div class="he-goodsPreview__footer el-row--flex">
                        <div class="he-icon el-column--flex">
                            <he-icon type="le-icon-nav_home_normal"></he-icon>
                            <div>首页</div>
                        </div>
                        <div class="he-icon">
                            <he-icon type="le-icon-productdetails_tab_customerservice"></he-icon>
                            <div>首页</div>
                        </div>
                        <div class="he-icon">
                            <he-icon type="le-icon-nav_shoppingcart_normal1"></he-icon>
                            <div>购物车</div>
                        </div>
                        <div class="he-cat">
                            加入购物车
                        </div>
                        <div class="he-bay">
                            立即购买
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
    name: "goodsPreview",
    props: {
        img: {
            type: Array,
            default: function () {
                return []
            },
        },
        detail: {
            type: String,
            default: function () {
                return ``;
            }
        },
        form: {
            type: Object
        }
    },
    data() {
        return {
            initialIndex: 0
        }
    },
    methods: {
        change(index) {
            this.initialIndex = index;
        }
    }
}
</script>

<style scoped lang="scss">
/deep/ .el-carousel__arrow {
    display: none;
}

.he-goodsPreview {
    width: 410px;
    height: 740px;
    border: 1px solid #DCDFE6;
    border-radius: 40px;
    background-image: url("../image/goods-preview.png");
}

.he-goodsPreview__zoom {
    zoom: .5;
    margin: 74px 36px 72px 36px;
    padding-top: 128px;
}

.he-goodsPreview__content {
    width: 750px;
    height: 1111px;
    overflow: auto;
}

.he-goodsPreview__footer {
    width: 750px;
    height: 95px;
    background: #FFFFFF;
    border-top: 1px solid #D7D7D7;
}

.he-icon {
    width: 88px;
    height: 100%;
    text-align: center;

    svg {
        width: 32px;
        height: 32px;
        margin-top: 19px;
    }
}

.he-cat {
    width: 226px;
    height: 72px;
    background: rgba(230, 11, 48, 0.05);
    border: 1px solid #E60B30;
    border-radius: 36px;
    font-size: 24px;
    font-weight: 500;
    color: #E60B30;
    text-align: center;
    line-height: 70px;
    margin: 11px 10px 12px 0;
}

.he-bay {
    width: 226px;
    height: 72px;
    background: #E60B30;
    border-radius: 36px;
    font-size: 24px;
    font-weight: 500;
    color: #F3F5F7;
    line-height: 70px;
    text-align: center;
    margin: 11px 0 12px 0;
}

.he-goodsPreview__content::-webkit-scrollbar {
    display: none;
}

.he-goodsPreview__banner {
    position: relative;
    background: #ffffff;
}

.he-goodsPreview__indicators {
    position: absolute;
    background: #000000;
    opacity: 0.5;
    border-radius: 16px;
    right: 24px;
    bottom: 24px;
    z-index: 1000;
    padding: 5px 14px;
    font-size: 20px;
    font-weight: 500;
    color: #FFFFFF;
}

.he-goodsPreview__banner-img {
    width: 750px;
    height: 750px;
}

.he-goodsPreview__item {
    background: #ffffff;
    border-radius: 16px;
    width: 710px;
    margin: 20px 20px 0 20px;
    padding: 24px;
}

.he-goodsPreview__name .price {
    font-size: 30px;
    font-weight: bold;
    color: #E60B30;
}

.he-goodsPreview__name .price:before {
    content: '￥';
    font-size: 50%;
}

.he-goodsPreview__name .origin-price {
    font-size: 24px;
    font-weight: 500;
    text-decoration: line-through;
    color: #999999;

}

.he-goodsPreview__name .sale {
    font-size: 24px;
    font-weight: 500;
    color: #999999;
    float: right;
}

.he-goodsPreview__title {
    width: 545px;
    font-size: 28px;
    font-weight: bold;
    color: #222222;
    line-height: 36px;
    display: -webkit-box;
    text-overflow: ellipsis;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.he-goodsPreview__share {
    width: 70px;
    font-size: 20px;
    font-weight: 500;
    color: #999999;
    text-align: center;
}

.he-goodsPreview__share svg {
    width: 36px;
    height: 36px;
    margin-bottom: 4px;
}

.he-goodsPreview__parameter .label {
    font-size: 24px;
    font-weight: 500;
    color: #999999;
    line-height: 36px;
}

.arrow {
    width: 20px;
    height: 20px;
}

.content {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 36px;
    margin-left: 21px;
}

.he-goodsPreview__evaluation-header {

}

.he-goodsPreview__evaluation-header .he-title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;

}

.he-goodsPreview__evaluation-header .he-more {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}

.he-goodsPreview__evaluation-header .he-more__top {
    margin-right: 8px;
}

.he-title__sign {
    width: 6px;
    height: 28px;
    background: #E60B30;
    border-radius: 3px;
    margin-right: 11px;
}

.he-header__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

.he-header {
    margin-top: 40px;
}

.he-header__name {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-left: 16px;
}

.he-header__star-item {
    width: 20px;
    height: 20px;
    margin-left: 8px;
}

.he-header__body {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-top: 24px;
}

.he-header__footer {
    margin-top: 24px;
}

.he-header__footer-img {
    width: 160px;
    height: 160px;
    border-radius: 8px;
    margin-right: 4px;
}

.he-detail {
    margin-top: 39px;
}

.he-detail__title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin-bottom: 20px;
}

.he-detail__body {
    background: #ffffff;
    padding: 14px 10px;
    zoom: 2;
}
</style>
