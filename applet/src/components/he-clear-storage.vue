<template>
    <view class="he-clear-storage">
        <he-empty-popup v-model="showModal"  title="清除缓存可能需要一些时间，清除过程中请耐心等待" @confirm="confirm" :empty-style="emptyStyle"></he-empty-popup>
        <he-toast v-model="showClear">
            <view class="he-clear-toast flex flex-direction align-center">
                <template v-if="loading">
                    <image class="he-loading" :src="ipAddress + '/toast-gif-loading.gif'"></image>
                    <view class="he-text">正在清除缓存...</view>
                </template>
                <template v-else>
                    <view class="iconfont iconbtn_select"></view>
                    <view class="he-text he-text__margin">清除缓存已完成</view>
                </template>
            </view>
        </he-toast>
    </view>
</template>

<script>
import heToast from "./he-toast.vue";
import heEmptyPopup from "@/components/he-empty-popup.vue";
export default {
    name: "he-clear-storage",
    props: {
        value: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            loading: true,
            showClear: false,
            emptyStyle: {
                height: "179rpx",
                padding: "64rpx 54rpx 0 54rpx",
            }
        }
    },
    components: {
        heToast,
        heEmptyPopup
    },
    computed: {
        showModal: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        open: function() {
            let _this = this;
            for (let key in this.$storageKey) {
                uni.removeStorageSync(key);
            }
            _this.$store.dispatch('setting/getSetting');
            _this.$store.dispatch('goods/emptyShareGoods');
            _this.$store.dispatch('setting/getTheme');
            _this.$store.dispatch('setting/getTabBar');
            setTimeout(function() {
                _this.loading = false;
                setTimeout(function() {
                    _this.showClear = false;
                    _this.loading = true;
                }, 1000);
            }, 3000);
        },
        confirm: function() {
            this.showClear = true;
            this.open();
        }
    }
}
</script>

<style scoped lang="scss">
.he-clear-toast {
    width: 100%;
    height: 100%;
}
.he-loading {
    width: 96px;
    height: 96px;
    margin-top: 52px;
}
.he-text {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1.3;
    margin-top: 43px;
}
.he-text__margin {
    margin-top: 50px;
}
.iconbtn_select {
    width: 68px;
    height: 68px;
    font-size: 68px;
    color: #FFFFFF;
    margin-top: 69px;
}
</style>
