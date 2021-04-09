export default function srcToBase64 (src) {
    return new Promise(function (resolve, reject) {
        // #ifdef H5
        let image = new Image();
        image.src = src;//图片路径
        image.onload = function(){
            let base64 = getBase64Image(image);
            resolve(base64);
        }
        function getBase64Image(img) {
            let canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            let ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, img.width, img.height);
            let ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
            let dataURL = canvas.toDataURL("image/"+ext);
            return dataURL;
        }
        // #endif
        // #ifndef H5
        uni.getImageInfo({
            src: src,
            success: function(res) {
                let image = "data:image/" + res.type + ";base64,";
                uni.getFileSystemManager().readFile({
                    filePath: src, // 图片地址 本地or网络
                    encoding: "base64",
                    success: res => {
                        let content = image + res.data;
                        resolve(content);
                    },
                    fail: error => {
                        console.error("上传报错", error);
                    }
                })
            }
        });
        // #endif
    });
}
