<template>
    <el-tabs v-model="active" :class="{'active-tow':active=='second'}">
        <el-tab-pane label="内容设置" name="first">
            <p class="tips">
                至少添加2个导航，最多添加5个导航
                <span @click="handleDefault" style="color: #623CEB;font-size: 12px;float: right;cursor: pointer;">恢复默认图标</span>
            </p>
            <el-form ref="form" :model="content" label-width="110px" size="mini" label-position="left">
                <div class="select-photo" v-for="(item,index) in content.data" :key="index">
                    <i class="le-icon le-icon-cha2 select-photo__close" v-if="index !== 0 && content.data.length>2" @click="handleDelete(index)"></i>
                    <el-form-item label="图标" label-width="50px" v-if="content.tabbarStyle==2">
                        <div class="select-photo__item">
                            <div class="select-photo__upload">
                                <pictureDialog v-model="item.iconPath">
                                    <div slot="upload" class="select-cover__60-add">
                                        <i class="le-icon le-icon-add select-cover__60-icon"></i>
                                    </div>
                                    <div slot="preview" slot-scope="scope" class="select-cover__60-edit">
                                        <el-image :src="scope.url" fit="cover"></el-image>
                                        <div class="select-cover__60-tips">
                                            替换
                                        </div>
                                    </div>
                                </pictureDialog>
                            </div>
                            <span>未选中</span>
                        </div>
                        <div class="select-photo__item">
                            <div class="select-photo__upload">
                                <pictureDialog v-model="item.selectedIconPath">
                                    <div slot="upload" class="select-cover__60-add">
                                        <i class="le-icon le-icon-add select-cover__60-icon"></i>
                                    </div>
                                    <div slot="preview" slot-scope="scope" class="select-cover__60-edit">
                                        <el-image :src="scope.url" fit="cover"></el-image>
                                        <div class="select-cover__60-tips">
                                            替换
                                        </div>
                                    </div>
                                </pictureDialog>
                            </div>
                            <span>选中</span>
                        </div>
                    </el-form-item>
                    <el-form-item label="名称" label-width="50px">
                        <el-input type="text" placeholder="输入名称" :data-index="index" v-model="item.text" maxlength="4" show-word-limit @blur="handleInputBlur">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="链接" label-width="50px">
                        <template v-if="index === 0">
                            店铺首页
                        </template>
                        <hyperlinkSelect v-else :index="index" v-model="item.link" :forbidden="[2,3,7,6]">请选择跳转链接</hyperlinkSelect>
                    </el-form-item>
                </div>
                <div class="button-adddata">
                    <el-button @click="handleAdditem" :disabled="content.data.length==5">新增导航</el-button>
                </div>
            </el-form>
            <div class="attribute-footer-empty"></div>
        </el-tab-pane>
        <el-tab-pane label="样式设置" name="second">
            <el-form ref="form" :model="content" label-width="110px" size="mini" label-position="left">
                <div class="control-item-title">选择风格</div>
                <el-radio-group v-model="content.tabbarStyle">
                    <el-radio :label="1">
                        文字
                    </el-radio>
                    <el-radio :label="2">
                        图文
                    </el-radio>
                </el-radio-group>
                <el-divider></el-divider>
                <div class="control-item-title">颜色设置</div>
                <el-form-item label="背景颜色">
                    <colour v-model="content.background_color" colour="#FFFFFF"></colour>
                </el-form-item>
                <el-form-item label="未选中文字颜色">
                    <colour v-model="content.inactive_color" colour="#666666"></colour>
                </el-form-item>
                <el-form-item label="选中文字颜色">
                    <colour v-model="content.active_color" colour="#f5212d"></colour>
                </el-form-item>
            </el-form>
            <div class="attribute-footer-empty"></div>
        </el-tab-pane>
    </el-tabs>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import colour from '@/components/colour.vue'
import pictureSelect from '@/components/pictureSelect/select.vue'
import hyperlinkSelect from '@/components/hyperlinkSelect/select.vue'
import fileDownload from 'js-file-download'

export default {
    components: {
        control,
        colour,
        pictureSelect,
        hyperlinkSelect
    },
    props: {
        value: {
            type: [Object, Array]
        }

    },
    data() {
        return {
            active: "first",
            errorTips: "",
            tabbar: {
                "tabbarStyle": 2,
                "background_color": "#FFFFFF",
                "inactive_color": "#1A1818",
                "active_color": "#f5212d",
                "data": [{
                        "text": "首页",
                        "page": "setup",
                        "iconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_home_normal.png",
                        "selectedIconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_home_selected.png",
                        "link": {
                            "name": "店铺首页",
                            "path": "/pages/index/index",
                            "param": {},
                            "index": 0,
                            "extend": false
                        }
                    },
                    {
                        "iconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_classification_normal.png",
                        "selectedIconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_classification_selected.png",
                        "text": "分类",
                        "link": {
                            "name": "全部商品",
                            "path": "/pages/goods/list",
                            "param": {},
                            "index": 1,
                            "extend": false
                        }
                    },
                    {
                        "iconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_shopping-cart_normal.png",
                        "selectedIconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_shopping-cart_selected.png",
                        "text": "购物车",
                        "link": {
                            "name": "购物车",
                            "path": "/pages/cart/index",
                            "param": {},
                            "index": 4,
                            "extend": false
                        }
                    },
                    {
                        "iconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_personal-center_normal.png",
                        "selectedIconPath": "http://qmxq.oss-cn-hangzhou.aliyuncs.com/tabbar/nav_personal-center_selected.png",
                        "text": "我",
                        "link": {
                            "name": "个人中心",
                            "path": "/pages/user/index",
                            "param": {},
                            "index": 5,
                            "extend": false
                        }
                    }
                ]
            }
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        content: {
            get() {
                if (this.value.data.length) {
                    return this.value;
                } else {
                    return JSON.parse(JSON.stringify(this.tabbar));
                }

            },
            set(value) {
                this.$emit('input', value);
            }
        },
    },
    methods: {
        handleInputBlur(event) {
            this.errorTips = "";
            let data = this.content.data;
            if (event.target.dataset.index == event.target.value) {
                return;
            }
            let _index = event.target.dataset.index;
            for (let index in data) {
                let item = data[index];
                if (item.text == event.target.value) {
                    if (_index === index) {
                        return;
                    } else {
                        this.$message({
                            message: '名称不能重复',
                            type: 'warning'
                        });
                        this.errorTips = '名称不能重复';
                        return;
                    }

                }
            }
        },
        /**
         * 添加元素
         * @return {[type]} [description]
         */
        handleAdditem() {
            if (this.content.data.length < 5) {
                this.content.data.push({
                    "pagePath": "",
                    "iconPath": "",
                    "selectedIconPath": "",
                    "text": "标题",
                    "link": {}
                });
            } else {
                this.$message({
                    message: '最多添加5个导航',
                    type: 'warning'
                });
            }
        },
        /**
         * 删除元素
         * @return {[type]} [description]
         */
        handleDelete(index) {
            if (this.content.data.length > 2) {
                this.content.data.splice(index, 1);
            } else {
                this.$message({
                    message: '至少保留两个2导航',
                    type: 'warning'
                });
            }
        },
        /**
         * 用于重置图标
         * @return {[type]} [description]
         */
        handleDefault() {
            this.$confirm('是否要恢复默认图标？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                this.content = JSON.parse(JSON.stringify(this.tabbar));
                this.$message({
                    message: '恢复成功',
                    type: 'success'
                });
            }).catch(() => {

            });


        }
    }
};
</script>
<style lang="less" scoped>
@import './style.less';
@import '../package/modules/attribute.less';
</style>