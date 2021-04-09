<template>
    <el-menu :default-active="activeMenu" :text-color="menuText" :unique-opened="false" :active-text-color="menuActiveText" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'

export default {
    components: { SidebarItem },
    computed: {
        routes() {
            return this.$router.options.routes[0].children;
        },
        menuActiveText() {
            return "#FFFFFF";
        },
        menuText() {
            return "#000000";
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            return path
        }
    }
}
</script>