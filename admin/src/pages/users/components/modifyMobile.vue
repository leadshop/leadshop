<template>
    <el-form class="he-matter" label-width="0">
        <el-form-item>
            <el-input class="he-input" v-model="mobile">
                <template slot="append">
                </template>
            </el-input>
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    name: "modifyMobile",
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            mobile: this.value.mobile
        }
    },
    methods: {
        affirm(e) {
            let { handleClose } = e;
            this.$heshop.users('put', { id: this.value.id, behavior: 'setting' }, {
                mobile: this.mobile
            }).then((res) => {
                this.value.mobile = this.mobile;
                this.$emit('input', this.value);
                handleClose();
            }).catch(err => {
                this.$message.error(err.data[0].message);
            });

        }
    }
};
</script>
<style lang="scss" scoped="">
.le-matter .he-input {
    width: 200px;
    height: 32px;
    border-radius: 4px;
}
</style>
