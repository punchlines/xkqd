<template>
	<view class="container">
		<!-- <topTabBarComponents id="topTabBar" bindtap="showToast" title="圈子二维码" backShow="true"></topTabBarComponents> -->
		<canvas class="TemplateCanvas"  style="width: 694px;height: 887px; opacity: 0;position: absolute;top:-9000px;left: -9000px;" canvas-id="globalCanvas"></canvas>
		
		
		<image @click="previewImage" class="codeImage" :src="tempFilePath" mode="widthFix"></image>
		
		
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
  import {roundRect} from '@/js/util.js'
  export default {
    components: {CircleAvatar},
    data() {
      return {
        qrcodeUrl: '',
        avatar: '',
        images: '',
        name: '',
		tempFilePath:'',
		canvasContext:null
      };
    },

	 onLoad (option) {
      const { id } = option;
	  this.canvasContext = uni.createCanvasContext("globalCanvas");
	  this.showLoading("二维码生成中");
	  const userId = uni.getStorageSync('userId');
      this.$api.getCardCircleDetail(id).then(async result => {
		const ctx = this.canvasContext;
        this.avatar = result.mpCardCircle.headImage
        this.images = result.headImage;
        this.name = result.mpCardCircle.name;
		this.qrcodeUrl = `https://xk.gzskxx.com/QRCODE/?app=qr.get&data=https://xk.gzskxx.com/joinCircle/${id}_${userId}&level=L&size=6`;
		ctx.textBaseline = "top";
		//绘制白色背景
		ctx.setFillStyle('#ffffff');
		ctx.fillRect(0,0,694,887);
		ctx.fill();
		//绘制头像容器
		ctx.setFillStyle('#F1F1F1');
		ctx.fillRect(26,29,105,105);
		ctx.fill();
		
		//绘制群员头像
		for(let i=0;i<4;i++){
			const item = this.images[i];
			if(!item) break
			let [err3,res3] = await uni.getImageInfo({
				src:item.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
								.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
			})
			let head = res3.path;
			ctx.drawImage(head,26+((i+1)%2==0?16+42:8),29+(i<2?8:16+42),42,42);
		}

		//绘制群名
		ctx.font = "bold";
		ctx.setFillStyle('#000000');
		ctx.setFontSize(32);
		ctx.fillText(this.name,150,64);
		
		let hasPin = false;
		
// 		if(result.mpCardCircle.joinType|0 == 5){
// 			//获取是否有拼团商品 有就获取detail
// 			let PinList =  await this.$api.pinList(id);
// 			if(PinList.length>0){
// 				//获取商品名称 封面图 以及sku 价格 最高返利
// 				const pid = PinList[0].id;
// 				const pinDetail = await this.$api.pinDetail(pid);
// 				
// 				var fanMax = pinDetail.conditions.pop().rebateAmount;
// 				var goodsId = pinDetail.goodsId;
// 				
// 				const goodsDetail = await this.$api.getGoodsDetail(goodsId);
// 				
// 				var {title,preferentialPrice,coverImage} = goodsDetail.goodsDetail;
// 				
// 				//获取sku
// 				var sku = await this.$api.getGoodsSku(goodsId);
// 				
// 				sku = sku.orderSku[0].name+" - "+sku.orderSku[0].sku[0].name;
// 
// 				hasPin=true;
// 				
// 			}else hasPin = false; //没有拼团
// 		}else hasPin = false; //不是拼团圈
		
		
		
		//如果是普通圈 直接绘制大二维码 
		
		if(hasPin){
			
			var [x,y,w,h] = [135,397,428,428];
		}else{
			var [x,y,w,h] = [67,205,560,560];
		}
		
		//二维码边框
		ctx.setStrokeStyle("#898989");
		ctx.setLineWidth(3)
		ctx.strokeRect(x,y,w,h);
		//二维码
		let [err,resx] = await uni.getImageInfo({src:this.qrcodeUrl});
		let qrpath = resx.path;
		ctx.drawImage(qrpath,x,y,w,h);
		
		//--------下面是拼团 有商品才绘制的 ------------
		
		if(hasPin){
				//拼团中
			ctx.setFillStyle('#6B78FA');
			ctx.setFontSize(36);
			ctx.fillText("拼团中",25,148);
			//最高返现
			ctx.setFillStyle('#FF0000');
			ctx.setFontSize(18);
			ctx.fillText("拼团最高返利：¥"+fanMax,496,162);
			//圆角商品框
			ctx.setFillStyle('rgba(107,120,250,0.2)');
			roundRect.call(ctx,26,197,633,188,10).fill();
			
			//快来长按识别二维码参与拼团吧！
			ctx.setFillStyle('#6B7AF9');
			ctx.setFontSize(26);
			ctx.fillText("快来长按识别二维码参与拼团吧！",170,834);
			
			//商品图片
			//https://card-1254165941.picgz.myqcloud.com/tmp_10207c087737cb918a2af78c471e5907.jpg
			let [err2,res2] = await uni.getImageInfo({
				src:coverImage.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
								.replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/')
			});
			
			let goodbg = res2.path;
			ctx.drawImage(goodbg,44,215,151,151);
			//商品名称
			
			let goodsName = title;
			ctx.setFillStyle('#000000');
			ctx.setFontSize(30);
			ctx.font = 'bold 30px';
			console.log(ctx.measureText(goodsName).width)
			if(ctx.measureText(goodsName).width>128) 
				goodsName = goodsName.split('').splice(0,12).join('')+"...";
			
			ctx.fillText(goodsName,232,212);
			
			//sku
			ctx.setFillStyle('#999999');
			ctx.setFontSize(22);
			ctx.fillText(sku,233,262);
			
			//拼团价
			ctx.setFillStyle('#333333');
			ctx.setFontSize(27);
			ctx.fillText("拼团价:",233,316);
			
			let price = "¥"+(Number(preferentialPrice).toFixed(2));
			ctx.setFillStyle('#FF0000');
			ctx.setFontSize(37);
			ctx.fillText(price,233+90,316-10);
			
		}

		
		
		
		ctx.draw(false,e=>{
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
							console.log(err,"errerr");
							
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
			previewImage () {
				if (!this.tempFilePath) return;
				uni.previewImage({
					urls: [this.tempFilePath],
					current: this.tempFilePath,
				});
			},
		}

  }
</script>

<style lang="less">
	@import '../../css/mzl_base.less';
	.container{
		
		.codeImage{
			width: 694upx;
			height: 887upx;
			position:absolute;top:50%;left:50%;margin-left:-345upx;margin-top:-415upx;
			// border: 1px solid red;
		}
		
		
		width:100%;height:100%;background: #333;position:fixed;top:0;left:0;
		.cicleCOdeB{
        width:690upx;height:830upx;position:absolute;top:50%;left:50%;margin-left:-345upx;margin-top:-415upx;
        .CCcode{
            width:690upx;height:830upx;background:#fff;margin:0 auto;
            .CCTitle{
                padding:30upx;box-sizing:border-box;font-weight: bold;font-size:32upx;color:#333;;
				display: flex;
				align-items: center;
                .CCima{
					width:102upx;height:102upx;
					margin-right: 20upx;
                }
                .CCname{
					flex: 1;
                }
            }
            .CCcodeM{
                width:610upx;height: 610upx;;position: relative;border:1px solid #eee;left:30upx;
                .codeMd{
                    width:560upx;height: 560upx;position: absolute;top:0;left:0;bottom:0;right:0;margin:auto;
					image{width:100%; height: 100%}
				}
            }
        }
    }
}
</style>
