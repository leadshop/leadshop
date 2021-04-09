<template>
    <div class="le-matter">
        <el-form ref="ruleForm" :model="form" label-width="120px" :rules="rules">
            <el-form-item label="收货人姓名" prop="name">
                <el-input v-model="form.name" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="mobile">
                <el-input v-model="form.mobile" placeholder="请输入联系方式"></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="addressList">
                <el-cascader v-model="form.addressList" :options="district" :props="{ expandTrigger: 'hover' }"></el-cascader>
            </el-form-item>
            <el-form-item label="详细地址" prop="address">
                <el-input type="textarea" placeholder="请输入详细地址" v-model="form.address"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import district from "./district.json";
export default {
    name: "insertAddress",
    props: {
        value: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            district: [],
            form: {
                addressList: [],
                name: '',
                mobile: '',
                address: '',
                id: null
            },
            rules: {
                'address': [
                    { required: true, message: '请输入详细地址信息', trigger: 'blur' }
                ],
                'addressList': [
                    { required: true, message: '请选择收货地址', trigger: 'change' }
                ],
                'name': [
                    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
                ],
                'mobile': [
                    { required: true, message: '请输入联系方式', trigger: 'blur' }
                ]
            },
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
        affirm: function(e) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let data = this.form;
                    data.province = this.form.addressList[0];
                    data.city = this.form.addressList[1];
                    data.district = this.form.addressList[2];

                    this.$heshop.address('post', data).then((data) => {
                        this.value.item.unshift(data)
                        this.$message.success('添加成功');
                        let { handleClose } = e;
                        handleClose();
                    }).catch(err => {
                        this.$message.error(err.data[0].message);
                    });
                } else {
                    this.$message.error(err.data.message);
                }
            });
        }
    },
    mounted() {
        this.getList(district);
        this.district = district;
    },
};
</script>
<style scoped lang="scss">
/deep/ .el-textarea {
    width: 280px;

    .el-textarea__inner {
        width: 280px;
        resize: none;
        height: 100px;
    }
}
</style>