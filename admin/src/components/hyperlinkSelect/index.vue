<script type="text/javascript">
import Detail from './detail.vue'

function _isNull(obj) {
    if (Object.prototype.toString.call(obj) !== '[object Object]') {
        return 'Type Error'
    }
    return Object.keys(obj).length === 0
}
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
        },
        /**
         * 禁用选项
         * @type {Object}
         */
        forbidden: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data() {
        return {
            dialogVisible: false,
            selectData: "",
            tipsData: {
                "t2": "请选择商品",
                "t3": "请选择商品分类",
                "t7": "请选择微页面"
            }
        };
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
            if (this.selectData.extend) {
                let data = this.selectData.param;
                let k = "t" + this.selectData.index;
                if (_isNull(data)) {
                    this.$message({
                        message: this.tipsData[k],
                        type: 'warning'
                    });
                    return;
                }
            }
            this.dialogVisible = false;
            this.$emit('confirm', this.selectData);
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
                "title": "选择跳转链接",
                "before-close": handleClose,
                "width": "392px",
                "destroy-on-close": true
            }
        }

        return <div class="hyperlink-dialog">
            <span {...defaultData}>{trigger}</span>
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