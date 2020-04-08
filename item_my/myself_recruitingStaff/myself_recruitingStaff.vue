<template>
	<view class="container">
		<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="圈子二维码" backShow="true"></topTabBarComponents> -->
		<view class="cicleCOdeB">
			<view class="CCcode">
				<view class="CCTitle" @click="gotoShop">
					<view class="CCima">
						<default-image :src="getShopDetail.logo" custom-class="Pimage"></default-image>
					</view>
					<view class="CCname">
						<view class="CstoreName fs3a30">{{getShopDetail.shopName}}</view>
						<view class="CstoreStaff fs6a24">已有员工{{getShopDetail.employeeNum}}名 | 提成{{getShopDetail.gainTotal || 3}}% </view>
					</view>
				</view>
				<view class="CCcodeM ">
					<!-- <view class="qrimg">
						<qrcode :val="qrval" :size="qrsize" :colorDark="qrColorDark" :colorLight="qrColorLight" ref="qrcode" @result="qrR"></qrcode>
					</view> -->
					<view class="codeMd" @longtap="saveQrcode" @touchstart="TSstart" @touchend="TSend">
						<image :src="qrSrc" mode="widthFix"></image>
					
					</view>
				</view>
				<view class="CCscan fs6a24 fx-row fx-row-center">
					<view class="CSname">扫码即可成为{{getShopDetail.shopName}}的员工</view>
				</view>
			</view>
			<view class="CCshare fs6a24 fx-row fx-row-center">
				<view class="Sname">长按图片保存，分享至朋友圈、微信好友有机会招到更多员工</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				qrSrc:'',
				shopId:0,
				getShopDetail:'',
			};
		},
		onLoad(options) {
			this.qrSrc = options.WXCodeUrl;
			//this.qrSrc=uni.getStorageSync('codeImage');
			//this.qrSrc=options.WXCodeUrl;
			//this.qrSrc = "https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.GtshVNZsj8jXaf72a8226da1efb5b5feb3d9341dc170.jpg"
			console.log(this.qrSrc);
			this.shopId=uni.getStorageSync('shopId');
			console.log('店铺shopId:'+this.shopId);
			this.getShop();
		},
		methods:{
			// 保存图片
			saveQrcode() {
				console.log("长按");
				wx.downloadFile({
					url:this.qrSrc,
					success:(res)=>{
						console.log(res);
						wx.saveImageToPhotosAlbum({
							filePath:res.tempFilePath,
							success:(res)=>{
								console.log(res);
							}
						})
					}　　　　　　　　　　　
				})
			},
			// 获取店铺信息
			getShop(){
				this.$api.getShopDetail(this.shopId).then(res=>{
					console.info('店铺信息');
					console.info(res);
					this.getShopDetail=res.shopData;
					
				}).catch(error=>{
					this.showError(error);
				})
			},
			// 去到店铺
			gotoShop(){
				uni.navigateTo({
					url: '../../item_businessCard/businessCard_MyShop/businessCard_MyShop?shopId='+this.shopId
				});
			},
		},
		
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container {
		width: 100%;
		height: 100%;
		background: #333;
		position: fixed;
		top: 0;
		left: 0;

		.cicleCOdeB {
			width: 690upx;
			height: 900upx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -345upx;
			margin-top: -450upx;

			.CCcode {
				width: 690upx;
				height: 850upx;
				background: #fff;
				margin: 0 auto;

				.CCTitle {
					.flex();
					padding: 30upx;
					box-sizing: border-box;
					font-weight: bold;
					font-size: 32upx;
					color: #333;
					;

					.CCima {
						width: 20%;

						.Pimage {
							width: 102upx;
							height: 102upx;
							margin-right: 20upx;
						}
					}

					.CCname {
						width: 100%;

						.CstoreName {
							height: 60upx;
						}
					}
				}

				.CCcodeM {
					width: 610upx;
					height: 610upx;
					;
					position: relative;
					border: 1px solid #eee;
					left: 30upx;

					.codeMd {
						width: 560upx;
						height: 560upx;
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						margin: auto;
						image {
							width: 100%;
						}
					}
				}

				.CCscan {
					margin-top: 20upx;width:100%;text-align: center;
					.CSname{margin:0 auto;}
				}
			}

			.CCshare {
				color: #ddd;width:100%;text-align: center;
				.Sname {
					margin: 50upx auto;
				}
			}
		}
	}
</style>
