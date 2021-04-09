export default class TableModel {
    constructor() {
        this._title = ['新购价格（元）', '成本价（元）', '续费价格（元）', '续费成本价（元）', '库存'];
        this._specAllData = []; // 所有规格传递过来的值
        /*
        合并所有的数据同时计算出最多存在的tr标签的情况
        需要用到二维数组
        一层数组存放总tr条数
        二层数组存放对象，该对象是所有规格按照排列组合的顺序排序同时保存该规格的rowpan值
        rowpan值的计算为，前一个规格 = 后面每个规格的规格值个数相乘
         */
        this['_mergeRowspan'] = [];
        this['_tr_length'] = 1; // tr标签的总数
        this['constTitle'] = [...this._title]; // 初始的固定标题头
    }

    /*
    传递回来的规格数据处理
     */
    setAllSpecDataList(data) {
        if (data['specValue'].length > 0) {
            let _length = this._specAllData.length;
            let bools = true;
            for (let i = 0; i < _length; i++) {
                if (this._specAllData[i]['spec']['id'] == data['spec']['id']) {
                    this._specAllData[i]['specValue'] = [...data['specValue']];
                    bools = false;
                    break;
                }
            }
            if (bools == true) {
                this._specAllData.push(data);
            }
        } else {
            this._specAllData = this._specAllData.filter(_e => _e['spec']['name'] != data['spec']['name']);
        }
        this.setTitle();
    }

    /*
    设置标题头部
     */
    setTitle() {
        let _title_arr = this._specAllData.map(_e => _e['spec']['name']);
        this._title = [..._title_arr, ...this.constTitle];
        this.handleMergeRowspan();
    }

    /****计算规格 合并表格单元*****/
    handleMergeRowspan() {
        this._tr_length = 1; // 全排列组合的总数
        this._specAllData.forEach((_e, _index) => {
            this._tr_length *= _e['specValue'].length;
        });
        // 计算rowspan的值
        let _rowspan_divide = 1;
        for (let i = 0; i < this._specAllData.length; i++) {
            _rowspan_divide *= this._specAllData[i]['specValue'].length;
            for (let e = 0; e < this._specAllData[i]['specValue'].length; e++) {
                this._specAllData[i]['specValue'][e]['rowspan'] = (this._tr_length) / _rowspan_divide;
            }
        }
        // 笛卡尔积
        let _recursion_spec_obj = (data) => {
            let len = data.length;
            if (len >= 2) {
                let len1 = data[0].length;
                let len2 = data[1].length;
                let newlen = len1 * len2;
                let temp = new Array(newlen);
                let index = 0;
                for (let i = 0; i < len1; i++) {
                    for (let j = 0; j < len2; j++) {
                        if (Array.isArray(data[0][i])) {
                            temp[index] = [...data[0][i], data[1][j]];
                        } else {
                            temp[index] = [data[0][i], data[1][j]];
                        }
                        index++;
                    }
                }
                let newArray = new Array(len - 1);
                for (let i = 2; i < len; i++) {
                    newArray[i - 1] = data[i];
                }
                newArray[0] = temp;
                return _recursion_spec_obj(newArray);
            } else {
                return data[0];
            }
        };
        let _result_arr = this._specAllData.map(_e => _e['specValue']);
        this._mergeRowspan = _result_arr.length == 1 ? (() => {
            let result = [];
            _result_arr[0].forEach(_e => {
                result.push([_e]);
            });
            return result || [];
        })() : _recursion_spec_obj(_result_arr);
        // 重组处理完之后的数据，用于数据绑定
        if (Array.isArray(this._mergeRowspan) == true) {
            this._mergeRowspan = this._mergeRowspan.map(_e => {
                return {
                    items: _e,
                    costData: {
                        price: 0.01,
                        renew_price: 0.01,
                        cost_renew_price: 0.01,
                        cost_price: 0.01,
                        stock: 1
                    }
                };
            });
        } else {
            this._mergeRowspan = [];
        }
    }
}