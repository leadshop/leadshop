<template>
    <view class="he-up-load-image flex flex-wrap">
        <view class="he-list-item " v-for="(item, index) in lists" :key="index">
            <view @tap.stop="deleteItem(index)"
                  class="he-delete-icon iconfont iconevaluate_uploadpictures_deleto"></view>
            <image @tap.stop="doPreviewImage(item.url || item.path, index)" class="he-preview-image" :mode="imageMode" :src="item.url || item.path"></image>
        </view>
        <button @tap="selectFile" v-if="maxCount > lists.length" class="cu-btn he-list-item flex flex-direction justify-center align-center">
            <view class="iconfont iconevaluate_uploadpictures"></view>
            <view class="he-add-text">添加图片</view>
        </button>
        <he-toast v-model="loading">
            <view class="he-loading flex flex-direction align-center">
                <image :src="ipAddress + '/upload-loading.gif'" class="he-loading__image"></image>
                <text>图片上传中...</text>
            </view>
        </he-toast>
    </view>
</template>

<script>
import heToast from "@/components/he-toast.vue";

export default {
    name: "he-upload-image",
    components: {
        heToast
    },
    props: {
        // 是否开启图片多选，部分安卓机型不支持
        multiple: {
            type: Boolean,
            default: true
        },
        // 预览上传的图片时的裁剪模式，和image组件mode属性一致
        imageMode: {
            type: String,
            default: 'aspectFill'
        },
        // 最大上传数量
        maxCount: {
            type: [String, Number],
            default: 9
        },
        // album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
        sourceType: {
            type: Array,
            default() {
                return ['album', 'camera'];
            }
        },
        // 是否自动上传
        autoUpload: {
            type: Boolean,
            default: true
        },
        // 允许上传的图片后缀
        limitType:{
            type: Array,
            default() {
                // 支付宝小程序真机选择图片的后缀为"image"
                return ['png', 'jpg', 'jpeg', 'webp', 'gif', 'image'];
            }
        },
        // 上传前的钩子，每个文件上传前都会执行
        beforeUpload: {
            type: Function,
            default: null
        },
        // 是否在点击预览图后展示全屏图片预览
        previewFullImage: {
            type: Boolean,
            default: true
        },
        // 所选的图片的尺寸, 可选值为original compressed
        sizeType: {
            type: Array,
            default() {
                return ['original', 'compressed'];
            }
        },
        // 上传的文件字段名
        name: {
            type: String,
            default: 'file'
        },
        // 额外携带的参数
        formData: {
            type: Object,
            default() {
                return {};
            }
        },
        // 头部信息
        header: {
            type: Object,
            default() {
                return {};
            }
        },
        // 在各个回调事件中的最后一个参数返回，用于区别是哪一个组件的事件
        index: {
            type: [Number, String],
            default: ''
        }
    },
    data() {
        return {
            lists: [],
            uploading: false,
            loading: false
        }
    },
    methods: {
        selectFile: function () {
            const { name = '', maxCount, multiple, maxSize, sizeType, lists, camera, compressed, maxDuration, sourceType } = this;
            let chooseFile = null;
            const newMaxCount = maxCount - lists.length;
            chooseFile = new Promise((resolve, reject) => {
                uni.chooseImage({
                    count: multiple ? (newMaxCount > 9 ? 9 : newMaxCount) : 1,
                    sourceType: sourceType,
                    sizeType,
                    success: resolve,
                    fail: reject
                });
            });
            chooseFile.then(res => {
                let file = null;
                let listOldLength = this.lists.length;
                res.tempFiles.map((val, index) => {
                    // 检查文件后缀是否允许，如果不在this.limitType内，就会返回false
                    if(!this.checkFileExt(val)) return ;
                    // 如果是非多选，index大于等于1或者超出最大限制数量时，不处理
                    if (!multiple && index >= 1) return;
                    if (val.size > maxSize) {
                        this.$h.toast("超出允许的文件大小");
                    } else {
                        if (maxCount <= lists.length) {
                            this.$h.toast("超出最大允许的文件个数");
                            return;
                        }
                        lists.push({
                            url: val.path,
                            progress: 0,
                            error: false,
                            file: val
                        });
                    }
                });
                // 每次图片选择完，抛出一个事件，并将当前内部选择的图片数组抛出去
                this.$emit('on-choose-complete', this.lists, this.index);

                if (this.autoUpload) {
                    this.loading = true;
                    this.uploadFile(listOldLength);
                }
            }).catch(err => {

            });
        },
        async uploadFile(index = 0) {
            let _this = this;
            if (this.uploading) return;
            // 全部上传完成
            if (index >= this.lists.length) {
                this.loading = false;
                this.$emit('on-uploaded', this.lists, this.index);
                return;
            }
            this.lists[index].error = false;
            this.uploading = true;
            this.$h.srcToBase64(this.lists[index].url).then(function(res) {
                _this.$heshop.upload(res).then(function(data) {
                    _this.uploading = false;
                    _this.lists[index].response = data;
                    _this.$emit('on-success', data, index, _this.lists, _this.index);
                    _this.uploadFile(index + 1);
                }).catch(function(err) {
                    _this.uploadError(index, err);
                    _this.$toError();
                });
            });
        },
        // 上传失败
        uploadError(index, err) {
            this.lists[index].progress = 0;
            this.lists[index].error = true;
            this.lists[index].response = null;
            // this.$emit('on-error', err, index, this.lists, this.index);
        },
        // 判断文件后缀是否允许
        checkFileExt(file) {
            // 检查是否在允许的后缀中
            let noArrowExt = false;
            // 获取后缀名
            let fileExt = '';
            const reg = /.+\./;
            // 如果是H5，需要从name中判断
            // #ifdef H5
            fileExt = file.name.replace(reg, "").toLowerCase();
            // #endif
            // 非H5，需要从path中读取后缀
            // #ifndef H5
            fileExt = file.path.replace(reg, "").toLowerCase();
            // #endif
            // 使用数组的some方法，只要符合limitType中的一个，就返回true
            noArrowExt = this.limitType.some(ext => {
                // 转为小写
                return ext.toLowerCase() === fileExt;
            })
            if(!noArrowExt) this.$h.toast(`不允许选择${fileExt}格式的文件`);
            return noArrowExt;
        },
        deleteItem: function (index) {
            this.lists.splice(index, 1);
            this.$emit('on-remove', index, this.lists, this.index);
            this.$h.toast('移除成功');
        },
        // 预览图片
        doPreviewImage: function(url, index) {
            if (!this.previewFullImage) return;
            const images = this.lists.map(item => item.url || item.path);
            this.$utils.doPreviewImage(url, images);
        },
    }
}
</script>

<style scoped>
.he-up-load-image {

}
.he-list-item {
    width: 150px;
    height: 150px;
    margin: 0 20px 20px 0;
    background: rgb(244, 245, 246);
    position: relative;
    border-radius: 8px;
}
.he-add-text {
    font-size: 22px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    margin-top: 5px;
}
.iconevaluate_uploadpictures {
    color: RGBA(102, 102, 102, 1);
    width: 48px;
    height: 48px;
    font-size: 48px;
    margin-bottom: 5px;
}
.he-delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 60px;
    height: 60px;
    padding: 16px;
    transform: translate(50%, -50%);
    font-size: 28px;
    color: rgba(245, 33, 45, 1);
}
.he-preview-image {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    display: block;
}
.he-loading {
    width: 100%;
    height: 100%;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
}
.he-loading__image {
    width: 96px;
    height: 96px;
    margin-top:52px;
    margin-bottom: 40px;
}
</style>
