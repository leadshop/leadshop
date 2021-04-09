<script type="text/javascript">
import Detail from './detail.vue'
import { createNamespacedHelpers } from 'vuex'

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
        };
    },
    methods: {
        /**
         * 处理点击事件
         * @return {[type]} [description]
         */
        handleClick() {
            if (this.$refs['detail']) {
                this.$refs['detail'].initialize();
            }
            this.dialogVisible = true;
        },
        /**
         * 处理关闭事件
         * @return {[type]} [description]
         */
        handleClose() {
            this.dialogVisible = false;
            this.$emit('close', "");
        },
        /**
         * 处理确认事件
         * @return {[type]} [description]
         */
        handleConfirm() {
            this.dialogVisible = false;
            let selectPicture = "";
            if (this.$refs['detail'].checkedData) {
                if (this.limit > 1) {
                    selectPicture = [];
                    let _array = this.$refs['detail'].checkedData;
                    for (let index in _array) {
                        let item = _array[index];
                        if (item.url) {
                            selectPicture.push(item.url);
                        }
                    }
                } else {
                    let item = this.$refs['detail'].checkedData;
                    if (item.url) {
                        selectPicture = item.url;
                    }
                }
            }
            this.$emit('confirm', selectPicture);
        }
    },
    render(h) {
        let { dialogVisible, handleClick, handleClose, handleConfirm } = this;
        //判断插槽是否存在DOM结构，如果存在则获取后放入upload目录
        const trigger = this.$slots.trigger || this.$slots.default;

        //设置上传样式
        const defaultData = {
            class: "photo-solt",
            on: {
                click: handleClick
            }
        };

        const dialogData = {
            props: {
                "visible": dialogVisible,
                "title": "选择图片",
                "before-close": handleClose,
                "width": "1090px",
                "destroy-on-close": true
            }
        }

        const DetailData = {
            props: {
                limit: this.limit
            },
            ref: "detail"
        }

        return <div class="picture-dialog">
            <div {...defaultData}>{trigger}</div>
            <el-dialog {...dialogData}>
                <Detail {...DetailData}></Detail>
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