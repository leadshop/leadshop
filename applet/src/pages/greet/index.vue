<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <text class="title">{{title}}</text>
            <view>个人中</view>
        </view>
        <button @click="dddd">测试</button>
    </view>
</template>
<script>
export default {
    data() {
        return {
            title: '我的'
        }
    },
    onLoad() {

    },
    methods: {

    }
}
</script>
<style>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.logo {
    height: 200px;
    width: 200px;
    margin: 200px auto 50px auto;
}

.text-area {
    display: flex;
    justify-content: center;
}

.title {
    font-size: 36px;
    color: #8f8f94;
}
</style>