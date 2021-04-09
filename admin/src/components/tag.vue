<script type="text/javascript">
export default {
    props: {
        closable: {
            type: Boolean,
            default: function() {
                return true;
            }
        }

    },
    data() {
        return {

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
         * 处理关闭事件
         * @return {[type]} [description]
         */
        handleClose(event) {
            if (!this.closable) return;
            event.stopPropagation();
            this.$emit('close');
        },
    },
    render(creatElement) {
        return creatElement(
            'div',
            {
                class: 'tag flex justify-center align-center'
            },
            [
                this.$slots.default,
                creatElement('i',
                    {
                        class: 'tag-close le-icon le-icon-fork ',
                        on: {
                            click: this.handleClose
                        }
                    },
                )
            ]
        )
    }
};
</script>
<style lang="less" scoped>
@import './tag.less';
</style>
