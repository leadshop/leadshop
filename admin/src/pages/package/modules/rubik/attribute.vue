<template>
    <control title="图片魔方" :is_tab="false">
        <el-form ref="form" :model="facade" @submit.native.prevent label-width="90px" size="small" label-position="left">
            <div class="control-item-title">选择样式{{content.style}}</div>
            <choose :data="imgData" group="list_style" width="48px" height="32px" v-model="content.style" padding="2px 10px"></choose>
            <div style="height: 24px;"></div>
            <el-form-item label="魔方密度" v-if="content.style==7">
                <el-select v-model="content.density" placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-divider></el-divider>
            <div class="control-item-h3">
                布局
                <div class="tips">
                    选定布局区域，在下方添加图片，建议添加比例一致的图片
                </div>
                <div class="control-item-zoom" v-if="content.style==7">
                    <matrix v-model="content.data" @active="e=>activeIndex=e" :cubeSize="content.density"></matrix>
                </div>
                <advertising v-model="content.data" @active="e=>activeIndex=e" :size="content.style" v-else></advertising>
            </div>
            <el-divider v-if="activeIndex>-1"></el-divider>
            <div class="attribute-select__photo" v-if="activeIndex>-1">
                <div class="attribute-select__photo_cover">
                    <pictureDialog v-model="linkInfo.url">
                        <div slot="upload" class="select-cover__80-add">
                            <i class="le-icon le-icon-add select-cover__80-icon"></i>
                            <span class="select-cover__80-text">添加图片</span>
                        </div>
                        <div slot="preview" slot-scope="scope" class="select-cover__80-edit">
                            <el-image :src="scope.url" fit="cover"></el-image>
                            <div class="select-cover__80-tips">
                                替换图片
                            </div>
                        </div>
                    </pictureDialog>
                </div>
                <div class="attribute-select__photo_link">
                    <el-form-item label="链接" label-width="40px">
                        <hyperlinkSelect v-model="linkInfo.link">请选择跳转链接</hyperlinkSelect>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </control>
</template>
<script type="text/javascript">
import control from '@/components/control.vue'
import choose from '@/components/choose.vue'
import matrix from '@/components/matrix.vue'
import advertising from '@/components/advertising.vue'

import photoSelect from '@/components/photoSelect/select.vue'
import hyperlinkSelect from '@/components/hyperlinkSelect/select.vue'
export default {
    components: {
        control,
        choose,
        matrix,
        advertising,
        photoSelect,
        hyperlinkSelect
    },
    data() {
        return {
            url: "",
            link: {},
            activeIndex: 0,
            options: [{
                value: 4,
                label: '4X4'
            }, {
                value: 5,
                label: '5X5'
            }, {
                value: 6,
                label: '6X6'
            }, {
                value: 7,
                label: '7X7'
            }],
            imgData: [{
                value: 1,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/1-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/1-b.png",
                number: 1
            }, {
                value: 2,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/2-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/2-b.png",
                number: 2
            }, {
                value: 3,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/3-1-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/3-1-b.png",
                number: 3
            }, {
                value: 4,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/3-2-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/3-2-b.png",
                number: 3
            }, {
                value: 5,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/4-1-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/4-1-b.png",
                number: 4
            }, {
                value: 6,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/4-2-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/4-2-b.png",
                number: 4
            }, {
                value: 7,
                src: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/5-a.png",
                active: "http://qmxq.oss-cn-hangzhou.aliyuncs.com/package/5-b.png",
                number: 0
            }]
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        linkInfo: {
            get() {
                let index = this.activeIndex;
                if (this.content.data.length > 0) {
                    return this.content.data[index];
                } else {
                    return {
                        url: "",
                        link: {}
                    }
                }
            },
            set() {

            }
        },
        content: {
            get() {
                return this.$store.getters.content;
            },
            set(value) {
                let data = {
                    key: "content",
                    value: value
                }
                data = JSON.parse(JSON.stringify(data));
                this.$store.commit('finish/setAttribute', data)
            }
        },
        facade: {
            get() {
                return this.$store.getters.facade;
            },
            set(value) {
                let data = {
                    key: "facade",
                    value: value
                }
                this.$store.commit('finish/setAttribute', data)
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
        "content.style"(value) {
            this.activeIndex = 0;
            let number = this.imgData[value - 1].number || 1;
            if (value == 7) {
                if(this.content.data.length){
                    let _data = this.content.data[0];
                    if(_data.columnEnd && _data.rowEnd){
                        return 
                    }else{
                        this.content.data = [];
                    }
                }else{
                    this.content.data = [];
                }
            } else {
                this.initialize(number);
            }
        }
    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {
        let index = this.content.style;
        let number = this.imgData[index - 1].number || 1;
        if (this.content.data.length === 0) {
            this.initialize(number);
        }
    },
    methods: {
        /**
         * 初始化处理此
         * @return {[type]} [description]
         */
        initialize(number = 1) {
            this.content.data = this.handleArray(number);
        },
        /**
         * 预留个数
         * @return {[type]} [description]
         */
        handleArray(num) {
            let data = JSON.parse(JSON.stringify(this.content.data));
            let array = [];
            for (let i = 0; i < parseInt(num); i++) {
                if (data[i]) {
                    array.push(data[i]);
                } else {
                    array.push({
                        title: "",
                        url: "",
                        link: ""
                    });
                }
            }
            return array;
        }
    }
};
</script>
<style lang="less" scoped>
@import '../attribute.less';
</style>