<template>
    <div class="le-matter">
        <el-row class="he-header el-row--flex">
            <el-col :span="3">
                筛选条件
            </el-col>
            <el-col :span="21">
                <div class="he-item">
                    {{value.search_key_label}} : {{value.search}}
                </div>
                <div class="he-item">
                    售后类型：{{value.type === '' ? '全部' : value.type === 0 ? '仅退款' : value.type === 1 ? '退货退款' : '换货'}}
                </div>
                <div class="he-item">
                    订单来源：{{value.source === '' ? '全部' : value.source === 'weapp' ? '微信小程序' : '公众号'}}
                </div>
                <div class="he-item">
                    申请售后时间：{{ value.time_start | getTime}} ~ {{ value.time_end | getTime}}
                </div>
            </el-col>
        </el-row>
        <el-row class="le-line">
        </el-row>
        <el-row class="he-checkbox">
            <el-col :span="24">
                <el-checkbox :indeterminate="order" v-model="isOrder">
                </el-checkbox>
                <span class="he-order">
                    订单信息
                </span>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.order_sn">
                    订单号
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.after_sn">
                    售后订单号
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.created_time">
                    申请售后时间
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.type">
                    售后类型
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.return_reason">
                    申请理由
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.status">
                    售后状态
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.goods_name">
                    商品名称
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.goods_param">
                    规格
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.goods_number">
                    数量
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.buyer">
                    买家
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.consignee_name">
                    收货人
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.consignee_mobile">
                    收货人手机号
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.consignee_address">
                    收货人地址
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.user_logistics_company">
                    买家发货物流公司
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.user_freight_sn">
                    买家发货物流单号
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.merchant_logistics_company">
                    卖家发货物流公司
                </el-checkbox>
            </el-col>
            <el-col :span="6">
                <el-checkbox class="he-box" @change="change" v-model="order_data.merchant_freight_sn">
                    卖家发货物流单号
                </el-checkbox>
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="6">
            </el-col>
        </el-row>
        <heloading v-model="load"></heloading>
    </div>
</template>
<script>
import heloading from "@/components/heloading.vue";
export default {
    name: "afterOrderExport",
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
                "name": "订单号",
                "value": "order_sn"
            }, {
                "name": "售后订单编号",
                "value": "after_sn"
            }, {
                "name": "申请售后时间",
                "value": "created_time"
            }, {
                "name": "售后类型",
                "value": "type"
            }, {
                "name": "申请理由",
                "value": "return_reason"
            }, {
                "name": "售后状态",
                "value": "status"
            }, {
                "name": "商品名称",
                "value": "goods_name"
            }, {
                "name": "规格",
                "value": "goods_param"
            }, {
                "name": "数量",
                "value": "goods_number"
            }, {
                "name": "买家",
                "value": "buyer"
            }, {
                "name": "收货人",
                "value": "consignee_name"
            }, {
                "name": "收货人手机号",
                "value": "consignee_mobile"
            }, {
                "name": "收货地址",
                "value": "consignee_address"
            }, {
                "name": "买家发货物流公司",
                "value": "user_logistics_company"
            }, {
                "name": "买家发货物流单号",
                "value": "user_freight_sn"
            }, {
                "name": "卖家发货物流公司",
                "value": "merchant_logistics_company"
            }, {
                "name": "卖家发货物流单号",
                "value": "merchant_freight_sn"
            }],
            order_data: {
                order_sn: false,
                after_sn: false,
                created_time: false,
                type: false,
                return_reason: false,
                status: false,
                goods_name: false,
                goods_param: false,
                goods_number: false,
                buyer: false,
                consignee_name: false,
                consignee_mobile: false,
                consignee_address: false,
                user_logistics_company: false,
                user_freight_sn: false,
                merchant_logistics_company: false,
                merchant_freight_sn: false,
            }
        }
    },
    methods: {
        change() {
            let orderCount = 0;
            for (let key in this.order_data) {
                if (this.order_data[key]) {
                    orderCount++;
                }
            }
            this.order = orderCount > 0 && orderCount < Object.keys(this.order_data).length;
        },
        affirm(e) {
            this.load = {
                show:true,
                type:1
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
            this.$heshop.export('post', { include: 'orderafter' }, {
                conditions: {
                    ...this.value,
                },
                parameter: order
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
<style lang="scss" scoped="">
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