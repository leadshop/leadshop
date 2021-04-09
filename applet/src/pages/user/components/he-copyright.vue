<template>
    <view class="he-copyright flex flex-direction align-center">
        <image class="he-copyright__image" :src="ipAddress + '/copy-logo.png'"/>
        <text class="he-copyright__text">Powered By Leadshop © 2021</text>
    </view>
</template>

<script>
export default {
    name: "he-copyright"
}
</script>

<style scoped>
.he-copyright {
    width: 100%;
    padding: 40px 0 27px 0;
    background-color: #F7F7F7;
}

.he-copyright__image {
    width: 240px;
    height: 48px;
}

.he-copyright__text {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #BFBFC3;
    line-height: 48px;
}
</style>