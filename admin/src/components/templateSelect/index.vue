<script type="text/javascript">
import Detail from './detail.vue'

export default {
    components: {
        Detail,
    },
    provide() {
        return {
            self: this
        };
    },
    props: {
        value: {
            type: [String, Object, Number],
            default: 0
        },
        open: {
            type: [Function]
        }
    },
    data() {
        return {
            dialogVisible: false
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
        handleClick() {
            if (this.open) {
                this.open().then(value => {
                    if (value) {
                        this.dialogVisible = true;
                    }
                })
            } else {
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
            this.dialogVisible = false;
        }
    },
    render(h) {
        let { dialogVisible, handleClick, handleClose, handleConfirm } = this;
        //判断插槽是否存在DOM结构，如果存在则获取后放入upload目录
        const trigger = this.$slots.trigger || this.$slots.default;

        //设置上传样式
        const defaultData = {
            on: {
                click: handleClick
            }
        };

        const dialogData = {
            props: {
                "visible": dialogVisible,
                "title": "新建微页面",
                "before-close": handleClose,
                "width": "980px",
                "destroy-on-close": true
            }
        }


        return <div class="template-select">
            <span {...defaultData}>{trigger}</span>
            <el-dialog {...dialogData}>
                <Detail></Detail>
                <template slot="footer">
                </template>
            </el-dialog>
        </div>;
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>