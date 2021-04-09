<template>
    <el-menu :default-active="activeMenu" :unique-opened="false" :collapse-transition="false" mode="vertical">
        <mianbar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
    </el-menu>
</template>
<script>
import MianbarItem from './MianbarItem'

export default {
    components: { MianbarItem },
    computed: {
        routes() {
            return this.$router.options.routes[0].children;
        },
        activeMenu() {
            const route = this.$route
            const { meta, path } = route
            if (meta.activeMenu) {
                return meta.activeMenu
            }
            if (meta.parentMenu) {
                return meta.parentMenu
            }
            return path
        }
    }
}
</script>