<template>
	<view class="container">
		<!-- 搜索框 -->
		<view v-if="!showOpenSetting" class="searchCon fx-row fx-row-center">
			<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/sousuo.png'" mode="widthFix" @click="searchClick"></image>
			<input type="text" placeholder="请输入姓名/公司/职位" class="input" v-model="setext" confirm-type="search" @confirm="searchTopImportCard">
		</view>
		<!--  #ifdef  APP-PLUS -->
		<button v-if="showOpenSetting" @click="openSetting">拒绝授权之后要手动设置</button>
		<!--  #endif -->


		<!-- 排行列表 -->
		<view class="rankListCon" v-for="item of hotList" v-show="isSearch == false">
			<view class="rankInfo" @click="gotoUserCard(item.id)">
				<view class="collCon fx-row fx-row-space-between">
					<view class="imgCon">
						<default-image :src="item.headImage" custom-class="ava"></default-image>
					</view>
					<view class="infoCon">
						<view class="fx-row">
							<view class="name single-line">{{item.name}}</view>
							<view class="position">{{item.job}}</view>
						</view>
						<view class="company">{{item.company}}</view>
					</view>
					<view class="hotCon fx-row fx-row-center">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/renqi2.png'" mode="widthFix" class="hot"></image>
						<text class="rankNum">{{item.importNum}}</text>
					</view>
				</view>
			</view>
			<view class="detailCon fx-row fx-row-space-between fx-row-bottom">
				<view class="localCon fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/dibiao.png'" mode="widthFix"></image>
					<text class="txt">{{item.distance}}km</text>
				</view>
				<view class="upCon fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/like2.png'"></image>
					<text class="txt">{{item.praiseNum}}</text>
				</view>
				<view class="collectCon fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/shocang.png'"></image>
					<text class="txt">{{item.collectNum}}</text>
				</view>
			</view>
		</view>
		<uni-load-more v-if="!isSearch" :loading-type="loadingType" ></uni-load-more>

		<!-- 搜索结果 -->
		<view class="rankListCon" v-for="item of hotList" :key="item.id" v-if="isSearch" @click="gotoUserCard(item.id)">
			<view class="rankInfo">
				<view class="collCon fx-row fx-row-space-between">
					<view class="imgCon">
						<default-image :src="item.headImage" custom-class="ava"></default-image>
					</view>
					<view class="infoCon">
						<view class="fx-row">
							<view class="name">{{item.name}}</view>
							<view class="position">{{item.job}}</view>
						</view>
						<view class="company">{{item.company}}</view>
					</view>
					<view class="hotCon fx-row fx-row-center">
						<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/renqi2.png'" mode="widthFix" class="hot"></image>
						<text class="rankNum">{{item.importNum}}</text>
					</view>
				</view>
			</view>
			<view class="detailCon fx-row fx-row-space-between fx-row-bottom">
				<view class="localCon fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/dibiao.png'" mode="widthFix"></image>
					<text class="txt">{{item.distance}}km</text>
				</view>
				<view class="upCon fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/like2.png'"></image>
					<text class="txt">{{item.praiseNum}}</text>
				</view>
				<view class="collectCon fx-row fx-row-center">
					<image :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/card/shocang.png'"></image>
					<text class="txt">{{item.collectNum}}</text>
				</view>
			</view>
		</view>
		<uni-load-more v-if="isSearch" :loading-type="loadingType" ></uni-load-more>


	</view>
</template>

