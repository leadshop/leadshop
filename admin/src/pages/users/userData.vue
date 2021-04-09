<template>
    <div class="le-matter">
        <div class="le-header">
            <span class="le-before" @click="router('/users/index')">用户管理</span>
            <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            <span class="le-now">用户信息</span>
        </div>
        <div class="le-card-top">
            <el-row>
                <el-col class="el-row--flex is-align-middle">
                    <span class="he-title-line">
                    </span>
                    <span class="he-title">
                        基本信息
                    </span>
                </el-col>
            </el-row>
            <div class="le-line">
            </div>
            <div class="el-row--flex he-info">
                <div class="he-profile-picture">
                    <img :src="detail.avatar" alt="">
                    <div class="he-nickname">
                        {{detail.nickname}}
                    </div>
                    <div class="he-id">
                        ID:{{detail.id}}
                    </div>
                </div>
                <div style="margin: 45px 0 0 40px;">
                    <div class="le-item">
                        <span class="he-label le-label">
                            真实姓名:
                        </span>
                        <span class="le-value">
                            {{detail.realname}}
                        </span>
                        <he-icon class="he-icon" type="le-icon-editor" :title="'修改真实姓名'" v-popup.modifyRealname="detail" width="360" top="35vh"  module="users">
                        </he-icon>
                    </div>
                    <div class="le-item">
                        <span class="le-label">
                            手机号:
                        </span>
                        <span class="le-value">
                            {{detail.mobile}}
                        </span>
                        <he-icon :title="'修改手机号'" class="he-icon" type="le-icon-editor" v-popup.modifyMobile="detail" width="360" top="35vh" module="users">
                        </he-icon>
                    </div>
                    <div class="le-item">
                        <span class="le-label">
                            注册时间:
                        </span>
                        <span class="le-value">
                            {{detail.created_time | getTime}}
                        </span>
                    </div>
                    <div class="le-item">
                        <span class="le-label">
                            最后访问:
                        </span>
                        <span class="le-value">
                            {{detail.statistical?detail.statistical.last_visit_time:'' | getTime}}
                        </span>
                    </div>
                </div>
                <div style="margin: 45px 0 0 150px;" class="flex flex-direction justify-start">
                    <div class="le-item">
                        <span class="le-label">
                            用户所属终端:
                        </span>
                        <span class="he-value">
                            {{detail.oauth.type === 'weapp' ? ' 微信小程序' : detail.oauth.type === 'wechat' ? ' 公众号' : ' --'}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="le-line">
        </div>
        <div class="le-card-bottom">
            <el-row>
                <el-col class="el-row--flex is-align-middle">
                    <span class="he-title-line">
                    </span>
                    <span class="he-title">
                        交易信息
                    </span>
                </el-col>
            </el-row>
            <div class="he-trading-information">
                <div class="he-item">
                    <div>
                        <div class="he-all-label">
                            累计支付订单数
                        </div>
                        <div class="he-all-value">
                            {{detail.pay_number.all}}
                        </div>
                    </div>
                    <div class="he-footer">
                        <div>
                            <div class="he-other-label">
                                微信小程序
                            </div>
                            <div class="he-other-value">
                                {{detail.pay_number.wxapp}}
                            </div>
                        </div>
                        <div>
                            <div class="he-other-label">
                                公众号
                            </div>
                            <div class="he-other-value">
                                {{detail.pay_number.wechat}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="he-item">
                    <div>
                        <div class="he-all-label">
                            累计支付金额
                        </div>
                        <div class="he-all-value">
                            ¥{{detail.pay_amount.all}}
                        </div>
                    </div>
                    <div class="he-footer">
                        <div>
                            <div class="he-other-label">
                                微信小程序
                            </div>
                            <div class="he-other-value">
                                ￥{{detail.pay_amount.wxapp}}
                            </div>
                        </div>
                        <div>
                            <div class="he-other-label">
                                公众号
                            </div>
                            <div class="he-other-value">
                                ￥{{detail.pay_amount.wechat}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="he-item">
                    <div>
                        <div class="he-all-label">
                            累计售后订单数
                        </div>
                        <div class="he-all-value">
                            {{detail.after_number.all}}
                        </div>
                    </div>
                    <div class="he-footer">
                        <div>
                            <div class="he-other-label">
                                微信小程序
                            </div>
                            <div class="he-other-value">
                                {{detail.after_number.wxapp}}
                            </div>
                        </div>
                        <div>
                            <div class="he-other-label">
                                公众号
                            </div>
                            <div class="he-other-value">
                                {{detail.after_number.wechat}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="he-item">
                    <div>
                        <div class="he-all-label">
                            累计退款金额
                        </div>
                        <div class="he-all-value">
                            ¥{{detail.return_amount.all}}
                        </div>
                    </div>
                    <div class="he-footer">
                        <div>
                            <div class="he-other-label">
                                微信小程序
                            </div>
                            <div class="he-other-value">
                                ￥{{detail.return_amount.wxapp}}
                            </div>
                        </div>
                        <div>
                            <div class="he-other-label">
                                公众号
                            </div>
                            <div class="he-other-value">
                                ￥{{detail.return_amount.wechat}}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
    name: "userData",
    data() {
        return {
            detail: {
                oauth: {},
                statistical:{
                    all: 0,
                    wxapp: 0,
                    wechat: 0
                },
                pay_number:{
                    wxapp: 0,
                    all: 0,
                    wechat: 0
                },
                pay_amount:{
                    all: 0,
                    wxapp: 0,
                    wechat: 0
                },
                after_number:{
                    all: 0,
                    wxapp: 0,
                    wechat: 0
                },
                return_amount:{
                    all: 0,
                    wxapp: 0,
                    wechat: 0
                }
            }
        }
    },
    async mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (id) this.getDetail(parseInt(id));
    },
    methods: {
        getDetail: function(id) {
            this.$heshop.users('get', id).then(res => {
                this.detail = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        router: function (path) {
            this.$router.push({
                path: path
            });
        }
    },
    filters: {
        getTime: function(time) {
            if (time) {
                time = new Date(parseInt(time) * 1000);
                let y = time.getFullYear();
                let m = time.getMonth() + 1 < 10 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
                let d = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
                let h = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                let mm = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                let s = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
                return `${y}-${m}-${d} ${h}:${mm}:${s}`;
            } else {
                return '--';
            }
        },
    }
};
</script>
<style lang="scss" scoped="">
    .he-link-text {
    font-size: 12px;
    font-weight: 400;
    line-height: 12px;
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
.he-profile-picture {
    width: 216px;
    height: 195px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    >img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-bottom: 17px;
    }
    .he-nickname {
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        opacity: 0.85;
        margin-bottom: 6px;
    }
    .he-id {
        font-size: 12px;
        font-weight: 400;
        color: #000000;
        opacity: 0.65;
    }
}
.he-info {
    .he-item {
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 400;
        color: #000000;
        .he-label {
            opacity: 0.65;
        }
        .he-value {
            opacity: 0.95;
            margin-left: 8px;
        }
        .he-icon {
            width: 14px;
            height: 14px;
            margin-left: 13px;
            color: #BBBFC8;
            cursor: pointer;
        }
    }
}
.he-icon {
    cursor: pointer;
}
.he-trading-information {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-top: 23px;
    .he-item {
        padding: 32px 0;
        min-width: 0;
        -webkit-box-flex: 1;
        -webkit-flex-grow: 1;
        -ms-flex-positive: 1;
        flex-grow: 1;
        -webkit-flex-shrink: 1;
        -ms-flex-negative: 1;
        flex-shrink: 1;
        background: rgba(98, 60, 235, 0.05);
        border-radius: 8px;
        text-align: center;
        .he-footer {
            display: flex;
            -webkit-flex-direction: row;
            flex-direction: row;
            flex-wrap: nowrap;
            margin-top: 35px;
            .he-other-label {
                font-size: 12px;
                font-weight: 400;
                color: #000000;
                opacity: 0.45;
            }
            .he-other-value {
                font-size: 20px;
                font-family: DINPro;
                font-weight: bold;
                color: #000000;
                opacity: 0.85;
            }
        }
        .he-footer>div {
            min-width: 0;
            -webkit-box-flex: 1;
            -webkit-flex-grow: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            -webkit-flex-shrink: 1;
            -ms-flex-negative: 1;
            flex-shrink: 1;
        }
        .he-all-label {
            font-size: 16px;
            font-weight: 400;
            color: #000000;
            opacity: 0.45;
        }
        .he-all-value {
            font-size: 32px;
            font-weight: bold;
            color: #000000;
            opacity: 0.85;
        }
    }
    .he-item:not(:last-child) {
        margin-right: 24px;
    }
}

.le-header {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-bottom: 24px;
    .le-before {
        color: rgba(0,0,0,0.85);
    }
    .le-now {
        color: rgba(0,0,0,0.45);
    }
}
.le-card-top {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
    .le-item {
        margin-bottom: 16px;
        font-size: 14px;
        font-weight: 400;
        .le-label {
            color: rgba(0, 0, 0, 0.45);
        }
        .le-value {
            color: rgba(0, 0, 0, 0.85);
        }
    }
}
.le-card-bottom {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 24px;
}
</style>
