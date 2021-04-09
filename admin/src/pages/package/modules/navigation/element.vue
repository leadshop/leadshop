<template>
    <div class="navigation" :style="{
                        'background-color': facade.background_color
                }">
        <div class="navigation-text" :class="{'one':facade.nav_style==1,'two':facade.nav_style==2}" v-if="content.style==2">
            <div class="navigation-text-item" v-for="item,index in navigation" :key="index" :style="{width:width}">
                <span class="navigation-text-item__title" :style="{
                        color: facade.text_color
                }">
                    {{item.title}}
                </span>
            </div>
        </div>
        <div class="navigation-image" :class="{'one':facade.nav_style==1,'two':facade.nav_style==2}" v-if="content.style==1">
            <div class="navigation-image-item" v-for="item,index in navigation" :key="index" :style="{width:width}">
                <div class="navigation-image-item__cover" :style="{
                                          'background-image': 'url('+getCover(item.url)+')'
                                    }">
                </div>
                <div class="navigation-image-item__title" :style="{
                        color: facade.text_color
                }">
                    {{item.title}}
                </div>
            </div>
        </div>
        <div class="navigation-indicator" v-if="facade.nav_style==2">
            <pointer :margin="-10" :color="facade.active_color" :type="facade.indicator_style" align="center"></pointer>
        </div>
    </div>
</template>
<script type="text/javascript">
import pointer from '@/components/pointer.vue'
export default {
    components: {
        pointer
    },
    props: {
        facade: {
            type: [Object, Array]
        },
        content: {
            type: [Object, Array]
        }
    },
    data() {
        return {
            navigation: [{
                id: 1,
                title: "商品名称",
                url: "",
                link: {},
            }]
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        width() {
            if (this.facade.nav_style == 1) {
                if (this.content.style == 1) {
                    if (this.navigation.length > 5) {
                        return "24%";
                    } else {
                        return (100 / this.navigation.length) + "%";
                    }
                }
                if (this.content.style == 2) {
                    if (this.navigation.length > 4) {
                        return "30%";
                    } else {
                        return (100 / this.navigation.length) + "%";
                    }
                }

            } else {
                return (100 / this.facade.nav_line_mun) + "%";
            }
        }
    },
    /**
     * 页面渲染前
     * @return {[type]} [description]
     */
    created() {

    },
    /**
     * 数据监听
     * @type {Object}
     */
    watch: {
        content: {
            deep: true,
            handler: function(newV, oldV) {
                this.handleCheck();
            }
        },
        facade: {
            deep: true,
            handler: function(newV, oldV) {
                this.handleCheck();
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        this.handleCheck();
    },
    methods: {
        handleCheck() {
            if (this.content.data.length > 0) {
                this.navigation = this.content.data;
            }
            if (this.facade.nav_style == 2) {
                let data = this.content.data;
                let l = (this.facade.nav_line * this.facade.nav_line_mun);
                this.navigation = data.slice(0, l);
            }
        },
        getCover(cover = "") {
            let url = "https://img.yzcdn.cn/upload_files/2018/01/22/FnlHRufXMtUI_AbAEP0tux_nDL1T.png!large.webp";
            if (cover) {
                return cover;
            }
            return url;
        },
        //开始拖拽事件
        onStart() {
            this.drag = true;
        },
        //拖拽结束事件
        onEnd() {
            this.drag = false;
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>