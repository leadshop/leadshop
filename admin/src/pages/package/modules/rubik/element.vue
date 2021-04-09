<template>
    <div class="rubik">
        <div class="advertising" v-if="size<7">
            <div class="advertising-item-1" v-if="size==1">
                <el-image style="width: 100%; height: 100%;" :src="adverArray[0].url" fit="cover" v-if="adverArray[0].url">
                    <div slot="error" class="image-slot">
                        <i class="le-icon le-icon-morentupian"></i>
                    </div>
                </el-image>
                <el-image style="width: 750px; height: 750px;" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else>
                </el-image>
            </div>
            <div class="advertising-item-2" v-if="size==2">
                <div class="advertising-item-image" v-if="adverArray[0]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[0].url" fit="cover" v-if="adverArray[0].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 375px; height: 375px;" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" v-if="adverArray[1]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[1].url" fit="cover" v-if="adverArray[1].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 375px; height: 375px;" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
            </div>
            <div class="advertising-item-3" v-if="size==3">
                <div class="advertising-item-image" v-if="adverArray[0]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[0].url" fit="cover" v-if="adverArray[0].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 250px; height: 250px;" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                </label>
                <div class="advertising-item-image" v-if="adverArray[1]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[1].url" fit="cover" v-if="adverArray[1].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 250px; height: 250px;" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                </label>
                <div class="advertising-item-image" v-if="adverArray[2]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[2].url" fit="cover" v-if="adverArray[2].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 250px; height: 250px;" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
            </div>
            <div class="advertising-item-4" v-if="size==4">
                <div class="advertising-item-image" :style="{
                'width': '375px',
                'height': '375px',
                'top':0,
                'left':0
            }" v-if="adverArray[0]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[0].url" fit="cover" v-if="adverArray[0].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 100%" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" :style="{
                'width': '375px',
                'height': '188px',
                'top':0,
                'left':'375px',
            }" v-if="adverArray[1]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[1].url" fit="cover" v-if="adverArray[1].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 100%" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" :style="{
                'width': '375px',
                'height': '188px',
                'top':'188px',
                'left':'375px',
            }" v-if="adverArray[2]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[2].url" fit="cover" v-if="adverArray[2].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 100%" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
            </div>
            <div class="advertising-item-5" v-if="size==5">
                <div class="advertising-item-image" v-if="adverArray[0]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[0].url" fit="cover" v-if="adverArray[0].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" v-if="adverArray[1]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[1].url" fit="cover" v-if="adverArray[1].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" v-if="adverArray[2]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[2].url" fit="cover" v-if="adverArray[2].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                </label>
                <div class="advertising-item-image" v-if="adverArray[3]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[3].url" fit="cover" v-if="adverArray[3].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
            </div>
            <div class="advertising-item-4" v-if="size==6">
                <div class="advertising-item-image" :style="{
                'width': '375px',
                'height': '188px',
                'top':0,
                'left':0
            }"  v-if="adverArray[0]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[0].url" fit="cover" v-if="adverArray[0].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" :style="{
             'width': '375px',
                'height': '188px',
                'top':'188px',
                'left':0
            }" v-if="adverArray[1]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[1].url" fit="cover" v-if="adverArray[1].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" :style="{
                'width': '375px',
                'height': '188px',
                'top':0,
                'left':'375px',
            }" v-if="adverArray[2]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[2].url" fit="cover" v-if="adverArray[2].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
                <div class="advertising-item-image" :style="{
                'width': '375px',
                'height': '188px',
                'top':'188px',
                'left':'375px',
            }" v-if="adverArray[3]">
                    <el-image style="width: 100%; height: 100%" :src="adverArray[3].url" fit="cover" v-if="adverArray[3].url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 188px" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
            </div>
        </div>
        <div v-if="size==7" class="rubik-cube">
            <template v-for="(item,index) in adverArray">
                <div class="rubik-cube__item" :key="index" :style="{
                width:getWidth(item)+'px',
                height:getHeight(item)+'px',
                top:getTop(item)+'px',
                left:getLeft(item)+'px',
            }">
                    <el-image style="width: 100%; height: 100%" :src="item.url" fit="cover" v-if="item.url">
                        <div slot="error" class="image-slot">
                            <i class="le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                    <el-image style="width: 100%; height: 100%" src="http://qmxq.oss-cn-hangzhou.aliyuncs.com/img_bg.png" fit="cover" v-else></el-image>
                </div>
            </template>
        </div>
        <!--     {{cubeArray}} -->
    </div>
</template>
<script type="text/javascript">
import Picture from '@/components/image.vue'

export default {
    components: {
        Picture
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

        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        adverArray() {
            return this.content.data;
        },
        size() {
            return this.content.style;
        },
        windowWidth() {
            return 750;
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

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {

    },
    methods: {
        getHeight(item) {
            const width = this.windowWidth / this.content.density;
            return (item.rowEnd - item.rowStart + 1) * width;
        },
        getWidth(item) {
            const width = this.windowWidth / this.content.density;
            return (item.columnEnd - item.columnStart + 1) * width;
        },
        getLeft(item) {
            const width = this.windowWidth / this.content.density;
            return (item.columnStart - 1) * width;
        },
        getTop(item) {
            const width = this.windowWidth / this.content.density;
            return (item.rowStart - 1) * width;
        },
        getCover(cover = "") {
            let url = "";
            if (cover) {
                if (Object.prototype.toString.call(cover) == '[object Array]' && cover[0]) {
                    return cover[0].url;
                }
            }
            return url;
        }
    }
};
</script>
<style lang="less" scoped>
@import './element.less';
</style>