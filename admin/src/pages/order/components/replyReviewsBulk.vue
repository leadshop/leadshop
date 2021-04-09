<template>
    <div class="le-matter">
        <el-input type="textarea" v-model="reply" class="he-textarea" placeholder="请输入回复" maxlength="300" show-word-limit></el-input>
    </div>
</template>
<script>
export default {
    name: "replyReviewsBulk",
    props: {
        value: {
            type: [Array]
        }
    },
    data() {
        return {
            reply: ''
        }
    },
    methods: {
        affirm: function(e) {
            let { handleClose } = e;
            let ids = [];
            this.value.forEach(item => {
                ids.push(item.id);
            });
            this.$heshop.evaluate('put', ids, {
                reply: this.reply
            }).then(() => {
                this.$message.success('回复成功');
                handleClose();
            }).catch(error => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>
<style scoped lang="scss">
.le-matter .he-textarea {
    width: 398px;
    height: 200px;
    /deep/.el-textarea__inner {
        height: 200px;
        resize: none;
    }
}
</style>