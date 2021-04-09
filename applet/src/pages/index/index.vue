<template>
    <scroll-view class="pages fitment-pages">
        <view v-for="(item,index) in page" :key="index">
            <component v-if="item.name === 'rubik'" is="rubik" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'title'" is="titles" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'navigation'" is="navigation" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'video'" is="videos" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'separate'" is="separate" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'banner'" is="banner" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'search'" is="search" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'goods'" is="goods" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'blank'" is="blank" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'tabs'" is="tabs" :facade="item.facade" :content="item.content" :data-index="index"></component>
            <component v-if="item.name == 'wechat'" is="wechat" :facade="item.facade" :content="item.content" :data-index="index"></component>
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
import tabs from '../fitment/tabs/tabs.vue';
import rubik from "../fitment/rubik/rubik.vue";
import advertising from '../fitment/advertising/advertising.vue';
import wechat from '../fitment/wechat/wechat.vue';
export default {
    components: {
        videos,
        separate,
        blank,
        banner,
        search,
        goods,
        navigation,
        tabs,
        titles,
        rubik,
        advertising,
        wechat,
    },
    data() {
        return {
            page: [],
            empty: {
                "name": "blank",
                "icon": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/pageicon/blank-icon.png",
                "title": "辅助空白",
                "content": {},
                "facade": {
                    "height": 10,
                    "background_color": "#FFFFFF"
                }
            }
        };
    },
    /**
     * 页面显示时
     * @return {[type]} [description]
     */
    onShow(options) {
        this.handlePageLoading();
    },
    methods: {
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handlePageLoading() {
            try {
                const value = this.getStorageSync('micropage');
                if (value) {
                    uni.setNavigationBarTitle({
                        title: value.name
                    })
                    this.page = JSON.parse(value.content);
                    this.handleLoadData(value);
                } else {
                    this.handleLoadData();
                }
            } catch (error) {
                this.handleLoadData();
            }
        },
        /**
         * 加载数据信息
         * @return {[type]} [description]
         */
        handleLoadData(value) {
            this.$heshop.pages("GET").then(data => {
                if (value && (this.$heshop.MD5(value) == this.$heshop.MD5(data))) {
                    return;
                } else {
                    this.page = JSON.parse(data.content)
                    uni.setStorageSync('micropage', data);
                    uni.setNavigationBarTitle({
                        title: data.name
                    })
                }
            }).catch(error => {
                console.log("页面接在信息", error)
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
    min-height: 100vh;
    overflow-x: hidden;
    background-color: RGBA(245, 245, 245, 1);
}
</style>