<script>
	import loadMoreMixins from '@/js/mixins/loadMoreMixins2';

	export default {

		mixins: [loadMoreMixins],

		data() {
			return {
				longitude: 0,
				latitude: 0,
				setext: '',
				isSearch: false,
				searchList: [],
				hotList: [],
				onlineSite: this.global.onlineSite,
				showOpenSetting:false,
			};
		},
		methods: {
			// 跳转到别人的名片
			gotoUserCard(id) {
				if (id == this.currentUser.id) {
					return;
				}
				uni.navigateTo({
					url: '../../pages/businessCard2/businessCard2?cardUserId=' + id
				});
			},
			getLocation() {
				if (!uni.getStorageSync('longitude') || !uni.getStorageSync('latitude')) {
					uni.getLocation({
						type: 'wgs84',
						success: (res) => {
							this.showOpenSetting = false;
							uni.setStorageSync('longitude', res.longitude);
							uni.setStorageSync('latitude', res.latitude);
							this.longitude = res.longitude;
							this.latitude = res.latitude;
							this.fetch();
						},
						fail: (error) => {
							this.showOpenSetting = true;
							this.showError(error);
							if (!this.longitude) {
								this.showTips('请允许位置授权才能获取附近的名片哦')
							}
						}
					});
				} else {
					this.longitude = uni.getStorageSync('longitude');
					this.latitude = uni.getStorageSync('latitude');
					this.fetch()
				}

			},
			fetch () {
				this.loading = true;

				if (this.isSearch) {
					this.searchTopImportCard();
					return;
				}

				this.$api.listTopImportCard(this.currentPage, this.longitude, this.latitude).then(result => {

					let list = result.topImportCardList || [];
					list.forEach(item => {
						try {
							item.distance = item.distance.toFixed(2)
						} catch (e) {
							item.distance = '--'
						}
					})

					this.loading = false;
					if (list.length === 0) {
						this.noMore = true;
					}

					this.hotList = this.hotList.concat(list);
					this.currentPage++;
					// uni.hideLoading()
				}).catch(error => {
					console.error(error)
					// uni.hideLoading()
				})
			},
			searchTopImportCard (isManual) {
				console.log('========================================')
				console.log(isManual)
				if (isManual) {
					this.currentPage = 1;
					this.hotList = [];
				}

				if (!this.setext) {
					this.currentPage = 1;
					this.hotList = [];
					this.isSearch = false;
					this.reset();
					this.fetch();
					return;
				} else {
					this.isSearch = true;
				}

				this.loading = true;
				this.$api.searchTopImportCard(this.currentPage, this.setext, this.longitude, this.latitude).then(result => {
					let list = result.topImportCardList || [];
					list.forEach(item => {
						try {
							item.distance = item.distance.toFixed(2)
						} catch (e) {
							item.distance = '--'
						}
					})

					this.loading = false;
					if (list.length === 0) {
						this.noMore = true;
					}

					this.hotList = this.hotList.concat(list);
					this.currentPage++;
				}).catch(error => {
					this.showError(error);
					console.error(error)
				})
			},
			searchClick() { //点击搜索按钮
				if (!this.setext) {
					this.showTips('请输入搜索内容');
				} else {
					this.searchTopImportCard(true)
				}

			},
			//点击事件
			popularClick() { //人气排行
				uni.navigateTo({
					url: '../businessCard_Wheel/businessCard_Wheel'
				});
			},


			// 轮播图图片数量
			changeSwiperNum(event) {
				// console.log(event.detail.current);
				this.currentNum = event.detail.current;
			},
			openSetting() {
				let that=this;
				uni.openSetting({
					success(res) {
						that.getLocation();
						that.showOpenSetting = false;
					}
				});
			},
		},
		// 监听页面加载
		onLoad(){
			this.getLocation()
		},
	}
</script>

<style lang="less">
	@import "../../css/jss_base.less";

	page {
		background: #F5F5F5;
	}

	.container {
		padding: 40upx 0 30upx 0;

		// 搜索框
		.searchCon {
			width: 92%;
			margin: 0 auto;
			height: 72upx;
			box-sizing: border-box;
			padding: 30upx;
			background: #ffffff;

			image {
				width: 32upx;
				height: 32upx;
				padding-right: 30upx;
			}

			.input {
				display: flex;
				height: 40upx;
				font-size: 28upx;
			}
		}

		.rankListCon {
			margin-top: 30upx;
			margin-bottom: 30upx;

			.rankInfo {
				position: relative;
				z-index: 1;

				.collCon {
					width: 92%;
					margin: 0 auto;
					background: #FFFFFF;
					box-sizing: border-box;
					padding: 50upx 30upx;
					margin-bottom: 24upx;
					border-radius: 10upx;
					box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.05);
					border-radius: 10upx;

					.imgCon {
						width: 20%;

						.ava {
							width: 100upx;
							height: 100upx;
							margin-right: 30upx;
						}
					}

					.infoCon {
						width: 75%;
						display: flex;
						flex-direction: column;
						justify-content: space-between;

						.name {
							font-size: 32upx;
							color: #333333;
							margin-right: 22upx;
						}

						.position {
							padding: 0 15upx;
							height: 36upx;
							line-height: 36upx;
							background: #F1F1F1;
							font-size: 20upx;
							color: #666666;
							border-radius: 18upx;
							text-align: center;
						}

						.company {
							font-size: 24upx;
							color: #999999;
						}
					}

					.hotCon {
						width: 15%;

						.hot {
							width: 24upx;
							height: 24upx;
							margin-right: 10upx;
						}

						.rankNum {
							font-size: 24upx;
							color: #666666;
						}
					}
				}
			}

			//点赞数,位置
			.detailCon {
				width: 84%;
				margin: 0 auto;
				margin-top: -100upx;
				background: #FFFFFF;
				box-sizing: border-box;
				padding: 100upx 30upx 30upx 30upx;

				.txt {
					font-size: 24upx;
					color: #666666;
					font-family: PingFangSC;
				}

				.localCon {
					width: 68%;

					&>image {
						width: 24upx;
						height: 24upx;
						margin-right: 10upx;
					}
				}

				.upCon {
					width: 16%;

					&>image {
						width: 28upx;
						height: 28upx;
						margin-right: 10upx;
					}
				}

				.collectCon {
					width: 16%;
					margin-left: 40upx;

					&>image {
						width: 28upx;
						height: 28upx;
						margin-right: 10upx;
					}
				}
			}

		}
	}
</style>
