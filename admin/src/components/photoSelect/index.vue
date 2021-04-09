<script type="text/javascript">
import Detail from './detail.vue'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapMutations, mapActions } = createNamespacedHelpers('picture');

export default {
    components: {
        Detail,
    },
    provide() {
        return {
            uploader: this
        };
    },
    props: {
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
            selectClassify: "",
            selectPicture: {},
            dialogVisible: false,
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        ...mapState(['classify', 'pictures', 'classifyInfo'])
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
        selectClassify(value) {
            let { classify } = this;
            for (let index in classify) {
                let item = classify[index];
                if (item.id == value) {
                    this.setClassifyInfo(item);
                }
            }
            this.handlePictures({ id: value, current: 1, pageSize: 15 });
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.handleClassify();
    },
    methods: {
        ...mapMutations(['setClassifyInfo']),
        ...mapActions(['handleClassify', 'handlePictures']),
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
            this.dialogVisible = false;
            this.$emit('confirm', this.selectPicture);
        }
    },
    render(h) {
        let { dialogVisible, handleClick, handleClose, handleConfirm } = this;
        //判断插槽是否存在DOM结构，如果存在则获取后放入upload目录
        const trigger = this.$slots.trigger || this.$slots.default;

        //设置上传样式
        const defaultData = {
            class:"photo-solt",
            on: {
                click: handleClick
            }
        };

        const dialogData = {
            props: {
                "visible": dialogVisible,
                "title": "选择图片",
                "before-close": handleClose,
                "width": "1077px",
                "destroy-on-close": true
            }
        }

        return <div class="photo-dialog">
            <div {...defaultData}>{trigger}</div>
            <el-dialog {...dialogData}>
                <Detail></Detail>
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