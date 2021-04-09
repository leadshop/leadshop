<template>
    <div>
        <el-form label-width="122px" class="le-matter" v-if="value.freight.type ===1">
            <el-form-item label="发货方式：">
                <span class="le-text">自己联系物流</span>
            </el-form-item>
            <el-form-item label="物流公司：" v-if="value.freight.type ===1">
                <span  class="le-text">{{value.freight.logistics_company}}</span>
            </el-form-item>
            <el-form-item label="快递单号：" v-if="value.freight.type ===1">
                <span  class="le-text">{{value.freight.freight_sn}}</span>
                <span class="he-copy" type="text" @click="copyTrackingNumber">复制</span>
                <input id="copy-tracking-number" :value="value.freight.freight_sn">
            </el-form-item>
        </el-form>
        <el-form label-width="110px" class="le-matter" v-else>
            <el-form-item label="发货方式：">
                <span  class="le-text">无需物流</span>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: "logisticsInformation",
    props: {
        value: {
            type: Object
        }
    },
    methods: {
        copyTrackingNumber: function() {
            let input = document.getElementById("copy-tracking-number");
            input.select();
            document.execCommand("copy");
            this.$message.success('复制成功');
        },
        affirm(e) {
            let { handleClose } = e;
            handleClose();
        }
    }
}
</script>
<style scoped>
.he-copy {
    padding-left: 20px !important;
    font-size: 14px;
    font-weight: 500;
    color: #623ceb;
    cursor: pointer;
}

/deep/.el-form-item {
    margin-bottom: 0px !important;
}

/deep/.el-form-item__label {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    line-height: 22px;
    opacity: 0.45;
}

/deep/.el-form-item .el-form-item__content {
    font-size: 14px;
    font-weight: 500;
    color: #000000;
}

#copy-tracking-number {
    background-color: #ffffff;
    border: none;
    opacity: 0;
    position: absolute;
    z-index: -10;
}
.le-text {
    color: rgba(0,0,0,.85);
}
</style>
