<template>
  <view class="lock-container">
    <view class="mask"></view>
    <view class="lock">
      <image class="bg" :src="vipLockBgUrl"></image>
      <view class="lock-content">
        <view class="lock-content-meta">
          <view class="title">开通条件</view>
          <view class="desc">
            邀请好友{{ levelMax }}名可升级至{{ vipLevel === 2 ? '铂金' : '钻石' }}会员
            <image class="lock-icon" :src="vipLockIconUrl"></image>
          </view>
        </view>
        <view class="progress-container">
          <view class="progress-wrapper" :class="{ vip2: vipLevel === 2 }">
            <view class="start">0</view>
            <view class="end">100</view>
            <view class="progress-bg"></view>
            <view class="progress-active" :style="{ width: currentProgress + '%' }"></view>
            <view class="progress-current" :style="{ left: currentProgress + '%' }"  v-if="currentProgress > 5 && currentProgress < 95">{{ vipLevel==2?inviteQty2:inviteQty3 }}</view>
          </view>
          <view class="invite-info">
            <text>已邀请</text>
            <text>{{ vipLevel==2?inviteQty2:inviteQty3 }}/{{ levelMax }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {

    name: "VipLock",

    props: {
      vipLevel: Number,
      inviteQty: Number,
			inviteQty2:Number,
			inviteQty3:Number,
      vip2InviteTargetQty: Number,
      vip3InviteTargetQty: Number,
    },

    computed: {
      vipLockBgUrl () {
        return this.vipLevel === 2
            ? 'http://card-1254165941.cosgz.myqcloud.com/vip/vip2Lock.png'
            : 'http://card-1254165941.cosgz.myqcloud.com/vip/vip3Lock.png';
      },
      vipLockIconUrl () {
        return this.vipLevel === 2
            ? 'http://card-1254165941.cosgz.myqcloud.com/vip/vip2LockIcon.png'
            : 'http://card-1254165941.cosgz.myqcloud.com/vip/vip3LockIcon.png';
      },
      levelMax () {
        return this.vipLevel === 2
            ? this.vip2InviteTargetQty
            : this.vip3InviteTargetQty;
      },
      currentProgress () {
        return this.inviteQty / this.levelMax * 100;
      },
    },

  }
</script>

<style scoped lang="less">


  .lock {
    width: 690upx;
    height: 254upx;
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 30upx;
    z-index: 19999;

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .lock-content {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .lock-content-meta {
      margin-left: 190upx;
      .title {
        font-size:36upx;
        font-weight: bold;
        color:rgba(255,255,255,1);
        line-height:50upx;
        margin-top: 35upx;
      }
      .desc {
        font-size:28upx;
        color:rgba(255,255,255,1);
        line-height:40upx;
        padding-right: 16upx;

        .lock-icon {
          width: 40upx;
          height: 40upx;
          float: right;
        }
      }
    }
    .progress-container {

      .progress-wrapper {
        width:340upx;
        height:8upx;
        margin-top: 54upx;
        margin-left: 90upx;
        position: relative;
        display: inline-block;

        > view {
          position: absolute;
        }
        .start {
          width:40upx;
          height:20upx;
          box-sizing: border-box;
          background:rgba(255,255,255,1);
          border-radius:10upx;
          font-size:18upx;
          line-height:20upx;
          left: -20upx;
          top: -10upx;
          z-index: 100;
          text-align: center;
        }
        .end {
          width:40upx;
          height:20upx;
          box-sizing: border-box;
          background:rgba(255,255,255,1);
          border-radius:10upx;
          font-size:18upx;
          line-height:20upx;
          right: 0;
          top: -10upx;
          z-index: 100;
          text-align: center;
        }
        .progress-bg {
          left: 0;
          top: 0;
          width:340upx;
          height:8upx;
          background:rgba(94,90,184,1);
        }
        .progress-active {
          left: 0;
          top: 0;
          /*width:340upx;*/
          height:8upx;
          background: #FFFFFF;
          /*width: 25%;*/
        }
        .progress-current {
          width:40upx;
          height:20upx;
          background:rgba(255,255,255,1);
          border-radius:10upx;
          font-size:18upx;
          line-height:20upx;
          text-align: center;
          /*left: 25%;*/
          transform: translateX(-20upx);
          top: -40upx;
          position: relative;

          &:after {
            content: "";
            display: block;
            width: 2upx;
            height: 20upx;
            background-color: #FFFFFF;
            position: absolute;
            bottom: -10upx;
            left: 19upx;
          }
        }

        &.vip3 {
          color: #5D6DA9;
          .progress-bg {
            background-color: #5D6DA9;
          }
        }

      }
      .invite-info {
        font-size:28upx;
        color:rgba(255,255,255,1);
        line-height:40upx;
        display: inline-block;
        vertical-align: baseline;
        margin-left: 34upx;
        transform: translateY(-6upx);

        text {
          &+text {
            margin-left: 8upx;
          }
        }
      }
    }
  }

</style>
