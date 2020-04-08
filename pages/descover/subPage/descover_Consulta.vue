<template>
	<view class="container2">
		<!-- 轮播图 -->
		<view class="ConsultaSwiper">
			<swiper :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
				:duration="duration" indicator-color="#E1E1E1" circular="true" 
				indicator-active-color="#6B7AF8" display-multiple-items="1">
				<swiper-item v-for="(item,index) in SwiperList" :key="index" 
					class="fx-row fx-row-center fx-row-space-around">
					<view class="SLItem" v-for="(item2,index2) in item.ItemList" :key="index2">
						<image :src="item2.image" mode="widthFix"></image>
						<view :class="{'SLtitle':index2==0,'fs3a28':true,'SLtitleActive':index2!=0}">{{item2.title}}</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 资讯列表  -->
		<view class="ConsultaList top">
			<view class="CLitem fx-row fx-row-center fx-row-space-around" v-for="(item,index) in consulta" :key="index" @tap="gotoConDetail">
				<view class="CLleft">
					<view class="CLtitle fs3a28">知名品牌有哪些画风清奇的设计?</view>
					<view class="nickName fs6a24 fx-row fx-row-center fx-row-space-around">
						<view class="Nname">木子李</view>
						<view class="Ntime">1天前</view>
					</view>
				</view>
				<view class="CLright">
					<default-image src="userInfor.headImage" custom-class="Pimage"></default-image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		name:'descoverConsulta',
		data() {
			return {
				// 轮播图信息
				SwiperList:[
					{
						id:0,
						ItemList:[
							{id:0,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/all.png',title:'全部'},
							{id:1,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/sumaitong.png',title:'速卖通'},
							{id:2,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/ebay.png',title:'ebay'},
							{id:3,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/wish.png',title:'wish'},
						]
					},
					{
						id:1,
						ItemList:[
							{id:0,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/all.png',title:'全部'},
							{id:1,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/sumaitong.png',title:'速卖通'},
							{id:2,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/ebay.png',title:'ebay'},
							{id:3,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/wish.png',title:'wish'},
						]
					},
					{
						id:2,
						ItemList:[
							{id:0,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/all.png',title:'全部'},
							{id:1,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/sumaitong.png',title:'速卖通'},
							{id:2,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/ebay.png',title:'ebay'},
							{id:3,image:'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/wish.png',title:'wish'},
						]
					}
				],
				indicatorDots:true,
				autoplay:false,
				interval:5000,
				duration:1000,
				// 资讯列表
				consulta:[
					{id:0},{id:1},{id:2},{id:3}
				]
			};
		},
		methods:{
			gotoConDetail(){
				uni.navigateTo({
					url: '../descover_consultaDetail/descover_consultaDetail'
				});
			}
		}
	}
</script>

<style lang="less">

	@import '../../../css/mzl_base.less';
	.container2{
		// 轮播图
		.ConsultaSwiper{
			swiper{
				height: 252upx;background: #fff;
				swiper-item{
					height:auto !important;
					.SLItem{
						width:25%;text-align: center;
						image{width:100upx;height:100upx;vertical-align: middle;margin:30upx 0;}
						.SLtitle{color:#AAAAAA;}
						.SLtitleActive{color:#6B7AF8;}
					}
				}
				//轮播小圆点
				.wx-swiper-dots.wx-swiper-dots-horizontal{margin-bottom: 2upx;}
				.wx-swiper-dot{ width:32upx; display: inline-flex; height:5upx; margin-left: 20upx; justify-content:space-between;border-radius:2px;} 
				.wx-swiper-dot::before{ content: ''; flex-grow: 1; background: #E1E1E1; border-radius: 8upx } 
				.wx-swiper-dot-active::before{ background:@tabActive; }
				
			}
		}
		// 资讯列表
		.ConsultaList{
			width:95%;margin:0 auto;margin-top: 20upx;
			.CLitem{
				background: #fff;padding:20upx;margin-bottom:20upx;
				.CLleft{
					width:60%;
					.CLtitle{
						height:130upx;font-size: 32upx;font-weight:500;line-height: 50upx;
					}
					.nickName{
						height:50upx;
						view{width:45%;text-align: left;}
						.Ntime{text-align: right;}
					}
				}
				.CLright{
					width:40%;text-align: right;
					.Pimage{width:240upx;height:180upx;vertical-align:middle;}
				}
			}
		}
		
	}
</style>
