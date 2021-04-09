<template>
    <div class="widget">
        <!--  <div class="zoom-view"> -->
        <div class="widget-zoom">
            <label class="widget-label" :for="`widget${index}`" :data-index="index" data-type="widget">
                <input type="radio" class="widget-input" v-model="select" :value="index" name="widget" :id="`widget${index}`">
                <!-- active 表示激活 -->
                <div class="widget-mask" :data-index="index" data-type="widget">
                    <div class="widget-handle">
                        <div class="widget-handle-item">
                            <i class="le-icon le-icon-trash" @click.stop="onDelete"></i>
                        </div>
                        <div class="widget-handle-item" :class="{'disabled':is_copy}" :disabled="is_copy">
                            <i class="le-icon le-icon-copy" @click.stop="onCopy"></i>
                        </div>
                        <div class="widget-handle-item" :class="{'disabled':is_up}" :disabled="is_up">
                            <i class="le-icon le-icon-arrow-top" @click.stop="moveUp"></i>
                        </div>
                        <div class="widget-handle-item" :class="{'disabled':is_down}" :disabled="is_down">
                            <i class="le-icon le-icon-arrow-down" @click.stop="moveDown"></i>
                        </div>
                    </div>
                </div>
            </label>
            <div class="widget-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import popconfirm from '@/components/popconfirm.vue'
export default {
    components: {
        popconfirm,
    },
    props: {
        index: {
            type: [Number, String]
        },
        type: {
            type: [Number, String],
            default: ""
        },
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
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
        pages: {
            get() {
                return this.$store.state.finish.pages;
            },
            set() {
                this.$store.commit('finish/setPagesData', pages);
            }
        },
        select: {
            get() {
                return this.$store.state.finish.index;
            },
            set(value) {
                this.$store.commit('finish/setIndex', value)
            }
        },
        is_copy() {
            if (this.type == 'wechat') {
                return true
            } else {
                return false
            }
        },
        is_up() {
            if (this.index === 0) {
                return true;
            } else {
                return false;
            }
        },
        is_down() {
            if (this.index === this.pages.length - 1) {
                return true;
            } else {
                return false;
            }
        },
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
    methods: {
        /**
         * 删除
         * @return {[type]} [description]
         */
        onDelete() {
            let index = this.index;
            this.pages.splice(index, 1);

        },
        /**
         * 拷贝
         * @return {[type]} [description]
         */
        onCopy() {
            let index = this.index;
            let data = this.pages[index];
            if (data.name !== 'wechat') {
                let pages = JSON.parse(JSON.stringify(this.pages));
                pages.splice(index, 0, data);
                this.$store.commit('finish/setPagesData', pages);
                this.$store.commit('finish/setIndex', index + 1);
            }
        },
        /**
         * 上移
         * @return {[type]} [description]
         */
        moveUp() {
            if (this.is_up) {
                return;
            }
            let index = this.index;
            /*数组两个元素位置互换*/
            this.pages[index] = this.pages.splice(index - 1, 1, this.pages[index])[0];
            this.$store.commit('finish/setIndex', index - 1);
        },
        /**
         * 下移
         * @return {[type]} [description]
         */
        moveDown() {
            if (this.is_down) {
                return;
            }
            let index = this.index;
            /*数组两个元素位置互换*/
            this.pages[index] = this.pages.splice(index + 1, 1, this.pages[index])[0];
            this.$store.commit('finish/setIndex', index + 1);
        }
    }
};
</script>
<style lang="less" scoped>
@import './widget.less';
</style>