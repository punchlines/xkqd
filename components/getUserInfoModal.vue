<template>

		<view class="shouquanModel fx-row fx-row-center">
			<view class="shouquanCon fx-column fx-row-center fx-col-center">
				<view class="title">微信授权</view>
				<view class="logoCon fx-column fx-row-center fx-col-center">
					<image src="http://card-1254165941.cosgz.myqcloud.com/logo/icon.png" class="logoImg"></image>
					<text class="logoName">销刻渠道</text>
				</view>
				<view class="tishi">*获取你的公开信息（头像/昵称）</view>
				<view class="opCon fx-row fx-row-center fx-col-center">
					<view class="no" @click="hideModal" >拒绝</view>
					<view class="line"></view>
					<button plain="true" class="yes" lang="zh_CN" open-type="getUserInfo" @getuserinfo="WXgetUserInfor">允许</button>
				</view>
			</view>
		</view>

</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			hideModal(){
				//console.log('hideModal')
				this.$emit('hideModal');
			},
			WXgetUserInfor(e){
				this.$emit('getUserInfo',e)
			}
		}
	}
</script>

<style lang="less" scoped>
	//微信授权头像昵称
		.shouquanModel{
			position: fixed;z-index: 1; width: 100%;height: 100%;top: 0;left: 0;background:rgba(0,0,0,0.5);box-sizing:border-box;padding:60upx;
			.shouquanCon{
				width:84% ;position: absolute;top: 50%;margin-top: -270upx; background: #FFFFFF;text-align:center;border-radius:8upx;
				.title{width: 100%; height: 100upx;font-size: 32upx;color: #333333;border-bottom: 1px solid #E1E1E1;font-family:PingFangSC-Medium;font-weight:500;padding-top: 36upx;}
				.logoCon{
					width: 100%;border-bottom: 1px solid #E1E1E1;
					.logoImg{width: 100upx; height: 100upx; border-radius: 50%;margin: 39upx 0 17upx 0;}
					.logoName{font-size: 28upx;color: #333333;margin-bottom: 30upx;}
				}
				.tishi{width: 100%; height: 119upx;line-height: 119upx; font-size: 24upx;color: #666666;border-bottom: 1px solid #E1E1E1;}

				.opCon{
					height:87upx ;line-height: 87upx; width: 100%;text-align: center;
					.no{width: 50%; color:#666666 ;font-size: 28upx;}
					.line{height: 87upx;width: 1px;background: #E1E1E1;}
					.yes{width: 50%;color:#6B7AF8;font-size: 28upx;}
				}
			}
		}
</style>
