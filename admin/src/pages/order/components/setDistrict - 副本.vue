<template>
    <div>
        <el-row class="he-card" v-if="list.length > 0">
            <el-col :span="8">
                <div class="he-header">
                    <el-checkbox v-model="provinceAll" :indeterminate="provinceIndeterminate">全选</el-checkbox>
                </div>
                <div class="he-body">
                    <el-card style="height: 320px;overflow-y: auto;border: none" shadow="never">
                        <slot name="other"></slot>
                        <template v-for="(item, index) in list">
                            <div :id="'#' + item.id" class="he-body__item el-row--flex is-align-middle is-justify-space-between" :key="item.id" @click="selectProvince(index)">
                                <div class="el-row--flex is-align-middle is-justify-end">
                                    <el-checkbox v-if="!radio" @change="pickerChange(item)" v-model="item.checked" :indeterminate="item.isIndeterminate" :disabled="item.unchecked || all">
                                    </el-checkbox>
                                    <el-radio style="margin-right: 0" v-else @change="pickerChange(item)" v-model="item.isIndeterminate" :label="true">
                                    </el-radio>
                                    <span class="he-body__item-name">{{item.name}}</span>
                                </div>
                                <i v-if="item.list" class="el-icon-arrow-right"></i>
                            </div>
                        </template>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="he-header">
                    <el-checkbox v-model="cityAll" :indeterminate="cityIndeterminate">全选</el-checkbox>
                </div>
                <div class="he-body">
                    <el-card style="height: 320px;overflow-y: auto;border: none" shadow="never" v-if="list[p_index].list && list[p_index].list.length > 0">
                        <template v-for="(item, index) in list[p_index].list">
                            <div :id="'#' + item.id" :key="item.id" class="he-body__item el-row--flex is-align-middle is-justify-space-between" @click="c_index = index">
                                <div>
                                    <el-checkbox v-if="!radio" @change="pickerChange(item)" v-model="item.checked" :indeterminate="item.isIndeterminate" :disabled="item.unchecked || all">
                                    </el-checkbox>
                                    <el-radio style="margin-right: 0" v-else @change="pickerChange(item)" v-model="item.isIndeterminate" :label="true">
                                    </el-radio>
                                    <span class="he-body__item-name">{{item.name}}</span>
                                </div>
                                <i v-if="item.list" class="el-icon-arrow-right"></i>
                            </div>
                        </template>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="he-header">
                    <el-checkbox v-model="districtAll" :indeterminate="districtIndeterminate">全选</el-checkbox>
                </div>
                <div class="he-body">
                    <el-card style="height: 320px;overflow-y: auto;border: none;" shadow="never" v-if="list[p_index].list[c_index].list && list[p_index].list[c_index].list.length > 0">
                        <template v-for="(item, index) in list[p_index].list[c_index].list">
                            <div :id="'#' + item.id" :key="item.id" class=" he-body__item" @click="d_index = index">
                                <el-checkbox v-if="!radio" @change="pickerChange(item)" v-model="item.checked" :disabled="item.unchecked || all">
                                </el-checkbox>
                                <el-radio style="margin-right: 0" v-else @change="pickerChange(item)" v-model="item.checked" :label="true">
                                </el-radio>
                                <span class="he-body__item-name">{{item.name}}</span>
                            </div>
                        </template>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import district from "./district.json";
