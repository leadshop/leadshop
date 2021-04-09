<template>
    <view class="rubik">
        <view class="advertising" v-if="size<7">
            <template v-if="size==1">
                <image lazy-load class="advertising-item-1" style="width: 100%;" :src=" adverArray[0].url" mode="widthFix" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[0].link)"></image>
            </template>
            <view class="advertising-item-2" v-if="size==2">
                <view class="advertising-item-image" style="width: 50%">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[0].url" mode="widthFix" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[0].link)"></image>
                </view>
                <view class="advertising-item-image" style="width: 50%">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[1].url" mode="widthFix" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[1].link)"></image>
                </view>
            </view>
            <view class="advertising-item-3" v-if="size==3">
                <view class="advertising-item-image" style="width: 33.333%">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[0].url" mode="widthFix" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[0].link)"></image>
                </view>
                </label>
                <view class="advertising-item-image" style="width: 33.333%">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[1].url" mode="widthFix" v-if="adverArray[1].url" @click="navigateToDetail(adverArray[1].link)"></image>
                </view>
                </label>
                <view class="advertising-item-image" style="width: 33.333%">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[2].url" mode="widthFix" v-if="adverArray[2].url" @click="navigateToDetail(adverArray[2].link)"></image>
                </view>
            </view>
            <view class="advertising-item-4" v-if="size==4">
                <view class="advertising-item-image" :style="{
                'width': '50%',
                'height': '375rpx',
                'top':0,
                'left':0
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[0].url" mode="aspectFill" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[0].link)"></image>
                </view>
                <view class="advertising-item-image" :style="{
                'width': '50%',
                'height': '188rpx',
                'top':0,
                'left':'375rpx',
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[1].url" mode="aspectFill" v-if="adverArray[1].url" @click="navigateToDetail(adverArray[1].link)"></image>
                </view>
                <view class="advertising-item-image" :style="{
                'width': '50%',
                'height': '188rpx',
                'top':'188rpx',
                'left':'375rpx',
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[2].url" mode="aspectFill" v-if="adverArray[2].url" @click="navigateToDetail(adverArray[2].link)"></image>
                </view>
            </view>
            <view class="advertising-item-5" v-if="size==5">
                <view class="advertising-item-image" style="width: 25%">
                    <image style="width: 100%; height: 100%" :src="adverArray[0].url" mode="widthFix" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[0].link)"></image>
                </view>
                <view class="advertising-item-image" style="width: 25%">
                    <image style="width: 100%; height: 100%" :src="adverArray[1].url" mode="widthFix" v-if="adverArray[1].url" @click="navigateToDetail(adverArray[1].link)"></image>
                </view>
                <view class="advertising-item-image" style="width: 25%">
                    <image style="width: 100%; height: 100%" :src="adverArray[2].url" mode="widthFix" v-if="adverArray[2].url" @click="navigateToDetail(adverArray[2].link)"></image>
                </view>
                <view class="advertising-item-image" style="width: 25%">
                    <image style="width: 100%; height: 100%" :src="adverArray[3].url" mode="widthFix" v-if="adverArray[3].url" @click="navigateToDetail(adverArray[3].link)"></image>
                </view>
            </view>
            <view class="advertising-item-6" v-if="size==6">
                <view class="advertising-item-image" :style="{
                     'width': '50%',
                'height': '188rpx',
                'top':0,
                'left':0
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[0].url" mode="aspectFill" v-if="adverArray[0].url" @click="navigateToDetail(adverArray[0].link)"></image>
                </view>
                <view class="advertising-item-image" :style="{
                'width': '50%',
                'height': '188rpx',
                'top':'188rpx',
                'left':0
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[1].url" mode="aspectFill" v-if="adverArray[1].url" @click="navigateToDetail(adverArray[1].link)"></image>
                </view>
                <view class="advertising-item-image" :style="{
                'width': '50%',
                'height': '188rpx',
                'top':0,
                'left':'50%',
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[2].url" mode="aspectFill" v-if="adverArray[2].url" @click="navigateToDetail(adverArray[2].link)"></image>
                </view>
                <view class="advertising-item-image" :style="{
                'width': '50%',
                'height': '188rpx',
                'top':'188rpx',
                'left':'50%',
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="adverArray[3].url" mode="aspectFill" v-if="adverArray[3].url" @click="navigateToDetail(adverArray[3].link)"></image>
                </view>
            </view>
        </view>
        <view v-if="size==7" class="rubik-cube">
            <template v-for="(item,index) in adverArray">
                <view class="rubik-cube__item" :key="index" :style="{
                width:getWidth(item)+'px',
                height:getHeight(item)+'px',
                top:getTop(item)+'px',
                left:getLeft(item)+'px',
            }">
                    <image lazy-load style="width: 100%; height: 100%" :src="item.url" mode="aspectFill" v-if="item.url" @click="navigateToDetail(item.link)"></image>
                </view>
            </template>
        </view>
        <!--     {{cubeArray}} -->
    </view>
</template>
<script type="text/javascript">
import MPageNavigate from "../../../libs/function/MPageNavigate";

export default {
    props: {
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
        adverArray() {
            return this.content.data;
        },
        size() {
            return this.content.style;
        },
        windowWidth() {
            let _s = uni.getSystemInfoSync();
            return _s.windowWidth;
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
         * 导航详情
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        navigateToDetail(item) {
            this.$h.MPageNavigate(item);
        },
        getHeight(item) {
            const width = this.windowWidth / this.content.density;
            return (item.rowEnd - item.rowStart + 1) * width;
        },
        getWidth(item) {
            const width = this.windowWidth / this.content.density;
            return (item.columnEnd - item.columnStart + 1) * width;
        },
        getLeft(item) {
            const width = this.windowWidth / this.content.density;
            return (item.columnStart - 1) * width;
        },
        getTop(item) {
            const width = this.windowWidth / this.content.density;
            return (item.rowStart - 1) * width;
        },
        getCover(cover = "") {
            let url = "";
            if (cover) {
                if (Object.prototype.toString.call(cover) == '[object Array]' && cover[0]) {
                    return cover[0].url;
                }
            }
            return url;
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>