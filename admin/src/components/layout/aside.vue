<template>
    <el-container>
        <el-aside width="96px" class="apply-main__menus">
            <Sidebar></Sidebar>
        </el-aside>
        <el-main class="apply-main__content le-main">
            <router-view />
        </el-main>
    </el-container>
</template>
<script type="text/javascript">
import "@/pages.js";


import Sidebar from '@/components/mainbar/Side';
export default {
    components: {
        Sidebar
    }
}
</script>
<style lang="less" scoped>
@import './style.less';
</style>