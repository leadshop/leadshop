<template>
    <scroll-view class="he-content">
        <view class="flex flex-wrap" v-if="!$h.test.isEmpty(list)">
            <view class="he-item flex flex-direction align-center justify-between"
                  @click="navigateTo(item)"
                  v-for="item in list" :key="item.id">
                <!--#ifndef H5-->
                <image class="he-item__icon" mode="aspectFill" :src="item.icon" :lazy-load="true"></image>
                <!--#endif-->
                <!--#ifdef H5-->
                <img class="he-item__icon" v-lazy="item.icon">
                <!--#endif-->
                <text class="he-item__name">{{item.name}}</text>
            </view>
        </view>
        <he-no-content-yet v-else></he-no-content-yet>
    </scroll-view>
</template>

<script>
import heNoContentYet from "../../../components/he-no-content-yet.vue";

export default {
    name: "index-D",
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
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
        navigateTo: function (item) {
            uni.navigateTo({url: '/pages/goods/search-list?group=' + item.id + '&goods_show='+item.goods_show});
        }
    }
}
</script>

<style scoped lang="scss">
.he-content {
    width: 570px;
    height: calc(100vh - 104px);
    padding: 16px 20px;
}
.he-item {
    width: 177px;
    height: 204px;
}
.he-item__icon {
    width: 110px;
    height: 110px;
    display: block;
    margin-top: 24px;
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
    margin-bottom: 24px;
}
</style>