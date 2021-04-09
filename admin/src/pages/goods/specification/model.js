/*
 * @Author: qinuoyun
 * @Date:   2021-02-24 14:26:50
 * @Last Modified by:   qinuoyun
 * @Last Modified time: 2021-03-23 15:23:06
 */
/**
 * 处理字段
 * @param {[type]} array [description]
 */
const setFields = (array) => {
    let value = array.map(item => item.value).join("_");
    return {
        param_value: array[0].param_value ? array[0].param_value + value : value,
        price: array[0].price ? array[0].price : '',
        stocks: array[0].stocks ? array[0].stocks : '',
        cost_price: array[0].cost_price ? array[0].cost_price : '',
        weight: array[0].weight ? array[0].weight : '',
        goods_sn: array[0].goods_sn ? array[0].goods_sn : '',
    }
}
export default class model {
    /**
     * 处理笛卡尔积
     * @return {[type]} [description]
     */
    constructor(list) {
        this.dataList = list;
    }

    run(brr) {
        if (this.dataList.length > 1) {
            return this.dataList.reduce(this.sortTable)
        } else {
            let brr = []
            let list = this.dataList.shift();
            for (let index in list) {
                let item = list[index];
                if (item.value) {
                    brr.push({
                        cost_price: '',
                        goods_sn: "",
                        param_value: item.value,
                        price: '',
                        stocks: '',
                        weight: '',
                    })
                }
            }
            return brr
        }
    }

    /**
     * 执行循环处理数据
     * @param  {[type]} arr  [description]
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    sortTable(arr, item) {
        let brr = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < item.length; j++) {
                if (Array.isArray(arr[i])) {
                    let n = [...arr[i], item[j]];
                    brr.push(setFields(n));
                } else {
                    let n = [arr[i], item[j]];
                    brr.push(setFields(n));
                }
            }
        }
        return brr;
    }
}
