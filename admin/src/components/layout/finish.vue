<template>
    <el-container class="main">
        <el-header height="64px">
            <div class="layout-logo">
                <img src="@/assets/images/logo.png">
            </div>
            <div class="layout-back">
                <ul>
                    <router-link tag="li" :to="{name:'store'}">
                        <li><span><i class="le-icon le-icon-arrow-left"></i>返回</span></li>
                    </router-link>
                </ul>
            </div>
        </el-header>
        <el-container class="main-body">
            <el-main class="main-main">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </el-main>
        </el-container>
    </el-container>
</template>
<style lang="less">
@import './finish.less';
</style>