<template>
    <el-form ref="form" :model="form" label-width="160px">
        <el-form-item label="允许使用优惠券">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="赠送优惠券">
            <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            新建 | 刷新
        </el-form-item>
    </el-form>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            }
        }
    }
}
</script>