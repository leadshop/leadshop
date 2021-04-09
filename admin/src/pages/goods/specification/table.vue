<script type="text/javascript">
import popover from './popover';

export default {
    components: {
        popover
    },
    provide() {
        return {
            self: this
        };
    },
    props: {
        value: {
            type: [Array]
        },
        data: {
            type: [Array]
        }
    },
    data() {
        return {
            numsum: 0,
            checkAll: false,
            isIndeterminate: false,
            checkedCities: []
        };
    },
    methods: {
        /**
         * 表格选择按钮
         * @param  {[type]} data [description]
         * @return {[type]}      [description]
         */
        handleSelection(value) {
            let checkedCount = value.length;
            this.checkedCities = value;
            this.checkAll = checkedCount === this.value.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.value.length;
        },
        /**
         * 底部全选按钮
         * @return {[type]} [description]
         */
        handleCheckAllChange() {
            this.$refs.multipleTable.toggleAllSelection();
        },
        /**
         * 只允许输入文字
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        inputChange(event) {
            let value = event.target.value;
            const isError = (msg) => {
                this.$message({
                    message: msg,
                    type: 'warning'
                });
                event.target.style.borderColor = "red"
            };
            const isDefault = () => event.target.style.borderColor = "#DCDFE6";

            /**
             * 价格
             * @param  {[type]} event.target.name [description]
             * @return {[type]}            [description]
             */
            if (event.target.name === 'price') {
                if (value > 9999999) {
                    isError("价格最大不能超过9999999")
                }
            }
            /**
             * 库存
             * @param  {[type]} value.name [description]
             * @return {[type]}            [description]
             */
            if (event.target.name === 'stocks') {
                if (value > 999999999) {
                    isError("库存最大值不能超过999999999")
                }

            }
            /**
             * 成本价
             * @param  {[type]} value.cost_price [description]
             * @return {[type]}                  [description]
             */
            if (event.target.name === 'cost_price') {
                if (value > 9999999) {
                    isError("成本价最大不能超过9999999")
                }
            }
            /**
             * 重量
             * @param  {[type]} event.target.name [description]
             * @return {[type]}            [description]
             */
            if (event.target.name === 'weight') {
                if (value > 10000) {
                    isError("重量最大不能超过10000kg")
                }
            }
            /**
             * 货号
             * @param  {[type]} event.target.name [description]
             * @return {[type]}            [description]
             */
            if (event.target.name === 'goods_sn') {

            }
        },
        /**
         * 数字格式化操作
         * @param  {[type]} value [description]
         * @param  {[type]} props [description]
         * @param  {[type]} key   [description]
         * @return {[type]}       [description]
         */
        clearNoNum(value, props, key) {
            if (key !== 'goods_sn') {
                if (key == 'stocks') {
                    props.row[key] = value.replace(/[^\d]/g, ""); //清除“数字”和“.”以外的字符   
                } else {
                    value = value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符   
                    value = value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
                    value = value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
                    value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数   
                    //数字验证
                    if (value.indexOf(".") < 0 && value != "") { //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
                        props.row[key] = parseFloat(value);
                    } else {
                        props.row[key] = value;
                    }
                }
            }
        }

    },
    render() {
        let {handleSelection, data, inputChange, clearNoNum, numsum} = this;
        let scopedArray = [];

        let height = this.value.length < 8 ? this.value.length * 56 + 92 : '526';

        //设置上传样式
        const defaultData = {
            props: {
                'use-virtual': true,
                'data': this.value,
                'border': false,
                'stripe': false,
                'row-height': 56,
                'rules': "rules",
                'height': height + 'px',
                'tooltip-effect': 'dark',
                'big-data-checkbox': true
            },
            on: {
                'selection-change': handleSelection
            },
            ref: 'multipleTable'
        };


        for (let index in data) {
            let item = data[index];
            if (item.name) {
                scopedArray.push({
                    props: {
                        width: 156,
                        label: item.name
                    },
                    scopedSlots: {
                        //defaul 默认具名插槽
                        default: props => {
                            let param_value = props.row['param_value'].split('_');
                            return <div class="__table_tag">{param_value[index]}</div>;
                        }
                    }
                })
            }
        }

        let scopedTools = [
            {
                name: "price",
                label: "价格",
                unique: true,
                fixed: "right",
                width: 110,
            }, {
                name: "stocks",
                label: "库存",
                fixed: "right",
                unique: true,
                width: 110,
            }, {
                name: "cost_price",
                label: "成本价(元)",
                fixed: "right",
                unique: false,
                width: 110,
            }, {
                name: "weight",
                label: "重量(kg)",
                fixed: "right",
                unique: false,
                width: 110,
            }, {
                name: "goods_sn",
                fixed: "right",
                label: "货号",
                unique: false,
                width: 110,
            }
        ]


        for (let index in scopedTools) {
            let item = scopedTools[index];
            if (item.name) {
                scopedArray.push({
                    props: {
                        ...item
                    },
                    scopedSlots: {
                        //defaul 默认具名插槽
                        header: () => {
                            if (item.unique) {
                                return <label><span style="color: red">*</span> {item.label}</label>
                            } else {
                                return item.label
                            }

                        },
                        default: props => {
                            let propData = {
                                on: {
                                    keyup: inputChange
                                }
                            }
                            const e1 = (value) => {
                                clearNoNum(value, props, item.name)
                            }
                            if (item.name === 'stocks') {
                                numsum += props.row[item.name];
                            }
                            return (
                                // on-blur={inputChange} on-keyup={clearNoNum}
                                <el-input {...propData} on-blur={inputChange} on-input={e1} name={item.name}
                                          v-model={props.row[item.name]}></el-input>
                            );
                        }
                    }
                })
            }
        }


        let checkboxData = {
            props: {
                'indeterminate': this.isIndeterminate
            },
            on: {
                change: this.handleCheckAllChange
            }
        }
        let {checkAll} = this;

        //用于隐藏显示批量操作
        let tools = this.checkedCities.length > 0 ? <div class="footer_popover">
            <popover field="price">价格</popover>
            <popover field="stocks">库存</popover>
            <popover field="cost_price">成本价</popover>
            <popover field="weight">重量</popover>
            <popover field="goods_sn">货号</popover>
        </div> : "";

        return <div class="specification-table">
            <u-table {...defaultData}>
                <u-table-column type="selection" fixed="left" width="40"></u-table-column>
                {
                    scopedArray.map((item) => {
                        return <u-table-column {...item}></u-table-column>
                    })
                }
            </u-table>
            <div class="specification-table__footer">
                <div class="__all_checkbox">
                    <el-checkbox {...checkboxData} v-model={checkAll}><span></span></el-checkbox>
                </div>
                <span class="__all_tips">批量设置</span>
                {tools}
            </div>
        </div>
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>