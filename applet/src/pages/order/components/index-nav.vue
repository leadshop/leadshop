<template>
    <view class="index-nav flex text-center" :data-theme="theme">
        <view class="flex-sub" @tap="setTab(item.key)" :class="item.key === value ?'he-active':'he-no-active'" v-for="(item, index) in list" :key="index">
            <text class="he-item" >{{item.name}}</text>
        </view>
        <he-loading class="he-loading" size="35" mode="flower" v-if="loading"></he-loading>
    </view>
</template>

<script>
import heLoading from "@/components/he-loading.vue";

export default {
    name: "index-nav",
    components: {
        heLoading
    },
    props: {
        value: String,
        loading: Boolean
    },
    data() {
        return {
            list: [{name: '全部', key: 'all'}, {name: '待付款', key: 'unpaid'}, {name: '待发货', key: 'unsent'}, {name: '待收货', key: 'unreceived'}, {name: '待评价', key: 'noevaluate'}],
        }
    },
    methods: {
        setTab: function(e) {
            if (this.value !== e) {
                this.$emit('input', e);
                this.$emit('setTab');
            }
        }
    }
}
</script>

<style scoped lang="scss">
.index-nav {
    width: 750px;
    height: 114px;
    background: #F5F5F5;
    position: fixed;
    top:0;
    z-index: 1;
}
.he-no-active .he-item{
    color: #666666;
    border-bottom-color: transparent;
}
.he-active .he-item {
    @include font_color('font_color');
    @include border_color('border_color');
}
.he-item {
    margin-top: 40px;
    display: inline-block;
    padding-bottom: 20px;
    border-bottom-width: 4px;
    border-bottom-style: solid;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 1.3;
}
.he-loading {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 100%);
}
</style>