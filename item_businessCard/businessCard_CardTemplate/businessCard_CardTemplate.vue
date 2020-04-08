<template>
	<view class="container">
		<view class="titleCon fx-row fx-row-space-between">
			<view class="cate fx-row fx-row-center">
				<text>1.默认</text>
				<view class="cateTxt">
					<view class="sanjiao"></view>
					<text>轮盘获得</text>					
				</view>
			</view>
			<view class="numCon">
				<text class="current">{{currentNum+1}}</text>
				<text class="total">/{{itemList.length}}</text>
			</view>
		</view>
		<!-- 轮播 -->
		<!-- ::src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/baiyin.png''" -->
		 <swiper @change="changeSwiperNum($event)" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
            <swiper-item v-for="item in itemList" :key="item">
               <view class="templateCon">
               	<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/moban.png'" mode="widthFix" class="mobanImg"></image>
               	<view class="imgCon fx-column fx-row-center">
               		<image :src="item.img" mode="widthFix"></image>
               		<text>{{item.name}}</text>
               	</view>
               	<view class="company">{{item.company}}</view>
               	<view class="infoCon">
               		<view class="positionCon mar fx-row">
               			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/zhiwei.png'" mode="widthFix"></image>
               			<text>{{item.position}}</text>
               		</view>
               		<view class="tellCon mar fx-row">
               			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/tel.png'" mode="widthFix"></image>
               			<text>{{item.tell}}</text>
               		</view>
               		<view class="emailCon mar fx-row">
               			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/email2.png'" mode="widthFix"></image>
               			<text>{{item.email}}</text>
               		</view>
               		<view class="graphCon mar fx-row">
               			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/qianming2.png'" mode="widthFix"></image>
               			<text class="graphTxt">{{item.graph}}</text>
               		</view>
               	</view>
               	<view class="codeCon fx-row fx-row-top">
               		<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/code.png'" mode="widthFix"></image>
               		<text class="codeTxt">扫描或长按二维码可查看名片 </text>
               	</view>
               </view>
            </swiper-item>
        </swiper>
		<!-- 按钮 -->
		<view class="btn">保存到手机</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				//轮播
				itemList: [
					{
						id:0,
						name:'目小温',
						img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png',
						company:'广州时刻销销网络有限公司',
						position:'外贸经理',
						tell:'15214783654',
						email:'1125244@qq.com',
						graph:'时刻销售年年年始创于时尚之都—上海，至今已经成时刻销售年年年始创于',
					},
					{
						id:2,
						name:'一二三',
						img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png',
						company:'广州时刻销销网络有限公司',
						position:'外贸经理',
						tell:'15214783654',
						email:'1125244@qq.com',
						graph:'时刻销售年年年始创于时尚之都—上海，至今已经成时刻销售年年年始创于',
					},
					{
						id:3,
						name:'笑嘻嘻',
						img:'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/ava.png',
						company:'广州时刻销销网络有限公司',
						position:'外贸经理',
						tell:'15214783654',
						email:'1125244@qq.com',
						graph:'时刻销售年年年始创于时尚之都—上海，至今已经成时刻销售年年年始创于',
					},
				],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
		currentNum:0,
			};
		},
		methods:{
		  // 轮播图图片数量
			changeSwiperNum(event){
				// console.log(event.detail.current);
				this.currentNum=event.detail.current;
			}
		}
	}
</script>

<style lang="less">

@import "../../css/jss_base.less";
.container{
	width: 100%;height:100%;box-sizing: border-box;padding:32upx 30upx 40upx 30upx;background: #F5F5F5;position:fixed;font-family: #999999;
}
.titleCon{
	.cate{
		width:40%;margin-bottom:32upx;font-size: 32upx;color: #333333;position:relative;
		.sanjiao{
			position:absolute;top:8upx;left:-16upx;
			width: 0upx;height: 0upx;font-size: 0;line-height: 0;overflow: hidden;border-width: 8upx;
			border-style: dashed solid dashed dashed;border-color: transparent #FFA56F transparent transparent;
		}
		.cateTxt{
			position:relative;border-radius: 6upx;margin-left: 28upx;
			width:130upx;height: 36upx;line-height: 36upx;color: #FFFFFF;background:#FFA56F;text-align: center;font-size: 22upx;
		}
	}
	.numCon{
		.current{font-size: 36upx;color: #333333;}
		.total{font-size: 24upx;color: #999999;}
	}
}
//轮播
swiper{
	height: 858upx;
	swiper-item{
		height:auto !important;
		}
	}
//名片模板
.templateCon{
	width: 88%;height: 858upx;position: relative;background: #FFFFFF;margin:0 auto;
	.mobanImg{width: 100%;height: 858upx;}
	.imgCon{
		position:absolute;font-size: 32upx;color: #333333;text-align: center;top:32upx;left:-5upx;
		image{width: 160upx;height: 158upx;margin-bottom:20upx;}
	}
	.company{font-size: 36upx;color: #333333;	position: absolute;top:350upx;left:62upx;}
	.infoCon{
		font-size: 24upx;line-height: 32upx;color: #666666;position: absolute;top:455upx;left:62upx;
		image{width: 32upx;height: 32upx;margin-right: 20upx;}
		.mar{margin-bottom: 22upx;}
		.graphCon{
			.graphTxt{width:70%;text-align: left;}
		}
	}
	.codeCon{
		position: absolute;left: 62upx;bottom: 40upx;
		image{width: 80upx;height: 80upx;margin-right: 20upx;}
		.codeTxt{font-size: 24upx;color: #333333;max-width: 206upx;text-align: left;}
	}
}
// 按钮
.btn{
	width: 400upx;height: 88upx;line-height: 88upx;border-radius: 44upx;font-size: 32upx;color: #FFFFFF;
	background:#6B7AF8;margin: 40upx auto;text-align: center;
}
</style>
