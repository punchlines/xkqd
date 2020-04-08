<template>
  <view class="title-bar-container">
    <view class="title-bar-container-safe-area" :style="safeAreaStyle"></view>
    <view class="title-bar-container-fixed">
      <view class="status-bar" :style="statusBarStyle"></view>
      <view class="title-bar">
        <view class="action-list">
					<!-- formId收集 -->
					<wx-view custom-class="icon back" v-if="canBack">
							<view class="icon back" @click="navigateBack">
								<image src="http://card-1254165941.cosgz.myqcloud.com/images/icon_back.png" mode="aspectFit" style="height: 28upx; width: 28upx; margin-left: 4upx"></image>
							</view>
					</wx-view>
					<wx-view  custom-class="icon home" v-if="showHome">
						<view class="icon home" @click="navigateHome" style="width: 95upx">
							<image src="http://card-1254165941.cosgz.myqcloud.com/images/icon_home.png"></image>
						</view>
					</wx-view>
						
        </view>
        <view class="title">{{ title }}</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {

    name: "TitleBar",

    data () {
      return {
        canBack: false,
				
      }
    },

    props: {
			title: String,
			showHome:{type:Boolean,default:true}
		
    },

    computed: {
      systemInfo () {
        return this.$store.state.systemInfo;
      },
      statusBarHeight () {
        return this.systemInfo.statusBarHeight;
      },
      rate () {
        return this.systemInfo.screenWidth / 750;
      },
      statusBarStyle () {
        return `height: ${this.statusBarHeight}px`;
      },
      safeAreaStyle () {
        return `height: ${this.statusBarHeight + 88 * this.rate}px`;
      },
    },

    mounted () {
      var pages = getCurrentPages();
      var page = pages[pages.length - 1];
      this.canBack = pages.length > 1;
      //console.log(JSON.stringify(this.systemInfo),"this.systemInfo");
			
    },

    methods: {
      navigateBack () {
        uni.navigateBack();
      },
      navigateHome () {
        uni.switchTab({url: '/pages/businessCard/businessCard'});
      },
    },

  }
</script>

<style scoped lang="less">

  .title-bar-container-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: #FFFFFF;
    z-index: 99999;
    border-bottom: 1upx solid #E1E1E1;
  }

  .title-bar {
    height: 88upx;
    display: flex;
    position: relative;

    .action-list {
      display: flex;
      align-items: center;
      .icon {
        width: 78upx;
        height: 88upx;
        background: #FFF;
        position: relative;
        &:active {
          background: #eee;
        }
        image {
          width: 36upx;
          height: 36upx;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        &+.icon {
          &:after{
            content: "";
            position: absolute;
            width:1upx;
            height:30upx;
            background:rgba(204,204,204,1);
            left: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .back {}
      .home {}
    }
    .title {
      font-size:36upx;
      font-weight: bold;
      color:rgba(0,0,0,1);
      line-height:50upx;
      width: 250upx;
      height: 50upx;
      position: absolute;
      left: 50%;
      top: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
    }
  }

</style>
