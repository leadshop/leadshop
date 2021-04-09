<template>
    <div class="le-matter">
        <el-form ref="ruleForm" :model="ruleForm" label-width="217px" :rules="rules" status-icon>
            <el-card class="le-form-card">
                <el-row>
                    <el-col class="el-row--flex is-align-middle">
                        <span class="he-title-line"></span>
                        <span class="he-title">基本设置</span>
                    </el-col>
                </el-row>
                <div class="le-line"></div>
                <div class="le-line"></div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="经营状态" prop="pass">
                            <el-radio-group v-model="ruleForm.basic_setting.run_status">
                                <el-radio :label="1">营业</el-radio>
                                <el-radio :label="0">打烊</el-radio>
                            </el-radio-group>
                            <div class="he-tips">设置打烊后，买家将无法支付订单，其他操作不受影响</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <div class="le-line"></div>
            <el-card class="le-form-card">
                <el-row>
                    <el-col class="el-row--flex is-align-middle">
                        <span class="he-title-line"></span>
                        <span class="he-title">店铺设置</span>
                    </el-col>
                </el-row>
                <div class="le-line"></div>
                <div class="le-line"></div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="店铺名称" prop="store_setting.name">
                            <el-input placeholder="请输入店铺名称" maxlength="15" v-model="ruleForm.store_setting.name" show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item label="店铺LOGO" prop="store_setting.logo">
                            <div class="select-cover__120">
                                <pictureDialog v-model="ruleForm.store_setting.logo" :limit="1">
                                    <div slot="upload" class="select-cover__120-add">
                                        <i class="le-icon le-icon-add select-cover__120-icon"></i>
                                        <span class="select-cover__120-text">添加图片</span>
                                    </div>
                                    <div slot="preview" slot-scope="scope" class="select-cover__120-edit">
                                        <el-image :src="scope.url" fit="cover"></el-image>
                                        <div class="select-cover__120-tips">
                                            <span>替换</span> | <span @click.stop="(e)=>ruleForm.store_setting.logo=''">删除</span>
                                        </div>
                                    </div>
                                </pictureDialog>
                            </div>
                            <div class="he-tips">
                                <span @click="reset" class="le-reset">重置为默认</span>
                                建议尺寸：800*800像素</div>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="store_setting.phone">
                            <el-input placeholder="请输入联系方式" maxlength="15" v-model="ruleForm.store_setting.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="联系地址" prop="store_setting.addressList">
                            <el-cascader :options="district" v-model="ruleForm.store_setting.addressList" placeholder="请选择省/市/区" :props="{ expandTrigger: 'hover' }"></el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="store_setting.address">
                            <el-input placeholder="请输入详细地址" v-model="ruleForm.store_setting.address"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <div class="le-line"></div>
            <el-card class="le-form-card">
                <el-row>
                    <el-col class="el-row--flex is-align-middle">
                        <span class="he-title-line"></span>
                        <span class="he-title">交易设置</span>
                    </el-col>
                </el-row>
                <div class="le-line"></div>
                <div class="le-line"></div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="待付款订单自动取消">
                            <el-switch v-model="ruleForm.trade_setting.cancel_status"  :active-value="1" :inactive-value="0"></el-switch>
                        </el-form-item>
                        <el-form-item label="待付款订单取消时间" v-if="ruleForm.trade_setting.cancel_status === 1">
                            <el-input v-model="ruleForm.trade_setting.cancel_time" @keyup.native="ruleForm.trade_setting.cancel_time = oninput(ruleForm.trade_setting.cancel_time)">
                                <template slot="append">时</template>
                            </el-input>
                            <div class="he-tips">拍下订单在此时间段内未付款，订单将自动取消</div>
                        </el-form-item>
                        <el-form-item label="自动确认收货时间">
                            <el-input v-model="ruleForm.trade_setting.received_time" @keyup.native="ruleForm.trade_setting.received_time = proving(ruleForm.trade_setting.received_time)">
                                <template slot="append">天</template>
                            </el-input>
                            <div class="he-tips">从发货到自动确认收货时间</div>
                        </el-form-item>
                        <el-form-item label="待评价订单默认好评时间">
                            <el-input v-model="ruleForm.trade_setting.evaluate_time" @keyup.native="ruleForm.trade_setting.evaluate_time = proving(ruleForm.trade_setting.evaluate_time)">
                                <template slot="append">天</template>
                            </el-input>
                            <div class="he-tips">从确认收货时间开始计算</div>
                        </el-form-item>
                        <el-form-item label="售后时间">
                            <el-input v-model="ruleForm.trade_setting.after_time" @keyup.native="ruleForm.trade_setting.after_time = proving(ruleForm.trade_setting.after_time)">
                                <template slot="append">天</template>
                            </el-input>
                            <div class="he-tips">从确认收货开始计算，可申请售后的时间</div>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <div class="le-line"></div>
            <el-card class="le-form-card">
                <el-row>
                    <el-col class="el-row--flex is-align-middle">
                        <span class="he-title-line"></span>
                        <span class="he-title">商品设置</span>
                    </el-col>
                </el-row>
                <div class="le-line"></div>
                <div class="le-line"></div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="商品推荐">
                            <div>
                                <el-radio v-model="ruleForm.goods_setting.recommend_status" :label="1">自动推荐</el-radio>
                                <div class="he-tips">系统自动推荐购买量最高的20件商品</div>
                            </div>
                            <div>
                                <el-radio v-model="ruleForm.goods_setting.recommend_status" :label="2">手动推荐
                                    <el-button class="he-recommend-btn" :disabled="ruleForm.goods_setting.recommend_status !== 2" @click="openGoods" type="primary" plain>
                                        <span>选择商品</span>
                                    </el-button>
                                </el-radio>
                                <goods-select ref="goodsSelect" :is-tips="false" :select-style="{backgroundColor: '#ffffff'}" v-model="ruleForm.goods_setting.recommend_goods">
                                    <span></span>
                                </goods-select>
                                <div class="he-tips">最多添加20件商品</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="商品推荐显示页面">
                            <el-checkbox-group v-model="ruleForm.goods_setting.recommend_showpage">
                                <el-checkbox label="goodsinfo">商品详情</el-checkbox>
                                <el-checkbox label="pay_success">支付完成</el-checkbox>
                                <el-checkbox label="personal_center">个人中心</el-checkbox>
                                <el-checkbox label="orderinfo">订单详情</el-checkbox>
                                <el-checkbox label="cart">购物车</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="商品详情页订单滚动">
                            <el-switch v-model="ruleForm.goods_setting.order_list_roll" :active-value="1" :inactive-value="0"></el-switch>
                            <el-popover placement="top" width="257" trigger="hover">
                                <img class="he-example-img" src="./image/he-example.png" alt="">
                                <el-button slot="reference" type="text" class="he-example">示例</el-button>
                            </el-popover>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <div class="le-line"></div>
            <el-card class="le-form-card">
                <el-row>
                    <el-col class="el-row--flex is-align-middle">
                        <span class="he-title-line"></span>
                        <span class="he-title">用户设置</span>
                    </el-col>
                </el-row>
                <div class="le-line"></div>
                <div class="le-line"></div>
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="手机号授权场景">
                            <el-checkbox-group v-model="ruleForm.mobile_auth">
                                <el-checkbox label="join_shopping_cart">加入购物车</el-checkbox>
                                <el-checkbox label="paybuy">购买支付</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="头像昵称授权场景">
                            <el-checkbox-group v-model="ruleForm.userinfo_auth">
                                <el-checkbox label="join_shopping_cart">加入购物车</el-checkbox>
                                <el-checkbox label="paybuy">购买支付</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-card>
            <div class="le-line"></div>
            <div class="le-line"></div>
        </el-form>
        <div class="le-cardpin">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
