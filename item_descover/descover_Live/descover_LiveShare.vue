<template>
	<view class="container">
		<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="圈子二维码" backShow="true"></topTabBarComponents> -->
		<canvas class="TemplateCanvas" style="width: 694px;height: 887px; opacity: 0;position: absolute;top:-9000px;left: -9000px;"
		 canvas-id="globalCanvas"></canvas>


		<image @click="previewImage" class="codeImage" :src="tempFilePath" mode="widthFix"></image>

		<button class="flowBtn" @click="download">
			保存到手机
		</button>
		<button @click="postFriend" class="flowBtn blue">
			发送给朋友
		</button>

		<!-- <view class="cicleCOdeB">
			<view class="CCcode">
				<view class="CCTitle">
					<view class="CCima">

						<circle-avatar :avatar="avatar" :images="images"></circle-avatar>
					</view>
					<view class="CCname fs3a32">
						{{ name }}
					</view>
				</view>
				<view class="CCcodeM ">
					<view class="codeMd">
						<image @click="previewImage" :src="qrcodeUrl"></image>
					</view>
				</view>
			</view>
		</view> -->
	</view>

</template>

<script>
	import CircleAvatar from "../../components/CircleAvatarCode";
	import {
		roundRect
	} from '@/js/util.js'
	export default {
		components: {
			CircleAvatar
		},
		data() {
			return {
				qrcodeUrl: '',
				avatar: '',
				userCover: '',
				title: '',
				tempFilePath: '',
				canvasContext: null
			};
		},

		onLoad(option) {
			let LiveId = option.LiveId
			this.canvasContext = uni.createCanvasContext("globalCanvas");
			this.showLoading("二维码生成中");
			const userId = uni.getStorageSync('userId');
			this.$api.getLiveDataInfo(LiveId).then(async result => {
				const ctx = this.canvasContext;
				// this.avatar = result.mpCardCircle.headImage
				this.userCover = result.userCover;
				this.title = result.title;
				this.qrcodeUrl =
					`https://xk.gzskxx.com/QRCODE/?app=qr.get&data=https://xk.gzskxx.com/joinLive/${LiveId}&level=L&size=6`;
				//`https://xk.gzskxx.com/QRCODE/?app=qr.get&data=https://xk.gzskxx.com/joinCircle/${id}_${userId}&level=L&size=6`;
				ctx.textBaseline = "top";
				//绘制白色背景
				ctx.setFillStyle('#ffffff');
				ctx.fillRect(0, 0, 694, 1187);
				ctx.fill();
				//绘制头像容器
				ctx.setFillStyle('#F1F1F1');
				ctx.fillRect(26, 29, 105, 105);
				ctx.fill();
				let [errs, resxs] = await uni.getImageInfo({
					src: this.userCover.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
						.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
				});
				let userCover = resxs.path;
				ctx.drawImage(userCover, 26, 29, 185, 185);
				//绘制直播间标题
				ctx.font = "bold";
				ctx.setFillStyle('#000000');
				ctx.setFontSize(40);
				ctx.fillText(this.title, 230, 34);
				//绘制直播间时间
				var date = new Date();
				//月
				let month = date.getMonth();
				month = month + 1
				month = month.toString()
				//日
				let day = ''
				day = date.getDate()
				//时
				let hours = ''
				hours = date.getHours();
				//分
				let minutes = ''
				minutes = date.getMinutes()
				if (minutes < 9) {
					minutes = '0' + minutes
				}
				let time = month + '月' + day + '日' + hours + ':' + minutes
				ctx.setFillStyle('#000000');
				ctx.setFontSize(36);
				ctx.fillText(time, 230, 134);
				//直播文本
				ctx.setFillStyle('#000000');
				ctx.setFontSize(36);
				ctx.fillText('正在直播快来看我', 230, 184);
				let hasPin = false
				//如果是普通圈 直接绘制大二维码
				if (hasPin) {

					var [x, y, w, h] = [135, 397, 428, 428];
				} else {
					var [x, y, w, h] = [17, 235, 660, 660];
				}
				//二维码边框
				// ctx.setStrokeStyle("#898989");
				// ctx.setLineWidth(3)
				//ctx.strokeRect(x,y,w,h);
				//二维码

				let [err, resx] = await uni.getImageInfo({
					src: this.qrcodeUrl
				});
				console.log(resx)
				let qrpath = resx.path;
				ctx.drawImage(qrpath, x, y, w, h);
				console.log('123')
				ctx.draw(false, e => {
					uni.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 694,
						height: 887,
						canvasId: "globalCanvas",
						success: res => {

							this.tempFilePath = res.tempFilePath;
							this.hideLoading();
						},
						fail: (err) => {
							console.log(err, "errerr");

						}
					})
				})



				//return this.$api.getCirCleQRCodeUrl(id);
			});

		},
		//http://api.k780.com:88/?app=qr.get&data=http://www.baidu.com&level=L&size=6
		//http://qr.liantu.com/api.php?text=http://www.baidu.com
		//https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://www.baidu.com

		methods: {
			previewImage() {
				if (!this.tempFilePath) return;
				uni.previewImage({
					urls: [this.tempFilePath],
					current: this.tempFilePath,
				});
			},
			download() {
				if(!this.tempFilePath) retuen;
				uni.saveImageToPhotosAlbum({
					filePath:this.tempFilePath,
					complete:()=>{
						this.showTips("保存完成");
					}	
				})
				
			},
			postFriend() {
				this.previewImage()
			}
		}

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container {

		.codeImage {
			width: 694upx;
			height: 887upx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -345upx;
			margin-top: -415upx;
			// border: 1px solid red;
		}


		width:100%;
		height:100%;
		background: #C8C7CC;
		position:fixed;
		top:0;
		left:0;

		.cicleCOdeB {
			width: 690upx;
			height: 830upx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -345upx;
			margin-top: -415upx;

			.CCcode {
				width: 690upx;
				height: 830upx;
				background: #fff;
				margin: 0 auto;

				.CCTitle {
					padding: 30upx;
					box-sizing: border-box;
					font-weight: bold;
					font-size: 32upx;
					color: #333;
					;
					display: flex;
					align-items: center;

					.CCima {
						width: 102upx;
						height: 102upx;
						margin-right: 20upx;
					}

					.CCname {
						flex: 1;
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
							height: 100%
						}
					}
				}
			}
		}
	}

	.flowBtn {
		position: fixed;
		width: 300upx;
		height: 70upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 35upx;
		font-size: 32upx;
		font-family: PingFangSC-Medium, PingFang SC;
		;
		font-weight: 500;
		color: #505050;
		line-height: 70upx;
		bottom: 29upx;
		left: 58upx;

		&.blue {
			background: rgba(255, 255, 255, 1);
			left: 404upx;
		}
	}

	page {
		background: #CCCCCC;
		min-height: 100vh;
	}
</style>
