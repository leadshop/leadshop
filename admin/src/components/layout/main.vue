<template>
    <el-container class="apply-body">
        <el-header class="apply-header" height="64px" style="background-color: rgb(34, 34, 34);">
            <div class="apply-header__logo">
                <img :src="getStore.logo">
            </div>
            <div class="apply-header__menu">
                <MianBar></MianBar>
            </div>
            <div class="apply-header__user" >
                <ul>
                    <li>
                        <div class="user-name" @mouseover="visible = true">
                            {{getStore.name}}
                        </div>
                    </li>
                    <li>
                        <div class="user-photo">
                            <img :src="getStore.logo">
                        </div>
                    </li>
                </ul>
            </div>
            <div class="apply-header__shade" v-if="visible" @click="visible = false"></div>
            <div class="apply-header__logout" v-if="visible" @mouseenter="visible = true" @mouseleave="visible = false">
                <div class="footer-item" @click="handleClearCache">
                    <i class="le-icon le-icon-qinglihuancun"></i> <span>清理缓存</span>
                </div>
                <div class="footer-item" @click="handleLogout">
                    <i class="le-icon le-icon-tuichudenglu"></i> <span>退出登录</span>
                </div>
            </div>
        </el-header>
        <el-main class="apply-main">
            <router-view />
        </el-main>
    </el-container>
</template>
<script type="text/javascript">
import "@/pages.js";
import MianBar from '@/components/mainbar/Main'

import { createNamespacedHelpers } from "vuex";
const { mapGetters } = createNamespacedHelpers('setting');

export default {
    components: { MianBar },
    data() {
        return {
            visible: false,
            isHiden: false
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        },
        ...mapGetters({
            'getStore': 'getStore'
        })
    },
    methods: {
        /**
         * 清除缓存
         * @return {[type]} [description]
         */
        handleClearCache() {
            this.$heshop.clean('get').then(res => {
                this.$message({
                    message: '清除完成',
                    type: 'success'
                });
            }).catch(error => {
                console.error(":error", error)
                this.$message({
                    message: '清除失败',
                    type: 'warning'
                });
            })
            this.visible = false;
        },
        /**
         * 执行退出
         * @return {[type]} [description]
         */
        handleLogout() {
            this.$heshop.logout().then(() => {
                this.$router.push({ path: "/login/index" }).catch(error => {
                    console.error("路由跳转错误", error)
                })
            })
        },
        resolvePath(routePath) {
            if (isExternal(routePath)) {
                return routePath
            }
            if (isExternal(this.basePath)) {
                return this.basePath
            }
            return path.resolve(this.basePath, routePath)
        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';

.apply-body .apply-header__logout {
    width: 132px;
    height: 96px;
    background: #FFFFFF;
    box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.footer-item {
    height: 40px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.65);
}

.le-icon {
    color: #A3A3A3;
}
</style>