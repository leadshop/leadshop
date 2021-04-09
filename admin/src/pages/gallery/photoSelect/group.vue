<script type="text/javascript">
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions, mapMutations } = createNamespacedHelpers('picture');
import Enumerable from "linq";
import cascaderPanel from "../cascaderPanel";
export default {
    components: {
        cascaderPanel
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        title: {
            type: [String, Number, Boolean],
            default: '移动至'
        }
    },
    data() {
        return {
            dialogVisible: false,
            inputData: "",
            groupData: [],
            radio: [0, 0, 0]
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        ...mapState(['groups'])
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
        ...mapActions(['handleGroups']),
        /**
         * 处理点击事件
         * @return {[type]} [description]
         */
        handleOpen() {
            this.handleGroups().then(res => {
                this.dialogVisible = true;
                this.groupData = this.setTreeData(res);
            });

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
            if (this.inputData.length > 0) {
                var end = this.inputData.pop()
                this.$emit("confirm", end);
                this.handleClose();
            } else {
                this.$message({
                    message: '请选择要移动的分组',
                    type: 'warning'
                });
            }
        },
        /**
         * 关闭回调
         * @return {[type]} [description]
         */
        handleClosed() {
            this.inputData = "";
        },
        /**
         * 获取树状结构数据
         * @param {[type]} data [description]
         */
        setTreeData(data) {
            //添加到子集路由
            return this.$heshop.toTree({
                parentKey: 'parent_id',
                idKey: 'id',
                parentID: 0,
                childrenKey: 'children'
            }).on(data).get();
        },
        /**
         * 出发修改数据
         * @return {[type]} [description]
         */
        handleChange(e) {
            this.inputData = e;
        }
    },
    render(h) {
        let { dialogVisible, handleOpen, handleClose, handleConfirm, title } = this;
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
                "top": "10%",
                "title": title,
                "width": "800px",
                "append-to-body": true,
                "destroy-on-close": true,
                "before-close": handleClose,
                "filterable": true
            },
            on: {
                "closed": this.handleClosed
            }
        };

        const CascaderData = {
            props: {
                "value": this.inputData,
                "options": this.groupData,
                "key": 1,
                "props": {
                    "value": "id",
                    "label": "name"
                },

            }
        }
        //处理数据信息
        return <div class="dialog" {...defaultData}>
            {trigger}
            <el-dialog {...dialogData}>
                <div class="dialog-group">
                    <div class="dialog-group__search">
                        <el-input placeholder="输入分组名称搜索"  size="small">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </div>
                     <cascaderPanel {...CascaderData} on-change={this.handleChange}></cascaderPanel>
                </div>
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