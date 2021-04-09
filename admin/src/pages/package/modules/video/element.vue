<template>
    <div class="video">
        <div class="video-icon">
            <i class="le-icon le-icon-bofang"></i>
        </div>
        <div class="video-cover" :style="{
            'background-image':'url('+cover+')'
        }">
        </div>
    </div>
</template>
<script type="text/javascript">
// import empty from './empty.vue'
export default {
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        cover() {
            if (this.content.cover) {
                return this.content.cover;
            }
            if (this.content.video && this.content.video.cover) {
                return this.content.video.cover;
            }
            return "";
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>