<template>
    <view class="he-item__check flex justify-center align-center" @click="newVal = !newVal" :data-theme="theme">
        <view class="he-radio he-radio-0" v-if="!newVal"></view>
        <view class="he-radio he-radio-1 flex justify-center align-center" v-else>
            <text class="he-select iconfont iconbtn_select"></text>
        </view>
    </view>
</template>

<script>
export default {
    name: "he-radio",
    props: {
        value: {
            type: [Boolean, Number]
        },
        isChange: {
            type: [Boolean],
            default: true
        }
    },
    computed: {
        newVal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                if (!this.isChange) return;
                return this.$emit('input', val);
            }
        }
    }
}
</script>

<style scoped lang="scss">
.he-radio {
    width: 36px;
    height: 36px;
    border-radius: 50%;
}
.he-radio-0 {
    border: 2px solid #CCCCCC;
}
.he-radio-1 {
    @include background_color('background_color');
}
.he-select {
    height: 20px;
    width: 20px;
    font-size: 20px;
    color: #FFFFFF;
}
</style>