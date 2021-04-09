<template>
    <div class="specification">
        <el-form-item label="商品规格" required>
            <div class="specification-attr" v-for="(item,index) in selectData" :key="index">
                <Item ref="selectItem" v-model="selectData[index]" :is_cover="!is_delete(index)" :size="is_size(index)"
                      :is_delete="is_delete(index)" @delete="handleDelete(index)"></Item>
            </div>
            <div class="specification-tools__add">
                <el-button :disabled="forbidden" @click="handleAddClick">添加规格</el-button>
                <span class="__tips">最多设置3个规格</span>
            </div>
        </el-form-item>
        <el-form-item label="规格明细" v-if="tableData.length>0 && tableData[0].param_value">
            <Table v-model="tableData" :data="selectData"></Table>
        </el-form-item>
    </div>
</template>
<script type="text/javascript">
import Item from './item.vue'
import Table from './table.vue'
import model from './model.js'
import md5 from 'js-md5';

export default {
    components: {
        Item,
        Table
    },
    props: {
        value: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            errorList: [],
            tableData: [],
            totalPrice: -1,
            totalStocks: 0,
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        selectData: {
            get() {
                if (this.value.param_data && this.value.param_data.length > 0) {
                    return this.value.param_data
                } else {
                    return [{
                        name: "",
                        image_status: false,
                        value: [
                            {
                                value: "",
                                image: ""
                            }, {
                                value: "",
                                image: ""
                            }
                        ]
                    }]
                }
            },
            set(value) {
                this.value.param_data = value;
            }
        },
        forbidden() {
            return this.selectData.length === 3;
        }
    },
    watch: {
        selectData: { //监听的对象
            deep: true, //深度监听设置为 true
            handler: function (newV) {
                this.handleSumClick(newV)
            }
        },
        tableData: {
            deep: true, //深度监听设置为 true
            handler: function (newV) {
                this.value.goods_data = newV;
                this.totalStock(newV);
                this.value.stock = this.totalStocks;
                this.value.price = this.totalPrice >= 0 ? this.totalPrice : 0;
                this.$emit('change', this.value);
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        //处理初始化
        this.tableData = this.value.goods_data || [];

    },
    methods: {
        is_size(index) {
            return index === 0 ? 2 : 1
        },
        is_delete(index) {
            return index !== 0;
        },
        /**
         * 库存统计
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        totalStock(data) {
            this.totalPrice = -1;
            this.totalStocks = 0;
            data.reduce((totalStocks, item) => {
                if (this.totalPrice == -1) {
                    this.totalPrice = item.price;
                } else if (this.totalPrice > item.price) {
                    this.totalPrice = item.price;
                }
                this.totalStocks += parseInt(item.stocks)
            }, 0);
        },
        /**
         * 处理点击时间
         * @param  {[type]} selectData [description]
         * @return {[type]}            [description]
         */
        handleSumClick(selectData) {
            let modeData = [];
            for (let index in selectData) {
                let item = selectData[index];
                if (item.value) {
                    modeData.push(item.value)
                }
            }

            if (this.tableData.length > 0) {
                let rawData = JSON.parse(JSON.stringify(this.tableData));
                let newData = new model(modeData).run();

                let rawObject = {};

                for (let index in rawData) {
                    let item = rawData[index];
                    if (item.param_value) {
                        let k = md5(item.param_value);
                        rawObject[k] = item;
                    }

                }

                for (let index in newData) {
                    let item = newData[index];
                    if (item.param_value) {
                        let k = md5(item.param_value);
                        if (rawObject[k]) {
                            newData[index] = rawObject[k];
                        }
                    }
                }

                this.tableData = newData
            } else {
                this.tableData = new model(modeData).run();
            }

        },
        handleAddClick() {
            if (this.selectData.length < 3) {
                this.selectData.push({
                    title: "",
                    size: 1,
                    is_delete: true,
                    is_cover: false,
                    data: [
                        {
                            name: ""
                        }
                    ]
                })
            }
        },
        /**
         * 数据检查
         */
        handleDataCheck() {
            this.errorList = [];
            let selectArray = this.$refs.selectItem;
            for (let index in selectArray) {
                let vm = selectArray[index];
                if (vm.title == "") {
                    this.errorList.push("规格名不能为空");
                    break;
                }
                let tableData = vm.tableData;
                for (let i in tableData) {
                    let item = tableData[i];

                    if (item.value == "") {
                        this.errorList.push("规格值不能为空");
                        break;
                    }
                    if (vm.is_cover && vm.checked) {
                        if (item.image == "") {
                            this.errorList.push("规格图片不能为空");
                            break;
                        }
                    }
                }
            }
            return this.errorList;
        },
        /**
         * [handleDelete description]
         * @return {[type]} [description]
         */
        handleDelete(index) {
            this.selectData.splice(index, 1);
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>