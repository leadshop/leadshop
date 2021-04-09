<template>
    <el-form :model="form" label-width="152px" :rules="rules" ref="ruleForm" class="he-matter">
        <el-form-item label="发货信息">
            <div class="he-delivery-information">
                {{value.buyer.name}}  {{value.buyer.mobile}}<br/>
                {{value.buyer.province}}
                {{value.buyer.city}}
                {{value.buyer.district}}
                {{value.buyer.address}}
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
                <el-input  maxlength="20" placeholder="请输入快递单号" v-model="form.freight_sn"></el-input>
            </el-form-item>
        </template>
    </el-form>
</template>

<script>
export default {
    name: "receiveExchange",
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
                freight_sn: '',
            },
            rules: {
                freight_sn:  [
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
                    this.$heshop.orderafter('put', {id: this.value.id, behavior: 'salesexchange'}, {merchant_freight_info: this.form}).then((res) => {
                        let { handleClose } = e;
                        handleClose();
                        this.value.status = res.status;
                        this.$message.success('发货成功');
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