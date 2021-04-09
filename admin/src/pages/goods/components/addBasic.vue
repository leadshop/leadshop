<template>
    <div>
        <el-form-item class="le-basic__name">
            <span class="le-label__require" slot="label">商品名称</span>
            <el-input type="textarea" placeholder="请输入商品名称" v-model="value.name" rows="3" maxlength="40"
                      show-word-limit>
            </el-input>
        </el-form-item>
        <el-form-item class="he-class">
            <span class="le-label__require" slot="label">商品分类</span>
            <template v-for="(item, index) in catObject.result">
                <el-tag type="info" class="le-cat__footer-tag" size="medium" closable @close="deleteTag(item, index)"
                        :key="index" v-if="!item.children">
                    {{ item.value }}
                </el-tag>
            </template>
            <el-button type="primary" plain class="he-class__button" action="getGroup"
                       v-popup.chooseCategory="catObject" title="选择分类" width="801" module="goods">选择分类
            </el-button>
            <he-link href="goods/groupPublish" target="_blank">
                <el-button type="text" class="he-class__button-new">
                    新建分类
                </el-button>
            </he-link>
            <span style="color: #623ceb;">|</span>
            <el-button type="text" @click="getGroupList" class="he-class__button-new">
                刷新
            </el-button>
        </el-form-item>
        <el-form-item>
            <span class="le-label__require" slot="label">商品轮播图</span>
            <vuedraggable v-model="value.slideshow">
                <div class="le-label__require-item" :class="{'le-label__require-image':index===0}"
                     v-for="(item,index) in value.slideshow" :key="index">
                    <div class="select-cover__120">
                        <pictureDialog v-model="value.slideshow[index]" :limit="1">
                            <div slot="upload" class="select-cover__120-add">
                                <i class="le-icon le-icon-add select-cover__120-icon"></i>
                                <span class="select-cover__120-text">添加图片</span>
                            </div>
                            <div slot="preview" slot-scope="scope" class="select-cover__120-edit">
                                <el-image :src="scope.url" fit="cover"></el-image>
                                <div class="select-cover__120-tips">
                                    <span>替换</span> | <span
                                    @click.stop="()=>{value.slideshow.splice(index, 1)}">删除</span>
                                </div>
                            </div>
                        </pictureDialog>
                    </div>
                </div>
            </vuedraggable>
            <div class="le-label__require-item" v-if="value.slideshow.length<9">
                <div class="select-cover__120">
                    <pictureDialog @confirm="arrayConcat" :limit="9-value.slideshow.length">
                        <div slot="upload" class="select-cover__120-add">
                            <i class="le-icon le-icon-add select-cover__120-icon"></i>
                            <span class="select-cover__120-text">添加图片</span>
                        </div>
                        <div slot="preview" slot-scope="scope" class="select-cover__120-add">
                            <i class="le-icon le-icon-add select-cover__120-icon"></i>
                            <span class="select-cover__120-text">添加图片</span>
                        </div>
                    </pictureDialog>
                </div>
            </div>
            <p class="he-tips" style="padding-left: 0; clear: both;">建议尺寸：800*800,可拖拽改变图片顺序，首张图为主图，最多上传9张</p>
        </el-form-item>
        <el-form-item label="是否添加视频">
            <el-switch v-model="value.is_video" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item v-if="value.is_video">
            <span class="le-label__require" slot="label">主视频</span>
            <div class="select-cover__120">
                <videoDialog v-model="value.video">
                    <div slot="upload" class="select-cover__120-add">
                        <i class="le-icon le-icon-add select-cover__120-icon"></i>
                        <span class="select-cover__120-text">添加视频</span>
                    </div>
                    <div slot="preview" slot-scope="scope" class="select-cover__120-edit">
                        <el-image :src="scope.url.cover" fit="cover"></el-image>
                        <div class="select-cover__120-tips">
                            替换视频
                        </div>
                    </div>
                </videoDialog>
            </div>
            <p class="he-tips" style="padding-left: 0">建议时长：10~30秒，宽高比 16:9</p>
        </el-form-item>
        <el-form-item v-if="value.is_video">
            <span class="le-label__require" slot="label">视频封面</span>
            <div class="select-cover__120">
                <pictureDialog v-model="value.video_cover" :limit="1">
                    <div slot="upload" class="select-cover__120-add">
                        <i class="le-icon le-icon-add select-cover__120-icon"></i>
                        <span class="select-cover__120-text">添加图片</span>
                    </div>
                    <div slot="preview" slot-scope="scope" class="select-cover__120-edit">
                        <el-image :src="scope.url" fit="cover"></el-image>
                        <div class="select-cover__120-tips">
                            <span>替换</span> | <span @click.stop="(e)=>value.video_cover=''">删除</span>
                        </div>
                    </div>
                </pictureDialog>
            </div>
        </el-form-item>
    </div>
</template>
<script>
import heUploadVideo from "@/components/videoSelect/select.vue";
import vuedraggable from "vuedraggable";

