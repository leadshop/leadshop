<template>
    <div class="dragrank">
        <draggable v-model="tabArray" handle=".dragrank-item-move" class="dragrank-content" chosenClass="chosen" forceFallback="true" group="people" @start="onStart" animation="1000" @end="onEnd">
            <transition-group>
                <label class="dragrank-item" v-for="(element,index) in tabArray" :key="'kd'+index">
                    <input class="dragrank-item-radio" type="radio" :value="index" v-model="select">
                    <div class="dragrank-item-title">
                        <span>{{element.title}}</span>
                        <i class="le-icon le-icon-trash dragrank-item-del" @click.stop="handleDelete(index)"></i>
                    </div>
                    <i class="le-icon le-icon-tuoye dragrank-item-move" @click.stop="onStart"></i>
                </label>
            </transition-group>
        </draggable>
    </div>
</template>
<script type="text/javascript">
import draggable from 'vuedraggable'
export default {
    //注册draggable组件
    components: {
        draggable,
    },
    props: {
        value: {
            type: [Array, Object],
            default: ''
        }
    },
    data() {
        return {
            select: 0
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        tabArray: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value);
            }
        }
    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        select(value) {
            this.$emit('change', value);
        }
    },
    methods: {
        handleDelete(index) {
            //判断删除的是否为当前值
            if (index === this.select) {
                this.select = 0;
            }
            //执行数据删除
            this.tabArray.splice(index, 1);
        },
        //开始拖拽事件
        onStart() {
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
@import './dragrank.less';
</style>