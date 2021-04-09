<template>
    <view class="submit-comments" >
        <view class="he-item flex justify-between align-center" @click="navigateTo">
            <text class="flex-sub">买家留言</text>
            <text class="he-placeholder" v-if="!note">最多支持输入50个字</text>
            <text class="flex-treble he-line-1" v-else>{{note}}</text>
        </view>
    </view>
</template>

<script>
export default {
    name: "submit-comments",
    props: {
        note: String
    },
    methods: {
        navigateTo: function() {
            uni.navigateTo({
                url: '/pages/other/buyer-message?note=' + this.note
            });
        }
    }
}
</script>

<style scoped>
    .submit-comments {
        width: 710px;
        background: #FFFFFF;
        border-radius: 16px;
        padding: 16px 24px;
        margin: 16px 20px 0 20px;
    }
    .he-item {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #222222;
        min-height: 64px;
    }
    .he-placeholder {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #999999;
    }
</style>