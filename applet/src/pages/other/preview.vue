<template>
    <view class="he-page-content">
        <image class="he-image__content" :src="pic" @click="navigateBack"></image>
        <view class="he-name">
           {{name}}
        </view>
    </view>
</template>

<script>
export default {
    name: "index",
    data() {
        return {
            pic: '',
            name: ''
        }
    },
    onLoad(options) {
        this.pic = decodeURIComponent(options.pic);
        this.name = options.name;
    },
    methods: {
        navigateBack: function () {
            uni.navigateBack({delta: 1});
        }
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    background-color: #000000;
    overflow: hidden;
}
.he-image__content {
    width:750px;
    height: 750px;
    margin-top: 292px;
    // #ifdef H5
    object-fit: contain;
    // #endif
}
.he-name {
    width: 356px;
    border: 2px solid #FFFFFF;
    border-radius: 47px;
    padding: 16px 40px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 36px;
    text-align: center;
    margin: 40px auto 0 auto;
}
</style>