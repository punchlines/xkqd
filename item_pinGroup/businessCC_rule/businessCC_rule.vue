<template>
	<view class="business_rule">
		<view class="rule">
			<view class="topRule">
				<text class="pin">拼团规则</text>
				<text class="ren">人人拼人人赚</text>
			</view>
		</view>
		<view class="getMon">
			<view class="img">
				<video  class="img"
				 poster="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/poster.jpg"
				 src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/cardImages/vdo.mp4"
				 :controls="true"></video>
				<!-- <image src="https://card-1254165941.cos.ap-guangzhou.myqcloud.com/tuan/bannerr.png"></image> -->
			</view>
			<view class="quick">
				<view class="look">一键参团,查看返现</view>
				<view class="ding">
					<view class="zhi">置顶</view>
					<view class="liu">浏览
						<text class="num">300</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="content">
			<view class="look">参考公告</view>
			<view class="content-list" @click="can">
				<view class="title">参团流程步骤</view>
				<view class="conTime">
					<text>2019-05-26</text>
					<text style="margin-left: 23upx;">16:40:14</text>
				</view>
			</view>
			<view class="content-list" @click="kai">
				<view class="title">开团流程步骤</view>
				<view class="conTime">
					<text>2019-05-26</text>
					<text style="margin-left: 23upx;">16:40:14</text>
				</view>
			</view>
			
			<view class="content-list" @click="xiang">
				<view class="title">成为团长,开团赚钱</view>
				<view class="conTime">
					<text>2019-05-26</text>
					<text style="margin-left: 23upx;">16:40:14</text>
				</view>
			</view>
			
			<view class="content-list" @click="payXiang">
				<view class="title">团长收益来源</view>
				<view class="conTime">
					<text>2019-05-26</text>
					<text style="margin-left: 23upx;">16:40:14</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			can(){
				this.navigateTo("../businessCC_xiang/businessCC_can");
			},
			kai(){
				this.navigateTo("../businessCC_xiang/businessCC_kai");
			},
			xiang(){
				this.navigateTo("../businessCC_xiang/businessCC_xiang");
			},
			payXiang(){
				this.navigateTo("../businessCC_xiang/businessCC_payXiang");
			},
		},
	}
</script>

<style lang="less" scoped>
	.business_rule{
		background: #f5f5f5;
		height:1207upx;
		width: 100%;
	}
	.rule{
		padding-top: 20upx;
		.topRule{
			width:690upx;
			height:90upx;
			background:rgba(255,255,255,1);
			line-height: 65upx;
			text-align: center;
			margin: 0 auto;
			text{
				display: block;
				height: 30upx;
				color:rgba(107,120,250,1);
			}
			.pin{
				font-size: 30upx;
			}
			.ren{
				font-size: 18upx;
			}
		}
	}
	.getMon{
		margin-top: 19upx;
		.img{
			width: 690upx;
			height: 300upx;
			border-radius: 10upx;
			margin: 0 auto;
			image{
				width: 690upx;
				height: 300upx;
			}
		}
		.quick{
			width:690upx;
			height:212upx;
			margin: 0 auto;
			background:rgba(255,255,255,1);
			border-left: 1upx solid #fff;
			border-right: 1upx solid #fff;
			border-bottom: 1upx solid #fff;
			.look{
				width: 90%;
				height: 106upx;
				line-height: 106upx;
				margin: 0 auto;
				border-bottom: 1upx solid #f5f5f5;
				font-size: 32upx;
				font-weight: bold;
				color: #333;
				letter-spacing: 3upx;
			}
			.ding{
				width: 90%;
				display: flex;
				margin: 0 auto;
				.zhi{
					width:160upx;
					height:70upx;
					background:rgba(107,120,250,1);
					border-radius:15upx;
					font-weight:bold;
					line-height: 70upx;
					color:rgba(255,255,255,1);
					font-size: 32upx;
					text-align: center;
					margin-top: 15upx;
				}
				.liu{
					line-height: 145upx;
					text-align: right;
					font-size:20upx;
					font-weight:bold;
					color:rgba(153,153,153,1);
					margin-left: 379upx;
				}
			}
		}
	
	}
	.content{
		width: 690upx;
		background: #fff;
		border: 1upx solid #fff;
		border-radius: 5upx;
		margin: 0 auto;
		margin-top: 23upx;
		.look{
			width: 90%;
			height: 106upx;
			line-height: 106upx;
			margin: 0 auto;
			border-bottom: 1upx solid #f5f5f5;
			font-size: 32upx;
			font-weight: bold;
			color: #333;
			letter-spacing: 3upx;
		}
		.content-list{
			width: 90%;
			height: 106upx;
			margin: 0 auto;
			border-bottom: 1upx solid #f5f5f5;
			font-size: 28upx;
			font-weight: bold;
			color: #333;
			letter-spacing: 3upx;
			.title{
				margin-top: 15upx;
			}
			text{
				font-size:20upx;
				font-weight:400;
				color:rgba(153,153,153,1);		
			}
		}
	}
	
</style>
