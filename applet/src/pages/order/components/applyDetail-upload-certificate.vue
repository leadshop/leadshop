<template>
    <view class="applyDetail-upload-certificate">
        <view class="he-top">
            <text class="he-text">上传凭证</text>
            <text class="he-help">({{newList.length}}/4)</text>
            <text class="he-help he-desc">选填</text>
        </view>
        <view class="he-bottom">
            <he-upload-image
                 @on-remove="removeImage"
                 @on-uploaded="uploaded"
                 :max-count="4"></he-upload-image>
        </view>
    </view>
</template>

<script>
import heUploadImage from "@/components/he-upload-image.vue";

export default {
    name: "applyDetail-upload-certificate",
    components: {
        heUploadImage
    },
    props: {
        list: {
            type: Array,
            default: function() {
                return [];
            }
        }
    },
    computed: {
        newList: {
            get: function() {
                return this.list;
            },
            set: function(val) {
                this.$emit('update:list', val);
            }
        }
    },
    methods: {
        removeImage: function(index) {
            this.newList.splice(index, 1);
        },
        uploaded: function (data) {
            this.newList = data.map(function(item) {
                return item.response;
            });
        }
    }
}
</script>

<style scoped>
.applyDetail-upload-certificate {
    width: 710px;
    background: #FFFFFF;
    border-radius: 16px;
    padding: 32px 0 12px 24px;
}
.he-top {
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
}
.he-text {
    color: #222222;
}
.he-help {
    color: #999999;
    margin-left: 16px;
}
.he-desc {
    font-size: 24px;
}
.he-bottom {
    margin-top: 24px;
}
</style>