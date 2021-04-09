<template>
    <el-form class="he-matter" label-width="0">
        <el-form-item>
            <el-input class="he-input" v-model="realname">
                <template slot="append"></template>
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: "modifyRealname",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            realname: this.value.realname
        }
    },
    methods: {
        affirm(e) {
            let { handleClose } = e;
            this.$heshop.users('put', { id: this.value.id, behavior: 'setting' }, {
                realname: this.realname
            }).then(() => {
                this.value.realname = this.realname;
                this.$emit('input', this.value);
                handleClose();
            }).catch(err => {
                this.$message.error(err.data[0].message);
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.le-matter .he-input {
    width: 200px;
    height: 32px;
    border-radius: 4px;
}
</style>
