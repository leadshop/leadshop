<template>
    <div class="le-matter">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="he-link">
                <he-link href="goods/group">
                    商品分类
                </he-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加分类</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="le-line"></div>
        <el-form :model="ruleForm" label-width="176px" :rules="rules">
            <div class="le-card-top">
                <el-form-item label="分类名称" prop="name">
                    <el-input v-model="ruleForm.name" maxlength="8" show-word-limit></el-input>
                </el-form-item>
                <el-form-item label="上级分类" prop="isParent">
                    <div>
                        <el-radio :disabled="ruleForm.id?true:false" v-model="isParent" :label="0">无上级分类</el-radio>
                        <p class="he-tips">选择无上级分类，则表明此分类为一级分类</p>
                    </div>
                    <div v-if="!isParent">
                        <span style="margin-right: 20px;">子分类层级数</span>
                        <el-radio :disabled="ruleForm.goods_check" v-model="ruleForm.type" :label="1">一级</el-radio>
                        <el-radio :disabled="ruleForm.goods_check" v-model="ruleForm.type" :label="2">二级</el-radio>
                        <el-radio :disabled="ruleForm.goods_check" v-model="ruleForm.type" :label="3">三级</el-radio>
                    </div>
                    <div>
                        <el-radio :disabled="ruleForm.id?true:false" v-model="isParent" :label="1">有上级分类</el-radio>
                        <el-tag size="medium" @close="deleteTag()" :closable="!ruleForm.id" type="info"
                                v-if="catObject.result"> {{ catObject.result.value }}
                        </el-tag>
                        <el-button v-if="!catObject.result" :disabled="(isParent === 0 || ruleForm.id)?true:false"
                                   title="选择分类"
                                   class="le-select" v-popup.chooseGroup="catObject" width="560" module="goods">选择分类
                        </el-button>
                        <p class="he-tips">选择有上级分类，则表明此分类为选中分类的子分类</p>
                        <el-button type="text" class="le-book" :hide_cancel="true" sure_btn="我知道了"
                                   title="Leadshop微商城分类规则" module="goods" v-popup.groupManual width="700">《必读手册》
                        </el-button>
                    </div>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="ruleForm.sort"></el-input>
                    <p class="he-tips">字数越大，越靠前，不填写则默认为1</p>
                </el-form-item>
                <el-form-item label="分类图标" prop="icon">
                    <div class="select-cover__120">
                        <pictureDialog v-model="ruleForm.icon" :limit="1">
                            <div slot="upload" class="select-cover__120-add">
                                <i class="le-icon le-icon-add select-cover__120-icon"></i>
                                <span class="select-cover__120-text">添加图片</span>
                            </div>
                            <div slot="preview" slot-scope="scope" class="select-cover__120-edit">
                                <el-image :src="scope.url" fit="cover"></el-image>
                                <div class="select-cover__120-tips">
                                    <span>替换</span> | <span @click.stop="(e)=>ruleForm.icon=''">删除</span>
                                </div>
                            </div>
                        </pictureDialog>
                    </div>
                    <p class="he-tips">建议尺寸：300*300像素</p>
                </el-form-item>
            </div>
            <div class="le-line"></div>
            <div class="le-card flex le-style">
                <div class="le-left flex">
                    <div class="le-label">
                        分类商品样式
                    </div>
                    <div class="le-value">
                        <div class="le-select flex justify-center align-center" @click="setStyle(0)"
                             :class="ruleForm.goods_show == 0 ? 'le-select__active' : ''">
                            <he-icon class="heicon" type="le-icon-up-down" size="16px"></he-icon>
                            <span>一行一个</span>
                        </div>
                        <div class="le-select flex justify-center align-center" @click="setStyle(1)"
                             :class="ruleForm.goods_show == 1 ? 'le-select__active' : ''">
                            <he-icon class="heicon" type="le-icon-orso" size="16px"></he-icon>
                            <span>一行两个</span>
                        </div>
                        <div class="le-select flex justify-center align-center" @click="setStyle(2)"
                             :class="ruleForm.goods_show == 2 ? 'le-select__active' : ''">
                            <he-icon class="heicon" type="le-icon-combination" size="16px"></he-icon>
                            <span>一大两小</span>
                        </div>
                        <div class="le-select flex justify-center align-center" @click="setStyle(3)"
                             :class="ruleForm.goods_show == 3 ? 'le-select__active' : ''">
                            <he-icon class="heicon" type="le-icon-columns" size="16px"></he-icon>
                            <span>左图右字</span>
                        </div>
                    </div>
                </div>
                <div>
                    <img class="he-preview" :src="groupStyle[ruleForm.goods_show]" alt="">
                </div>
            </div>
        </el-form>
        <div class="le-cardpin">
            <el-button @click="save" type="primary">保存</el-button>
        </div>
    </div>
