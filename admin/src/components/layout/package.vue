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
                            <router-link :to="{path:'/finish/index'}"><i class="le-icon le-icon-arrow-left"></i>返回
                            </router-link>
                        </li>
                        <li>|</li>
                        <li>
                            <pagetitle v-model="pageInfo.title" ref="pagetitle ">
                                <span>{{ getPageTitle(pageInfo.title) }}<i class="le-icon le-icon-editor"></i></span>
                            </pagetitle>
                        </li>
                    </ul>
                </div>
                <div class="layout-event">
                    <templateSelect v-model="pageInfo" :open="handleTplOpen">
                        <el-button type="primary" style="margin: 0 10px">选择模板</el-button>
                    </templateSelect>
                    <el-popover ref="popover" placement="bottom" width="148" trigger="click">
                        <div class="layout-event-qrcode" style="text-align: center;">
                            <img :src="qrcode.wechat.image" width="100" height="100"/>
                            <p style="font-size: 12px">手机扫描二维码预览</p>
                        </div>
                    </el-popover>
                    <el-button type="text" v-popover:popover style="margin: 0 10px">预览</el-button>
                    <el-button type="text" @click="handlePageSetting" style="margin: 0 10px">设为首页</el-button>
                    <el-button type="text" @click="handlePageSave" style="margin: 0 10px">保存</el-button>
                    <el-button
                        module="goods"
                        style="margin: 0 10px"
                        title="推广"
                        :hide_footer="true"
                        type="text"
                        v-popup.promote="{
                            data: pageInfo,
                            promoteType: 'index'
                        }"
                        width="791">推广
                    </el-button>
                </div>
            </el-header>
            <el-main>
                <div class="layout-tool">
                    <el-scrollbar :style="scrollHeight">
                        <!-- 左侧功能栏-开始 -->
                        <el-collapse :value="['basics','advanced','sales','other']">
                            <el-collapse-item :name="index" v-for="(mounted,index) in panels" :key="index">
                                <template slot="title">
                                    <i class="le-icon le-icon-arrow"></i>
                                    <span>{{ mounted.title }}</span>
                                </template>
                                <ul class="fm-collapse-tool">
                                    <li class="widget" v-for="(item,index) in mounted.children" :key="index"
                                        :draggable="true" @dragstart="dragStart(item)" @dragend="dragEnd"
                                        data-type="module">
                                        <img class="widget-icon" :src="item.icon">
                                        <span>{{ item.title }}</span>
                                    </li>
                                    <div class="clears"></div>
                                </ul>
                            </el-collapse-item>
                        </el-collapse>
                        <!-- 左侧功能栏-结束 -->
                    </el-scrollbar>
                </div>
                <div class="layout-body">
                    <el-scrollbar ref="scrollbar" :style="scrollHeight">
                        <div class="layout-phone">
                            <div class="layout-phone-header" @click="handlePageName">
                                <div class="layout-phone-title">
                                    {{ pageInfo.name || '微页面' }}
                                </div>
                                <div class="layout-phone-header-active" v-if="index==-1"></div>
                            </div>
                            <div class="layout-phone-body">
                                <router-view/>
                            </div>
                        </div>
                    </el-scrollbar>
                    <div class="layout-totop" v-if='is_totop' @click="handleTotop">
                        <i class="le-icon le-icon-placed-top"></i>
                    </div>
                    <div class="layout-package" :class="{'active':index==-2}" @click="handlePackage">
                        <i class="le-icon le-icon-container"></i>
                        组件管理
                    </div>
                </div>
                <div class="layout-attribute" v-if="!is_lock">
                    <el-scrollbar :style="scrollHeight" v-if="index>=0">
                        <component :is="modules[attribute].attribute" v-if="modules[attribute]"></component>
                    </el-scrollbar>
                    <el-scrollbar :style="scrollHeight" v-if="index==-1">
                        <pageAttribute v-model="pageInfo.name"></pageAttribute>
                    </el-scrollbar>
                    <el-scrollbar :style="scrollHeight" v-if="index==-2">
                        <packageAttribute></packageAttribute>
                    </el-scrollbar>
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<script>
import panels from '../../lib/panels.js'
import modules from '@/pages/package/modules'
import popconfirm from '@/components/popconfirm.vue'
import promotion from '@/components/promotion'
import pagetitle from '@/components/pagetitle'
import templateSelect from '@/components/templateSelect'
import pageAttribute from '@/pages/package/modules/page/attribute'
import packageAttribute from '@/pages/package/modules/package/attribute'


