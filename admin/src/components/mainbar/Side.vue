<template>
    <el-menu :default-active="activeMenu" :unique-opened="false" :collapse-transition="false" mode="vertical">
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
</template>
<script>
import SidebarItem from './SidebarItem'
import { createNamespacedHelpers } from "vuex";
const { mapState } = createNamespacedHelpers('menus');
export default {
    components: { SidebarItem },
    computed: {
        ...mapState(['menuList']),
        routes() {
            const route = this.$route
            const { meta, path } = route;
            return this.menuList[meta.parentMenu];
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