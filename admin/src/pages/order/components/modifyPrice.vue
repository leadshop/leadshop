<template>
    <el-form class="he-matter" label-width="120px">
        <el-form-item label="商品金额">
            <el-input class="he-input" v-model="goods_amount">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item label="运费">
            <el-input class="he-input" v-model="freight_amount">
                <template slot="append">元</template>
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "modifyPrice",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            goods_amount: this.value.goods_amount,
            freight_amount: this.value.freight_amount
        }
    },
    methods: {
        affirm(e) {
            let { handleClose } = e;
            this.$heshop.order('put', {id: this.value.id, behavior: 'amount'}, {
                goods_amount: this.goods_amount,
                freight_amount: this.freight_amount
            }).then((res) => {
                this.value.pay_amount = res.pay_amount;
                this.value.freight_amount = res.freight_amount;
                this.value.goods_amount = res.goods_amount;
                this.$emit('input', this.value);
                this.$message.success('修改价格成功');
                handleClose();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.he-matter .he-input {
    width: 200px;
}
</style>
