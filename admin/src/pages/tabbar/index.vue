<template>
    <div class="tabbar">
        <div class="tabbar-phone">
            <div class="tabbar-phone-header">
                <div class="tabbar-phone-title">
                    微页面
                </div>
            </div>
            <div class="tabbar-phone-body">
                <div class="tabbar-phone-tabbar">
                    <div class="tabbar-phone-opacity"></div>
                    <iframe frameborder=0 scrolling=no class="tabbar-phone-iframe" :src="origin" alt="" width="375px" height="700px"></iframe>
                    <Tabbar :tabbarDes="tabbarDes.data" :type="tabbarDes.tabbarStyle" :color="tabbarDes.inactive_color" :background="tabbarDes.background_color"></Tabbar>
                </div>
            </div>
        </div>
        <div class="tabbar-attribute">
            <Attribute v-model="tabbarDes"></Attribute>
        </div>
        <div class="tabbar-footer">
            <el-button type="primary" @click="handleTabbarSave">保存</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
import Attribute from './attribute'
import Tabbar from './tabbar'
import fileDownload from 'js-file-download'
export default {
    components: {
        Attribute,
        Tabbar
    },
    data() {
        return {
            tabbarDes: {
                tabbarStyle: 1,
                background_color: "#FFFFFF",
                inactive_color: "#666666",
                active_color: "#f5212d",
                data: []
            },
            fullHeight: document.documentElement.clientHeight,
            origin: $_W.AppURL + '/h5/'
        };
    },
    computed: {
        scrollHeight() {
            return {
                height: (parseInt(this.fullHeight) - 65) + 'px'
            }
        }
    },
    mounted() {
        let that = this;
        //监听页面大小
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight
                that.fullHeight = window.fullHeight;
            })()
        }
        this.handleLoadTabbar();
    },
    methods: {
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handleTabbarSave() {
            for (let index in this.tabbarDes.data) {
                let item = this.tabbarDes.data[index];
                if (item.text == "") {
                    this.$message({
                        message: '名称不能为空',
                        type: 'warning'
                    });
                    return;
                }
                if (this.tabbarDes.tabbarStyle == 2) {
                    if (item.iconPath == "") {
                        this.$message({
                            message: '图标不能为空',
                            type: 'warning'
                        });
                        return;
                    }
                    if (item.selectedIconPath == "") {
                        this.$message({
                            message: '名称不能为空',
                            type: 'warning'
                        });
                        return;
                    }
                }

            }
            const loading = this.$loading({
                lock: true,
                text: '保存中……',
                spinner: 'el-icon-loading'
            });
            this.$heshop.fitment("POST", {
                "keyword": "tabbar",
                "content": JSON.stringify(this.tabbarDes)
            }).then(data => {
                loading.close();
                this.$alert('保存成功！如需生效请下载小程序包并上传审核', '', {
                    confirmButtonText: '下载',
                    callback: (action) => {
                        if (action === 'confirm') {
                            const downloading = this.$loading({
                                lock: true,
                                text: '下载中……',
                                spinner: 'el-icon-loading'
                            });
                            this.$heshop.download().then(res => {
                                //如何监听下载完成？
                                setTimeout(() => {
                                    downloading.close();
                                }, 1000)
                                fileDownload(res, 'wxapp.zip')
                            }).catch(err => {
                                console.error(err);
                            });
                        }

                    }
                });
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
        /**
         * 执行页面保存操作
         * @return {[type]} [description]
         */
        handleLoadTabbar() {
            this.$heshop.search("POST", { include: "fitment" }, { keyword: "tabbar" }).then(data => {
                if (data && data.content) {
                    this.tabbarDes = JSON.parse(data.content);
                }
            }).catch(error => {
                console.error("错误信息", error);
            })
        },
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
</style>