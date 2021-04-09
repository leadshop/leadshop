<script type="text/javascript">
export default {
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
            pagesData: [],
            cacheData: null,
            searchData: "",
            selectData: ""
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
        searchData(value) {
            if (value == "") {
                this.pagesData = JSON.parse(JSON.stringify(this.cacheData));
                this.selectData = null;
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.handleLoad();
    },
    methods: {
        handleLoad() {
            this.$heshop.option("get", { include: 'pages' }).then(data => {
                this.pagesData = data;
                this.cacheData = JSON.parse(JSON.stringify(data));
            }).catch(error => {
                console.error("错误提示", error)
            })
        },
        handleSearch() {
            let simpleArr = this.pagesData.filter((item, i) => {
                return item.name == this.searchData;
            })
            this.pagesData = simpleArr;
        },
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
            this.dialogVisible = false;
        },
    },
    render(h) {
        let { dialogVisible, handleClick, handleClose, handleConfirm, handleSearch, selectData } = this;
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
                "title": "选择微页面",
                "before-close": handleClose,
                "width": "392px",
                "destroy-on-close": true,
                "append-to-body": true
            }
        }

        const scrollbarData = {
            attrs: {
                height: '196px'
            }
        }

        return <div class="hyperlink-pages">
            <div {...defaultData}>{trigger}</div>
            <el-dialog {...dialogData}>
                <div class="hyperlink-detail">
                     <div class="hyperlink-detail-search">
                          <el-input placeholder="请输入内容" class="input-with-search"  v-model={this.searchData}>
                            <el-button slot="append" icon="el-icon-search" on-click={handleSearch}></el-button>
                          </el-input>
                      </div>
                     <el-scrollbar {...scrollbarData}>
                        <el-radio-group v-model={this.selectData}>
                            {
                                this.pagesData.map((item,index) =>{
                                    let ItemData = {
                                        props:{
                                            label:item
                                        }
                                    };
                                    let tag =  item.status ? <span class="layout-table-tag">首页</span> : '' ;
                                    return <el-radio {...ItemData} > {item.title}  {tag}  </el-radio>;
                                })
                            }
                        </el-radio-group>
                     </el-scrollbar>
                </div>
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