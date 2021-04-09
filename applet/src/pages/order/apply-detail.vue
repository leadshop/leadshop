<template>
    <view class="he-page-content" :data-theme="theme">
        <view class="he-box he-goods flex">
            <image class="he-goods__image" :src="goods.goods_image"></image>
            <view class="he-goods__content">
                <view class="he-goods__name he-line-1">{{goods.goods_name}}</view>
                <view class="he-goods__attr">{{goods.show_goods_param}}</view>
                <view class="he-goods__number">x{{goods.goods_number}}</view>
            </view>
        </view>
        <apply-detail-operating v-model="data" :goods="goods"></apply-detail-operating>
        <apply-detail-description v-model="data.user_note"></apply-detail-description>
        <apply-detail-upload-certificate :list.sync="data.images"></apply-detail-upload-certificate>
        <button class="cu-btn he-submit-btn" :disabled="isSubmit" @click="submit">提交</button>
    </view>
</template>
<script>
import applyDetailOperating from "./components/applyDetail-operating.vue";
import applyDetailDescription from "./components/applyDetail-description.vue";
import applyDetailUploadCertificate from "./components/applyDetail-upload-certificate.vue";

export default {
    name: "apply-after-sales-detail",
    computed: {
        isSubmit: function() {
            return this.data.type !== 2 && !this.data.return_reason;
        }
    },
    components: {
        applyDetailOperating,
        applyDetailDescription,
        applyDetailUploadCertificate
    },
    data() {
        return {
            goods: {
                goods_name:'',
                goods_image:'',
                goods_number:1,
                show_goods_param:''
            },
            data: {
                order_goods_id: 0,
                type: 2,
                return_number: 1,
                return_amount: 0,
                return_reason: '',
                images: [],
                user_note: ''
            }
        }
    },
    onLoad(options) {
        this.goods = JSON.parse(decodeURIComponent(options.good));
        this.data = {
            order_goods_id: parseInt(options.id),
            type: parseInt(options.type),
            return_number: this.goods.goods_number,
            return_amount: this.goods.pay_amount,
            return_reason: '',
            images: [],
            user_note: ''
        }
    },
    methods: {
        submit: function() {
            this.$heshop.orderafter('post', this.data).then(function() {
                uni.redirectTo({url: '/pages/order/after-sales-records'});
            }).catch(function(err) {
                console.error(err);
                this.$toError();
            });
        }
    }
}
</script>
<style scoped lang="scss">
.he-page-content {
    padding: 20px;
}

.he-box {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
}

.he-goods {
    margin-bottom: 16px;
    padding: 32px 24px;
}

.he-goods__image {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    margin-right: 24px;
    display: block;
}

.he-goods__content {
    padding-top: 9px;
    font-family: PingFang SC;
    font-weight: 500;
    width: 518px;
    font-size: 22px;
    color: #999999;
}

.he-goods__name {
    font-size: 26px;
    color: #222222;
    line-height: 1.3;
}

.he-goods__attr {
    margin-top: 7px;
}

.he-goods__number {
    margin-top: 8px;
}

.he-submit-btn {
    width: 710px;
    height: 80px;
    @include background_color('background_color');
    border-radius: 40px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin: 80px 0 44px 0;
}
.he-submit-btn[disabled] {
    background: #cccccc !important;
    color: #FFFFFF;
}
</style>