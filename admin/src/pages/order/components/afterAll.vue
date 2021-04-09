<template>
  <div class="le-matter">
        <el-row class="he-header">
            <el-col :span="6">商品描述</el-col>
            <el-col :span="4">单价/数量</el-col>
            <el-col :span="3">买家/收货人</el-col>
            <el-col :span="6">退款件数/退款金额</el-col>
            <el-col :span="3">订单状态</el-col>
            <el-col :span="2">操作</el-col>
        </el-row>
        <div class="he-body" v-loading="loading">
            <div class="he-item" v-for="(item, index1) in value" :key="item.id">
                <el-row class="he-item__header">
                    <el-col :span="2" class="he-item__type">
                        <span class="he-tag__type">{{item.type === 0 ? '仅退款' : item.type === 1 ? '退货退款' : item.type === 2 ? '换货' : ''}}</span>
                    </el-col>
                    <el-col :span="3" class="he-item__time">
                        {{item.created_time | timeFormat('yyyy-mm-dd hh:MM:ss')}}
                    </el-col>
                    <el-col :span="4" style="height: 48px;margin-left: 20px;">
                        <span class="he-item__sn__title">
                            售后订单号：
                        </span>
                        <span class="he-item__sn">
                            {{item.after_sn}}
                        </span>
                    </el-col>
                    <el-col :span="3" class="he-platform el-row--flex is-align-middle">
                        <he-icon class="he-platform__icon" size="18px" :type="item.source === 'weapp' ? 'le-icon-xiaochengxu' : item.source === 'wechat' ? 'le-icon-wehcat' : ''"></he-icon>
                        {{item.source === 'weapp' ? '微信小程序' : item.source === 'wechat' ? '公众号' : ''}}
                    </el-col>
                    <el-col :span="7" style="opacity: 0">1</el-col>
                    <el-col :span="4" class="he-remarks el-row--flex is-justify-end is-align-middle">
                        <el-popover v-if="item.note" placement="top-start" width="200" trigger="hover" :content="item.note">
                            <img class="he-remarks__icon" slot="reference" src="" alt="">
                        </el-popover>
                    </el-col>
                </el-row>
                <el-row class="he-item__body el-row--flex">
                    <el-col class="he-product" :span="10">
                        <el-row class="he-goods">
                            <el-col :span="16" class="el-row--flex">
                                <img class="he-goods__img" :src="item.goods.goods_image" alt="">
                                <div class="he-name-attr">
                                    <div class="he-name">{{item.goods.goods_name}}</div>
                                    <div class="he-attr">{{item.goods.show_goods_param}}</div>
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div class="he-price">￥{{item.goods.goods_price}}</div>
                                <div class="he-price">×{{item.goods.goods_number}}</div>
                            </el-col>
                        </el-row>
                    </el-col>
                    <el-col class="he-buyer-consignee" :span="3">
                        <div class="he-buyer">{{item.user.nickname}}</div>
                        <div class="he-consignee ">
                            <p class="he-consignee__text">{{item.buyer.name}}</p>
                            <p class="he-consignee__text">{{item.buyer.mobile}}</p>
                        </div>
                    </el-col>
                    <el-col class="he-return he-vertical__center" :span="6">
                        <div>×{{item.return_number}}</div>
                        <div v-if="item.type !== 2">￥{{item.return_amount}}</div>
                    </el-col>
                    <el-col class="he-order-status he-vertical__center" :span="3">
                        <div class="he-status">{{item.status | orderStatus}}</div>
                        <div>
                            <he-link href="order/afterDetail" :query="{id: item.id}">
                                <el-button type="text" class="he-click">售后详情</el-button>
                            </he-link>
                        </div>
                    </el-col>
                    <el-col class="he-operating he-vertical__center" :span="2">
                        <template v-if="item.status === 100 || item.status === 102">
                            <div v-show="item.type === 0">
                                <el-button type="text" title="售后申请" width="344" module="order" top="30vh" :id="item.id +'_agree_after_sale'" action="onReload" sure_btn="同意售后" class="he-click" v-popup.agreeAfterSale="{item: item}">同意</el-button>
                            </div>
                            <div v-show="item.type === 1 || item.type === 2">
                                <el-button type="text" title="售后申请" width="707" module="order" top="30vh" :id="item.id +'_receive_refund'" action="onReload" sure_btn="同意并发送退货地址" class="he-click" v-popup.receiveRefund="{index: index1, item: item}">同意</el-button>
                            </div>
                            <div>
                                <el-button type="text" title="售后申请" width="704" module="order" top="30vh" :id="item.id +'_refuse_to_sell'" action="onReload" sure_btn="拒绝售后" class="he-click" v-popup.refuseToSell="{item: item}">拒绝</el-button>
                            </div>
                        </template>
                        <div v-show="item.status === 111">
                            <el-button type="text" title="退款" width="600" module="order" top="30vh" :id="item.id +'_only_refund'" action="onReload" sure_btn="确定退款" class="he-click" v-popup.onlyRefund="{ item: item}">退款</el-button>
                        </div>
                        <div v-show="item.status === 122">
                            <el-button type="text" title="确认收货并退款" width="600" module="order" top="30vh" :id="item.id +'_refunds'" action="onReload" sure_btn="确认收货并退款" class="he-click" v-popup.onlyRefund="{ item: item}">收货并退款</el-button>
                        </div>
                        <div v-show="item.status === 132">
                            <el-button type="text" title="确认收货并发货" width="524" module="order" top="30vh" :id="item.id +'_receive_exchange'" action="onReload" class="he-click" v-popup.receiveExchange="item">收货并换货</el-button>
                        </div>
                    </el-col>
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
    import popconfirm from "@/components/popconfirm.vue";
