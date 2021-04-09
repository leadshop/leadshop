<template>
    <div id="app">
        <router-view />
    </div>
</template>
<script type="text/javascript">
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers('setting');
export default {
    name: 'App',
    methods: {
        ...mapActions(['getSettingInfo'])
    },
    mounted() {
        this.getSettingInfo();
    }
}
</script>
<style type="text/css" lang="less">
html,
body,
#app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    min-width: 1024px;
}

.select-cover__120 {
    position: relative;
    width: 120px;
    height: 120px;
    flex: 1;


    &-add {
        width: 120px;
        height: 120px;
        background: rgba(0, 0, 0, 0.02);
        border: 1px dashed #DCDFE6;
        border-radius: 4px;
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        cursor: pointer;
    }

    &-icon {
        display: block;
        font-size: 26px;
        width: 26px;
        height: 26px;
        line-height: 26px;
        color: #bfbfbf;
        margin: 8px auto;
    }

    &-text {
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 30px;
        color: #8c8c8c;
    }

    &-edit {
        position: absolute;
        width: 120px;
        height: 120px;
        cursor: pointer;

        .el-image {
            width: 120px;
            height: 120px;
        }
    }

    &-tips {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 120px;
        height: 28px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 4px;
        font-size: 14px;
        font-weight: 400;
        color: #FFFFFF;
        text-align: center;
        line-height: 28px;
        display: none;
    }

    &-edit:hover {
        .select-cover__120-tips {
            display: block;
        }

    }
}
</style>
