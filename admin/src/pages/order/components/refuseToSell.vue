<template>
    <el-form label-width="140px" class="le-matter">
        <el-form-item label="售后类型">
            <span class="he-value">{{value.item.type === 0 ? '仅退款' : value.item.type === 1 ? '退货退款' : value.item.type === 2 ? '换货' : ''}}</span>
        </el-form-item>
        <el-form-item label="退款商品数">
            <span class="he-value">{{value.item.return_number}}</span>
        </el-form-item>
        <el-form-item label="退款金额">
            <span class="he-value">￥{{value.item.return_amount}}</span>
        </el-form-item>
        <el-form-item label="拒绝理由">
            <el-input
                class="he-textarea"
                type="textarea"
                :rows="2"
                placeholder="请输入内容"
                maxlength="200"
                show-word-limit
                v-model="refuse_reason">
            </el-input>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "refuseToSell",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            refuse_reason: ''
        }
    },
    methods: {
        affirm(e) {
            let { handleClose } = e;
            this.$heshop.orderafter('put', { id: this.value.item.id, behavior: 'refuse' }, { refuse_reason: this.refuse_reason }).then(res => {
                this.value.item.status = res.status;
                this.$message.success('拒绝成功');
                handleClose();
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
}
</script>

<style scoped lang="scss">
.he-value {
    font-size: 14px;
    font-weight: 400;
    color: #000000;
    opacity: 0.85;
}

/deep/.el-form-item {
    margin-bottom: 6px !important;
}

.le-matter .he-textarea {
    width:400px !important;
    height: 200px;
    /deep/>.el-textarea__inner {
        height: 200px;
    }
}
/deep/ .el-textarea .el-textarea__inner {
    resize: none;
}
</style>
