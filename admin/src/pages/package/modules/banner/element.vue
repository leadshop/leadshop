<template>
    <div class="banner">
        <div class="banner-item-photo" :class="{'corner':facade.chamfer_style==2}">
            <div class="banner-item-image">
                <div class="banner-item-cover">
                    <el-image style="width: 100%; height: 100%" :src="getCover(content)" fit="cover">
                        <div slot="error" class="image-slot">
                            <i class="image-icon le-icon le-icon-morentupian"></i>
                        </div>
                    </el-image>
                </div>
            </div>
        </div>
        <pointer :margin="margin" :color="facade.indicator_color" :type="facade.indicator_style" :align="facade.indicator_align"></pointer>
    </div>
</template>
<script type="text/javascript">
import pointer from '@/components/pointer.vue'
import Picture from '@/components/image.vue'

export default {
    components: {
        pointer,
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
        margin() {
            if (this.facade.chamfer_style == 1) {
                return 0;
            } else {
                return 10;
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

    },
    /**
     * 页面加载执行
     * @return {[type]} [description]
     */
    async mounted() {

    },
    methods: {
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