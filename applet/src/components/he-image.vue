<template>
    <view :style="[setStyle]" class="he-image-index" @click="onClick">
        <!--#ifndef H5-->
        <image :src="src" v-if="(!error)" :mode="mode" :lazy-load="lazyLoad" @load="onImageLoad" @error="onImageError" class="he-image__img"></image>
        <!--#endif-->
        <!--#ifdef H5-->
        <img v-lazy="src" v-if="(!error)" @load="onImageLoad" @error="onImageError" class="he-image__img"/>
        <!--#endif-->
        <view class="loading-class he-image__loading" v-if="loading && showLoading">
            <text class="iconfont iconimago_defaultproduct" :style="[iconFont]"></text>
        </view>
        <view v-if="error && showError" class="error-class he-image__error">
            <text class="iconfont iconimago_loadingfail" :style="[iconFont]"></text>
        </view>
    </view>
</template>

<script>
export default {
    name: "he-image",
    props: {
        src: {
            type: [String]
        },
        width: {
            type: [String, Number]
        },
        height: {
            type: [String, Number]
        },
        lazyLoad: {
            type: Boolean,
            default: function() {
                return true;
            }
        },
        showLoading: {
            type: Boolean,
            default: function() {
                return true;
            }
        },
        showError: {
            type: Boolean,
            default: function() {
                return true;
            }
        },
        imageStyle: {
            type: [Object]
        },
        mode: {
            type: String,
            default: function() {
                return "aspectFill";
            }
        }
    },
    computed: {
        setStyle: function() {
            let style = {
                width: this.$h.addUnit(this.width),
                height: this.$h.addUnit(this.height),
            }
            Object.assign(style, this.imageStyle);
            return style;
        },
        iconFont: function() {
            return {
                fontSize: this.$h.addUnit(this.width * .35)
            }
        }
    },
    data() {
        return {
            error: false,
            loading: true
        }
    },
    methods: {
        onImageLoad: function (event) {
            this.loading = false;
            this.$emit('load', event.detail);
        },
        onImageError: function (event) {
            this.loading = false;
            this.error = true;
            this.$emit('error', event.detail);
        },
        onClick: function (event) {
            if (this.error && this.showError) return;
            this.$emit('click', event.detail);
        }
    }
}
</script>

<style scoped lang="scss">
.he-image-index {
    position: relative;
    overflow: hidden;
}
.loading-class, .error-class {
    background: #ECEDF1;
    position: absolute;
    top: 0;
    z-index: 1;
}
.iconfont {
    position: absolute;
    top:50%;
    left:50%;
    color: #DFE0E6;
    transform: translate(-50%, -50%);
}

.he-image__img ,.he-image__loading, .he-image__error {
    display: block;
    width: 100%;
    height: 100%;
    // #ifdef H5
    object-fit: contain;
    // #endif
}
</style>
