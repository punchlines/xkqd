<template>
	<view class="paySuccess">
		<view class="top">
			<view class="topImg">
				<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/success.png"></image>
				<view class="upPIn">
					<text>发起</text><br/>
					<text>拼团</text>
				</view>
			</view>
			<view class="jiao">发起拼团教程团长</view>
			<view class="getMon">敬请期待,您参加的团还在进行中,拼团成功后您即可获得返还的现金.</view>
			<view class="cong">特别恭喜您获得此商品开团的机会！</view>
			<view class="nowTuan">立即邀请好友参团,完成拼团后</view>
			<view class="shao">获得至少
				<text class="tuanMon">30.00-2960.00</text>
				元拼团佣金
			</view>
			<view class="forever">而且拥有了永久发起该商品的拼团资格.</view>
			
			<view class="btnTuan" @click="clone">立即发起开团</view>
		</view>
		
		<view class="yong">
			<view class="jin">佣金说明</view>
			<view class="tuanYong">
				<text class="sum">团长佣金</text>
				<text class="simple">=(</text>
				<text class="oneNum">团友参团10元每单</text>
				<text class="simple">+</text>
				<text class="oneNum">团友开团5元每单</text>
			<!-- 	<text class="simple">+</text>
				<text class="oneNum">团友团团2.5元每单</text> -->
				<text class="simple">)x</text>
				<text class="dan">单数</text>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		data() {
			return {
				pinId: 0
			}
		},
		
		onLoad(option){
			this.pinId = option.pinId;
			console.log(option)
			
			// this.$api.pinDetail(this.pinId).then(res=>{
			// 	
			// })
		},
	
		methods: {
			clone() {
				this.$api.createAgencyGroup(this.pinId).then(res=>{
					uni.showModal({
						content:"代理成功",
						showCancel:false,
						complete: () => {
							uni.setStorageSync('setNeedUpdatePinDetail',false)
							// uni.switchTab({
							// 	url:'/pages/pinGroup/pinGroup'
							// })
							uni.redirectTo({
									url:"../businessCC_joinGroup/businessCC_joinGroup?id="+res
							})
						}
					})
						
					
				}).catch(err=>this.showError("系统错误"));
			}
		},
		
	}
	
	
</script>

<style scoped lang="less">
	.paySuccess{
		background: #f5f5f5;
		width: 100%;
		height: 1180upx;
	}
	.top{
		margin-top: 24upx;
		height: 906upx;
		background: #fff;
		.topImg{
			width: 100%;
			height: 310upx;
			image{
				width: 100%;
				height: 310upx;
				margin-left: 50upx;
				position: relative;
			}
		}
		.upPIn{
			width:120upx;
			height:120upx;
			background:rgba(107,120,250,1);
			border-radius:50%;
			position: absolute;
			top: 226upx;
			left: 313upx;
			line-height: 120upx;
			text{
				display: block;
				height: 60upx;
				line-height: 60upx;
				color: #fff;
				font-size: 36upx;
				font-weight: bold;
				padding-left: 23upx;
				position: relative;
				&:nth-of-type(1){
					top:10upx;
				}
				&:nth-of-type(2){
					top:-5upx;
				}
				
			}
			
			
		}
		.jiao{
			width: 100%;
			font-size:32upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			text-align: center;
			letter-spacing: 3upx;
			margin: 20upx 0 27upx 0;
		}
		.getMon{
			width: 460upx;
			height: 67upx;
			margin: 0 auto;
			font-size: 28upx;
			color: #666;
			line-height:40upx;
			letter-spacing: 2upx;
			font-weight:400; 
			text-align: center;
		}
		.cong{
			width:481upx;
			height:29upx;
			font-size:30upx;
			font-weight:bold;
			color:rgba(51,51,51,1);
			line-height:48upx;
			margin: 0 auto;
			margin-top: 15upx;
			text-align: center;
		}
		.nowTuan{
			margin: 0 auto;
			margin-top: 71upx;
			width: 406upx;
			font-size: 28upx;
			color: #666;
			line-height: 48upx;
			font-weight: 400;
			text-align: center;
		}
		.shao{
			margin: 0 auto;
			width: 564upx;
			font-size: 28upx;
			color: #666;
			line-height: 48upx;
			font-weight: 400;
			text-align: center;
			.tuanMon{
				color: #ff0000;
				font-size: 40upx;
				font-weight: bold;
				line-height: 48upx;
			}
		}
		.forever{
			margin: 0 auto;
			width: 495upx;
			color: #666;
			line-height: 48upx;
			font-weight: 400;
			text-align: center;
			font-size: 28upx;
		}
		.btnTuan{
			width:500upx;
			height:80upx;
			margin: 0 auto;
			background:rgba(107,120,250,1);
			border-radius:40upx;
			margin-top: 66upx;
			color: #fff;
			font-size: 32upx;
			font-weight: bold;
			line-height: 80upx;
			text-align: center;
		}
	}
	.yong{
		width: 100%;
		height: 225upx;
		background: #fff;
		margin-top: 27upx;
		.jin{
			font-size:32upx;
			font-weight:bold;
			color:rgba(0,0,0,1);
			line-height:48upx;
			padding-top: 18upx;
			padding-left: 25upx;
		}
		.tuanYong{
			width:690upx;
			height:110upx;
			background:rgba(107,120,250,0.1);
			border-radius:10upx;
			margin: 0 auto;
			margin-top: 25upx;
			text-align: center;
		}
		.sum{
			width:56upx;
			height:62upx;
			font-size:28upx;
			font-weight:400;
			color:#333;
			line-height:36upx;
			display: inline-block;
			margin-left: 15upx;
			margin-top: 15upx;
			text-align: center;
		}
		.oneNum{
			width:106upx;
			height:59upx;
			font-size:24upx;
			font-weight:400;
			color:#333;
			line-height:36upx;
			display: inline-block;
			text-align: center;
		}
		.simple{
			font-size:60upx;
			color:#333;
		}
		.dan{
			font-size:28upx;
			font-weight:400;
			color:#333;
			vertical-align: 9upx;
			margin-left: 10upx;

		}
	}
	
</style>
