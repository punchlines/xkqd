<template>
	<view class="popup fs3a28">
		<view :class="{'ProductShareImg':true,'ProductShareImg1':journalMap.images[0],'ProductShareImg2':!journalMap.images[0]}"
		 @click="$emit('close')">
			<view class="PSIList">
				<view class="PSIcancle" @click="close">
					<!-- https://xk.gzskxx.com/myqcloud/cardImages/descover/tuichu.png -->
					<image :src="'https://xk.gzskxx.com/myqcloud/cardImages/card/tuichu3.png'" mode="aspectFit"></image>
				</view>
				<view :class="{'PSIsavePhone':true,'PSIsavePhone1':journalMap.images[0],'PSIsavePhone2':!journalMap.images[0]}">
					<view class="Phone" @click.stop="exportImage">保存至手机</view>
				</view>
			</view>

			<view style="overflow: hidden" class="canvasBox" :class="{'canvasMax':journalMap.images[0],'canvasMin':!journalMap.images[0]}">
				<image @click.stop="preview" class="canvasBox" :src="templateFilePath" :class="{'canvasMax':journalMap.images[0],'canvasMin':!journalMap.images[0]}" />
				<canvas v-if="!hideCanvas" class="canvasBox" :class="{'canvasMax':journalMap.images[0],'canvasMin':!journalMap.images[0]}"
				 :canvas-id="'myCanvas' + id" />
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				like: 'https://xk.gzskxx.com/myqcloud/cardImages/images/like.png',
				likeUn: 'https://xk.gzskxx.com/myqcloud/cardImages/images/likeun.png',
				pinglun: 'https://xk.gzskxx.com/myqcloud/cardImages/images/pinglun.png',
				templateFilePath: '',
				titleColor: '#333',
				codeTitle: '我发现了一个有趣的动态,赶紧扫码一起围观吧',
				codeColor: '#666',
				priseColor: '#999',

				hideCanvas: false,
				id: '',
			};
		},
		props: {
			visible: Boolean,
			journal: Object,
			WXCodeUrl: String,
		},
		computed: {
			journalMap() {
				return this.journal.journalMap
			},
			userMap() {
				return this.journal.userMap
			},
		},
		mounted() {
			this.id = Math.random().toString();
			
			const image = this.journalMap.images[0];
			
			uni.showLoading();
			let WXCodeUrl = '';
			uni.getImageInfo({
				src: this.WXCodeUrl
					.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
					.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/'),
				success: res => {
					WXCodeUrl = res.path;
					if (image) {
						uni.getImageInfo({
							src: image
								.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
								.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/'),
							success: res => {
								this.draw(WXCodeUrl, res.path);
								uni.hideLoading();
							},
							fail: error => {
								uni.hideLoading();
							}
						})
					} else {
						this.draw(WXCodeUrl, '');
					}

				},
				fail: error => {
					this.showError(error);
					uni.hideLoading();
				}
			})

		},
		methods: {

			draw(WXCodeUrl, image) {
				console.log(WXCodeUrl)
				console.log(image)
				console.log('绘图');
				var context = wx.createCanvasContext('myCanvas' + this.id)
				console.log(context);
				context.setFontSize(12)

				// 图片
				if (image) {
					context.setFillStyle('#fff')
					context.fillRect(0, 0, uni.upx2px(630), uni.upx2px(1700))
					// https://xk.gzskxx.com/myqcloud/cardImages/template/template3.jpg
					context.drawImage('https://xk.gzskxx.com/myqcloud/cardImages/template/template3.jpg', 0, 0, uni.upx2px(630), uni.upx2px(600))
					console.log('图片');

				} else {
					context.setFillStyle('#fff')
					context.fillRect(0, 0, uni.upx2px(630), uni.upx2px(580))

					context.translate(0, -uni.upx2px(580)); // 平移恢复(0,0)坐标为左上角
				}

				context.setFillStyle("#000000")
 				// 标题
				this.drawWrapText(context, this.journalMap.content, 15, uni.upx2px(650), 300, 220)
 
				// 点赞图标
				let likeImage = this.journalMap.praiseType == 0 ? this.likeUn : this.like
				context.drawImage(likeImage, 15, uni.upx2px(675), 12, 12)
 				// 点赞数
				context.setFillStyle(this.priseColor)
				context.setFontSize(10)
				context.setTextAlign('center')
				context.fillText(this.journalMap.praiseCount, 40, uni.upx2px(700))

				// 评论图标
				// context.drawImage(this.pinglun, 70, uni.upx2px(675), 12, 12)
// 				// 评论数
// 				context.setFillStyle(this.priseColor)
// 				context.setFontSize(10)
// 				context.setTextAlign('center')
// 				context.fillText(this.journalMap.commentCount, 95, uni.upx2px(700))
// 
// 				// 二维码
// 				context.drawImage(WXCodeUrl, 15, uni.upx2px(715), 55, 55)
// 				// 二维码标题
// 				context.setFontSize(12)
// 				context.setFillStyle(this.codeColor)
// 				context.setTextAlign('left')
// 				this.drawWrapText(context, this.codeTitle, uni.upx2px(190), uni.upx2px(770), uni.upx2px(400), uni.upx2px(440))
 
				context.draw(false, () => {
					wx.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 630,
						height: image ? 850 : 290,
						canvasId: 'myCanvas' + this.id,
						success: res => {
							this.templateFilePath = res.tempFilePath;
							console.log(res.tempFilePath)
							setTimeout(() => {
								this.hideCanvas = true;
							}, 100)
							uni.hideLoading();
						},
						fail: (err) => {
							uni.hideLoading();
						}
					})
				})
			},

			drawWrapText(context, text, x, y, width1, width2) {
				var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
				var temp = "";
				var row = [];

				for (var a = 0; a < chr.length; a++) {
					if (context.measureText(temp).width < width1) {
						temp += chr[a];
					} else {
						a--;
						row.push(temp);
						temp = "";
					}
				}
				row.push(temp);

				//如果数组长度大于2 则截取前两个
				if (row.length > 2) {
					var rowCut = row.slice(0, 2);
					var rowPart = rowCut[1];
					var test = "";
					var empty = [];
					for (var a = 0; a < rowPart.length; a++) {
						if (context.measureText(test).width < width2) {
							test += rowPart[a];
						} else {
							break;
						}
					}
					empty.push(test);
					var group = empty[0] + "..." //这里只显示两行，超出的用...表示
					rowCut.splice(1, 1, group);
					row = rowCut;
				}
				for (var b = 0; b < row.length; b++) {
					context.fillText(row[b], x, y + b * 16.5, 244);
				}
			},
			canvasToTempFilePath() {
				return new Promise((resolve, reject) => {
					if (this.templateFilePath) {
						resolve(this.templateFilePath)
						return;
					}
					wx.canvasToTempFilePath({
						x: 0,
						y: 0,
						width: 330 * 2,
						height: 464 * 2,
						canvasId: 'myCanvas' + this.id,
						success: res => {
							console.info('canvasToTempFilePath');
							console.info(res);
							resolve(res.tempFilePath)
						},
						fail: (err) => {
							reject(err)
							// this.showError('生成图片失败');
						}
					})
				})
			},

			preview() {
				this.canvasToTempFilePath().then(path => {
					wx.previewImage({
						current: path,
						urls: [path]
					})
				})
			},

			exportImage() {
				console.log('export image');

				this.canvasToTempFilePath().then(path => {
					wx.saveImageToPhotosAlbum({
						filePath: path,
						success: (res) => {
							console.info(path);
							console.info(res);
							uni.showToast('保存成功')
						},
						fail: (err) => {}
					})
				})
			},
		},
	}
