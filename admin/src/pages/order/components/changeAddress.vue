<template>
    <el-form :model="form" label-width="125px" :rules="rules" ref="ruleForm" class="he-matter">
        <el-form-item label="收件人" prop="consignee_info.name">
            <el-input placeholder="请输入收件人姓名" v-model="form.consignee_info.name"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="consignee_info.mobile">
            <el-input placeholder="请输入联系方式" v-model="form.consignee_info.mobile"></el-input>
        </el-form-item>
        <el-form-item label="收货地址" prop="addressList">
            <el-cascader
                v-model="form.addressList"
                :options="district"
                :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="consignee_info.address">
            <el-input
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                placeholder="请输入详细地址"
                v-model="form.consignee_info.address"
                >
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script>
import district from "./district.json";

export default {
    name: "changeAddress",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                addressList: [],
                consignee_info: {
                    address: '',
                    name: '',
                    mobile: '',
                }
            },
            rules: {
                'consignee_info.address': [
                    { required: true, message: '请输入详细地址信息', trigger: 'blur' }
                ],
                addressList: [
                    { required: true, message: '请选择收货地址', trigger: 'change' }
                ],
                'consignee_info.name': [
                    { required: true, message: '请输入收件人姓名', trigger: 'blur' }
                ],
                'consignee_info.mobile': [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ]
            },
            district: [],
        }
    },
    methods: {
        getList: function(district) {
            for (let i = 0; i < district.length; i++) {
                district[i].label = district[i].name;
                district[i].value = district[i].name;
                if (district[i].list) {
                    district[i].children = district[i].list;
                    this.getList(district[i].children);
                }
            }
        },
        affirm(e) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let data = {
                        consignee_info: this.form.consignee_info,
                        order_sn: this.value.item.order_sn
                    };
                    data.consignee_info.province = this.form.addressList[0];
                    data.consignee_info.city = this.form.addressList[1];
                    data.consignee_info.district = this.form.addressList[2];
                    this.$heshop.order('put', {behavior: 'consignee'}, data).then(() => {
                        this.$message.success('修改地址成功');
                        let { handleClose } = e;
                        handleClose();
                        this.value.item.buyer = data.consignee_info;
                    }).catch(err => {
                        this.$message.error(err.data.message);
                    });
                } else {
                    return false;
                }
            });
        }
    },
    mounted() {
        this.getList(district);
        this.district = district;
    },
    watch: {
        'value.item': {
            handler(newVal) {
                let { address, city, district, mobile, name, province } = newVal.buyer;
                this.form.consignee_info.address = address;
                this.form.consignee_info.name = name;
                this.form.consignee_info.mobile = mobile;
                this.form.addressList = [province, city, district];
            },
            immediate: true
        }
    }
};
</script>

<style scoped lang="scss">
/deep/ .el-textarea {
    width: 280px;
    .el-textarea__inner {
        width: 280px;
        resize: none;
    }
}
</style>
