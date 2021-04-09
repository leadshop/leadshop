<template>
    <div class="le-matter" v-loading="loading">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="he-link-text">
            <el-breadcrumb-item class="he-link">
                <he-link href="order/index">
                    订单管理
                </he-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>订单详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="le-line"></el-row>
        <el-row>
            <el-col :span="8">
                <el-card shadow="never" class="le-form-card he-do-info">
                    <div style="height: 150px;">
                        <div class="he-status">{{detail.status | orderStatus}}</div>
                        <div class="he-cancel" v-if="detail.status === 101">买家取消</div>
                        <div class="he-cancel" v-if="detail.status === 102">订单超时未付款</div>
                        <div class="he-cancel" v-if="detail.status === 103">后台取消</div>
                        <div class="he-prompt" v-if="detail.status === 201">
                            温馨提示：请尽快发货
                        </div>
                        <template v-if="detail.status === 100">
                            <span class="he-received-text">
                                买家未在{{detail.cancel_time | getTime2}}内付款
                            </span>
                            <he-link href="setup/index">
                                <el-button type="text" class="he-goSetting he-purple">去设置</el-button>
                            </he-link>
                            <div class="he-received-text">
                                订单将自动关闭
                            </div>
                        </template>
                        <template v-if="detail.status === 202">
                            <span class="he-received-text">
                                买家未在{{detail.received_time | getTime2}}内确认收货
                            </span>
                            <he-link href="setup/index">
                                <el-button type="text" class="he-goSetting he-purple">去设置</el-button>
                            </he-link>
                            <div class="he-received-text">
                                订单将自动确认收货
                            </div>
                        </template>
                        <div class="he-do-info__item">
                            <span class="he-label">订单号:</span>
                            <span class="he-value">{{detail.order_sn}}</span>
                        </div>
                        <div class="he-do-info__item">
                            <span class="he-label">下单时间:</span>
                            <span class="he-value">{{detail.created_time | getTime}}</span>
                        </div>
                    </div>
                    <popconfirm width="392px" v-if="detail.status === 100" @confirm="cancelItem(detail)" title="订单取消请谨慎操作，确定取消？">
                        <el-button class="he-do-btn">取消订单</el-button>
                    </popconfirm>
                    <el-button class="he-do-btn" action="getNew" :disabled="afterShow(detail)" v-if="detail.status === 100" :title="'修改价格'" width="431" v-popup.modifyPrice="detail" module="order">修改价格</el-button>
                    <el-button class="he-do-btn" :disabled="afterShow(detail)" v-if="detail.status === 201" title="订单发货" :id="detail.id+'_shipping'" width="512" module="order" v-popup.orderShipping="{item: detail}">发货</el-button>
                    <el-button class="he-do-btn" v-if="detail.status === 202" title="修改物流" width="524" module="order" top="35vh" :id="detail.id +'_modify_logistics'" :disabled="afterShow(detail)" v-popup.modifyLogistics="{item: detail}">修改物流</el-button>
                    <popconfirm width="440px" v-if="detail.status === 202" :disabled="afterShow(detail)" @confirm="confirmReceipt(detail)" title="确认收货请谨慎操作，确定买家已收货？">
                        <el-button class="he-do-btn" :disabled="afterShow(detail)">确认收货</el-button>
                    </popconfirm>
                </el-card>
            </el-col>
            <el-col :span="16">
                <el-card shadow="never" class="le-form-card he-step">
                    <div class="el-row--flex is-align-middle">
                        <div class="el-row--flex is-justify-space-around ">
                            <div class="he-buyer-orders">
                                <div class="he-img__box el-row--flex is-justify-center is-align-middle" :class="detail.status === 100 ? 'he-img__select' : detail.status >= 100 ?
                                'he-img__active' : 'he-img__noActive'">
                                    <he-icon class="img" type="le-icon-place-order"></he-icon>
                                </div>
                                <div class="he-title">买家下单</div>
                                <div class="he-time">
                                    {{detail.created_time | getDay}}<br />
                                    {{detail.created_time | getHour}}<br />
                                </div>
                            </div>
                            <div class="he-transition">
                                <div class="he-dot-bar el-row--flex is-justify-space-around">
                                    <div class="he-dots" :class="detail.status > 100 ? 'he-select' : 'he-noSelect'"></div>
                                    <div class="he-dots" :class="detail.status > 100 ? 'he-select' : 'he-noSelect'"></div>
                                    <div class="he-dots" :class="detail.status > 100 ? 'he-select' : 'he-noSelect'"></div>
                                </div>
                                <div class="he-row" :class="detail.status > 100 ? 'he-row-select' : 'he-row-noSelect'"></div>
                            </div>
                            <template v-if="detail.status !== 101 && detail.status !== 102 && detail.status !== 103">
                                <div class="he-buyer-payment">
                                    <div class="he-img__box el-row--flex is-justify-center is-align-middle" :class="detail.status === 201 ? 'he-img__select' : detail.status >= 202 ?
                                    'he-img__active' : 'he-img__noActive'">
                                        <he-icon class="img" type="le-icon-payment"></he-icon>
                                    </div>
                                    <div class="he-title">买家付款</div>
                                    <div class="he-time" v-if="detail.pay_time">
                                        {{detail.pay_time | getDay}}<br />
                                        {{detail.pay_time | getHour}}<br />
                                    </div>
                                </div>
                                <template v-if="!isAfterOver">
                                    <div class="he-transition">
                                        <div class="he-dot-bar el-row--flex is-justify-space-around">
                                            <div class="he-dots" :class="detail.status >= 202 ? 'he-select' : 'he-noSelect'"></div>
                                            <div class="he-dots" :class="detail.status >= 202 ? 'he-select' : 'he-noSelect'"></div>
                                            <div class="he-dots" :class="detail.status >= 202 ? 'he-select' : 'he-noSelect'"></div>
                                        </div>
                                        <div class="he-row" :class="detail.status >= 202 ? 'he-row-select' : 'he-row-noSelect'"></div>
                                    </div>
                                    <div class="he-buyer-shipment">
                                        <div class="he-img__box  el-row--flex is-justify-center is-align-middle" :class="detail.status === 202 ? 'he-img__select' : detail.status >= 203
                                    ? 'he-img__active':'he-img__noActive'">
                                            <he-icon class="img" type="le-icon-delivery"></he-icon>
                                        </div>
                                        <div class="he-title">卖家发货</div>
                                        <div class="he-time" v-if="detail.status >= 202">
                                            {{detail.send_time | getDay}}<br />
                                            {{detail.send_time | getHour}}<br />
                                        </div>
                                    </div>
                                    <div class="he-transition">
                                        <div class="he-dot-bar el-row--flex is-justify-space-around">
                                            <div class="he-dots" :class="detail.status >= 203 ? 'he-select' : 'he-noSelect'"></div>
                                            <div class="he-dots" :class="detail.status >= 203 ? 'he-select' : 'he-noSelect'"></div>
                                            <div class="he-dots" :class="detail.status >= 203 ? 'he-select' : 'he-noSelect'"></div>
                                        </div>
                                        <div class="he-row" :class="detail.status >= 203 ? 'he-row-select' : 'he-row-noSelect'"></div>
                                    </div>
                                    <div class="he-buyer-receiving">
                                        <div class="he-img__box el-row--flex is-justify-center is-align-middle" :class="detail.status === 203 ? 'he-img__select' : detail.status === 204 ?
                                    'he-img__active' : 'he-img__noActive'">
                                            <he-icon class="img" type="le-icon-receipt"></he-icon>
                                        </div>
                                        <div class="he-title">买家收货</div>
                                        <div class="he-time" v-if="detail.status >= 203">
                                            {{detail.received_time | getDay}}<br />
                                            {{detail.received_time | getHour}}<br />
                                        </div>
                                    </div>
                                </template>
                                <template v-if="isAfterOver">
                                    <template v-if="detail.status >= 202 && detail.send_time">
                                        <div class="he-transition">
                                            <div class="he-dot-bar el-row--flex is-justify-space-around">
                                                <div class="he-dots he-select"></div>
                                                <div class="he-dots he-select"></div>
                                                <div class="he-dots he-select"></div>
                                            </div>
                                            <div class="he-row" :class="detail.status >= 202 ? 'he-row-select' : 'he-row-noSelect'"></div>
                                        </div>
                                        <div class="he-buyer-shipment">
                                            <div class="he-img__box  el-row--flex is-justify-center is-align-middle" :class="detail.status === 202 ? 'he-img__select' : detail.status >= 203
                                    ? 'he-img__active':'he-img__noActive'">
                                                <he-icon class="img" type="le-icon-delivery"></he-icon>
                                            </div>
                                            <div class="he-title">卖家发货</div>
                                            <div class="he-time">
                                                {{detail.send_time | getDay}}<br />
                                                {{detail.send_time | getHour}}<br />
                                            </div>
                                        </div>
                                    </template>
                                    <template v-if="detail.status >= 203 && detail.received_time">
                                        <div class="he-transition">
                                            <div class="he-dot-bar el-row--flex is-justify-space-around">
                                                <div class="he-dots he-select" :class="detail.status >= 203 ? '' : 'he-noSelect'"></div>
                                                <div class="he-dots" :class="detail.status >= 203 ? 'he-select' : 'he-noSelect'"></div>
                                                <div class="he-dots" :class="detail.status >= 203 ? 'he-select' : 'he-noSelect'"></div>
                                            </div>
                                            <div class="he-row" :class="detail.status >= 203 ? 'he-row-select' : 'he-row-noSelect'"></div>
                                        </div>
                                        <div class="he-buyer-receiving">
                                            <div class="he-img__box el-row--flex is-justify-center is-align-middle" :class="detail.status === 203 ? 'he-img__select' : detail.status === 204 ?
                                    'he-img__active' : 'he-img__noActive'">
                                                <he-icon class="img" type="le-icon-receipt"></he-icon>
                                            </div>
                                            <div class="he-title">买家收货</div>
                                            <div class="he-time">
                                                {{detail.received_time | getDay}}<br />
                                                {{detail.received_time | getHour}}<br />
                                            </div>
                                        </div>
                                    </template>
                                </template>
                                <div class="he-transition">
                                    <div class="he-dot-bar el-row--flex is-justify-space-around">
                                        <div class="he-dots" :class="detail.status === 204? 'he-select' : 'he-noSelect'"></div>
                                        <div class="he-dots" :class="detail.status === 204? 'he-select' : 'he-noSelect'"></div>
                                        <div class="he-dots" :class="detail.status === 204? 'he-select' : 'he-noSelect'"></div>
                                    </div>
                                    <div class="he-row" :class="detail.status >= 204 ? 'he-row-select' : 'he-row-noSelect'"></div>
                                </div>
                                <div class="he-successful-transaction">
                                    <div class="he-img__box el-row--flex is-justify-center is-align-middle" :class="detail.status === 204 ? 'he-img__select' : 'he-img__noActive'">
                                        <he-icon class="img" type="le-icon-order-finished"></he-icon>
                                    </div>
                                    <div class="he-title">{{isAfterOver ? '已完成' : '交易成功'}}</div>
                                    <div class="he-time" v-if="detail.status >= 204">
                                        {{detail.finish_time | getDay}}<br />
                                        {{detail.finish_time | getHour}}<br />
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="he-successful-transaction">
                                    <div class="he-img__box el-row--flex is-justify-center is-align-middle" :class="detail.status === 101 || detail.status === 102 ||  detail.status === 103 ? 'he-img__select' : 'he-img__noActive'">
                                        <he-icon class="img" type="le-icon-order-closed"></he-icon>
                                    </div>
                                    <div class="he-title">订单关闭</div>
                                    <div class="he-time">
                                        {{detail.cancel_time | getDay}}<br />
                                        {{detail.cancel_time | getHour}}<br />
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="le-line"></el-row>
        <el-row class="he-note">
            <el-col>
                <el-card shadow="never" class="le-form-card">
                    <span class="he-note__text">商家备注：{{detail.note}}</span>
                    <he-icon type="le-icon-editor" class="he-note__edit" title="商家备注" width="480" top="35vh" v-popup.merchantNotes="detail" module="order"></he-icon>
                </el-card>
            </el-col>
        </el-row>
        <template v-if="detail.status === 202">
            <el-row class="le-line"></el-row>
            <el-row>
                <el-col>
                    <el-card shadow="never" class="le-form-card">
                        <div style="font-size: 16px;margin-bottom: 5px;">物流信息</div>
                        <div>
                            <span class="he-logistics__title">发货方式：</span>
                            <span class="he-logistics__value">{{detail.freight.type ==1?'自己联系快递':'无需物流'}}</span>
                            <div style="display: inline-block;" v-if="detail.freight.type === 1">
                                <span class="he-logistics__title">物流公司：</span>
                                <span class="he-logistics__value">{{detail.freight.logistics_company}}</span>
                                <span class="he-logistics__title">快递单号：</span>
                                <span class="he-logistics__value" style="margin-right: 0px;">{{detail.freight.freight_sn}}</span>
                                <el-button class="he-button" type="text" @click="copyTrackingNumber">复制</el-button>
                                <input id="copy-tracking-number" :value="detail.freight.freight_sn">
                            </div>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </template>
        <el-row class="le-line"></el-row>
        <el-row class="he-info">
            <el-col>
                <el-card shadow="never" class="le-form-card">
                    <el-row class="el-row--flex ">
                        <el-col class="he-info__box he-form__line" :span="isPay(detail.status) ? 6 : 8">
                            <div class="he-title">
                                <span>收货信息</span>
                                <he-icon v-if="detail.status === 201" type="le-icon-editor" size="18px" class="he-edit__price" :id="detail.id + '_price'" :title="'修改地址'" width="524" v-popup.changeAddress="{item:detail}" module="order"></he-icon>
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">收货人姓名:</span>
                                    <span class="he-value">{{detail.buyer.name}}</span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">联系方式:</span>
                                    <span class="he-value">{{detail.buyer.mobile}}</span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">收货地址:</span>
                                    <span class="he-value">{{detail.buyer | getAddress}}</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col class="he-info__box he-form__line" :span="isPay(detail.status) ? 6 : 8">
                            <div class="he-title">
                                买家信息
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">买家昵称:</span>
                                    <span class="he-value">{{detail.user.nickname}}</span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">买家留言:</span>
                                    <span class="he-value">{{detail.buyer.note}}</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col class="he-info__box he-form__line" :span="6" v-if="isPay(detail.status)">
                            <div class="he-title">
                                支付信息
                            </div>
                            <div class="he-info__content">
                                <div class="he-info__item">
                                    <span class="he-label">支付方式:</span>
                                    <span class="he-value">{{detail.pay_type | getPayType}}</span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">交易单号:</span>
                                    <span class="he-value">{{detail.pay_number}}</span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">实付金额:</span>
                                    <span class="he-value">¥{{detail.pay_amount}}</span>
                                </div>
                                <div class="he-info__item">
                                    <span class="he-label">付款时间:</span>
                                    <span class="he-value">{{detail.pay_time | getTime}}</span>
                                </div>
                            </div>
                        </el-col>
                        <el-col class="he-info__box" :span="isPay(detail.status) ? 6 : 8">
                            <div class="he-title">
                                订单来源
                            </div>
                            <div class="he-info__content">
                                <span class="he-value"> {{detail.source === 'weapp' ? '微信小程序' : detail.source === 'wechat' ? '公众号' : ''}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <el-row class="le-line"></el-row>
        <el-row>
            <el-col>
                <el-card shadow="never" class="le-form-card">
                    <el-table :data="detail.goods" style="width: 100%">
                        <el-table-column label="商品">
                            <template slot-scope="scope">
                                <div class="el-row--flex ">
                                    <div class="he-goods__img__box">
                                        <img class="he_goods__pic" :src="scope.row.goods_image" alt="">
                                        <div class="he-goods__after" v-if="scope.row.after_sales" @click="router(scope.row.id)">
                                            {{scope.row.after | getAfter}}
                                            <he-icon class="he-goods__after__icon" type="le-icon-arrow-right"></he-icon>
                                        </div>
                                    </div>
                                    <div class="le_goods__goodsinfo">
                                        <div class="he_goods__name">{{scope.row.goods_name}}</div>
                                        <div class="he-goods__attr">{{scope.row.show_goods_param}}</div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="单价/数量">
                            <template slot-scope="scope">
                                <div class="he-price-number">
                                    ￥{{scope.row.goods_price}}<br />
                                    ×{{scope.row.goods_number}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品金额">
                            <template slot-scope="scope">
                                <div class="he-total-amount">
                                    ￥{{scope.row.total_amount}}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="el-row--flex is-justify-end he-all-price">
                        <div>
                            <div>
                                <span class="he-label">商品总金额:</span>
                                <span class="he-money">￥{{Math.floor((detail.goods_amount*1 + detail.goods_reduced*1)*100)/100}}</span>
                            </div>
                            <div>
                                <span class="he-label">运费:</span>
                                <span class="he-money">￥{{Math.floor((detail.freight_amount*1 + detail.freight_reduced*1)*100)/100}}</span>
                            </div>
                            <div v-if="detail.freight_reduced !== '0.00'">
                                <span class="he-label">运费改价:</span>
                                <span class="he-money">{{detail.freight_reduced * 1 < 0 ? '+' : '-' }}￥{{detail.freight_reduced * 1 < 0 ? -(detail.freight_reduced * 1) : detail.freight_reduced * 1}}</span> </div> <div v-if="detail.goods_reduced !== '0.00'">
                                        <span class="he-label">商品改价:</span>
                                        <span class="he-money">{{detail.goods_reduced * 1 < 0 ? '+' : '-' }}￥{{detail.goods_reduced * 1 < 0 ? -(detail.goods_reduced * 1) : detail.goods_reduced * 1}}</span> </div> <div v-if="detail.status > 200">
                                                <span class="he-label">实付金额:</span>
                                                <span class="he-money he-amount-price">￥{{detail.pay_amount}}</span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import popconfirm from "@/components/popconfirm.vue";
export default {
    components: {
        popconfirm
    },
    name: "orderDetail",
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
                }
            },
            isAfterOver: false
        }
    },
    mounted() {
        this.getNew()
    },
    methods: {
        getNew: function() {
            let id = this.$heshop.utils.getQueryVariable('id');
            this.getDetail(parseInt(id));
        },
        getDetail: function(id) {
            this.loading = true;
            this.$heshop.order('get', id).then(res => {
                this.loading = false;
                this.detail = res;
                this.show();
                return true;
            }).catch(err => {
                this.loading = false;
                this.$message.error(err.data.message);
            });
        },
        cancelItem(e) {
            this.$heshop.order('put', { id: e.id, behavior: 'cancel' }, null).then(() => {
                this.getDetail(e.id);
                this.$message.success('取消成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        confirmReceipt(e) {
            this.$heshop.order('put', { id: e.id, behavior: 'received' }, null).then(() => {
                this.getDetail(e.id);
                this.$message.success('收货成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        copyTrackingNumber: function() {
            let input = document.getElementById("copy-tracking-number");
            input.select();
            document.execCommand("copy");
            this.$message.success('复制成功');
        },
        router: function(id) {
            this.$router.push({
                path: '/order/afterDetail',
                query: {
                    order_goods_id: id
                }
            });
        },
        afterShow: function(item) {
            let goods = item.goods;
            let status = false;
            for (let i = 0; i < goods.length; i++) {
                status = goods[i].after_sales === 0 ? false : true;
                if (status === 0) {
                    break;
                }
            }
            return status;
        },
        show() {
            let goods = this.detail.goods;
            let status = false;
            let num = 0;
            for (let i = 0; i < goods.length; i++) {
                if (goods[i].after_sales === 1 && goods[i].after.status >= 200) {
                    num++;
                }
            }
            if (num === goods.length) status = true;
            this.isAfterOver = status;
        }
    },
    computed: {
        isPay: function() {
            return function(data) {
                return data === 201 || data === 202 || data === 203 || data === 204;
            }
        }
    },
    filters: {
        getAddress: function(data) {
            return `${data.province}${data.city}${data.district}${data.address}`;
        },
        getPayType: function(type) {
            switch (type) {
                case 'wechat':
                    return '微信支付';
                case 'alipay':
                    return '支付宝支付';
                default:
                    return '— —';
            }
        },
        getTime: function(time) {
            time = new Date(time * 1000);
            let y = time.getFullYear();
            let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            return `${y}-${m}-${d} ${h}:${mm}:${s}`;
        },
        getTime2: function(time) {
            let days = time - Date.parse(new Date()) / 1000;
            if (days > 0) {
                let day = Math.floor(days / (24 * 60 * 60));
                let hours = days - day * 24;
                let hour = Math.floor(hours / (60 * 60));
                let minutes = hours - hour * 60 * 60;
                let minute = Math.floor(minutes / 60);
                let seconds = minutes - minute * 60;
                let second = Math.floor(seconds);
                return day + '天' + hour + '小时' + minute + '分钟' + second + '秒';
            } else {
                return '0秒';
            }
        },
        getDay: function(time) {
            time = new Date(time * 1000);
            let y = time.getFullYear();
            let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
            let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
            return `${y}-${m}-${d}`;
        },
        getHour: function(time) {
            time = new Date(time * 1000);
            let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
            let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
            let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
            return `${h}:${mm}:${s}`;
        },
        orderStatus: function(status) {
            switch (status) {
                case 100:
                    return '待付款';
                case 101:
                    return '已关闭';
                case 102:
                    return '已关闭';
                case 103:
                    return '已关闭';
                case 201:
                    return '待发货';
                case 202:
                    return '待收货';
                case 203:
                    return '已收货';
                case 204:
                    return '已完成';
            }
        },
        getAfter: function(after) {
            if (after.status === 200) {
                if (after.type === 0) {
                    return "已退款";
                } else if (after.type === 1) {
                    return "已退款";
                } else if (after.type === 2) {
                    return "已换货";
                }
            } else if (after.status === 101) {
                return "已拒绝";
            } else if (after.status === 201) {
                return "已拒绝";
            } else {
                return "售后中";
            }
        }
    }
};
</script>
<style scoped lang="scss">
.le-form-card {
    border-radius: 16px;
}

.he-logistics__title {
    width: 59px;
    height: 14px;
    font-size: 14px;
    font-weight: 500;
    color: #8C8C8C;
    line-height: 22px;
}

.he-logistics__value {
    width: 82px;
    height: 14px;
    font-size: 14px;
    font-weight: 500;
    color: #262626;
    line-height: 22px;
    margin-right: 50px;

}

.he-link-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
}

.he-step {
    height: 249px;
    margin-left: 12px;

    /deep/ .el-card__body,
    .el-row--flex {
        width: 100%;
    }

    /deep/ .el-card__body {
        height: 100%;

        >.is-align-middle.el-row--flex {
            height: 100%;
        }
    }

    .he-img__box.he-img__active {
        color: #623CEB;
    }

    .he-img__box.he-img__noActive {
        color: #bbbfc8;
    }

    .he-img__box.he-img__noSelect {
        color: #ffffff;
        background: #623CEB;
    }

    .he-img__box.he-img__select {
        color: #ffffff;
        background: #623CEB;
    }

    .he-transition {
        .he-select {
            background: #623CEB;
        }

        .he-row-select {
            border-color: #623CEB;
        }

        .he-noSelect {
            background: #bbbfc8;
        }

        .he-row-noSelect {
            border-color: #bbbfc8;
        }
    }

    .he-buyer-orders {
        .he-img__box {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        .img {
            width: 32px;
            height: 32px;
        }
    }

    .he-buyer-payment {
        .he-img__box {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        .img {
            width: 32px;
            height: 32px;
        }
    }

    .he-buyer-shipment {
        .he-img__box {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        .img {
            width: 32px;
            height: 32px;
        }
    }

    .he-buyer-receiving {
        .he-img__box {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        .img {
            width: 32px;
            height: 32px;
        }
    }

    .he-successful-transaction {
        .he-img__box {
            width: 56px;
            height: 56px;
            border-radius: 50%;
        }

        .img {
            width: 32px;
            height: 32px;
        }
    }

    .he-transition {
        width: 64px;
        height: 56px;
        position: relative;

        .he-row {
            width: 12px;
            height: 12px;
            border-width: 2px;
            border-style: solid;
            border-top: none;
            border-right: none;
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translate(-50%, -50%) rotate(-135deg);
        }

        .he-dots {
            width: 5px;
            height: 5px;
            border-radius: 50%;
        }

        .he-dot-bar {
            width: 40px;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }

    .he-title {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        opacity: 0.85;
        text-align: center;
        margin-top: 17px;
    }

    .he-time {
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        opacity: 0.45;
        text-align: center;
    }
}

.he-do-info {
    height: 249px;
    padding: 0px 20px;

    .he-status {
        font-size: 20px;
        font-weight: bold;
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
        margin-bottom: 10px;
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
        margin-right: 8px;
        padding: 10px 24px;
        font-size: 12px;
        font-weight: 600;
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
    width: 293px;
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
/deep/.has-gutter .cell {
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

.he-note /deep/.el-card__body {
    .he-note__edit {
        font-size: 16px !important;
        display: inline-block;
        margin-right: 12px;
        color: #BBBFC8;
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


}

.he-info {
    .he-form__line {
        border-right: 1px solid #DCDFE6;
    }

    /deep/.el-card__body {
        padding: 24px 0;
    }

    .he-title {
        font-size: 16px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
        margin-bottom: 10px;
    }

    .he-info__box {
        padding-left: 24px;
        padding-right: 24px;
    }

    .he-edit__price {
        margin-left: 5px;
        font-size: 16px !important;
        color: #BBBFC8;
        cursor: pointer;
    }

    .he-value {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 22px;
        opacity: 0.85;
        margin-left: 9px;
    }

    .he-info__item {
        .he-label {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 22px;
            opacity: 0.45;
        }


    }
}

/deep/.el-table thead th {
    height: 40px;
    padding: 0;
    margin: 0px;
    background-color: #F5F7FA;
}

.he-purple {
    color: #623CEB !important;
}

#copy-tracking-number {
    background-color: #ffffff;
    border: none;
    opacity: 0;
    position: absolute;
    z-index: -10;
}

/deep/.is-always-shadow {
    box-shadow: none;
}

.le-matter /deep/.el-tabs--card>.el-tabs__content {
    box-shadow: none;
}

.he-goods__img__box {
    position: relative;
    width: 80px;
    height: 80px;
    background: #F2F2F2;
    margin-right: 12px;

    .he-goods__img {
        position: absolute;
        width: 80px;
        height: 80px;
    }

    .he-goods__after {
        width: 80px;
        height: 24px;
        line-height: 24px;
        background-color: #F5212D;
        color: #fff;
        font-size: 12px;
        bottom: 0;
        text-align: center;
        position: absolute;
        cursor: pointer;

        .he-goods__after__icon {
            font-size: 10px !important;
        }
    }
}
</style>