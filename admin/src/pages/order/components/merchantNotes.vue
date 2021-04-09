<template>
    <div class="le-matter">
        <el-input type="textarea" v-model="note" class="he-textarea" placeholder="请输入商家备注" maxlength="200"
                  show-word-limit></el-input>
    </div>
</template>

<script>
export default {
    name: "merchantNotes",
    props: {
        value: {
            type: [Object]
        }
    },
    data() {
        return {
            note: this.value.note
        }
    },
    methods: {
        affirm: function(e) {
            let { handleClose } = e;
            this.$heshop.order('put', {id: this.value.id, behavior: 'note'}, {
                note: this.note
            }).then(() => {
                handleClose();
                this.value.note = this.note;
                this.$message.success('备注成功');
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        }
    }
};
</script>

<style scoped lang="scss">
.le-matter .he-textarea {
    width:400px;
    /*margin: 0 40px 30px 40px;*/
    height: 200px;
    /deep/.el-textarea__inner {
        height: 200px;
        resize: none;
    }
}
</style>
