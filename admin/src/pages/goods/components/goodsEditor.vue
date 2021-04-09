<template>
    <el-row v-loading="loading" class="le-top">
        <el-col :span="24" class="el-row--flex is-justify-center">
            <div id="div2">
                <div class="he-editor__preview-header">详情页预览图</div>
                <div v-html="editorHtml" class="he-editor__preview-body"></div>
            </div>
            <div id="div1"></div>
        </el-col>
    </el-row>
</template>
<script>
import E from "wangeditor";

export default {
    name: "goodsEditor",
    props: {
        value: {
            type: String
        }
    },
    data() {
        return {
            editor: null,
            editorHtml: '',
            loading: false
        }
    },
    methods: {
        createEdit: function () {
            let _this = this;
            this.editor = new E("#div1");
            this.editor.config.uploadImgMaxSize = 2 * 1024 * 1024;
            this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
            this.editor.config.uploadImgMaxLength = 10;
            this.editor.config.uploadImgTimeout = 5 * 1000;
            this.editor.config.uploadFileName = (new Date()).valueOf();
            this.editor.config.customUploadImg = function (resultFiles, insertImgFn) {
                let data = document.querySelectorAll('input')[0];
                data.value = '';
                let reader = new FileReader();
                reader.readAsDataURL(resultFiles[0]);
                reader.onload = function () {
                    _this.loading = true;
                    _this.$heshop.image('post', {
                        type: 1,
                        content: reader.result
                    }).then(function (res) {
                        insertImgFn(res);
                        _this.loading = false;
                    }).catch(function () {
                        _this.$message.error('图片上传失败');
                        _this.loading = false;
                    });
                }
            }
            this.editor.config.showFullScreen = false;
            this.editor.config.showLinkImg = false;
            this.editor.config.menus = [
                'bold',
                'head',
                'fontSize',
                'italic',
                'foreColor',
                'backColor',
                'fontName',
                'strikeThrough',
                'justify',
                'underline',
                'image',
                'undo',
                'redo',
            ]
            this.editor.config.onchange = function (newHtml) {
                _this.$emit('input', newHtml);
                _this.editorHtml = newHtml
            }
            this.editor.config.height = 508;
            this.editor.config.onchangeTimeout = 500;
            this.editor.create();
            this.editorHtml = this.value;
            this.editor.txt.html(this.value);
        },
    },
    mounted() {
        this.createEdit();
    },
    beforeDestroy() {
        // 销毁编辑器
        this.editor.destroy();
        this.editor = null;
    }
}
</script>
<style scoped lang="scss">
.le-top {
    padding-top: 24px;
}

.he-editor__preview-header {
    width: 416px;
    height: 48px;
    background: #F3F5F7;
    border: 1px solid #DCDFE6;
    border-radius: 4px 4px 0px 0px;
    font-size: 14px;
    font-family: Adobe Heiti Std;
    font-weight: normal;
    color: #000000;
    opacity: 0.65;
    line-height: 48px;
    text-align: center;
}

.he-editor__preview-body {
    padding: 0 10px;
    overflow-y: auto;
    height: 542px;
    word-break: break-all;
    border: 1px solid #DCDFE6;
    border-top: 0;
}

#div1 {
    width: 416px;
    height: 590px;
    margin-left: 12px;
}

#div2 {
    width: 416px;
    height: 590px;

    background: white;
    margin-right: 12px;
}

/* table 样式 */
table {
    border-top: 1px solid #ccc;
    border-left: 1px solid #ccc;
}

table td,
table th {
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    padding: 3px 5px;
}

table th {
    border-bottom: 2px solid #ccc;
    text-align: center;
}

/* blockquote 样式 */
blockquote {
    display: block;
    border-left: 8px solid #d0e5f2;
    padding: 5px 10px;
    margin: 10px 0;
    line-height: 1.4;
    font-size: 100%;
    background-color: #f1f1f1;
}

/* code 样式 */
code {
    display: inline-block;
    *display: inline;
    *zoom: 1;
    background-color: #f1f1f1;
    border-radius: 3px;
    padding: 3px 5px;
    margin: 0 3px;
}

pre code {
    display: block;
}

/* ul ol 样式 */
ul,
ol {
    margin: 10px 0 10px 20px;
}

/deep/ .w-e-toolbar {
    z-index: 10 !important;
}

/deep/ .w-e-text-container {
    z-index: 9 !important;
}
</style>