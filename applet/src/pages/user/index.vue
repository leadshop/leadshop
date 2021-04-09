<template>
    <view class="he-page-content">
        <view class="le-content">
            <user-top></user-top>
            <user-my-order></user-my-order>
            <user-features></user-features>
            <he-products-featured v-if="goodsSetting.recommend_showpage.personal_center.value"></he-products-featured>
        </view>
        <he-copyright></he-copyright>
    </view>
</template>
<script>
import userTop from './components/user-top.vue';
import userMyOrder from './components/user-my-order.vue';
import userFeatures from './components/user-features.vue';
import heProductsFeatured from "../../components/he-products-featured.vue";
import heCopyright from "./components/he-copyright.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    components: {
        userTop,
        userMyOrder,
        userFeatures,
        heProductsFeatured,
        heCopyright
    },
    onLoad(options) {
        // #ifdef H5
        this.weChatLogin(options);
        // #endif
    },
    computed: {
        ...mapGetters({
            goodsSetting: 'setting/goodsSetting'
        })
    },
    methods: {
        ...mapActions({
            getOrderTotal: "user/getOrderTotal",
            weChatLogin: "user/weChatLogin",
        })
    },
    onShow() {
        this.isLogin ? this.getOrderTotal() : null;
    }
}
</script>

<style>
.he-page-content {
    overflow: hidden;
    position: relative;
}
.le-content {
    min-height: calc(100vh - 168px);
}
</style>
