<template>
    <div class="le-matter">
        <el-row class="he-header el-row--flex">
            <el-col :span="3">筛选条件</el-col>
            <el-col :span="21">
                <div class="he-item">{{value.search_key_label}}：--</div>
                <div class="he-item">支付方式：{{value.pay_type === 0 ? '全部' : value.pay_type === 1 ? '微信' : '支付宝'}}</div>
                <div class="he-item">订单来源：{{value.source === '' ? '全部' : value.source === 'weapp' ? '微信小程序' : 'H5'}}</div>
                <div class="he-item">下单时间：{{ value.time_start | getTime}} ~ {{ value.time_end | getTime}}</div>
            </el-col>
        </el-row>
        <el-row class="le-line"></el-row>
        <el-row class="he-checkbox">
            <el-col :span="24">
                <el-checkbox :indeterminate="order" v-model="isOrder"></el-checkbox>
                <span class="he-order">订单信息</span>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.source" @change="change">订单来源</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.pay_type" @change="change">支付方式</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.order_sn" @change="change">订单号</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.created_time" @change="change">下单时间</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.status" @change="change">订单状态</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.pay_time" @change="change">付款时间</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.received_time" @change="change">收货时间</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.finish_time" @change="change">完成时间</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.send_time" @change="change">发货时间</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.buyer" @change="change">买家</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.consignee_name" @change="change">收货人</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.consignee_mobile" @change="change">收货人联系方式</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.consignee_address" @change="change">收货人地址</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.pay_amount" @change="change">实付金额</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.freight_amount" @change="change">运费</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.logistics_company" @change="change">物流公司</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.freight_sn" @change="change">物流单号</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.user_note" @change="change">买家留言</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="order_data.merchant_note" @change="change">商家备注</el-checkbox>
            </el-col>
        </el-row>
        <el-row class="he-checkbox">
            <el-col :span="24">
                <el-checkbox :indeterminate="goods" v-model="isGoods"></el-checkbox>
                <span class="he-goods">商品信息</span>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_name" @change="change">商品名称</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_param" @change="change">规格</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_number" @change="change">数量</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_sn" @change="change">货号</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_price" @change="change">商品价格</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_pay_amount" @change="change">商品实付金额</el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" v-model="goods_data.goods_cost_price" @change="change">成本价</el-checkbox>
            </el-col>
        </el-row>
        <heloading v-model="load"></heloading>
    </div>
