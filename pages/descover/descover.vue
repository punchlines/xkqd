<template>
	<view  class="container">
		<view class="selectLive">
			<input type="text" value="" placeholder="搜索主播"/>
		</view>
		<view class="TopbarBox fx-row fx-row-center fx-row-space-around">
			<view :class="{'TBtitle':true,'TBFactive':tapIndex==topBarIndex}" @click="changeTitle(tapIndex)" v-for="(tapItem,tapIndex) in topBar" :key="tapIndex">{{tapItem.title}}</view>
		</view>
		<!-- 推荐 -->
		<view class="recommendBox" v-if="topBarIndex==0">
			<descover-recommend @noMore="noMore=true" @finish="loading=false" :loading-type="loadingType" ref="recommend"></descover-recommend>
		</view>
		<!-- 附近 -->
		<view class="nearbyBox" v-if="topBarIndex==1">
			<descover-nearby  @noMore="noMore=true" @finish="loading=false;" :loading-type="loadingType" ref="nearby"></descover-nearby>
		</view>
		<!-- 收藏 -->
		<view class="collectionBox" v-if="topBarIndex==2">
			<descover-collection :loading-type="loadingType" ref="collection"></descover-collection>	
		</view>
		<!-- 动态 -->
		<!--<view class="trendsBox" v-if="topBarIndex==3">-->
			<!--<trends></trends>-->
		<!--</view>-->
		<!-- 资讯 -->
		<view class="consultaBox" v-if="topBarIndex==4">
			<!-- <descover-consulta></descover-consulta> -->
			<!-- <make-share-image></make-share-image> -->
			<view class="nodata fs3a28">暂未开通</view>
		</view>
		<!-- 发布按钮 -->
		<wx-view custom-class="button">
			<view class="ConsultaButton" v-if="topBarIndex!==4">
				<view class="CBbtn" @click="gotoPublic">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/publish.png'"></image>
				</view>
			</view>
		</wx-view>
		<cover-view class="pop-up camera" @click="publishJournal" v-if="audiTitleActive == 1">
			<cover-image class="image cameraImg" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/descover/publish1.png'"></cover-image>
		</cover-view>
	</view>
</template>

<script>
	import descoverRecommend from './subPage/descover_recommend.vue';
	import descoverNearby from './subPage/descover_Nearby.vue';
	import descoverCollection from './subPage/descover_Collection.vue';
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';
	export default {
		data() {
			return {
				//导航标题
				topBar: [
					{
						id: 0,
						title: '直播'
					},
					{
						id: 1,
						title: '关注'
					},
					{
						id: 2,
						title: '附近'
					},
					// {
					// 	id: 3,
					// 	title: '动态'
					// },
// 					{
// 						id: 4,
// 						title: '资讯'
// 					}
				],
				topBarIndex: 0, //切换导航下标
				
			};
		},
		onLoad() {
			// uni.setStorageSync('userId',34);
	
		},
		onShow() {
				this.$refs.recommend.fetch()
				//this.reFetch();
				//this.fetch()
		},
		
		
		mixins:[loadMoreMixins],
		//注册组件
		components: {
			descoverRecommend,
			descoverNearby,
			descoverCollection
		},
		methods: {
		
			
			fetch(){
				this.loading = true;
				switch(this.topBarIndex){
						case 0:
							this.$refs.recommend.fetch();break;
						case 1:
							this.$refs.nearby.fetch();break;
						case 2:
							this.$refs.collection.getMessage();break;
				}
					
			},
			reFetch(){
				if (this.$store.state.needUpdateDiscovery) {
					this.loading = true;
					switch(this.topBarIndex){
							case 0:
								this.$refs.recommend.reFetch();break;
							case 1:
								this.$refs.nearby.reFetch();break;
							case 2:break; //TODO
								//this.$refs.collection.getMessage();break;
					}
				}
				
				
			},
			
			// 跳转至发布日志
			gotoPublic() {
				// uni.navigateTo({
				// 	url: '../../item_descover/descover_LookLive/descover_LookLive',
				// });
			},
			// 切换标题
			changeTitle(index) {
				this.reset();
				this.topBarIndex = index;
			},
			// 跳转至详情页
			gotoDetail() {
				uni.navigateTo({
					url: '../../item_descover/descover_details/descover_details',
				});
			},
			// 跳转至店铺
			gotoShop() {
				uni.navigateTo({
					url: '../../module/shop/home/home'
				});
			},
			//点赞
			givePraise(e, index) {
				console.log(e.currentTarget.dataset.index);
				var ind = e.currentTarget.dataset.index;

			},
		},

      // onShareAppMessage(res) {
      //   console.log(res);
      //   const journalId = res.target ? res.target.dataset.id : ''
			//
      //   if (journalId) {
      //     this.$api.share(journalId, 4);
      //     return {
      //       path: '/item_descover/journalDetail/journalDetail?id=' + journalId
      //     }
      //   }
      // },

	}
</script>

<style lang="less">
	@import '../../css/mzl_base.less';


	page {
		width: 100%;
		height: 100%;
		background: @grayBg;
	}
	.pop-up {
		position: fixed;
		right: 30upx;
		bottom: 60upx;
		// 	  width: 200upx;
		// 	  height: 200upx;
		// 	  background-color: red;
		z-index: 999999;
			}
	.container {
		width: 100%;
		box-sizing: border-box;

		.TopbarBox {
			margin: 10upx 0 23upx 0;
			padding: 30upx 30upx 0 30upx;

			.TBtitle {
				width: 20%;
				text-align: center;
				height: 60upx;
				line-height: 60upx;
				font-size: @fsTitle;
				color: @fsC6;
			}

			.TBFactive {
				background: @tabActive;
				border-radius: 30upx;
				color: #fff;
			}
		}
		.consultaBox {
			.nodata {
				width: 100%;
				text-align: center;
			}
		}

		// 发布按钮
		.ConsultaButton {
			width: 100%;
			position: fixed;
			bottom: 50upx;
			text-align: right;
			padding-right: 30upx;

			.CBbtn {
				width: 100upx;
				height: 100upx;
				border-radius: 50%;
				box-shadow: 0upx 0upx 10upx 0upx rgba(43, 57, 175, 0.4);
				position: absolute;
				right: 30upx;
				bottom: 30upx;

				image {
					width: 100upx;
					height: 100upx;
					vertical-align: middle;
				}
			}
		}
	}
	.selectLive{
		margin-left: 30rpx;
		margin-right: 30rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
		background-color: #FFFFFF;
		height: 70rpx;
		border-radius: 40rpx;
		padding-top: 15rpx;
		padding-left: 30rpx;

	}
</style>
