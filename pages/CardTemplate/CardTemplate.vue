<template>
	<view class="page">

		<view class="top">
	
			<view class="card-template-name">请选择名片模板</view>
			
		</view>

		<view class="card-container" v-if="user.name">
			
				<view v-for="(item,index) in cardTemplateList" :key="index" @click="previewTemplate(index)" :class="{'card-box':true,'active':index==activeIndex && isSelMode}">

						<view class="cardTemplateCanvas-container">
							<image :src="tempFilePaths[index]" class="cardTemplateCanvas-image" ></image>
						</view>

				</view>

		</view>
		<canvas class="cardTemplateCanvas"  style="width: 660px;height: 928px;opacity: 0;" canvas-id="globalCanvas"></canvas>
		<view class="bottomBox">
			<view class="save-button" v-if="!isSelMode" @click="setSelMode">保存到手机</view>
			<template v-else>
				<view class="save-button small cancel" @click="isSelMode=false">取消</view>
				<view class="save-button small" @click="savePhoto(activeIndex)">确认</view>
			</template>
		</view>

		

	</view>
</template>

<script>
	import {mapState} from 'vuex';
	const cardTemplateList = [{
			id: 1,
			name: '财源滚滚'
		},
		{
			id: 2,
			name: '财运亨通'
		},
		{
			id: 3,
			name: '堆金如玉'
		},
		{
			id: 4,
			name: '富贵双全'
		},
		{
			id: 5,
			name: '富贵有余'
		},
		{
			id: 6,
			name: '富甲一方'
		},
		{
			id: 7,
			name: '金玉满堂'
		},
		{
			id: 8,
			name: '日进斗金'
		},
		{
			id: 9,
			name: '招财进宝'
		},
		{
			id: 10,
			name: '招财纳福'
		},
		{
			id: 11,
			name: '财源广进'
		},
		{
			id: 12,
			name: '大展宏图'
		},
		{
			id: 13,
			name: '富贵显荣'
		},
		{
			id: 14,
			name: '富可敌国'
		},
		{
			id: 15,
			name: '金银满屋'
		},
		{
			id: 16,
			name: '璞玉浑金'
		},
		{
			id: 17,
			name: '腰缠万贯'
		},
		{
			id: 18,
			name: '一掷千金'
		},
	];


	import cardList from "./template/cardList.js"

	export default {
		data() {
			return {
				cardTemplateList,
				activeIndex: 0,
				lazyIdMap: {
					1: true,
					2: true
				},			
				isSelMode:false,
				canvasContext:null,
				user: {},
				avatarPath: '',
			}
		},


		computed: {
			...mapState(['tempFilePaths'])
		},

		async onLoad() {
			
			  const user = Object.assign({}, this.currentUser);
			  //console.log(user)
			  user.headImage = user.headImage
				  .replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
				  .replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')

			  uni.showLoading({
			  	title:"加载中"
			  });
			  
			  
			  
			  //二维码
			  let qrcode =  await this.$api.getShareQRCodeUrl();
			  let shareQRCodeUrl =  qrcode.WXCodeUrl || qrcode.shareQRCodeUrl;
			  shareQRCodeUrl = shareQRCodeUrl.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
			  
			  let [error,headImage] = await uni.getImageInfo({src: user.headImage});
			  user.headImage = headImage.path;
			  
			  let [error2,shareQRCodeUrl2] = await uni.getImageInfo({src:shareQRCodeUrl});
			  user.shareQRCodeUrl = shareQRCodeUrl2.path;
			  
			  this.user = user;
			  //读取缓存
			  if(this.tempFilePaths.length!==0){
				  uni.hideLoading();
				  return;
			  }
			  
			
			  this.canvasContext = uni.createCanvasContext("globalCanvas");
				
				for(let i in [...Array(18).keys()]){
					let tempFile = await this.drawCard(i);
					
					this.$store.dispatch('pushCardPath',tempFile);
					uni.showLoading({
					title:"加载中 \n"+Math.floor(i/18*100)+"%"
				  })
				}
				
			
				uni.hideLoading();
			
	
		},

		methods: {
			
		
					
			drawCard(id){
				
				return new Promise((resolve,reject)=>{
					uni.getImageInfo({
						src:`https://xk.gzskxx.com/myqcloud/template/template${Number(id)+1}.jpg`,
						success: (res) => {
							let bgpath = res.path;
							
							let card = cardList['card'+(Number(id)+1)];
					
						let context = this.canvasContext;
					
						context.scale(2, 2);
						
						// 背景uni.upx2px()
						// context.drawImage(background, 0, 0, 330, 464)
						
						context.drawImage(bgpath, 0, 0, 330, 464)
						
						
						//context.drawImage(bg, 0, 0, uni.upx2px(660), uni.upx2px(928))
						// 头像
						// context.drawImage(this.user.headImage, 125, 25, 80, 80)
			
						context.drawImage(this.user.headImage, card.avatar.x/2, card.avatar.y/2, card.avatar.w/2,card.avatar.h/2)

						//职位
						context.setFontSize(card.job.size/2)
						context.setFillStyle(card.job.color)

						//右对齐的文字
						let jobX = card.job.x/2;
						let jobLength = 0;
						if(card.phone.right){
							let textWidth  = context.measureText(this.user.job).width;
							jobLength = textWidth;
							jobX = (660-100)/2 -textWidth;
						}
						// context.fillText(this.user.job, 57, 260)
						context.fillText(this.user.job, jobX, card.job.y/2)

						// 姓名
						context.setFillStyle(card.name.color)
						// context.setFontSize(16)
						context.setFontSize(card.name.size/2)
						//context.setTextAlign('center')
						let nameX = card.name.x/2;
						if(card.phone.right && card.name.right){
							let textWidth  = context.measureText(this.user.name).width;
							nameX = (660-120)/2-jobLength-textWidth;
						}
						context.fillText(this.user.name,nameX, card.name.y/2)
						context.fillText(this.user.name, nameX, card.name.y/2)



						// 公司
						context.setFillStyle(card.company.color)
						// context.setFontSize(18)
						context.setFontSize(card.company.size/2)

						//context.setTextAlign('left')
			// 		context.fillText(this.user.company, 31, 209)
			// 		context.fillText(this.user.company, 31, 209)
						let companyX = card.company.x/2;
						//居中的公司名称
						if(card.company.center){
							let textWidth = context.measureText(this.user.company).width;
							companyX = (20+310 - textWidth)/2;
						}

						context.fillText(this.user.company, companyX, card.company.y/2)
						context.fillText(this.user.company, companyX, card.company.y/2)
						//居中的公司名称
						if(card.company2){
							context.setFillStyle(card.company2.color)
							context.setFontSize(card.company2.size/2)
							let textWidth = context.measureText(this.user.company).width;
							//console.log(textWidth)
							context.fillText(this.user.company, (187+175-textWidth)/2, card.company2.y/2)
							context.fillText(this.user.company, (187+175-textWidth)/2, card.company2.y/2)
						}


						//线条
						if(card.line.color!=""){
							context.setFillStyle(card.line.color)
							context.fillRect(card.company.x/2, (card.company.y+card.company.size-15)/2,context.measureText(this.user.company).width,2);
						}

						// 列表信息
						// context.setFontSize(12)
						//图标
						// context.drawImage(jobIcon, 31, 248, 16, 16)
						context.drawImage(card.icon1.path, card.icon1.x/2, card.icon1.y/2, card.icon1.w/2, card.icon1.h/2)

						// context.drawImage(phoneIcon, 31, 276, 16, 16/2
						context.drawImage(card.icon2.path, card.icon2.x/2, card.icon2.y/2, card.icon2.w/2, card.icon2.h/2)

						// context.drawImage(emailIcon, 31, 304, 16, 16/2
						context.drawImage(card.icon3.path, card.icon3.x/2, card.icon3.y/2, card.icon3.w/2, card.icon3.h/2)


						//职位图标

						if(card.icon4){
							context.drawImage(card.icon4.path, card.icon4.x/2, card.icon4.y/2, card.icon4.w/2, card.icon4.h/2)
						}

						//手机号码 邮箱 签名
						context.setFontSize(card.phone.size/2)
						context.setFillStyle(card.phone.color)
						// context.fillText(this.user.phone, 57, 288)
						//右对齐的文字
						let phoneX = card.phone.x/2;
						if(card.phone.right){
							let textWidth  = context.measureText(this.user.phone).width;
							phoneX = (660-100)/2-textWidth;
						}

						let emailX = card.email.x/2;
						if(card.email.right){
							let textWidth  = context.measureText(this.user.email).width;
							emailX = (660-100)/2 - textWidth;
						}

						let descX = card.desc.x/2;
						if(card.desc.right){
							let textWidth  = context.measureText(this.user.autograph).width;
							descX = (660-100)/2-textWidth;
						}

						context.fillText(this.user.phone, phoneX, card.phone.y/2)
						context.fillText(this.user.email, emailX, card.email.y/2)

						this.drawWrapText(context, this.user.autograph, descX, card.desc.y/2)
						// 底部扫码信息

						context.setFontSize(12)
						context.setFillStyle("#333333")
						// context.drawImage(this.user.shareQRCodeUrl || '', 31, 403, 40, 40)
						context.drawImage(this.user.shareQRCodeUrl || '', card.qrcode.x/2, card.qrcode.y/2,card.qrcode.w/2,card.qrcode.h/2)
						//二维码文字
						context.setFontSize(card.subText.size/2)
						context.setFillStyle(card.subText.color)

						if(card.twoline){
							//context.fillText('扫描或长按二维码', 81, 418)
							context.fillText('扫描二维码快速', card.subText.x/2,card.subText.y/2)
							//context.fillText('可查看名片', 81, 434)
							context.fillText('制作个性名片', (card.subText.x+1.5*card.subText.size)/2, (card.subText.y+card.subText.size+15)/2)
						}else{
							context.fillText('扫描二维码快速制作个性名片', card.subText.x/2, card.subText.y/2)

						}
						
					   
						context.draw(false,e=>{
							
							uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: 330 * 2,
								height: 464 * 2,
								canvasId: "globalCanvas",
								success: res => {
									  console.log(id)
									console.log(res.tempFilePath,"resres")
									resolve(res.tempFilePath);
									//this.templateFilePath = res.tempFilePath;
								},
								fail: (err) => {
									console.log(err,"errerr");
									reject();
								}
							})
							
							
						});
							
							
							
						}
					});
					
		
				});
				
				
			},
			
		
			setSelMode(){
				
				this.isSelMode=true;
				this.activeIndex=0;
			},
			
			previewTemplate(id) {
				//console.log(id)
				if(this.isSelMode){
					this.activeIndex = id;
				}else{
					this.preview(id);
				}
				
				
			},
			
			preview(index){
				//预览图片
				let path = this.tempFilePaths[index];
				console.log(path)
				uni.previewImage({
					current: path,
					urls: this.tempFilePaths
				});
			},
			
			savePhoto(index) {
				//保存图片到相册
				let path = this.tempFilePaths[index];
				
				uni.saveImageToPhotosAlbum({
					filePath:path,
					success: () => {
						uni.showToast('保存成功');
						this.isSelMode=false;
						this.activeIndex=0;
					}
				})
				
			},
		
			
		drawWrapText(context, text, x, y) {
			var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
			var temp = "";
			var row = [];

			for (var a = 0; a < chr.length; a++) {
				if (context.measureText(temp).width < 250) {
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
					if (context.measureText(test).width < 220) {
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
		}
		}
	}
</script>

<style scope lang="less">
	.page {
		box-sizing: border-box;
		
		background-color: #F5F5F5;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		padding-bottom: 120upx;
	}
	
	.cardTemplateCanvas {
	  width: 660px;
	  height: 928px;
	  transform: scale(0.5);
	  position: absolute;
	  top: 0;
	  left: -3000px;
		  // transform: scale(0.5) translate(-50%, -50%);
	}
	
	
	.cardTemplateCanvas-image {
	  width: 198upx;
	  height: 278.4upx;

	}


	.cardTemplateCanvas-container {
	  width: 198upx;
	  height: 278.4upx;
	  overflow: hidden;
		position: relative;
		
		.cardName{
			position: absolute;
			left: 40upx;
			top: 278.4upx;
			font-size: 28upx;
		}
	}

	.top {
		padding: 32upx 30upx;
		overflow: hidden;

		.card-template-name {
			float: left;
			font-size: 32upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			line-height: 45upx;
		}

		.card-swiper-info {
			float: right;

			.current {
				font-size: 36upx;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
				line-height: 50upx;
				letter-spacing: 1upx;
			}

			.total {
				font-size: 24upx;
				color: #999999;
			}
		}

	}

	.card-container {
	    display: flex;
		margin-bottom: 40upx;
		width: calc(100% - 60upx);
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		padding: 0 30upx;
		
		
		.card-box{
			width: 198upx;
			height: 278.4upx;
			position: relative;
			justify-content: center;
			align-items: center;
			margin-top: 50upx;
			
			&.active{
				 &:after {
				  content: "";
				  position: absolute;
				  width: 40upx;
				  height: 40upx;
				  right: 10upx;
				  top: 10upx;
				  background-size: 100% 100%;
				  background-image: url('data:image/png;base64,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');
				}
			}
			
		
		}

		

	}


	
	
	.bottomBox{
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 120upx;
		background-color: white;
		display: flex;
		justify-content: center;
		align-items: center;
		
		.save-button {
			width: 400upx;
			height: 88upx;
			line-height: 88upx;
			background: rgba(107, 122, 248, 1);
			border-radius: 44upx;
			text-align: center;

			font-size: 32upx;
			color: rgba(255, 255, 255, 1);
			letter-spacing: 1upx;
			margin: 0 auto;
			//margin-bottom: 40upx;

			&:active {
				background: rgb(96, 111, 222);
			}
			
			&.small{
				width: 350upx;
			}
			
			&.cancel{
				background: #F5F5F5;
				color:#333;
			}
		}
	}
</style>