</template>
<script type="text/javascript">
const styleA = require("./image/group-style-A.png");
const styleB = require("./image/group-style-B.png");
const styleC = require("./image/group-style-C.png");
const styleD = require("./image/group-style-D.png");
export default {
    name: 'groupPublish',
    data() {
        return {
            ruleForm: {
                sort: 1,
                parent_id: 0,
                name: '',
                icon: "",
                image: '',
                goods_show: 0,
                id: null,
                type: 1
            },
            isParent: 0,
            parentList: [],
            rules: {
                name: [
                    {required: true, message: '请输入分类名称', trigger: 'blur'}
                ],
                icon: [
                    {required: true, message: '请选择分类图标', trigger: 'change'}
                ],
                isParent: [
                    {required: true, message: '请选择上级分类', trigger: 'change'}
                ],
                goods_show: [
                    {required: true, trigger: 'change'}
                ]
            },
            groupStyle: [
                styleA,
                styleB,
                styleC,
                styleD,
            ],
            catObject: {
                cat: [],
                result: null
            }
        };
    },
    watch: {
        'catObject.result': {
            handler(newVal) {
                if (newVal) {
                    this.ruleForm.parent_id = newVal.id;
                } else {
                    this.ruleForm.parent_id = 0;
                }
            }
        }
    },
    async mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (id)
            this.getDetail(parseInt(id));
        this.getData();
    },
    methods: {
        save() {
            let url = {include: 'goods'}
            let method = undefined;
            if (this.ruleForm.id) {
                url.id = parseInt(this.ruleForm.id);
                method = 'put';
            } else {
                method = 'post';
            }
            let data = this.$heshop.utils.deepClone(this.ruleForm);
            data.icon = data.icon;
            this.$heshop.group(method, url, data).then(() => {
                this.$message.success('保存成功');
                this.$router.back();
            }).catch((err) => {
                if (err.data[0]) {
                    this.$message.error(err.data[0].message);
                } else {
                    this.$message.error(err.data.message);
                }
            });
        },
        deleteTag() {
            this.catObject.result = null;
        },
        getDetail(id) {
            this.$heshop.group('get', id, {include: 'goods'}).then(res => {
                res.icon = res.icon;
                if (res.parent_id > 0) {
                    this.isParent = 1;
                    this.getData();
                }
                this.ruleForm = res;
            }).catch(err => {
                this.$message.error(err.data.message);
            });
        },
        getData() {
            this.$heshop.group('get', {include: 'goods'}).then(res => {
                let data = this.$heshop.toTree({
                    parentKey: 'parent_id',
                    idKey: 'id',
                    parentId: 0,
                    childrenKey: 'children'
                }).on(res).get();
                data.forEach(cat1 => {
                    cat1.value = cat1.name;
                    this.parentList.push(cat1);
                    if (cat1.children) {
                        cat1.children.forEach(cat2 => {
                            cat2.type = cat1.type;
                            cat2.value = `${cat1.value} > ${cat2.name}`;
                            this.parentList.push(cat2);
                            if (cat2.children) {
                                cat2.children.forEach(cat3 => {
                                    this.parentList.push(cat3);
                                    cat3.value = `${cat2.value} > ${cat3.name}`;
                                });
                            }
                        });
                    }
                });
                this.parentList.forEach(item => {
                    if (item.id === this.ruleForm.parent_id) {
                        this.catObject.result = item;
                    }
                })
            }).catch(() => {
                this.$message.error(err.data.message);
            });
        },

        setStyle: function (index) {
            this.ruleForm.goods_show = index;
        }
    }
};
</script>
<style lang="less" scoped="true">
.he-link {
    font-weight: bold;
    transition: color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    color: #303133;
    text-decoration: none;
    cursor: pointer;
}

.he-tips {
    font-size: 12px;
    font-weight: 500;
    color: #000000;
    opacity: 0.45;
    margin: 0;
}

.he-link {
    font-size: 12px;
    font-weight: 500;
    color: #623ceb;
    margin-left: 8px;
    opacity: 1;
}

.he-button {
    border: 1px solid #DCDFE6;
    color: #DCDFE6;
    margin: 0 0 16px 8px;

    .heicon {
        margin-right: 5px;
    }
}

.primary-but {
    border: 1px solid #623CEB;
    color: #623CEB;
    background-color: #fff;
}


.he-preview {
    width: 330px;
    height: 765px;
    background: #FFFFFF;
    border-radius: 40px;
    margin-left: 24px;
}

.he-upload {
    width: 120px;
    height: 120px;
    border-radius: 4px;
}

.le-card {
    height: 845px;
    background: #FFFFFF;
    border-radius: 16px;
}

.le-style {
    padding-top: 40px;

    .le-left {
        padding-left: 65px;
        width: 310px;
        height: 100%;

        .le-label {
            font-size: 14px;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 0.85);
            line-height: 44px;
        }

        .le-label:before {
            content: "*";
            color: #F5212D;
        }

        .le-value {
            margin-left: 16px;
        }

        .le-select__active {
            border-color: #623ceb !important;

            span {
                color: #623ceb !important;
            }

            svg {
                color: #623ceb !important;
            }
        }

        .le-select {
            cursor: pointer;
            width: 108px;
            height: 40px;
            background: #FFFFFF;
            border-radius: 4px;
            margin-bottom: 16px;
            border-color: #DCDFE6;
            border-style: solid;
            border-width: 1px;

            span {
                color: #333333;
                font-size: 14px;
                font-family: PingFang SC;
                font-weight: 500;
                opacity: 0.65;
                margin-left: 6px;
            }

            svg {
                color: #BEBEBE;
                margin-right: 6px;
            }
        }
    }
}

.le-card-top {
    background: #FFFFFF;
    border-radius: 16px;
    padding: 40px 0;
}

.le-select:hover {
    opacity: 1;
    background: #FFFFFF;
    border: 1px solid #623CEB;
    color: #623CEB;
}

.le-select[disabled] {
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    color: #BFBFBF;
}

.le-select {
    width: 104px;
    height: 32px;
    background: #FFFFFF;
    border: 1px solid #623CEB;
    border-radius: 4px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #623CEB;
}

.le-book {
    padding-left: 0;
    padding-right: 0;
}
</style>