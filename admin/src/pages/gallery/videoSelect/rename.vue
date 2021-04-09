<script type="text/javascript">
export default {
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        title: {
            type: [String, Number, Boolean],
            default: '图片'
        },
        placeholder: {
            type: [String, Number, Boolean],
            default: ''
        },
        disabled: {
            type: [String, Number, Boolean, Object, Array],
            default: false
        },
    },
    data() {
        return {
            max: 32,
            dialogVisible: false,
            inputData: {
                name: ""
            }
        };
    },
    methods: {
        /**
         * 处理点击事件
         * @return {[type]} [description]
         */
        handleOpen() {
            if (!this.disabled) {
                if (this.value.length > 0) {
                    let data = this.value[0];
                    this.inputData = {
                        id: data.id,
                        type: data.type,
                        name: data.title_name,
                        parent_id: data.parent_id
                    }
                    if (data.type === 0) {
                        this.max = 8
                    } else {
                        this.max = 32
                    }
                }
                this.dialogVisible = true;
            }
        },
        /**
         * 处理关闭事件
         * @return {[type]} [description]
         */
        handleClose() {
            this.dialogVisible = false;
        },
        /**
         * 处理确认事件
         * @return {[type]} [description]
         */
        handleConfirm() {
            this.$emit("confirm", this.inputData);
            this.handleClose();
        },
        /**
         * 关闭回调
         * @return {[type]} [description]
         */
        handleClosed() {
            this.inputData = {
                name: ""
            }
        }
    },
    render(h) {
        let { dialogVisible, handleOpen, handleClose, handleConfirm, placeholder, title } = this;
        //判断插槽是否存在DOM结构，如果存在则获取后放入upload目录
        const trigger = this.$slots.trigger || this.$slots.default;
        //设置上传样式
        const defaultData = {
            on: {
                click: handleOpen
            }
        };
        //设置上传样式
        const dialogData = {
            props: {
                "visible": dialogVisible,
                "top": "20%",
                "title": title,
                "width": "360px",
                "append-to-body": true,
                "destroy-on-close": true,
                "before-close": handleClose
            },
            on: {
                "closed": this.handleClosed
            }
        };
        //处理数据信息
        return <div class="dialog" {...defaultData}>
            {trigger}
            <el-dialog {...dialogData}>
                <el-input v-model={this.inputData.name} placeholder={placeholder} maxlength={this.max} show-word-limit ></el-input>
                <span slot="footer" class="dialog-footer">
                    <el-button on-click={handleClose}>取 消</el-button>
                    <el-button type="primary" on-click={handleConfirm} on-close={handleClose}>确 定</el-button>
                </span>
            </el-dialog>
        </div>;
    }
};
</script>
<style lang="less" scoped>
@import '../photoSelect/style.less';
</style>