export default {
    components: {
        popconfirm
    },
    name: "afterAll",
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
        onReload() {
            this.$emit('count');
        }
    },
    filters: {
        orderStatus: function(status) {
            switch (status) {
                case 100:
                    return '待审核';
                case 101:
                    return '首次拒绝';
                case 102:
                    return '待审核（再次申请）';
                case 111:
                    return '待卖家退款';
                case 121:
                    return '待买家退货';
                case 122:
                    return '待卖家收货并退款';
                case 131:
                    return '待买家发货';
                case 132:
                    return '待卖家收货并换货';
                case 133:
                    return '待买家收货';
                case 200:
                    return '已完成';
                case 201:
                    return '已完成（已拒绝）';
            }
        }
    }
}
</script>
<style scoped lang="scss">
.le-matter {
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

.he-platform {
    margin-left: 20px;
}

.he-remarks {
    height: 48px;
    padding-right: 25px;
}

.he-remarks__icon {
    width: 18px;
    height: 16px;
    cursor: pointer;
    line-height: 48px;
    margin: 15px 0;
    background-color: rebeccapurple;
}

.he-product {
    border-right: 1px solid #DCDFE6;

    .he-goods {
        padding: 20px;

        .he-goods__img {
            width: 80px;
            height: 80px;
            background: #F2F2F2;
            margin-right: 12px;
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

.he-vertical__center {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
}

.he-actually-paid:hover .he-edit__price {
    opacity: 1;
}

.he-actually-paid {
    border-right: 1px solid #DCDFE6;
    padding: 19px 20px 20px 20px;
    cursor: pointer;
    text-align: center;

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
        background: red;
        opacity: 0;
        margin-top: 9px;
    }
}

.he-return {
    border-right: 1px solid #DCDFE6;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    opacity: 0.85;
}

.he-order-status {
    border-right: 1px solid #DCDFE6;
    text-align: center;
}

.he-operating {
    text-align: center;
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

.he-after-sale {
    width: 68px;
    height: 28px;
    line-height: 28px;
    background: #F5212D;
    border-radius: 0px 0px 8px 8px;
    color: #ffffff;
    margin: 0 auto;
}

.he-item__type {
    padding-left: 20px;

    .he-tag__type {
        display: inline-block;
        text-align: center;
        font-size: 14px;
        color: #623CEB;
        background: #F3F5F7;
        line-height: 1;
        border: 1px solid #623CEB;
        border-radius: 12px;
        padding: 5px 8px;
    }

}

.he-click {
    font-size: 14px;
    font-weight: 500;
    color: #623CEB !important;
    padding: 4px 16px !important;
}

.le-matter /deep/.is-always-shadow {
    box-shadow: none;
}

</style>
