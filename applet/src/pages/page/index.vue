<template>
    <scroll-view class="pages">
        <view v-for="(item,index) in page" :key="index">
            <component v-if="item.name == 'title'" is="titles" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'navigation'" is="navigation" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'video'" is="videos" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'banner'" is="banner" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'search'" is="search" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'goods'" is="goods" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'blank'" is="blank" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'tabs'" is="tabs" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-else-if="item.name === 'rubik'" is="rubik" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'advertising'" is="advertising" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'separate'" is="separate" :facade="item.facade" :content="item.content" :data-index="index"></component>
        </view>
    </scroll-view>
</template>
<script type="text/javascript">
//组件列表
import titles from '../fitment/title/title.vue';
import navigation from '../fitment/navigation/navigation.vue';
import videos from '../fitment/video/video.vue';
import separate from '../fitment/separate/separate.vue';
import blank from '../fitment/blank/blank.vue';
import banner from '../fitment/banner/banner.vue';
import search from '../fitment/search/search.vue';
import goods from '../fitment/goods/goods.vue';
import advertising from '../fitment/advertising/advertising.vue';
import tabs from '../fitment/tabs/tabs.vue';
import rubik from "../fitment/rubik/rubik.vue";

export default {
    components: {
        videos,
        separate,
        blank,
        banner,
        search,
        goods,
        advertising,
        navigation,
        tabs,
        titles,
        rubik
    },
    data() {
        return {
            page: []
        };
    },
    /**
     * 页面显示时
     * @return {[type]} [description]
     */
    onShow(options) {
        if (this.$scope && this.$scope.options.id) {
            let id = this.$scope.options.id;
            this.handlePageLoading(id);
        }
        if (this.options && this.options.id) {
            let id = this.options.id;
            this.handlePageLoading(id);
        }
    },
    methods: {
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handlePageLoading(id) {
            let key = 'micropage' + id;
            try {
                const value = this.getStorageSync(key);
                if (value) {
                    this.page = JSON.parse(value.content);
                    this.handleLoadData(value, id, key);
                } else {
                    console.error("没有数据信息集结在")
                    this.handleLoadData(null, id, key);
                }
            } catch (error) {
                this.handleLoadData(null, id, key);
            }
        },
        /**
         * 加载数据信息
         * @return {[type]} [description]
         */
        handleLoadData(value, id, key) {
            this.$heshop.pages("GET", parseInt(id)).then(data => {
                if (value && (this.$heshop.MD5(value) == this.$heshop.MD5(data))) {
                    return;
                } else {
                    this.page = JSON.parse(data.content)
                    uni.setStorageSync(key, data);
                }
            }).catch(error => {

            })
        },
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handlePageUpdate() {

        },
    }
};
</script>
<style>
.pages {
    width: 100%;
    overflow-x: hidden;
}
</style>