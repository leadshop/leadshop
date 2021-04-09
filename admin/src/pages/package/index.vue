<template>
    <div class="package" ref="mobile" id="min-page" @dragover="allowDrop($event)" @drop="drop" @dragover.prevent :draggable="false" :data-index="-2">
        <div v-for="(item,index) in pages" :key="index+1" role="widgetgroup">
            <Covermask v-if="dragActive(index,'top')"></Covermask>
            <Search v-if="item.name == 'search'" :facade="item.facade" :content="item.content" :index="index"></Search>
            <Title v-if="item.name == 'title'" :facade="item.facade" :content="item.content" :index="index"></Title>
            <navigation v-if="item.name == 'navigation'" :facade="item.facade" :content="item.content" :index="index"></navigation>
            <Video v-if="item.name == 'video'" :facade="item.facade" :content="item.content" :index="index"></Video>
            <Banner v-if="item.name == 'banner'" :facade="item.facade" :content="item.content" :index="index"></Banner>
            <Goods v-if="item.name == 'goods'" :facade="item.facade" :content="item.content" :index="index"></Goods>
            <Blank v-if="item.name == 'blank'" :facade="item.facade" :content="item.content" :index="index"></Blank>
            <Separate v-if="item.name == 'separate'" :facade="item.facade" :content="item.content" :index="index"></Separate>
            <Tabs v-if="item.name == 'tabs'" :facade="item.facade" :content="item.content" :index="index"></Tabs>
            <Wechat v-if="item.name == 'wechat'" :facade="item.facade" :content="item.content" :index="index"></Wechat>
            <Rubik v-if="item.name == 'rubik'" :facade="item.facade" :content="item.content" :index="index"></Rubik>
            <Covermask v-if="dragActive(index,'down')" />
        </div>
        <div class="package-empty" :data-index="-2">
            <Covermask v-if="dragActive(-2,'down')" :data-index="-2"></Covermask>
        </div>
    </div>
</template>
<script type="text/javascript">
import modules from './modules'
import vuedraggable from '../../lib/vuedraggable.js'
import Covermask from '../../components/covermask.vue'

export default {
    components: {
        "Title": modules.title.widget,
        "Video": modules.video.widget,
        "Separate": modules.separate.widget,
        "Blank": modules.blank.widget,
        "Banner": modules.banner.widget,
        "Search": modules.search.widget,
        "Goods": modules.goods.widget,
        "Navigation": modules.navigation.widget,
        "Rubik": modules.rubik.widget,
        "Tabs": modules.tabs.widget,
        "Wechat": modules.wechat.widget,
        vuedraggable,
        Covermask
    },
    data() {
        return {
            is_empty: false
        };
    },
    watch: {
        coms(value) {

        },
        pages: {
            deep: true,
            handler(newV, oldV) {

            }
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        dragIndex: {
            get() {
                return this.$store.state.finish.dragIndex;
            },
            set(value) {
                this.$store.commit('finish/setDragIndex', value);
            }
        },
        position: {
            get() {
                return this.$store.state.finish.position;
            },
            set(value) {
                this.$store.commit('finish/setDragPosition', value);
            }
        },
        select() {
            return this.$store.state.finish.index;
        },
        pages: {
            get() {
                return this.$store.state.finish.pages;
            },
            set(value) {
                this.$store.commit('finish/setPagesData', value);
            }
        },
        coms() {
            return this.$store.state.finish.coms;
        },
    },
    mounted() {
        this.loadPageInfo();
    },
    methods: {
        /**
         * 加载数据操作
         * @return {[type]} [description]
         */
        loadPageInfo() {
            let id = this.$route.query.id;
            this.$heshop.pages("get", parseInt(id)).then(data => {
                this.pages = JSON.parse(data.content);
                this.$store.commit('finish/setPageInfo', data);
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
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
            if (index == -2) {
                this.dragIndex = index;
                this.position = 'down';
            }
            $event.preventDefault();
        },
        /**
         * 执行放置，只要在范围内
         * @param  {[type]} $event [description]
         * @return {[type]}        [description]
         */
        drop($event) {
            this.$store.dispatch('finish/pushPagesComs');
        },
        draggableStart() {

            this.$store.commit('finish/setLock', true);
        },
        draggableEnd() {

            this.$store.commit('finish/setLock', false);
        }
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>