import district from "./../order/components/district.json";
import goodsSelect from "../../components/goodsSelet/select.vue";
import floatNum from "@/lib/function/floatNum";
import {createNamespacedHelpers} from "vuex";
const { mapActions  } = createNamespacedHelpers('setting');

const home = require("../../assets/images/home.png");

export default {
    components: {
        goodsSelect
    },
    data() {
        return {
            ruleForm: {
                basic_setting: {
                    run_status: 0,
                    restore_status: 0,
                    restore_time: ''
                },
                store_setting: {
                    name: '',
                    logo: '',
                    abstract: '',
                    phone: '',
                    address: '',
                    addressList: []
                },
                trade_setting: {
                    cancel_status: 1,
                    cancel_time: 24,
                    received_time: 7,
                    evaluate_status: 1,
                    evaluate_time: 60,
                    after_time: 7,
                    exchange_status: 1,
                    pay_way: [
                        'wechat',
                        'alipay'
                    ]
                },
                goods_setting: {
                    recommend_status: 1,
                    recommend_showpage: [],
                    recommend_goods: [],
                    evaluate_show: 1,
                    order_list_roll: 1,
                    sales_show: 0,
                    soldout_show: 0
                },
                mobile_auth: [],
                userinfo_auth: [],
            },
            district: [],
            rules: {
                'store_setting.name': [
                    { required: true, message: '请输入店铺名称', trigger: 'blur' }
                ],
                'store_setting.logo': [
                    { required: true, message: '请设置店铺LOGO', trigger: 'change' }
                ],
                'store_setting.abstract': [
                    { required: true, message: '请输入店铺简介', trigger: 'blur' }
                ],
                'store_setting.phone': [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ],
                'store_setting.addressList': [
                    { required: true, message: '请选择省/市/区', trigger: 'change' }
                ],
                'store_setting.address': [
                    { required: true, message: '请输入详细地址', trigger: 'blur' }
                ]
            }
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        'ruleForm.goods_setting.recommend_goods': {
            handler(val) {
                if (val.length > 20) {
                   this.ruleForm.goods_setting.recommend_goods =  val.slice(0, 20);
                }
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.getSetting();
        this.getDistrict(district);
        this.district = district;
    },
    methods: {
        ...mapActions(['getSettingInfo']),
        getSetting: function() {
            this.$heshop.search('post', { include: 'setting' }, {
                keyword: 'setting_collection'
            }).then(res => {
                let data = res.content;

                let pay_way = [];
                for (let i in data.trade_setting.pay_way) {
                    if (data.trade_setting.pay_way[i].value) {
                        pay_way.push(i);
                    }
                }
                data.trade_setting.pay_way = pay_way;

                let recommend_showpage = [];
                for (let i in data.goods_setting.recommend_showpage) {
                    if (data.goods_setting.recommend_showpage[i].value) {
                        recommend_showpage.push(i);
                    }
                }
                data.goods_setting.recommend_showpage = recommend_showpage;
                data.goods_setting.recommend_goods === undefined ? data.goods_setting.recommend_goods = [] : null;
                let new_mobile_auth = [];
                for (let i in data.user_setting.mobile_auth) {
                    if (data.user_setting.mobile_auth[i].value) {
                        new_mobile_auth.push(i);
                    }
                }
                data.mobile_auth = new_mobile_auth;

                let new_userinfo_auth = [];
                for (let i in data.user_setting.userinfo_auth) {
                    if (data.user_setting.userinfo_auth[i].value) {
                        new_userinfo_auth.push(i);
                    }
                }
                data.userinfo_auth = new_userinfo_auth;
                data.basic_setting.restore_time = +data.basic_setting.restore_time;
                // data.basic_setting.restore_status =1;
                this.ruleForm = data;
            }).catch(error => {
                console.error(error);
            })
        },
        save: function() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    if (!this.ruleForm.store_setting.logo) {
                        this.ruleForm.store_setting.logo = 'https://qmxq.oss-cn-hangzhou.aliyuncs.com/home.png';
                    }
                    let basic_setting = JSON.parse(JSON.stringify(this.ruleForm.basic_setting));
                    if (basic_setting.restore_time) {
                        let str = new Date(basic_setting.restore_time).getTime().toString();
                        str.slice(0, str.length - 3);
                        basic_setting.restore_time = str;
                    }
                    let store_setting = JSON.parse(JSON.stringify(this.ruleForm.store_setting));
                    store_setting.province = store_setting.addressList[0];
                    store_setting.city = store_setting.addressList[1];
                    store_setting.district = store_setting.addressList[2];
                    // store_setting.logo = store_setting.logo;
                    let trade_setting = JSON.parse(JSON.stringify(this.ruleForm.trade_setting));
                    let pay_way = {
                        wechat: {
                            title: '微信',
                            value: false
                        },
                        alipay: {
                            title: '支付宝',
                            value: false
                        }
                    };
                    trade_setting.pay_way.forEach(item => {
                        for (let key in pay_way) {
                            if (item === key) {
                                pay_way[key].value = true;
                            }
                        }
                    });
                    trade_setting.pay_way = pay_way;
                    let goods_setting = JSON.parse(JSON.stringify(this.ruleForm.goods_setting));
                    let recommend_showpage = {
                        goodsinfo: {
                            title: '商品详情',
                            value: false
                        },
                        pay_success: {
                            title: '支付完成',
                            value: false
                        },
                        personal_center: {
                            title: '个人中心',
                            value: false
                        },
                        orderinfo: {
                            title: '订单详情',
                            value: false
                        },
                        cart: {
                            title: '购物车',
                            value: false
                        }
                    };
                    goods_setting.recommend_showpage.forEach(item => {
                        for (let key in recommend_showpage) {
                            if (item === key) {
                                recommend_showpage[key].value = true;
                            }
                        }
                    });
                    goods_setting.recommend_showpage = recommend_showpage;
                    let mobile_auth = JSON.parse(JSON.stringify(this.ruleForm.mobile_auth));
                    let new_mobile_auth = {
                        join_shopping_cart: {
                            title: '加入购物车',
                            value: false
                        },
                        paybuy: {
                            title: '支付购买',
                            value: false
                        },
                        get_tickets: {
                            title: '获取卡券',
                            value: false
                        }
                    }
                    mobile_auth.forEach(item => {
                        for (let key in new_mobile_auth) {
                            if (item === key) {
                                new_mobile_auth[key].value = true;
                            }
                        }
                    });
                    let userinfo_auth = JSON.parse(JSON.stringify(this.ruleForm.userinfo_auth));
                    let new_userinfo_auth = {
                        join_shopping_cart: {
                            title: '加入购物车',
                            value: false
                        },
                        paybuy: {
                            title: '支付购买',
                            value: false
                        },
                        get_tickets: {
                            title: '获取卡券',
                            value: false
                        }
                    }
                    userinfo_auth.forEach(item => {
                        for (let key in new_userinfo_auth) {
                            if (item === key) {
                                new_userinfo_auth[key].value = true;
                            }
                        }
                    });
                    this.$heshop.setting('post', {
                        keyword: 'setting_collection',
                        content: {
                            basic_setting: basic_setting,
                            store_setting: store_setting,
                            trade_setting: trade_setting,
                            goods_setting: goods_setting,
                            user_setting: {
                                mobile_auth: new_mobile_auth,
                                userinfo_auth: new_userinfo_auth
                            }
                        }
                    }).then(() => {
                        this.getSettingInfo();
                        this.$message.success('保存成功');
                    }).catch(error => {
                        console.error(error);
                        this.$message.error("保存失败");
                    })
                } else {
                    return false;
                }
            });
        },
        getDistrict: function(district) {
            for (let i = 0; i < district.length; i++) {
                district[i].label = district[i].name;
                district[i].value = district[i].name;
                if (district[i].list) {
                    district[i].children = district[i].list;
                    this.getDistrict(district[i].children);
                }
            }
        },
        openGoods: function() {
            this.$refs.goodsSelect.open();
        },
        reset: function() {
            this.ruleForm.store_setting.logo = 'https://qmxq.oss-cn-hangzhou.aliyuncs.com/home.png';
        },
        oninput: function(value) {
            return floatNum(value);
        },
        proving: function(val) {
            val = val.replace(/[^\.\d]/g,'');
            val = val.replace('.','');
            return val;
        }
    }
};
</script>
<style lang="less" scoped="true">
.he-title-line {
    width: 4px;
    height: 16px;
    background: #623CEB;
    display: inline-block;
}

