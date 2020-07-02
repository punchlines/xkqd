<template>
	<view class="connContainer">
		<view class="searchTemplateContainer" @click="goSelect">
			<wx-view custom-class="container1">
				<view class="CMsearch">
					<view class="CMimage">
						<image class="" :src="'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/search.png'" mode="widthFix"></image>
					</view>
					<view class="CMinput">
						<input type="text" class="" :placeholder="titleActiveIndex>2&&userType==1||userType>4 ? '搜索企业': '搜索平台商品' " ref="input" disabled></input>
					</view>
				</view>
			</wx-view>
		</view>
		<view class="HeaderTitle">
			<view class="Title fx-row fx-row-center fx-row-space-around fs6a28">
				<view :class="{'Titem':true,'ItemActive':index==titleActiveIndex}" @click="changeTitle(item.id)" v-for="(item,index) in title"
				 :key="index">{{item.title}}</view>
			</view>
		</view>
		<!-- 复选框列表 -->

		<!-- 我的店铺 -->
		<view v-if=" userType==2||userType==3||userType==4 ? titleActiveIndex==0:titleActiveIndex==null">
			<view v-if="shopId">
				<view class="goodsListCon fx-row fx-row-center fx-row-space-between" v-for="(goods, index) in goodsList" :key="goods.goodsId"
				 @click="selectGoods(goods)">
					<image class="checkCircle" style="width: 34upx; height: 34upx;" :src="goods._select ? 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
					<view class="goodsCon fx-row">
						<image :src="goods.coverImage"></image>
						<view class="goodsDetail fx-column fx-row-space-between">
							<view class="goodsName">{{ goods.title }}</view>
							<view class="price">￥{{ goods.preferentialPrice }}</view>
						</view>
					</view>
				</view>
				<uni-load-more :loading-type="loadingType"></uni-load-more>
			</view>
			<view v-if="!shopId">
				<view style="margin-top: 50%;" @click="goShops">
					<defaultpage :messageToPage="messageToPage4"></defaultpage>
				</view>
			</view>
		</view>
		<!-- 购买过 -->
		<view v-if="userType==1||userType==5||userType==6?titleActiveIndex==0:titleActiveIndex==1">
			<view class="goodsListCon fx-row fx-row-center fx-row-space-between" v-for="(goods, index) in goodList" :key="goods.goodsId"
			 @click="selectGoods(goods)">
				<image class="checkCircle" style="width: 34upx; height: 34upx;" :src="goods._select ? 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
				<view class="goodsCon fx-row">
					<image :src="goods.cover"></image>
					<view class="goodsDetail fx-column fx-row-space-between">
						<view class="goodsName">{{ goods.title }}</view>
						<view class="price">￥{{ goods.preferentialPrice }}</view>
					</view>
				</view>
			</view>
			<uni-load-more :loading-type="loadingType"></uni-load-more>
		</view>
		<!-- 收藏过 -->
		<view v-if="userType==1||userType==5||userType==6?titleActiveIndex==1:titleActiveIndex==2">
			<view class="goodsListCon fx-row fx-row-center fx-row-space-between" v-for="(goods, index) in goodsLists" :key="goods.goodsId"
			 @click="selectGoods(goods)">
				<image class="checkCircle" style="width: 34upx; height: 34upx;" :src="goods._select ? 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
				<view class="goodsCon fx-row">
					<image :src="goods.coverImage"></image>
					<view class="goodsDetail fx-column fx-row-space-between">
						<view class="goodsName">{{ goods.title }}</view>
						<view class="price">￥{{ goods.preferentialPrice }}</view>
					</view>
				</view>
			</view>
			<uni-load-more :loading-type="loadingType"></uni-load-more>
		</view>
		<!-- 我发起的拼团 -->
		<view v-if="userType==1||userType==5||userType==6?titleActiveIndex==2:titleActiveIndex==3">
			<view class="goodsListCon fx-row fx-row-center fx-row-space-between" style="padding: 0rpx;" v-for="(goods,index) in list"
			 v-if="list.length>0" :key="index" @click="selectGoods(goods)">
				<image class="checkCircle" style="width: 34upx; height: 34upx; margin-right: 0rpx; margin-left: 20rpx;" :src="goods._select ? 'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose.png':'http://card-1254165941.cosgz.myqcloud.com/cardImages/images/chose_un.png'"></image>
				<template>
					<circle-group :key="index" @reduce="reduces(index)" :item='goods' :canClick="false"></circle-group>
				</template>

			</view>
			<uni-load-more :loading-type="loadingType"></uni-load-more>
		</view>
		<!-- 加入企业 -->
		<view v-if=" userType==1||userType==5||userType==6 ? titleActiveIndex==3:titleActiveIndex==null">
			<view>
				<view class="storeListBox" v-if="userType<4">
					<view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in shoreList" :key="index">

						<view class="Limage">
							<image :src="item.logo" custom-class="Image" style="width: 110rpx; height: 110rpx;"></image>
						</view>
						<view class="LTitle" @click="gotoShop(item.shopId)">
							<view class="LtitleName fs3a32">{{item.shopName}}</view>
							<view class="LtitleSubName fs6a24">已有员工{{item.employeeNum}}名 | 提成{{item.gain}}% </view>
						</view>
						<view class="applyBox" @click="ApplyForStaff(item.shopGrade,item.shopId)">
							<view class="Bapply fs6a28">申请</view>
						</view>
					</view>
				</view>
				<view class="storeListBox" v-else>
					<view class="SBlist fx-row fx-row-center fx-row-space-around" v-for="(item,index) in shoplist" :key="index">
						<view class="Limage">
							<image :src="item.logo" custom-class="Image" style="width: 110rpx; height: 110rpx;"></image>
						</view>
						<view class="LTitle" @click="gotoShop(item.shopId)">
							<view class="LtitleName fs3a32">{{item.shopName}}</view>
							<view class="LtitleSubName fs6a24">已有员工{{item.employeeNum}}名 | 提成{{item.gain}}% </view>
						</view>
						
					</view>
				</view>
			</view>
			<uni-load-more :loading-type="loadingType"></uni-load-more>
		</view>
		<!-- 按钮 -->
		<view class="BtnCon" v-if=" userType!=1 || userType<4 &&titleActiveIndex !=3">
			<view class="Btn" @click="confirm">确定</view>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/template/uni-load-more.vue';
	import circleGroup from '@/components/circleGroup/circleGroup';
	import defaultpage from '@/components/defaultPage.vue';
	// import goodsItem from '../../item_my/myself_myCollect/goodsItem.vue';
	export default {

		components: {
			uniLoadMore,
			circleGroup,
			defaultpage
			// goodsItem
		},

		data() {
			return {
				currentPage: 1,
				loading: true,
				noMore: false,
				goodsList: [],
				goodsLists: [],
				list: [],
				goodList: [],
				shoreList: [],
				showpopup: false,
				applyText: '',
				applyForagree: '需同意《员工申请协议》才能进行申请',
				userType: '',
				shoplist: [],
				showAgreement: true,
				titleActiveIndex: 0,
				title: [],
				shopId: '',
				show: true,
				messageToPage4: {
					image: 'http://card-1254165941.cosgz.myqcloud.com/cardImages/defaultPage/wumingpian.png',
					title: '您还没有填写店铺哦，赶紧去填写吧~'
				},
			};
		},

		computed: {
			loadingType() {
				if (this.noMore) return 2;
				if (this.loading) return 1;
				return 0;
			},
			journal() {
				return this.$store.state.journalPublish;
			},
			selectGoodsList() {
				return this.journal.goodsList;	
			},
			selectGoodsLists() {
				return this.journal.goodsLists;
			},
			selectList(){
				return this.journal.list;
			},
			selectGoodList(){
				return this.journal.goodList;
			}
			
		},

		onLoad() {
			this.userType = uni.getStorageSync('userType')
			this.shopId = uni.getStorageSync('shopId');
			console.log(this.userType)
			if (this.userType > 1 && this.userType <= 4) {
				this.title = [{
						id: 0,
						title: '我的店铺'
					},
					{
						id: 1,
						title: '购买过'
					},
					{
						id: 2,
						title: '收藏过'
					},
					{
						id: 3,
						title: '我发起的团'
					},
				]
				if(this.shopId!=''&&this.shopId>0){
					this.fetch();
				}
				
			} else {
				this.title = [{
						id: 0,
						title: '购买过'
					},
					{
						id: 1,
						title: '收藏过'
					},
					{
						id: 2,
						title: '我发起的团'
					},
					{
						id: 3,
						title: '加入企业'
					},
				]
				this.shoppingEd()
			}
			
		
		},

		onReachBottom() {
			if (this.loading || this.noMore) return;
			// this.fetch();
			// this.shoppingEd()
			// this.getCustomerList()
			// this.getPinGroup()
			if (this.userType > 1 && this.userType <= 4) {
				if (index == 1) {
					this.shoppingEd()
				} else if (index == 2) {
					this.getCustomerList();
				} else if (index == 3) {
					this.getPinGroup()
				}
			} else {
				if (index == 1) {
					//this.titleActiveIndex=this.titleActiveIndex=1
					this.getCustomerList();
				} else if (index == 2) {
					//this.titleActiveIndex=this.titleActiveIndex=1
					this.getPinGroup()
				} else if (index == 3) {
					this.getShopList()
				}
			}
		},

		methods: {
			//我的店铺
			fetch() {
				this.loading = true;
				this.$api.listCardShop(this.currentUser.id, this.currentPage).then(result => {
					this.loading = false;
					const list = result.cardShopGoodsList;
					if (list.length === 0) {
						this.noMore = true;
					}
					list.forEach(goods => {
					  goods._select = !!this.selectGoodsList.find(item => item.goodsId === goods.goodsId);
					})
					this.currentPage++;
					this.goodsList = this.goodsList.concat(list);
				}).catch(error => {
					console.error(error)
					this.loading = false;
					this.showError(error)
				})

			},
			//购买过
			shoppingEd() {
				this.loading = true;

				this.$api.getUserGoodsOrderList(this.currentPage).then(result => {
					this.loading = false;
					const list = result;
					if (this.currentPage === 1) {
						this.goodList = []
					}
					if (list.length === 0) {
						this.noMore = true;
					}
					list.forEach(goods => {
						goods._select = !!this.selectGoodList.find(item => item.goodsId === goods.goodsId);
						console.log(goods._select)
					})
					this.currentPage++;
					this.goodList = this.goodList.concat(list);
				}).catch(error => {
					console.error(error)
					this.loading = false;
					this.showError(error)
				})
			},
			//我的收藏
			getCustomerList() {
				this.loading = true;
				this.$api.myCollect(3, this.currentPage).then(result => {
					this.loading = false;
					const list = result.goodsList;
					if (this.currentPage === 1) {
						this.goodsLists = []
					}
					if (list.length == 0) {
						// this.showDefaultPage = true;
						this.noMore = true;
					}
					list.forEach(goods => {
						goods._select = !!this.selectGoodsLists.find(item => item.goodsId === goods.goodsId);
						console.log(goods._select)
					})
					this.currentPage++;
					this.goodsLists = this.goodsLists.concat(list);
				}).catch(error => {
					this.hideLoading();
					this.showError(error);
					this.loading = false;
				})
			},
			//我的企业
			getShopList() {
				this.loading = true;
				this.goodsList = []
				if (this.userType > 4) {
					this.$api.getUserJoinShop(this.currentPage1).then(result => {
						this.loading = false;
						this.shoplist = [{
							employeeNum: result.employeeNum,
							shopName: result.shopName,
							shopGrade: result.shopGrade,
							logo: result.logo,
							shopId: result.shopId,
							gain: result.gain
						}]
					})
				} else {

					this.$api.listRecommendShop(1).then(res => {
						console.log(res);
						this.loading = false;
						this.shoreList = res.recommendShopList;
					}).catch(error => {
						this.showError(error);
					})
				}

			},
			//我的开团
			getPinGroup() {
				this.loading = true;

				this.$api.getMyAssembleList(this.currentPage, uni.getStorageSync('userId'))
					.then(res => {
						
						if (this.currentPage1 == 1) {
							this.list = []
						}
						if (res.length == 0) {
							this.noMore1 = true;
							return;
						}
						//console.log(list)
						res=res.map(item=>{
							let endTime = item.overTime - new Date().getTime();
							endTime = endTime<=0?0:~~(endTime/1000);
							return Object.assign({
								endTime:endTime
							},item)
							
						});
						const list =res
						list.forEach(goods => {
							goods._select = !!this.selectList.find(item => item.goodsId === goods.goodsId);
						})
						
						this.currentPage++;
						this.list = this.list.concat(list);
						
						this.loading = false;
						uni.hideLoading();
					}).catch(err => {

						this.loading = false;
						uni.hideLoading();
					});
			},
			ApplyForStaff(shopGrade, shopId) {
				if (!this.checkHasLogin(`/item_my/myself_ApplyForStaff/myself_ApplyForStaff?shopId=${shopId}`)) {
					return;
				}
				if (!this.showAgreement) {
					this.showpopup = true;
					this.applyText = this.applyForagree;
				} else {
					if (shopGrade == 3) {
						// console.log('vip3');
						uni.navigateTo({
							url: '../../item_my/myself_selectGrop/myself_selectGrop?shopId=' + shopId
						});
					} else {
						// console.log('vip2');
						// console.log('勾选了协议');
						this.$api.insertEmployApplication2(shopId).then(res => {
							console.log(res);
							if (res == null) {
								this.showpopup = true;
								this.applyText = this.applyForSuccess;
							} else {
								this.showTips(res.ERROR).then(res => {})
							}
						}).catch(error => {
							this.showError(error);
						})
					}
				}
			},
			//开团时间
			reduces(index) {
				this.$set(this.list[index], 'endTime', this.list[index].endTime - 1);
			},
			//去搜索
			goSelect() {
				if (this.userType > 4 || this.userType == 1) {
					uni.navigateTo({
						url: '/item_businessCard/businessCard_ConnectGoods/businessCard_Select?search=1'
					})
				} else {
					uni.navigateTo({
						url: '/item_businessCard/businessCard_ConnectGoods/businessCard_Select?search=2'
					})
				}
			},
			// 切换标题
			changeTitle(index) {
				this.currentPage = 1;
				this.noMore = false;
				this.currentPage1 = 1;
				this.titleActiveIndex = index;
				if (this.userType > 1 && this.userType <= 4) {

					if (index == 1&& this.goodList.length==0) {
						this.shoppingEd()
					} else if (index == 2&& this.goodsLists.length==0 ) {
						this.getCustomerList();
					} else if (index == 3&& this.list.length==0) {
						this.getPinGroup()
					}
				} else {
					if (index == 1&& this.goodsLists.length==0) {
						
						this.getCustomerList();
					} else if (index == 2 && this.list.length==0) {
						
						this.getPinGroup()
					} else if (index == 3) {
						this.getShopList()
					}
				}
				// } else if (index == 1) {
				// 	// 店铺
				// 	//this.getShopList();
				// }
			},
			//点击事件
			selectGoods(goods) {
				console.log(goods)
				goods._select = !goods._select;
				console.log(goods._select)
			},
			goShops() {
				this.navigateTo('/item_businessCard/businessCard_ShopInfo/step2_1/step2_1')
			},
			confirm() {
				
				this.journal.goodsList = this.goodsList.filter(item => item._select);
				this.journal.goodsLists = this.goodsLists.filter(item => item._select);
				this.journal.list = this.list.filter(item => item._select);
				this.journal.goodList = this.goodList.filter(item => item._select);
				console.log(this.journal.list)
				uni.navigateBack();
			},

		}
	}
