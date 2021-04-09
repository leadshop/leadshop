<template>
    <view class="he-products-featured">
        <view class="he-top flex justify-center align-center">
            <text class="iconfont iconproductrecommendation_line"></text>
            <view class="he-text">为你推荐</view>
            <text class="iconfont iconproductrecommendation_line he-icon-right"></text>
        </view>
        <list-b :list="list" v-if="list.length" @navigateTo="navigateTo"></list-b>
    </view>
</template>

<script>
import listB from "./goods-list/list-B.vue";
import {mapActions, mapGetters} from "vuex";
export default {
    name: "he-products-featured",
    components: {
        listB
    },
    computed: {
        ...mapGetters({
            list: 'goods/shareGoods'
        })
    },
    methods: {
        ...mapActions({
            shareGoods: 'goods/shareGoods'
        }),
        navigateTo: function(item) {
            uni.navigateTo({url: '/pages/goods/detail?id=' +item.id});
        }
    },
    mounted() {
        this.shareGoods();
    }
}
</script>

<style scoped>
.he-products-featured {
    width: 750px;
}
.he-top {
    margin-top: 43px;
    border-radius: 16px 16px 0 0;
}
.iconproductrecommendation_line {
    font-size: 68px;
    color: #A2A2A2;
}
.he-icon-right {
    transform: rotate(180deg);
    transform-origin:50% 50%;
}
.he-text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    margin: 0 21px;
}
</style>