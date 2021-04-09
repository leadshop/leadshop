<template>
    <el-form :model="form" label-width="125px" :rules="rules" ref="ruleForm" class="he-matter">
        <el-form-item label="发货信息">
            <div class="he-delivery-information">
                {{value.item.buyer.name}} {{value.item.buyer.mobile}}<br />
                {{value.item.buyer.address}}
            </div>
        </el-form-item>
        <el-form-item label="发货方式">
            <el-radio-group v-model="form.type">
                <el-radio :label="1">自己联系快递</el-radio>
                <el-radio :label="2">无需物流</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="form.type === 1">
            <el-form-item label="物流公司" prop="logistics_company">
                <el-input maxlength="15" placeholder="请输入物流公司名称" v-model="form.logistics_company"></el-input>
            </el-form-item>
            <el-form-item label="快递单号" prop="freight_sn">
                <el-input maxlength="20" placeholder="请输入快递单号" v-model="form.freight_sn"></el-input>
            </el-form-item>
        </template>
    </el-form>
</template>
<script>
export default {
    name: "orderShipping",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            form: {
                type: 1,
                logistics_company: '',
                freight_sn: ''
            },
            rules: {
                freight_sn: [
                    { required: true, message: '请输入快递单号', trigger: 'blur' }
                ],
                logistics_company: [
                    { required: true, message: '请输入物流公司名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        affirm(e) {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    this.$heshop.order('put', {id: this.value.item.id, behavior: 'send'}, this.form).then(res => {
                        this.value.item.status = res.status;
                        this.value.item.freight = {
                            type:this.form.type,
                            freight_sn:this.form.freight_sn,
                            logistics_company:this.form.logistics_company,
                        };
                        this.$message.success('发货成功');
                        let { handleClose } = e;
                        handleClose();
                    }).catch(err => {
                        this.$message.error(err.data.message);
                    });
                } else {
                    return false;
                }
            });
        }
    }
};
</script>
<style scoped lang="scss">
.he-delivery-information {
    width: 269px;
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    line-height: 20px;
    opacity: 0.85;
    padding-top: 6px;
}
</style>