</script>

<style lang="less" scoped>
	@import "../../css/jss_base.less";
	@import '../../css/mzl_base.less';

	page {
		width: 100%;
		height: 100%;
		background: @grayBg;
	}

	.connContainer {
		background: #F8F8F8;
		box-sizing: border-box;
		min-height: 100vh;
		padding-bottom: 120upx;

		.checkCircle {
			width: 34upx;
			height: 34upx;
		}



		.goodsListCon {
			widht: 100%;
			box-sizing: border-box;
			padding: 0 30upx;

			&>image {
				width: 34upx;
				height: 34upx;
				margin-right: 20upx;
			}

			.goodsCon {
				box-sizing: border-box;
				padding: 20upx;
				background: #FFFFFF;
				margin-top: 30upx;
				font-family: PingFangSC;

				&>image {
					width: 140upx;
					height: 140upx;
					margin-right: 44upx;
				}

				.goodsDetail {
					flex: 1;

					.goodsName {
						font-size: @fsSubTitle;
						color: @title;
					}

					.price {
						font-size: 30upx;
						color: #FF5858;
					}
				}
			}
		}

		//按钮
		.BtnCon {
			position: fixed;
			bottom: 0;
			z-index: 99;
			width: 100%;
			height: 98upx;
			text-align: center;
			background: #FFFFFF;

			.Btn {
				width: 620upx;
				height: 80upx;
				line-height: 80upx;
				margin: 10upx auto;
				font-size: 28upx;
				color: #FFFFFF;
				background: #6B7AF8;
				border-radius: 40upx;
			}
		}
	}

	.searchTemplateContainer {
		padding: 15upx 15upx 0 15upx;
		margin-bottom: 30upx;
	}

	.container1 {
		width: 100%;
		margin-top: 20upx;

		.CMsearch {
			.flex(flex-start);
			width: 95%;
			margin: 0 auto;
			text-align: left;
			background: #fff;
			height: 72upx;
			color: #ccc;
			font-size: 28upx;

			.CMimage {
				width: 10%;
				margin-left: 20upx;

				image {
					width: 32upx;
					height: 32upx;
					vertical-align: middle;
				}
			}

			.CMinput {
				width: 80%;

				input {
					margin-top: 10upx;
				}
			}
		}
	}

	// 店铺列表
	.storeListBox {
		margin-top: 30upx;
		background: @grayBg;

		.SBlist {
			background: #fff;
			padding: 30upx;
			margin-bottom: 30upx;

			.Limage {
				width: 22%;
				margin-left: 20rpx;

				.Image {
					width: 110upx;
					height: 110upx;
					vertical-align: middle
				}
			}

			.LTitle {
				width: 58%;

				.LtitleName {
					font-size: 30upx;
					height: 70upx;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			}

			.applyBox {
				width: 20%;
				text-align: right;
				.buttonRadius(@w: 130upx, @h: 64upx, @bg: #F4F5FF);
				text-align: center;
				line-height: 64upx;
				border: 1upx solid @tabActive;
				color: @tabActive;
			}
		}
	}

	// 标题
	.HeaderTitle {
		width: 100%;
		background: #fff;

		.Title {
			.Titem {
				padding: 30upx;
			}

			.ItemActive {
				border-bottom: 3upx solid @tabActive;
				color: @tabActive;
			}
		}
	}
</style>
