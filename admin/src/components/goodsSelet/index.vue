<script type="text/javascript">
import Table from './table.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('goods');
export default {
    components: {
        Table,
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
        data: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        /**
         * [visible description]
         * @type {Object}
         */
        select: {
            type: Boolean,
            default: false
        },
        /**
         * 选择类型 radio | checkbox
         * @type {Object}
         */
        type: {
            type: String,
            default: 'radio'
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
            selectData: null,
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
        if (this.type == 'checkbox') {
            this.selectData = [];
        } else {
            this.selectData = {}
        }
    },
    methods: {
        ...mapActions(['handleGoods']),
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
            this.$emit('input', this.selectData);
            this.$emit('confirm', this.selectData);
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
                "title": "选择商品",
                "before-close": handleClose,
                "width": "880px",
                "destroy-on-close": true,
                "append-to-body": true
            }
        }

        return <div class="goods-dialog">
            <div {...defaultData}>{trigger}</div>
            <el-dialog {...dialogData}>
                    <Table></Table>
                <template slot="footer">
                    <el-button on-click={handleClose}>取 消</el-button>
                    <el-button type="primary" on-click={handleConfirm}>确 定</el-button>
                </template>
            </el-dialog>
        </div>;
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>