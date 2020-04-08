<template>
	<view class="goods-list">
		<!-- 1 -->
		<view class="goods">
		  <view class="goods-cover-container">
			<image class="goods-cover" src="http://card-1254165941.cosgz.myqcloud.com/static/vip/zhan.jpg"></image>	
			  <image src="http://card-1254165941.cosgz.myqcloud.com/static/vip/bao.png" class="goods-qiang"></image>
		  </view>			 
				<view class="price_area">
					<view  class="goods-name single-line">商品名称</view>						
					<view class="price">
						<view class="xian">现价</view>
						<image src="http://card-1254165941.cosgz.myqcloud.com/static/vip/mon.png" class="fimg"></image>								
						<view class="sur-money">999</view>
						<view class="original-price">¥666666</view>
					</view>
					<view class="btnbox">
							<view class="btn">
								 <view>查看详情 ></view>
							</view>
															
					</view>
			</view>			
		</view>
		<!-- 2 -->
		<view class="goods">
		  <view class="goods-cover-container">
			<image class="goods-cover" src="http://card-1254165941.cosgz.myqcloud.com/static/vip/zhan.jpg"></image>	
			  <image src="http://card-1254165941.cosgz.myqcloud.com/static/vip/bao.png" class="goods-qiang"></image>
		  </view>			 
				<view class="price_area">
					<view  class="goods-name single-line">商品名称</view>						
					<view class="price">
						<view class="xian">现价</view>
						<image src="http://card-1254165941.cosgz.myqcloud.com/static/vip/mon.png" class="fimg"></image>								
						<view class="sur-money">999</view>
						<view class="original-price">¥666666</view>
					</view>
					<view class="btnbox">
							<view class="btn">
								 <view>查看详情 ></view>
							</view>
															
					</view>
			</view>			
		</view>
		<!-- 3 -->
		<view class="goods">
		  <view class="goods-cover-container">
			<image class="goods-cover" src="http://card-1254165941.cosgz.myqcloud.com/static/vip/zhan.jpg"></image>	
			  <image src="http://card-1254165941.cosgz.myqcloud.com/static/vip/bao.png" class="goods-qiang"></image>
		  </view>			 
				<view class="price_area">
					<view  class="goods-name single-line">商品名称</view>						
					<view class="price">
						<view class="xian">现价</view>
						<image src="http://card-1254165941.cosgz.myqcloud.com/static/vip/mon.png" class="fimg"></image>								
						<view class="sur-money">999</view>
						<view class="original-price">¥666666</view>
					</view>
					<view class="btnbox">
							<view class="btn">
								 <view>查看详情 ></view>
							</view>
															
					</view>
			</view>			
		</view>
	</view>
</template>

<script>
	export default {
		name: "surPrise",
		data () {
			return {
			
			}
		}
	}
	
</script>

<style lang="less" scoped>
 .goods-list {
   padding: 0 20upx;
   overflow: hidden;
   display: flex;
   flex-wrap: wrap;
   margin-bottom: 34upx;								
   .goods {
		display: inline-block;
		width: calc(50% - 15upx);
		margin-right: 20upx;
		margin-bottom: 34upx;
		background-color: #fff;
		border-radius: 15upx;
		.btnbox{
			font-size:28upx;
			color: white;							
			.btn{
				width:243upx;
				height:62upx;
				background:linear-gradient(0deg,rgba(76,141,255,1),rgba(138,172,249,1),rgba(75,141,255,1));
				line-height: 62upx;
				text-align: center;
				margin: 0 auto;
				border-radius:31upx;
			}
			
		}
		
	 &:nth-child(2n) {
	   margin-right: 0;
	 }
		
	 .goods-cover-container {
	   width: 100%;
	   padding-bottom: 100%;
	   background: #FF5858;
	   position: relative;
	   // margin-bottom: 24upx;
		border-radius: 15upx;
	}	
	.price_area{
		font-size: 20upx;
		letter-spacing: 3upx;
		text-indent: 10upx;						
		width: 100%;
		color: red;
		height:225upx;
		background:radial-gradient(circle,rgba(252,240,142,0.31),rgba(255,255,255,0.61));
		box-shadow:0px 0px 10px 0px rgba(94,0,123,0.43);
		opacity:0.92;
		border-radius:15upx;
		.price{
			letter-spacing:1rpx;
			height: 90upx;
			line-height: 90upx;
			display: flex;
			.sur-money{
				font-weight: bold;
				font-size:63upx;
				font-family:Adobe Heiti Std R;
				color:rgba(255,0,7,1);
			}
			.original-price {
				text-decoration: line-through;
				font-size:33upx;
				color:rgba(158,158,158,1);
				margin-top: 12upx;

			}
		}
	}
		
	   .goods-cover {
			 width: 100%;
			 height: 100%;
			 position: absolute;
			 left: 0;
			 top: 0;
			border-top-left-radius: 15upx;
			border-top-right-radius: 15upx;
	   }
		.goods-qiang{
			position: absolute;
			width: 82upx;
			height: 82upx;
			left: 20upx;
			top: 20upx
		}
		
	 &.active {
	   .goods-cover-container:after {
		 content: "";
		 position: absolute;
		 width: 40upx;
		 height: 40upx;
		 right: 10upx;
		 bottom: 20upx;
		 background-size: 100% 100%;
		 background-image: url('data:image/png;base64,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');
	   }
	 }
		
	 .goods-name {
	   font-size:28upx;
		color:#999;
	   // color:rgba(51,51,51,1);
	   line-height:40upx;
	   margin-bottom: 20upx ;						
	 }
	.xian{
		position: relative;
		font-size:26upx;
		font-family:Adobe Heiti Std R;
		font-weight:normal;
		color:rgba(161,106,49,1);
		margin-top: 10upx;
	}
	.fimg{
		position: absolute;
		width: 30upx;
		height: 30upx;
		margin-left: 20upx;
	}
	 .price-container {
	   display: flex;
	   align-items: flex-end;
	   height: 40upx;
		
	   .goods-price {
		 display: inline-block;
		 height: 40upx;
	   }
	   
	 }
   }
 }
</style>
