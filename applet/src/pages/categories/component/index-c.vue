<template>
    <scroll-view class="he-content">
        <view v-if="!$h.test.isEmpty(list)">
            <view class="he-row" v-for="item in list" :key="item.id">
                <view class="he-header flex align-center justify-center">
                    <text class="iconfont iconclassification_line"></text>
                    <text class="he-header__name">{{item.name}}</text>
                    <text class="iconfont iconclassification_line he-icon__right"></text>
                </view>
                <view class="he-body flex">
                    <view class="he-empty" v-if="!item.children">暂无内容</view>
                   <view class="he-item flex flex-direction align-center justify-between"
                         @click="navigateTo(child)"
                         v-for="child in item.children" :key="child.id">
                       <!--#ifndef H5-->
                       <image class="he-item__icon" mode="aspectFill" :src="child.icon" :lazy-load="true"></image>
                       <!--#endif-->
                       <!--#ifdef H5-->
                       <img class="he-item__icon" v-lazy="child.icon">
                       <!--#endif-->
                       <text class="he-item__name">{{child.name}}</text>
                   </view>
                </view>
            </view>
        </view>
        <he-no-content-yet v-else></he-no-content-yet>
    </scroll-view>
</template>

<script>
import heNoContentYet from "../../../components/he-no-content-yet.vue";

export default {
    name: "index-E",
    props: {
        list: Array
    },
    components: {
        heNoContentYet,
    },
    data() {
        return {
            isNothing: false,
        }
    },
    methods: {
        navigateTo: function(item) {
            uni.navigateTo({url: '/pages/goods/search-list?group=' + item.id + '&goods_show='+item.goods_show});
        }
    }
}
</script>

<style scoped lang="scss">
.he-content {
    width: 570px;
    height: calc(100vh - 104px);
}
.he-header {
    height: 72px;
}
.iconclassification_line {
    font-size: 72px;
    color: #DEDEDE;
}
.he-header__name {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin: 0 30px;
}
.he-icon__right {
    transform: rotate(180deg);
}
.he-item {
    width: 180px;
    height: 204px;
    padding: 24px 0;
}
.he-item__icon {
    width: 110px;
    height: 110px;
    display: block;
    // #ifdef H5
    position: relative;
    object-fit: contain;
    // #endif
}
.he-item__name {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
}
.he-empty {
    height: 80px;
    line-height: 80px;
    margin: auto;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
}
</style>