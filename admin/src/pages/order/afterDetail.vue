<template>
    <div class="le-matter" v-loading="loading">
        <el-breadcrumb class="he-link-text" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="he-link">
                <he-link href="order/after">
                    售后订单
                </he-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                订单详情
            </el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="le-line">
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-card class="le-form-card he-do-info">
                    <div class="he-status">
                        {{ detail.type === 0 ? '仅退款' : detail.type === 1 ? '退货退款' : detail.type === 2 ? '换货' : '' }}
                        {{ detail.status | orderStatus }}
                    </div>
                    <div class="he-do-info__item">
                        <span class="he-label">
                            售后订单号:
                        </span>
                        <span class="he-value">
                            {{ detail.after_sn }}
                        </span>
                    </div>
                    <div class="he-do-info__item">
                        <span class="he-label">
                            申请时间:
                        </span>
                        <span class="he-value">
                            {{ detail.created_time | getTime }}
                        </span>
                    </div>
                    <div class="he-do-info__item">
                        <span class="he-label">
                            买家:
                        </span>
                        <span class="he-value">
                            {{ detail.user.nickname }}
                        </span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="16">
                <div class="le-card le-description flex">
                    <div class="le-menu">
                        <div :class="{'le-item__active': type === 1}" @click="type = 1" class="le-menu__item">
                            售后说明
                        </div>
                        <div :class="{'le-item__active': type === 2}" @click="type = 2" class="le-menu__item">
                            拒绝理由
                        </div>
                    </div>
                    <div class="le-content">
                        <template v-if="type === 1">
                            <div class="le-content__note">
                                {{ detail.user_note }}
                            </div>
                            <div v-if="detail.images">
                                <img :key="index" :src="item" @click="preview(detail.images)" class="le-content__img"
                                     v-for="(item, index) in detail.images"/>
                            </div>
                        </template>
                        <div class="le-content__note" v-if="type === 2">
                            {{ detail.refuse_reason }}
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <template v-if="detail.user_freight_info">
            <el-row class="le-line">
            </el-row>
            <div class="he-info flex">
                <el-card class="le-form-card flex-sub" style="height: 159px;">
                    <el-row class="el-row--flex">
                        <el-col :span="8" class="he-info__box he-form__line">
                            <div class="he-title">
                                {{ detail.type === 2 ? '买家发货物流' : '退货物流' }}
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">
                                        物流公司:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.user_freight_info.logistics_company }}
                                    </span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        快递单号:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.user_freight_info.freight_sn }}
                                    </span>
                                    <el-button @click="copyTrackingNumber('copy-tracking-number-1')" class="he-button"
                                               type="text">
                                        复制
                                    </el-button>
                                    <input :value="detail.user_freight_info.freight_sn" class="copy-tracking-number"
                                           id="copy-tracking-number-1">
                                    </input>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        退货时间:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.user_freight_info.time }}
                                    </span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="16" class="he-info__box he-form__line">
                            <div class="he-title">
                                快递凭证
                            </div>
                            <div class="he-info__content">
                                <img :key="index" :src="item" @click="preview(detail.user_freight_info.images)" alt=""
                                     class="he-courier-certificate"
                                     v-for="(item, index) in detail.user_freight_info.images"/>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-card class="le-form-card" style="width: 416px;height: 159px;margin-left: 24px"
                         v-if="detail.merchant_freight_info">
                    <el-row class="el-row--flex ">
                        <el-col class="he-info__box he-form__line">
                            <div class="he-title">
                                卖家换货物流
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">
                                        物流公司:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.merchant_freight_info.logistics_company }}
                                    </span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        快递单号:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.merchant_freight_info.freight_sn }}
                                    </span>
                                    <el-button @click="copyTrackingNumber('copy-tracking-number-0')" class="he-button"
                                               type="text">
                                        复制
                                    </el-button>
                                    <input :value="detail.merchant_freight_info.freight_sn" class="copy-tracking-number"
                                           id="copy-tracking-number-0"/>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        退货时间:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.merchant_freight_info.time }}
                                    </span>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </div>
        </template>
        <el-row class="le-line">
        </el-row>
        <el-row class="he-info">
            <el-col>
                <el-card class="le-form-card">
                    <el-row class="el-row--flex ">
                        <el-col :span="8" class="he-info__box he-form__line">
                            <div class="he-title">
                                售后信息
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">
                                        售后类型:
                                    </span>
                                    <span class="he-value">
                                        {{
                                            detail.type === 0 ? '仅退款' : detail.type === 1 ? '退货退款' : detail.type === 2 ? '换货' : ''
                                        }}
                                    </span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        售后商品数:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.return_number }}
                                    </span>
                                </div>
                                <div class="he-info__item" v-if="detail.type !== 2">
                                    <span class="he-label">
                                        退款金额:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.return_amount }}
                                    </span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        收货状态:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.order.status === 203 ? '已收货' : '未收到货' }}
                                    </span>
                                </div>
                                <div class="he-info__item" v-if="detail.type !== 2">
                                    <span class="he-label">
                                        退款理由:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.return_reason }}
                                    </span>
                                </div>
                                <div class="he-info__item" v-if="detail.type === 2">
                                    <span class="he-label">
                                        问题描述:
                                    </span>
                                    <span class="he-value">
                                        {{ detail.user_note }}
                                    </span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8" class="he-info__box he-form__line">
                            <div class="he-title">
                                订单信息
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">
                                        订单号:
                                    </span>
                                    <span @click="router(detail.order.id)" class="he-value he-order-number">
                                        {{ detail.order.order_sn }}
                                    </span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        单价/数量:
                                    </span>
                                    <span class="he-value">
                                        ￥{{ detail.goods.goods_price }}/×{{ detail.return_number }}
                                    </span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">
                                        实付金额:
                                    </span>
                                    <span class="he-value">
                                        ￥{{ detail.return_amount }}
                                    </span>
                                </div>
                                <div class="he-info__item" v-if="detail.order.status >= 202 && detail.order.freight">
                                    <span class="he-label">
                                        发货状态:
                                    </span>
                                    <span class="he-value">
                                        已发货
                                    </span>
                                    <span :hide_cancel="true" :id="detail.id +'_logistics_information'"
                                          :width="detail.order.freight && detail.order.freight.type ===1?415:283"
                                          class="he-logistics" module="order" sure_btn="我知道了" title="物流信息" top="35vh"
                                          type="text" v-popup.logisticsInformation="detail.order">
                                        物流信息
                                    </span>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="8" class="he-info__box" style="padding-right: 50px;">
                            <div class="he-title">
                                售后过程
                            </div>
                            <div class="he-info__content" style="height: 100px;overflow: auto">
                                <ul class="he-timeline" style="padding-top: 10px;padding-left: 10px;">
                                    <li :key="index" class="he-timeline-item" v-for="(item, index) in detail.process">
                                        <div class="he-timeline-item__tail" v-if="index !== detail.process.length - 1">
                                        </div>
                                        <div class="he-timeline-item__node">
                                        </div>
                                        <div class="he-timeline-item__wrapper">
                                            <span class="he-label">
                                                {{ item.label }}
                                            </span>
                                            <span class="he-content">
                                                {{ item.content }}
                                            </span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="le-line">
        </el-row>
        <el-row>
            <el-col>
                <el-card class="le-form-card">
                    <el-table :data="[detail.goods]" style="width: 100%">
                        <el-table-column label="商品" min-width="350">
                            <template slot-scope="scope">
                                <div class="el-row--flex ">
                                    <img :src="scope.row.goods_image" class="he_goods__pic"/>
                                    <div class="le_goods__goodsinfo">
                                        <div class="he_goods__name">
                                            {{ scope.row.goods_name }}
                                        </div>
                                        <div class="he-goods__attr">
                                            {{ scope.row.show_goods_param }}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单价" width="280">
                            <template slot-scope="scope">
                                <div class="he-price-number">
                                    ￥{{ scope.row.goods_price }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="数量" width="280">
                            <template slot-scope="scope">
                                <div class="he-price-number">
                                    ×{{ scope.row.goods_number }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="实付金额" width="280">
                            <template slot-scope="scope">
                                <div class="he-total-amount">
                                    ￥{{ scope.row.pay_amount }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="实际退款" v-if="detail.type !== 2" width="280">
                            <template slot-scope="scope">
                                <div class="he-total-amount">
                                    {{
                                        detail.status == 201 ? '--' : '￥' + (detail.actual_refund ? detail.actual_refund : '0.00')
                                    }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
        </el-row>
        <div class="le-cardpin"
             v-if="detail.status === 100 || detail.status === 102 || detail.status === 122 || detail.status === 111 || detail.status === 132">
            <template v-if="detail.status === 100 || detail.status === 102">
                <el-button action="onReload" class="he-click" module="order" sure_btn="拒绝售后" title="售后申请" top="30vh"
                           v-popup.refusetosell="{item: detail}" width="704">
                    拒绝
                </el-button>
                <el-button class="he-click" module="order" sure_btn="同意售后" title="售后申请" top="30vh" type="primary"
                           v-if="detail.type === 0" v-popup.agreeaftersale="{item: detail}" width="344">
                    同意
                </el-button>
                <el-button class="he-click" module="order" sure_btn="同意并发送退货地址" title="售后申请" top="30vh" type="primary"
                           v-if="detail.type === 1 || detail.type === 2" v-popup.receiverefund="{item: detail}"
                           width="707">
                    同意
                </el-button>
            </template>
            <el-button class="he-click" module="order" sure_btn="确认收货并退款" top="30vh" type="primary"
                       v-popup.onlyrefund="{ item: detail}" v-show="detail.status === 122" width="600">
                收货并退款
            </el-button>
            <el-button class="he-click" module="order" sure_btn="确定退款" title="退款" top="30vh" type="primary"
                       v-popup.onlyrefund="{ item: detail}" v-show="detail.status === 111" width="600">
                退款
            </el-button>
            <el-button action="receiveExchange" class="he-click" module="order" title="确认收货并发货" top="30vh"
                       type="primary" v-popup.receiveexchange="detail" v-show="detail.status === 132" width="524">
                收货并换货
            </el-button>
        </div>
        <preview ref="preview" v-model="previewList">
        </preview>
    </div>
</template>
<script>
import preview from "@/components/preview/index.vue";

export default {
    name: "afterDetail",
    data() {
        return {
            loading: false,
            detail: {
                goods: [],
                buyer: {
                    name: ''
                },
                user: {
                    nickname: ''
                },
                order: {
                    status: null
                },
                merchant_freight_info: {}
            },
            type: 1,
            previewList: []
        }
    },
    mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (!id) {
            id = this.$heshop.utils.getQueryVariable('order_goods_id');
            this.getDetail(parseInt(id), 'order_goods');
        } else {
            this.getDetail(parseInt(id));
        }
    },
    methods: {
        getDetail: function (id, behavior = '') {
            this.loading = true;
            this.$heshop.orderafter('get', id, {behavior}).then(res => {
                this.loading = false;
                this.detail = res;
            }).catch(err => {
                this.loading = false;
                this.$message.error(err.data.message);
            });
        },
        cancelItem(e) {
            this.$heshop.order('put', {id: e.id, behavior: 'cancel'}).then(() => {
                this.getDetail(e.id);
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        confirmReceipt(e) {
            this.$heshop.order('put', {id: e.id, behavior: 'received'}).then(() => {
                this.getDetail(e.id);
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        copyTrackingNumber: function (id) {
            let input = document.getElementById(id);
            input.select();
            document.execCommand("copy");
            this.$message.success('复制成功');
        },
        chooseType: function (index) {
            this.type = index;
        },
        preview: function (list) {
            this.previewList = list;
            this.$refs.preview.handleDialog();
        },
        router: function (id) {
            this.$router.push({
                path: '/order/orderDetail',
                query: {
                    id: id
                }
            })
        },
        onReload: function () {
            let id = this.$heshop.utils.getQueryVariable('id');
            this.getDetail(parseInt(id));
        }
    },
    computed: {
        isPay: function () {
            return function (data) {
                return data === 201 || data === 202 || data === 203 || data === 204;
            }
        }
    },
    filters: {
        getAddress: function (data) {
            if (data) {
                return `${data.province}${data.city}${data.district}${data.address}`;
            } else {
                return '';
            }
        },
        getPayType: function (type) {
            switch (type) {
                case 1:
                    return '微信支付';
                case 2:
                    return '支付宝支付';
                default:
                    return '— —';
            }
        },
        getTime: function (time) {
            time = new Date(time * 1000);
            let y = time.getFullYear();
            let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            return `${y}-${m}-${d} ${h}:${mm}:${s}`;
        },
        getDay: function (time) {
            time = new Date(time * 1000);
            let y = time.getFullYear();
            let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            return `${y}-${m}-${d}`;
        },
        getHour: function (time) {
            time = new Date(time * 1000);
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            return `${h}:${mm}:${s}`;
        },
        orderStatus: function (status) {
            switch (status) {
                case 100:
                    return '待审核';
                case 101:
                    return '已拒绝';
                case 102:
                    return '待审核';
                case 111:
                    return '待卖家退款';
                case 121:
                    return '待买家退货';
                case 122:
                    return '待卖家收货并退款';
                case 131:
                    return '待买家发货';
                case 132:
                    return '待卖家收货并发货';
                case 133:
                    return '卖家已换货';
                case 200:
                    return '已完成';
                case 201:
                    return '已完成(已拒绝)';
            }
        },
    },
    components: {
        preview
    }
};
</script>
<style lang="scss" scoped="">
@import "./afterDetail.less";

.le-form-card {
    border-radius: 16px;
    box-shadow: none !important;
}

.he-link-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
}

.he-do-info {
    height: 184px;
    padding: 12px 20px;

    .he-status {
        font-size: 20px;
        font-weight: 500;
        color: #623CEB;
        opacity: 0.85;
        margin-bottom: 15px;
    }

    .he-goSetting {
        font-size: 14px;
        font-weight: 500;
        color: #623ceb;
        line-height: 22px;
        padding: 0;
        margin-left: 21px;
    }

    .he-received-text {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        opacity: 0.85;
    }

    .he-cancel {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
        margin-bottom: 20px;
    }

    .he-do-btn {
        padding: 10px 24px;
        font-size: 12px;
        font-weight: 400;
        margin-top: 17px;
    }

    .he-prompt {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
        margin-bottom: 18px;
    }

    .he-do-info__item {
        .he-label {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 22px;
            opacity: 0.45;
        }

        .he-value {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 22px;
            opacity: 0.85;
            margin-left: 9px;
        }
    }
}

.he_goods__pic {
    width: 80px;
    height: 80px;
    margin-right: 12px;
}

.he_goods__name {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    color: #010101;
    opacity: 0.85;
}

.he-goods__attr {
    font-size: 12px;
    font-weight: 500;
    color: #010101;
    opacity: 0.65;
}

.he-total-amount,
/deep/ .has-gutter .cell {
    text-align: center;
}

.he-price-number,
.he-total-amount {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 0.85;
    text-align: center;
}

.he-note /deep/ .el-card__body {
    .he-note__edit {
        width: 14px;
        height: 14px;
        display: inline-block;
        margin-right: 12px;
        cursor: pointer;
    }

    .he-note__text {
        font-size: 16px;
        font-weight: 400;
        color: #FBAD15;
    }
}

.he-all-price {
    margin-top: 24px;

    .he-label {
        display: inline-block;
        text-align: right;
        width: 175px;
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        opacity: 0.45;
    }

    .he-amount-price {
        font-weight: bold !important;
        color: #F5212D !important;
    }

    .he-money {
        width: 121px;
        display: inline-block;
        text-align: right;
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        opacity: 0.85;
        margin-right: 23px;
    }

    .he-money:before {
        content: '￥';
    }
}

.he-info {
    .he-form__line {
        border-right: 1px solid #DCDFE6;
    }

    /deep/ .el-card__body {
        padding: 24px 0;
    }

    .he-title {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
        margin-bottom: 15px;
    }

    .he-info__box {
        padding-left: 24px;
    }

    .he-info__item {
        .he-label {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 22px;
            opacity: 0.45;
        }

        .he-value {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 22px;
            opacity: 0.85;
            margin-left: 9px;
        }

        .he-order-number {
            font-weight: 500;
            color: #623CEB;
            cursor: pointer;
        }

        .he-logistics {
            color: #623CEB;
            cursor: pointer;
            font-size: 14px;
            margin-left: 10px;
        }
    }
}

.he-timeline {
    list-style: none;
    margin: 0;
    padding: 0;

    .he-timeline-item {
        position: relative;
        padding-bottom: 20px;
        height: 60px;

        .he-timeline-item__node {
            top: 6px;
            left: -1px;
            width: 10px;
            height: 10px;
            position: absolute;
            background: #623CEB;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .he-timeline-item__tail {
            position: absolute;
            left: 3px;
            top: 18px;
            height: 33px;
            border-left: 2px solid #623CEB;
        }

        .he-timeline-item__wrapper {
            position: relative;
            padding-left: 20px;
            /*top: -3px;*/

            .he-content {
                font-size: 14px;
                font-weight: 400;
                color: #000000;
                opacity: 0.85;
                margin-left: 7px;
            }

            .he-label {
                font-size: 12px;
                font-weight: 400;
                color: #623CEB;
                width: 33px;
                display: inline-block;
                text-align: center;
                line-height: 18px;
                height: 20px;
                border: 1px solid #623CEB;
                border-radius: 10px;
                background: #ffffff;
            }
        }
    }
}

.copy-tracking-number {
    background-color: #ffffff;
    border: none;
    opacity: 0;
    position: absolute;
    z-index: -10;
}

.he-button {
    padding: 0 20px;
    font-size: 14px;
    font-weight: 500;
    color: #623CEB;
    opacity: 0.85;
}

/deep/ .el-table thead th {
    height: 40px;
    padding: 0;
    margin: 0px;
    background-color: #F5F7FA;
}

.he-courier-certificate {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    margin-right: 8px;
}

/deep/ .is-always-shadow {
    box-shadow: none;
}

.le-matter /deep/ .el-tabs--card > .el-tabs__content {
    box-shadow: none;
}

.el-menu-vertical-demo {
    width: 119px;
    height: 125px;
}

.el-menu-item {
    height: 38px;
    line-height: 38px;
}

.el-menu-item:focus {
    background-color: #FFFFFF;
}

.el-menu-item:hover {
    background-color: #FFFFFF;
}
</style>