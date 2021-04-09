<template>
    <view class="title" :style="{ 
                'padding-top': facade.margin + 'px',
                'padding-bottom': facade.margin + 'px',
            }">
        <view class="title-style1" v-if="content.style == 1" :style="{color: facade.title_color}">
            <view class="title-content" @click="navigateToDetail(content.morelink)">
                <view class="title-content-before" :style="{
                    borderTop:'2rpx solid '+facade.title_color
                }"></view> {{content.title}} <view class="title-content-after" :style="{
                    borderTop:'2rpx solid '+facade.title_color
                }"></view>
            </view>
        </view>
        <view class="title-style2" v-if="content.style == 2" :style="{color: facade.title_color}">
            <view class="title-content" @click="navigateToDetail(content.morelink)">
                {{content.title}}
            </view>
            <view class="title-decorate">
                <view class="title-decorate-before" :style="{
                    borderBottom:'2rpx solid '+facade.title_color
                }"></view>◇<view class="title-decorate-after" :style="{
                    borderBottom:'2rpx solid '+facade.title_color
                }"></view>
            </view>
        </view>
        <view class="title-style3" v-if="content.style == 3">
            <view class="title-content" :style="{
                'color': facade.title_color,
                'font-size': facade.title_font_size+'px'
            }">
                {{content.title}}
            </view>
            <view class="title-more" @click="navigateToDetail(content.morelink)" :style="{
                'color': facade.more_color
            }" v-if="content.is_more">
                {{content.moretitle}} <text class="iconfont iconbtn_arrow" style="font-size: 27rpx"></text>
            </view>
            <view class="title-subtitle" :style="{
                'color': facade.subtitle_color,
                'font-size': facade.subtitle_font_size+'px'
            }">
                {{content.subtitle}}
            </view>
        </view>
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
    methods: {
        /**
         * 导航详情
         * @param  {[type]} id [description]
         * @return {[type]}    [description]
         */
        navigateToDetail(item) {
            this.$h.MPageNavigate(item);
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>