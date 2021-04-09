<template>
    <div class="goods-selet" :style="[goodsStyle]">
        <popup ref="popup" v-model="selectData" type="checkbox" @confirm="handleConfirm">
            <el-button v-if="!$slots.default" :disabled="selectData.length==number">选择商品</el-button><span class="goods-selet-tips" v-if="isTips">最多添加{{number}}件商品</span>
        </popup>
        <ul class="goods-selet-list">
            <draggable v-model="selectData" chosenClass="chosen" forceFallback="true" @start="onStart" animation="1000" @end="onEnd">
                <transition-group>
                    <li class="goods-selet-item" v-for="(item,index) in selectData" :key="`aa_${index}`">
                        <div class="goods-item-image">
                            <div class="goods-item-cover" :style="{
                            'background-image': 'url('+getGoodsCover(item.slideshow)+')'
                        }">
                            </div>
                        </div>
                        <div class="goods-selet-item__close" @click="handleClose(index)">
                            <i class="le-icon le-icon-cha2"></i>
                        </div>
                    </li>
                </transition-group>
            </draggable>
        </ul>
    </div>
</template>
<script type="text/javascript">
import popup from './index.vue'
import draggable from 'vuedraggable'
export default {
    components: {
        popup,
        draggable
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        limit: {
            type: Number,
            default: 50
        },
        number: {
            type: Number,
            default: 50
        },
        selectStyle: {
            type: Object,
            default: function() {
                return {}
            }
        },
        type: {
            type: String,
            default: 'checkbox'
        },
        isTips: {
            type: Boolean,
            default: function() {
                return true;
            }
        }
    },
    data() {
        return {
            drag: false,
            is_drag: false
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        groupNmae() {
            return "goods" + Date.parse(new Date());
        },
        selectData: {
            get() {
                return this.value
            },
            set(value) {
                if (this.drag) {
                    this.$emit('input', value);
                    this.$emit('change', value);
                    this.is_drag = false
                } else {
                    let data = JSON.parse(JSON.stringify(value));
                    data = this.value.concat(data);
                    this.$emit('input', data);
                }

            }
        },
        goodsStyle: function() {
            let style = {}
            return Object.assign(this.selectStyle, style);
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
         * 确认信息
         * @return {[type]} [description]
         */
        handleConfirm(data) {
            this.$emit('confirm', data);
        },
        /**
         * 关闭
         * @return {[type]} [description]
         */
        handleClose(index) {
            this.selectData.splice(index, 1);
            this.$emit('remove', this.selectData);
        },
        /**
         * 获取封面信息
         * @param  {[type]} cover [description]
         * @return {[type]}       [description]
         */
        getGoodsCover(cover) {
            if (cover) {
                if (Object.prototype.toString.call(cover) == '[object Array]') {
                    return cover[0];
                }
            }
            return cover;
        },
        open() {
            this.$refs.popup.handleClick();
        },
        //开始拖拽事件
        onStart() {
            this.is_drag = true;
            this.drag = true;
        },
        //拖拽结束事件
        onEnd() {
            this.drag = false;
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>