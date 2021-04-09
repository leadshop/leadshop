<template>
    <el-form label-width="120px" class="le-matter">
        <el-form-item label="售后类型">
            <span class="he-value">{{value.item.type === 0 ? '仅退款' : value.item.type === 1 ? '退货退款' : value.item.type === 2 ? '换货' : ''}}</span>
        </el-form-item>
        <el-form-item label="退款商品数">
            <span class="he-value">{{value.item.return_number}}</span>
        </el-form-item>
        <el-form-item label="退款金额">
            <span class="he-value">￥{{value.item.return_amount}}</span>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: "agreeAfterSale",
    props: {
        value: {
            type: Object
        }
    },
    methods: {
        affirm(e) {
            let { handleClose } = e;
            this.$heshop.orderafter('put', { id: this.value.item.id, behavior: 'pass' }, null).then(res => {
                this.value.item.status = res.status;
                this.$message.success('操作成功');
                handleClose();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style scoped>
.he-value {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}
/deep/.el-form-item {
    margin-bottom: 6px !important;
}
</style>