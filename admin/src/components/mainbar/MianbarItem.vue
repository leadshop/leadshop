<template>
    <div v-if="!item.hidden" class="le-sidebar-item">
        <template v-if="hasOneShowingChild(item.children,item)&&!item.alwaysShow">
            <app-link v-if="item.meta" :to="resolvePath(item.path)">
                <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown':!isNest}">
                    <item :icon="item.meta.icon||(item.meta&&item.meta.icon)" :title="item.meta.title" />
                </el-menu-item>
            </app-link>
        </template>
    </div>
</template>
<script type="text/javascript">
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers('menus');
export default {
    name: 'SidebarItem',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
        // route object
        item: {
            type: Object,
            required: true
        },
        isNest: {
            type: Boolean,
            default: false
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    data() {
        // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
        // TODO: refactor with render function
        this.onlyOneChild = null
        return {}
    },
    methods: {
        ...mapMutations(['setmenuList']),
        hasOneShowingChild(children = [], parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false
                } else {
                    return true
                }
            })
            this.setmenuList({
                key: parent.path,
                data: showingChildren
            });
            if (showingChildren.length === 1) {
                return true
            }
            return true
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
}
</script>
<style type="text/css" lang="less">
.le-sidebar-item {
    display: inline-block;
}

.le-sidebar>ul.el-menu--inline {
    position: absolute;
    left: 0;
    top: 100px;

    >.nest-menu {
        display: block;
    }
}
</style>