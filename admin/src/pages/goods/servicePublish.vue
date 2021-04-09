<template>
    <el-form ref="service" :rules="rules" :model="form" label-width="176px">
        <div class="le-header">
            <span class="le-before" @click="router('/goods/service')">商品服务</span>
            <i class="el-breadcrumb__separator el-icon-arrow-right"></i>
            <span class="le-now">{{ form.id ? '编辑商品服务' : '添加商品服务' }}</span>
        </div>
        <div class="le-body flex">
            <div class="le-form">
                <el-form-item label="服务名称" prop="title">
                    <el-input maxlength="10" show-word-limit v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="服务详情" prop="content" class="he-textarea">
                    <el-input type="textarea" v-model="form.content" rows="13" maxlength="160" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort"></el-input>
                    <p class="he-tips">数字越大，越靠前，不填写则默认为1</p>
                </el-form-item>
            </div>
            <div class="he-servicePreview">
                <div class="he-servicePreview__back"></div>
                <div class="he-servicePreview__black"></div>
                <div class="he-servicePreview__services el-row--flex is-justify-space-between is-align-middle"
                     :class="active ?'he-servicePreview__active' : ''" @click="setActive(false)">
                    <div class="el-row--flex is-justify-space-between is-align-middle">
                        <div class="el-row--flex  is-align-middle" v-for="(item) in list.slice(0 , 3)" :key="item.id">
                            <he-icon type="le-icon-shangpinfuwu" color="red" size="10px"></he-icon>
                            <div style="margin-right: 5px;">{{ item.title }}</div>
                        </div>
                    </div>
                    <div class="arrow el-icon-arrow-right"></div>
                </div>
                <div class="he-servicePreview__content" v-if="!active">
                    <div class="he-servicePreview__title">商品服务</div>
                    <div class="he-servicePreview__close el-icon-close" @click="setActive(true)"></div>
                    <div class="he-scrollbar">
                        <div class="he-item" v-for="item in list" :key="item.id">
                            <div class="he-item__header el-row--flex is-align-middle">
                                <div class="he-item__header-icon"></div>
                                <div class="he-item__header-title">{{ item.title }}</div>
                            </div>
                            <div class="he-item__body">
                                {{ item.content }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="le-cardpin">
            <el-button @click="put('service')" type="primary">保存</el-button>
        </div>
    </el-form>
</template>
<script>

export default {
    name: "servicePublish",
    data() {
        return {
            rules: {
                title: [
                    {required: true, message: '请输入服务名称', trigger: 'blur'}
                ]
            },
            form: {
                title: '',
                content: '',
                sort: 1,
                id: null
            },
            active: true,
            list: []
        }
    },
    mounted() {
        let id = this.$heshop.utils.getQueryVariable('id');
        if (id) {
            this.getDetail(id);
        }
    },
    methods: {
        router: function (path) {
            this.$router.push({
                path: path
            });
        },
        setActive(bool) {
            this.active = bool;
        },
        put(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let method = '';
                    let message = '';
                    if (this.form.id) {
                        method = 'put';
                        message = '编辑服务成功';
                    } else {
                        method = 'post';
                        message = '添加服务成功';
                    }
                    this.$heshop.service(method, this.form).then(() => {
                        this.$message({
                            message,
                            type: 'success'
                        });
                        this.$router.back();
                    }).catch(error => {
                        if (error.data[0]) {
                            this.$message.error(error.data[0].message);
                        } else {
                            this.$message.error(error.data.message);
                        }
                    });
                }
            });
        },
        getDetail: function (id) {
            this.$heshop.service('get', parseInt(id)).then(res => {
                this.form = res;
            }).catch(error => {
                this.$message.error(error.data.message);
            });
        },
        getList: function () {
            this.loading = true;
            this.$heshop.service('get').then(res => {
                let {data} = res;
                this.list = data;
                this.loading = false;
            }).catch(() => {
                this.loading = false;
                this.$message.error('获取失败');
            });
        }
    }
};
</script>
<style scoped lang="scss">
.le-header {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    margin-bottom: 24px;

    .le-before {
        color: rgba(0, 0, 0, 0.85);
    }

    .le-now {
        color: rgba(0, 0, 0, 0.45);
    }
}

.le-body {
    .le-form {
        min-width: 581px;
        height: 740px;
        background: #FFFFFF;
        border-radius: 16px;
        padding-top: 40px;
    }

    .le-preview {
        min-width: 410px;
        height: 740px;
        background: #FFFFFF;
        border: 1px solid #DCDFE6;
        border-radius: 40px;
        margin-left: 24px;
        position: relative;
    }
}

.el-textarea {
    width: 280px;
}

.he-textarea /deep/ .el-textarea .el-textarea__inner {
    resize: none;
}

.he-tips {
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #000000;
    opacity: 0.45;
    margin: 0;
}

.he-servicePreview {
    width: 415px;
    height: 704px;
    border: 1px solid #DCDFE6;
    border-radius: 40px;
    margin-left: 24px;
    background: #ffffff;
    padding: 36px 20px 30px 20px;
    position: relative;
}

.he-servicePreview__back {
    background-image: url("./image/service-preview.png");
    background-size: 100% 100%;
    width: 375px;
    height: 100%;
    border: 1px solid #DCDFE6;
}

.he-servicePreview__services {
    position: absolute;
    top: 426px;
    height: 40px;
    width: 355px;
    margin: 0 10px;
    cursor: pointer;
    padding: 0 12px;
    font-size: 11px;
    font-weight: 500;
    color: #999999;
    line-height: 18px;
    z-index: 0;
}

.he-servicePreview__active {
    background: #ffffff;
    z-index: 2
}

.arrow {
    font-size: 13px;
}

.he-servicePreview__black {
    opacity: 0.4;
    background-color: #000000;
    width: 375px;
    position: absolute;
    top: 36px;
    height: 636px;
    z-index: 1;
}

.he-servicePreview__content {
    width: 375px;
    height: 340px;
    background: #FFFFFF;
    border-radius: 8px 8px 0px 0px;
    position: absolute;
    bottom: 20px;
    z-index: 3;
    border: 1px solid #DCDFE6;
    padding: 0 16px 0 16px;
}

.he-scrollbar {
    margin-top: 20px;
    overflow: auto;
    height: 280px;
}

.he-scrollbar::-webkit-scrollbar {
    display: none;
}

.he-servicePreview__title {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
    text-align: center;
    margin-top: 15.05px;
}

.he-servicePreview__close {
    width: 10px;
    height: 10px;
    position: absolute;
    top: 18px;
    right: 16px;
    cursor: pointer;
}

.he-item {
    margin-bottom: 29px;
}

.he-item__header-icon {
    width: 3px;
    height: 3px;
    background: #E60B30;
    border-radius: 50%;
}

.he-item__header-title {
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    margin-left: 5px;
}

.he-item__body {
    font-size: 12px;
    font-weight: 500;
    color: #666666;
    line-height: 17px;
    padding-left: 9px;
    margin-top: 12px;
}
</style>
