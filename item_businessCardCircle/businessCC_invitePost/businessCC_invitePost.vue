<template>
	<view>
		<view class="container share__canvas share__canvas1" id="wrapper" @click="save">

						 
			<image class="share__canvas1-image draw_canvas" :src="bg"  data-type="image" :data-url="bg"  style="background-color: #fff;width: 750rpx;height: 1334rpx;position: absolute;top: 0;left: 0;z-index: -999;"></image>
			
			<view class="image-wrapper draw_canvas" v-if="options.post">
			   <image class="draw_canvas" :src="posturl" data-type="image" :data-url="posturl" style="background-color: #000000;" />
			 </view>
			 
			 <view class="image-wrapper draw_canvas" v-else>
				 <view class="draw_canvas image"></view>
			
			  </view>
			
			<view class="title share__canvas1-text draw_canvas"  data-type="text" :data-text="options.name">
				{{options.name}}
			</view>
			
				<view class="subTitle draw_canvas"   data-type="text" :data-text="options.subTitle">
						{{options.subTitle}}
				 </view>
				 
				 
				 <view class="contentbox draw_canvas">
				 	<view class="draw_canvas descbox">
				 		<view class="desc draw_canvas"  v-for="(item,index) in options.intro" :key="index" :data-text="item" data-type="text" v-if="index<6">
				 			{{item}}
				 		</view>
				 	</view>
				 	
				 	<view class="draw_canvas codebox">
				 			
				 		<view class="image-wrapper draw_canvas">
							<image class="draw_canvas code" style="border: none;"  data-type="image"  :src="qrcodeUrl" :data-url="qrcodeUrl" />
				 		</view>
				 	</view>
				 	
				 </view>

		</view>
		<view class="post2Box">
			<image class="bottomPost" src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/191228/invitePost2.jpg" style="width: 100%;"  mode="widthFix"></image>
			<view class="priceText">您将获得{{options.price}}元佣金</view>
		</view>
		
		<canvas canvas-id="canvas1"  class="share__canvas share-canvas"></canvas>

	</view>
</template>

<script>
	import Wxml2Canvas from './wxml2/index.js'; 
	
	export default {
		data() {
			return {
				tempFilePath:'',
				src:"",
				post:null,
				qrcodeUrl:"",
				posturl:"",
				bg:'',
				options:{
					
				},
				 imgs: [],
				 drawImage1:null
			};
		},
		
		
		async onLoad(options) {
			 let {id,price,intro,name,subTitle,post} = options;
			this.options = options;
			uni.showLoading({
				mask:true
			})
			 options.name = options.name.length<=12?options.name:options.name.substr(0,12)
			 options.subTitle = options.subTitle.length<=12?options.subTitle:options.subTitle.substr(0,12)
			 options.subTitle = options.subTitle?options.subTitle.replace(/([a-zA-Z0-9]{1})/g,'$1'):""
			 options.post =  options.post? options.post.replace('https://wx.qlogo.cn/', 'https://xk.gzskxx.com/wechat_image/')
			 .replace('http://card-1254165941.cosgz.myqcloud.com/', 'https://xk.gzskxx.com/myqcloud/'):null;
			 options.intro = options.intro.length>8*16?options.intro.substr(0,8*16)+"...":options.intro
			  options.intro = options.intro.split('\n');
			 const userId = this.currentUser.id;
			 const qrcodeUrl = `https://xk.gzskxx.com/QRCODE/?app=qr.get&data=https://xk.gzskxx.com/joinCircle/${id}_${userId}&level=L&size=6`;
			 let [error,code] = await uni.getImageInfo({src: qrcodeUrl});
			 if(options.post){
				  let [error2,post2] = await uni.getImageInfo({src:  options.post});
				  this.posturl = post2.path;
			 }
			
			 let [error3,bg] = await uni.getImageInfo({src: "https://xk.gzskxx.com/myqcloud/191228/postcircle.jpg"});
			 console.log(bg)
			 this.bg = bg.path;
			this.qrcodeUrl   = code.path;

			
			//创建节点选择器
			const query = wx.createSelectorQuery()
			    query.select('#wrapper').boundingClientRect()
			    query.selectViewport().scrollOffset()
			    query.exec( (res)=> {
			      res[0].top       // #the-id节点的上边界坐标
			      res[1].scrollTop // 显示区域的竖直滚动位置
			      const height = res[0].height
				  this.drawCanvas(height)
			    })
			
		},
		
		methods:{
			
		
			
			save(){

				if(this.tempFilePath)
					uni.previewImage({
						urls:[this.tempFilePath]
					})
				

			},
			
			
			drawCanvas(height){
				
				
				let self = this;
				this.drawImage1 = new Wxml2Canvas({
					width: 375,
					height: 667,
				    element: 'canvas1',
				    background: '#f0f0f0',
				    progress (percent) {
				    },
				    finish:(url)=> {
				        let imgs = self.imgs;
				        imgs.push(url);
							
				        self.imgs = imgs;
						
						uni.canvasToTempFilePath({
									x: 0,
									y: 0,
									width: uni.upx2px(750),
									height: height,
									canvasId: "canvas1",
									success: res => {
										this.tempFilePath = res.tempFilePath;
										
										this.hideLoading();
									},
									fail: (err) => {
										console.log(err,"errerr");
										this.hideLoading();
									}
								})
				    },
				    error (res) {
				    }
				});
							
				let data = {
				    list: [{
				        type: 'wxml',
				        class: '.share__canvas1 .draw_canvas',
				        limit: '.share__canvas1',
				        x: 0,
				        y: 0
				    }]
				}
							
				this.drawImage1.draw(data);
			
						
			}
		}
	}
