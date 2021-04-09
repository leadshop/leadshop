<template>
    <el-container class="main">
        <el-header height="64px">
            <div class="layout-logo">
                <img src="@/assets/images/logo.png">
            </div>
            <div class="layout-back">
                <ul>
                    <li><span><i class="le-icon le-icon-arrow-left"></i>返回店铺</span></li>
                </ul>
            </div>
        </el-header>
        <el-container class="main-body">
            <el-aside class="main-aside" width="96px">
                <ul>
                    <li>
                        <router-link :to="{path:'/finish/pages/tabbar'}" :class="{'active':is_active('/finish/pages/tabbar')}">
                            <i class="le-icon le-icon-bottom2"></i>
                            <span>
                                底部导航
                            </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path:'/finish/pages/index'}" :class="{'active':is_active('/finish/pages/index')}">
                            <i class="le-icon le-icon-wechat-page"></i>
                            <span>
                                微页面
                            </span>
                        </router-link>
                    </li>
                </ul>
            </el-aside>
            <el-main class="main-main">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
export default {
    methods: {
        is_active(path){
            if(this.$route.path==path){
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>
<style lang="less">
@import './main.less';
</style>