<template>
	<view class="creat" @click="close">
		<view class="imgBox" @click.stop="noPop"> 
			<view class="img">
				<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/open.png"></image>
				<view class="btn">
					<view class="del" @click.stop="close">取消</view>
					<view class="shoping" @click.stop="go">去购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		data(){
			return {}
		},
		methods:{
			go(){
				this.$emit('go')
			},
			close(){
				this.$emit('close');
			},
				
			noPop(){
			}
			
		}
		
	}
</script>

<style lang="less">
	.creat{
		width:100%;
		height:100%;
		background:rgba(0,0,0,0.5);
		position:fixed;
		top:0;
		left:0;
		.imgBox{
			width:550upx;
			height:544upx;
			position:absolute;
			top:50%;
			left:50%;
			margin-left:-275upx;
			margin-top:-272upx;
			z-index: 999;
			.img{
				width: 550upx;
				height: 544upx;
				margin: 0 auto;
				border-radius: 5upx;
				image{
					width: 550upx;
					height: 544upx;
				}
				.btn{
					display: flex;
					.del{
						width:230upx;
						height:65upx;
						background:rgba(255,187,69,1);
						border-radius:33upx;
						margin: 0 auto;
						color: #fff;
						font-size: 36upx;
						font-weight: bold;
						line-height: 65upx;
						text-align: center;
						position: absolute;
						left: 37upx;
						bottom: 61upx;
					}	
					.shoping{
						width:230upx;
						height:65upx;
						background:rgba(107,120,250,1);
						border-radius:33upx;
						margin: 0 auto;
						color: #fff;
						font-size: 36upx;
						font-weight: bold;
						line-height: 65upx;
						text-align: center;
						position: absolute;
						left: 290upx;
						bottom: 61upx;
					}
				}
			}
		}
		
	}
	
	
</style>

