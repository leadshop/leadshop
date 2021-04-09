<template>
  <span>
    <span style="margin-right: 8px"><slot></slot></span>
    <el-popover trigger="hover" :content="content" :placement="placement">
        <he-icon slot="reference" type="le-icon-annotation" class="he-annotation"></he-icon>
    </el-popover>
  </span>
</template>
<script>
export default {
    name: 'HelpHint',
    props: {
        placement: {
            default: 'top'
        },
        content: String,
    }
};
</script>

<style lang="scss" scoped>
.he-annotation {
    color: #BBBFC8;
    width: 14px;
    height: 14px;
}
</style>
