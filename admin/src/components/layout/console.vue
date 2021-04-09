<template>
    <div class="layout">
        <el-container>
            <el-header height="64px">
                <div class="layout-logo">
                    <img src="@/assets/images/logo.png">
                </div>
                <div class="layout-back">
                    <ul>
                        <li>
                            <router-link :to="{path:'/finish/pages/index'}"> <i class="le-icon le-icon-arrow-left"></i>返回微页面</router-link>
                        </li>
                        <li>|</li>
                        <li>
                            <pagetitle v-model="pageInfo.title" ref="pagetitle">
                                <span>{{getPageTitle(pageInfo.title)}}<i class="le-icon le-icon-editor"></i></span>
                            </pagetitle>
                        </li>
                    </ul>
                </div>
                <div class="layout-event">
                    <templateSelect v-model="pageInfo">
                        <el-button type="primary" style="margin: 0 10px">选择模板</el-button>
                    </templateSelect>
                    <el-popover ref="popover" placement="bottom" width="148" trigger="click">
                        <div class="layout-event-qrcode" style="text-align: center;">
                            <img src="http://manongyun.oss-cn-hangzhou.aliyuncs.com/Qmpaas/le-qrcode.png" width="100" height="100">
                            <p>手机扫描二维码预览</p>
                        </div>
                    </el-popover>
                    <el-button type="text" v-popover:popover style="margin: 0 10px">预览</el-button>
                    <popconfirm @confirm="handlePageSetting" title="确认设置该微页面为首页？">
                        <el-button type="text">设为首页</el-button>
                    </popconfirm>
                    <el-button type="text" @click="handlePageSave" style="margin: 0 10px">保存</el-button>
                    <promotion v-model="pageInfo">
                        <el-button type="text">推广</el-button>
                    </promotion>
                </div>
            </el-header>
            <el-main>
                <div class="layout-tool">
                    <el-scrollbar :style="scrollHeight">
                        <!-- 左侧功能栏-开始 -->
                        <el-collapse :value="['basics','advanced','sales','other']">
                            <el-collapse-item :name="index" v-for="mounted,index in panels" :key="index">
                                <template slot="title">
                                    <i class="le-icon le-icon-arrow"></i>
                                    <span>{{mounted.title}}</span>
                                </template>
                                <ul class="fm-collapse-tool">
                                    <li class="widget" v-for="item,index in mounted.children" :key="index" :draggable="true" @dragstart="dragStart(item)" @dragend="dragEnd" data-type="module">
                                        <i class="le-icon" :class="item.icon"></i>
                                        <span>{{item.title}}</span>
                                    </li>
                                    <div class="clears"></div>
                                </ul>
                            </el-collapse-item>
                        </el-collapse>
                        <!-- 左侧功能栏-结束 -->
                    </el-scrollbar>
                </div>
                <div class="layout-body">
                    <el-scrollbar :style="scrollHeight">
                        <div class="layout-phone">
                            <div class="layout-phone-header" @click="handlePageName">
                                <div class="layout-phone-title">
                                    {{pageInfo.name || '微页面'}}
                                </div>
                                <div class="layout-phone-header-active" v-if="index==-1"></div>
                            </div>
                            <div class="layout-phone-body">
                                <router-view />
                            </div>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="layout-attribute" v-if="!is_lock">
                    <el-scrollbar :style="scrollHeight" v-if="index!==-1">
                        <component :is="modules[attribute].attribute" v-if="modules[attribute]"></component>
                    </el-scrollbar>
                    <el-scrollbar :style="scrollHeight" v-if="index==-1">
                        <pageAttribute v-model="pageInfo.name"></pageAttribute>
                    </el-scrollbar>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import panels from '@/lib/panels.js'
import modules from '@/pages/package/modules'
import popconfirm from '@/components/popconfirm.vue'
import promotion from '@/components/promotion'
import pagetitle from '@/components/pagetitle'
import templateSelect from '@/components/templateSelect'
import pageAttribute from '@/pages/package/modules/page/attribute'


export default {
    components: {
        popconfirm,
        promotion,
        pagetitle,
        pageAttribute,
        templateSelect
    },
    data() {
        return {
            panels: panels,
            modules: modules,
            fullHeight: document.documentElement.clientHeight
        };
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    mounted() {
        let that = this;
        //监听页面大小
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight
                that.fullHeight = window.fullHeight;
            })()
        }
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        scrollHeight() {
            return {
                height: (parseInt(this.fullHeight) - 65) + 'px'
            }
        },
        pageInfo() {
            return this.$store.state.finish.pageInfo;
        },
        index() {
            return this.$store.state.finish.index;
        },
        attribute() {
            return this.$store.getters.attribute;
        },
        is_attribute() {
            if (this.$store.state.finish.pages.length > 0) {
                return true;
            } else {
                return false;
            }
        },
        is_lock() {
            return this.$store.state.finish.is_lock;
        }
    },
    methods: {
        /**
         * 处理名称
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        getPageTitle(value) {
            if (value && Number(value.length) == 13) {
                return "默认微页面" + this.pageInfo.id
            } else {
                return value || '默认微页面';
            }
        },
        /**
         * [handlePageName description]
         * @return {[type]} [description]
         */
        handlePageName() {

            this.$store.commit('finish/setIndex', -1);
        },
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handlePageSave() {
            const loading = this.$loading({
                lock: true,
                text: '保存中……',
                spinner: 'el-icon-loading'
            });
            if (this.pageInfo.title == "默认微页") {
                return;
            }
            this.pageInfo.content = JSON.stringify(this.$store.state.finish.pages);
            this.$heshop.pages("put", this.pageInfo).then(data => {
                loading.close();
                this.$message({
                    title: '成功',
                    message: '保存成功',
                    type: 'success'
                });
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        /**
         * 设置为首页
         * @return {[type]} [description]
         */
        handlePageSetting() {
            let id = this.$route.query.id;
            this.$heshop.pages("put", { id: id, behavior: 'setting' }, this.page).then(data => {
                this.$message({
                    title: '设置成功',
                    message: '成功设置该微页面为首页',
                    type: 'success'
                });
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        /**
         * 拖拽拿起事件
         * sort 排序  drag 拖拽
         * @param  {[type]} $event [description]
         * @return {[type]}        [description]
         */
        dragStart($event) {
            this.$store.commit('finish/setComs', $event);

        },
        /**
         * 拖拽放下事件
         * @param  {[type]} $event [description]
         * @return {[type]}        [description]
         */
        dragEnd($event) {
            this.$store.commit('finish/setComs', "");
            $event.preventDefault();
        }
    }
}
</script>
<style lang="less" scoped>
@import './console.less';
</style>