</template>
<script>
import heloading from "@/components/heloading.vue";
export default {
    name: "orderExport",
    props: {
        value: {
            type: Object
        }
    },
    components: {
        heloading
    },
    data() {
        return {
            load: {
                show: false,
                type: 1
            },
            goods: false,
            order: false,
            isGoods: false,
            isOrder: false,
            orderList: [{
                "name": "订单来源",
                "value": "source"
            }, {
                "name": "支付方式",
                "value": "pay_type"
            }, {
                "name": "订单号",
                "value": "order_sn"
            }, {
                "name": "下单时间",
                "value": "created_time"
            }, {
                "name": "订单状态",
                "value": "status"
            }, {
                "name": "付款时间",
                "value": "pay_time"
            }, {
                "name": "收货时间",
                "value": "received_time"
            }, {
                "name": "完成时间",
                "value": "finish_time"
            }, {
                "name": "发货时间",
                "value": "send_time"
            }, {
                "name": "买家",
                "value": "buyer"
            }, {
                "name": "收货人",
                "value": "consignee_name"
            }, {
                "name": "收货人联系方式",
                "value": "consignee_mobile"
            }, {
                "name": "收货地址",
                "value": "consignee_address"
            }, {
                "name": "实付金额",
                "value": "pay_amount"
            }, {
                "name": "运费",
                "value": "freight_amount"
            }, {
                "name": "物流公司",
                "value": "logistics_company"
            }, {
                "name": "物流单号",
                "value": "freight_sn"
            }, {
                "name": "买家备注",
                "value": "user_note"
            }, {
                "name": "商家备注",
                "value": "merchant_note"
            }],
            goodsList: [{
                "name": "商品名称",
                "value": "goods_name"
            }, {
                "name": "规格",
                "value": "goods_param"
            }, {
                "name": "数量",
                "value": "goods_number"
            }, {
                "name": "货号",
                "value": "goods_sn"
            }, {
                "name": "商品价格",
                "value": "goods_price"
            }, {
                "name": "商品实付价格",
                "value": "goods_pay_amount"
            }, {
                "name": "商品成本价",
                "value": "goods_cost_price"
            }],
            goods_data: {
                goods_name: false,
                goods_param: false,
                goods_number: false,
                goods_sn: false,
                goods_price: false,
                goods_pay_amount: false,
                goods_cost_price: false
            },
            order_data: {
                source: false,
                pay_type: false,
                order_sn: false,
                created_time: false,
                status: false,
                pay_time: false,
                received_time: false,
                finish_time: false,
                send_time: false,
                buyer: false,
                consignee_name: false,
                consignee_mobile: false,
                consignee_address: false,
                pay_amount: false,
                freight_amount: false,
                logistics_company: false,
                freight_sn: false,
                user_note: false,
                merchant_note: false
            }
        }
    },
    methods: {
        change() {
            let goodsCount = 0;
            let orderCount = 0;
            for (let key in this.goods_data) {
                if (this.goods_data[key]) {
                    goodsCount++;
                }
            }
            for (let key in this.order_data) {
                if (this.order_data[key]) {
                    orderCount++;
                }
            }
            this.goods = goodsCount > 0 && goodsCount < Object.keys(this.goods_data).length;
            this.order = orderCount > 0 && orderCount < Object.keys(this.order_data).length;
        },
        affirm(e) {
            this.load = {
                show: true,
                type: 1
            }
            let order = [];
            for (let key in this.order_data) {
                if (this.order_data[key]) {
                    for (let i = 0; i < this.orderList.length; i++) {
                        if (this.orderList[i].value === key) {
                            order.push(this.orderList[i]);
                        }
                    }
                }
            }
            let goods = [];
            for (let key in this.goods_data) {
                if (this.goods_data[key]) {
                    for (let i = 0; i < this.goodsList.length; i++) {
                        if (this.goodsList[i].value === key) {
                            goods.push(this.goodsList[i]);
                        }
                    }
                }
            }
            this.$heshop.export('post', { include: 'order' }, {
                conditions: {
                    ...this.value,
                },
                parameter: {
                    order: order,
                    goods: goods
                }
            }).then(() => {
                let { handleClose } = e;
                handleClose();
                this.$set(this.load,'show',false)
            }).catch(err => {
                this.$message.error('导出失败,请重试');
            });
        }
    },
    watch: {
        isGoods: {
            handler(newVal) {
                let bool = false;
                if (newVal) {
                    bool = true;
                    this.goods = false;
                } else {
                    bool = false;
                }
                for (let key in this.goods_data) {
                    this.goods_data[key] = bool;
                }
            }
        },
        isOrder: {
            handler(newVal) {
                let bool = false;
                if (newVal) {
                    this.order = false;
                    bool = true;
                } else {
                    bool = false;
                }
                for (let key in this.order_data) {
                    this.order_data[key] = bool;
                }
            }
        }
    },
    filters: {
        getTime: function(time) {
            if (time) {
                time = new Date(time * 1000);
                let y = time.getFullYear();
                let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
                let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
                let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
                return `${y}-${m}-${d} ${h}:${mm}:${s}`;
            } else {
                return '--'
            }
        },
    }
};
</script>
<style scoped lang="scss">
.le-matter {
    padding: 0 80px;
}

.he-header {
    width: 720px;
    background: #F3F5F7;
    border-radius: 4px;
    padding: 16px 24px 6px 24px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

.he-item {
    margin-right: 40px;
    margin-bottom: 10px;
    display: inline-block;
}

.he-order,
.he-goods {
    display: inline-block;
    margin-left: 5px;
    height: 15px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

.he-checkbox .el-col {
    margin-bottom: 15px;
}

.he-box /deep/ .el-checkbox__label {
    color: RGBA(128, 128, 128, 0.85)
}
</style>