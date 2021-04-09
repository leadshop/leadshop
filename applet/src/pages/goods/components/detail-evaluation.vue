<template>
    <view class="detail-evaluation" :data-theme="theme">
        <view class="he-top flex justify-between align-center">
            <view class="flex align-center">
                <view class="he-sign"></view>
                <view class="he-title">
                    <text>评价</text>
                    <text class="he-number">({{count}})</text>
                </view>
            </view>
            <view class="flex justify-center align-center" @tap="navigateTo">
                <text class="he-more">查看全部</text>
                <view class="iconfont iconbtn_arrow"></view>
            </view>
        </view>
        <view class="he-center flex justify-between align-center" v-if="count > 0">
            <view class="flex align-center">
                <image :src="evaluation.user.avatar" class="he-avatar" ></image>
                <view class="he-name">
                    {{evaluation.user.nickname}}
                </view>
            </view>
            <view class="flex">
                <text v-for="item in 5" :key="item" class="iconfont iconevaluate_star" :class="evaluation.star >= item+1 ? 'he-star__1' : 'he-star__0'"></text>
            </view>
        </view>
        <view class="he-body" v-if="count > 0">
            <view class="he-content he-line-3">
                {{evaluation.content}}
            </view>
            <view class="he-pictures flex flex-wrap" v-if="!$h.test.isEmpty(evaluation.images)">
                <he-image :height="160" :width="160" mode="aspectFill" class="he-img" :image-style="{
                            borderRadius: '8rpx'}" :src="item" :key="index" @click="doPreviewImage(item, images)" v-for="(item, index) in images"></he-image>
            </view>
        </view>
        <view class="he-nothing" v-if="count === 0">暂无评价</view>
    </view>
</template>

<script>
export default {
    name: "detail-evaluation",
    props: {
        goodsId: {
            type: Number
        }
    },
    computed: {
        images: function () {
            return this.evaluation.images.slice(0, 4)
        }
    },
    data() {
        return {
            count: 0,
            evaluation: {
                images: [],
                user: {}
            }
        }
    },
    methods: {
        navigateTo: function navigateTo() {
            uni.navigateTo({url: "/pages/goods/evaluation?id=" + this.goodsId});
        },
        getEvaluation: function() {
            let _this = this;
            return new Promise(function (resolve, reject) {
                _this.$heshop.evaluate('get', {
                    goods_id: _this.goodsId,
                    tab_key: 'all'
                }).page(1, 1).then(res => {
                    if (!_this.$h.test.isEmpty(res.data)) {
                        resolve(res.data[0]);
                    }
                }).catch(err => {
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
                    reject(err);
                });
            });
        },
        doPreviewImage(img, images) {
            this.$utils.doPreviewImage(img, images);
        }
    },
    mounted() {
        let _this = this;
        Promise.all([this.getTabCount(), this.getEvaluation()]).then(function(res) {
            _this.count = res[0].all;
            _this.evaluation = res[1];
        }).catch(function(err) {
            console.error(err);
            this.$toError();
        });
    }
}
</script>

<style scoped lang="scss">
.detail-evaluation {
    margin: 20px 20px 0 20px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px 24px 24px 24px;
}
.he-top {
    height: 71px;
}
.he-sign {
    width: 6px;
    height: 28px;
    @include background_color('background_color');
    border-radius: 3px;
}
.he-title {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    margin-left: 11px;
}
.he-number {
    color: #999999;
}
.iconbtn_arrow {
    font-size: 22px;
    color: RGBA(190, 190, 190, 1);
}
.he-more {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-right: 8px;
}
.he-center {
    height: 48px;
    margin-top: 20px;
}
.he-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 16px;
}
.he-name {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
.iconevaluate_star {
    font-size: 20px;
    width: 20px;
    height: 20px;
    margin-left: 8px;
}
.he-body {
    margin-top: 21px;
}
.he-content {
    font-size: 24prx;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
}
.he-pictures {
    margin-top: 21px;
}
.he-img {
    margin: 0 4px 4px 0;
}
.he-star__0 {
    color: rgba(229, 229, 229, 1);
}
.he-star__1 {
    color: rgba(255, 199, 28, 1);
}
.he-nothing {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin: 20px 0 24px 0;
}
</style>
