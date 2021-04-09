<template>
    <view class="he-page-content" :data-theme="theme">
        <view class="he-content" v-for="(good, index) in detail.goods" :key="index">
            <view class="he-header flex">
                <image class="he-goods__image" :src="good.goods_image"></image>
                <view class="he-goods__content ">
                    <view class="he-goods__name he-line-1">
                        {{good.goods_name}}
                    </view>
                    <view class="he-goods__attr he-line-1">{{good.goods_param}}</view>
                </view>
            </view>
            <view class="he-body">
                <view class="he-star flex align-center">
                    <view class="he-star__text">商品评分</view>
                    <view class="he-icons flex">
                        <view class="iconfont iconevaluate_star" @click="form[index].star = 1;" :class="form[index].star >= 1 ? 'he-star__1' : 'he-star__0'"></view>
                        <view class="iconfont iconevaluate_star" @click="form[index].star = 2;" :class="form[index].star >= 2 ? 'he-star__1' : 'he-star__0'"></view>
                        <view class="iconfont iconevaluate_star" @click="form[index].star = 3;" :class="form[index].star >= 3 ? 'he-star__1' : 'he-star__0'"></view>
                        <view class="iconfont iconevaluate_star" @click="form[index].star = 4;" :class="form[index].star >= 4 ? 'he-star__1' : 'he-star__0'"></view>
                        <view class="iconfont iconevaluate_star" @click="form[index].star = 5;" :class="form[index].star === 5 ? 'he-star__1' : 'he-star__0'"></view>
                    </view>
                    <view class="he-star__text he-evaluation-text">
                        {{form[index].star | getStarText}}
                    </view>
                </view>
                <view class="he-evaluation">
                    <textarea class="he-textarea"
                        placeholder-style="font-size:26rpx;font-family: PingFang SC;font-weight: 500; color: #999999; line-height:1.3;"
                        placeholder="说说你的购买体验，为更多小伙伴提供有价值的参考吧。"
                        :maxlength="300"
                        :value="form[index].content"
                        @input="(e) => setTextarea(e, index)"
                    ></textarea>
                    <view class="he-prompt flex">
                        <view class="he-max">{{form[index].content.length}}/300</view>
                        <view class="he-min" v-if="form[index].content.length < 10">
                            再输入<text class="he-number">{{10 - form[index].content.length}}</text>个字就能发表了哦
                        </view>
                    </view>
                </view>
            </view>
            <view class="he-footer">
                <view class="he-top">
                    <text class="he-title">添加图片</text>
                    <text class="he-number">({{form[index].images.length}}/6)</text>
                </view>
                <view class="he-bottom">
                    <he-upload-image
                        :index="index"
                        :sizeType="['compressed']"
                        @on-remove="removeImage"
                        @on-uploaded="uploaded"
                        :max-count="6"></he-upload-image>
                </view>
            </view>
        </view>
        <button class="cu-btn he-submit__btn" :disabled="isDis" @click.once="submit" v-if="!$h.test.isEmpty(detail.goods)">提交</button>
    </view>
</template>

<script>
import heUploadImage from "@/components/he-upload-image.vue";

export default {
    name: "evaluation",
    components: {
        heUploadImage
    },
    data() {
      return {
          form: [],
          detail: {},
          orderId: null
      }
    },
    computed: {
        isDis: function() {
            let num = 0;
            for (let i = 0; i < this.form.length; i++) {
                if (this.form[i].content.length >= 10) {
                    num++;
                }
            }
            return num !== this.form.length;
        }
    },
    methods: {
        setTextarea: function (e, index) {
            let str = e.detail.value;
            if (str.length > 300) {
                str = str.substring(0, 300);
            }
            this.form[index].content = str;
        },
        removeImage: function(index, lists, key) {
            this.form[key].images.slice(index, 1);
        },
        getDetail: function (id) {
            let _this = this;
            this.$heshop.order('get', id).then(function(res) {
                _this.detail = res;
                res.goods.forEach(function (good) {
                    _this.form.push({
                        content: '',
                        star: 5,
                        images: [],
                        order_goods_id: good.id
                    });
                });
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            });
        },
        submit: function() {
            let _this = this;
            this.$heshop.evaluate('post', {
                order_sn: this.detail.order_sn,
                evaluate_list: this.form
            }).then(function () {
                uni.setStorageSync(_this.$storageKey.evaluation_post, {
                    id: _this.orderId
                });
                uni.navigateBack({delta: 1});
            }).catch(function(err) {
                console.error(err);
                _this.$toError();
            })
        },
        uploaded: function(list, index) {
            this.form[index].images = list.map(function(item) {
                return item.response;
            });
        }
    },
    onLoad(options) {
        options.id ? this.getDetail(parseInt(options.id)) : this.$toError();
        this.orderId = parseInt(options.id);
    },
    filters: {
        getStarText: function(star) {
            switch (star) {
                case 5:
                    return '非常满意';
                case 4:
                    return '满意';
                case 3:
                    return '一般';
                case 2:
                    return '差';
                case 1:
                    return '很差';
                default:
            }
        }
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    padding: 20px;
}
.he-content {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 16px 24px 32px 24px;
    margin-bottom: 20px;
}
.he-header {
    height: 132px;
    padding: 16px 0;
}
.he-goods__image {
    width: 100px;
    height: 100px;
    border-radius: 8px;
    display: block;
    margin-right: 24px;
}
.he-goods__content {
    height: 100px;
    width: 538px;
    padding: 16px 0 0 0;
}
.he-goods__name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
}
.he-goods__attr {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    margin-top: 10px;
}
.he-star {
    height: 88px;
}
.he-star__text {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin-right: 4px;
}
.he-evaluation-text {
    margin-left: 23px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.iconevaluate_star {
    width: 40px;
    height: 40px;
    font-size: 40px;
    margin-left: 20px;
}
.he-star__0 {
    color: #E5E5E5;
}
.he-star__1 {
    color: #FFC71C;
}
.he-evaluation {
    width: 662px;
    height: 280px;
    border: 1px solid #E5E5E5;
    border-radius: 16px;
    padding: 24px;
    position: relative;
    margin: 16px 0;
}
.he-textarea {
    width: 614px;
    height: 200px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.3;
}
.he-prompt {
    position: absolute;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
    bottom: 24px;
    right: 24px;
}
.he-min {
    margin-left: 17px;
}
.he-min .he-number {
    color: rgba(230, 11, 48, 1);
}
.he-footer .he-top {
    height: 73px;
    line-height: 73px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-footer .he-top .he-title {
    color: #222222;
}
.he-footer .he-top .he-number {
    color: #999999;
    margin-left: 15px;
}
.he-submit__btn {
    width: 710px;
    height: 80px;
    border-radius: 40px;
    font-size: 28px;
    @include background_color("background_color");
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin-top: 36px;
}
.he-submit__btn[disabled] {
    background: #CCCCCC;
    color: #FFFFFF;
}
</style>