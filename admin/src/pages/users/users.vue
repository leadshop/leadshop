<template>
    <div class="le-matter">
        <div class='le-card' style="margin-bottom: 24px">
            <div class="el-row--flex is-align-middle" style="margin-bottom: 24px">
                <span class="he-title-line"></span>
                <span class="he-title">用户数据</span>
                <span class="he-time">统计截止时间：{{ time }}</span>
            </div>
            <div class="he-statistics flex">
                <div class="he-statistics__item flex-sub">
                    <div class="he-statistics__title">
                        总用户数
                    </div>
                    <div>
                        <span class="he-statistics__number">
                            {{ statistics.user_number.all }}
                        </span>
                        <el-popover placement="right" title="总用户数" trigger="hover" width="200">
                            <div>微信小程序 {{ statistics.user_number.wxapp }}</div>
                            <div>公众号 {{ statistics.user_number.wechat }}</div>
                            <span class="he-statistics__detail" slot="reference">详情</span>
                        </el-popover>
                    </div>
                    <div class="he-statistics__Yesterday">
                        昨日 {{ statistics.user_number_yesteday.all }}
                    </div>
                </div>
                <div class="he-statistics__item flex-sub">
                    <div class="he-statistics__title">今日新增用户数</div>
                    <div>
                        <span class="he-statistics__number">{{ statistics.user_grow_today.all }}</span>
                        <el-popover placement="right" title="今日新增用户数" trigger="hover" width="200">
                            <div>微信小程序 {{ statistics.user_grow_today.wxapp }}</div>
                            <div>公众号 {{ statistics.user_grow_today.wechat }}</div>
                            <span class="he-statistics__detail" slot="reference">详情</span>
                        </el-popover>
                    </div>
                    <div class="he-statistics__Yesterday">昨日 {{ statistics.user_grow_yesteday.all }}</div>
                </div>
                <div class="he-statistics__item flex-sub">
                    <div class="he-statistics__title">
                        今日支付人数
                        <el-popover content="包含申请售后退款人数" placement="top" trigger="hover">
                            <he-icon class="he-annotation" slot="reference" type="le-icon-annotation">
                            </he-icon>
                        </el-popover>
                    </div>
                    <div>
                        <span class="he-statistics__number">
                            {{ statistics.pay_amount_today.all }}
                        </span>
                        <el-popover placement="right" title="今日支付人数" trigger="hover" width="200">
                            <div>
                                微信小程序 {{ statistics.pay_amount_today.wxapp }}
                            </div>
                            <div>
                                公众号 {{ statistics.pay_amount_today.wechat }}
                            </div>
                            <span class="he-statistics__detail" slot="reference">
                                详情
                            </span>
                        </el-popover>
                    </div>
                    <div class="he-statistics__Yesterday">
                        昨日 {{ statistics.pay_amount_yesteday.all }}
                    </div>
                </div>
                <div class="he-statistics__item flex-sub">
                    <div class="he-statistics__title">
                        今日客单价
                    </div>
                    <div>
                        <span class="he-statistics__number">
                            ¥{{ statistics.average_amount_today.all }}
                        </span>
                        <el-popover placement="right" title="今日客单价" trigger="hover" width="190">
                            <div>
                                微信小程序 ￥{{ statistics.average_amount_today.wxapp }}
                            </div>
                            <div>
                                公众号 ￥{{ statistics.average_amount_today.wechat }}
                            </div>
                            <span class="he-statistics__detail" slot="reference">
                                详情
                            </span>
                        </el-popover>
                    </div>
                    <div class="he-statistics__Yesterday">
                        昨日 ￥{{ statistics.average_amount_yesteday.all }}
                    </div>
                </div>
            </div>
        </div>
        <el-form class="le-card" style="margin-bottom: 24px" label-width="96px">
            <div style="display: flex;flex-wrap: wrap;">
                <el-form-item label="关键词">
                    <el-input placeholder="输入关键词搜索" v-model="keyword.search" @keyup.enter.native="getSearch">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户来源">
                    <el-select placeholder="请选择" v-model="keyword.source" @change="getSearch">
                        <el-option value="" label="全部">
                        </el-option>
                        <el-option value="weapp" label="微信小程序">
                        </el-option>
                        <el-option value="wechat" label="公众号">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="消费次数">
                    <el-input v-model="keyword.buy_number_start" @keyup.enter.native="getSearch">
                        <template slot="append">
                            次
                        </template>
                    </el-input>
                    <span class="he-to">
                        至
                    </span>
                    <el-input v-model="keyword.buy_number_end" @keyup.enter.native="getSearch">
                        <template slot="append">
                            次
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="注册时间">
                    <el-date-picker @change="getSearch" placeholder="开始时间" type="datetime"
                                    v-model="keyword.created_time_start" value-format="timestamp">
                    </el-date-picker>
                    <span class="he-to">
                        至
                    </span>
                    <el-date-picker @change="getSearch" placeholder="结束时间" type="datetime"
                                    v-model="keyword.created_time_end" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="上次消费时间">
                    <el-date-picker @change="getSearch" placeholder="开始时间" type="datetime"
                                    v-model="keyword.last_buy_time_start" value-format="timestamp">
                    </el-date-picker>
                    <span class="he-to">
                        至
                    </span>
                    <el-date-picker @change="getSearch" placeholder="结束时间" type="datetime"
                                    v-model="keyword.last_buy_time_end" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="最后访问时间">
                    <el-date-picker @change="getSearch" placeholder="开始时间" type="datetime"
                                    v-model="keyword.last_visit_time_start" value-format="timestamp">
                    </el-date-picker>
                    <span class="he-to">
                        至
                    </span>
                    <el-date-picker @change="getSearch" placeholder="结束时间" type="datetime"
                                    v-model="keyword.last_visit_time_end" value-format="timestamp">
                    </el-date-picker>
                </el-form-item>
            </div>
            <div style="padding-left: 96px;">
                <el-button @click="getSearch" type="primary">筛选</el-button>
                <el-button @click="empty">清空</el-button>
                <el-button @click="exportUsers">导出</el-button>
                <he-link href="users/usersExportHistory">
                    <el-button class="he-export-history" type="text" style="margin-left: 10px">
                        导出历史
                    </el-button>
                </he-link>
            </div>
        </el-form>
        <div class="le-card">
            <el-table :data="list"
                      empty-text="暂无用户"
                      @sort-change="sortChange" :default-sort="{prop: 'created_time', order: 'descending'}">
                <el-table-column label="用户ID" prop="id" width="80px">
                    <template slot-scope="scope">
                        <div class="he-text">{{ scope.row.id }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="用户">
                    <template slot-scope="scope">
                        <div class="flex">
                            <div>
                                <he-icon size="18px" v-if="scope.row.oauth.type === 'weapp'"
                                         type="le-icon-xiaochengxu"></he-icon>
                                <he-icon size="18px" v-else-if="scope.row.oauth.type === 'wechat'"
                                         type="le-icon-wehcat"></he-icon>
                            </div>
                            <div style="margin-left: 8px;">
                                <div class="he-text">
                                    {{ scope.row.nickname }}
                                </div>
                                <div class="he-mobile">
                                    {{ scope.row.mobile }}
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="消费金额" prop="buy_amount" sortable="custom">
                    <template slot-scope="scope">
                        <div class="he-text">￥{{ scope.row.statistical ? scope.row.statistical.buy_amount : '0.00' }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="消费次数" prop="buy_number" sortable="custom">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.statistical ? scope.row.statistical.buy_number : 0 }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="注册时间" prop="created_time" sortable="custom">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.created_time | getTime }}<br/>
                            {{ scope.row.created_time | getLast }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="上次消费时间" prop="last_buy_time" sortable="custom">
                    <template slot-scope="scope">
                        <div class="he-text">
                            {{ scope.row.statistical ? scope.row.statistical.last_buy_time : '' | getTime }}<br/>
                            {{ scope.row.statistical ? scope.row.statistical.last_buy_time : '' | getLast }}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="最后访问时间" prop="last_visit_time" sortable="custom">
                    <template slot-scope="scope">
                        <span class="he-text">
                            {{ scope.row.statistical ? scope.row.statistical.last_visit_time : '' | getTime }}<br/>
                            {{ scope.row.statistical ? scope.row.statistical.last_visit_time : '' | getLast }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="router(scope.row.id)" class="le-router__btn" type="text">
                            编辑
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="el-row--flex is-justify-end">
                <div class="he-tabpane-pagination">
                    <el-pagination :current-page="page.current" :page-count="page.count" @current-change="currentChange"
                                   background="" layout="prev, pager, next, jumper">
                    </el-pagination>
                </div>
            </div>
        </div>
        <heloading v-model="load" page="usersExportHistory" path="users" @submit="exportUsers"></heloading>
    </div>
</template>
<script type="text/javascript">

import heloading from "@/components/heloading.vue";

export default {
    components: {
        heloading
    },
    data() {
        return {
            load: {
                show: false,
                type: 1
            },
            list: [],
            page: {
                current: 1,
                count: 1,
                size: 10
            },
            statistics: {
                user_number: {
                    all: 0
                },
                user_number_yesteday: {
                    all: 0
                },
                user_grow_today: {
                    all: 0
                },
                user_grow_yesteday: {
                    all: 0
                },
                pay_amount_today: {
                    all: 0
                },
                pay_amount_yesteday: {
                    all: 0
                },
                average_amount_today: {
                    all: 0
                },
                average_amount_yesteday: {
                    all: 0
                }
            },
            value: null,
            keyword: {
                search: '',
                source: '',
                buy_number_start: null,
                buy_number_end: null,
                created_time_start: null,
                created_time_end: null,
                last_buy_time_start: null,
                last_buy_time_end: null,
                last_visit_time_start: null,
                last_visit_time_end: null,
                sort: {
                    'created_time': 'DESC'
                }
            },
            time: ''
        };
    },
    async mounted() {
        this.getTime();
        this.statistical();
        this.search(this.keyword);
    },
    methods: {
        currentChange: function (e) {
            this.page.current = e;
            this.search(this.keyword);
        },
        sortChange(e) {
            this.keyword.sort = {}
            this.keyword.sort[e.prop] = e.order == 'ascending' ? 'ASC' : 'DESC';
            this.search(this.keyword);
        },
        empty: function () {
            this.keyword = {
                search: '',
                source: '',
                buy_number_start: null,
                buy_number_end: null,
                created_time_start: null,
                created_time_end: null,
                last_buy_time_start: null,
                last_buy_time_end: null,
                last_visit_time_start: null,
                last_visit_time_end: null,
                sort: {
                    'created_time': 'DESC'
                }
            }

            this.search(this.keyword);
        },
        getKeyword: function () {
            let {
                search,
                source,
                buy_number_start,
                buy_number_end,
                created_time_start,
                created_time_end,
                last_buy_time_start,
                last_buy_time_end,
                last_visit_time_start,
                last_visit_time_end,
                sort
            } = this.keyword;
            let last_buy_time_end_str = last_buy_time_end ? last_buy_time_end.toString() : '';
            last_buy_time_end_str = last_buy_time_end_str.slice(0, last_buy_time_end_str.length - 3);
            let created_time_start_str = created_time_start ? created_time_start.toString() : '';
            created_time_start_str = created_time_start_str.slice(0, created_time_start_str.length - 3);
            let created_time_end_str = created_time_end ? created_time_end.toString() : '';
            created_time_end_str = created_time_end_str.slice(0, created_time_end_str.length - 3);
            let last_buy_time_start_str = last_buy_time_start ? last_buy_time_start.toString() : '';
            last_buy_time_start_str = last_buy_time_start_str.slice(0, last_buy_time_start_str.length - 3);
            let last_visit_time_start_str = last_visit_time_start ? last_visit_time_start.toString() : '';
            last_visit_time_start_str = last_visit_time_start_str.slice(0, last_visit_time_start_str.length - 3);
            let last_visit_time_end_str = last_visit_time_end ? last_visit_time_end.toString() : '';
            last_visit_time_end_str = last_visit_time_end_str.slice(0, last_visit_time_end_str.length - 3);
            return {
                last_buy_time_end: last_buy_time_end_str,
                created_time_start: created_time_start_str,
                created_time_end: created_time_end_str,
                last_buy_time_start: last_buy_time_start_str,
                last_visit_time_start: last_visit_time_start_str,
                search: search,
                source,
                buy_number_start,
                buy_number_end,
                sort,
                last_visit_time_end: last_visit_time_end_str
            }
        },
        getSearch: function () {
            this.page.current = 1;
            this.search(this.keyword);
        },
        statistical: function () {
            this.$heshop.statistical('get', {behavior: 'userstatistical'}).then(res => {
                this.getTime();
                this.statistics = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        search: function (keyword) {
            keyword = JSON.parse(JSON.stringify(keyword));
            keyword['created_time_start'] = keyword['created_time_start'] ? keyword['created_time_start'] / 1000 : null;
            keyword['created_time_end'] = keyword['created_time_end'] ? keyword['created_time_end'] / 1000 : null;
            keyword['last_buy_time_start'] = keyword['last_buy_time_start'] ? keyword['last_buy_time_start'] / 1000 : null;
            keyword['last_buy_time_end'] = keyword['last_buy_time_end'] ? keyword['last_buy_time_end'] / 1000 : null;
            keyword['last_visit_time_start'] = keyword['last_visit_time_start'] ? keyword['last_visit_time_start'] / 1000 : null;
            keyword['last_visit_time_end'] = keyword['last_visit_time_end'] ? keyword['last_visit_time_end'] / 1000 : null;
            this.$heshop.search('post', {include: 'users'}, {keyword}).page(this.page.current, this.page.size).then(res => {
                let {data, headers} = res;
                this.list = data;
                this.page = {
                    current: +headers['x-pagination-current-page'],
                    count: +headers['x-pagination-page-count'],
                    size: +headers['x-pagination-per-page'],
                    total: +headers['x-pagination-total-count']
                }
            }).catch(err => {
                console.error(err);
            })
        },
        getTime: function () {
            let now = new Date();
            let yy = now.getFullYear();
            let mm = now.getMonth() + 1;
            let dd = now.getDate();
            let hh = now.getHours();
            let ii = now.getMinutes();
            let ss = now.getSeconds();
            let clock = yy + "-";
            if (mm < 10) clock += "0";
            clock += mm + "-";
            if (dd < 10) clock += "0";
            clock += dd + " ";
            if (hh < 10) clock += "0";
            clock += hh + ":";
            if (ii < 10) clock += '0';
            clock += ii + ":";
            if (ss < 10) clock += '0';
            clock += ss;
            this.time = clock;
        },
        exportUsers: function () {
            this.load = {
                show: true,
                type: 1
            }
            let conditions = this.getKeyword();
            this.$heshop.export('post', {include: 'user'}, {
                conditions: conditions
            }).then(() => {
                this.$set(this.load, 'type', 2);
                // this.$router.push('usersExportHistory');
            }).catch(error => {
                this.$set(this.load, 'type', 3);
            });
        },
        router: function (id) {
            this.$router.push({
                path: '/users/userData',
                query: {
                    id: id
                }
            });
        }
    },
    filters: {
        getTime: function (time) {
            if (time) {
                time = new Date(parseInt(time) * 1000);
                let y = time.getFullYear();
                let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
                let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
                return `
                ${y}-${m}-${d}
                `;
            } else {
                return '--';
            }
        },
        getLast: function (time) {
            if (time) {
                time = new Date(parseInt(time) * 1000);
                let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
                return `

                ${h}:${mm}:${s}`;
            } else {
                return '';
            }
        }
    }
};
</script>
<style lang="less" scoped>
.le-card {
    border-radius: 16px;
    background: #ffffff;
    padding: 24px;
}

.card-top /deep/ .el-card__body {
    padding-bottom: 36px !important;
}

.he-title-line {
    width: 4px;
    height: 16px;
    background: #623CEB;
    display: inline-block;
}

.he-title {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    margin-left: 12px;
}

.he-time {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
    margin-left: 16px;
}

.he-statistics__title {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
}

.he-statistics__item {
    padding: 0 0 0 16px;
}

.he-statistics__number {
    font-size: 32px;
    font-weight: bold;
    color: #000000;
    opacity: 0.85;
}

.he-statistics__detail {
    font-size: 14px;
    font-weight: 400;
    color: #623CEB;
    margin-left: 7px;
    cursor: pointer;
}

.he-statistics__Yesterday {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
}

.he-tabpane-pagination {
    margin-top: 18px;
}

.el-card {
    border-radius: 16px;
    box-shadow: none !important;
}

.le-matter /deep/ .el-form .el-input {
    width: 200px;
}

.le-matter /deep/ .el-date-editor--datetime .el-input__inner {
    padding-left: 30px;
}

.he-to {
    padding: 0 9px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    display: inline-block;
}

.he-annotation {
    color: #BBBFC8;
    width: 14px;
    height: 14px;
    cursor: pointer;
}

.he-export-history {
    width: 48px;
    height: 13px;
    font-size: 14px !important;
    font-weight: 400;
    color: #623ceb;
    padding: 0;

}

.el-form-item {
    margin-right: 30px;
}

.he-text {
    line-height: 20px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

.he-mobile {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.65;
}

.le-matter {
    .le-router__btn {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #623CEB;
        padding: 0;
    }
}

</style>
