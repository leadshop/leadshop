<template>
    <el-form-item label="规格明细">
        <el-row>
            <el-col :span="24">
                <vxe-table ref="attrTable" :data="newVal.goods_data" max-height="478" show-overflow :border="false" @checkbox-change="selectionChange" @checkbox-all="selectAll">
                    <vxe-table-column width="55" type="checkbox">
                    </vxe-table-column>
                    <vxe-table-column v-for="(item, index) in newVal.param_data" :field="'attrList['+index+'].value'" :key="index" :title="item.name">
                    </vxe-table-column>
                    <vxe-table-column title="价格">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.price" @input="change()"></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column title="库存">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.stocks" @input="change()"></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column title="成本价（元）">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.cost_price" @input="change()"></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column title="重量（kg）">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.weight" @input="change()"></el-input>
                        </template>
                    </vxe-table-column>
                    <vxe-table-column title="货号">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.goods_sn" @input="change()"></el-input>
                        </template>
                    </vxe-table-column>
                </vxe-table>
            </el-col>
            <el-col :span="24">
                <div class="le-attr__operating el-row--flex is-justify-space-between">
                    <div class="el-row--flex">
                         <el-checkbox class="le_goods__header-checkbox" @click="changeAll">全选</el-checkbox>
                         <el-button type="text" class="he-setup-all">批量设置</el-button>
                    </div>
                    <div class="el-row--flex" v-if="select.length > 0">
                        <el-popover v-model="visible" title=" " trigger="click">
                            <div class="el-popconfirm">
                                <p class="el-popconfirm__main">
                                    <el-input v-model="price"></el-input>
                                </p>
                                <div class="el-popconfirm__action">
                                    <el-button size="mini" type="text" @click="cancel('visible')">取消</el-button>
                                    <el-button size="mini" type="primary" @click="confirm('price','visible')">确定</el-button>
                                </div>
                            </div>
                            <el-button type="text" class="he-set-up" slot="reference" style="width: 120px;">价格</el-button>
                        </el-popover>
                        <el-popover v-model="visible1" title=" " trigger="click">
                            <div class="el-popconfirm">
                                <p class="el-popconfirm__main">
                                    <el-input v-model="stocks" type="number"></el-input>
                                </p>
                                <div class="el-popconfirm__action">
                                    <el-button size="mini" type="text" @click="cancel('visible1')">取消</el-button>
                                    <el-button size="mini" type="primary" @click="confirm('stocks','visible1')">确定</el-button>
                                </div>
                            </div>
                            <el-button type="text" class="he-set-up" slot="reference" style="width: 120px;">库存</el-button>
                        </el-popover>
                        <el-popover v-model="visible2" title=" " trigger="click">
                            <div class="el-popconfirm">
                                <p class="el-popconfirm__main">
                                    <el-input v-model="cost_price"></el-input>
                                </p>
                                <div class="el-popconfirm__action">
                                    <el-button size="mini" type="text" @click="cancel('visible2')">取消</el-button>
                                    <el-button size="mini" type="primary" @click="confirm('cost_price','visible2')">确定</el-button>
                                </div>
                            </div>
                            <el-button type="text" class="he-set-up" slot="reference" style="width: 120px;">成本价</el-button>
                        </el-popover>
                        <div style="width: 240px;"></div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-form-item>
</template>
<script>
import Vue from "vue";
import "xe-utils";
import VxeTable from "vxe-table";
import "vxe-table/lib/style.css";
import VXETablePluginElement from "vxe-table-plugin-element";
import "vxe-table-plugin-element/dist/style.css";
Vue.use(VxeTable);
VxeTable.use(VXETablePluginElement);
import { debounce } from "./../utils.js";

export default {
    name: "attrList",
    data() {
        return {
            visible: false,
            visible1: false,
            visible2: false,
            price: '',
            stocks: '',
            cost_price: '',
            newVal: {},
            select:[]
        }
    },
    props: {
        value: Object
    },
    methods: {
        hintRender() {
            return this.$createElement('HelpHint', {
                props: {
                    content: '序号越大，排序越靠前'
                }
            }, '排序');
        },
        cancel(visible){
            this[visible] = false;
        },
        confirm(key,visible){
            if (this.select.length>0) {
                for (let i = 0 ; i < this.select.length; i++) {
                    this.select[i][key] = this[key];
                }
                debounce(this.getData,500);
            }
            this[visible] = false;
        },
        selectionChange(val) {
            this.select = val.records;
        },
        selectAll(val) {
            this.select = val.records;
        },
        changeAll: function() {
            this.$refs.attrTable.setCheckboxRow(this.newVal.goods_data,true);
        },
        change() {
            debounce(this.getData, 500);
        },
        getData() {
            this.$emit('input', this.newVal);
        }
    },
    watch: {
        value: {
            handler(newVal) {
                this.newVal = this.$heshop.utils.deepClone(newVal);
                this.$emit('getData', this.newVal.goods_data);

            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style scoped lang="scss">
.he-attrtable /deep/ .el-input__inner {
    width: 100px;
}

.he-star {
    content: '*';
    color: red;
}

/deep/.vxe-tree-cell {
    padding-left: 0;
}

/deep/ .vxe-table .is--checked.vxe-cell--checkbox .vxe-checkbox--icon:before {
    background-color: #623ceb;
    border-color: #623ceb;
}

/deep/ .vxe-table .vxe-cell--checkbox .vxe-checkbox--icon:before {
    height: 14px;
    width: 14px;
    border: 1px solid #dcdfe6;
}

/deep/ .vxe-table .vxe-cell--checkbox .vxe-checkbox--checked-icon:after {
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    top: 38%;
    left: 43%;
    width: .26em;
    height: .55em;
}

/deep/ .vxe-table .vxe-cell--checkbox .vxe-checkbox--indeterminate-icon:after {
    width: 9px;
    height: 1px;
    transform: translate(0, -50%);
    top: 50%;
    left: 20%;
}

/deep/.vxe-table .is--indeterminate.vxe-cell--checkbox .vxe-checkbox--icon:before {
    background-color: #623ceb;
    border-color: #623ceb;
    color: #dcdfe6;
}

/deep/.vxe-table .vxe-table--border-line {
    border: 0;
}

/deep/.col--checkbox .vxe-cell {
    padding-left: 14px;
}

.le-attr__operating {
    width: 100%;
    height: 48px;
    background-color: #f3f5f7;
    line-height: 48px;
    padding-left: 14px;
    max-height: 478px;
}
.he-set-up {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #623ceb;
    line-height: 22px;
    opacity: 0.85;
}

.he-setup-all {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #010101;
    opacity: 0.85;
}
</style>