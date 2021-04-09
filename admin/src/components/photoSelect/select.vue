<template>
    <div class="photo-selet" ref="picture">
        <popup @confirm="handleConfirm">
            <i class="le-icon le-icon-add"> </i>
            <p type="text" v-if="paddingStyle !=='16px'">添加{{title}}</p>
        </popup>
    </div>
</template>
<script type="text/javascript">
import popup from './index.vue'

export default {
    components: {
        popup,
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        title: {
            type: [String, Number, Boolean],
            default: '图片'
        },
        padding: {
            type: [String, Number, Boolean],
            default: false
        }
    },
    data() {
        return {
            paddingStyle: '28px',
            top: '100%'
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        url: {
            get() {
                return this.value || false;
            },
            set(value) {
                this.$emit('input', value);
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
        if (this.padding) {
            this.paddingStyle = this.padding;
        } else {
            let height = this.$refs.picture.offsetHeight;
            let width = this.$refs.picture.offsetWidth;
            let contrast = width;
            if (height > width) {
                contrast = height;
                this.top = ((width / height) * 100) + "%";
            } else {
                this.top = ((height / width) * 100) + "%";
            }
            if (contrast > 100) {
                this.paddingStyle = '28px';
            } else if (contrast > 60) {
                this.paddingStyle = '10px 0 0 0';
            } else {
                this.paddingStyle = '16px';
            }
        }
    },
    methods: {
        handleConfirm(value) {
            this.url = value;
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>