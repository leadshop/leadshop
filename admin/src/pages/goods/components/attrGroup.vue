<template>
    <el-form-item label="商品规格" required>
        <el-row>
            <el-col :span="24" v-for="(item, index) in value.param_data" :key="index" class="le_attr__item">
                <div class="le-proSpec">
                    <div class="le-proSpec__header el-row--flex is-align-middle">
                        <div class="le-proSpec__label">规格名</div>
                        <el-input class="le-proSpec__header-input" maxlength="10" v-model="item.name" show-word-limit></el-input>
                        <div class="le-proSpec__header-checkbox" v-if="index === 0">
                            <el-checkbox v-model="item.image_status">规格图片</el-checkbox>
                        </div>
                        <i class="le-icon le-icon-cha2" v-if="index > 0" @click="deleteAttrGroup(index)"></i>
                    </div>
                    <div class="le-proSpec__body el-row--flex">
                        <div class="le-proSpec__label le-proSpec__body-label">规格值</div>
                        <div class="le-proSpec__body-item el-row--flex">
                            <div v-for="(attr, index2) in item.value" :key="index2" class="le-proSpec__body-attr">
                                <el-input v-model="attr.value" class="le-proSpec__header-input" onblur="" @input="change"></el-input>
                                <div class="le-proSpec__header-upload" v-if="index === 0 && item.image_status">
                                    <he-upload :max="1" v-model="attr.image" :is-big="false" />
                                </div>
                                <i class="le-icon le-icon-cha2" v-if="(index === 0 && index2 > 1) || (index > 0 && index2 > 0)" @click="deleteAttr(index, index2)"></i>
                            </div>
                            <div class="le-proSpec__header-btn">
                                <el-button type="text" @click="addAttr(index)">增加规格值</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="he-tips" v-if="index === 0">
                        仅支持为第一组规格设置规格图片，建议尺寸：800×800像素
                    </div>
                </div>
            </el-col>
            <el-col :span="8">
                <el-button class="he-add-attr" :disabled="value.param_data.length === 3" @click="addAttrGroup">添加规格</el-button>
                <span class="he-tips" style="margin-left: 15px">
                    最多设置3个规格
                </span>
            </el-col>
        </el-row>
    </el-form-item>
</template>
<script>
import { guid, debounce } from './../utils.js';

function make_pow(n) {
    return function(x) {
        return Math.pow(x, n);
    }
}
export default {
    name: "attrGroup",
    props: {
        value: [Object, Array]
    },
    methods: {
        addAttr(index) {
            this.value.param_data[index].value.push({
                value: '',
                image: '',
                attrId: guid('he')
            });
            this.setGroup();
        },
        deleteAttrGroup(index) {
            this.value.param_data.splice(index, 1);
            this.setGroup();
        },
        addAttrGroup() {
            this.value.param_data.push({
                name: '',
                attrGroupID: guid('he'),
                value: [{
                    value: ''
                }]
            });
            this.setGroup();
        },
        deleteAttr(index1, index2) {
            this.value.param_data[index1].value.splice(index2, 1);
            this.setGroup();
        },
        makeAttrGroup() {
            console.time();
            let self = this;
            let array = [];
            self.value.param_data.forEach((attrGroupItem, attrGroupIndex) => {
                attrGroupItem.value.forEach(attrListItem => {
                    let object = {
                        name: attrGroupItem.name,
                        value: attrListItem.value,
                    };
                    if (!array[attrGroupIndex]) {
                        array[attrGroupIndex] = [];
                    }
                    array[attrGroupIndex].push(object);
                });
            });

            // 2.属性排列组合
            const res = array.reduce((osResult, options) => {
                return options.reduce((oResult, option) => {
                    return !osResult.length ? oResult.concat(option) : oResult.concat(osResult.map(o => [].concat(o, option)));
                }, [])
            }, []);
            console.timeEnd();
            console.time();
            for (let q = 0; q < res.length; q++) {
                let options = Array.isArray(res[q]) ? res[q] : [res[q]];
                let row = {
                    attrList: options,
                    cost_price: 0,
                    price: 0,
                    stocks: 0,
                    goods_sn: '',
                    weight: 0,
                    param_value: '',
                };
                let param_value = ``;
                options.forEach(item => {
                    param_value += `_${item.value}`;
                });
                param_value = param_value.slice(1, param_value.length);
                row.param_value = param_value;
                if (self.value.goods_data.length > 0) {
                    for (let i = 0; i < self.value.goods_data.length; i++) {
                        let attr = self.value.goods_data[i];
                        if (attr.param_value === row.param_value) {
                            row['cost_price'] = attr.cost_price;
                            row['id'] = attr.id;
                            row['price'] = attr.price;
                            row['stocks'] = attr.stocks;
                            row['weight'] = attr.weight;
                            row['goods_sn'] = attr.goods_sn;
                            break;
                        }
                    }
                }
                res[q] = row;
            }
            console.timeEnd();
            self.value.goods_data = res;

        },
        setGroup() {
            debounce(this.makeAttrGroup, 500);
        },
        change() {
            this.makeAttrGroup()
        }
    }
};
</script>
<style scoped>
.le_attr__item {
    margin-bottom: 8px;
}

.le-proSpec {
    width: 100%;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #F3F5F7;
}

.le-proSpec__header {
    height: 56px;
    background: #F3F5F7;
    border-radius: 4px;
    padding-left: 16px;
    position: relative;
}

.le-proSpec__label {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
    opacity: 0.85;
}

.le-proSpec__body-label {
    margin-left: 16px;
    margin-top: 21px;
}

.le-proSpec__header-input {
    margin-left: 16px;
}

.le-proSpec__body-attr {
    position: relative;
}

.el-input.le-proSpec__header-input {
    width: 200px;
}

.le-proSpec__header-checkbox {
    margin-left: 16px;
}

.le-proSpec__header-checkbox /deep/ .el-checkbox__label {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 44px;
    opacity: 0.85;
}

.le-proSpec__body {
    min-height: 56px;
    width: 100%;

}

.le-proSpec__body-item {
    max-width: calc(100% - 72px);
    -webkit-flex-direction: row;
    flex-direction: row;
    flex-wrap: wrap;
}

.le-proSpec__body-item .le-proSpec__header-input {
    line-height: 56px;
}

.le-proSpec__header-btn {
    line-height: 56px;
}

.le-proSpec__header-btn .el-button.el-button--text {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #623ceb;
    opacity: 0.85;
    padding: 0;
    margin-left: 16px;
}

.he-tips {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
    opacity: 0.4;
    margin-left: 15px;
}

.le-icon-cha2 {
    position: absolute;
    right: -15px;
    top: -2px;
    cursor: pointer;
    color: #B2B2B2;
}

.le-proSpec__header .le-icon-cha2 {
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
}

.le-proSpec__header-upload {
    width: 80px;
    height: 80px;
    margin: 8px 0 8px 16px;
}

.he-tips {
    margin-bottom: 19px;
    margin-left: 72px;
}

.he-add-attr {
    border: 1px solid #623CEB;
    color: #623CEB;
}

.he-add-attr[disabled] {
    background: #F3F5F7;
    border: none;
    color: rgba(0, 0, 0, 0.45);
}

/*.he-add-attr:hover {*/
/*    background: #FFFFFF;*/
/*}*/
</style>