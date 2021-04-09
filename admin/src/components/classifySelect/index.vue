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
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        /**
         * [visible description]
         * @type {Object}
         */
        visible: {
            type: Boolean,
            default: false
        },
        /**
         * 执行的上传方法
         * @type {Object}
         */
        limit: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            dialogVisible: false,
            isSelect: false,
            selectData: []
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        is_disabled() {
            if (this.self.selectData.length > 0) {
                return false
            } else {
                return true
            }
        }
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
            this.dialogVisible = true;
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
            if (this.isSelect) {
                let { selectData } = this;
                let title = [];
                let id = "";
                for (let index in selectData) {
                    let item = selectData[index];
                    title[index] = item.name;
                    //防止数组中存在额外属性
                    if (item.id) {
                        id = item.id;
                    }
                }
                let info = {
                    id: id,
                    name: title.join("/")
                }
                this.$emit('input', info);
                this.$emit('confirm', info);
                this.dialogVisible = false;
            } else {
                this.$message({
                    message: '请选择分类',
                    type: 'warning'
                });
            }

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
                "title": "选择分类",
                "before-close": handleClose,
                "width": "800px",
                "destroy-on-close": true,
                "append-to-body": true
            }
        }

        return <div class="classify-dialog">
            <div {...defaultData}>{trigger}</div>
            <el-dialog {...dialogData}>
                    <Detail></Detail>
                <template slot="footer">
                    <el-button on-click={handleClose}>取 消</el-button>
                    <el-button type="primary" on-click={handleConfirm} >确 定</el-button>
                </template>
            </el-dialog>
        </div>;
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>