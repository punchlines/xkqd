<template>
	<view class="container">
		<view class="ConsultaDetailBox">
			<!-- 资讯头部 -->
			<view class="CDheader">
				<view class="Htitle">知名品牌有哪些画风清奇的设计？</view>
				<view class="Hwrite fx-row fx-row-center fx-row-space-around">
					<view class="HnickList">
						<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
						<text class="HLtitle fs6a28">李·勤俭持家·迷·梦</text>						
					</view>
					<view class="Htime fs9a24">2018.11.12</view>
				</view>
			</view>
			<!-- 文章介绍 -->
			<view class="CDartial">
				<view class="Areader fs9a24">1万阅读</view>
				<view class="AartialDetail fs3a28">
					<view>在不少女孩心中，蒂芙尼就是浪漫订婚钻戒的代名词，而“蒂芙尼蓝”也成为了一种标志性的颜色。
						本该专注于珠宝的蒂芙尼最近将目光投向了家居生活产品，其中一款“天价”毛线球，更是引起众“铲屎官”一片热议。
						这只2017年纯手工限量版纯银毛线售价高达87000元人民币，究竟什么样的贵族猫，会得到这样一只玩具呢？
					</view>
					 <view>
						除天价毛线球外，蒂芙尼还推出了一系列售价令人咋舌的“生活艺术品”，还简单地将其命名为“Tiffany & Co. Home & Accessories”，然而价格却一点都不日常
						甚至还有一款售价为165美金（约1100元）、不知该当做文具还是穿在项链上作为首饰佩戴的回形针。
					 </view>
					 <default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
					 <view>
						甚至还有一款售价为165美金（约1100元）、不知该当做文具还是穿在项链上作为首饰佩戴的回形针
					 </view>
				</view>
			</view>
		</view>
		<!--热门推荐 -->
		<view class="HotComment">
			<view class="HCtitle fs3a28">热门推荐</view>
			<!-- 热门推荐列表  -->
			<view class="ConsultaList top">
				<view class="CLitem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in consulta" :key="index" @tap="gotoConDetail">
					<view class="CLleft">
						<view class="CLtitle fs3a28">知名品牌有哪些画风清奇的的设计?</view>
						<view class="nickName fs6a24 fx-row fx-row-center fx-row-space-around">
							<view class="Nname">浏览量 520</view>
							<view class="Ntime">1天前</view>
						</view>
					</view>
					<view class="CLright">
						<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
					</view>
				</view>
			</view>
		</view>
		<view class="FixedBottom fx-row fx-row-center fx-col-space-around">
			<view class="FBzan">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/34_like.png'"></image>
				<text>5.8w</text>
			</view>
			<view class="FBmessage" @tap="GoToComment">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/34_pinglun.png'"></image>
				<text>2.3w</text>
			</view>
			<view class="FBcollect">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/register/shoucang.png'"></image>
				<text>2.5w</text>
			</view>
			<view class="FBsend" @tap="SendFriend">
				<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/34_share.png'"></image>
				<text>2.8w</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				onlineSite:this.global.onlineSite,
				// 资讯列表
				consulta:[
					{id:0},{id:1},{id:2},{id:3},
				]
			};
		},
		methods:{
			// 跳转到推荐详情
			gotoConDetail(){
				uni.navigateTo({
					url: '../descover_details/descover_details'
				});
			},
			// 跳转至评价列表
			GoToComment(){
				uni.navigateTo({
						url: '../descover_Comment/descover_Comment'
				});
			},
			// 转发
			SendFriend(){
				// 分享到微信好友
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "转发成功",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
				
			},
		}
	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';

	.container{
		background:@grayBg;margin-bottom:90upx;
		.ConsultaDetailBox{
			background:#fff;
			// 资讯头部
			.CDheader{
				background:#fff;
				.Htitle{
					border-top:1upx solid @grayBg;width:100%;height:100upx;line-height: 100upx;background:#fff;text-align: center;font-size:36upx;color:#333;
				}
				.Hwrite{
					width:90%;height: 120upx;padding:20upx;background:#F8F8F8;margin:0 auto;
					.HnickList{
						width:70%;text-align: left;
						.Pimage{width:60upx;height: 60upx;margin-right:20upx;vertical-align: middle;}
					}
					.Htime{
						width:30%;text-align: right;
					}
				}
					
			}
			// 文章介绍
			.CDartial{
				width:100%;background:#fff;padding:30upx;margin:20upx 0;
				.AartialDetail{
					margin-top:20upx;line-height: 50upx;text-indent:50upx;
					.Pimage{width:100%;margin:20upx 0;}
				}
			}
		}
		.HotComment{
			margin-top:30upx;padding:20upx;
			.HCtitle{font-size:30upx;font-weight: 900;margin-left: 10upx;}
			// 热门推荐列表
			.ConsultaList{
				width:100%;margin:0 auto;margin-top:20upx;
				.CLitem{
					background: #fff;padding:20upx;margin-bottom:20upx;
					.CLleft{
						width:60%;
						.CLtitle{
							height:130upx;font-size: 32upx;font-weight:600upx;line-height: 50upx;
						}
						.nickName{
							height:50upx;
							view{width:45%;text-align: left;}
							.Ntime{text-align: right;}
						}
					}
					.CLright{
						width:40%;text-align: right;
						.Pimage{width:240upx;height:180upx;vertical-align:middle;border-radius: 5upx;}
					}
				}
			}
		}
		.FixedBottom{
			width:100%;height: 88upx;position: fixed;bottom:0;background:#333333;
			image{width:34upx;height: 34upx;margin-right: 20upx;vertical-align: middle;}
			.FBzan,.FBmessage,.FBsend,.FBcollect{width:25%;text-align: center;color:#fff;font-size: 24upx;}
		}
	}
</style>
