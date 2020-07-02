<template>
	<view class="creat" @click="close">
		<view class="imgBox" @click.stop="noPop"> 
			<view class="img">
				<image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/join.png"></image>
				<view class="content" >
					<text >{{ isVipStatus==2?'您的vip已过期，此功能仅限vip使用，请先续费或升级vip':'您还不是vip会员哦!此功能只限平台vip使用,普通用户可选择自己喜欢的商品,支付后便可代理此商品!'}}</text>
				</view>
				<view class="btn">
					<view class="del" @click.stop="proxy">找商品代理</view>
					<view class="shoping" @click.stop="go">{{isVipStatus==2?'续费或升级':'开通vip自己开团'}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default{
		 props:{
		            isVipStatus:{
		                type:String,
		                default:"0"
		            }
		        },
		data(){
			return {
				
			}
		},
		onLoad(){
			
		},
		onShow() {
		
		},
		methods:{
			go(){
				this.$emit('go')
			},
			close(){
				this.$emit('close');
			},
			
				
			proxy(){
					this.$emit('proxy');
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
		z-index: 99;
		.imgBox{
			width:660upx;
			height:670upx;
			position:absolute;
			top:50%;
			left:50%;
			margin-left:-330upx;
			margin-top:-335upx;
			z-index: 999;
			.img{
				width: 660upx;
				height: 670upx;
				margin: 0 auto;
				border-radius: 5upx;
				image{
					width: 660upx;
					height: 670upx;
				}
				.content{
					position: absolute;
					width:560upx;
					height:144upx;
					font-size:34upx;
					font-family:PingFangSC-Regular;
					font-weight:400;
					color:rgba(102,102,102,1);
					line-height:55upx;
					left: 46upx;
					bottom: 160upx;
				}
				.btn{
					display: flex;
					.del{
						width:300upx;
						height:70upx;
						background:rgba(255,187,69,1);
						border-radius:33upx;
						margin: 0 auto;
						color: #fff;
						font-size: 36upx;
						font-weight: bold;
						line-height: 70upx;
						text-align: center;
						position: absolute;
						left: 16upx;
						bottom: 44upx;
					}	
					.shoping{
						width:300upx;
						height:70upx;
						background:rgba(107,120,250,1);
						border-radius:33upx;
						margin: 0 auto;
						color: #fff;
						font-size: 36upx;
						font-weight: bold;
						line-height: 70upx;
						text-align: center;
						position: absolute;
						left: 338upx;
						bottom: 44upx;
					}
				}
			}
		}
		
	}
	
	
</style>

