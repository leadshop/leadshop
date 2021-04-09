<template>
    <div class="le-matter le-panel">
        <div class="flex">
            <div class="he-box he-store flex flex-direction align-center">
                <img :src="getStore.logo" alt="" class="he-img">
                <div class="he-status" :class="store_setting.run_status ? '' : 'he-status__text-1'">
                    <span class="he-status__text">
                        {{store_setting.run_status ? '营业中':'打烊中'}}
                    </span>
                </div>
                <div class="he-name">
                    {{store_setting.name}}
                </div>
                <div class="he-button flex align-center justify-center">
                    <div class="he-left" @click="navigatorTo('/setup/index')">
                        设置
                    </div>
                    <div>
                        |
                    </div>
                    <div class="he-right" module="goods" title="推广" :hide_footer="true" type="text" v-popup.promote="{
                                            data: '',
                                            promoteType: 'index'
                                       }" width="791">
                        推广
                    </div>
                </div>
            </div>
            <div class="he-right-box">
                <div class="flex he-order-user">
                    <div class="he-box he-order flex">
                        <div class="flex-sub flex flex-direction align-center justify-center" style="cursor: pointer;" @click="navigatorTo('/order/index', {
                            tab: 'unpaid'
                        })">
                            <span class="he-top he-top-hover">
                                {{store_count.unpaid}}
                            </span>
                            <span class="he-bottom">
                                待付款订单
                            </span>
                        </div>
                        <div class="flex-sub flex flex-direction align-center justify-center" style="cursor: pointer;" @click="navigatorTo('/order/index', {
                            tab: 'unsent'
                        })">
                            <span class="he-top he-top-hover">
                                {{store_count.unsent}}
                            </span>
                            <span class="he-bottom">
                                待发货订单
                            </span>
                        </div>
                        <div class="flex-sub flex flex-direction align-center justify-center" style="cursor: pointer;" @click="navigatorTo('/order/after')">
                            <span class="he-top he-top-hover">
                                {{store_count.order_after}}
                            </span>
                            <span class="he-bottom">
                                售后订单
                            </span>
                        </div>
                    </div>
                    <div class="he-box he-user flex">
                        <div class="flex-sub flex flex-direction align-center justify-center " @click="navigatorTo('/users/index')" style="cursor: pointer;">
                            <span class="he-top he-top-hover">
                                {{store_count.user_number}}
                            </span>
                            <span class="he-bottom">
                                总用户数
                            </span>
                        </div>
                        <div class="flex-sub flex flex-direction align-center justify-center">
                            <span class="he-top">
                                ￥{{store_count.income_amount}}
                            </span>
                            <div>
                                <span class="he-bottom">
                                    订单总收入
                                </span>
                                <el-popover content="过售后订单收入" placement="top" trigger="hover">
                                    <he-icon class="he-annotation" slot="reference" type="le-icon-annotation">
                                    </he-icon>
                                </el-popover>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="he-box he-entrance">
                    <div class="he-top flex justify-between">
                        <div class="flex align-center">
                            <div class="he-sign">
                            </div>
                            <div class="he-title">
                                快捷入口
                            </div>
                        </div>
                    </div>
                    <div class="he-bottom flex">
                        <div class="flex-sub flex align-center" @click="navigatorTo('/goods/publish')">
                            <div class="he-button flex align-center justify-center le-icon-share"></div>
                            <div class="he-text">
                                发布商品
                            </div>
                        </div>
                        <div class="flex-sub flex align-center" @click="navigatorTo('/store/index')">
                            <div class="he-button flex align-center justify-center le-icon-home">
                            </div>
                            <div class="he-text">
                                店铺装修
                            </div>
                        </div>
                        <div class="flex-sub flex align-center" @click="navigatorTo('/users/index')">
                            <div class="he-button flex align-center justify-center le-icon-user-manage">
                            </div>
                            <div class="he-text">
                                用户管理
                            </div>
                        </div>
                        <div class="flex-sub flex align-center" @click="navigatorTo('/order/index')">
                            <div class="he-button flex align-center justify-center le-icon-orders">
                            </div>
                            <div class="he-text">
                                订单管理
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="he-box he-data">
            <div class="he-top flex justify-between">
                <div class="flex align-center">
                    <div class="he-sign">
                    </div>
                    <div class="he-title">
                        经营数据
                    </div>
                </div>
            </div>
            <div class="he-bottom flex">
                <div class="flex-sub he-visitors">
                    <div class="he-data__canvas">
                        <div>
                            {{today_count.today_visit}}
                        </div>
                        <div>
                            访客数
                        </div>
                    </div>
                    <div class="he-box__item" id="he-visitors">
                    </div>
                </div>
                <div class="flex-sub he-pay-amount">
                    <div class="he-data__canvas">
                        <div>
                            ¥{{today_count.today_pay_amount}}
                        </div>
                        <div>
                            支付金额
                        </div>
                    </div>
                    <div class="he-box__item" id="he-pay-amount">
                    </div>
                </div>
                <div class="flex-sub he-visitors">
                    <div class="he-data__canvas">
                        <div>
                            {{today_count.today_num_order}}
                        </div>
                        <div>
                            支付订单数
                        </div>
                    </div>
                    <div class="he-box__item" id="he-num-order">
                    </div>
                </div>
                <div class="flex-sub he-visitors">
                    <div class="he-data__canvas">
                        <div>
                            {{today_count.today_num_buyer}}
                        </div>
                        <div>
                            支付买家数
                        </div>
                    </div>
                    <div class="he-box__item" id="he-num-buyer">
                    </div>
                </div>
            </div>
        </div>
        <div class="he-sale-buy flex justify-between">
            <div class="he-box he-sale">
                <div class="he-top flex justify-between">
                    <div class="flex align-center">
                        <div class="he-sign">
                        </div>
                        <div class="he-title">
                            商品销量排行
                        </div>
                    </div>
                    <el-button class="he-button" type="primary" @click="exportData('sale')">
                        导出
                    </el-button>
                </div>
                <div class="he-bottom">
                    <el-table :default-sort="{prop: 'sales_amount', order: 'descending'}" :data="sale_list" :height="599" style="width: 100%" @sort-change="sortGoods">
                        <el-table-column label="排名" width="65">
                            <template slot-scope="scope">
                                <div class="flex justify-start align-center">
                                    <span class="he-table-text" v-if="((sale_page.current - 1)* sale_page.size) + scope.$index+1 > 3">
                                        {{((sale_page.current - 1)* sale_page.size)+ scope.$index+1 | getIndex}}
                                    </span>
                                    <img v-else-if="((sale_page.current - 1)* sale_page.size) + scope.$index+1  === 1" src="./image/he-rank-1.png" alt="">
                                    <img v-else-if="((sale_page.current - 1)* sale_page.size) + scope.$index+1  ===2" src="./image/he-rank-2.png" alt="">
                                    <img v-else-if="((sale_page.current - 1)* sale_page.size) + scope.$index+1  === 3" src="./image/he-rank-3.png" alt="">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品">
                            <template slot-scope="scope">
                                <span class="he-line-1 he-goods-name">
                                    {{scope.row.name}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="销售额" prop="sales_amount" width="200px" sortable="custom">
                            <template slot-scope="scope">
                                <span class="he-table-text">
                                    ￥{{scope.row.sales_amount}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="销量" prop="sales" width="200px" sortable="custom">
                            <template slot-scope="scope">
                                <span class="he-table-text">
                                    {{scope.row.sales}}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="he-footer flex justify-end">
                    <el-pagination background :current-page="sale_page.current" :page-count="sale_page.count" @current-change="currentChange($event,'sale')" layout="prev, pager, next, jumper">
                    </el-pagination>
                </div>
            </div>
            <div class="he-box he-buy">
                <div class="he-top flex justify-between">
                    <div class="flex align-center">
                        <div class="he-sign">
                        </div>
                        <div class="he-title">
                            用户购买力排行
                        </div>
                    </div>
                    <el-button class="he-button" type="primary" @click="exportData('buyer')">
                        导出
                    </el-button>
                </div>
                <div class="he-bottom">
                    <el-table :default-sort="{prop: 'buy_amount', order: 'descending'}" :data="buyer_list" :height="599" style="width: 100%" @sort-change="sortUsers">
                        <el-table-column label="排名" width="65">
                            <template slot-scope="scope">
                                <div class="flex justify-start align-center">
                                    <span class="he-table-text" v-if="((buyer_page.current - 1)* buyer_page.size) + scope.$index+1 > 3">
                                        {{ ((buyer_page.current - 1)* buyer_page.size)+ scope.$index+1 | getIndex }}
                                    </span>
                                    <img v-else-if="((buyer_page.current - 1)* buyer_page.size) + scope.$index+1  === 1" src="./image/he-rank-1.png" alt="">
                                    <img v-else-if="((buyer_page.current - 1)* buyer_page.size) + scope.$index+1  ===2" src="./image/he-rank-2.png" alt="">
                                    <img v-else-if="((buyer_page.current - 1)* buyer_page.size) + scope.$index+1  === 3" src="./image/he-rank-3.png" alt="">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="用户">
                            <template slot-scope="scope">
                                <div class="el-row--flex he-user">
                                    <img class="he-avatar" :src="scope.row.avatar" alt="">
                                    <el-popover placement="top" max-width="400" trigger="hover" :content="scope.row.oauth && scope.row.oauth.type === 'weapp'?'小程序':'公众号'">
                                        <he-icon slot="reference" size="18px" v-if="scope.row.oauth && scope.row.oauth.type === 'weapp'" type="le-icon-xiaochengxu"></he-icon>
                                        <he-icon slot="reference" size="18px" v-if="scope.row.oauth && scope.row.oauth.type === 'wechat'" type="le-icon-wehcat"></he-icon>
                                    </el-popover>
                                    <div style="margin-left: 8px;">
                                        <div class="he-table-text" style="height: 42px;line-height: 42px">
                                            {{scope.row.nickname}}
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="支付金额" prop="buy_amount" width="200px" sortable="custom">
                            <template slot-scope="scope">
                                <span class="he-table-text">
                                    ￥{{scope.row.statistical.buy_amount}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column label="支付件数" prop="buy_number" width="200px" sortable="custom">
                            <template slot-scope="scope">
                                <span class="he-table-text">
                                    {{scope.row.statistical.buy_number}}
                                </span>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="he-footer flex justify-end">
                    <el-pagination background :current-page="buyer_page.current" :page-count="buyer_page.count" @current-change="currentChange($event,'buyer')" layout="prev, pager, next, jumper">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="le-panel__footer">
            <div class="le-link">
                <span>官网</span>丨   <span>论坛</span>   丨   <span>文档</span>
            </div>
            <div class="le-copy">Powered By Leadshop © 2021</div>
        </div>
    </div>
</template>

<script type="text/javascript">
import * as echarts from "echarts";
import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers('setting');
export default {
    data() {
        return {
            sale_list: [],
            sale_keyword: {
                sort: {
                    sales_amount: 'DESC'
                }
            },
            buyer_list: [{
                statistical: {
                    buy_amount: 0,
                    buy_number: 0
                }
            }],
            buyer_keyword: {
                sort: {
                    buy_amount: 'DESC'
                }
            },
            store_setting: {
                run_status: 0,
                logo: '',
                name: ''
            },
            store_count: {
                unpaid: '0',
                unsent: '0',
                order_after: '0',
                user_number: '0',
                income_amount: '0'
            },
            today_count: {
                today_visit: 0,
                today_pay_amount: 0,
                today_num_order: 0,
                today_num_buyer: 0,
            },
            sale_page: {
                size: 10,
                current: 1
            },
            buyer_page: {
                size: 10,
                current: 1
            },
            one: null,
            two: null,
            three: null,
            four: null
        };
    },
    computed: {
        ...mapGetters({
            'getStore': 'getStore'
        })
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.one = this.setEcharts('he-visitors');
        this.two = this.setEcharts('he-pay-amount');
        this.three = this.setEcharts('he-num-order');
        this.four = this.setEcharts('he-num-buyer');
        this.getSetting();
        this.getStoreCount();
        this.getNearTwoDay();
        this.getSaleList();
        this.getBuyerList();
    },
    methods: {
        getSetting() {
            this.$heshop.search('post', { include: 'setting' }, {
                keyword: 'setting_collection'
            }).then(res => {
                let data = res.content;
                this.store_setting = {
                    run_status: data.basic_setting.run_status,
                    logo: data.store_setting.logo,
                    name: data.store_setting.name
                }
            }).catch(err => {
                let msg = err.data.message || err.data[0].message;
                this.$message.error(msg);
            })
        },
        getStoreCount() {
            this.$heshop.statistical('get', {
                behavior: 'storeCount'
            }).then(res => {
                this.store_count = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            })
        },
        getNearTwoDay() {
            this.$heshop.statistical('get', {
                behavior: 'nearTwoDay'
            }).then(res => {
                this.today_count = res;
                this.setEchartsData('one', [
                    res.today_list.visit_list,
                    res.yesterday_list.visit_list
                ])
                this.setEchartsData('two', [
                    res.today_list.pay_amount_list,
                    res.yesterday_list.pay_amount_list
                ]);
                this.setEchartsData('three', [
                    res.today_list.num_order_list,
                    res.yesterday_list.num_order_list
                ]);
                this.setEchartsData('four', [
                    res.today_list.num_buyer_list,
                    res.yesterday_list.num_buyer_list
                ]);
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        getSaleList() {
            this.$heshop.search('post', { include: 'goods' }, { keyword: this.sale_keyword }).page(this.sale_page.current, this.sale_page.size).then(res => {
                let { data, headers } = res;
                this.sale_list = data;
                this.sale_page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'] > 10 ? 10 : +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-page-count'] > 10 ? 10 : +headers['x-pagination-page-count']
                }
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        getBuyerList() {
            this.$heshop.search('post', { include: 'users' }, { keyword: this.buyer_keyword }).page(this.buyer_page.current, this.buyer_page.size).then(res => {
                let { data, headers } = res;
                this.buyer_list = data.map(v => {
                    if (!v.statistical) {
                        v.statistical = {
                            buy_number: 0,
                            buy_amount: '0.00'
                        }
                    }

                    return v;
                });
                this.buyer_page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'] > 10 ? 10 : +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-page-count'] > 10 ? 10 : +headers['x-pagination-page-count']
                }
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        currentChange($event, key) {
            if (key == 'sale') {
                this.sale_page.current = $event;
                this.getSaleList();
            } else {
                this.buyer_page.current = $event;
                this.getBuyerList();
            }
        },
        sortGoods: function(e) {
            this.sale_keyword.sort = {};
            this.sale_keyword.sort[e.prop] = e.order == 'ascending' ? 'ASC' : 'DESC';
            this.getSaleList();
        },
        sortUsers: function(e) {
            this.buyer_keyword.sort = {};
            this.buyer_keyword.sort[e.prop] = e.order == 'ascending' ? 'ASC' : 'DESC';
            this.getBuyerList();
        },
        exportData: function(key) {
            if (key == 'sale') {
                this.$heshop.statistical('get', {
                    behavior: 'exportGoods',
                    sort: JSON.stringify(this.sale_keyword.sort)
                }).then(res => {
                    this.export2Excel(res.tHeader, res.list, '商品销量');
                }).catch(err => {
                    this.$message.error(err.data.message);
                })
            } else {
                this.$heshop.statistical('get', {
                    behavior: 'exportUsers',
                    sort: JSON.stringify(this.buyer_keyword.sort)
                }).then(res => {
                    this.export2Excel(res.tHeader, res.list, '用户购买力');
                }).catch(err => {
                    this.$message.error(err.data.message);
                })
            }
        },
        export2Excel(tHeader, list, name) {
            require.ensure([], () => {
                this.$h.Export2Excel.export_json_to_excel({ header: tHeader, data: list, filename: name + '报表(' + this.$moment(new Date()).format('YYYYMMDDHHmmss') + ')' });
            });
        },
        setEcharts: function(id) {
            let option = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'line'
                    },
                    formatter: function(params, index) {
                        let htmlStr = '';
                        for (let i = 0; i < params.length; i++) {
                            let param = params[i];
                            let xName = param.name;

                            let seriesName = param.seriesName;
                            let value = param.value;
                            let color = param.color;
                            if (i === 0) {
                                htmlStr += xName + ':00~' + xName + ':59<br/>';
                            }
                            htmlStr += '<div>';
                            htmlStr += '<span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' + color + ';"></span>';
                            htmlStr += seriesName + '：' + value;
                            htmlStr += '</div>';
                        }
                        return htmlStr;
                    }
                },
                color: ['#623CEB', '#BBBFC8'], // 图例及线条的颜色
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    top: '15%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(0, 0, 0, 0.6)',
                            width: 0.5
                        }
                    },
                    axisTick: {
                        interval: 7
                    },
                    axisLabel: {
                        interval: 7
                    },
                    data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                },
                yAxis: [{
                    type: 'value',
                    axisLabel: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            width: 0.5
                        }
                    }
                }],
            };
            let chart = echarts.init(document.getElementById(id));
            // 使用刚指定的配置项和数据显示图表。
            chart.setOption(option);
            return chart;
        },
        setEchartsData: function(chart, data) {
            this[chart].setOption({
                series: [{
                        name: '今日',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: { // 折线颜色
                            normal: {
                                color: '#623CEB',
                                width: 1
                            }
                        },
                        data: data[0]
                    },
                    {
                        name: '昨日',
                        type: 'line',
                        smooth: true,
                        symbol: 'none',
                        lineStyle: { //折线颜色
                            normal: {
                                color: '#BBBFC8',
                                width: 1
                            }
                        },
                        data: data[1]
                    },
                ]
            })
        },
        navigatorTo: function(url, obj = {}) {
            this.$router.push({ path: url, query: obj });
        },

    },
    filters: {
        getIndex(index) {
            if (index < 10) {
                return '0' + index;
            } else {
                return index;
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import url("./index.less");
.le-panel {
    padding: 24px;
    background: #F3F5F7;
}

.flex {
    display: flex;
}

.flex-direction {
    flex-direction: column;
}

.align-center {
    align-items: center;
}

.justify-between {
    justify-content: space-between;
}

.align-end {
    align-items: flex-end;
}

.justify-end {
    justify-content: flex-end;
}

.justify-center {
    justify-content: center;
}

.flex-sub {
    flex: 1;
}

.he-box {
    background: #FFFFFF;
    border-radius: 16px;
}

.he-top-hover:hover {
    color: #623CEB !important;
}

.he-store {
    width: 23%;
    height: 308px;
    margin-right: 1.7%;
    padding: 60px 20px 20px 20px;
    position: relative;

    .he-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-top: 12px;
    }

    .he-status {
        background: #FFFFFF;
        border: 1px solid #623CEB;
        border-radius: 12px;
        padding: 6px 10px;
        line-height: 1;
        position: absolute;
        top: 144px;
    }

    .he-status__text {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #623CEB;
        opacity: 0.85;
    }

    .he-status__text-1 {
        border: 1px solid #fbad15;
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;

        .he-status__text {
            color: #fbad15;
        }
    }

    .he-name {
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.85;
        margin-top: 31px;
    }

    .he-button {
        font-size: 14px;
        width: 100%;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #623CEB;
        line-height: 29px;
        margin-top: 7px;
        .he-left,
        .he-right {
            cursor: pointer;
        }

        .he-left {
            margin-right: 10px;
        }

        .he-right {
            margin-left: 10px;
        }
    }

    .he-time {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        line-height: 28px;
        margin-top: 18px;

        .he-left {
            opacity: 0.45;
            margin-right: 8px;
        }

        .he-right {
            opacity: 0.85;
            margin-left: 8px;
        }
    }
}

.he-right-box {
    width: 75.3%;
}

.he-order-user {
    margin-bottom: 24px;

    .he-top {
        font-size: 24px;
        font-family: DINPro;
        font-weight: bold;
        color: #000000;
        opacity: 0.85;
    }

    .he-bottom {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.45;
    }

    .he-order,
    .he-user {
        height: 140px;
    }

    .he-order {
        width: 54%;
        margin-right: 2%;

    }

    .he-user {
        width: 44%;
    }
}

.he-entrance {
    height: 144px;
    padding: 24px;

    >div {
        cursor: pointer;
    }

    .he-bottom {
        height: 78px;
    }

    .he-button {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        margin-right: 8px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .le-icon-share {
        background-image: url("./image/release-goods.png");
    }

    .le-icon-share:before {
        content: '';
    }

    .le-icon-home {
        background-image: url("./image/store-construction.png");
    }

    .le-icon-home:before {
        content: '';
    }

    .le-icon-home:before {
        content: '';
    }

    .le-icon-user-manage {
        background-image: url("./image/user-management.png");
    }

    .le-icon-user-manage:before {
        content: '';
    }

    .le-icon-orders {
        background-image: url("./image/order-management.png");
    }

    .le-icon-orders:before {
        content: '';
    }

    .he-text {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.85;
    }
}

.he-data {
    margin-top: 24px;
    height: 340px;
    padding: 24px;

    .he-bottom {
        height: 258px;

        >div:not(:last-child) {
            border-right: 1px solid #DCDFE6;
        }
    }

    .he-data__canvas {
        margin-top: 20px;
    }

    .he-data__canvas>div {
        text-align: center;
    }

    .he-data__canvas>div:first-child {
        font-size: 24px;
        font-family: DINPro;
        font-weight: bold;
        color: #000000;
        opacity: 0.85;
    }

    .he-data__canvas>div:last-child {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.45;
    }

    .he-box__item {
        margin: 0 3.4%;
        height: 180px;
    }
}

.he-sale-buy {
    margin-top: 24px;

    >.he-box {
        width: 49.15%;
        height: 741px;
        padding: 24px;
    }

    .he-top {
        height: 28px;
        margin-bottom: 26px;

        >.he-button {
            width: 56px;
            height: 28px;
            border-radius: 4px;
            padding: 0;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: #FFFFFF;
        }
    }

    .he-footer {
        height: 68px;
        margin-top: 16px;
    }
}

.he-top {
    .he-sign {
        width: 4px;
        height: 16px;
        background: #623CEB;
        margin-right: 12px;
    }

    .he-title {
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #000000;
        opacity: 0.85;
    }
}

.he-annotation {
    color: #BBBFC8;
    width: 14px;
    height: 14px;
    display: inline-block;
}

.he-line-1 {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.he-goods-name {
    font-size: 15px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    line-height: 35px;
    display: inline-block;
    width: 360px;
}

/deep/.el-table .cell {
    //line-height: 31px;
}

.el-table::before {
    height: 0;
}

.he-table-text {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;

}

.he-user {
    display: flex;
    align-items: center;
}

.he-avatar {
    width: 28px;
    height: 28px;
    margin-right: 16px;
}

/deep/.el-table_2_column_5 {
    width: 100px;
}

/deep/.el-table__header-wrapper .cell {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}


</style>