export default {
    components: {
        popconfirm,
        promotion,
        pagetitle,
        pageAttribute,
        packageAttribute,
        templateSelect
    },
    data() {
        return {
            panels: panels,
            modules: modules,
            is_totop: false,
            fullHeight: document.documentElement.clientHeight,
            qrcode: {
                wechat: {}
            }
        };
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        let that = this;
        //监听页面大小
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight
                that.fullHeight = window.fullHeight;
            })();
        }

        this.scrollbar = this.$refs.scrollbar;

        this.scrollbar.$el.firstChild.addEventListener('scroll', (e) => {
            this.is_totop = e.target.scrollTop > 300;
        });

        this.$heshop.qrcode('post', {
            page: 'pages/index/index',
            id: id
        }).then(res => {
            this.qrcode = res;
        }).catch((err) => {
            console.error(err);
        });

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
            return this.$store.state.finish.pages.length > 0;
        },
        is_lock() {
            return this.$store.state.finish.is_lock;
        }
    },
    methods: {
        handleTplOpen(data) {
            return new Promise((resolve, reject) => {
                this.$confirm('选择新模板后，当前页面内容将被替换且不被保存， 请确认是否需要手动保存。', '提示', {
                    confirmButtonText: '继续选择模板',
                    cancelButtonText: '取消',
                    type: 'warning',
                    center: true
                }).then(() => {
                    resolve(true)
                }).catch(() => {
                    resolve(false)
                });
            })
        },
        /**
         * 处理返回顶部
         * @return {[type]} [description]
         */
        handleTotop() {
            this.scrollbar.$el.firstChild.scrollTop = 0;
        },
        /**
         * 处理名称
         * @param  {[type]} value [description]
         * @return {[type]}       [description]
         */
        getPageTitle(value) {
            if (value && Number(value.length) === 13) {
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
         * 设置组件排序
         * @return {[type]} [description]
         */
        handlePackage() {
            this.$store.commit('finish/setIndex', -2);
        },
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handlePageSave() {
            let id = document.getElementById('min-page');
            const loading = this.$loading({
                lock: true,
                text: '保存中……',
                spinner: 'el-icon-loading'
            });
            if (this.pageInfo.title === "默认微页") {
                return;
            }
            this.actionPageSave().then(() => {
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
         * 处理数据保存
         * @return {[type]} [description]
         */
        actionPageSave() {
            let _this = this;
            return new Promise(function (resolve, reject) {
                _this.pageInfo.content = JSON.stringify(_this.$store.state.finish.pages);
                _this.$heshop.pages("put", _this.pageInfo).then(function () {
                    resolve(true);
                }).catch(() => {
                    reject(false);
                });
            });
        },
        downloadFile(content, fileName) { //下载base64图片
            let base64ToBlob = function (code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;
                let uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {
                    type: contentType
                });
            };
            let aLink = document.createElement('a');
            let blob = base64ToBlob(content); //new Blob([content]);
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true); //initEvent 不加后两个参数在FF下会报错  事件类型，是否冒泡，是否阻止浏览器的默认行为
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
        },
        /**
         * 设置为首页
         * 确认设置该微页面为首页？
         * @return {[type]} [description]
         */
        handlePageSetting() {
            this.$confirm('确认设置该微页面为首页？', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: '取消',
                type: 'warning',
                center: true
            }).then(() => {
                let id = this.$route.query.id;
                this.$heshop.pages("put", {id: id, behavior: 'setting'}, this.page).then(data => {
                    this.$message({
                        title: '设置成功',
                        message: '成功设置该微页面为首页',
                        type: 'success'
                    });
                    this.actionPageSave();
                }).catch(error => {
                    console.error("错误信息", error);
                })
            }).catch(() => {

            });

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
.noselect {

    -webkit-touch-callout: none;
    /* iOS Safari */

    -webkit-user-select: none;
    /* Chrome/Safari/Opera */

    -khtml-user-select: none;
    /* Konqueror */

    -moz-user-select: none;
    /* Firefox */

    -ms-user-select: none;
    /* Internet Explorer/Edge */

    user-select: none;
    /* Non-prefixed version, currently*/


}

.layout {
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;


    .el-container {
        height: 100%;
        width: 100%;

    }

    .layout-attribute {
        width: 400px;
        background: #FFFFFF;
        height: 100%;
        overflow-x: hidden;

        /deep/ .el-scrollbar__wrap {
            overflow-x: hidden;
        }
    }


    .el-header {
        .noselect;
        position: relative;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;


        .layout-logo {
            position: absolute;
            left: 32px;
            top: 14px;

            img {
                width: 33px;
                height: 36px;
            }
        }


        .layout-back {
            position: absolute;
            left: 78px;
            top: 0;
            height: 63px;
            color: rgba(0, 0, 0, .85);
            font-weight: 400;
            cursor: pointer;

            ul {
                list-style-type: none;
                height: 63px;
                padding: 0;
                margin: 0;

                li {
                    float: left;
                    padding: 0 8px;
                    line-height: 63px;

                    span,
                    a {
                        color: rgba(0, 0, 0, .85);

                        i {
                            padding: 0 9px;
                        }

                        font-size: 14px;

                    }

                    .le-icon-editor {
                        color: rgba(187, 191, 200, 1);
                    }
                }
            }
        }

        .layout-event {
            position: absolute;
            right: 40px;
            height: 63px;
            line-height: 63px;

            .layout-event-qrcode {

                text-align: center;

                img {
                    margin: 10px;
                    width: 100px;
                    height: 100px;
                }

                p {
                    font-size: 12px;
                    font-weight: 400;
                    color: #000000;
                    opacity: 0.45;
                }
            }

            .el-button--text {
                font-weight: 400;
                color: rgba(0, 0, 0, .85);
            }

            .el-button + .el-button {
                margin-left: 32px;
            }


        }
    }

    .el-main {
        background: #f3f5f7;
        display: flex;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow-x: hidden;

        .layout-body {
            flex: 1;
            overflow-x: hidden;

            .layout-package {
                position: fixed;
                right: 424px;
                top: 142px;
                width: 94px;
                height: 32px;
                background: #FFFFFF;
                color: #595959;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);
                border-radius: 4px;
                text-align: center;
                line-height: 32px;
                cursor: pointer;
            }

            .layout-package.active {
                background: #623CEB;
                color: #FFFFFF;
            }

            .layout-totop {
                position: fixed;
                width: 48px;
                right: 424px;
                bottom: 24px;
                height: 48px;
                box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                text-align: center;
                background: #FFFFFF;

                i.le-icon {
                    font-size: 28px;
                    line-height: 48px;
                    color: #BBBFC8
                }
            }

            /deep/ .el-scrollbar__wrap {
                overflow-x: hidden;
            }

            .layout-phone {
                width: 375px;
                min-height: 765px;
                margin: 20px auto;
                background: RGBA(245, 245, 245, 1);
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.05);

                .layout-phone-header {
                    .noselect;
                    height: 64px;
                    width: 100%;
                    background: url('https://cdn2.weimob.com/saas/@assets/saas-fe-retail-web-stc/retail2/images/storeDesign/ad_moible_top.png') no-repeat;
                    background-size: cover;
                    position: relative;
                }

                .layout-phone-header-active {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    border: 2px solid #623CEB;
                    left: -2px;
                    top: -2px;
                    z-index: 2;
                }

                .layout-phone-title {
                    height: 40px;
                    width: 100%;
                    line-height: 40px;
                    position: absolute;
                    top: 22px;
                    left: 50%;
                    -webkit-transform: translate(-50%);
                    transform: translate(-50%);
                    text-align: center;
                    font-size: 15px;
                    font-weight: 600;
                    color: #35323b;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .layout-phone-body {
                    min-height: 700px;
                    position: relative;
                }
            }
        }

        .layout-tool {
            width: 320px;
            background: #FFFFFF;
            height: 100%;
            padding: 0;
            margin: 0;
            overflow-x: hidden;


            /deep/ .el-collapse {
                border-top: 0;
                border-bottom: 0;
                padding: 24px 20px 24px 28px;

                .el-collapse-item {
                    .el-collapse-item__header {
                        height: 30px;
                        line-height: 30px;
                        font-weight: bold;
                        color: rgba(0, 0, 0, 0.85);
                        line-height: 12px;
                        border-bottom: 0px solid #EBEEF5;

                        .le-icon {
                            width: 12px;
                            height: 12px;
                            line-height: 12px;
                            font-size: 10px;
                            color: rgba(187, 191, 200, 1);
                            transform: rotate(-90deg);
                            margin-right: 8px;
                        }

                        i.el-collapse-item__arrow {
                            display: none !important;
                            width: 0;
                            height: 0;
                        }

                        i.el-icon-arrow-right:before {
                            content: "";
                        }
                    }

                    .is-active {
                        .le-icon {
                            font-size: 10px;
                            color: rgba(187, 191, 200, 1);
                            transform: rotate(0deg);
                        }
                    }


                    .el-collapse-item__wrap {
                        padding: 4px;
                        border-bottom: 0px solid #EBEEF5;
                    }

                    .fm-collapse-tool {
                        list-style-type: none;
                        padding: 0;
                        margin: 0;

                        li {
                            position: relative;
                            float: left;
                            width: 87px;
                            height: 92px;
                            background: #FFFFFF;
                            margin-bottom: 8px;
                            z-index: 1px;
                            //border: 1px solid #EBEEF5;
                            text-align: center;
                            cursor: move;

                            .le-icon {
                                font-size: 32px;
                                color: rgba(98, 60, 235, 1);

                            }

                            .widget-icon {
                                width: 32px;
                                height: 32px;
                                margin-top: 15px;
                            }


                            span {
                                display: block;
                                width: 100%;
                                text-align: center;
                                color: rgba(0, 0, 0, .65);
                                font-size: 12px;
                            }

                            &:hover {
                                box-shadow: 0px 0px 10px 0px rgba(98, 60, 235, 0.1);
                                border-radius: 8px;
                                z-index: 10;
                            }
                        }
                    }
                }
            }
        }


    }

}
</style>