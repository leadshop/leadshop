<script type="text/javascript">
export default {
    props: {
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
        },
        disabled: {
            type: Boolean,
            default: function() {
                return false;
            }
        }
    },
    data() {
        return {
            visible: false
        };
    },
    methods: {
        handleDialog() {
            if (this.disabled) return;
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
                title: this.title,
                visible: this.visible,
                width: this.width,
                center: true,
                top: this.top,
                "modal-append-to-body": false,
                "before-close": handleCancel
            }
        }
        //判断插槽是否存在DOM结构，如果存在则获取后放入upload目录
        const trigger = this.$slots.trigger || this.$slots.default;
        return <div class="le-popconfirm">
                    <span on-click={handleDialog}>{trigger}</span>
                    <el-dialog {...dialogData}>
                      <span slot="footer" class="dialog-footer">
                        <el-button on-click={handleCancel}>{cancelButtonText}</el-button>
                        <el-button type="primary" on-click={handleConfirm}>{confirmButtonText}</el-button>
                      </span>
                    </el-dialog>
               </div>

    }
};
</script>
<style scoped type="text/css" lang="less">
@import './popconfirm.less';
</style>