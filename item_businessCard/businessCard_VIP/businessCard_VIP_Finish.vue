<template>
  <view class="page">
		<title-bar title="开通成功"></title-bar>
		
		<view class="content_box">
			<view class="tipText">恭喜您成为店主</view>
			<view class="tipText_small">您现在可以</view>
			
			<view class="btn_box">
				
				<view class="btn-primary btn-white">邀请好友开店</view>
				
				<view class="btn-primary">填写店铺信息</view>
				
			</view>
			
			<view class="textBox">
				
				<view>好友购买商品您将获得提成</view>
				<view>信息完善后即可发布商品</view>
			</view>
			
		</view>
		
		
		<!-- 保存成功弹框 -->
		<view class="saveModel fx-row fx-row-center fx-col-center" style="z-index: 100;" v-if="isSave">
			<view class="saveCon fx-column fx-row-center">
				<!-- https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png -->
				<image v-if="!isLoading"  :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/save.png'" mode="widthFix"></image>
				<image v-else class="rotate" :src="'https://card-1254165941.picgz.myqcloud.com/wx638efb2b7bd5fecc.o6zAJs2r1bMrWHaOln0s72530D84.PNG2pUobGhA6a86fa0885c0be339572cc464ec247561.png'" mode="widthFix"></image>
				<view class="succ">{{isLoading?'请稍等，正在开通':'店铺开通成功'}}</view>
				<view class="txt">{{isLoading?'您的店铺正在开通,请耐心等待1-2分钟,以免开通失败':'点击按钮返回首页'}}</view>
			<!-- 	<view class="bindC but" @click="bindCa">绑定银行卡</view> -->
				<view v-if="!isLoading" class="shop but" @click="retIndex">回到首页</view>
			</view>
		</view>
  
  </view>

</template>

<script>
 

  export default {

  

    data () {
      return {
    
		isSave:false, //点击保存按钮后展示弹窗
		isLoading:true,
				
      }
    },

    onShow () {
    
    },
		
		computed:{
			
			
		},
		

    methods: {
	
			
    },
		onLoad(options) {
			
		}
  }

</script>

<style scoped lang="less">

@keyframes rotateicon{
	0%{
		transform: rotate(0deg)
	}
	
	100%{
		transform: rotate(360deg)
	}
}



  .page {
    background-color: #f5f5f5;
 
    box-sizing: border-box;
    min-height: 100vh;
	
		.rotate{
		animation: rotateicon 3s infinite linear;
	}
	
		// 弹出层
	.saveModel{
		position: fixed;width: 100%;height: 100%;top: 0;left: 0;background: rgba(0,0,0,0.5);z-index: 1;
		.saveCon{
			width: 84%;margin: 0 auto; background: #FFFFFF;box-sizing:border-box;padding:40upx;border-radius:20upx;
			image{width: 120upx;height: 120upx;margin-top:10upx}
			.succ{font-size: 36upx;color: #333333;margin: 32upx 0 20upx 0;}
			.txt{font-size: 28upx;color: #666666;margin: 20upx 0 50upx 0;text-align: center;}
			.but{width:100%;height: 80upx;line-height: 80upx;text-align: center;font-size: 28upx;border-radius: 40upx;}
			.bindC{ border: 1px solid #6B7AF8;color: #6B7AF8;margin-bottom: 24upx;}
			.shop{ border: 1px solid #CCCCCC;color: #CCCCCC}
		}
	}
	
	
	.content_box{
		padding-top: 200upx;
		.tipText{
			text-align: center;
			font-size: 50upx;
		}
		.tipText_small{
			text-align: center;
			font-size: 35upx;
		}
		
		.btn_box{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top:100upx; 
			    .btn-primary {
				  width: 45%;
					margin-left: 3%;
				  font-size: 32upx;
				  color: #FFFFFF;
						height: 80upx;
						line-height: 80upx;
						
						&.btn-white{
							background-color: #f1c372;
							color: #ffffff;
							
						}

			   

				}
		}
		
		.textBox{
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20upx;
			
			view{
				width: 45%;
				text-align: center;
				font-size: 25upx;
				color: red;
			}
		}
		
	}
		
  }





</style>