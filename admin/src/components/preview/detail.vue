<template>
    <div>
        <el-carousel indicator-position="outside" height="500px">
            <el-carousel-item v-for="item in value" :key="item">
                <img class="le-img" :src="item" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    name: "detail",
    props: {
        value: {
            type: [Array],
            default: function() {
                return [];
            }
        }
    }
}
</script>

<style scoped>
.le-img {
    width: 480px;
    height: 480px;
    background: #000000;
    margin: 0 119px;
}
</style>
