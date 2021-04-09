<template>
    <el-form ref="form" :model="value" label-width="160px" class="he-add-logistic">
        <el-form-item label="配送方式">
            <span class="he-delivery">快递配送</span>
        </el-form-item>
        <el-form-item>
            <span class="le-label__require" slot="label">运费设置</span>
            <div style="margin-bottom:10px;">
                <el-radio class="he-margin-right" v-model="value.ft_type" :label="1">统一运费</el-radio>
                <el-input v-model="value.ft_price" :disabled="value.ft_type === 2"
                          @keyup.native="value.ft_price = oninput(value.ft_price)">
                    <template slot="append">元</template>
                </el-input>
            </div>
            <div class="el-row--flex">
                <div>
                    <el-radio class="he-margin-right" v-model="value.ft_type" :label="2">运费模板</el-radio>
                    <el-select v-model="value.ft_id" placeholder="请选择" :disabled="value.ft_type === 1"
                               v-loading="templateLoading">
                        <el-option
                            v-for="item in templateList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name">
                        </el-option>
                    </el-select>
                </div>
                <div class="flex justify-center align-center he-btn">
                    <el-button type="text" @click="router('/order/freightPublish')">
                        新建
                    </el-button>
                    <span class="le-line-btn"></span>
                    <el-button type="text" @click="getShipping">
                        刷新
                    </el-button>
                </div>
            </div>
            <p class="he-tips" style="margin:7px 0 0 15px;">模板支持对不同区域，按件或按重计算运费</p>
        </el-form-item>
        <el-form-item label="包邮设置">
            <div class="el-row--flex">
                <div>
                    <span class="he-margin-right">包邮模板</span>
                    <el-select v-model="value.pfr_id" placeholder="请选择" v-loading="freeLoading">
                        <el-option
                            v-for="item in freeRules"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                </div>
                <div class="flex justify-center align-center he-btn">
                    <el-button type="text" @click="router('/order/shippingPublish')">新建</el-button>
                    <span class="le-line-btn"></span>
                    <el-button type="text" @click="getFreeShipping">刷新</el-button>
                </div>
            </div>
            <p class="he-tips" style="margin:7px 0 0 0">模板支持分区域设置包邮条件，指定商品包邮</p>
        </el-form-item>
    </el-form>
</template>
<script>
import floatNum from "@/lib/function/floatNum";

export default {
    props: {
        value: Object
    },
    data() {
        return {
            templateList: [],
            freeRules: [],
            freeLoading: false,
            templateLoading: false
        }
    },
    methods: {
        getShipping: function () {
            this.templateLoading = true;
            this.$heshop.option('get', {module: 'logistics', include: 'freighttemplate'}).then(res => {
                this.templateLoading = false;
                this.templateList = res;
            }).catch(err => {
                this.templateLoading = false;
                this.$message.error(err.data.message);
            });
        },
        getFreeShipping: function () {
            this.freeLoading = true;
            this.$heshop.option('get', {module: 'logistics', include: 'packagefreerules'}).then(res => {
                this.freeLoading = false;
                this.freeRules = res;
            }).catch(err => {
                this.freeLoading = false;
                this.$message.error(err.data.message);
            });
        },
        router: function (path) {
            let routeUrl = this.$router.resolve({
                path: path
            });
            window.open(routeUrl.href, '_blank');
        },
        oninput: function (value) {
            return floatNum(value);
        },
    },
    async mounted() {
        this.getFreeShipping();
        this.getShipping();
    }
};
</script>

<style scoped>
.he-margin-right {
    margin-right: 8px;
}

.he-tips {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
    opacity: 0.45;
}

.he-delivery {
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
    opacity: 0.85;
}

.le-line-btn {
    width: 1px;
    height: 15px;
    display: inline-block;
    background-color: #5e00ff;
    margin: 0 10px;
}

.he-btn {
    margin-left: 15px;
}

.he-btn .el-button {
    padding: 0;
}

.le-label__require:before {
    content: "*";
    color: red;
}
</style>
