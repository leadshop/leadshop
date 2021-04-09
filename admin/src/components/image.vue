<template>
    <el-image style="width: 100%; height: 100%" :src="src" fit="cover" lazy>
        <div slot="error" class="image-slot">
            <i class="image-icon le-icon le-icon-morentupian"></i>
        </div>
    </el-image>
</template>
<script type="text/javascript">
export default {
    props: {
        src: {
            type: [String, Array, Object],
        }
    }
};
</script>
<style type="text/css">
/deep/ .el-image {
    line-height: 100%;
    text-align: center;
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #BBBFC8;
}

.image-icon {
    font-size: 50px;
    line-height: 50px;
    height: 50px;
    width: 50px;
}
</style>