</script>

<style lang="less">
Page{
	height: 100vh;
	background-color: #fff;
}

.post2Box{
	position: relative;
	.priceText{
		position: absolute;
		font-size: 25rpx;
		text-align: center;
		top: 195rpx;
		left: 550rpx;
		color: #333;
		width: 140rpx;
		
	}
}
.share__canvas{
	height: 1334rpx;
	width: 750rpx;
}
.container {

  box-sizing: border-box;
  padding: 0;
  display: flex;
  flex-direction: column;
  // background-color: #7087f1;
  position: relative;
  // background-image: url(https://card-1254165941.cos.ap-guangzhou.myqcloud.com/191228/postcircle.jpg);
  // background-size: 100%;
  // opacity: 0;
 
} 
.join{
	color: white;
	font-size: 50rpx;
	position: absolute;
	top:250rpx;
	left: 170rpx;
}
.tip{
	margin-top: 50rpx;
}
.btn{
	width: 730rpx;
	margin: 20rpx 0 0 10rpx;
	background-color: white;
	border-radius: 5rpx;
	text-align: center;
	height: 80rpx;
	line-height: 100rpx;
	.btntext{
		height: 80rpx;
		line-height: 100rpx;
		
	}
	
}

.contentbox{
	// position: relative;
	width: 730rpx;
	padding: 0 10rpx;
	 // min-height: 250rpx;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	.descbox{
		width: 450rpx;
		margin-top: 40rpx;
		max-height:300rpx ;
		overflow-y: hidden;
		// position: absolute;
		// left: 10rpx;
		
	}
	.desc{
		color: white;
		font-size: 30rpx;
		line-height: 35rpx;
		
	}
	
	.codebox{
		width: 200rpx;
		
		// position: absolute;
		// right: 10rpx;
		.scanjoinbox{
			background-color: red;
			color: white;
		
			text-align: center;
			font-size: 28rpx;
			
			.scanjoin{
				position: relative;
				top:2rpx;
			}
		}
		.code{
			width: 200rpx;
			height: 200rpx;
			margin: 0;
			margin-top: 70rpx;
		}
		
	}
}
	
.title{
	font-size: 60rpx;
	line-height: 63rpx;
	color: white;
	text-align: left;
	// width: 48rpx;
	margin-top: 40rpx;
	margin-bottom: 10rpx;
    width: 730rpx;
	margin-left: 10rpx;
}

.subTitle{
	font-size: 40rpx;
	line-height: 52rpx;
	color: white;
	text-align: left;
	margin-left: 10rpx;
	// width: 48rpx;
	// position: absolute;
	// // margin-bottom: 40px;
	// top:50rpx;
	// right:90rpx;
	
}

// .container .title {
//   font-size:36rpx;
//   text-align: left;
//   margin-bottom: 10rpx;

// }

.container .image-wrapper image{
  width: 505rpx;
  height: 635rpx;
  border: 2px solid #fff;
  margin: 30rpx 0 0 120rpx;
  
  
}
.container .image-wrapper .image{
  width: 505rpx;
  height: 708rpx;
  margin: 30rpx 0 0 120rpx;
}

.generate-btn {
  margin-top: 40rpx;
}

.share-canvas {
  position: absolute;
  left: -2000rpx;
  top:-2000rpx
  // background: transparent;
}
</style>
