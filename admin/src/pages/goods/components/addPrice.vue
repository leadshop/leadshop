<template>
    <div>
        <el-form-item>
            <span class="le-label__require" slot="label">规格选择</span>
            <el-radio-group v-model="value.param_type" @change="paramTypeChange">
                <el-radio :label="1">单规格</el-radio>
                <el-radio :label="2">多规格</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item v-if="value.param_type === 1" >
            <span class="le-label__require" slot="label">规格值</span>
            <el-input v-model="value.param.param_data[0].value[0].value" @input="paramValueChange"></el-input>
        </el-form-item>
        <specification @change="handleChange" v-model="value.param" ref="specification" v-if="value.param_type === 2"></specification>
        <el-form-item v-if="value.param_type === 1">
            <span class="le-label__require" slot="label">商品价格</span>
            <el-input v-model="value.price" :maxlength="8">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item label="划线价">
            <el-input v-model="value.line_price" :maxlength="8">
                <template slot="append">元</template>
            </el-input>
            <p class="he-tips" style="padding-left: 0;margin:0;">当商品无任何优惠时，显示划线价</p>
        </el-form-item>
        <el-form-item label="成本价" v-if="value.param_type === 1" :maxlength="10">
            <el-input v-model="value.param.goods_data[0].cost_price">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <span class="le-label__require" slot="label">库存</span>
            <el-input v-model="value.stocks" :disabled="value.param_type === 2"></el-input>
        </el-form-item>
        <el-form-item label="重量" v-if="value.param_type === 1">
            <el-input v-model="value.param.goods_data[0].weight">
                <template slot="append">KG</template>
            </el-input>
        </el-form-item>
        <el-form-item label="货号" v-if="value.param_type === 1">
            <el-input v-model="value.param.goods_data[0].goods_sn"></el-input>
        </el-form-item>
        <el-form-item>
            <span class="le-label__require" slot="label">单位</span>
            <el-input v-model="value.unit" v-on:input="value.unit=unitCheck(value.unit)"></el-input>
        </el-form-item>
        <el-form-item label="虚拟已售">
            <el-input v-model="value.virtual_sales"></el-input>
        </el-form-item>
    </div>
</template>
<script>
import specification from "../specification";
export default {
    props: {
        value: {
            type: Object
        }
    },
    methods: {
        unitCheck(unit){
            unit = unit.substr(0,2);
            return unit.replace(/[0-9]/g, '');
        },
        handleChange(value) {
            this.value.stocks = value.stock
            this.value.price = value.price
        },
        paramValueChange(e) {
            this.value.param.goods_data[0].param_value = e;
            // this.value.param.param_data[0].value[0].value = e;
        },
        paramTypeChange() {
            this.value.param = {
                goods_data: [{
                    param_value: '',
                    price: '',
                    stocks: 1000,
                    cost_price: '',
                    weight: '',
                    goods_sn: ''
                }],
                param_data: [{
                    name: '',
                    image_status: false,
                    value: [{
                        value: '',
                        image: ''
                    }]
                }]
            }
            this.value.stocks = 1000;
            this.value.price = 0;
        },
        getData(data) {
            let stocks = 0;
            data.forEach(v => {
                if (this.value.price > v.price) {
                    this.value.price = v.price;
                }
                stocks += v.stocks ? parseInt(v.stocks) : 0;
            })
            this.value.stocks = stocks;
        },
        handleDataCheck() {
            return this.$refs.specification.handleDataCheck();
        }
    },
    watch: {
        'value.stocks': {
            handler(newVal) {
                if (this.value.param_type === 1) {
                    this.value.param.goods_data[0].stocks = newVal;
                }
            },
            deep: true,
            immediate: true
        },
        'value.price': {
            handler(newVal) {
                if (this.value.param_type === 1) {
                    this.value.param.goods_data[0].price = newVal;
                }
            },
            deep: true,
            immediate: true
        }
    },
    components: {
        specification
    }
}
</script>
<style scoped>
.he-tips {
    font-size: 12px;
    font-weight: 400;
    color: #000000 !important;
    opacity: 0.45;
}

.le-label__require:before {
    content: "*";
    color: red;
}
</style>
