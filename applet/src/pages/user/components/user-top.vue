<template>
  <view class="user-top" :data-theme="theme" :style="[topHeight]">
      <image class="he-background" :src="ipAddress + '/user-background-top.png'"></image>
      <view class="he-status-bar" :style="{ height: statusBarHeight + navbarHeight + 'px' }"></view>
      <view class="user-content">
            <view class="he-avatar">
                <image class="he-default" :src="!$h.test.isEmpty(userInfo) ? userInfo.avatar : ipAddress + '/user-defatul-avatar.png'"></image>
            </view>
            <button v-if="$h.test.isEmpty(userInfo)" class="he-name cu-btn he-text he-sign" @click="navigateTo">立即登录</button>
            <template v-else>
                <view class="he-text he-hi">HI</view>
                <view class="he-text he-name">{{userInfo.nickname}}</view>
            </template>
        </view>
  </view>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "user-top",
    computed: {
        userInfo: function() {
            return this.$store.state.apply.userInfo;
        },
        ...mapGetters('setting', {
            statusBarHeight: 'statusBarHeight',
            systemInfo: 'getPlatform',
            navbarHeight: 'getNavBarHeight'
        }),
        topHeight: function() {
            return {
                height: `${uni.upx2px(320) + this.$store.statusBarHeight + this.navbarHeight}px`
            }
        }
    },
    methods: {
        navigateTo: function() {
            uni.navigateTo({url: '/pages/user/login'});
        }
    }
}
</script>

<style scoped lang="scss">
  .user-top {
      position: relative;
      width: 750px;
      .he-status-bar {
          width: 100%;
      }
  }
  .user-content {
      height: 320px;
      position: relative;
  }
  .he-background {
      position: absolute;
      height: 100%;
      width: 750px;
      @include background_linear('background_color', -45deg, 0%, 100%);
  }
  .he-avatar {
      width: 114px;
      height: 114px;
      background: #FFFFFF;
      border-radius: 50%;
      position: absolute;
      top: 56px;
      left: 40px;
  }
  .he-default {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      position: absolute;
      top:50%;
      left: 50%;
      transform: translate(-50%, -50%);
  }
  .he-text {
      font-family: PingFang SC;
      font-weight: 500;
      color: #FFFFFF;
  }
  .he-hi {
      font-size: 30px;
      position: absolute;
      top: 72px;
      left: 186px;
  }
  .he-name {
      font-size: 36px;
      position: absolute;
      top: 114px;
      left: 186px;
  }
  .he-sign {
      top: 96px;
      background: transparent;
      padding: 0;
      margin: 0;
      height: 34px;
      border: 1px solid transparent;
      line-height: 1;
  }
</style>
