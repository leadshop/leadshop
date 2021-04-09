<template>
    <div class="fm-mobile-body" id="fm-mobile-body" ref="mobile" @dragover="allowDrop($event)">
        <vuedraggable class="wrapper" v-model="page">
            <transition-group>
                <div v-for="(item,index) in page" :key="index+1">
                    <covermask v-if="dragActive(index,'top')" />
                    <component v-if="item.name == 'title'" is="titles" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'navigation'" is="navigation" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'video'" is="videos" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'banner'" is="banner" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'search'" is="search" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'goods'" is="goods" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'advertising'" is="advertising" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'blank'" is="blank" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'tabs'" is="tabs" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <component v-if="item.name == 'wechat'" is="wechat" :facade="item.facade" :content="item.content" :data-index="index"></component>
                    <covermask v-if="dragActive(index,'down')" />
                </div>
            </transition-group>
        </vuedraggable>
        <div class="fm-mobile-empty" v-if="page.length === 0" :data-index="-2">
            <covermask v-if="dragActive(-2,'top')" :data-index="-2"></covermask>
        </div>
    </div>
</template>
<script type="text/javascript">
//组件列表
import titles from '../title/index.vue';
import navigation from '../navigation/index.vue';
import videos from '../video/index.vue';
import blank from '../blank/index.vue';
import banner from '../banner/index.vue';
import search from '../search/index.vue';
import goods from '../goods/index.vue';
import advertising from '../advertising/index.vue';
import tabs from '../tabs/index.vue';
import wechat from '../wechat/index.vue';


import vuedraggable from './vuedraggable.js'
import covermask from './covermask.vue'
export default {
    components: {
        videos,
        blank,
        banner,
        search,
        goods,
        advertising,
        navigation,
        titles,
        tabs,
        wechat,

        vuedraggable,
        covermask
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
        page: {
            get() {
                return this.$store.state.pages.page;
            },
            set(value) {
                this.$store.commit('pages/setPageData', value);
            }
        },
        coms() {
            return this.$store.state.pages.coms;
        },
        dragIndex: {
            get() {
                return this.$store.state.pages.dragIndex;
            },
            set(value) {
                this.$store.commit('pages/setDragIndex', value);
            }
        },
        position: {
            get() {
                return this.$store.state.pages.position;
            },
            set(value) {
                this.$store.commit('pages/setDragPosition', value);
            }
        },
        IframeHeight() {
            return this.$store.state.pages.iframeHeight;
        }

    },
    watch: {
        coms(value) {
        },
        page: {
            deep: true,
            handler(newV, oldV) {
                //this.getIframeHeight();
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    mounted() {

    },
    methods: {
        /**
         * 拖拽激活
         * @param  {[type]} index    [description]
         * @param  {[type]} position [description]
         * @return {[type]}          [description]
         */
        dragActive(index, position) {
            if ((this.dragIndex === index) && (this.position == position) && this.coms) {
                return true;
            } else {
                return false;
            }
        },
        /**
         * 拖拽过程事件
         * @return {[type]} [description]
         */
        allowDrop($event) {
            $event = window.event;
            let index = parseInt($event.target.dataset.index);
            if (index || index === 0) {
                this.dragIndex = index;
                //判断是否为拖拽元素
                if ($event.type == "dragover" && $event.target.dataset) {
                    //判断是否是拖拽区域
                    if ($event.target.dataset.type == "widget") {
                        //获取Y轴移动值
                        let y = parseFloat($event.offsetY);
                        //由于缩小50%，需要除去双倍
                        let h = parseFloat($event.target.clientHeight / 4);
                        if (y < h) {
                            this.position = 'top';
                        } else {
                            this.position = 'down';
                        }
                    }
                }
            }
            $event.preventDefault();
        }
    }
};
</script>
<style>
.wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: #f2f5f7;
}

.fm-mobile-body {
    padding: 4px 187.5px;
    min-height: 100rpx;
}

.fm-mobile-empty {
    min-height: 800rpx;
    width: 100%;
}
</style>
