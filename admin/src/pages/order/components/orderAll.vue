<template>
    <div class="he-matter">
        <el-row class="he-header">
            <el-col :span="6">商品描述</el-col>
            <el-col :span="4">单价/数量</el-col>
            <el-col :span="3">买家/收货人</el-col>
            <el-col :span="3">实付金额</el-col>
            <el-col :span="3">支付方式</el-col>
            <el-col :span="3">订单状态</el-col>
            <el-col :span="2">操作</el-col>
        </el-row>
        <div class="he-body" v-loading="loading">
            <div class="he-item" v-for="(item, index1) in value" :key="item.id">
                <el-row class="he-item__header">
                    <el-col :span="3" class="he-item__time">
                        {{item.created_time | timeFormat('yyyy-mm-dd hh:MM:ss')}}
                    </el-col>
                    <el-col :span="4" style="height: 48px;">
                        <span class="he-item__sn__title">
                           订单号：
                        </span>
                        <span class="he-item__sn">
                            {{item.order_sn}}
                        </span>
                    </el-col>
                    <el-col :span="3" type="flex" class="he-platform el-row--flex is-align-middle">
                        <he-icon class="he-platform__icon" size="18px" :type="item.source === 'weapp' ? 'le-icon-xiaochengxu' : item.source === 'wechat' ? 'le-icon-wehcat' : ''"></he-icon>
                        {{item.source === 'weapp' ? '微信小程序' : item.source === 'wechat' ? '公众号' : ''}}
                    </el-col>
                    <el-col :span="10" style="opacity: 0">1</el-col>
                    <el-col :span="4" class="he-remarks el-row--flex is-justify-end is-align-middle">
                        <el-popover v-if="item.note && item.is_recycle === 0" placement="top-end" max-width="400" trigger="hover" :content="item.note">
                            <he-icon slot="reference" style="color:#FBAD15;"
                                     title="商家备注"
                                     :id="item.id + '_note__edit'"
                                     width="480" top="35vh"
                                     v-popup.merchantNotes="item"
                                     module="order"
                                     class="he-remarks__icon" type="le-icon-note"></he-icon>
                        </el-popover>
                        <div v-if="!item.note && item.is_recycle === 0" title="商家备注"
                             :id="item.id + '_note'"
                             width="480" top="35vh"
                             v-popup.merchantNotes="item"
                             module="order">
                            <he-icon style="color: #DCDFE6;" class="he-remarks__icon" type="le-icon-note"></he-icon>
                        </div>
                        <he-icon v-if="item.status === 204 || item.status === 101 || item.status === 102 || item.status === 103" @click.native="openDelete(item)"
                                     style="color: #DCDFE6;margin-left: 10px;" class="he-remarks__icon" type="le-icon-trash"></he-icon>
                    </el-col>
                </el-row>
                <el-row class="he-item__body el-row--flex">
                    <el-col class="he-product" :span="10">
                        <el-row class="he-goods" v-for="(good, index2) in item.goods.slice(0,3)" :key="index2">
                            <el-col :span="16" class="el-row--flex">
                                <div class="he-goods__img__box">
                                    <img class="he-goods__img" :src="good.goods_image" alt="">
                                    <he-link href="order/afterDetail" :query="{order_goods_id:good.id}">
                                        <div class="he-goods__after" v-if="good.after_sales">
                                            {{good.after | getAfter}}
                                            <he-icon class="he-goods__after__icon" type="le-icon-arrow-right"></he-icon>
                                        </div>
                                    </he-link>
                                </div>
                                <div class="he-name-attr">
                                    <div class="he-name">{{good.goods_name}}</div>
                                    <div class="he-attr">{{good.show_goods_param}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="he-price">￥{{good.goods_price}}</div>
                                <div class="he-price">×{{good.goods_number}}</div>
                            </el-col>
                        </el-row>
                        <el-row v-if="item.goods.length > 3" class="he-goods__more">
                            <he-link href="order/orderDetail" :query="{id: item.id}">
                                查看更多商品>
                            </he-link>
                        </el-row>
                    </el-col>
                    <el-col class="he-buyer-consignee he-vertical__center" :span="3">
                        <div class="he-buyer">{{item.user.nickname}}</div>
                        <div class="he-consignee ">
                            <p class="he-consignee__text">{{item.buyer.name}}</p>
                            <p class="he-consignee__text">{{item.buyer.mobile}}</p>
                        </div>
                    </el-col>
                    <el-col class="he-actually-paid he-vertical__center" :span="3">
                        <div class="he-price">￥{{item.pay_amount}}</div>
                        <div class="he-shipping">（含运费￥{{item.freight_amount}}）</div>
                        <he-icon v-if="item.status === 100" type="le-icon-editor" class="he-edit__price"
                                 :id="item.id + '_price'" :title="'修改价格'"
                                 width="431" v-popup.modifyPrice="item" module="order"></he-icon>
                    </el-col>
                    <el-col class="he-payment-method he-vertical__center" :span="3">
                        {{item.pay_type | getPayType}}
                    </el-col>
                    <el-col class="he-order-status he-vertical__center" :span="3">
                        <div class="he-status">{{item.status | orderStatus}}</div>
                        <div v-if="item.is_recycle !== 1">
                            <he-link href="order/orderDetail" :query="{id: item.id}">
                                <el-button type="text" class="he-click">订单详情</el-button>
                            </he-link>
                        </div>
                        <div v-if="item.is_recycle !== 1">
                            <el-button type="text" class="he-click" title="物流信息" :hide_cancel="true" sure_btn="我知道了" v-if="item.status >= 202 && item.freight" :width="item.freight && item.freight.type ===1?415:283" module="order" top="35vh" :id="item.id +'_logistics_information'" v-popup.logisticsInformation="item">查看物流</el-button>
                        </div>
                    </el-col>
                    <el-col class="he-operating he-vertical__center" :span="2">
                        <div v-if="item.status === 201">
                            <el-button v-show="item.status === 201" type="text" module="order" title="订单发货" :style="afterShow(item)?'color:#DCDFE6;':''" :id="item.id+'_shipping'" width="512" class="he-click" :disabled="afterShow(item)" v-popup.orderShipping="{index: index1, item: item}" action="onReload">发货</el-button>
                        </div>
                        <div v-show="item.status === 100">
                            <popconfirm @confirm="cancelItem({index: index1, item: item})" title="订单取消请谨慎操作，确定取消？" width="392px" top="35vh">
                                <el-button type="text" class="he-click">取消订单</el-button>
                            </popconfirm>
                        </div>
                        <div v-show="item.status === 201">
                            <el-button type="text" title="修改地址" :style="afterShow(item)?'color:#DCDFE6;':''" width="524" module="order" top="35vh" :id="item.id +'_change_address'" :disabled="afterShow(item)" class="he-click" v-popup.changeAddress="{index: index1, item: item}">修改地址</el-button>
                        </div>
                        <div v-show="item.status === 202">
                            <el-button type="text" title="修改物流"
                                       :style="afterShow(item)?'color:#DCDFE6;':''"
                                       width="524" module="order" top="35vh"
                                       :id="item.id +'_modify_logistics'"
                                       :disabled="afterShow(item)"
                                       class="he-click"
                                       v-popup.modifyLogistics="{index: index1, item: item}">修改物流</el-button>
                        </div>
                        <div v-show="item.status === 202">
                            <popconfirm :disabled="afterShow(item)" @confirm="confirmReceipt({index: index1, item: item})" title="确认收货请谨慎操作，确定买家已收货？" width="440px" top="35vh">
                                <el-button type="text" :style="afterShow(item)?'color:#DCDFE6;':''" :disabled="afterShow(item)" class="he-click">确认收货</el-button>
                            </popconfirm>
                        </div>
                        <div v-if="item.is_recycle === 1">
                            <popconfirm @confirm="restoreItem({item: item})" title="确定恢复该订单？" width="392px" top="35vh">
                                <el-button type="text" class="he-click">恢复</el-button>
                            </popconfirm>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="he-item__footer" v-if="item.buyer.note">
                    <el-col :span="24">买家留言：{{item.buyer.note}}</el-col>
                </el-row>
            </div>
        </div>
        <div class="el-row--flex is-justify-end he-footer">
            <div class="he-tabpane-pagination ">
                <el-pagination background @current-change="currentChange" :current-page="page.current" :page-count="page.count" layout=" prev, pager, next, jumper">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import popconfirm from "../../../components/popconfirm.vue";
export default {
    components: {
        popconfirm
    },
    name: "orderAll",
    props: {
        value: {
            type: Array
        },
        page: {
            type: Object
        },
        loading: {
            type: Boolean
        }
    },
    methods: {
        currentChange(e) {
            this.page.current = e;
            this.$emit('request', this.page);
        },
        deleteItem(e) {
            if (e.item.is_recycle === 1) {
                this.$heshop.recycle('delete', e.item.id, { include: 'order' }).then(() => {
                    this.$message.success('删除成功');
                    this.onReload();
                }).catch(err => {
                    this.$message.error(err.data.message);
                });
            } else {
                this.$heshop.order('delete', e.item.id).then(() => {
                    this.$message.success('删除成功');
                    this.onReload();
                }).catch(err => {
                    this.$message.error(err.data.message);
                });
            }
        },
        restoreItem: function(e) {
            this.$heshop.recycle('put', { id: e.item.id, include: 'order' }, null).then(() => {
                this.$message.success('恢复成功');
                this.onReload();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        cancelItem(e) {
            this.$heshop.order('put', { id: e.item.id, behavior: 'cancel' }, null).then(res => {
                this.$message.success('取消成功');
                this.$set(this.value[e.index], 'status', res.status);
                this.onReload();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        confirmReceipt(e) {
            this.$heshop.order('put', { id: e.item.id, behavior: 'received' }, null).then(res => {
                this.$message.success('收货成功');
                this.$set(this.value[e.index], 'status', res.status);
                this.onReload();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        afterShow(item) {
            let goods = item.goods;
            let status = false;
            for (let i = 0; i < goods.length; i++) {
                status = goods[i].after_sales === 0 ? false : true;
                if (!status) {
                    break;
                }
            }
            return status;
        },
        onReload() {
            this.$emit('count');
        },
        openDelete: function (item) {
            let str = '订单删除请谨慎操作，确定删除？';
            if (item.status === 102) {
                str = '彻底删除后订单无法恢复，确定删除？'
            }
            this.$confirm(str,  {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                this.deleteItem({item});
            }).catch(() => {
            });
        }
    },
    filters: {
        orderStatus: function(status) {
            switch (status) {
                case 100:
                    return '待付款';
                case 101:
                case 102:
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
}
</script>
<style scoped lang="scss">
.he-matter {
    min-width: 1600px;
}

.he-header {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 0.85;
    background: #F5F7FA;
}

.he-item {
    margin-top: 12px;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
}

.he-item__header {
    height: 48px;
    line-height: 48px;
    background: #F5F7FA;
}

.he-item__time {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 0.85;
    padding-left: 20px;
}

.he-item__sn {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 0.85;
}

.he-item__sn__title {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 0.45;
}

.he-platform__icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
}

.he-platform {}

.he-remarks {
    height: 48px;
    padding-right: 25px;

    >span {
        height: 48px;
    }
}

.he-remarks__icon {
    font-size: 20px !important;
    width: 18px;
    height: 16px;
    cursor: pointer;
    line-height: 48px;
    /*margin: 15px 0;*/
}

.he-vertical__center {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}

.he-product {
    border-right: 1px solid #DCDFE6;

    .he-goods__more {
        height: 41px;
        line-height: 41px;
        color: #595959;
        font-size: 12px;
        text-align: center;
        cursor: pointer;
    }

    .he-goods {
        padding: 20px;

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



        .he-name {
            width: 233px;
            font-size: 14px;
            font-weight: 500;
            color: #010101;
            opacity: 0.85;
        }

        .he-attr {
            font-size: 12px;
            width: 233px;
            font-weight: 500;
            color: #010101;
            opacity: 0.65;
            margin-top: 6px;
        }

        .he-price {
            font-size: 14px;
            font-weight: 500;
            color: #000000;
            line-height: 22px;
            opacity: 0.85;
            text-align: center;
        }
    }

    .he-goods:not(:last-child) {
        border-bottom: 1px solid #DCDFE6;
    }
}

.he-buyer-consignee {
    padding: 6px;
    border-right: 1px solid #DCDFE6;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .he-buyer {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 18px;
        opacity: 0.85;
        text-align: center;
        margin-top: 13px;
        margin-bottom: 12px;
    }

    .he-consignee {
        width: 100%;
        height: 60px;
        line-height: 60px;
        background: #F5F7FA;
        border-radius: 8px;
        padding-top: 10px;
    }

    .he-consignee__text {
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        line-height: 18px;
        opacity: 0.85;
        margin: 0;
        text-align: center;
    }
}

.he-actually-paid {
    border-right: 1px solid #DCDFE6;
    padding: 19px 20px 20px 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .he-price {
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        color: #000000;
        opacity: 0.85;
    }

    .he-shipping {
        font-size: 12px;
        font-weight: 500;
        color: #000000;
        opacity: 0.45;
    }

    .he-edit__price {
        width: 14px;
        height: 14px;
        margin-top: 9px;
        cursor: pointer;
        color: #bbbfc8;
    }
}

.he-payment-method {
    font-size: 14px;
    border-right: 1px solid #DCDFE6;
    text-align: center;
    padding-top: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.he-status {
    font-size: 14px;
    margin-top: 18px;
}

.he-order-status {
    border-right: 1px solid #DCDFE6;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.he-operating {
    padding-top: 18px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.he-item__footer {
    height: 32px;
    line-height: 32px;
    border-radius: 4px;
    background: #fff5d1;
    font-size: 12px;
    font-weight: 500;
    color: #000000;
    opacity: 0.85;
    padding: 0 20px;
}

.he-footer {
    padding: 16px 0 0 0;
}

.he-delete-order {
    width: 16px;
    height: 18px;
    background-color: pink;
    cursor: pointer;
}

.he-click {
    font-size: 14px;
    font-weight: 500;
    color: #623CEB;
    padding: 4px 16px;
}

.he-more-goods {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #595959;
    cursor: pointer;
}
.he-click {
    padding: 0 !important;
    font-size: 14px!important;
}
</style>
