<template>
    <view class="he-no-content-yet">
        <image class="he-empty__image" :src="newImage"></image>
        <view>{{text}}</view>
    </view>
</template>

<script>
export default {
    name: "he-no-content-yet",
    props: {
        text: {
            type: String,
            default: function() {
                return '暂无内容';
            }
        },
        image: {
            type: String,
            default: ''
        }
    },
    computed: {
        newImage: function() {
            if (this.image) {
                return this.image;
            } else {
                return this.ipAddress + '/goods-imgae-no.png';
            }
        }
    }
}
</script>

<style scoped>
.he-no-content-yet {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.3;
    text-align: center;
    margin-top: 40px;
}
.he-empty__image {
    width: 320px;
    height: 320px;
}
</style>