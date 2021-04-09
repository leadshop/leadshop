<template>
    <he-popup v-model="showModal" mode="bottom" :border-radius="16">
        <view class="user-bind-phone flex flex-direction">
            <button class="cu-btn he-bind__item" @click="unBind">解绑该手机号</button>
            <button class="cu-btn he-bind__item" @click="navigateTo">更换绑定手机号</button>
            <button class="cu-btn he-bind__item" @click="showModal = false;">取消</button>
        </view>
    </he-popup>
</template>

<script>
import HePopup from "@/components/he-popup";

export default {
    name: "user-bind-phone",
    props: {
        value: Boolean
    },
    components: {
        HePopup
    },
    computed: {
        showModal: {
            get: function() {
                return this.value;
            },
            set: function(val) {
                this.$emit('input', val);
            }
        }
    },
    methods: {
        navigateTo: function() {
            this.navigateTo('/platforms/h5/user/bind-phone');
        },
        unBind: function () {

        }
    }
}
</script>

<style scoped>
.user-bind-phone {
    background-color: RGBA(245, 245, 245, 1);
    padding-top: 16px;
}
.he-bind__item {
    height: 104px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #222222;
    background-color: #FFFFFF;
}
.he-bind__item:first-child {
    border-bottom: 1px solid #E5E5E5;
}
.he-bind__item:last-child {
    margin-top: 16px;
}
</style>