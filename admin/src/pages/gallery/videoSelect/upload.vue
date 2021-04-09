<script>
export default {
    inject: ['uploader'],
    props: {
        type: String,
        action: {
            type: Function,
            default: function() {}
        },
        name: {
            type: String,
            default: 'file'
        },
        multiple: Boolean,
        accept: String,
        onProgress: Function,
        onSuccess: Function,
        onError: Function,
        beforeUpload: Function,
        onPreview: {
            type: Function,
            default: function() {}
        },
        onRemove: {
            type: Function,
            default: function() {}
        },
        fileList: Array,
        autoUpload: Boolean,
        listType: String,
        disabled: Boolean,
        limit: Number,
        onExceed: Function
    },
    data() {
        return {
            mouseover: false,
            reqs: {}
        };
    },
    methods: {
        /**
         * 判断是否是图片
         * @param  {[type]}  str [description]
         * @return {Boolean}     [description]
         */
        isImage(str) {
            return str.indexOf('image') !== -1;
        },
        /**
         * 出发变动
         * @param  {[type]} ev [description]
         * @return {[type]}    [description]
         */
        handleChange(ev) {
            const files = ev.target.files;

            if (!files) return;
            this.uploadFiles(files);
        },
        /**
         * 获取上传文件列表
         * @param  {[type]} files [description]
         * @return {[type]}       [description]
         */
        uploadFiles(files) {
            let postFiles = Array.prototype.slice.call(files);
            if (!this.multiple) { postFiles = postFiles.slice(0, 1); }

            if (postFiles.length === 0) { return; }
            postFiles.forEach(rawFile => {
                if (this.autoUpload) this.upload(rawFile);
            });
        },
        /**
         * 执行上传
         * @param  {[type]} rawFile [description]
         * @return {[type]}         [description]
         */
        upload(rawFile) {
            if ((rawFile.size / 1024 / 1024) > 20) {
                this.$message({
                    message: '超过上传大小限制，最大20M',
                    type: 'warning'
                });
                return;
            }
            this.$refs.input.value = null;
            //判断是否存在前置钩子
            if (!this.beforeUpload) {
                return this.post(rawFile);
            }
            const before = this.beforeUpload(rawFile);
            //异步处理前置钩子，完成后再执行上传方法
            if (before && before.then) {
                before.then(processedFile => {
                    const fileType = Object.prototype.toString.call(processedFile);
                    //判断数据类型
                    if (fileType === '[object File]' || fileType === '[object Blob]') {
                        if (fileType === '[object Blob]') {
                            processedFile = new File([processedFile], rawFile.name, {
                                type: rawFile.type
                            });
                        }
                        for (const p in rawFile) {
                            if (rawFile.hasOwnProperty(p)) {
                                processedFile[p] = rawFile[p];
                            }
                        }
                        this.post(processedFile);
                    } else {
                        this.post(rawFile);
                    }
                }, () => {
                    this.onRemove(null, rawFile);
                });
            } else if (before !== false) {
                this.post(rawFile);
            } else {
                this.onRemove(null, rawFile);
            }
        },
        /**
         * 处理处理执行
         * @param  {[type]} file [description]
         * @return {[type]}      [description]
         */
        abort(file) {
            const { reqs } = this;
            if (file) {
                let uid = file;
                if (file.uid) uid = file.uid;
                if (reqs[uid]) {
                    reqs[uid].abort();
                }
            } else {
                Object.keys(reqs).forEach((uid) => {
                    if (reqs[uid]) reqs[uid].abort();
                    delete reqs[uid];
                });
            }
        },
        /**
         * 执行点击事件
         * @return {[type]} [description]
         */
        handleClick() {
            if (!this.disabled) {
                this.$refs.input.value = null;
                this.$refs.input.click();
            }
        },
        /**
         * 键盘点击
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         */
        handleKeydown(e) {
            if (e.target !== e.currentTarget) return;
            if (e.keyCode === 13 || e.keyCode === 32) {
                this.handleClick();
            }
        },
        /**
         * 数据提交接口
         * @param  {[type]} rawFile [description]
         * @return {[type]}         [description]
         */
        post(rawFile) {
            const { uid } = rawFile;
            const req = this.action(rawFile, this.uploader.groupID);
            this.reqs[uid] = req;
            if (req && req.then) {
                req.then(res => {
                    this.onSuccess(res, rawFile);
                    delete this.reqs[uid];
                }).catch(err => {

                    if (this.onError) {
                        this.onError(err, rawFile);
                    }
                    delete this.reqs[uid];
                })
            }
        }
    },
    /**
     * 编译DOM结构
     * @param  {[type]} h [description]
     * @return {[type]}   [description]
     */
    render(h) {
        let {
            handleClick,
            drag,
            name,
            handleChange,
            multiple,
            accept,
            listType,
            uploadFiles,
            disabled,
            handleKeydown
        } = this;
        //设置上传样式
        const data = {
            class: {
                'el-upload': true
            },
            on: {
                click: handleClick,
                keydown: handleKeydown
            }
        };
        //设置样式处理
        data.class[`el-upload--${listType}`] = true;
        return (
            <div {...data} tabindex="0" >
                {this.$slots.default}
                <input class="el-upload__input" type="file" ref="input" name={name} on-change={handleChange} multiple={multiple} accept={accept}></input>
            </div>
        );
    }
};
</script>