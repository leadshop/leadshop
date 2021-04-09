<template>
    <el-scrollbar class="le-page__preview">
        <img class="le-preview__img" :src="img" alt="" @mousedown="mousedown">
    </el-scrollbar>
</template>

<script>
export default {
    name: "pagePreview",
    data() {
        return {
            img: ''
        }
    },
    mounted() {
        this.img = decodeURIComponent(this.$heshop.utils.getQueryVariable('img'));
    },
    methods: {
        mousedown: function (e) {
            return false;
        }
    }
}
</script>

<style scoped>
.le-preview__img {
    width: 506px;
    display: block;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
}
.le-page__preview {
    width: 508px;
    height: 100vh;
    margin:0 auto;
}
/deep/.el-scrollbar__wrap {
    overflow-x: hidden;
}
</style>