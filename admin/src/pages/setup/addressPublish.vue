<template>
    <div class="le-matter">
        <el-row>
            <el-col>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item class="he-link" >
                        <he-link href="setup/address">
                            退货地址
                        </he-link>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item>{{form.id?'编辑地址':'新建地址'}}</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="le-line"></el-row>
        <el-row>
            <el-col>
                <el-card class="le-form-card">
                    <el-form ref="ruleForm" :model="form" label-width="176px" :rules="rules">
                        <el-form-item label="收件人姓名" prop="name">
                            <el-input v-model="form.name" placeholder="请输入收件人姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式" prop="mobile">
                            <el-input v-model="form.mobile" placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                        <el-form-item label="联系地址" prop="addressList">
                            <el-cascader
                                v-model="form.addressList"
                                :options="district"
                                :props="{ expandTrigger: 'hover' }"></el-cascader>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="address">
                            <el-input type="textarea" placeholder="请输入详细地址" v-model="form.address"></el-input>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
        </el-row>
        <div class="le-cardpin">
            <el-button type="primary" @click="save">保存</el-button>
        </div>
    </div>
</template>

<script>
import district from "./../order/components/district.json";

export default {
    name: "addressPublish",
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
                addressList: [
                    { required: true, message: '请选择收货地址', trigger: 'change' }
                ],
                'name': [
                    { required: true, message: '请输入收件人姓名', trigger: 'blur' }
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
        save() {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let data = this.form;
                    data.province = this.form.addressList[0];
                    data.city = this.form.addressList[1];
                    data.district = this.form.addressList[2];
                    if (data.id) {
                        this.$heshop.address('put', parseInt(data.id), data).then(() => {
                            this.$router.back();
                        }).catch(err => {
                            this.$message.error(err.data[0].message);
                        });
                    } else {
                        this.$heshop.address('post', data).then(() => {
                            this.$router.back();
                        }).catch(err => {
                            this.$message.error(err.data[0].message);
                        });
                    }
                } else {
                    return false;
                }
            });
        },
        getDetail: function(id) {
            this.$heshop.address('get', id).then(res => {
                this.getList(district);
                this.district = district;
                this.$set(this.form.addressList, 0, res.province);
                this.$set(this.form.addressList, 1, res.city);
                this.$set(this.form.addressList, 2, res.district);
                this.form.name = res.name;
                this.form.mobile = res.mobile;
                this.form.id = res.id;
                this.form.address = res.address;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    },
    mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (id) {
            this.getDetail(parseInt(id));
        } else {
            this.getList(district);
            this.district = district;
        }

    },
};
</script>

<style scoped lang="scss">
.le-form-card {
    background: #FFFFFF;
    border-radius: 16px;
    box-shadow: none !important;
}
/deep/ .el-textarea {
    width: 280px;
.el-textarea__inner {
    width: 280px;
    resize: none;
    height: 100px;
}
}
</style>
