
function doPreviewImage(url, images) {
    uni.previewImage({
        urls: images,
        current: url,
        fail: function f(e) {
            console.error(e);
            uni.showToast({
                title: '预览图片失败',
                icon: 'none'
            });
        }
    });
}

export default {
    doPreviewImage
}