</script>

<style lang="less" scoped>
	@import '../css/mzl_base.less';

	.popup {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background: rgba(0, 0, 0, .5);
		text-align: center;
		z-index: 99999999;

		// 生成动态分享图
		.ProductShareImg1 {
			height: 850upx;
			margin-top: -425upx;
		}

		.ProductShareImg2 {
			height: 250upx;
			margin-top: -125upx;
		}

		.ProductShareImg {
			width: 630upx;
			// height: 850upx;
			position: absolute;
			top: 50%;
			left: 50%;
			border-radius: 10upx;
			margin-left: -315upx;

			// margin-top: -425upx;
			.canvasBox {
				overflow: hidden;
				background: #F8F8F8;
				border-radius: 8upx;
				width: 630upx;
				z-index: 99999999;
			}

			.canvasMax {
				height: 850upx;
			}

			.canvasMin {
				height: 290upx;
			}

			.PSIList {
				position: relative;

				.PSIcancle {
					position: absolute;
					top: -70upx;
					right: 0;

					image {
						width: 50upx;
						height: 50upx;
					}
				}

				.Limage {
					width: 100%;
					height: 500upx;
					overflow: hidden;
				}

				.Ltitle {
					padding: 20upx;
					height: 100upx;
					line-height: 40upx;
					background: #fff;
				}

				.Licon {
					padding: 20upx;
					background: #fff;

					image {
						width: 25upx;
						height: 25upx;
						vertical-align: middle;
						margin-right: 20upx;
					}

					.Lzan,
					.Lmessage,
					.Lstar {
						width: 120upx;
					}
				}

				.Lcode {
					padding: 30upx;

					image {
						width: 120upx;
						height: 120upx;
					}

					.LCtext {
						text-align: left;
						margin-left: 20upx;
						line-height: 40upx;
					}
				}

				.PSIsavePhone1 {
					top: 880upx;
				}

				.PSIsavePhone2 {
					top: 350upx;
				}

				.PSIsavePhone {
					position: absolute;
					// top: 880upx;
					color: #fff;
					left: 50%;
					margin-left: -110upx;

					.Phone {
						.buttonRadius(@w: 220upx, @h: 80upx, @bg: rgba(0, 0, 0, .5));
						line-height: 80upx;
					}
				}
			}
		}
	}
</style>
