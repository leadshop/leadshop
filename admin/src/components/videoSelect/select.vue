<template>
    <div :style="{'padding':padding}" class="video-select" ref="picture">
        <popup @confirm="handleConfirm">
            <he-icon class="le-icon" color="RGBA(217, 217, 217, 1)" size="18px" type="le-icon-add">
            </he-icon>
            <p type="text" v-if="padding !=='16px'">
                添加{{title}}
            </p>
            {{video}}
            <div class="picture-selet-content" v-if="video.url">
                <div :style="{
                    'padding-top':top
                }" class="picture-selet-image">
                    <div :style="{
                                          'background-image': 'url('+video.cover+')'
                                    }" class="picture-selet-cover">
                    </div>
                </div>
                <div class="picture-selet-tips flex justify-center">
                    <div>
                        替换
                    </div>
                    <div class="he-upload__line">
                        |
                    </div>
                    <div @click.stop="onDel">
                        删除
                    </div>
                </div>
            </div>
        </popup>
    </div>
</template>
<script type="text/javascript">
import popup from "./index.vue";

export default {
    components: {
        popup,
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        title: {
            type: [String, Number, Boolean],
            default: '视频'
        }
    },
    data() {
        return {
            padding: '28px',
            top: '100%'
        };
    },
    /**
     * 计算属性
     * @type {Object}
     */
    computed: {
        video: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value);
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
        let height = this.$refs.picture.offsetHeight;
        let width = this.$refs.picture.offsetWidth;
        let contrast = width;
        if (height > width) {
            contrast = height;
            this.top = ((width / height) * 100) + "%";
        } else {
            this.top = ((height / width) * 100) + "%";
        }
        if (contrast > 100) {
            this.padding = '28px';
        } else if (contrast > 60) {
            this.padding = '10px 0 0 0';
        } else {
            this.padding = '16px';
        }
    },
    methods: {
        handleConfirm(value) {
            this.video = value;
        },
        onDel(){
            this.video = {}
        }
    }
};
</script>
<style lang="less" scoped="">
@import "./style.less";

.picture-selet-tips {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 32px;
    line-height: 32px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    color: #FFFFFF;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    opacity: 0;

    .he-upload__line {
        margin: 0 5px;
    }
}
</style>
