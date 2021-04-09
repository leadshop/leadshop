<template>
    <div class="le-qrcode">
        <img :src="value" alt="" id="qrcode">
    </div>
</template>

<script>
import html2canvas from "html2canvas";

export default {
    name: "upload-qrcode",
    props: {
        value: {
            type: String
        }
    },
    methods: {
        affirm: function(e) {
            this.downLoad();
            let { handleClose } = e;
            handleClose();
        },
        downLoad() {
            new html2canvas(document.getElementById('qrcode'), { useCORS: true }).then(canvas => {
                let base64 = canvas.toDataURL();
                this.downloadFile(base64, '二维码');
            });
        },
        downloadFile(content, fileName) {
            var base64ToBlob = function(code) {
                let parts = code.split(';base64,');
                let contentType = parts[0].split(':')[1];
                let raw = window.atob(parts[1]);
                let rawLength = raw.length;
                let uInt8Array = new Uint8Array(rawLength);
                for (let i = 0; i < rawLength; ++i) {
                    uInt8Array[i] = raw.charCodeAt(i);
                }
                return new Blob([uInt8Array], {
                    type: contentType
                });
            };
            let aLink = document.createElement('a');
            let blob = base64ToBlob(content);
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true);
            aLink.download = fileName;
            aLink.href = URL.createObjectURL(blob);
            aLink.click();
        },
    }
}
</script>

<style scoped lang="scss">
.le-qrcode {
    width: 220px;
    height: 220px;
    margin: auto;
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