export default {
    name: 'addBasic',
    components: {
        heUploadVideo,
        vuedraggable
    },
    props: {
        value: {
            type: Object
        }
    },
    data() {
        return {
            catObject: {
                cat: [],
                result: []
            },
            catTree: []
        }
    },
    mounted() {
        this.getGroupList().then(res => {
            this.catTree = res;
        });
    },
    methods: {
        /**
         * [arrayConcat description]
         * @return {[type]} [description]
         */
        arrayConcat(value) {
            for (var i in value) {
                if (Object.prototype.toString.call(value[i]) === "[object String]") {
                    this.value.slideshow.push(value[i]);
                }
            }
        },
        deleteTag: function (item, index) {
            this.catObject.result.splice(index, 1);
            let path = item.path.split('-').map(Number);
            let level = path.length;
            if (level === 3) {
                let p_deleted = false; //父级是否被删除,保证每次只删除一个
                let p2_deleted = false; //父父级是否被删除,保证每次只删除一个
                this.catObject.result.forEach((v, k) => {
                    if (v.id === path[1]) {
                        if (!p2_deleted) {
                            p2_deleted = true;
                            this.catObject.result.splice(k, 1);
                        }
                        this.catObject.result.forEach((v2, k2) => {
                            if (v2.id === path[2]) {
                                if (!p_deleted) {
                                    p_deleted = true;
                                    this.catObject.result.splice(k2, 1);
                                }
                            }
                        })
                    }
                })
            } else if (level === 2) {
                let p_deleted = false;
                this.catObject.result.forEach((v, k) => {
                    if (v.id === path[1]) {
                        if (!p_deleted) {
                            p_deleted = true;
                            this.catObject.result.splice(k, 1);
                        }
                    }
                })
            }
            this.value.group = this.catObject.result.map(v => {
                return v.id;
            });
        },
        getGroup: function (e) {
            this.value.group = e.result.map(v => {
                return v.id;
            });
        },
        async getGroupList() {
            const res = await this.$heshop.group('get', {include: 'goods'});
            this.catObject.cat = res;
            let data = JSON.parse(JSON.stringify(res));
            let catList = this.$heshop.toTree({
                parentKey: 'parent_id',
                idKey: 'id',
                parentId: 0,
                childrenKey: 'children'
            }).on(data).get();
            catList.forEach(cat1 => {
                cat1.value = cat1.name;
                if (cat1.children) {
                    cat1.children.forEach(cat2 => {
                        cat2.value = `${cat1.value} > ${cat2.name}`;
                        if (cat2.children) {
                            cat2.children.forEach(cat3 => {
                                cat3.value = `${cat2.value} > ${cat3.name}`;
                            });
                        }
                    });
                }
            });
            return catList;
        }
    },
    watch: {
        "value.slideshow": {
            handler(newVal, oldVal) {
                if (typeof this.$refs.form != 'undefined' && newVal != oldVal) {
                    setTimeout(() => {
                        this.$refs.form.validateField('slideshow');
                    }, 10)
                }
            },
            immediate: true

        },
        "value.video": {
            handler(newVal, oldVal) {
                if (typeof this.$refs.form != 'undefined' && newVal != oldVal) {
                    this.$refs.form.validateField('video');
                }
            },
            immediate: true

        },
        "value.video_cover": {
            handler(newVal, oldVal) {
                if (typeof this.$refs.form != 'undefined' && newVal != oldVal) {
                    this.$refs.form.validateField('video_cover');
                }
            },
            immediate: true

        },
        "value.group": {
            handler(newVal) {
                let data = [];
                newVal.forEach(id => {
                    this.catTree.forEach(item => {
                        if (item.id == id) {
                            data.push(item);
                        }
                        if (item.children) {
                            item.children.forEach(item2 => {
                                if (item2.id == id) {
                                    data.push(item2);
                                }
                                if (item2.children) {
                                    item2.children.forEach(item3 => {
                                        if (item3.id == id) {
                                            data.push(item3);
                                        }
                                    })
                                }
                            });
                        }
                    })
                })
                this.catObject.result = data;
            },
            immediate: true
        }
    }
}
</script>
<style lang="less">
.le-basic__name .el-textarea .el-textarea__inner {
    resize: none;
}

.el-form-item__content .le-cat__footer-tag {
    margin-right: 8px;
    background-color: #ffffff;
    border: 1px solid #BEBEBE;
}

.le-label__require:before {
    content: "*";
    color: red;
}

.he-class__button.el-button--primary {
    background-color: #ffffff;
}

.le-label__require-item {
    border-radius: 4px;
    position: relative;
    margin-right: 8px;
    margin-bottom: 8px;
    overflow: hidden;
    float: left;
}

.le-label__require-image {
    box-sizing: border-box;
    border: 1px solid #FBAD15;
}

.le-label__require-image:before {
    content: "主图";
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
    z-index: 10;
}

.el-button--text.he-class__button-new.el-button--mini {
    font-size: 14px;
    font-weight: 500;
    color: #623ceb;
    line-height: 22px;
    padding: 0 14px;
    margin: 0;
}

.he-upload {
    width: 120px;
    height: 120px;
}
</style>