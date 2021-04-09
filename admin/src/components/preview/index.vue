<script type="text/javascript">
import detail from "./detail"
export default {
    components: {
        detail,
    },
    props: {
        value: {
            type: Array
        },
        title: {
            type: String,
            default: '你确认要删除数据吗？'
        },
        confirmButtonText: {
            type: String,
            default: "确认"
        },
        cancelButtonText: {
            type: String,
            default: '取消'
        },
        width: {
            type: [String, Number],
            default: '30%'
        },
        top: {
            type: [String, Number],
            default: '40vh'
        }
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        handleDialog() {
            this.visible = true;
        },
        /**
         * 获取商品信息
         * @return {[type]} [description]
         */
        handleConfirm() {
            this.visible = false;
            this.$emit('confirm');
        },
        /**
         * 获取分组信息
         * @return {[type]} [description]
         */
        handleCancel() {
            this.visible = false;
            this.$emit('cancel');
        }
    },
    render(h) {
        let { handleConfirm, handleDialog, handleCancel, confirmButtonText, cancelButtonText } = this;
        let dialogData = {
            props: {
                title: '',
                visible: this.visible,
                width: '800px',
                center: true,
                top: '10vh',
                "modal-append-to-body": false,
                "before-close": handleCancel
            }
        }
        let detailData = {
            props: {
                value: this.value
            }
        }
        return <div class="le-popconfirm">
            <el-dialog {...dialogData}>
                <detail {...detailData}></detail>
            </el-dialog>
        </div>

    }
};
</script>
<style scoped type="text/css" lang="less">
/deep/.el-dialog__header {
    //display: none;
    padding: 0;
}
/deep/.el-dialog .el-dialog__body {
    padding: 0px 40px 0 40px;
    height: 560px;
}
</style>