export default {
    data: function() {
        return {
            p_index: 0,
            c_index: 0,
            d_index: 0,
            provinceIndeterminate: false,
            districtIndeterminate: false,
            cityIndeterminate: false,
            districtAll: false,
            provinceAll: false,
            cityAll: false,
            districtLoading: false,
            first: true,
            defaultList: [], // 所有省市区
            tempList: [], // 已选择待返回的省市区
            list: [] // 渲染页面使用省市区列表
        }
    },
    props: {
        value: {

        },
        // detail: [], // 传入的所有省市区数组
        // edit: [], // 传入的选中省市区数组
        level: {
            type: Number,
            default: function() {
                return 3;
            }
        }, // 展示省市区的级数
        params: Array, // 传出值
        all: Boolean,
        radio: Boolean
    },
    mounted: function() {
        let self = this;
        self.districtLoading = false;
        self.defaultList = district;
        self.newList();
    },
    // watch: {
    //     // 监听传入的省市区数组
    //     detail() {
    //         this.newList();
    //     },
    //     edit() {
    //         this.newList();
    //     }
    // },
    methods: {
        // 根据传入数据重新获取省市区列表
        newList() {
            let defaultList = this.checkList(JSON.parse(JSON.stringify(this.defaultList)), this.value.select);
            // let listP = this.setListUnchecked(defaultList, 1);
            // let list = this.setListUnchecked(listP, 0);
            this.list = JSON.parse(JSON.stringify(defaultList));
            this.selectAll();
            if (this.radio) {
                for (let p_index = 0; p_index < this.list.length; p_index++) {
                    if (this.list[p_index].isIndeterminate) {
                        this.p_index = p_index;
                        if (this.first) {
                            let id = '#' + this.list[p_index].id;
                            setTimeout(() => {
                                this.first = false;
                                let element = document.getElementById(id);
                                element.scrollIntoView();
                            })
                        }
                        for (let c_index = 0; c_index < this.list[p_index].list.length; c_index++) {
                            if (this.list[p_index].list[c_index].isIndeterminate) {
                                this.c_index = c_index;
                            }
                        }
                    }
                }
            }
        },

        // 判断哪些省市区已经选择
        checkList(defaultList, edit) {
            if (typeof defaultList == 'undefined') {
                return [];
            }
            for (var i = 0; i < defaultList.length; i++) {
                defaultList[i].checked = false;
                defaultList[i].unchecked = false;
                defaultList[i].isIndeterminate = false;
                let new_edit = [];//匹配时,选中的子集列表
                for (var j = 0; j < edit.length; j++) {
                    if (defaultList[i].id == edit[j].id) {
                        defaultList[i].checked = true;
                        if (typeof edit[j].list != 'undefined') {
                            new_edit = edit[j].list//存在时,给子集列表赋值
                        }
                        break;
                    }
                }
                if (typeof defaultList[i].list != 'undefined') {
                    defaultList[i].list = this.checkList(defaultList[i].list, new_edit);
                }
                // if (typeof defaultList[i].list != 'undefined') {
                //     defaultList[i].list = this.checkList(defaultList[i].list, formDetail, edit);
                // }
                // if (typeof formDetail != 'undefined') {
                //     for (let j in formDetail) {
                //         if (typeof formDetail[j].list != 'undefined') {
                //             for (let k in formDetail[j].list) {
                //                 if (defaultList[i].id == formDetail[j].list[k].id) {
                //                     defaultList[i].unchecked = true;
                //                     break;
                //                 }
                //             }
                //         } else {
                //             if (defaultList[i].id == formDetail[j].id) {
                //                 defaultList[i].unchecked = true;
                //                 break;
                //             }
                //         }
                //     }
                // }
                // if (typeof edit != 'undefined') {
                //     for (let j in edit) {
                //         if (typeof edit[j].list != 'undefined') {
                //             for (let k in edit[j].list) {
                //                 if (defaultList[i].id == edit[j].list[k].id) {
                //                     defaultList[i].checked = true;
                //                     defaultList[i].unchecked = false;
                //                     break;
                //                 }
                //             }
                //         } else {
                //             if (defaultList[i].id == edit[j].id) {
                //                 defaultList[i].checked = true;
                //                 defaultList[i].unchecked = false;
                //                 break;
                //             }
                //         }
                //     }
                // }
            }

            return defaultList;
        },
        // 重新赋值已经选择的省市区level == 1父级影响子级||level == 0子级影响父级
        // setListUnchecked(list, level = 1) {
        //     if (typeof list == 'undefined') {
        //         return list;
        //     }
        //     for (let i = 0; i < list.length; i++) {
        //         let item = list[i];
        //         if (typeof item.list !== 'undefined') {
        //             if (level == 0) {
        //                 item.list = this.setListUnchecked(item.list, 0);
        //             }
        //             let unchecked = false;
        //             let checkCount = 0;
        //             let isIndeterminateCount = 0;
        //             for (let j = 0; j < item.list.length; j++) {
        //                 if (item.unchecked && level == 1) {
        //                     item.list[j].unchecked = true;
        //                 }
        //                 if (item.list[j].unchecked) {
        //                     unchecked = true;
        //                 }
        //                 if (item.checked) {
        //                     item.list[j].checked = true;
        //                 }
        //                 if (item.list[j].checked) {
        //                     checkCount++;
        //                 }
        //                 if (item.list[j].isIndeterminate) {
        //                     isIndeterminateCount++;
        //                 }
        //             }
        //             if (unchecked && level == 0) {
        //                 item.unchecked = true;
        //             }
        //             if (item.list.length == checkCount) {
        //                 item.checked = true;
        //             } else if (checkCount > 0) {
        //                 item.checked = false;
        //                 item.isIndeterminate = true;
        //             } else {
        //                 item.checked = false;
        //                 if (isIndeterminateCount > 0) {
        //                     item.isIndeterminate = true;
        //                 } else {
        //                     item.isIndeterminate = false;
        //                 }
        //             }
        //             if (level == 1) {
        //                 item.list = this.setListUnchecked(item.list, 1);
        //             }
        //         }
        //     }
        //     return list;
        // },
        // 将当前值的子列表的选中状态与当前值一致
        changeAllList(list, checked) {
            if (typeof list != 'undefined') {
                for (let i = 0; i < list.length; i++) {
                    if (typeof list[i].list != 'undefined') {
                        list[i].list = this.changeAllList(list[i].list, checked);
                    }
                    list[i].checked = checked;
                }
            }
            return list;
        },
        // 重置所有省市区的选中状态 返回已选中的省市区
        setTempList(list) {
            let newList = [];
            let checkCount = 0;
            let isIndeterminateCount = 0;
            for (let i = 0; i < list.length; i++) {
                if (typeof list[i].list != 'undefined') {
                    let childList = this.setTempList(list[i].list);
                    if (childList.isIndeterminateCount > 0) {
                        list[i].checked = false;
                        list[i].isIndeterminate = true;
                        isIndeterminateCount++;
                        newList = newList.concat(childList.newList);
                    } else if (childList.checkCount < list[i].list.length) {
                        list[i].checked = false;
                        if (childList.checkCount > 0) {
                            list[i].isIndeterminate = true;
                            isIndeterminateCount++;
                            newList = newList.concat(childList.newList);
                        } else {
                            list[i].isIndeterminate = false;
                        }
                    } else {
                        list[i].checked = true;
                        list[i].isIndeterminate = false;
                    }
                }
                if (list[i].checked) {
                    checkCount++;
                    newList.push(list[i]);
                }
            }
            return {
                newList: newList,
                checkCount: checkCount,
                isIndeterminateCount: isIndeterminateCount
            };
        },
        // 向父组件发送消息
        pickerChange(item) {
            if (this.radio) {
                let provinceItem = {
                    id: '',
                    name: ''
                };
                let cityItem = {
                    id: '',
                    name: ''
                };
                let districtItem = {
                    id: '',
                    name: ''
                };
                for (let province of this.list) {
                    province.isIndeterminate = false;
                    if (item.parent_id == 1) {
                        if (item.id == province.id) {
                            province.isIndeterminate = true;
                            provinceItem.id = province.id;
                            provinceItem.name = province.name;
                        }
                    } else {
                        if (item.level == 'city' && item.parent_id == province.id) {
                            province.isIndeterminate = true;
                            provinceItem.id = province.id;
                            provinceItem.name = province.name;
                        }
                    }
                    for (let city of province.list) {
                        city.isIndeterminate = false;
                        if (item.level == 'city') {
                            if (item.id == city.id) {
                                city.isIndeterminate = true;
                                cityItem.id = city.id;
                                cityItem.name = city.name;
                            }
                        }
                        if (item.level == 'district') {
                            if (item.parent_id == city.id) {
                                city.isIndeterminate = true;
                                cityItem.id = city.id;
                                cityItem.name = city.name;
                                province.isIndeterminate = true;
                                provinceItem.id = province.id;
                                provinceItem.name = province.name;
                            }
                        }
                        for (let district of city.list) {
                            district.checked = false;
                            if (item.level == 'district') {
                                if (item.id == district.id) {
                                    district.checked = true;
                                    districtItem.id = district.id;
                                    districtItem.name = district.name;
                                    this.$emit('selected', [provinceItem, cityItem, districtItem]);
                                }
                            }
                        }
                    }
                }
            } else {
                this.changeAllList(item.list, item.checked);
                let tempList = this.setTempList(this.list);
                this.tempList = tempList.newList;
                this.$emit('selected', this.tempList, this.params);
            }
            this.selectAll();
        },
        // 选择省份
        selectProvince(index) {
            this.p_index = index;
            this.c_index = 0;
            this.d_index = 0;
            this.selectAll();
        },
        selectAll() {
            let provinceCount = 0;
            let cityCount = 0;
            let districtCount = 0;
            for (let i = 0; i < this.list.length; i++) {
                if (this.list[i].checked || this.list[i].isIndeterminate) {
                    provinceCount++;
                }
            }
            for (let i = 0; i < this.list[this.p_index].list.length; i++) {
                if (this.list[this.p_index].list[i].checked) {
                    cityCount++;
                }
            }
            for (let i = 0; i < this.list[this.p_index].list[this.c_index].list.length; i++) {
                if (this.list[this.p_index].list[this.c_index].list[i].checked) {
                    districtCount++;
                }
            }
            if (provinceCount === this.list.length) {
                this.provinceAll = true;
                this.provinceIndeterminate = false;
            } else {
                this.provinceAll = false;
                this.provinceIndeterminate = true;
            }
            if (provinceCount === 0) {
                this.provinceIndeterminate = false;
            }
            if (cityCount === this.list[this.p_index].list.length) {
                this.cityAll = true;
                this.cityIndeterminate = false;
            } else {
                this.cityAll = false;
                this.cityIndeterminate = true;
            }
            if (cityCount === 0) {
                this.cityIndeterminate = false;
            }
            if (districtCount === this.list[this.p_index].list[this.c_index].list.length) {
                this.districtAll = true;
                this.districtIndeterminate = false;
            } else {
                this.districtAll = false;
                this.districtIndeterminate = true;
            }
            if (districtCount === 0) {
                this.districtIndeterminate = false;
            }
        },
        affirm(e) {
            let { handleClose } = e;
            this.value.select = this.tempList;
            this.$emit('input', this.value);
            handleClose();
        }
    }
};
</script>
<style scoped lang="scss">
.he-card {
    width: 702px;
    height: 359px;
    margin: auto;
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    margin-bottom: 12px;
}

.he-card>div {
    height: 358px;
}

.he-card>div:not(:last-child) {
    border-right: 1px solid #DCDFE6;
}

.he-header {
    height: 39px;
    border-bottom: 1px solid #DCDFE6;
    padding-left: 16px;
    line-height: 39px;
}

.he-body {
    height: 318px;
    overflow-y: auto;

    /deep/ .el-card__body {
        padding: 0;
    }

    /deep/.el-card::-webkit-scrollbar {
        display: none;
    }
}

.he-body::-webkit-scrollbar {
    display: none;
}

.he-body__item {
    height: 32px;
    padding-left: 16px;
    line-height: 32px;
    cursor: pointer;
    padding-right: 11px;
}

.he-body__item-name {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    line-height: 32px;
    opacity: 0.85;
    margin-left: 8px;
}

.el-icon-arrow-right {
    //float: right;
}
</style>