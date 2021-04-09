<template>
    <div class="picture-selet">
        <div class="flex flex-wrap" ref="picture" v-if="isBig">
            <vuedraggable v-if="max>1" v-model="url" class="flex flex-wrap">
                <div class="he-upload-box" :style="[selectStyle]" v-for="(item, index) in url" :key="item" :class="{'he-upload__border' : index === 0 && isLord}">
                    <div class="he-upload__lord" v-if="index === 0 && isLord">主图</div>
                    <img class="he-upload__image" :src="item" alt="">
                    <div class="he-upload__tips flex justify-center">
                        <popup @confirm="(e) => setReplace(e, index)"><span>替换</span></popup>
                        <div class="he-upload__line">|</div>
                        <div @click="setDel(index)">删除</div>
                    </div>
                </div>
            </vuedraggable>
            <div v-if="max <=1 && url" class="he-upload-box" :style="[selectStyle]" :class="{'he-upload__border' : url && isLord}">
                <div class="he-upload__lord" v-if="url && isLord">主图</div>
                <img class="he-upload__image" :src="url" alt="">
                <div class="he-upload__tips flex justify-center">
                    <popup @confirm="(e) => setReplace(e, -1)"><span>替换</span></popup>
                    <div class="he-upload__line">|</div>
                    <div @click="setDel(-1)">删除</div>
                </div>
            </div>
            <div class="he-upload__select" :style="[selectStyle]" v-if="!url || url.length < max">
                <popup @confirm="handleConfirm" :limit="max" :input-type="inputType">
                    <div class="he-upload__content" :style="[selectStyle]">
                        <he-icon class="he-icon__add" type="le-icon-add" size="18px" color="RGBA(217, 217, 217, 1)"> </he-icon>
                        <div class="he-upload__text">添加图片</div>
                    </div>
                </popup>
            </div>
        </div>
        <div class=" he-upload-size" ref="picture" v-if="!isBig && this.max <= 1" :class="{'he-border' : !url}">
            <popup @confirm="handleConfirm" :input-type="inputType">
                <i class="le-icon le-icon-cha2" v-if="url" @click.stop="setDel(-1)"></i>
                <div class="picture-content" v-if="url">
                    <div class="picture-selet-image">
                        <div class="picture-selet-cover" :style="{
                                          'background-image': 'url('+url+')'
                                    }"></div>
                    </div>
                </div>
                <template v-else>
                    <he-icon class="le-icon " size="14px" color="RGBA(217, 217, 217, 1)" type="le-icon-add"> </he-icon>
                    <p type="text" class="he-upload__text">添加{{title}}</p>
                </template>
            </popup>
        </div>
    </div>
</template>
<script type="text/javascript">
import popup from "./index.vue";
import vuedraggable from "vuedraggable";

export default {
    components: {
        popup,
        vuedraggable
    },
    props: {
        value: {
            type: [String, Number, Boolean, Object, Array],
            default: ''
        },
        title: {
            type: [String, Number, Boolean],
            default: '图片'
        },
        max: {
            type: Number
        },
        isLord: {
            type: [Boolean]
        },
        width: {
            type: String,
            default: '120px'
        },
        height: {
            type: String,
            default: '120px'
        },
        inputType: {
            type: String,
            default: 'radio'
        },
        isBig: {
            type: Boolean,
            default: true
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
        url: {
            get() {
                if (this.max === 1) {
                    if (this.value !== null && typeof this.value == 'object') {
                        return this.value[0];
                    } else {
                        return this.value ? this.value : '';
                    }
                } else {
                    return this.value;
                }
            },
            set(value) {
                this.$emit("input", value);
            }
        },
        selectStyle: function() {
            return {
                width: this.width,
                height: this.height
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
            if (this.max == 1) {
                this.url = value[0];
                this.$emit('change', this.url);
                return
            }
            if (this.url) {
                this.url = this.url.concat(value);
            } else {
                this.url = value;
            }
            this.$emit('change', this.url);


        },
        setDel: function(index) {
            if (this.max === 1) {
                this.url = '';
            } else {
                this.$delete(this.url, index);
            }
        },
        setReplace: function(e, index) {
            if (this.max === 1) {
                this.url = e;
            } else {
                this.$set(this.url, index, e);
            }

        }
    }
};
</script>
<style lang="less" scoped>
@import "./style.less";

.he-upload-box {
    border-radius: 4px;
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
    overflow: hidden;

    .he-upload__image {
        width: 100%;
        height: 100%;
    }

    .he-upload__tips {
        position: absolute;
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
    }

    .he-upload__line {
        margin: 0 5px;
    }
}

.he-upload-box:hover .he-upload__tips {
    opacity: 1;
}

.he-upload__select {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.02);
    border: 1px dashed #DCDFE6;
    border-radius: 4px;

    .he-upload__content {
        text-align: center;
    }

    .he-upload__text {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 44px;
        opacity: 0.85;
    }

    .he-icon__add {
        margin-top: 32px;
    }
}

.flex {
    display: flex;
}

.flex-wrap {
    flex-wrap: wrap;
}

.justify-center {
    justify-content: center;
}

.he-upload__lord {
    position: absolute;
    font-size: 14px;
    text-align: center;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    width: 100px;
    height: 25px;
    line-height: 25px;
    transform: rotate(-45deg);
    transform-origin: 38% 220%;
    background: #FBAD15;
}

.he-upload__border {
    border: 1px solid #FBAD15;
}

.he-border {
    border: 1px dashed #DCDFE6;
}

.he-upload-size {
    width: 80px;
    height: 80px;
    background: rgba(0, 0, 0, 0.02);
    text-align: center;
    cursor: pointer;
    position: relative;
    border-radius: 4px;
    margin-right: 8px;
    margin-bottom: 8px;

    .he-upload__text {
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #333333;
        opacity: 0.85;
        margin: 0;
        line-height: 1;
    }

    .picture-content {
        position: absolute;
        width: calc(100% + 2px);
        height: calc(100% + 2px);
        left: -1px;
        top: -1px;
        border-radius: 4px;
        overflow: hidden;
        display: block;
    }

    .le-icon {
        margin-top: 15px;
    }

    .picture-selet-cover {
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }

    .picture-selet-image {
        height: 80px;
    }

    .le-icon-cha2 {
        position: absolute;
        top: 0;
        right: 0;
        margin: 0;
        font-size: 16px;
        z-index: 100;
        transform: translate(50%, -50%);
    }
}
</style>
