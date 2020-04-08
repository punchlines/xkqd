<template>
	<view class="container">
		<view class="searchCon fx-row fx-row-left fx-row-center">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'"></image>
			<input type="text" placeholder="请输入所在位置" placeholder-class="" placeholder-style="tishi" class="input" @focus="getLocation" />
		</view>
		<view class="addressContainer">
			<view class="noShow" @click="hideLocation">不显示所在地</view>
			<view class="addressCon fx-row fx-row-center fx-row-space-between" v-if="location.addressName">
				<view>
					<view class="addressName">{{ location.addressName }}</view>
					<view class="addressStr">{{ location.address }}</view>
				</view>
				<view class="select">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/select.png'" class="selectImg"></image>
				</view>
			</view>
		</view>
		<!-- 按钮 -->
		<view class="sureBtnCon">
			<view class="sureBtn" @click="confirm">确定</view>
		</view>
	</view>
</template>

<script>
  export default {
    data() {
      return {
        onlineSite:this.global.onlineSite
      };
    },

    computed: {
      journal () {
        return this.$store.state.journalPublish;
      },
	  location () {
        return this.journal.location;
	  },
    },

    methods:{

      hideLocation () {
        this.journal.location = {
          address: '',
          addressName: '',
          lat: '',
          lng: '',
        }
        uni.navigateBack();
	  },

      getLocation(){//获取当前地理位置
        uni.chooseLocation({
          success: (res) => {
			  console.log(res);
            this.journal.location = {
              address: res.address,
              addressName: res.name,
              lat: res.latitude,
              lng: res.longitude,
			}
            uni.navigateBack();
          }
        });
      },

	  confirm () {
        uni.navigateBack()
	  },

    },

  }
</script>

<style lang="less">

	@import "../../css/jss_base.less";
	.container{
		@ff:PingFangSC;
		background:#F8F8F8;box-sizing:border-box;padding:40upx 0;
		.searchCon{
			background:#ffffff;height:72upx;
			&>image{width: 32upx;height: 32upx;padding:0 30upx;}
			.tishi{font-size: 28upx;color: #CCCCCC;}
			.input{font-size: 28upx;color: #333333;width:100%;}
		}
		.addressContainer{//位置
			margin-top:37upx;
			.noShow{
				height: 106upx;line-height: 106upx; color: #4E7CB1;font-size: 28upx;background: #FFFFFF;border-bottom:1px solid #E1E1E1;padding-left: 30upx;
			}
			.addressCon{
				box-sizing: border-box;padding: 0 30upx;height: 153upx;font-family:@ff;border-bottom:1px solid #E1E1E1;background:#FFFFFF;
				.addressName{font-size: 28upx;color: #333333;font-weight: 500;margin-bottom: 13upx; }
				.addressStr{font-size: 24upx;color: #999999;}
				.select{
					.selectImg{width: 28upx;height: 22upx;}
				}
			}
		}
		.sureBtnCon{
		position: fixed;bottom: 0;z-index: 99;width: 100%;height:98upx;text-align: center;background: #FFFFFF;
		.sureBtn{
			width:620upx ;height: 80upx;line-height: 80upx;margin: 10upx auto;font-size:28upx ;color: #FFFFFF;background: #6B7AF8;border-radius: 40upx;
		}
	}
}


</style>
