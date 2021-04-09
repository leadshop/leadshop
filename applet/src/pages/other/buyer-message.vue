<template>
    <view class="he-page-content" :data-theme="theme">
        <view class="he-area">
            <textarea :value="value" placeholder="请输入买家留言" class="he-textarea"
                      @input="changeText"
                      :maxlength="50"
                      :focus="true"
                      @confirm="navigateBack"
                      :disable-default-padding="true"
                      :hold-keyboard="true"
                      placeholder-style="font-size:26rpx;font-family: PingFang SC;font-weight: 500; color: #999999; line-height:1.1;"></textarea>
            <view class="he-area__num">{{value.length}}/50</view>
        </view>
        <button class="cu-btn he-sure__btn" @click="navigateBack">确定</button>
    </view>
</template>

<script>
export default {
    name: "buyer-message",
    data() {
        return {
            value: ''
        }
    },
    methods: {
        changeText: function(e) {
            let str = e.detail.value;
            if (str.length > 50) {
                str = str.substring(0, 50);
            }
            this.value = str;
        },
        navigateBack: function () {
            uni.setStorageSync(this.$storageKey.comments_submit, this.value);
            uni.navigateBack({
                delta: 1
            });
        }
    },
    onLoad(options) {
        this.value = options.note;
    }
}
</script>

<style scoped lang="scss">
.he-page-content {
    background-color: #FFFFFF;
    padding: 24px 20px 0 20px;
}
.he-area {
    width: 710px;
    height: 324px;
    background: #F5F5F5;
    border-radius: 16px;
    padding: 32px 32px 24px 32px;
}
.he-textarea {
    width: 646px;
    height: 238px;
    font-size: 26px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 1.1;
}
.he-area__num {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 1.1;
    text-align: right;
}
.he-sure__btn {
    width: 710px;
    height: 80px;
    @include background_color('background_color');
    border-radius: 40px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    margin-top: 80px;
}
</style>