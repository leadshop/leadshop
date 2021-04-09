<template>
    <div class="le-table">
        <div class="le-table-header">
            {{title}}
        </div>
        <div class="le-table-body">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "le-table",
    props: {
        title: {
            type: String
        }
    }
}
</script>

<style scoped>
.le-table {
    width: 800px;
    margin: 0 auto;
    box-sizing: border-box;
}
.le-table-header {
    width: 800px;
    height: 48px;
    line-height: 48px;
    padding-left: 24px;
    background: #F3F5F7;
    border-radius: 8px 8px 0px 0px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #595959;
    box-sizing: border-box;
}
.le-table-body {
    width: 800px;
    /*height: 449px;*/
    border: 2px solid #F3F5F7;
    border-radius: 0px 0px 8px 8px;
    box-sizing: border-box;
}
</style>
