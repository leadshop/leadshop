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
        max: {
            type: [String, Number, Boolean, Object, Array],
            default: 8
        },
        disabled: {
            type: [String, Number, Boolean, Object, Array],
            default: false
        },
    },
    data() {
        return {
            dialogVisible: false,
            inputData: ""
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {

    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {

    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {

    },
    methods: {
        /**
         * 处理点击事件
         * @return {[type]} [description]
         */
        handleOpen() {
            if (!this.disabled) {
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
            this.inputData = "";
        }
    },
    render() {
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
                <el-input v-model={this.inputData} placeholder={placeholder} maxlength={this.max} show-word-limit ></el-input>
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
@import './style.less';
</style>