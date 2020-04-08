<template>
	<view class="page">
		<image @click="preview" style="width:100%" mode="widthFix" :src="tempFilePath"></image>
		<canvas class="TemplateCanvas"  style="width: 750px;height: 1206px; opacity: 0;position: absolute;top:-9000px;left: -9000px;" canvas-id="globalCanvas1"></canvas>
		
		<button class="flowBtn" @click="download">
			下载海报
		</button>
		<button open-type="share" class="flowBtn blue">
			分享好友
		</button>
	</view>
	
</template>

<script>
	import {roundRect} from '@/js/util.js'
	
	export default{
		data(){
			return {
				bgpath:"",
				canvasContext:null,
				qrpath:'',
				tempFilePath:'',
				goodsImage:'',
				pid:0,
	
			}
		},
		
		onShareAppMessage(res) {
				// if(this.overtime<=0) return this.showError('拼团已结束');
				let rid = this.currentUser.id || 67;
				if(this.showShareModal) this.showShareModal = false;
				return {
					title: "快来加入我的团",
					path: '/item_pinGroup/businessCC_joinGroup/businessCC_joinGroup?id=' + this.pid + '&recommendId=' +
						rid,
				}
	
		},
			
		async onLoad(option){
			console.log(option)
			
			const {
					goodsName,
					price,
					sku,
					cdtext,
					cover,
					id,
					oprice
			} = option;
			this.pid = id;
			const recId = this.currentUser.id; //推荐人Id
			this.showLoading("海报生成中");
			//获取背景
			this.canvasContext = uni.createCanvasContext("globalCanvas1");
			
			let [error,bg] = await uni.getImageInfo({src: 'https://xk.gzskxx.com/myqcloud/images/posterBg.jpg'});
			this.bgpath = bg.path;
			//获取二维码
			let [error2,qrbg] = await uni.getImageInfo({src: `https://xk.gzskxx.com/QRCODE/?app=qr.get&data=https://xk.gzskxx.com/joinGroup/${id}_${recId}&level=L&size=6`});
			this.qrpath = qrbg.path;
			
			//获取商品图片
			let [error3,goodbg] = await uni.getImageInfo({
				src:cover.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
								.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
			})	
			this.goodsImage = goodbg.path;
					
			this.draws(goodsName,price,sku,cdtext,oprice,option.proxyGain);
		},
			
		methods:{
			draws(goodsName,price,sku,cdtext,oprice,proxyGain){
				const context = this.canvasContext;
				context.textBaseline = "bottom"
				//绘制背景
				context.drawImage(this.bgpath, 0, 0, 750, 1206);
				//绘制边框
				context.fillStyle = "rgba(255,255,255,0.8)";
					
				roundRect.call(context,26,460,690,727,35).fill();
				
				//绘制二维码
				context.drawImage(this.qrpath, 173.5, 760, 404, 404);
				
				//绘制条件
				context.setFontSize(30);
				// this.drawWrapText(context,cdtext,111,370);
				//绘制商品图片
				context.drawImage(this.goodsImage, 76, 510, 151, 151);
				

				context.font="30px Arial";
				
				context.setFillStyle("#000000")
				
				//超出宽度的处理
				
				
				if(context.measureText(goodsName).width>404){
					goodsName = goodsName.split('').splice(0,12).join('')+"...";
				}

				context.fillText(goodsName, 263, 510);
				
				context.setFontSize(27);
				
				context.fillText("拼团价:", 263, 651);
				
				//参团立返**元 //最高省
				let fan = cdtext.split("，").pop();
				//let str = '每人返10元'
				fan = fan.match(/每人返(\S*)元/)[1];
				
				

				context.setFillStyle("#FF0000")
				
				context.setFontSize(47);
				
				context.fillText("参团立返"+Number(fan)+"元现金", 263, 730);
			
				
				context.setFontSize(30);
				
				context.setFillStyle("#989898");
				
				context.fillText(sku, 263, 573);
				
				context.setFontSize(47)
				
				price = (Number(price).toFixed(2))+"元";
				
				context.setFillStyle("#FFFFFF");
				
				context.fillText(price, 263+110, 651);
				
				
				//赚 proxyGain
				//计算宽度
				context.setFillStyle("#FFFFFF")
				
				context.setFontSize(47);
				
				
				let text1W = context.measureText("购买商品立省").width+10;
				
				let text3W = context.measureText("元").width;
				
				context.setFillStyle("#ffc556")
				
				context.setFontSize(55);
				
				let text2W = context.measureText(fan).width+10;
				
				console.log(text1W)
				
				// //起始X
				
				let fX = (750 - (text1W+text2W+text3W))/2;

				context.setFillStyle("#FFFFFF")
				
				context.setFontSize(47);
				
				context.fillText("购买商品立省", fX, 300);
				
				context.fillText("元", fX+text1W+text2W, 300);
				
				context.setFillStyle("#ffc556")
				
				context.setFontSize(55);
				
				context.fillText(fan, fX+text1W, 300);
				
				
				let text4W = context.measureText(proxyGain).width+10;
				
				let fX2 = (750 - (text1W+text4W+text3W))/2;
				
				context.setFillStyle("#FFFFFF")
				
				context.setFontSize(47);
				
				context.fillText("分享好友立赚", fX2, 370);
				
				context.fillText("元", fX2+text1W+text4W, 370);
				
				context.setFillStyle("#ffc556")
				
				context.setFontSize(55);
				
				context.fillText(proxyGain, fX2+text1W, 370);
				
				
				context.draw(false,e=>{
					uni.canvasToTempFilePath({
								x: 0,
								y: 0,
								width: 750,
								height: 1206,
								canvasId: "globalCanvas1",
								success: res => {
									 
									this.tempFilePath = res.tempFilePath;
									this.hideLoading();
								},
								fail: (err) => {
									console.log(err,"errerr");
									
								}
							})
				});
			},
			
			//预览
			preview(){
				if(!this.tempFilePath) retuen;
				uni.previewImage({
					urls:[this.tempFilePath]
				})
			},
			
			//下载
			download(){
				if(!this.tempFilePath) retuen;
				uni.saveImageToPhotosAlbum({
					filePath:this.tempFilePath,
					complete:()=>{
						this.showTips("保存完成");
					}
					
				})
			},
			
			drawWrapText(context, text, x, y) {
			var chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
			var temp = "";
			var row = [];

			for (var a = 0; a < chr.length; a++) {
				if (context.measureText(temp).width < 510) {
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
				context.fillText(row[b], x, y + b * 40, 510);
			}
		}
			
		}
	}
	
</script>

<style lang="less">
	.page{
		background: rgb(167,57,190);
		min-height: 100vh;
	}
	
	.flowBtn{
		position: fixed;
		width:300upx;
		height:70upx;
		background:rgba(255,187,69,1);
		border-radius:35upx;
		font-size:30upx;
		font-family:PingFangSC-Regular;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:70upx;
		bottom:29upx;
		left:58upx;
		&.blue{
			background:rgba(101,121,254,1);
			left:384upx;
		}
	}
</style>
