<template>
    <view class="showcase-video">
        <view class="video-container video-container--visible" style="height: 420rpx;">
            <video class="video-container--box" :poster="content.cover" :autoplay="content.autoplay" :loop="content.loop" :src="content.video.url">当前浏览器不支持最新的video播放</video>
        </view>
    </view>
</template>
<script type="text/javascript">
export default {
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    }
};
</script>
<style scoped="true">
.video-container {
    position: relative;
    width: 100%;
    visibility: hidden;
}

.video-container--visible {
    visibility: visible;
}

.video-container .video-container--box {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: #000;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
}
</style>