.le-reset {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #623CEB;
    cursor: pointer;
}

.he-title {
    font-size: 16px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
    margin-left: 12px;
}

.le-form-card {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: none !important;
}

.le-matter /deep/.el-form-item .el-form-item__content .el-date-editor .el-input__inner {
    padding-left: 30px;
}

.le-matter /deep/.el-date-editor {
    margin-top: 16px;
}

/deep/ .el-textarea {
    height: 200px;
}

/deep/ .el-textarea .el-textarea__inner {
    resize: none;
    height: 200px;
}

.le-matter /deep/.el-form-item__content .el-input.el-input-group.el-input-group--append {
    width: 200px;
}

.he-tips {
    font-size: 12px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.45);
    margin-right: 8px;
}

.he-recommend-btn {
    margin-left: 17px;
    width: 104px;
    height: 32px;
    background: #FFFFFF !important;
    border: 1px solid #623CEB;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #623CEB;
}

.he-recommend-btn[disabled] {
    color: #BFBFBF !important;
    ;
    border: 1px solid #DCDFE6 !important;
}

.he-recommend-btn[disabled]:hover {
    color: #BFBFBF !important;
}

.he-recommend-btn:hover {
    color: #623CEB !important;
}

.he-recommend-btn:focus {
    color: #623CEB !important;
}

.he-disabled-btn {
    background: #F3F5F7 !important;
    border-radius: 4px;
    border: none;
}

.he-disabled-btn span {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000 !important;
    opacity: 0.45;
}

.he-example {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #623CEB;
    padding: 0 9px !important;
}

.he-example-img {
    width: 225px;
    height: 400px;
}
.goods-selet {
    padding-bottom: 0;
}
</style>
