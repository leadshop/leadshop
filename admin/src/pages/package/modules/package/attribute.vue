<template>
    <control title="组件管理" :is_tab="false">
        <div class="control-item-title">组件排序 <span @click="handleEmpty" style="color: #623CEB;font-size: 12px;float: right;cursor: pointer;">清除全部组件</span></div>
        <draggable v-model="pages" class="dragrank" chosenClass="chosen" forceFallback="true" group="people" @start="onStart" animation="1000" @end="onEnd">
            <transition-group>
                <label class="dragrank-item" v-for="(element,index) in pages" :key="'kd'+index">
                    <div class="dragrank-item-title">
                        <span>{{element.title}}</span>
                        <i class="le-icon le-icon-trash dragrank-item-del" @click.stop="handleDelete(index)"></i>
                    </div>
                    <i class="le-icon le-icon-tuoye dragrank-item-move" @click.stop="onStart"></i>
                </label>
            </transition-group>
        </draggable>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import draggable from 'vuedraggable'
export default {
    //注册draggable组件
    components: {
        draggable,
        control
    },
    props: {
        value: ""
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        pages: {
            get() {
                let _array = [];
                for (let index in this.$store.state.finish.pages) {
              
                }
                return this.$store.state.finish.pages;
            },
            set(value) {
                this.$store.commit('finish/setPagesData', value);
            }
        },
    },
    methods: {
        handleDelete(index) {
            //判断删除的是否为当前值
            if (index === this.select) {
                this.select = 0;
            }
            //执行数据删除
            this.pages.splice(index, 1);
        },
        //开始拖拽事件
        onStart() {
            this.drag = true;
        },
        //拖拽结束事件
        onEnd() {
            this.drag = false;
        },
        /**
         * 处理清空
         * @return {[type]} [description]
         */
        handleEmpty() {
            this.pages = [];
        }
    }
};
</script>
<style lang="less" scoped>
@import './attribute.less';
</style>